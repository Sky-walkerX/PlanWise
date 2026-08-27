/**
 * Arctic-embed is asymmetric (§7.2 of the RAG design): a query needs a
 * search-instruction prefix that a passage never gets. Skipping the prefix on
 * the query path doesn't error — it quietly costs recall, which is why this
 * one line is pulled into its own pure, tested function rather than left
 * inline in `webllm-transport.ts`, which has no test harness of its own.
 */
export const QUERY_PREFIX = "Represent this sentence for searching relevant passages:";

export function buildEmbedInput(text: string, role: "query" | "passage"): string {
  return role === "query" ? `${QUERY_PREFIX} ${text}` : text;
}
