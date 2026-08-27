"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChatMessage, Conversation } from "@/app/generated/prisma";
import { api } from "@/lib/fetcher";
import type { PromptMessage } from "@/lib/chat/types";
import type { RetrievalBudget } from "@/lib/chat/retrieve";
import { createOpenAiTransport, LlmError } from "@/lib/llm/client";
import { effectiveContextTokens, loadSettings, type LlmSettings } from "@/lib/llm/settings";
import { EMBEDDING_DIMS, EMBEDDING_MODEL } from "@/lib/rag/embedding-model";

export type ConversationSummary = Pick<
  Conversation,
  "id" | "title" | "subjectId" | "contextSubjectIds" | "updatedAt"
>;

export type ConversationDetail = Conversation & { messages: ChatMessage[] };

type PrepareResponse = { messages: PromptMessage[]; budget: RetrievalBudget };

export function useConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => api.get<ConversationSummary[]>("/api/chat/conversations"),
  });
}

export function useConversation(id: string | undefined) {
  return useQuery({
    queryKey: ["conversation", id],
    enabled: !!id,
    queryFn: () => api.get<ConversationDetail>(`/api/chat/conversations/${id}`),
  });
}

export function useCreateConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { subjectId?: string | null; contextSubjectIds?: string[] }) =>
      api.post<ConversationSummary>("/api/chat/conversations", input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["conversations"] }),
  });
}

export function useUpdateConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title?: string; contextSubjectIds?: string[] } }) =>
      api.put<ConversationSummary>(`/api/chat/conversations/${id}`, data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["conversations"] });
      qc.invalidateQueries({ queryKey: ["conversation", vars.id] });
    },
  });
}

export function useDeleteConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.del<{ success: boolean }>(`/api/chat/conversations/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["conversations"] }),
  });
}

/**
 * Drives one turn: ask the server for a prompt, stream it through the user's
 * own model, then hand the reply back to the server to store.
 *
 * The streaming text is local state rather than cache — it changes many times a
 * second, and only this panel needs it. It's cleared once the persisted message
 * lands in the transcript, so there is never a frame showing both.
 */
export function useSendMessage() {
  const qc = useQueryClient();
  const [streamText, setStreamText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [budget, setBudget] = useState<RetrievalBudget | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => abortRef.current?.abort(), []);

  const send = useCallback(
    async (conversationId: string, content: string) => {
      const settings = loadSettings();
      const controller = new AbortController();
      abortRef.current = controller;

      setError(null);
      setStreamText("");
      setIsStreaming(true);

      // Embedding the query is independent of which chat transport is
      // selected — retrieval helps the Ollama path too (§14 build sequence,
      // phases 1–4). `prepare` falls back to digest mode on its own when this
      // comes back undefined, so a failed or unavailable embedder just means
      // no retrieval this turn, not a broken send.
      let queryEmbedding: number[] | undefined;
      if (settings.ragEnabled) {
        try {
          const { embedQuery, hasWebGPU } = await import("@/lib/llm/webllm-transport");
          if (hasWebGPU()) queryEmbedding = await embedQuery(settings.webllmModel, content);
        } catch {
          // Degrades to digest mode server-side; nothing to surface here.
        }
      }

      let streamed = "";
      let sources: string[] = [];
      try {
        const prepared = await api.post<PrepareResponse>(
          `/api/chat/conversations/${conversationId}/prepare`,
          {
            content,
            contextTokens: effectiveContextTokens(settings),
            queryEmbedding,
            ragEnabled: settings.ragEnabled,
          },
        );
        setBudget(prepared.budget);
        sources = prepared.budget.sources.map((s) => s.breadcrumb);

        // Show the question immediately; `prepare` has already stored it.
        qc.invalidateQueries({ queryKey: ["conversation", conversationId] });

        const transport =
          settings.provider === "webllm"
            ? (await import("@/lib/llm/webllm-transport")).createWebllmTransport(settings.webllmModel)
            : createOpenAiTransport(settings);

        for await (const token of transport.streamChat(prepared.messages, { signal: controller.signal })) {
          streamed += token;
          setStreamText((prev) => prev + token);
        }
      } catch (err) {
        const aborted = err instanceof DOMException && err.name === "AbortError";
        if (!aborted) {
          // Nothing is persisted on failure, so the thread ends on the user's
          // question — which `prepare` recognises as a retry.
          setError(
            err instanceof LlmError || err instanceof Error
              ? err.message
              : typeof err === "string"
                ? err
                : "Something went wrong.",
          );
          setIsStreaming(false);
          setStreamText("");
          return;
        }
        // A deliberate stop is different from a broken stream: the user read
        // what arrived, so it's kept rather than thrown away.
      }

      if (streamed.trim()) {
        await api.post<ChatMessage>(`/api/chat/conversations/${conversationId}/messages`, {
          content: streamed,
          model: settings.provider === "webllm" ? settings.webllmModel : settings.model,
          sources,
        });
      }

      setIsStreaming(false);
      setStreamText("");
      await qc.invalidateQueries({ queryKey: ["conversation", conversationId] });
      qc.invalidateQueries({ queryKey: ["conversations"] });
    },
    [qc],
  );

  return { send, stop, streamText, isStreaming, error, budget, clearError: () => setError(null) };
}

export type RagStatus = { total: number; indexed: number; stale: number; orphaned: number; model: string; dims: number };

type PendingChunk = {
  source: string;
  sourceId: string;
  subjectId: string;
  ordinal: number;
  breadcrumb: string;
  content: string;
  contentHash: string;
};

export function useRagStatus(enabled: boolean) {
  return useQuery({
    queryKey: ["rag-status"],
    queryFn: () => api.get<RagStatus>("/api/rag/status"),
    enabled,
    staleTime: 15_000,
  });
}

/**
 * The indexing loop (§7.3): status drives whether there's stale work, and
 * while there is, this repeatedly asks for a batch of pre-chunked pending
 * passages, embeds them with the fixed embedder, and writes them back — until
 * a pass returns nothing pending. Lazy and background, per the design: no
 * cron, no queue, because there's no server-side model to run one with.
 */
export function useIndexing(settings: LlmSettings) {
  const qc = useQueryClient();
  const [webGpuAvailable, setWebGpuAvailable] = useState<boolean | null>(null);
  const [isIndexing, setIsIndexing] = useState(false);
  const [indexedThisRun, setIndexedThisRun] = useState(0);
  const runningRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    import("@/lib/llm/webllm-transport").then(async ({ checkWebGPU }) => {
      const { available } = await checkWebGPU();
      if (!cancelled) setWebGpuAvailable(available);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const enabled = settings.ragEnabled && webGpuAvailable === true;
  const { data: status, refetch } = useRagStatus(enabled);

  useEffect(() => {
    if (!enabled || !status || status.stale === 0 || runningRef.current) return;
    runningRef.current = true;
    setIsIndexing(true);
    setIndexedThisRun(0);

    (async () => {
      const { embedPassages } = await import("@/lib/llm/webllm-transport");
      try {
        for (;;) {
          const pending = await api.get<PendingChunk[]>("/api/rag/pending?limit=20");
          if (pending.length === 0) break;

          // §7.2: the embedder sees the breadcrumb, two newlines, then the content.
          const texts = pending.map((c) => `${c.breadcrumb}\n\n${c.content}`);
          const embeddings = await embedPassages(settings.webllmModel, texts);

          const { written } = await api.post<{ written: number }>("/api/rag/chunks", {
            model: EMBEDDING_MODEL,
            dims: EMBEDDING_DIMS,
            chunks: pending.map((c, i) => ({ ...c, embedding: embeddings[i] })),
          });
          setIndexedThisRun((n) => n + written);
        }
      } finally {
        runningRef.current = false;
        setIsIndexing(false);
        refetch();
        qc.invalidateQueries({ queryKey: ["rag-status"] });
      }
    })();
  }, [enabled, status, settings.webllmModel, refetch, qc]);

  const rebuild = useCallback(async () => {
    await api.del("/api/rag/chunks");
    await refetch();
  }, [refetch]);

  return { enabled, webGpuAvailable, status, isIndexing, indexedThisRun, rebuild };
}
