import type {
  ContextMilestone,
  ContextResource,
  ContextSubject,
  ContextTask,
  DigestOptions,
} from "./types";

/**
 * Turns the user's plan into the markdown block that gets prepended to a chat.
 *
 * Markdown rather than JSON on purpose: small local models follow headings and
 * checklists far more reliably than nested objects, and the same content costs
 * roughly 40% fewer tokens without repeated keys, quotes and braces.
 *
 * Pure — no I/O, no Prisma, no clock. Output is fully determined by its inputs,
 * which is what makes the budgeter's search over `DigestOptions` meaningful and
 * the whole layer testable without a database.
 */

/** Rough token count. Deliberately tokenizer-free: every runtime tokenizes
 *  differently, so the estimate only has to be conservative, not exact. */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

const TASK_DESCRIPTION_CHARS = 200;
const RESOURCE_NOTE_CHARS = 160;

/** Collapse markdown to a single line and cap it, marking any cut. */
function flatten(text: string, cap: number): string {
  const oneLine = text.replace(/\s+/g, " ").trim();
  if (oneLine.length <= cap) return oneLine;
  return `${oneLine.slice(0, cap).trimEnd()}…`;
}

/** The digest owns `#`–`###`; user notes are nested below a milestone. */
const MIN_NOTE_HEADING = 4;

/**
 * Push any heading inside a user's note down to at least `####`.
 *
 * Notes are the user's own markdown and routinely start with `## Something`.
 * Left alone, that heading reads as a sibling of `## Subject:` and silently
 * re-parents everything after it — the model then attributes one subject's
 * notes to the next. Demoting preserves the user's own structure while keeping
 * the digest's outline intact.
 */
function demoteHeadings(markdown: string): string {
  return markdown.replace(/^(#{1,6})(\s)/gm, (_match, hashes: string, space: string) => {
    const level = Math.min(6, Math.max(MIN_NOTE_HEADING, hashes.length + MIN_NOTE_HEADING - 1));
    return "#".repeat(level) + space;
  });
}

/** Multi-line notes keep their structure; only the tail is cut. */
function capNotes(notes: string, cap: number): string {
  const trimmed = demoteHeadings(notes.trim());
  if (cap === Infinity || trimmed.length <= cap) return trimmed;
  return `${trimmed.slice(0, cap).trimEnd()}\n…[truncated]`;
}

function formatDueDate(due: Date | string): string | null {
  const d = due instanceof Date ? due : new Date(due);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function renderTask(task: ContextTask, options: DigestOptions, indent = ""): string[] {
  const lines: string[] = [];
  const meta: string[] = [];

  // MEDIUM is the default and carries no information — spending tokens on it
  // in every row would crowd out the notes that do.
  if (task.priority && task.priority !== "MEDIUM") meta.push(task.priority);
  if (task.dueDate) {
    const due = formatDueDate(task.dueDate);
    if (due) meta.push(`due ${due}`);
  }

  const suffix = meta.length > 0 ? ` · ${meta.join(" · ")}` : "";
  lines.push(`${indent}- [${task.isCompleted ? "x" : " "}] ${task.title}${suffix}`);

  if (options.includeTaskDescriptions && task.description?.trim()) {
    lines.push(`${indent}  note: ${flatten(task.description, TASK_DESCRIPTION_CHARS)}`);
  }

  const subtasks = task.subtasks ?? [];
  const visible = options.includeCompletedSubtasks
    ? subtasks
    : subtasks.filter((s) => !s.isCompleted);
  for (const sub of visible) {
    lines.push(`${indent}  - [${sub.isCompleted ? "x" : " "}] ${sub.title}`);
  }

  return lines;
}

/** Render a task list, collapsing completed rows to a count when they're cut. */
function renderTaskList(tasks: ContextTask[], options: DigestOptions): string[] {
  if (options.includeCompletedTasks) {
    return tasks.flatMap((t) => renderTask(t, options));
  }
  const open = tasks.filter((t) => !t.isCompleted);
  const doneCount = tasks.length - open.length;
  const lines = open.flatMap((t) => renderTask(t, options));
  if (doneCount > 0) lines.push(`- — ${doneCount} completed`);
  return lines;
}

function renderMilestone(milestone: ContextMilestone, options: DigestOptions): string[] {
  const tasks = milestone.tasks ?? [];
  const done = tasks.filter((t) => t.isCompleted).length;
  const progress = tasks.length > 0 ? ` — ${done}/${tasks.length} done` : milestone.isCompleted ? " — done" : "";

  const lines = [`### Milestone: ${milestone.title}${progress}`];

  if (options.milestoneNoteChars > 0 && milestone.notes?.trim()) {
    const notes = capNotes(milestone.notes, options.milestoneNoteChars);
    if (notes) lines.push(notes);
  }

  if (tasks.length > 0) lines.push(...renderTaskList(tasks, options));
  return lines;
}

function renderResource(resource: ContextResource, options: DigestOptions): string[] {
  const lines = [`- ${resource.type} · ${resource.title} — ${resource.url}`];
  if (options.includeResourceNotes && resource.note?.trim()) {
    lines.push(`  ${flatten(resource.note, RESOURCE_NOTE_CHARS)}`);
  }
  return lines;
}

/** One subject as a `## Subject:` section. Exported for the budgeter, which
 *  sizes subjects individually before deciding which to drop. */
export function renderSubject(subject: ContextSubject, options: DigestOptions): string {
  const blocks: string[][] = [];

  const header = [`## Subject: ${subject.title}`];
  if (subject.description?.trim()) header.push(subject.description.trim());
  blocks.push(header);

  for (const milestone of subject.milestones ?? []) {
    blocks.push(renderMilestone(milestone, options));
  }

  const loose = subject.tasks ?? [];
  if (loose.length > 0) {
    blocks.push(["### Tasks — no milestone", ...renderTaskList(loose, options)]);
  }

  const resources = subject.resources ?? [];
  if (resources.length > 0) {
    blocks.push(["### Resources", ...resources.flatMap((r) => renderResource(r, options))]);
  }

  return blocks.map((b) => b.join("\n")).join("\n\n");
}

/**
 * The full context block for a set of subjects. Empty selection yields an empty
 * string — plain, context-free chat is this same path with nothing picked, not
 * a separate mode.
 */
export function buildDigest(subjects: ContextSubject[], options: DigestOptions): string {
  if (subjects.length === 0) return "";
  const sections = subjects.map((s) => renderSubject(s, options));
  return ["# Study context", ...sections].join("\n\n");
}
