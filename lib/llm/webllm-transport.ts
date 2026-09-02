"use client";

import {
  CreateWebWorkerMLCEngine,
  ModelType,
  deleteModelAllInfoInCache,
  hasModelInCache,
  prebuiltAppConfig,
  type InitProgressReport,
  type WebWorkerMLCEngine,
} from "@mlc-ai/web-llm";
import type { PromptMessage } from "@/lib/chat/types";
import { WEBLLM_EMBEDDING_MODEL } from "@/lib/rag/embedding-model";
import { buildEmbedInput } from "./embed-input";
import type { ChatTransport, StreamOpts } from "./transport";

/**
 * The in-browser transport (§9 of the RAG design). One `web-llm` engine, in
 * one worker, hosts both the chat model and the fixed embedder
 * (`snowflake-arctic-embed-s-q0f32-MLC-b4`) — §4.1 chose one dependency over
 * running a second inference runtime for one model. Chat streaming and
 * embeddings both go through this module because they share that one engine.
 */

const EMBED_BATCH_SIZE = 4;

export type Progress = InitProgressReport;

export function hasWebGPU(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator && !!navigator.gpu;
}

/** The adapter's capabilities don't change over a page's lifetime, and
 *  `requestAdapter()` is not free, so the first probe is the only one. */
let webGpuProbe: Promise<{ available: boolean; reason?: string }> | null = null;

export function checkWebGPU(): Promise<{ available: boolean; reason?: string }> {
  webGpuProbe ??= probeWebGPU();
  return webGpuProbe;
}

async function probeWebGPU(): Promise<{ available: boolean; reason?: string }> {
  if (typeof navigator === "undefined" || !("gpu" in navigator)) {
    return {
      available: false,
      reason: "This browser has no WebGPU, so chat can't run in it. Use a local server instead, or switch to recent Chrome or Edge. Your notes are still indexed, on the CPU.",
    };
  }
  try {
    const gpu = (navigator as unknown as { gpu?: { requestAdapter: () => Promise<unknown> } }).gpu;
    if (!gpu || typeof gpu.requestAdapter !== "function") {
      return {
        available: false,
        reason: "This browser does not expose the WebGPU API, so chat can't run in it. Use a local server instead. Your notes are still indexed, on the CPU.",
      };
    }
    const adapter = (await gpu.requestAdapter()) as {
      limits?: {
        maxStorageBuffersPerShaderStage?: number;
        maxBufferSize?: number;
        maxStorageBufferBindingSize?: number;
        maxComputeWorkgroupStorageSize?: number;
      };
    } | null;

    if (!adapter) {
      return {
        available: false,
        reason: "No compatible GPU or WebGPU adapter found on this machine, so chat can't run in the browser. Use a local server instead. Your notes are still indexed, on the CPU.",
      };
    }

    const limits = adapter.limits;
    if (limits) {
      if (
        typeof limits.maxStorageBuffersPerShaderStage === "number" &&
        limits.maxStorageBuffersPerShaderStage < 10
      ) {
        return {
          available: false,
          reason: `Chat can't run in this browser: its WebGPU limit (maxStorageBuffersPerShaderStage: ${limits.maxStorageBuffersPerShaderStage}) is below WebLLM's requirement of 10, and WebLLM has no fallback below it. Use a local server, or Chrome or Edge. Your notes are still indexed, on the CPU.`,
        };
      }
      if (typeof limits.maxBufferSize === "number" && limits.maxBufferSize < 1 << 28) {
        return {
          available: false,
          reason: "This browser's WebGPU buffer size limit is too low to run chat in it. Use a local server instead. Your notes are still indexed, on the CPU.",
        };
      }
    }

    return { available: true };
  } catch (err) {
    const reason = typeof err === "string" ? err : err instanceof Error ? err.message : String(err);
    return { available: false, reason };
  }
}

/** Model ids web-llm can run for chat — the embedder is excluded, since it's
 *  never a choice offered to the user. */
export function listWebllmChatModels(): string[] {
  return prebuiltAppConfig.model_list
    .filter((m) => m.model_type !== ModelType.embedding)
    .map((m) => m.model_id);
}

let enginePromise: Promise<WebWorkerMLCEngine> | null = null;
let loadedKey: string | null = null;

/**
 * Which models an engine has to hold to serve a given job.
 *
 * `chatModel` is null when chat runs somewhere else — an Ollama or LM Studio
 * endpoint — and only the embedder is wanted. That case matters: loading the
 * default 1.7B chat model alongside it costs about 1.1 GB of download and
 * VRAM for a model that would never be asked to generate a single token.
 */
function engineModels(chatModel: string | null): string[] {
  return chatModel ? [chatModel, WEBLLM_EMBEDDING_MODEL] : [WEBLLM_EMBEDDING_MODEL];
}

function engineKey(models: string[]): string {
  return [...models].sort().join("|");
}

function normalizeError(err: unknown): Error {
  const str = err instanceof Error ? err.message : typeof err === "string" ? err : String(err || "");
  if (str.includes("maxStorageBuffersPerShaderStage")) {
    return new Error(
      "This browser's WebGPU storage buffer limit is too low for WebLLM (requires 10). Switch to Chrome or Edge, or use a local server.",
    );
  }
  if (err instanceof Error) return err;
  if (typeof err === "string") return new Error(err);
  return new Error(String(err || "Failed to load the model."));
}

/**
 * The shared engine, keyed on the exact set of models it was built with.
 *
 * web-llm fixes a model list per engine, so asking for a different set tears
 * the old one down and reloads. Keying on the set rather than on the chat
 * model alone is what lets an embedder-only engine exist: a user chatting
 * through Ollama gets a 130 MB engine, and only a user chatting through
 * WebLLM pays for the chat weights too.
 */
function getEngine(models: string[], onProgress?: (report: Progress) => void): Promise<WebWorkerMLCEngine> {
  const key = engineKey(models);
  if (enginePromise && loadedKey === key) return enginePromise;

  loadedKey = key;
  enginePromise = new Promise<WebWorkerMLCEngine>((resolve, reject) => {
    try {
      const worker = new Worker(new URL("./webllm.worker.ts", import.meta.url), { type: "module" });
      worker.onerror = (event) => {
        const message = event.message || "Failed to initialize WebWorker for WebLLM.";
        reject(new Error(message));
      };
      CreateWebWorkerMLCEngine(worker, models, {
        initProgressCallback: onProgress,
      })
        .then(resolve)
        .catch((err) => reject(normalizeError(err)));
    } catch (err) {
      reject(normalizeError(err));
    }
  });
  enginePromise.catch(() => {
    // A failed load shouldn't wedge the singleton — the next call retries.
    enginePromise = null;
    loadedKey = null;
  });

  return enginePromise;
}

/** Warms the engine ahead of first use, e.g. from the settings sheet, so
 *  download progress has somewhere to report to before the user asks anything. */
export function preloadEngine(chatModel: string, onProgress?: (report: Progress) => void): Promise<void> {
  return getEngine(engineModels(chatModel), onProgress).then(() => undefined);
}

export async function unloadEngine(): Promise<void> {
  if (!enginePromise) return;
  const engine = await enginePromise.catch(() => null);
  enginePromise = null;
  loadedKey = null;
  await engine?.unload();
}

export async function isModelCached(modelId: string): Promise<boolean> {
  return hasModelInCache(modelId);
}

export async function clearModelCache(modelId: string): Promise<void> {
  await deleteModelAllInfoInCache(modelId);
}

function toWebllmMessages(messages: PromptMessage[]) {
  return messages.map((m) => ({ role: m.role, content: m.content }));
}

async function* streamTokens(chatModel: string, messages: PromptMessage[], opts: StreamOpts): AsyncGenerator<string> {
  // Chatting through WebLLM means the embedder is wanted sooner or later, and
  // adding it later would force a full teardown and reload of both.
  const engine = await getEngine(engineModels(chatModel));
  const stream = await engine.chat.completions.create({
    model: chatModel,
    messages: toWebllmMessages(messages),
    stream: true,
  });

  for await (const chunk of stream) {
    if (opts.signal.aborted) {
      engine.interruptGenerate();
      throw new DOMException("Aborted", "AbortError");
    }
    const token = chunk.choices[0]?.delta?.content;
    if (token) yield token;
  }
}

export function createWebllmTransport(chatModel: string): ChatTransport {
  return {
    listModels: async () => listWebllmChatModels(),
    streamChat: (messages, opts) => streamTokens(chatModel, messages, opts),
  };
}

function normalize(vector: number[]): number[] {
  let sumSquares = 0;
  for (const v of vector) sumSquares += v * v;
  const norm = Math.sqrt(sumSquares) || 1;
  return vector.map((v) => v / norm);
}

/**
 * Embeds passages in batches of 4, matching the `b4` model's batch size.
 * Vectors are normalised before they leave the browser (§4.2), so scoring on
 * the server is a plain dot product.
 *
 * `chatModel` is null whenever chat runs against a local server rather than
 * WebLLM, which keeps the engine down to the embedder alone.
 */
export async function embedPassages(
  chatModel: string | null,
  texts: string[],
  onProgress?: (report: Progress) => void,
): Promise<number[][]> {
  const engine = await getEngine(engineModels(chatModel), onProgress);
  const out: number[][] = [];

  for (let i = 0; i < texts.length; i += EMBED_BATCH_SIZE) {
    const batch = texts.slice(i, i + EMBED_BATCH_SIZE).map((t) => buildEmbedInput(t, "passage"));
    const response = await engine.embeddings.create({ input: batch, model: WEBLLM_EMBEDDING_MODEL });
    for (const item of response.data) out.push(normalize(item.embedding));
  }

  return out;
}

/** Arctic-embed is asymmetric (§7.2): the query gets a search-instruction
 *  prefix a passage never does. See `embed-input.ts` for the prefix itself. */
export async function embedQuery(
  chatModel: string | null,
  query: string,
  onProgress?: (report: Progress) => void,
): Promise<number[]> {
  const engine = await getEngine(engineModels(chatModel), onProgress);
  const response = await engine.embeddings.create({
    input: [buildEmbedInput(query, "query")],
    model: WEBLLM_EMBEDDING_MODEL,
  });
  return normalize(response.data[0].embedding);
}
