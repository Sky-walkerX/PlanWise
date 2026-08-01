"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useCreateTask } from "@/hooks/useTasks";

export function AddTask({
  subjectId,
  milestoneId = null,
}: {
  subjectId: string;
  milestoneId?: string | null;
}) {
  const [title, setTitle] = useState("");
  const create = useCreateTask();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    // Clear immediately (the row appears optimistically); restore on failure.
    setTitle("");
    create.mutate(
      { subjectId, milestoneId, title: t },
      { onError: () => setTitle(t) },
    );
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2 py-1 pr-1.5">
      <Plus size={14} className="text-muted-foreground" />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task…"
        className="lk-mono flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      {title.trim() && (
        <button
          type="submit"
          className="lk-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          enter ↵
        </button>
      )}
    </form>
  );
}
