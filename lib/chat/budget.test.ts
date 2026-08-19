import { describe, expect, it } from "vitest";
import { assemblePrompt, clampCeiling, DEFAULT_CEILING } from "./budget";
import { estimateTokens } from "./context";
import type { ContextSubject, PromptMessage } from "./types";

const SYSTEM = "You are a study assistant.";
const QUESTION = "What should I do next?";

/**
 * A subject whose bulk lives in the tiers the budgeter is meant to shed.
 * `openTasks` adds rows that no tier can drop, which is how the
 * subject-dropping tier gets forced.
 */
function bulkySubject(id: string, title: string, openTasks = 1): ContextSubject {
  return {
    id,
    title,
    description: "A subject.",
    milestones: [
      {
        title: `${title} phase one`,
        isCompleted: false,
        notes: "N".repeat(1200),
        tasks: [
          {
            title: `${title} done task`,
            isCompleted: true,
            priority: "HIGH",
            description: "D".repeat(400),
            subtasks: [
              { title: "finished step", isCompleted: true },
              { title: "open step", isCompleted: false },
            ],
          },
          ...Array.from({ length: openTasks }, (_, i) => ({
            title: `${title} open task ${i}`,
            isCompleted: false,
            priority: "LOW" as const,
            description: "E".repeat(400),
            subtasks: [],
          })),
        ],
      },
    ],
    resources: [
      { type: "LINK", title: `${title} ref`, url: "https://example.com", note: "R".repeat(300) },
    ],
  };
}

/** Size of a prompt at a ceiling high enough that nothing is cut. */
function fullSize(subjects: ContextSubject[]): number {
  const { messages } = assemblePrompt({
    systemPrompt: SYSTEM,
    subjects,
    history: [],
    question: QUESTION,
    ceiling: 200_000,
  });
  return messages.reduce((sum, m) => sum + estimateTokens(m.content), 0);
}

const assemble = (over: Partial<Parameters<typeof assemblePrompt>[0]> = {}) =>
  assemblePrompt({
    systemPrompt: SYSTEM,
    subjects: [bulkySubject("s1", "Alpha")],
    history: [],
    question: QUESTION,
    ceiling: DEFAULT_CEILING,
    ...over,
  });

describe("clampCeiling", () => {
  it("falls back to the default for non-numbers", () => {
    expect(clampCeiling("8000")).toBe(DEFAULT_CEILING);
    expect(clampCeiling(undefined)).toBe(DEFAULT_CEILING);
    expect(clampCeiling(NaN)).toBe(DEFAULT_CEILING);
  });

  it("clamps a hostile client value into range", () => {
    expect(clampCeiling(-1)).toBe(500);
    expect(clampCeiling(10 ** 9)).toBe(200_000);
    expect(clampCeiling(4000)).toBe(4000);
  });
});

describe("message shape", () => {
  it("puts context in the system message and the question last", () => {
    const { messages } = assemble();
    expect(messages[0].role).toBe("system");
    expect(messages[0].content).toContain(SYSTEM);
    expect(messages[0].content).toContain("# Study context");
    expect(messages[messages.length - 1]).toEqual({
      role: "user",
      content: "What should I do next?",
    });
  });

  it("omits the context block entirely when no subject is selected", () => {
    const { messages, budget } = assemble({ subjects: [] });
    expect(messages[0].content).toBe(SYSTEM);
    expect(messages[0].content).not.toContain("# Study context");
    expect(budget.subjectCount).toBe(0);
    expect(budget.truncated).toEqual([]);
  });

  it("reports no truncation when everything fits", () => {
    const { budget } = assemble({ ceiling: 200_000 });
    expect(budget.truncated).toEqual([]);
    expect(budget.subjectCount).toBe(1);
  });
});

describe("detail tiers fire in order as the ceiling tightens", () => {
  const tierFor = (ceiling: number) => assemble({ ceiling }).budget.truncated;

  it("sheds resource notes before completed tasks", () => {
    const full = assemble({ ceiling: 200_000 }).messages[0].content;
    expect(full).toContain("RRR");

    // Just under the full size: the first tier to go is resource notes.
    const ceiling = estimateTokens(full) - 20;
    const dropped = tierFor(ceiling);
    expect(dropped[0]).toBe("resource notes");
    expect(dropped).not.toContain("completed tasks");
  });

  it("accumulates tiers monotonically as the ceiling shrinks", () => {
    const roomy = tierFor(2000);
    const tight = tierFor(900);
    const tighter = tierFor(600);

    expect(tight.length).toBeGreaterThanOrEqual(roomy.length);
    expect(tighter.length).toBeGreaterThanOrEqual(tight.length);
    // Whatever a roomier ceiling gave up, a tighter one gives up too.
    for (const item of roomy) expect(tight).toContain(item);
  });

  it("keeps every stated never-drop title at an absurdly small ceiling", () => {
    const { messages } = assemble({ ceiling: 500 });
    const system = messages[0].content;
    expect(system).toContain("Alpha");
    expect(system).toContain("Alpha phase one");
    expect(system).toContain("Alpha open task");
  });

  it("names each cut in the report", () => {
    const { budget } = assemble({ ceiling: fullSize([bulkySubject("s1", "Alpha")]) - 20 });
    expect(budget.truncated.length).toBeGreaterThan(0);
    for (const item of budget.truncated) expect(item).not.toBe("");
  });
});

describe("dropping whole subjects", () => {
  // Many open tasks: titles no tier can shed, so the only way under a tight
  // ceiling is to drop whole subjects.
  const three = [
    bulkySubject("s1", "Home", 40),
    bulkySubject("s2", "Second", 40),
    bulkySubject("s3", "Third", 40),
  ];

  it("drops from the tail so the home subject survives longest", () => {
    const { messages, budget } = assemble({ subjects: three, ceiling: 500 });
    const system = messages[0].content;

    expect(system).toContain("Home");
    expect(budget.subjectCount).toBeLessThan(3);
    expect(budget.truncated.some((t) => t.includes("Third"))).toBe(true);
  });

  it("only drops subjects after every detail tier is exhausted", () => {
    // Too tight for full detail, but roomy enough that leaning out the detail
    // is sufficient on its own.
    const { budget } = assemble({ subjects: three, ceiling: 2000 });
    expect(budget.truncated).toContain("task notes");
    expect(budget.subjectCount).toBe(3);
    expect(budget.truncated.some((t) => t.startsWith("subject"))).toBe(false);
  });

  it("names every dropped subject", () => {
    const { budget } = assemble({ subjects: three, ceiling: 400 });
    const dropped = budget.truncated.filter((t) => t.startsWith("subject"));
    expect(dropped.length).toBe(3 - budget.subjectCount);
  });
});

describe("history", () => {
  const turns = (n: number, size = 400): PromptMessage[] =>
    Array.from({ length: n }, (_, i) => ({
      role: (i % 2 === 0 ? "user" : "assistant") as PromptMessage["role"],
      content: `turn ${i} ${"x".repeat(size)}`,
    }));

  it("keeps all history when it fits", () => {
    const history = turns(4);
    const { messages, budget } = assemble({ subjects: [], history, ceiling: 200_000 });
    expect(messages.length).toBe(1 + 4 + 1);
    expect(budget.truncated).toEqual([]);
  });

  it("drops the oldest turns first", () => {
    const history = turns(10);
    const { messages } = assemble({ subjects: [], history, ceiling: 900 });
    const kept = messages.slice(1, -1);

    expect(kept.length).toBeGreaterThan(0);
    expect(kept.length).toBeLessThan(10);
    // The survivors are the tail of the original history, in order.
    expect(kept).toEqual(history.slice(history.length - kept.length));
  });

  it("always keeps the newest question even when nothing else fits", () => {
    const history = turns(10);
    const { messages } = assemble({ subjects: [], history, ceiling: 500 });
    expect(messages[messages.length - 1].content).toBe("What should I do next?");
  });

  it("counts dropped messages in the report", () => {
    const history = turns(10);
    const { messages, budget } = assemble({ subjects: [], history, ceiling: 900 });
    const keptCount = messages.length - 2;
    expect(budget.truncated).toContain(`${10 - keptCount} earlier messages`);
  });

  it("uses the singular for a single dropped message", () => {
    // Sized so exactly one of the two turns fits in the remaining room. The
    // ceiling has a floor of 500, so the turns must be large enough that two
    // of them overflow it.
    const history = turns(2, 2400);
    const perTurn = estimateTokens(history[0].content);
    const ceiling = estimateTokens(SYSTEM) + estimateTokens(QUESTION) + perTurn + 10;

    const { budget } = assemble({ subjects: [], history, ceiling });
    expect(ceiling).toBeGreaterThan(500); // guard: not silently clamped
    expect(budget.truncated).toContain("1 earlier message");
  });
});
