import prisma from "@/lib/prisma";
import type { VocabularyInput } from "./phrases";

/**
 * The raw material autocomplete mines: every title the user has written, and
 * every note body they've written it in.
 *
 * Reads live tables rather than `NoteChunk`, so suggestions work for users who
 * have RAG switched off, have no WebGPU, or have simply never indexed. The two
 * features share an idea of what the corpus is; they don't share a pipeline.
 *
 * Every read is filtered by `userId`, matching the convention in
 * `lib/chat/subjects.ts` and `lib/rag/sources.ts`.
 */

/** A whole-account query is the fallback when no subject is in scope; the cap
 *  keeps it from turning into an unbounded read for a heavy user. */
const MAX_SUBJECTS = 40;

export async function loadVocabularySource(
  userId: string,
  subjectId: string | null,
): Promise<VocabularyInput> {
  const subjects = await prisma.subject.findMany({
    where: { userId, isArchived: false, ...(subjectId ? { id: subjectId } : {}) },
    take: subjectId ? 1 : MAX_SUBJECTS,
    orderBy: { updatedAt: "desc" },
    select: {
      title: true,
      description: true,
      milestones: {
        select: {
          title: true,
          notes: true,
          tasks: {
            select: {
              title: true,
              description: true,
              subtasks: { select: { title: true, notes: true } },
            },
          },
        },
      },
      tasks: {
        where: { milestoneId: null },
        select: {
          title: true,
          description: true,
          subtasks: { select: { title: true, notes: true } },
        },
      },
      resources: { select: { title: true, note: true } },
    },
  });

  const titles: string[] = [];
  const notes: string[] = [];

  const add = (title: string | null | undefined, note: string | null | undefined) => {
    if (title?.trim()) titles.push(title.trim());
    if (note?.trim()) notes.push(note);
  };

  for (const subject of subjects) {
    add(subject.title, subject.description);

    for (const milestone of subject.milestones) {
      add(milestone.title, milestone.notes);
      for (const task of milestone.tasks) {
        add(task.title, task.description);
        for (const subtask of task.subtasks) add(subtask.title, subtask.notes);
      }
    }

    for (const task of subject.tasks) {
      add(task.title, task.description);
      for (const subtask of task.subtasks) add(subtask.title, subtask.notes);
    }

    // A resource's note is the user's own commentary and worth mining; its URL
    // is not, and `stripMarkdown` drops those anyway.
    for (const resource of subject.resources) add(resource.title, resource.note);
  }

  return { titles, notes };
}
