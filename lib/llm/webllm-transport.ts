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
import { EMBEDDING_MODEL } from "@/lib/rag/embedding-model";
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
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

/** Model ids web-llm can run for chat — the embedder is excluded, since it's
 *  never a choice offered to the user. */
export function listWebllmChatModels(): string[] {
  return prebuiltAppConfig.model_list
    .filter((m) => m.model_type !== ModelType.embedding)
    .map((m) => m.model_id);
}

let enginePromise: Promise<WebWorkerMLCEngine> | null = null;
let loadedChatModel: string | null = null;

/**
 * The shared engine. Reloading with a different chat model tears down and
 * reloads both models that live in it, since web-llm loads a fixed model
 * list per engine and the embedder always needs to be one of them.
 */
function getEngine(chatModel: string, onProgress?: (report: Progress) => void): Promise<WebWorkerMLCEngine> {
  if (enginePromise && loadedChatModel === chatModel) return enginePromise;

  loadedChatModel = chatModel;
  enginePromise = (async () => {
    const worker = new Worker(new URL("./webllm.worker.ts", import.meta.url), { type: "module" });
    return CreateWebWorkerMLCEngine(worker, [chatModel, EMBEDDING_MODEL], {
      initProgressCallback: onProgress,
    });
  })();
  enginePromise.catch(() => {
    // A failed load shouldn't wedge the singleton — the next call retries.
    enginePromise = null;
    loadedChatModel = null;
  });

  return enginePromise;
}

/** Warms the engine ahead of first use, e.g. from the settings sheet, so
 *  download progress has somewhere to report to before the user asks anything. */
export function preloadEngine(chatModel: string, onProgress?: (report: Progress) => void): Promise<void> {
  return getEngine(chatModel, onProgress).then(() => undefined);
}

export async function unloadEngine(): Promise<void> {
  if (!enginePromise) return;
  const engine = await enginePromise.catch(() => null);
  enginePromise = null;
  loadedChatModel = null;
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
  const engine = await getEngine(chatModel);
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
 */
export async function embedPassages(chatModel: string, texts: string[]): Promise<number[][]> {
  const engine = await getEngine(chatModel);
  const out: number[][] = [];

  for (let i = 0; i < texts.length; i += EMBED_BATCH_SIZE) {
    const batch = texts.slice(i, i + EMBED_BATCH_SIZE).map((t) => buildEmbedInput(t, "passage"));
    const response = await engine.embeddings.create({ input: batch, model: EMBEDDING_MODEL });
    for (const item of response.data) out.push(normalize(item.embedding));
  }

  return out;
}

/** Arctic-embed is asymmetric (§7.2): the query gets a search-instruction
 *  prefix a passage never does. See `embed-input.ts` for the prefix itself. */
export async function embedQuery(chatModel: string, query: string): Promise<number[]> {
  const engine = await getEngine(chatModel);
  const response = await engine.embeddings.create({
    input: [buildEmbedInput(query, "query")],
    model: EMBEDDING_MODEL,
  });
  return normalize(response.data[0].embedding);
}
