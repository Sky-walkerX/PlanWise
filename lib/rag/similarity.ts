/**
 * Vector scoring for retrieval.
 *
 * Pure — no I/O. Vectors are normalised at write time (`lib/rag/chunk.ts`
 * embeds, the browser normalises before it ever reaches the server), so
 * cosine similarity is just a dot product. A brute-force scan of the whole
 * corpus is the design: `docs/superpowers/specs/2026-08-27-rag-webllm-design.md`
 * §4.2 measured 60–80 chunks per user, which scores in well under a
 * millisecond — pgvector wouldn't pay for itself until three orders of
 * magnitude more.
 */

/** Mismatched dimensions are a bug (a stale embedding model, most likely),
 *  not a value to silently coerce — the caller should filter those out
 *  before scoring, not have them scored as noise. */
export function dotProduct(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(`Dimension mismatch: ${a.length} vs ${b.length}`);
  }
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

export type Scored<T> = { item: T; score: number };

/**
 * The top `k` items by score against `query`, descending. A tie keeps the
 * corpus's original relative order (a stable sort), so retrieval is
 * deterministic rather than dependent on sort implementation details.
 *
 * Items whose vector dimension doesn't match `query` are skipped rather than
 * thrown on, so one stale row (an old embedding model, mid-rebuild) can't
 * take the whole query down.
 */
export function topK<T>(query: number[], items: T[], getVector: (item: T) => number[], k: number): Scored<T>[] {
  const scored: Scored<T>[] = [];
  for (const item of items) {
    const vector = getVector(item);
    if (vector.length !== query.length) continue;
    scored.push({ item, score: dotProduct(query, vector) });
  }

  return scored
    .map((s, index) => ({ ...s, index }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, k)
    .map(({ item, score }) => ({ item, score }));
}
