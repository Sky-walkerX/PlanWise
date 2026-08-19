import { buildDigest, estimateTokens } from "./context";
import {
  FULL_DETAIL,
  type BudgetReport,
  type ContextSubject,
  type DigestOptions,
  type PromptMessage,
} from "./types";

/**
 * Fits the system prompt, the plan digest and the conversation history under a
 * token ceiling, and reports everything it had to leave out.
 *
 * Silent truncation is how grounded answers quietly become wrong ones, so every
 * cut is named in `truncated` for the panel to show.
 *
 * Pure — takes plain data, returns plain data. No I/O, no clock.
 */

export const DEFAULT_CEILING = 8000;
const MIN_CEILING = 500;
const MAX_CEILING = 200_000;

/** The ceiling arrives from the browser's localStorage, so it is untrusted. */
export function clampCeiling(value: unknown): number {
  const n = typeof value === "number" && Number.isFinite(value) ? Math.floor(value) : DEFAULT_CEILING;
  return Math.min(MAX_CEILING, Math.max(MIN_CEILING, n));
}

/**
 * Detail tiers, richest first. Each step names what it gives up so the report
 * can quote it verbatim. Order matches the design: the cheapest-to-lose context
 * goes first, and the titles that make an answer specific are never in here.
 */
const TIERS: { options: DigestOptions; drops: string | null }[] = [
  { options: FULL_DETAIL, drops: null },
  { options: { ...FULL_DETAIL, includeResourceNotes: false }, drops: "resource notes" },
  {
    options: { ...FULL_DETAIL, includeResourceNotes: false, includeCompletedSubtasks: false },
    drops: "completed subtasks",
  },
  {
    options: {
      ...FULL_DETAIL,
      includeResourceNotes: false,
      includeCompletedSubtasks: false,
      includeCompletedTasks: false,
    },
    drops: "completed tasks",
  },
  {
    options: {
      ...FULL_DETAIL,
      includeResourceNotes: false,
      includeCompletedSubtasks: false,
      includeCompletedTasks: false,
      milestoneNoteChars: 300,
    },
    drops: "most of each milestone note",
  },
  {
    options: {
      ...FULL_DETAIL,
      includeResourceNotes: false,
      includeCompletedSubtasks: false,
      includeCompletedTasks: false,
      milestoneNoteChars: 0,
    },
    drops: "milestone notes",
  },
  {
    options: {
      includeResourceNotes: false,
      includeCompletedSubtasks: false,
      includeCompletedTasks: false,
      includeTaskDescriptions: false,
      milestoneNoteChars: 0,
    },
    drops: "task notes",
  },
];

const LEANEST = TIERS[TIERS.length - 1];

function systemWithContext(systemPrompt: string, digest: string): string {
  return digest ? `${systemPrompt}\n\n${digest}` : systemPrompt;
}

export type AssembleInput = {
  systemPrompt: string;
  /** Home subject first — subjects are dropped from the tail, so the one the
   *  chat was opened from survives longest. */
  subjects: ContextSubject[];
  /** Prior turns, oldest first, excluding the question being asked now. */
  history: PromptMessage[];
  question: string;
  ceiling: number;
};

export function assemblePrompt(input: AssembleInput): {
  messages: PromptMessage[];
  budget: BudgetReport;
} {
  const { systemPrompt, subjects, history, question } = input;
  const ceiling = clampCeiling(input.ceiling);
  const truncated: string[] = [];

  // The question and the system prompt are non-negotiable; everything else
  // competes for what's left.
  const fixedCost = estimateTokens(question) + estimateTokens(systemPrompt);

  // 1. Find the richest detail tier whose digest fits alongside the fixed cost.
  let chosen = LEANEST;
  let digest = "";
  let fitted = false;

  for (const tier of TIERS) {
    const candidate = buildDigest(subjects, tier.options);
    if (fixedCost + estimateTokens(candidate) <= ceiling) {
      chosen = tier;
      digest = candidate;
      fitted = true;
      break;
    }
  }

  // 2. Still over at the leanest tier — start dropping whole subjects from the
  //    tail until it fits, or until nothing is left.
  let kept = subjects;
  if (!fitted) {
    digest = buildDigest(subjects, LEANEST.options);
    for (let count = subjects.length - 1; count >= 0; count--) {
      const candidate = buildDigest(subjects.slice(0, count), LEANEST.options);
      kept = subjects.slice(0, count);
      digest = candidate;
      if (fixedCost + estimateTokens(candidate) <= ceiling) break;
    }
  }

  // Report every tier we passed over, plus any subject that didn't make it.
  const chosenIndex = fitted ? TIERS.indexOf(chosen) : TIERS.length - 1;
  for (let i = 1; i <= chosenIndex; i++) {
    const drops = TIERS[i].drops;
    if (drops) truncated.push(drops);
  }
  if (!fitted) {
    const dropped = subjects.slice(kept.length);
    for (const subject of dropped) truncated.push(`subject "${subject.title}"`);
  }

  const system = systemWithContext(systemPrompt, digest);

  // 3. Fill the remainder with history, newest first, so the most relevant
  //    turns survive. Pairs fall off the front.
  const used = estimateTokens(system) + estimateTokens(question);
  let remaining = ceiling - used;
  const keptHistory: PromptMessage[] = [];

  for (let i = history.length - 1; i >= 0; i--) {
    const cost = estimateTokens(history[i].content);
    if (cost > remaining) break;
    remaining -= cost;
    keptHistory.unshift(history[i]);
  }

  const droppedTurns = history.length - keptHistory.length;
  if (droppedTurns > 0) {
    truncated.push(`${droppedTurns} earlier message${droppedTurns === 1 ? "" : "s"}`);
  }

  const messages: PromptMessage[] = [
    { role: "system", content: system },
    ...keptHistory,
    { role: "user", content: question },
  ];

  return {
    messages,
    budget: {
      estimatedTokens: messages.reduce((sum, m) => sum + estimateTokens(m.content), 0),
      ceiling,
      truncated,
      subjectCount: kept.length,
    },
  };
}
