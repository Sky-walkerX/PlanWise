"use client";

import { memo, useState } from "react";
import { format, isBefore, startOfDay } from "date-fns";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, GripVertical, Pencil, Trash2, Repeat, FileText } from "lucide-react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { useReorderSubtasks } from "@/hooks/useSubtasks";
import type { TaskWithSubtasks } from "@/hooks/useSubjects";
import type { Priority, Recurrence } from "@/app/generated/prisma";
import { isTempId } from "@/lib/subject-cache";
import { Markdown } from "./markdown";
import { NotesEditor } from "./notes-editor-lazy";
import { SortableList } from "./sortable-list";
import { SubtaskRow } from "./subtask-row";
import { AddSubtask } from "./add-subtask";

const PRIORITY_COLOR: Record<Priority, string> = {
  HIGH: "var(--destructive)",
  MEDIUM: "var(--lk-warn)",
  LOW: "var(--muted-foreground)",
};

// Memoized: the subject-cache mappers preserve identity for untouched tasks,
// so only rows whose task actually changed re-render.
export const TaskRow = memo(function TaskRow({ task }: { task: TaskWithSubtasks }) {
  const update = useUpdateTask();
  const del = useDeleteTask();
  const reorderSubtasks = useReorderSubtasks();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [due, setDue] = useState(task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "");
  const [recurrence, setRecurrence] = useState<"NONE" | Recurrence>(task.recurrence ?? "NONE");
  const [editingNotes, setEditingNotes] = useState(false);
  // Saving closes the editor immediately (the cache is patched optimistically),
  // so a failed save has nowhere to put the text — park it here and reopen.
  const [failedNotes, setFailedNotes] = useState<string | null>(null);

  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const overdue = !task.isCompleted && dueDate ? isBefore(dueDate, startOfDay(new Date())) : false;

  const subtasks = task.subtasks;
  const subDone = subtasks.filter((s) => s.isCompleted).length;
  const hasNotes = (task.description ?? "").trim().length > 0;
  // Notes anywhere under this task (own, a subtask's, or a child item's) —
  // drives the collapsed-row indicator so buried notes are still discoverable.
  const hasNotesWithin =
    hasNotes ||
    subtasks.some(
      (s) => s.notes.trim().length > 0 || s.children.some((c) => c.notes.trim().length > 0),
    );
  // Optimistic row awaiting its server id — block edits/toggles/drags until then.
  const pending = isTempId(task.id);

  const toggle = () => update.mutate({ id: task.id, data: { isCompleted: !task.isCompleted } });

  // Re-seed the draft fields every time the popover opens so an edit started
  // after a background refetch shows current values, not mount-time ones.
  // (NotesEditor seeds itself from `value` at mount, so notes need no
  // equivalent.)
  const openEdit = (o: boolean) => {
    if (o) {
      setTitle(task.title);
      setPriority(task.priority);
      setDue(task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "");
      setRecurrence(task.recurrence ?? "NONE");
    }
    setEditOpen(o);
  };

  const openNotes = () => {
    setFailedNotes(null);
    setEditingNotes(true);
  };

  const saveNotes = (v: string) => {
    setEditingNotes(false);
    setFailedNotes(null);
    update.mutate(
      { id: task.id, data: { description: v } },
      {
        onError: () => {
          setFailedNotes(v);
          setEditingNotes(true);
        },
      },
    );
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    update.mutate(
      {
        id: task.id,
        data: {
          title: title.trim(),
          priority,
          dueDate: due ? new Date(`${due}T00:00:00`).toISOString() : null,
          recurrence: recurrence === "NONE" ? null : recurrence,
        },
      },
      { onSuccess: () => setEditOpen(false) },
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`rounded-md ${isDragging ? "relative z-10 bg-background shadow-md" : ""} ${pending ? "pointer-events-none opacity-60" : ""}`}
    >
      {/* Header row — depth 1 of the plan tree (gutter + rail come from .lk-trow) */}
      <div
        data-depth="1"
        className="lk-trow group flex items-center gap-1.5 rounded-r-md py-1.5 pr-1 transition-colors"
      >
        <button
          type="button"
          className="lk-grip"
          aria-label="Drag to reorder task"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={14} />
        </button>

        <Checkbox checked={task.isCompleted} onCheckedChange={toggle} className="lk-check" />

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
        >
          <ChevronRight
            size={13}
            className={`flex-none text-muted-foreground transition-transform ${open ? "rotate-90" : ""} ${subtasks.length || hasNotes ? "" : "opacity-40"}`}
          />
          <span
            className={`lk-mono truncate text-sm ${task.isCompleted ? "text-muted-foreground line-through" : ""}`}
          >
            {task.title}
          </span>
          {hasNotesWithin && !open && (
            <FileText
              size={12}
              className="flex-none text-muted-foreground/60"
              aria-label={hasNotes ? "Has notes" : "A subtask has notes"}
            />
          )}
        </button>

        {subtasks.length > 0 && (
          <span className="lk-mono flex-none text-[10px] tabular-nums text-muted-foreground">
            {subDone}/{subtasks.length}
          </span>
        )}

        {task.priority !== "MEDIUM" && (
          <span
            className="lk-mono flex-none text-[9px] font-bold uppercase tracking-wide"
            style={{ color: PRIORITY_COLOR[task.priority] }}
          >
            {task.priority}
          </span>
        )}

        {task.recurrence && (
          <span
            className="lk-mono inline-flex flex-none items-center gap-0.5 text-[9px] uppercase tracking-wide text-muted-foreground"
            title={`Repeats ${task.recurrence.toLowerCase()}`}
          >
            <Repeat size={10} />
            {task.recurrence.toLowerCase()}
          </span>
        )}

        {dueDate && (
          <span className={`lk-mono flex-none text-[10px] uppercase ${overdue ? "text-destructive" : "text-muted-foreground"}`}>
            {overdue ? "overdue · " : ""}
            {format(dueDate, "dd MMM")}
          </span>
        )}

        <div className="flex flex-none items-center opacity-0 transition-opacity group-hover:opacity-100">
          <Popover open={editOpen} onOpenChange={openEdit}>
            <PopoverTrigger asChild>
              <button type="button" className="lk-iconbtn" title="Edit task">
                <Pencil size={13} />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72">
              <form onSubmit={saveEdit} className="flex flex-col gap-3">
                <div className="lk-sec">Edit task</div>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task"
                  className="lk-mono"
                />
                <div className="flex gap-2">
                  <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                    <SelectTrigger className="flex-1" size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="date"
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <Select value={recurrence} onValueChange={(v) => setRecurrence(v as "NONE" | Recurrence)}>
                  <SelectTrigger size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">No repeat</SelectItem>
                    <SelectItem value="DAILY">Repeat daily</SelectItem>
                    <SelectItem value="WEEKLY">Repeat weekly</SelectItem>
                    <SelectItem value="MONTHLY">Repeat monthly</SelectItem>
                  </SelectContent>
                </Select>
                <button
                  type="submit"
                  disabled={update.isPending || !title.trim()}
                  className="lk-btn px-3 py-2 text-[10.5px] disabled:opacity-50"
                >
                  {update.isPending ? "Saving…" : "Save"}
                </button>
              </form>
            </PopoverContent>
          </Popover>

          <button
            type="button"
            onClick={() => del.mutate(task.id)}
            disabled={del.isPending}
            className="lk-iconbtn hover:text-destructive"
            title="Delete task"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Expanded body. Notes sit in their own indented block, but the subtask
          rows stay at the tree's left edge so their rails and line numbers line
          up with every other row. */}
      {open && (
        <>
        <div data-depth="1" className="lk-tsub mb-1 mr-1 flex flex-col gap-1.5 pb-1 pt-1">
          {/* Notes */}
          {editingNotes ? (
            <NotesEditor
              value={failedNotes ?? task.description ?? ""}
              onSave={saveNotes}
              onCancel={() => {
                setEditingNotes(false);
                setFailedNotes(null);
              }}
            />
          ) : hasNotes ? (
            <div className="group/n relative rounded-md bg-muted/40 p-2.5">
              <Markdown>{task.description ?? ""}</Markdown>
              <button
                type="button"
                onClick={openNotes}
                className="lk-iconbtn absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover/n:opacity-100"
                title="Edit notes"
              >
                <Pencil size={12} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={openNotes}
              className="lk-mono flex items-center gap-1.5 text-[10.5px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileText size={12} /> Add notes
            </button>
          )}
        </div>

        {/* Subtasks — depth 2 rows, plus an add form aligned with them */}
        <SortableList
          ids={subtasks.map((s) => s.id)}
          onReorder={(ids) => reorderSubtasks.mutate({ ids })}
        >
          {subtasks.map((s) => (
            <SubtaskRow key={s.id} subtask={s} />
          ))}
        </SortableList>
        <div data-depth="2" className="lk-tsub mb-1">
          <AddSubtask taskId={task.id} />
        </div>
        </>
      )}
    </div>
  );
});
