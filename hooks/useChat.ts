"use client";

import { useCallback, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChatMessage, Conversation } from "@/app/generated/prisma";
import { api } from "@/lib/fetcher";
import type { BudgetReport, PromptMessage } from "@/lib/chat/types";
import { LlmError, streamCompletion } from "@/lib/llm/client";
import { loadSettings } from "@/lib/llm/settings";

export type ConversationSummary = Pick<
  Conversation,
  "id" | "title" | "subjectId" | "contextSubjectIds" | "updatedAt"
>;

export type ConversationDetail = Conversation & { messages: ChatMessage[] };

type PrepareResponse = { messages: PromptMessage[]; budget: BudgetReport };

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
  const [budget, setBudget] = useState<BudgetReport | null>(null);
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

      let streamed = "";
      try {
        const prepared = await api.post<PrepareResponse>(
          `/api/chat/conversations/${conversationId}/prepare`,
          { content, contextTokens: settings.contextTokens },
        );
        setBudget(prepared.budget);

        // Show the question immediately; `prepare` has already stored it.
        qc.invalidateQueries({ queryKey: ["conversation", conversationId] });

        streamed = await streamCompletion({
          settings,
          messages: prepared.messages,
          signal: controller.signal,
          onToken: (token) => {
            streamed += token;
            setStreamText((prev) => prev + token);
          },
        });
      } catch (err) {
        const aborted = err instanceof DOMException && err.name === "AbortError";
        if (!aborted) {
          // Nothing is persisted on failure, so the thread ends on the user's
          // question — which `prepare` recognises as a retry.
          setError(err instanceof LlmError || err instanceof Error ? err.message : "Something went wrong.");
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
          model: settings.model,
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
