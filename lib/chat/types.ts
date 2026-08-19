import type { Subject, Milestone, Task, Subtask, Resource } from "@/app/generated/prisma";

/**
 * The slice of the plan the digest actually reads.
 *
 * Structural `Pick`s rather than the full Prisma rows: the assembler only ever
 * needs these fields, and narrowing here lets the tests build fixtures by hand
 * instead of fabricating complete database records.
 */
export type ContextSubtask = Pick<Subtask, "title" | "isCompleted">;

export type ContextTask = Pick<Task, "title" | "isCompleted" | "priority"> & {
  description?: string | null;
  dueDate?: Date | string | null;
  subtasks?: ContextSubtask[];
};

export type ContextMilestone = Pick<Milestone, "title" | "isCompleted"> & {
  notes?: string | null;
  tasks?: ContextTask[];
};

export type ContextResource = Pick<Resource, "type" | "title" | "url"> & {
  note?: string | null;
};

export type ContextSubject = Pick<Subject, "id" | "title"> & {
  description?: string | null;
  milestones?: ContextMilestone[];
  tasks?: ContextTask[]; // loose tasks — no milestone
  resources?: ContextResource[];
};

/**
 * Which tiers of detail the digest renders. `budget.ts` walks a ladder of these
 * from richest to leanest until the result fits the ceiling, so every field
 * here is a knob the budgeter can turn — never a caller preference.
 */
export type DigestOptions = {
  includeResourceNotes: boolean;
  includeCompletedSubtasks: boolean;
  includeCompletedTasks: boolean;
  includeTaskDescriptions: boolean;
  /** Per-milestone cap on note characters. 0 drops notes entirely. */
  milestoneNoteChars: number;
};

export const FULL_DETAIL: DigestOptions = {
  includeResourceNotes: true,
  includeCompletedSubtasks: true,
  includeCompletedTasks: true,
  includeTaskDescriptions: true,
  milestoneNoteChars: Infinity,
};

export type ChatRoleName = "system" | "user" | "assistant";

export type PromptMessage = {
  role: ChatRoleName;
  content: string;
};

export type BudgetReport = {
  estimatedTokens: number;
  ceiling: number;
  /** Human-readable list of what the budgeter dropped, for the UI to surface. */
  truncated: string[];
  subjectCount: number;
};
