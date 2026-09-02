import prisma from "@/lib/prisma";
import { chunkSource, hashContent, type Chunk, type ChunkSourceType } from "./chunk";
import { EMBEDDING_DIMS, EMBEDDING_MODEL } from "./embedding-model";

export { EMBEDDING_DIMS, EMBEDDING_MODEL };

/**
 * Reads the five source tables that get chunked and embedded, and compares
 * what's live against what's stored — the freshness check from §7.3 of the
 * RAG design. Every read is filtered by `userId`, mirroring `subjects.ts`.
 */

export type LiveSource = {
  source: ChunkSourceType;
  sourceId: string;
  subjectId: string;
  subjectTitle: string;
  milestoneTitle?: string | null;
  taskTitle?: string | null;
  subtaskTitle?: string | null;
  resourceTitle?: string | null;
  text: string;
  contentHash: string;
  /** Chunked here rather than in `/api/rag/pending`, because whether a source
   *  chunks to anything at all decides if it belongs in this list. */
  chunks: Chunk[];
};

export function sourceKey(source: ChunkSourceType, sourceId: string): string {
  return `${source}:${sourceId}`;
}

/**
 * Every live source record that actually yields chunks, for this user.
 *
 * Titles aren't chunked (§7.1), so a record with an empty note body has
 * nothing to be stale about. Neither does one whose text is too short to
 * survive the chunker's minimum — "Read chapter 3" is a perfectly ordinary
 * task description that produces zero passages. Counting those as sources
 * left them permanently stale: never indexable, never indexed, and reported
 * forever as outstanding work by `/api/rag/status`. The chunker is the only
 * thing that can answer whether a source yields anything, so it runs here and
 * the result rides along on `chunks` for `/api/rag/pending` to reuse.
 */
export async function listLiveSources(userId: string): Promise<LiveSource[]> {
  const subjects = await prisma.subject.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      description: true,
      milestones: {
        select: {
          id: true,
          title: true,
          notes: true,
          tasks: {
            select: {
              id: true,
              title: true,
              description: true,
              subtasks: {
                select: { id: true, title: true, notes: true },
              },
            },
          },
        },
      },
      tasks: {
        where: { milestoneId: null },
        select: {
          id: true,
          title: true,
          description: true,
          subtasks: { select: { id: true, title: true, notes: true } },
        },
      },
      resources: { select: { id: true, title: true, note: true } },
    },
  });

  const out: LiveSource[] = [];

  const push = (entry: Omit<LiveSource, "contentHash" | "chunks">) => {
    if (!entry.text.trim()) return;
    const chunks = chunkSource(entry);
    if (chunks.length === 0) return;
    out.push({ ...entry, contentHash: hashContent(entry.text), chunks });
  };

  for (const subject of subjects) {
    if (subject.description) {
      push({
        source: "SUBJECT",
        sourceId: subject.id,
        subjectId: subject.id,
        subjectTitle: subject.title,
        text: subject.description,
      });
    }

    for (const milestone of subject.milestones) {
      if (milestone.notes) {
        push({
          source: "MILESTONE",
          sourceId: milestone.id,
          subjectId: subject.id,
          subjectTitle: subject.title,
          milestoneTitle: milestone.title,
          text: milestone.notes,
        });
      }
      for (const task of milestone.tasks) {
        pushTask(push, subject.id, subject.title, milestone.title, task);
      }
    }

    for (const task of subject.tasks) {
      pushTask(push, subject.id, subject.title, null, task);
    }

    for (const resource of subject.resources) {
      if (resource.note) {
        push({
          source: "RESOURCE",
          sourceId: resource.id,
          subjectId: subject.id,
          subjectTitle: subject.title,
          resourceTitle: resource.title,
          text: resource.note,
        });
      }
    }
  }

  return out;
}

type TaskWithSubtasks = {
  id: string;
  title: string;
  description: string | null;
  subtasks: { id: string; title: string; notes: string }[];
};

function pushTask(
  push: (entry: Omit<LiveSource, "contentHash" | "chunks">) => void,
  subjectId: string,
  subjectTitle: string,
  milestoneTitle: string | null,
  task: TaskWithSubtasks,
): void {
  if (task.description) {
    push({
      source: "TASK",
      sourceId: task.id,
      subjectId,
      subjectTitle,
      milestoneTitle,
      taskTitle: task.title,
      text: task.description,
    });
  }
  for (const subtask of task.subtasks) {
    if (subtask.notes) {
      push({
        source: "SUBTASK",
        sourceId: subtask.id,
        subjectId,
        subjectTitle,
        milestoneTitle,
        taskTitle: task.title,
        subtaskTitle: subtask.title,
        text: subtask.notes,
      });
    }
  }
}

export type StoredChunkMeta = {
  source: ChunkSourceType;
  sourceId: string;
  contentHash: string;
  embeddingModel: string;
};

/** One row per distinct (source, sourceId) — every chunk of a source shares
 *  the same hash and model, since they're written together in one batch. */
export async function listStoredChunkMeta(userId: string): Promise<StoredChunkMeta[]> {
  const rows = await prisma.noteChunk.findMany({
    where: { userId },
    select: { source: true, sourceId: true, contentHash: true, embeddingModel: true },
    distinct: ["source", "sourceId"],
  });
  return rows;
}

export type FreshnessDiff = {
  /** Live sources already indexed under the current model with a matching hash. */
  indexed: LiveSource[];
  /** Live sources needing (re-)embedding: missing, hash changed, or model changed. */
  stale: LiveSource[];
  /** Stored (source, sourceId) keys with no matching live record — safe to delete. */
  orphanedKeys: { source: ChunkSourceType; sourceId: string }[];
};

/** Pure comparison between what's live and what's stored. Kept separate from
 *  the Prisma reads above so the decision logic is easy to reason about. */
export function diffFreshness(live: LiveSource[], stored: StoredChunkMeta[], currentModel: string): FreshnessDiff {
  const storedByKey = new Map(stored.map((s) => [sourceKey(s.source, s.sourceId), s]));
  const liveKeys = new Set(live.map((l) => sourceKey(l.source, l.sourceId)));

  const indexed: LiveSource[] = [];
  const stale: LiveSource[] = [];

  for (const entry of live) {
    const found = storedByKey.get(sourceKey(entry.source, entry.sourceId));
    const fresh = found && found.contentHash === entry.contentHash && found.embeddingModel === currentModel;
    (fresh ? indexed : stale).push(entry);
  }

  const orphanedKeys = stored
    .filter((s) => !liveKeys.has(sourceKey(s.source, s.sourceId)))
    .map((s) => ({ source: s.source, sourceId: s.sourceId }));

  return { indexed, stale, orphanedKeys };
}

export type ScorableChunk = {
  subjectId: string;
  subjectTitle: string;
  source: ChunkSourceType;
  sourceId: string;
  ordinal: number;
  breadcrumb: string;
  content: string;
  embedding: number[];
};

/** Chunks eligible for retrieval — current embedding model only, so a stale
 *  vector space (§7.3) is never scored alongside the current one. */
export async function listScorableChunks(
  userId: string,
  subjectIds: string[],
): Promise<ScorableChunk[]> {
  const rows = await prisma.noteChunk.findMany({
    where: {
      userId,
      embeddingModel: EMBEDDING_MODEL,
      ...(subjectIds.length > 0 ? { subjectId: { in: subjectIds } } : {}),
    },
    select: {
      subjectId: true,
      subject: { select: { title: true } },
      source: true,
      sourceId: true,
      ordinal: true,
      breadcrumb: true,
      content: true,
      embedding: true,
    },
  });

  return rows.map((r) => ({
    subjectId: r.subjectId,
    subjectTitle: r.subject.title,
    source: r.source,
    sourceId: r.sourceId,
    ordinal: r.ordinal,
    breadcrumb: r.breadcrumb,
    content: r.content,
    embedding: r.embedding,
  }));
}
