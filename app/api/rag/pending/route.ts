import { type NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/lib/auth";
import { chunkSource } from "@/lib/rag/chunk";
import { diffFreshness, EMBEDDING_MODEL, listLiveSources, listStoredChunkMeta } from "@/lib/rag/sources";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 200;

function parseLimit(raw: string | null): number {
  const n = raw ? Number(raw) : DEFAULT_LIMIT;
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_LIMIT;
  return Math.min(MAX_LIMIT, Math.floor(n));
}

/**
 * GET /api/rag/pending?limit=20
 *
 * Chunks every stale source (pure — `lib/rag/chunk.ts`) and returns them
 * flattened, up to `limit`. A source's chunks are never split across the
 * limit boundary: the walk stops *before* starting a new source once the
 * limit is already met, so the browser never receives a partial source to
 * embed and write half of.
 */
export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const limit = parseLimit(request.nextUrl.searchParams.get("limit"));

  const [live, stored] = await Promise.all([listLiveSources(userId), listStoredChunkMeta(userId)]);
  const { stale } = diffFreshness(live, stored, EMBEDDING_MODEL);

  const pending: {
    source: string;
    sourceId: string;
    subjectId: string;
    ordinal: number;
    breadcrumb: string;
    content: string;
    contentHash: string;
  }[] = [];

  for (const entry of stale) {
    if (pending.length >= limit) break;

    const chunks = chunkSource({
      source: entry.source,
      text: entry.text,
      subjectTitle: entry.subjectTitle,
      milestoneTitle: entry.milestoneTitle,
      taskTitle: entry.taskTitle,
      subtaskTitle: entry.subtaskTitle,
      resourceTitle: entry.resourceTitle,
    });

    for (const chunk of chunks) {
      pending.push({
        source: entry.source,
        sourceId: entry.sourceId,
        subjectId: entry.subjectId,
        ordinal: chunk.ordinal,
        breadcrumb: chunk.breadcrumb,
        content: chunk.content,
        contentHash: entry.contentHash,
      });
    }
  }

  return NextResponse.json(pending);
}
