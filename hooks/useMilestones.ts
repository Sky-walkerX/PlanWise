import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Milestone } from "@/app/generated/prisma";
import { api } from "@/lib/fetcher";
import type { MilestoneWithTasks, SubjectDetail } from "@/hooks/useSubjects";
import {
  patchSubjectCaches,
  restoreSubjectCaches,
  addMilestoneToSubject,
  replaceMilestone,
  reorderMilestones,
  tempId,
} from "@/lib/subject-cache";

// Milestones are read through the subject detail query (["subject", id]).
// These mutations invalidate that and the subject grid progress.
function useInvalidate() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["subject"] });
    qc.invalidateQueries({ queryKey: ["subjects"] });
  };
}

// Optimistic: append a temp milestone immediately, swap for the server row on
// success, roll back on error.
export function useCreateMilestone() {
  const qc = useQueryClient();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (input: { subjectId: string; title: string; notes?: string; order?: number }) =>
      api.post<Milestone>("/api/milestones", input),
    onMutate: async (input) => {
      const optimistic: MilestoneWithTasks = {
        id: tempId(),
        title: input.title,
        notes: input.notes ?? "",
        order: input.order ?? Number.MAX_SAFE_INTEGER, // sorts last, like the server append
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        subjectId: input.subjectId,
        tasks: [],
      };
      const prev = await patchSubjectCaches(qc, (s) => addMilestoneToSubject(s, optimistic));
      return { prev, tempId: optimistic.id };
    },
    onSuccess: (milestone, _input, ctx) => {
      qc.setQueriesData<SubjectDetail>({ queryKey: ["subject"] }, (old) =>
        old && ctx ? replaceMilestone(old, ctx.tempId, milestone) : old,
      );
    },
    onError: (_e, _v, ctx) => restoreSubjectCaches(qc, ctx?.prev),
    onSettled: invalidate,
  });
}

// The optimistic patch plus the server's returned row cover every field here,
// so no refetch — a title/notes edit changes nothing outside this milestone.
export function useUpdateMilestone() {
  const qc = useQueryClient();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{ title: string; notes: string; order: number; isCompleted: boolean }>;
    }) => api.put<Milestone>(`/api/milestones/${id}`, data),
    onMutate: async ({ id, data }) => {
      const prev = await patchSubjectCaches(qc, (s) => ({
        ...s,
        milestones: s.milestones.map((m) => (m.id === id ? { ...m, ...data } : m)),
      }));
      return { prev };
    },
    onSuccess: (milestone) => {
      qc.setQueriesData<SubjectDetail>({ queryKey: ["subject"] }, (old) =>
        old ? replaceMilestone(old, milestone.id, milestone) : old,
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

// Optimistic + atomic: re-sorts the cached list immediately and persists all
// orders in one transaction.
export function useReorderMilestones() {
  const qc = useQueryClient();
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: ({ ids }: { ids: string[] }) => api.post("/api/milestones/reorder", { ids }),
    onMutate: async ({ ids }) => {
      const prev = await patchSubjectCaches(qc, (s) => reorderMilestones(s, ids));
      return { prev };
    },
    onError: (_e, _v, ctx) => restoreSubjectCaches(qc, ctx?.prev),
    onSettled: invalidate,
  });
}

export function useDeleteMilestone() {
  const invalidate = useInvalidate();
  return useMutation({
    mutationFn: (id: string) => api.del<{ success: boolean }>(`/api/milestones/${id}`),
    onSuccess: invalidate,
  });
}
