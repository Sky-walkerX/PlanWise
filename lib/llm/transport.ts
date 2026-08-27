import type { PromptMessage } from "@/lib/chat/types";

/**
 * What both the local-server transport (`client.ts`) and the in-browser
 * WebLLM transport (`webllm-transport.ts`) satisfy. The rest of the app —
 * `hooks/useChat.ts`, the settings sheet — talks to whichever one the user
 * has configured through this interface only, and never imports either
 * implementation directly.
 */

export type StreamOpts = {
  signal: AbortSignal;
};

export type ChatTransport = {
  streamChat(messages: PromptMessage[], opts: StreamOpts): AsyncIterable<string>;
  listModels(): Promise<string[]>;
};
