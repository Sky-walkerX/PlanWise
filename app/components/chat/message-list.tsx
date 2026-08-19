"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/app/generated/prisma";
import { Markdown } from "@/app/components/subject/markdown";
import { SaveToNote } from "./save-to-note";

/**
 * The transcript, plus the reply currently arriving.
 *
 * Autoscroll follows the stream only while the user is already at the bottom —
 * yanking the view down while they're reading an earlier answer is worse than
 * not following at all.
 */
export function MessageList({
  messages,
  streamText,
  isStreaming,
  error,
  subjectId,
}: {
  messages: ChatMessage[];
  streamText: string;
  isStreaming: boolean;
  error: string | null;
  subjectId: string | null;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    pinnedRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el && pinnedRef.current) el.scrollTop = el.scrollHeight;
  }, [messages.length, streamText]);

  const empty = messages.length === 0 && !isStreaming && !error;

  return (
    <div ref={scrollRef} onScroll={onScroll} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
      {empty && (
        <p className="mt-8 text-center text-[12.5px] leading-relaxed text-muted-foreground">
          Ask about your plan, your notes, or anything else.
          <br />
          Pick subjects below to give the model context.
        </p>
      )}

      {messages.map((message) =>
        message.role === "USER" ? (
          <div key={message.id} className="lk-chat-bubble user whitespace-pre-wrap">
            {message.content}
          </div>
        ) : (
          <div key={message.id} className="lk-chat-bubble assistant">
            <Markdown>{message.content}</Markdown>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="lk-mono truncate text-[10px] uppercase tracking-wide text-muted-foreground">
                {message.model ?? ""}
              </span>
              {subjectId && <SaveToNote subjectId={subjectId} answer={message.content} />}
            </div>
          </div>
        ),
      )}

      {isStreaming && (
        <div className="lk-chat-bubble assistant">
          {streamText ? <Markdown>{streamText}</Markdown> : null}
          <span className="lk-chat-caret" aria-hidden />
          <span className="sr-only">Generating a reply</span>
        </div>
      )}

      {error && (
        <div className="lk-card border-destructive p-3">
          <p className="text-[12.5px] leading-relaxed text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
}
