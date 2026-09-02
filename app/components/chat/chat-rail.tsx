"use client";

import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";

/**
 * The strip that is always reserved at the right edge of the shell.
 *
 * It is the chat's resting state rather than a closed panel: collapsing leaves
 * the conversation mounted behind it, so the dot can report an answer that
 * arrived while the panel was away. Below `sm` there is no room to reserve, so
 * the rail steps aside and the panel goes back to being an overlay.
 */
export function ChatRail({
  isOpen,
  isStreaming,
  unseen,
  onToggle,
}: {
  isOpen: boolean;
  isStreaming: boolean;
  unseen: boolean;
  onToggle: () => void;
}) {
  const Chevron = isOpen ? ChevronRight : ChevronLeft;

  return (
    <div className="lk-chat-rail hidden w-12 flex-none flex-col items-center gap-3.5 py-3 sm:flex">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Collapse chat" : "Expand chat"}
        className="lk-iconbtn"
      >
        <Chevron size={15} />
      </button>

      <div className="h-px w-[26px] bg-border" />

      <button
        type="button"
        onClick={onToggle}
        title="Ask your model (⌘J)"
        aria-label="Ask your model"
        className="lk-iconbtn relative"
      >
        <MessageSquare size={15} />
        {(isStreaming || unseen) && (
          <span className={`lk-chat-dot${isStreaming ? " streaming" : ""}`} aria-hidden />
        )}
      </button>

      <span className="lk-mono lk-chat-rail-label" aria-hidden>
        Ask · ⌘J
      </span>
    </div>
  );
}
