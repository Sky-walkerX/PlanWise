"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChatPanel } from "./chat-panel";

// Mirrors the quick-add provider: the panel is global, so the hotkey and the
// hidden-route list live with the provider rather than in any one page.
const HIDE_ON = ["/login", "/signup", "/forgot-password"];

const ChatContext = createContext<{ open: () => void }>({ open: () => {} });
export const useChatPanel = () => useContext(ChatContext);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hidden = HIDE_ON.some((p) => pathname?.startsWith(p));
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    if (!hidden) setIsOpen(true);
  }, [hidden]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        if (!hidden) setIsOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hidden]);

  return (
    <ChatContext.Provider value={{ open }}>
      {children}
      {isOpen && !hidden && <ChatPanel onClose={() => setIsOpen(false)} />}
    </ChatContext.Provider>
  );
}
