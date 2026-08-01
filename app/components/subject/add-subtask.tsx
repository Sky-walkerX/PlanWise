"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useCreateSubtask } from "@/hooks/useSubtasks";

// With `parentId`, adds a child under that (top-level) subtask instead of the
// task's own list. Indentation is the caller's job (a `.lk-tsub` wrapper at the
// depth the new row will land on), so the form itself is flush.
export function AddSubtask({ taskId, parentId }: { taskId: string; parentId?: string }) {
  const [title, setTitle] = useState("");
  const create = useCreateSubtask();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    // Clear immediately (the row appears optimistically); restore on failure.
    setTitle("");
    create.mutate({ taskId, parentId, title: t }, { onError: () => setTitle(t) });
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-1.5 py-1 pr-1.5">
      <Plus size={12} className="text-muted-foreground" />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={parentId ? "Add an item…" : "Add a subtask…"}
        className="lk-mono flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
      />
      {title.trim() && (
        <button
          type="submit"
          className="lk-mono text-[9px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          enter ↵
        </button>
      )}
    </form>
  );
}
