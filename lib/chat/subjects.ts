import prisma from "@/lib/prisma";
import type { ContextSubject, ContextSubtask, ContextTask } from "./types";

/**
 * Loads the subjects a conversation points at and shapes them for the digest.
 *
 * Every read is filtered by `userId`, so a stale or forged id in
 * `contextSubjectIds` yields nothing rather than another user's plan — which is
 * why the ids can be stored as a plain array with no foreign key.
 */

// Mirrors the include shape of the subject detail route, narrowed to the fields
// the digest actually renders.
const taskSelect = {
  select: {
    title: true,
    description: true,
    isCompleted: true,
    dueDate: true,
    priority: true,
    subtasks: {
      where: { parentId: null },
      orderBy: { order: "asc" as const },
      select: {
        title: true,
        isCompleted: true,
        children: {
          orderBy: { order: "asc" as const },
          select: { title: true, isCompleted: true },
        },
      },
    },
  },
  orderBy: [{ order: "asc" as const }, { createdAt: "asc" as const }],
};

type LoadedTask = {
  title: string;
  description: string | null;
  isCompleted: boolean;
  dueDate: Date | null;
  priority: ContextTask["priority"];
  subtasks: { title: string; isCompleted: boolean; children: ContextSubtask[] }[];
};

/** The digest renders one flat level, so children follow their parent inline. */
function shapeTask(task: LoadedTask): ContextTask {
  const subtasks: ContextSubtask[] = task.subtasks.flatMap((s) => [
    { title: s.title, isCompleted: s.isCompleted },
    ...s.children,
  ]);
  return {
    title: task.title,
    description: task.description,
    isCompleted: task.isCompleted,
    dueDate: task.dueDate,
    priority: task.priority,
    subtasks,
  };
}

export async function loadContextSubjects(
  userId: string,
  subjectIds: string[],
  homeSubjectId: string | null,
): Promise<ContextSubject[]> {
  if (subjectIds.length === 0) return [];

  const rows = await prisma.subject.findMany({
    where: { id: { in: subjectIds }, userId },
    select: {
      id: true,
      title: true,
      description: true,
      milestones: {
        orderBy: { order: "asc" },
        select: { title: true, notes: true, isCompleted: true, tasks: taskSelect },
      },
      tasks: { where: { milestoneId: null }, ...taskSelect },
      resources: {
        orderBy: { createdAt: "desc" },
        select: { type: true, title: true, url: true, note: true },
      },
    },
  });

  const shaped: ContextSubject[] = rows.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    milestones: s.milestones.map((m) => ({
      title: m.title,
      notes: m.notes,
      isCompleted: m.isCompleted,
      tasks: m.tasks.map(shapeTask),
    })),
    tasks: s.tasks.map(shapeTask),
    resources: s.resources,
  }));

  // The budgeter drops subjects from the tail, so the subject the chat was
  // opened from goes first and survives longest.
  shaped.sort((a, b) => {
    if (a.id === homeSubjectId) return -1;
    if (b.id === homeSubjectId) return 1;
    return subjectIds.indexOf(a.id) - subjectIds.indexOf(b.id);
  });

  return shaped;
}
