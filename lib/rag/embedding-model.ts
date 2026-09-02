/**
 * The embedding model (§4.1 of the RAG design). Not user-configurable — one
 * set of weights covers every browser, so there is exactly one vector space.
 *
 * Zero imports on purpose: `lib/rag/sources.ts` (server, touches Prisma) and
 * the two browser embedders both need these constants, and none of them
 * should have to pull in another's world just to agree on a model.
 */

/**
 * What gets stored on every chunk, and what retrieval filters by.
 *
 * This names the *weights*, not the runtime that ran them. Two runtimes embed
 * for LockIn — web-llm on WebGPU and onnxruntime on CPU — and both load the
 * same fp32 Snowflake weights, so both produce vectors in the same space.
 * Tagging them identically is what lets someone index in Chrome, open the
 * same account in Firefox, and have retrieval keep working instead of
 * re-embedding the whole corpus on every browser switch.
 *
 * Changing this string invalidates every stored vector: `diffFreshness` marks
 * a chunk stale when its `embeddingModel` differs, so the corpus re-indexes
 * itself lazily and incrementally. That is the intended migration path.
 */
export const EMBEDDING_MODEL = "snowflake-arctic-embed-s";
export const EMBEDDING_DIMS = 384;

/** web-llm's own id for these weights, used only when asking it to load them. */
export const WEBLLM_EMBEDDING_MODEL = "snowflake-arctic-embed-s-q0f32-MLC-b4";

/** The Hugging Face repo the ONNX build is fetched from, for the CPU path. */
export const ONNX_EMBEDDING_REPO = "Snowflake/snowflake-arctic-embed-s";
