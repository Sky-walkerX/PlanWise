import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

/**
 * The worker side of the WebLLM engine (§9 of the RAG design). Runs in its
 * own thread so a multi-gigabyte download and WebGPU inference never block
 * the UI. Everything else — chat, embeddings, progress — is driven from
 * `webllm-engine.ts` through the handler's message protocol.
 */
const handler = new WebWorkerMLCEngineHandler();

self.onmessage = (msg: MessageEvent) => {
  handler.onmessage(msg);
};
