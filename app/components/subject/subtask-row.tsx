"use client";

import { memo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, GripVertical, Pencil, Trash2, FileText } from "lucide-react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { useUpdateSubtask, useDeleteSubtask, useReorderSubtasks } from "@/hooks/useSubtasks";
import type { Subtask } from "@/app/generated/prisma";
import { isTempId } from "@/lib/subject-cache";
import { Markdown } from "./markdown";
import { NotesEditor } from "./notes-editor-lazy";
import { SortableList } from "./sortable-list";
import { AddSubtask } from "./add-subtask";

// Memoized: the subject-cache mappers preserve identity for untouched
// subtasks, so only rows whose subtask actually changed re-render.
// Renders both levels: top-level rows carry `children` and nest one list of
// child rows (`isChild`), which can't nest further — the depth cap lives here.
export const SubtaskRow = memo(function SubtaskRow({
  subtask,
  isChild = false,
}: {
  subtask: Subtask & { children?: Subtask[] };
  isChild?: boolean;
}) {
  const update = useUpdateSubtask();
  const del = useDeleteSubtask();
  const reorderChildren = useReorderSubtasks();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: subtask.id,
  });

  const [open, setOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [titleVal, setTitleVal] = useState(subtask.title);
  const [editingNotes, setEditingNotes] = useState(false);
  // Saving closes the editor immediately (the cache is patched optimistically),
  // so a failed save has nowhere to put the text — park it here and reopen.
  const [failedNotes, setFailedNotes] = useState<string | null>(null);

  // Plan-tree depth: tasks are 1, so a subtask is 2 and its child items are 3.
  const depth = isChild ? 3 : 2;
  const children = subtask.children ?? [];
  const childDone = children.filter((c) => c.isCompleted).length;
  const hasNotes = subtask.notes.trim().length > 0;
  // Notes on this row or a child — keeps buried notes discoverable while collapsed.
  const hasNotesWithin = hasNotes || children.some((c) => c.notes.trim().length > 0);
  // Optimistic row awaiting its server id — block edits/toggles/drags until then.
  const pending = isTempId(subtask.id);

  const toggle = () => update.mutate({ id: subtask.id, data: { isCompleted: !subtask.isCompleted } });

  // Re-seed the draft at edit-start so it reflects the current value, not
  // the mount-time one (props may have refetched since). NotesEditor seeds
  // itself from `value` at mount, so notes need no equivalent.
  const startRenaming = () => {
    setTitleVal(subtask.title);
    setRenaming(true);
  };

  const openNotes = () => {
    setFailedNotes(null);
    setEditingNotes(true);
  };

  const saveNotes = (v: string) => {
    setEditingNotes(false);
    setFailedNotes(null);
    update.mutate(
      { id: subtask.id, data: { notes: v } },
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
    if (t && t !== subtask.title) update.mutate({ id: subtask.id, data: { title: t } });
    else setTitleVal(subtask.title);
    setRenaming(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`rounded-md ${isDragging ? "relative z-10 bg-muted/70 shadow-sm" : ""} ${pending ? "pointer-events-none opacity-60" : ""}`}
    >
      <div
        data-depth={depth}
        className="lk-trow group flex items-center gap-1.5 rounded-r-md py-1 pr-1.5"
      >
        <button
          type="button"
          className="lk-grip"
          aria-label="Drag to reorder subtask"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={13} />
        </button>

        <Checkbox checked={subtask.isCompleted} onCheckedChange={toggle} className="lk-check size-3.5" />

        {renaming ? (
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
                  setTitleVal(subtask.title);
                  setRenaming(false);
                }
              }}
              className="lk-mono h-6 text-[13px]"
            />
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex flex-1 items-center gap-1.5 text-left"
          >
            <ChevronRight
              size={12}
              className={`flex-none text-muted-foreground/70 transition-transform ${open ? "rotate-90" : ""} ${hasNotes || children.length ? "" : "opacity-40"}`}
            />
            <span
              className={`lk-mono truncate text-[13px] ${subtask.isCompleted ? "text-muted-foreground line-through" : ""}`}
            >
              {subtask.title}
            </span>
            {hasNotesWithin && !open && (
              <FileText
                size={11}
                className="flex-none text-muted-foreground/60"
                aria-label={hasNotes ? "Has notes" : "An item has notes"}
              />
            )}
          </button>
        )}

        {children.length > 0 && (
          <span className="lk-mono flex-none text-[9.5px] tabular-nums text-muted-foreground">
            {childDone}/{children.length}
          </span>
        )}

        <div className="flex items-center opacity-0 transition-opacity group-hover:opacity-100">
          <button type="button" onClick={startRenaming} className="lk-iconbtn" title="Rename subtask">
            <Pencil size={12} />
          </button>
          <button
            type="button"
            onClick={() => del.mutate(subtask.id)}
            disabled={del.isPending}
            className="lk-iconbtn hover:text-destructive"
            title="Delete subtask"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {open && (
        <>
        <div data-depth={depth} className="lk-tsub mb-1 mr-1.5 flex flex-col gap-1.5">
          {editingNotes ? (
            <NotesEditor
              value={failedNotes ?? subtask.notes}
              breadcrumb={subtask.title}
              onSave={saveNotes}
              onCancel={() => {
                setEditingNotes(false);
                setFailedNotes(null);
              }}
            />
          ) : hasNotes ? (
            <div className="group/n relative rounded-md bg-muted/40 p-2.5">
              <Markdown>{subtask.notes}</Markdown>
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

        {/* Child items — top-level subtasks only (children can't nest further).
            Kept out of the notes block so their rails/line numbers stay aligned
            with the rest of the tree. */}
        {!isChild && (
          <>
            <SortableList
              ids={children.map((c) => c.id)}
              onReorder={(ids) => reorderChildren.mutate({ ids })}
            >
              {children.map((c) => (
                <SubtaskRow key={c.id} subtask={c} isChild />
              ))}
            </SortableList>
            <div data-depth="3" className="lk-tsub mb-1">
              <AddSubtask taskId={subtask.taskId} parentId={subtask.id} />
            </div>
          </>
        )}
        </>
      )}
    </div>
  );
});
