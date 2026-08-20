"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sparkles, Terminal, LogOut, Plus, MessageSquare } from "lucide-react";
import { useQuickAdd } from "./quick-add";
import { useChatPanel } from "./chat/chat-provider";

const HIDE_ON = ["/login", "/signup", "/forgot-password"];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const { open: openQuickAdd } = useQuickAdd();
  const { open: openChat } = useChatPanel();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (HIDE_ON.some((p) => pathname?.startsWith(p))) return null;

  const isFocus = resolvedTheme === "dark";

  const navItem = (href: string, label: string) => {
    const active = href === "/" ? pathname === "/" : pathname?.startsWith(href);
    return (
      <Link
        href={href}
        className={`lk-mono text-[12.5px] uppercase tracking-wide transition-colors ${
          active ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-10 xl:px-16">
      <div className="flex items-center gap-7">
        <Link href="/" className="lk-display text-xl font-black tracking-tight">
          Lock<span className="lk-brand-mark">In</span>
        </Link>
        <nav className="hidden items-center gap-5 sm:flex">
          {navItem("/", "Subjects")}
          {navItem("/focus", "Focus")}
          {navItem("/analytics", "Analytics")}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {session?.user && (
          <button
            type="button"
            onClick={openQuickAdd}
            title="Quick add (⌘K)"
            className="lk-mono flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            <Plus size={13} />
            <span className="hidden md:inline">⌘K</span>
          </button>
        )}
        {session?.user && (
          <button
            type="button"
            onClick={openChat}
            title="Ask your model (⌘J)"
            className="lk-mono flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageSquare size={13} />
            <span className="hidden md:inline">⌘J</span>
          </button>
        )}
        {mounted && (
          <button
            type="button"
            onClick={() => setTheme(isFocus ? "light" : "dark")}
            title={isFocus ? "Switch to Creative mode" : "Switch to Focus mode"}
            className="lk-mono flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            {isFocus ? <Sparkles size={13} /> : <Terminal size={13} />}
            <span className="hidden md:inline">{isFocus ? "Creative" : "Focus"}</span>
          </button>
        )}
        {session?.user && (
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Sign out"
            className="lk-mono flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            <LogOut size={13} />
          </button>
        )}
      </div>
    </header>
  );
}
