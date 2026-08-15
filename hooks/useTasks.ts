import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endOfDay, format } from "date-fns";
import type { Task, Priority, Recurrence } from "@/app/generated/prisma";
import { api } from "@/lib/fetcher";
import type { SubjectDetail, TaskWithSubtasks } from "@/hooks/useSubjects";
import {
  patchSubjectCaches,
  restoreSubjectCaches,
  mapTasks,
  reorderTaskList,
  addTaskToSubject,
  replaceTask,
  tempId,
} from "@/lib/subject-cache";

export type TaskWithSubject = Task & {
  subject: { id: string; title: string; color: string | null };
};

export type CreateTaskInput = {
  subjectId: string;
  milestoneId?: string | null;
  title: string;
  description?: string;
  dueDate?: string | null;
  priority?: Priority;
  estimatedTime?: number;
  recurrence?: Recurrence | null;
};

export type UpdateTaskInput = Partial<
  Omit<CreateTaskInput, "subjectId"> & { isCompleted: boolean; timeSpent: number }
>;

// Tasks scoped to a subject or milestone.
export function useTasks(params?: { subjectId?: string; milestoneId?: string }) {
  const qs = new URLSearchParams();
  if (params?.subjectId) qs.set("subjectId", params.subjectId);
  if (params?.milestoneId) qs.set("milestoneId", params.milestoneId);
  const suffix = qs.toString() ? `?${qs}` : "";
  return useQuery({
    queryKey: ["tasks", params ?? {}],
    queryFn: () => api.get<Task[]>(`/api/tasks${suffix}`),
  });
}

// Cross-subject "Today": incomplete tasks due today or overdue. The client's
// local end-of-day goes along as ?before= so the boundary follows the user's
// timezone (the server may run in UTC); the day in the key rolls it over at
// local midnight.
export function useTodayTasks() {
  const now = new Date();
  const before = endOfDay(now).toISOString();
  return useQuery({
    queryKey: ["tasks", { today: true, day: format(now, "yyyy-MM-dd") }],
    queryFn: () =>
      api.get<TaskWithSubject[]>(`/api/tasks?today=true&before=${encodeURIComponent(before)}`),
  });
}

// A task change can move progress bars on the subject grid and detail views.
// Pass subjectId when known to avoid refetching every cached subject detail.
function useInvalidateTasks() {
  const qc = useQueryClient();
  return (subjectId?: string) => {
    qc.invalidateQueries({ queryKey: ["tasks"] });
    qc.invalidateQueries({ queryKey: ["subjects"] });
    qc.invalidateQueries({ queryKey: subjectId ? ["subject", subjectId] : ["subject"] });
  };
}

// Optimistic: append a temp task to the cached subject immediately, swap it
// for the server row on success, roll back on error.
export function useCreateTask() {
  const qc = useQueryClient();
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: (input: CreateTaskInput) => api.post<Task>("/api/tasks", input),
    onMutate: async (input) => {
      const optimistic: TaskWithSubtasks = {
        id: tempId(),
        title: input.title,
        description: input.description ?? null,
        isCompleted: false,
        completedAt: null,
        dueDate: (input.dueDate ? new Date(input.dueDate) : null) as Task["dueDate"],
        priority: input.priority ?? "MEDIUM",
        estimatedTime: input.estimatedTime ?? null,
        timeSpent: null,
        recurrence: input.recurrence ?? null,
        order: Number.MAX_SAFE_INTEGER, // sorts last, like the server append
        createdAt: new Date(),
        userId: "",
        subjectId: input.subjectId,
        milestoneId: input.milestoneId ?? null,
        subtasks: [],
      };
      const prev = await patchSubjectCaches(qc, (s) => addTaskToSubject(s, optimistic));
      return { prev, tempId: optimistic.id };
    },
    onSuccess: (task, _input, ctx) => {
      qc.setQueriesData<SubjectDetail>({ queryKey: ["subject"] }, (old) =>
        old && ctx ? replaceTask(old, ctx.tempId, task) : old,
      );
    },
    onError: (_e, _v, ctx) => restoreSubjectCaches(qc, ctx?.prev),
    onSettled: (_d, _e, input) => invalidate(input.subjectId),
  });
}

// Fields whose change reaches beyond the patched row and so needs a refetch:
// completion moves the subject grid's progress and the cross-subject Today
// list, a due date moves Today, and a milestone move relocates the task between
// lists the optimistic patch leaves in place. Completing a recurring task also
// spawns its next instance server-side. Everything else (notes, title,
// priority, estimate) is fully covered by the patch + the returned row.
const needsRefetch = (data: UpdateTaskInput) =>
  data.isCompleted !== undefined || data.dueDate !== undefined || data.milestoneId !== undefined;

// Optimistic: patch the cached task immediately so the checkbox/edit reflects
// instantly, then reconcile with the server on settle.
export function useUpdateTask() {
  const qc = useQueryClient();
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskInput }) => api.put<Task>(`/api/tasks/${id}`, data),
    onMutate: async ({ id, data }) => {
      const prev = await patchSubjectCaches(qc, (s) =>
        mapTasks(s, (t) => {
          if (t.id !== id) return t;
          const patched = { ...t, ...data } as TaskWithSubtasks;
          if (data.isCompleted !== undefined) {
            patched.completedAt = (data.isCompleted ? new Date() : null) as Task["completedAt"];
          }
          return patched;
        }),
      );
      return { prev };
    },
    onSuccess: (task) => {
      qc.setQueriesData<SubjectDetail>({ queryKey: ["subject"] }, (old) =>
        old ? replaceTask(old, task.id, task) : old,
      );
    },
    onError: (_e, _v, ctx) => restoreSubjectCaches(qc, ctx?.prev),
    // A failed save also refetches, so the rolled-back cache can't drift from a
    // server that may have applied part of the write.
    onSettled: (_d, error, { data }) => {
      if (error || needsRefetch(data)) invalidate();
    },
  });
}

export function useReorderTasks() {
  const qc = useQueryClient();
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: ({ ids }: { ids: string[] }) => api.post("/api/tasks/reorder", { ids }),
    onMutate: async ({ ids }) => {
      const prev = await patchSubjectCaches(qc, (s) => reorderTaskList(s, ids));
      return { prev };
    },
    onError: (_e, _v, ctx) => restoreSubjectCaches(qc, ctx?.prev),
    onSettled: () => invalidate(),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: (id: string) => api.del<{ success: boolean }>(`/api/tasks/${id}`),
    onMutate: async (id) => {
      const prev = await patchSubjectCaches(qc, (s) => ({
        ...s,
        milestones: s.milestones.map((m) => ({ ...m, tasks: m.tasks.filter((t) => t.id !== id) })),
        tasks: s.tasks.filter((t) => t.id !== id),
      }));
      return { prev };
    },
    onError: (_e, _v, ctx) => restoreSubjectCaches(qc, ctx?.prev),
    onSettled: () => invalidate(),
  });
}

export function useTaskTimer() {
  const invalidate = useInvalidateTasks();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: "start" | "stop" }) =>
      api.post(`/api/tasks/${id}/timer`, { action }),
    onSuccess: () => invalidate(),
  });
}
