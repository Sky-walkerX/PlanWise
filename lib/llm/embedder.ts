"use client";

/**
 * Picks whichever embedding backend this browser can actually run.
 *
 * Callers ask for an embedder and get one; which runtime answers is not their
 * problem. Both produce vectors tagged `EMBEDDING_MODEL`, so the server never
 * needs to know either.
 *
 * WebGPU first when it's available: it is roughly an order of magnitude
 * faster and, on the WebLLM chat path, the weights are already resident in an
 * engine that exists anyway. CPU otherwise, which is every browser.
 */

export type EmbedderBackend = "webgpu" | "wasm";

export type EmbedProgress = { progress: number; text?: string };

export type Embedder = {
  backend: EmbedderBackend;
  embedQuery(text: string): Promise<number[]>;
  embedPassages(texts: string[]): Promise<number[][]>;
};

/**
 * `chatModel` is the WebLLM chat model when chat runs in-browser, and null
 * otherwise — it only decides whether the WebGPU engine also has to hold chat
 * weights, and is ignored entirely on the CPU path.
 */
export async function getEmbedder(
  chatModel: string | null,
  onProgress?: (report: EmbedProgress) => void,
): Promise<Embedder | null> {
  const webgpu = await import("./webllm-transport");
  const { available } = await webgpu.checkWebGPU();

  if (available) {
    return {
      backend: "webgpu",
      embedQuery: (text) => webgpu.embedQuery(chatModel, text, (r) => onProgress?.({ progress: r.progress })),
      embedPassages: (texts) =>
        webgpu.embedPassages(chatModel, texts, (r) => onProgress?.({ progress: r.progress })),
    };
  }

  const wasm = await import("./wasm-embedder");
  if (!wasm.hasWasm()) return null;

  return {
    backend: "wasm",
    embedQuery: (text) => wasm.wasmEmbedQuery(text, onProgress),
    embedPassages: (texts) => wasm.wasmEmbedPassages(texts, onProgress),
  };
}
