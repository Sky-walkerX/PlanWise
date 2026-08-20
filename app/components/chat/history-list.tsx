"use client";

import { Plus, Trash2 } from "lucide-react";
import { useConversations, useDeleteConversation, type ConversationSummary } from "@/hooks/useChat";

export function HistoryList({
  activeId,
  onPick,
  onNew,
}: {
  activeId: string | null;
  onPick: (conversation: ConversationSummary) => void;
  onNew: () => void;
}) {
  const { data: conversations, isLoading } = useConversations();
  const remove = useDeleteConversation();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <button type="button" onClick={onNew} className="lk-btn flex w-full items-center justify-center gap-1.5 px-3 py-2 text-[10.5px]">
          <Plus size={13} /> New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {isLoading && <p className="lk-mono px-2 py-2 text-[11.5px] text-muted-foreground">loading…</p>}
        {conversations?.length === 0 && (
          <p className="px-2 py-2 text-[12px] text-muted-foreground">No conversations yet.</p>
        )}
        {conversations?.map((conversation) => (
          <div
            key={conversation.id}
            className={`group flex items-center gap-1 rounded-md px-2 py-1.5 transition-colors hover:bg-muted ${
              conversation.id === activeId ? "bg-muted" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => onPick(conversation)}
              className="flex-1 truncate text-left text-[12.5px]"
            >
              {conversation.title}
            </button>
            <button
              type="button"
              onClick={() => remove.mutate(conversation.id)}
              aria-label={`Delete ${conversation.title}`}
              className="lk-iconbtn opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
