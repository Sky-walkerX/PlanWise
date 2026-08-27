"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/app/generated/prisma";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Markdown } from "@/app/components/subject/markdown";
import { splitReasoning } from "@/lib/chat/reasoning";
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
          <AssistantBubble
            key={message.id}
            content={message.content}
            model={message.model}
            sources={message.sources}
            subjectId={subjectId}
          />
        ),
      )}

      {isStreaming && <StreamingBubble text={streamText} />}

      {error && (
        <div className="lk-card border-destructive p-3">
          <p className="text-[12.5px] leading-relaxed text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
}

/**
 * A stored reply. Reasoning models emit a `<think>` scratchpad that would bury
 * the answer, so it's split out and collapsed — available, but not in the way.
 */
function AssistantBubble({
  content,
  model,
  sources,
  subjectId,
}: {
  content: string;
  model: string | null;
  sources: string[];
  subjectId: string | null;
}) {
  const { answer, reasoning } = splitReasoning(content);

  return (
    <div className="lk-chat-bubble assistant">
      {reasoning && <Reasoning text={reasoning} />}
      <Markdown>{answer}</Markdown>
      {sources.length > 0 && <Sources breadcrumbs={sources} />}
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="lk-mono truncate text-[10px] uppercase tracking-wide text-muted-foreground">
          {model ?? ""}
        </span>
        {subjectId && <SaveToNote subjectId={subjectId} answer={answer} />}
      </div>
    </div>
  );
}

/**
 * The retrieved passages an answer drew on — collapsed by default. This is
 * the feature's honesty mechanism: it's how a user notices the model
 * answered from the wrong passage, per §12 of the RAG design.
 *
 * Plain text rather than links: `ChatMessage.sources` stores breadcrumbs
 * only (§6), not per-passage subject ids, and a retrieved passage can belong
 * to any subject in scope — not just the one the chat was opened from.
 */
function Sources({ breadcrumbs }: { breadcrumbs: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="lk-mono flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
      >
        {open ? <ChevronDown size={11} /> : <ChevronRight size={11} />} sources · {breadcrumbs.length}
      </button>
      {open && (
        <ul className="mt-1.5 space-y-1 border-l-2 border-border pl-2.5">
          {breadcrumbs.map((breadcrumb, i) => (
            <li key={i} className="text-[11px] leading-relaxed text-muted-foreground">
              {breadcrumb}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** The reply as it arrives. Shows "thinking" until the answer itself starts. */
function StreamingBubble({ text }: { text: string }) {
  const { answer, reasoning, thinking } = splitReasoning(text);

  return (
    <div className="lk-chat-bubble assistant">
      {reasoning && <Reasoning text={reasoning} defaultOpen={false} />}
      {thinking && !answer && (
        <span className="lk-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          thinking
        </span>
      )}
      {answer && <Markdown>{answer}</Markdown>}
      <span className="lk-chat-caret" aria-hidden />
      <span className="sr-only">Generating a reply</span>
    </div>
  );
}

function Reasoning({ text, defaultOpen = false }: { text: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="lk-mono flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
      >
        {open ? <ChevronDown size={11} /> : <ChevronRight size={11} />} reasoning
      </button>
      {open && (
        <div className="mt-1.5 whitespace-pre-wrap border-l-2 border-border pl-2.5 text-[11.5px] leading-relaxed text-muted-foreground">
          {text}
        </div>
      )}
    </div>
  );
}
