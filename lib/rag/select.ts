import { demoteHeadings, estimateTokens } from "@/lib/chat/context";
import type { ChunkSourceType } from "./chunk";

/**
 * Turns scored chunks into the "## Relevant notes" block that supplies depth
 * alongside the plan skeleton (`lib/chat/context.ts`'s outline mode).
 *
 * Pure — takes already-scored chunks in, returns markdown and a manifest out.
 * Scoring itself is `lib/rag/similarity.ts`'s job; this module only decides
 * which of the already-scored chunks survive and in what order they're shown.
 */

export type ScoredChunk = {
  subjectId: string;
  subjectTitle: string;
  source: ChunkSourceType;
  sourceId: string;
  ordinal: number;
  breadcrumb: string;
  content: string;
  score: number;
};

export type SelectManifestEntry = { breadcrumb: string; score: number };

export type SelectResult = {
  /** "" when nothing survived selection — the caller omits the section entirely. */
  block: string;
  manifest: SelectManifestEntry[];
};

// When a question has nothing to do with the notes, injecting the twelve
// least-irrelevant passages is worse than injecting none.
const SCORE_FLOOR = 0.25;
// One long note can't crowd out every other subject.
const MAX_PER_SOURCE = 3;
const MAX_TOTAL = 12;

// A passage is the user's own markdown, and it now arrives by a different
// route than the digest — but a stray `##` in a note would still read as a
// sibling of this section's own `###` breadcrumb heading and re-parent
// whatever follows it. Demoted for the same reason `context.ts` demotes it.
function passageText(chunk: Pick<ScoredChunk, "breadcrumb" | "content">): string {
  return `### ${chunk.breadcrumb}\n${demoteHeadings(chunk.content)}`;
}

export function selectPassages(
  chunks: ScoredChunk[],
  contextSubjectIds: string[],
  budgetTokens: number,
): SelectResult {
  // Empty selection searches everything — that's what makes "search all my
  // subjects" affordable in the first place.
  const pool = contextSubjectIds.length > 0 ? chunks.filter((c) => contextSubjectIds.includes(c.subjectId)) : chunks;

  const candidates = pool
    .filter((c) => c.score >= SCORE_FLOOR)
    .map((c, index) => ({ chunk: c, index }))
    .sort((a, b) => b.chunk.score - a.chunk.score || a.index - b.index);

  const perSourceCount = new Map<string, number>();
  const selected: ScoredChunk[] = [];
  let usedTokens = 0;

  for (const { chunk } of candidates) {
    if (selected.length >= MAX_TOTAL) break;

    const key = `${chunk.source}:${chunk.sourceId}`;
    const count = perSourceCount.get(key) ?? 0;
    if (count >= MAX_PER_SOURCE) continue;

    const cost = estimateTokens(passageText(chunk));
    if (usedTokens + cost > budgetTokens) break;

    selected.push(chunk);
    perSourceCount.set(key, count + 1);
    usedTokens += cost;
  }

  if (selected.length === 0) return { block: "", manifest: [] };

  // Presentation order: the model reads a coherent document, grouped by
  // subject and source, in the order the notes themselves are written —
  // scores only decided membership, not the read order.
  const ordered = [...selected].sort((a, b) => {
    if (a.subjectTitle !== b.subjectTitle) return a.subjectTitle.localeCompare(b.subjectTitle);
    if (a.source !== b.source) return a.source.localeCompare(b.source);
    if (a.sourceId !== b.sourceId) return a.sourceId.localeCompare(b.sourceId);
    return a.ordinal - b.ordinal;
  });

  const block = ["## Relevant notes", ...ordered.map(passageText)].join("\n\n");
  const manifest = ordered.map((c) => ({ breadcrumb: c.breadcrumb, score: c.score }));

  return { block, manifest };
}
