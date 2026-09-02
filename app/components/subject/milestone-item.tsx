"use client";

import { memo, useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight, Pencil, Trash2, FileText } from "lucide-react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { useUpdateMilestone, useDeleteMilestone } from "@/hooks/useMilestones";
import { useReorderTasks } from "@/hooks/useTasks";
import type { MilestoneWithTasks } from "@/hooks/useSubjects";
import { isTempId } from "@/lib/subject-cache";
import { Markdown } from "./markdown";
import { NotesEditor } from "./notes-editor-lazy";
import { TaskRow } from "./task-row";
import { AddTask } from "./add-task";
import { SortableList } from "./sortable-list";

// Memoized: the subject-cache mappers preserve identity for untouched
// milestones, so only cards whose milestone (or tasks) changed re-render.
export const MilestoneItem = memo(function MilestoneItem({
  milestone,
  isFirst,
  isLast,
  onMove,
}: {
  milestone: MilestoneWithTasks;
  isFirst: boolean;
  isLast: boolean;
  onMove: (id: string, dir: -1 | 1) => void;
}) {
  const update = useUpdateMilestone();
  const del = useDeleteMilestone();
  const reorderTasks = useReorderTasks();

  const [open, setOpen] = useState(true);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleVal, setTitleVal] = useState(milestone.title);
  const [editingNotes, setEditingNotes] = useState(false);
  // Saving closes the editor immediately (the cache is patched optimistically),
  // so a failed save has nowhere to put the text — park it here and reopen.
  const [failedNotes, setFailedNotes] = useState<string | null>(null);

  const total = milestone.tasks.length;
  const done = milestone.tasks.filter((t) => t.isCompleted).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  // Optimistic card awaiting its server id — block edits/reorders until then.
  const pending = isTempId(milestone.id);

  const toggleDone = () =>
    update.mutate({ id: milestone.id, data: { isCompleted: !milestone.isCompleted } });

  // Re-seed the draft at edit-start so it reflects the current value, not
  // the mount-time one (props may have refetched since). NotesEditor seeds
  // itself from `value` at mount, so notes need no equivalent.
  const startEditingTitle = () => {
    setTitleVal(milestone.title);
    setEditingTitle(true);
  };

  const openNotes = () => {
    setFailedNotes(null);
    setEditingNotes(true);
  };

  const saveNotes = (v: string) => {
    setEditingNotes(false);
    setFailedNotes(null);
    update.mutate(
      { id: milestone.id, data: { notes: v } },
      {
        onError: () => {
          setFailedNotes(v);
          setEditingNotes(true);
        },
      },
    );
  };

  const saveTitle = () => {
    const t = titleVal.trim();
    if (t && t !== milestone.title) update.mutate({ id: milestone.id, data: { title: t } });
    else setTitleVal(milestone.title);
    setEditingTitle(false);
  };

  return (
    <div className={`lk-card overflow-hidden ${pending ? "pointer-events-none opacity-60" : ""}`}>
      {/* Header */}
      <div className="flex items-center gap-2 p-3">
        <Checkbox checked={milestone.isCompleted} onCheckedChange={toggleDone} className="lk-check" />

        {editingTitle ? (
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              saveTitle();
            }}
          >
            <Input
              autoFocus
              value={titleVal}
              onChange={(e) => setTitleVal(e.target.value)}
              onBlur={saveTitle}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setTitleVal(milestone.title);
                  setEditingTitle(false);
                }
              }}
              className="h-7"
            />
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex flex-1 items-center gap-2 text-left"
          >
            <ChevronRight
              size={15}
              className={`text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
            />
            <span
              className={`lk-display truncate text-[15px] font-bold tracking-tight ${milestone.isCompleted ? "text-muted-foreground line-through" : ""}`}
            >
              {milestone.title}
            </span>
            {milestone.notes.trim().length > 0 && !open && (
              <FileText size={13} className="flex-none text-muted-foreground/60" aria-label="Has notes" />
            )}
          </button>
        )}

        <span className="lk-mono hidden text-[10px] uppercase tracking-wide text-muted-foreground sm:inline">
          {done}/{total}
        </span>
        <div className="hidden w-16 sm:block">
          <div className="lk-bar">
            <i style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="flex items-center">
          <button type="button" onClick={startEditingTitle} className="lk-iconbtn" title="Rename">
            <Pencil size={13} />
          </button>
          <button
            type="button"
            onClick={() => onMove(milestone.id, -1)}
            disabled={isFirst}
            className="lk-iconbtn"
            title="Move up"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            onClick={() => onMove(milestone.id, 1)}
            disabled={isLast}
            className="lk-iconbtn"
            title="Move down"
          >
            <ChevronDown size={14} />
          </button>
          <button
            type="button"
            onClick={() => del.mutate(milestone.id)}
            disabled={del.isPending}
            className="lk-iconbtn hover:text-destructive"
            title="Delete milestone"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Body */}
      {open && (
        <div className="border-t border-border px-3 pb-3 pt-3">
          {/* Notes */}
          {editingNotes ? (
            <div className="mb-3">
              <NotesEditor
                value={failedNotes ?? milestone.notes}
                breadcrumb={milestone.title}
                placeholder="Notes — markdown supported (headings, lists, code, tables, links)…"
                onSave={saveNotes}
                onCancel={() => {
                  setEditingNotes(false);
                  setFailedNotes(null);
                }}
              />
            </div>
          ) : milestone.notes.trim() ? (
            <div className="group/notes relative mb-3 rounded-md bg-muted/40 p-3">
              <Markdown>{milestone.notes}</Markdown>
              <button
                type="button"
                onClick={openNotes}
                className="lk-iconbtn absolute right-1 top-1 opacity-0 transition-opacity group-hover/notes:opacity-100"
                title="Edit notes"
              >
                <Pencil size={13} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={openNotes}
              className="lk-mono mb-3 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileText size={13} /> Add notes
            </button>
          )}

          {/* Tasks — one plan tree: rows number themselves off this counter and
              sit flush so the depth rails run unbroken down the milestone. */}
          <div className="lk-tree flex flex-col">
            <SortableList
              ids={milestone.tasks.map((t) => t.id)}
              onReorder={(ids) => reorderTasks.mutate({ ids })}
            >
              {milestone.tasks.map((t) => (
                <TaskRow key={t.id} task={t} />
              ))}
            </SortableList>
            <div data-depth="1" className="lk-tsub">
              <AddTask subjectId={milestone.subjectId} milestoneId={milestone.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
