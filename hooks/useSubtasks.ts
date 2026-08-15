import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Subtask } from "@/app/generated/prisma";
import { api } from "@/lib/fetcher";
import type { SubjectDetail, SubtaskWithChildren, TaskWithSubtasks } from "@/hooks/useSubjects";
import {
  patchSubjectCaches,
  restoreSubjectCaches,
  mapSubtasks,
  reorderSubtaskList,
  addSubtaskToTask,
  replaceSubtask,
  tempId,
} from "@/lib/subject-cache";

export type CreateSubtaskInput = {
  taskId: string;
  parentId?: string; // nest under this (top-level) subtask of the same task
  title: string;
  notes?: string;
};
export type UpdateSubtaskInput = Partial<{
  title: string;
  notes: string;
  isCompleted: boolean;
  order: number;
}>;

// Subtasks are read through the subject detail query (["subject", id]); these
// mutations patch that cache optimistically, then invalidate to reconcile.
function useInvalidate() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["subject"] });
    qc.invalidateQueries({ queryKey: ["subjects"] });
  };
}

// Optimistic: append a temp subtask immediately, swap for the server row on
// success, roll back on error.
export function useCreateSubtask() {
  const qc = useQueryClient();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (input: CreateSubtaskInput) => api.post<Subtask>("/api/subtasks", input),
    onMutate: async (input) => {
      const optimistic: SubtaskWithChildren = {
        id: tempId(),
        title: input.title,
        notes: input.notes ?? "",
        isCompleted: false,
        completedAt: null,
        order: Number.MAX_SAFE_INTEGER, // sorts last, like the server append
        createdAt: new Date(),
        taskId: input.taskId,
        parentId: input.parentId ?? null,
        children: [],
      };
      const prev = await patchSubjectCaches(qc, (s) => addSubtaskToTask(s, optimistic));
      return { prev, tempId: optimistic.id };
    },
    onSuccess: (subtask, _input, ctx) => {
      qc.setQueriesData<SubjectDetail>({ queryKey: ["subject"] }, (old) =>
        old && ctx ? replaceSubtask(old, ctx.tempId, subtask) : old,
      );
    },
    onError: (_e, _v, ctx) => restoreSubjectCaches(qc, ctx?.prev),
    onSettled: invalidate,
  });
}

// No invalidation: the optimistic patch already covers every field this can
// change, and the server's row is written straight into the cache on success.
// Subtasks feed no other query (the subject grid counts tasks, not subtasks),
// so refetching the whole subject tree here was pure round-trip cost.
export function useUpdateSubtask() {
  const qc = useQueryClient();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubtaskInput }) =>
      api.put<Subtask>(`/api/subtasks/${id}`, data),
    onMutate: async ({ id, data }) => {
      const prev = await patchSubjectCaches(qc, (s) =>
        mapSubtasks(s, (st) => {
          if (st.id !== id) return st;
          const patched = { ...st, ...data };
          if (data.isCompleted !== undefined) {
            patched.completedAt = data.isCompleted ? new Date() : null;
          }
          return patched;
        }),
      );
      return { prev };
    },
    onSuccess: (subtask) => {
      qc.setQueriesData<SubjectDetail>({ queryKey: ["subject"] }, (old) =>
        old ? replaceSubtask(old, subtask.id, subtask) : old,
      );
    },
    // A failed save still refetches, so the rolled-back cache can't drift from a
    // server that may have applied part of the write.
    onError: (_e, _v, ctx) => {
      restoreSubjectCaches(qc, ctx?.prev);
      invalidate();
    },
  });
}

export function useReorderSubtasks() {
  const qc = useQueryClient();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: ({ ids }: { ids: string[] }) => api.post("/api/subtasks/reorder", { ids }),
    onMutate: async ({ ids }) => {
      const prev = await patchSubjectCaches(qc, (s) => reorderSubtaskList(s, ids));
      return { prev };
    },
    onError: (_e, _v, ctx) => restoreSubjectCaches(qc, ctx?.prev),
    onSettled: invalidate,
  });
}

export function useDeleteSubtask() {
  const qc = useQueryClient();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (id: string) => api.del<{ success: boolean }>(`/api/subtasks/${id}`),
    onMutate: async (id) => {
      // Deleting a parent drops its children with it (they're nested inside
      // the removed node); deleting a child prunes its parent's list.
      const drop = (t: TaskWithSubtasks): TaskWithSubtasks => ({
        ...t,
        subtasks: t.subtasks
          .filter((st) => st.id !== id)
          .map((st) =>
            st.children.some((c) => c.id === id)
              ? { ...st, children: st.children.filter((c) => c.id !== id) }
              : st,
          ),
      });
      const prev = await patchSubjectCaches(qc, (s) => ({
        ...s,
        milestones: s.milestones.map((m) => ({ ...m, tasks: m.tasks.map(drop) })),
        tasks: s.tasks.map(drop),
      }));
      return { prev };
    },
    onError: (_e, _v, ctx) => restoreSubjectCaches(qc, ctx?.prev),
    onSettled: invalidate,
  });
}
