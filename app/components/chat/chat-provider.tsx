"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChatPanel } from "./chat-panel";
import { ChatRail } from "./chat-rail";

// Mirrors the quick-add provider: the panel is global, so the hotkey and the
// hidden-route list live with the provider rather than in any one page.
const HIDE_ON = ["/login", "/signup", "/forgot-password"];
const OPEN_KEY = "lockin.chat.open";

const ChatContext = createContext<{ open: () => void }>({ open: () => {} });
export const useChatPanel = () => useContext(ChatContext);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hidden = HIDE_ON.some((p) => pathname?.startsWith(p));

  const [isOpen, setIsOpen] = useState(false);
  // Collapsing hides the panel rather than unmounting it, so a thread — and any
  // reply still arriving — survives the rail. Nothing mounts for someone who
  // never asks, which is what keeps indexing off the pages that don't need it.
  const [mounted, setMounted] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [unseen, setUnseen] = useState(false);

  // `onStreamingChange` fires from inside the panel's render tree, so the open
  // state it reads has to come from a ref rather than the closure it captured.
  const openRef = useRef(isOpen);
  openRef.current = isOpen;

  const open = useCallback(() => {
    if (hidden) return;
    setMounted(true);
    setIsOpen(true);
    setUnseen(false);
  }, [hidden]);

  const toggle = useCallback(() => {
    if (hidden) return;
    setMounted(true);
    setIsOpen((v) => {
      if (!v) setUnseen(false);
      return !v;
    });
  }, [hidden]);

  const onStreamingChange = useCallback((streaming: boolean) => {
    setIsStreaming(streaming);
    // A reply that lands behind the rail is the one worth marking.
    if (!streaming && !openRef.current) setUnseen(true);
  }, []);

  // The dock is a layout participant, so restoring it has to wait for the
  // client — reading localStorage during SSR would desync the first paint.
  useEffect(() => {
    if (localStorage.getItem(OPEN_KEY) === "1") {
      setMounted(true);
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(OPEN_KEY, isOpen ? "1" : "0");
  }, [isOpen, mounted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        toggle();
        return;
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <ChatContext.Provider value={{ open }}>
      <div className="flex min-h-screen w-full">
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>

        {!hidden && (
          <div className="sticky top-0 z-40 flex h-screen flex-none">
            {mounted && (
              <div className={isOpen ? "contents" : "hidden"}>
                <ChatPanel
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  onStreamingChange={onStreamingChange}
                />
              </div>
            )}
            <ChatRail
              isOpen={isOpen}
              isStreaming={isStreaming}
              unseen={unseen}
              onToggle={toggle}
            />
          </div>
        )}

        {/* Below `sm` the panel is an overlay again, so it needs its scrim back. */}
        {mounted && isOpen && !hidden && (
          <div
            className="fixed inset-0 z-40 bg-black/30 sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />
        )}
      </div>
    </ChatContext.Provider>
  );
}
