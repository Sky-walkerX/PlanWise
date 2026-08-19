"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { BookmarkPlus, Check, Loader2 } from "lucide-react";
import { api } from "@/lib/fetcher";
import { useSubject } from "@/hooks/useSubjects";

type Target =
  | { kind: "milestone"; id: string; label: string }
  | { kind: "task"; id: string; label: string }
  | { kind: "subtask"; id: string; label: string };

/** Appended rather than replaced — a note is the user's, and a chat answer is
 *  an addition to it, never a substitution for what they already wrote. */
function appended(existing: string, answer: string): string {
  // Local date, not UTC: a note stamped "yesterday" because the user is east
  // of Greenwich at 2am is wrong in the only timezone that matters to them.
  const stamp = format(new Date(), "yyyy-MM-dd");
  const block = `---\n*from chat · ${stamp}*\n\n${answer.trim()}`;
  return existing.trim() ? `${existing.trim()}\n\n${block}` : block;
}

/**
 * Files an assistant reply into one of the current subject's notes.
 *
 * Reuses the existing per-entity update routes — the note fields differ by
 * entity (`notes` on milestones and subtasks, `description` on tasks), which is
 * the only branching here.
 */
export function SaveToNote({ subjectId, answer }: { subjectId: string; answer: string }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const { data: subject } = useSubject(open ? subjectId : undefined);

  const targets: Target[] = [];
  for (const milestone of subject?.milestones ?? []) {
    targets.push({ kind: "milestone", id: milestone.id, label: milestone.title });
    for (const task of milestone.tasks) {
      targets.push({ kind: "task", id: task.id, label: `↳ ${task.title}` });
      for (const sub of task.subtasks) {
        targets.push({ kind: "subtask", id: sub.id, label: `  ↳ ${sub.title}` });
      }
    }
  }
  for (const task of subject?.tasks ?? []) {
    targets.push({ kind: "task", id: task.id, label: task.title });
    for (const sub of task.subtasks) {
      targets.push({ kind: "subtask", id: sub.id, label: `↳ ${sub.title}` });
    }
  }

  const existingNote = (target: Target): string => {
    if (!subject) return "";
    if (target.kind === "milestone") {
      return subject.milestones.find((m) => m.id === target.id)?.notes ?? "";
    }
    const allTasks = [...subject.milestones.flatMap((m) => m.tasks), ...subject.tasks];
    if (target.kind === "task") {
      return allTasks.find((t) => t.id === target.id)?.description ?? "";
    }
    const allSubtasks = allTasks.flatMap((t) => t.subtasks.flatMap((s) => [s, ...s.children]));
    return allSubtasks.find((s) => s.id === target.id)?.notes ?? "";
  };

  const save = async (target: Target) => {
    setSaving(target.id);
    try {
      const body = appended(existingNote(target), answer);
      if (target.kind === "milestone") {
        await api.put(`/api/milestones/${target.id}`, { notes: body });
      } else if (target.kind === "task") {
        await api.put(`/api/tasks/${target.id}`, { description: body });
      } else {
        await api.put(`/api/subtasks/${target.id}`, { notes: body });
      }
      await qc.invalidateQueries({ queryKey: ["subject", subjectId] });
      setSaved(true);
      setOpen(false);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(null);
    }
  };

  if (saved) {
    return (
      <span className="lk-mono flex items-center gap-1 text-[10.5px] uppercase tracking-wide text-muted-foreground">
        <Check size={12} /> saved
      </span>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="lk-mono flex items-center gap-1 text-[10.5px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
      >
        <BookmarkPlus size={12} /> save to note
      </button>

      {open && (
        <div className="lk-card absolute bottom-full right-0 z-10 mb-1.5 max-h-64 w-64 overflow-y-auto p-1.5">
          {targets.length === 0 ? (
            <p className="px-2 py-2 text-[11.5px] text-muted-foreground">
              {subject ? "Nothing in this subject to save into yet." : "Loading…"}
            </p>
          ) : (
            targets.map((target) => (
              <button
                key={`${target.kind}-${target.id}`}
                type="button"
                onClick={() => save(target)}
                disabled={saving !== null}
                className="flex w-full items-center gap-1.5 truncate rounded-md px-2 py-1.5 text-left text-[12px] transition-colors hover:bg-muted disabled:opacity-50"
              >
                {saving === target.id && <Loader2 size={11} className="shrink-0 animate-spin" />}
                <span className="truncate">{target.label}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
