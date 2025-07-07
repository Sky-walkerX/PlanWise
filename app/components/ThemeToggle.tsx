"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className="mt-4 px-4 py-2 rounded bg-[var(--secondarybg)] text-[var(--accent2bg)] hover:opacity-80 transition"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
}
