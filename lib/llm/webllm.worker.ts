import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

/**
 * The worker side of the WebLLM engine (§9 of the RAG design). Runs in its
 * own thread so a multi-gigabyte download and WebGPU inference never block
 * the UI. Everything else — chat, embeddings, progress — is driven from
 * `webllm-engine.ts` through the handler's message protocol.
 */
const handler = new WebWorkerMLCEngineHandler();
handler.postMessage = (msg: unknown) => self.postMessage(msg);

self.onmessage = (msg: MessageEvent) => {
  handler.onmessage(msg);
};

self.onerror = (event: string | Event, source?: string, lineno?: number, colno?: number, error?: Error) => {
  const message =
    (error && error.message) ||
    (typeof event === "string" ? event : (event as ErrorEvent).message) ||
    "WebWorker runtime error";
  self.postMessage({
    kind: "throw",
    uuid: "",
    content: message,
  });
};
