"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { History, Send, Settings, Square, X } from "lucide-react";
import {
  useConversation,
  useCreateConversation,
  useIndexing,
  useSendMessage,
  useUpdateConversation,
} from "@/hooks/useChat";
import { isConfigured, loadSettings, type LlmSettings } from "@/lib/llm/settings";
import { DEFAULT_SETTINGS } from "@/lib/llm/settings";
import { ContextPicker } from "./context-picker";
import { HistoryList } from "./history-list";
import { IndexStatus } from "./index-status";
import { MessageList } from "./message-list";
import { SettingsSheet } from "./settings-sheet";

type View = "chat" | "history" | "settings";

/** `/subjects/<uuid>` → the subject this chat should default to. */
function subjectIdFromPath(pathname: string | null): string | null {
  const match = pathname?.match(/^\/subjects\/([^/]+)/);
  return match ? match[1] : null;
}

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const homeSubjectId = subjectIdFromPath(pathname);

  const [conversationId, setConversationId] = useState<string | null>(null);
  const [view, setView] = useState<View>("chat");
  const [draft, setDraft] = useState("");
  // Settings live in localStorage, which isn't readable during SSR — start from
  // the defaults and hydrate on mount so the markup matches on both sides.
  const [settings, setSettings] = useState<LlmSettings>(DEFAULT_SETTINGS);
  const [selected, setSelected] = useState<string[]>(homeSubjectId ? [homeSubjectId] : []);

  const createConversation = useCreateConversation();
  const updateConversation = useUpdateConversation();
  const { data: conversation } = useConversation(conversationId ?? undefined);
  const { send, stop, streamText, isStreaming, phase, phaseDetail, error, budget } = useSendMessage();
  const indexing = useIndexing(settings);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  useEffect(() => {
    if (view === "chat") textareaRef.current?.focus();
  }, [view]);

  const ready = isConfigured(settings);
  const messages = conversation?.messages ?? [];

  const submit = async () => {
    const content = draft.trim();
    if (!content || isStreaming) return;

    if (!ready) {
      setView("settings");
      return;
    }

    let id = conversationId;
    if (!id) {
      const created = await createConversation.mutateAsync({
        subjectId: homeSubjectId,
        contextSubjectIds: selected,
      });
      id = created.id;
      setConversationId(id);
    }

    setDraft("");
    await send(id, content);
  };

  const changeContext = (ids: string[]) => {
    setSelected(ids);
    // The conversation is the single source of truth for what `prepare` reads,
    // so an existing thread has to be told; a new one carries it at creation.
    if (conversationId) {
      updateConversation.mutate({ id: conversationId, data: { contextSubjectIds: ids } });
    }
  };

  const startNew = () => {
    setConversationId(null);
    setSelected(homeSubjectId ? [homeSubjectId] : []);
    setView("chat");
  };

  const budgetLine = useMemo(() => {
    if (!budget) return null;
    const used = budget.estimatedTokens >= 1000
      ? `${(budget.estimatedTokens / 1000).toFixed(1)}k`
      : `${budget.estimatedTokens}`;
    const ceiling = budget.ceiling >= 1000 ? `${Math.round(budget.ceiling / 1000)}k` : `${budget.ceiling}`;

    // Retrieval mode reads "8 passages from 3 subjects" — the subject count
    // comes from what was actually cited, not the outline's subject count.
    const scope =
      budget.mode === "retrieval"
        ? `${budget.sources.length} passage${budget.sources.length === 1 ? "" : "s"} from ${
            new Set(budget.sources.map((s) => s.breadcrumb.split(" > ")[0])).size
          } subject${new Set(budget.sources.map((s) => s.breadcrumb.split(" > ")[0])).size === 1 ? "" : "s"}`
        : `${budget.subjectCount} subject${budget.subjectCount === 1 ? "" : "s"}`;

    return { used, ceiling, scope, truncated: budget.truncated, degraded: budget.degraded };
  }, [budget]);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 sm:hidden"
        onClick={onClose}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-label="Chat"
        className="lk-chat-panel fixed inset-y-0 right-0 z-50 flex w-full flex-col sm:w-[420px] lg:w-[480px]"
      >
        <header className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="lk-display text-sm font-black tracking-tight">Ask</span>
            <span className="lk-mono truncate text-[10.5px] uppercase tracking-wide text-muted-foreground">
              {ready ? (settings.provider === "webllm" ? settings.webllmModel : settings.model) : "not connected"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setView(view === "history" ? "chat" : "history")}
              aria-label="Conversation history"
              className="lk-iconbtn"
            >
              <History size={15} />
            </button>
            <button
              type="button"
              onClick={() => setView(view === "settings" ? "chat" : "settings")}
              aria-label="Connection settings"
              className="lk-iconbtn"
            >
              <Settings size={15} />
            </button>
            <button type="button" onClick={onClose} aria-label="Close chat" className="lk-iconbtn">
              <X size={15} />
            </button>
          </div>
        </header>

        {view === "settings" && (
          <div className="flex-1 overflow-hidden">
            <SettingsSheet settings={settings} onChange={setSettings} onClose={() => setView("chat")} />
          </div>
        )}

        {view === "history" && (
          <div className="flex-1 overflow-hidden">
            <HistoryList
              activeId={conversationId}
              onNew={startNew}
              onPick={(picked) => {
                setConversationId(picked.id);
                setSelected(picked.contextSubjectIds);
                setView("chat");
              }}
            />
          </div>
        )}

        {view === "chat" && (
          <>
            <IndexStatus indexing={indexing} />
            <MessageList
              messages={messages}
              streamText={streamText}
              isStreaming={isStreaming}
              phase={phase}
              phaseDetail={phaseDetail}
              error={error}
              subjectId={homeSubjectId}
            />

            <div className="border-t border-border px-4 py-3">
              <ContextPicker selected={selected} onChange={changeContext} />

              <div className="lk-chat-composer mt-2.5 flex items-end gap-2 px-2.5 py-2">
                <textarea
                  ref={textareaRef}
                  rows={2}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    // Enter sends; Shift+Enter is a newline — the composer is a
                    // chat box first and a text editor second.
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void submit();
                    }
                  }}
                  placeholder={ready ? "Ask something…" : "Connect a model to start"}
                  className="lk-mono"
                />
                {isStreaming ? (
                  <button type="button" onClick={stop} aria-label="Stop generating" className="lk-iconbtn shrink-0">
                    <Square size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void submit()}
                    disabled={!draft.trim()}
                    aria-label="Send"
                    className="lk-iconbtn shrink-0"
                  >
                    <Send size={14} />
                  </button>
                )}
              </div>

              {budgetLine && (
                <p className="lk-mono mt-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                  ctx {budgetLine.used}/{budgetLine.ceiling} · {budgetLine.scope}
                  {budgetLine.degraded && <span className="text-destructive"> · notes not searched this turn</span>}
                  {budgetLine.truncated.length > 0 && (
                    <span className="text-destructive"> · left out {budgetLine.truncated.join(", ")}</span>
                  )}
                </p>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}
