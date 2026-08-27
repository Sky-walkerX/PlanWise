/**
 * The fixed embedding model (§4.1 of the RAG design). Not user-configurable —
 * one dependency covers chat and embeddings, so there is exactly one choice.
 *
 * Zero imports on purpose: `lib/rag/sources.ts` (server, touches Prisma) and
 * `lib/llm/webllm-transport.ts` (browser, touches `@mlc-ai/web-llm`) both
 * need this constant, and neither should have to pull in the other's world
 * just to agree on a model id.
 */
export const EMBEDDING_MODEL = "snowflake-arctic-embed-s-q0f32-MLC-b4";
export const EMBEDDING_DIMS = 384;
