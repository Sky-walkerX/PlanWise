"use client";

import { EMBEDDING_DIMS, ONNX_EMBEDDING_REPO } from "@/lib/rag/embedding-model";
import { buildEmbedInput } from "./embed-input";

/**
 * The CPU embedder, for browsers that can't run WebGPU.
 *
 * web-llm hard-requires `maxStorageBuffersPerShaderStage >= 10` and throws
 * below it. Firefox reports 9, Safari has no WebGPU on most versions, and
 * most mobile browsers have none either. Those users could still chat through
 * a local server, but they got no retrieval at all — the moment their plan
 * outgrew the context budget it was silently trimmed, which is the exact
 * failure RAG exists to prevent.
 *
 * Same weights as the WebGPU path, run by onnxruntime instead of TVM, so the
 * vectors land in the same space and carry the same `EMBEDDING_MODEL` tag.
 * The fp32 build is deliberate: a quantized one is a quarter of the download
 * but its vectors drift away from the WebGPU path's, and two subtly different
 * spaces scored against each other is a bug nobody would ever see, because
 * both are 384 dimensions and the dimension check would pass.
 *
 * Everything here is browser-only and behind a dynamic import, so
 * `@huggingface/transformers` never reaches the server bundle — the concern
 * that ruled it out in §4.1.
 */

/** Passages per call. CPU inference is sequential anyway, so this only trades
 *  peak memory against per-call overhead. */
const BATCH_SIZE = 8;

type FeatureExtractor = (
  texts: string[],
  options: { pooling: "cls" | "mean"; normalize: boolean },
) => Promise<{ tolist: () => number[][] }>;

let extractorPromise: Promise<FeatureExtractor> | null = null;

export type WasmProgress = { progress: number; text?: string };

function loadExtractor(onProgress?: (report: WasmProgress) => void): Promise<FeatureExtractor> {
  extractorPromise ??= (async () => {
    const { pipeline } = await import("@huggingface/transformers");
    const extractor = await pipeline("feature-extraction", ONNX_EMBEDDING_REPO, {
      // fp32 keeps this in the same vector space as the WebGPU path.
      dtype: "fp32",
      device: "wasm",
      progress_callback: (report: { status?: string; progress?: number }) => {
        if (typeof report.progress === "number") {
          onProgress?.({ progress: report.progress / 100, text: report.status });
        }
      },
    });
    return extractor as unknown as FeatureExtractor;
  })();

  extractorPromise.catch(() => {
    // A failed load shouldn't wedge the singleton — the next call retries.
    extractorPromise = null;
  });

  return extractorPromise;
}

/**
 * transformers.js normalises for us, but the result still has to be the shape
 * the rest of the system assumes. A wrong pooling mode yields a plausible,
 * wrongly-sized vector, and scoring would silently return nonsense.
 */
function checkVector(vector: number[]): number[] {
  if (vector.length !== EMBEDDING_DIMS) {
    throw new Error(`Embedder returned ${vector.length} dimensions, expected ${EMBEDDING_DIMS}.`);
  }
  return vector;
}

/** Arctic-embed pools on the CLS token, not the mean. Getting this wrong
 *  produces vectors that look fine and retrieve badly. */
const POOLING = { pooling: "cls", normalize: true } as const;

export async function wasmEmbedPassages(
  texts: string[],
  onProgress?: (report: WasmProgress) => void,
): Promise<number[][]> {
  const extractor = await loadExtractor(onProgress);
  const out: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE).map((t) => buildEmbedInput(t, "passage"));
    const result = await extractor(batch, POOLING);
    for (const vector of result.tolist()) out.push(checkVector(vector));
  }

  return out;
}

export async function wasmEmbedQuery(
  query: string,
  onProgress?: (report: WasmProgress) => void,
): Promise<number[]> {
  const extractor = await loadExtractor(onProgress);
  const result = await extractor([buildEmbedInput(query, "query")], POOLING);
  return checkVector(result.tolist()[0]);
}

/** Whether the CPU path can run at all. WebAssembly is the only requirement,
 *  which every browser this app supports has had for years. */
export function hasWasm(): boolean {
  return typeof WebAssembly === "object";
}
