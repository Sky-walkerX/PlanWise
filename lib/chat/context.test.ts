import { describe, expect, it } from "vitest";
import { buildDigest, buildOutline, demoteHeadings, estimateTokens, renderSubject } from "./context";
import { FULL_DETAIL, type ContextSubject, type DigestOptions } from "./types";

const lean = (over: Partial<DigestOptions> = {}): DigestOptions => ({
  ...FULL_DETAIL,
  ...over,
});

const osSubject: ContextSubject = {
  id: "s1",
  title: "Operating Systems",
  description: "Processes, memory, filesystems for GATE.",
  milestones: [
    {
      title: "Memory management",
      isCompleted: false,
      notes: "Paging vs segmentation; TLB numericals are the weak spot.",
      tasks: [
        {
          title: "Read Ch. 8",
          isCompleted: true,
          priority: "HIGH",
          dueDate: new Date("2026-08-22T00:00:00Z"),
          description: "Silberschatz, skim the diagrams first.",
          subtasks: [
            { title: "paging", isCompleted: true },
            { title: "segmentation", isCompleted: false },
          ],
        },
        {
          title: "Solve past-year questions",
          isCompleted: false,
          priority: "MEDIUM",
          subtasks: [],
        },
      ],
    },
  ],
  tasks: [{ title: "Revise virtual memory", isCompleted: false, priority: "LOW" }],
  resources: [
    { type: "LINK", title: "OSTEP", url: "https://ostep.org", note: "Free textbook." },
  ],
};

describe("estimateTokens", () => {
  it("approximates four characters per token", () => {
    expect(estimateTokens("")).toBe(0);
    expect(estimateTokens("abcd")).toBe(1);
    expect(estimateTokens("abcde")).toBe(2);
  });
});

describe("buildDigest", () => {
  it("returns an empty string when nothing is selected", () => {
    expect(buildDigest([], FULL_DETAIL)).toBe("");
  });

  it("renders a full subject as structured markdown", () => {
    const out = buildDigest([osSubject], FULL_DETAIL);

    expect(out).toContain("# Study context");
    expect(out).toContain("## Subject: Operating Systems");
    expect(out).toContain("Processes, memory, filesystems for GATE.");
    expect(out).toContain("### Milestone: Memory management — 1/2 done");
    expect(out).toContain("Paging vs segmentation");
    expect(out).toContain("### Tasks — no milestone");
    expect(out).toContain("### Resources");
  });

  it("marks completion with checkbox syntax", () => {
    const out = buildDigest([osSubject], FULL_DETAIL);
    expect(out).toContain("- [x] Read Ch. 8");
    expect(out).toContain("- [ ] Solve past-year questions");
  });

  it("shows non-default priority and due date, and omits MEDIUM", () => {
    const out = buildDigest([osSubject], FULL_DETAIL);
    expect(out).toContain("- [x] Read Ch. 8 · HIGH · due 2026-08-22");
    expect(out).toContain("- [ ] Solve past-year questions\n");
    expect(out).not.toContain("MEDIUM");
  });

  it("nests subtasks under their task", () => {
    const out = buildDigest([osSubject], FULL_DETAIL);
    expect(out).toContain("  - [x] paging");
    expect(out).toContain("  - [ ] segmentation");
  });

  it("renders resources with type, title and url", () => {
    const out = buildDigest([osSubject], FULL_DETAIL);
    expect(out).toContain("- LINK · OSTEP — https://ostep.org");
    expect(out).toContain("Free textbook.");
  });

  it("keeps subject order stable and deterministic", () => {
    const second: ContextSubject = { id: "s2", title: "Networks" };
    const a = buildDigest([osSubject, second], FULL_DETAIL);
    const b = buildDigest([osSubject, second], FULL_DETAIL);
    expect(a).toBe(b);
    expect(a.indexOf("Operating Systems")).toBeLessThan(a.indexOf("Networks"));
  });
});

describe("empty and partial shapes", () => {
  it("renders a subject with no milestones, tasks or resources", () => {
    const out = buildDigest([{ id: "s2", title: "Networks" }], FULL_DETAIL);
    expect(out).toContain("## Subject: Networks");
    expect(out).not.toContain("### Resources");
    expect(out).not.toContain("### Tasks");
  });

  it("omits the progress suffix for a milestone with no tasks", () => {
    const out = renderSubject(
      { id: "s3", title: "X", milestones: [{ title: "Empty", isCompleted: false }] },
      FULL_DETAIL,
    );
    expect(out).toContain("### Milestone: Empty");
    expect(out).not.toContain("0/0");
  });

  it("marks a completed task-less milestone as done", () => {
    const out = renderSubject(
      { id: "s4", title: "X", milestones: [{ title: "Setup", isCompleted: true }] },
      FULL_DETAIL,
    );
    expect(out).toContain("### Milestone: Setup — done");
  });

  it("skips an invalid due date rather than emitting garbage", () => {
    const out = renderSubject(
      { id: "s5", title: "X", tasks: [{ title: "T", isCompleted: false, priority: "MEDIUM", dueDate: "not-a-date" }] },
      FULL_DETAIL,
    );
    expect(out).toContain("- [ ] T");
    expect(out).not.toContain("due");
  });
});

describe("detail tiers", () => {
  it("drops resource notes but keeps the resource", () => {
    const out = renderSubject(osSubject, lean({ includeResourceNotes: false }));
    expect(out).toContain("- LINK · OSTEP — https://ostep.org");
    expect(out).not.toContain("Free textbook.");
  });

  it("drops completed subtasks but keeps open ones", () => {
    const out = renderSubject(osSubject, lean({ includeCompletedSubtasks: false }));
    expect(out).not.toContain("- [x] paging");
    expect(out).toContain("- [ ] segmentation");
  });

  it("collapses completed tasks to a count", () => {
    const out = renderSubject(osSubject, lean({ includeCompletedTasks: false }));
    expect(out).not.toContain("Read Ch. 8");
    expect(out).toContain("— 1 completed");
    expect(out).toContain("- [ ] Solve past-year questions");
  });

  it("truncates milestone notes and marks the cut", () => {
    const out = renderSubject(osSubject, lean({ milestoneNoteChars: 12 }));
    expect(out).toContain("…[truncated]");
    expect(out).not.toContain("TLB numericals");
  });

  it("drops milestone notes entirely at zero", () => {
    const out = renderSubject(osSubject, lean({ milestoneNoteChars: 0 }));
    expect(out).not.toContain("Paging vs segmentation");
    expect(out).toContain("### Milestone: Memory management");
  });

  it("drops task descriptions", () => {
    const out = renderSubject(osSubject, lean({ includeTaskDescriptions: false }));
    expect(out).not.toContain("Silberschatz");
    expect(out).toContain("- [x] Read Ch. 8");
  });

  it("always keeps subject, milestone and open-task titles at the leanest tier", () => {
    const out = renderSubject(
      osSubject,
      lean({
        includeResourceNotes: false,
        includeCompletedSubtasks: false,
        includeCompletedTasks: false,
        includeTaskDescriptions: false,
        milestoneNoteChars: 0,
      }),
    );
    expect(out).toContain("Operating Systems");
    expect(out).toContain("Memory management");
    expect(out).toContain("Solve past-year questions");
    expect(out).toContain("Revise virtual memory");
  });
});

describe("buildOutline", () => {
  it("returns an empty string when nothing is selected", () => {
    expect(buildOutline([])).toBe("");
  });

  it("omits note bodies and keeps structure and progress counts", () => {
    const out = buildOutline([osSubject]);

    expect(out).toContain("## Plan outline");
    expect(out).toContain("### Operating Systems");
    expect(out).toContain("- Memory management — 1/2 done");
    expect(out).not.toContain("Paging vs segmentation");
    expect(out).not.toContain("Processes, memory, filesystems for GATE.");
  });

  it("lists open tasks but collapses completed ones into the progress count", () => {
    const out = buildOutline([osSubject]);
    expect(out).toContain("- [ ] Solve past-year questions");
    expect(out).not.toContain("Read Ch. 8");
  });

  it("includes loose (no-milestone) open tasks", () => {
    const out = buildOutline([osSubject]);
    expect(out).toContain("- [ ] Revise virtual memory");
  });

  it("keeps subject and milestone titles for an otherwise empty subject", () => {
    const out = buildOutline([{ id: "s2", title: "Networks" }]);
    expect(out).toContain("### Networks");
  });
});

describe("demoteHeadings", () => {
  it("is exported for reuse where passages are injected outside the digest", () => {
    expect(demoteHeadings("## Title\ntext")).toBe("##### Title\ntext");
  });
});

describe("headings inside user notes", () => {
  const withHeadings: ContextSubject = {
    id: "s6",
    title: "OS",
    milestones: [
      {
        title: "Concurrency",
        isCompleted: false,
        notes: "## Key topics\n\nText\n\n# Top\n\n#### Already deep\n\n###### Max",
      },
    ],
  };

  it("demotes note headings below the digest's own levels", () => {
    const out = renderSubject(withHeadings, FULL_DETAIL);
    // Nothing in a note may compete with `## Subject:` or `### Milestone:`.
    for (const line of out.split("\n")) {
      if (line.startsWith("## Subject:") || line.startsWith("### Milestone:")) continue;
      expect(/^#{1,3}\s/.test(line)).toBe(false);
    }
  });

  it("preserves relative heading depth and clamps at h6", () => {
    const out = renderSubject(withHeadings, FULL_DETAIL);
    expect(out).toContain("# Top");
    expect(out).toContain("#### Top");
    expect(out).toContain("##### Key topics");
    expect(out).toContain("###### Max");
    expect(out).not.toContain("####### ");
  });

  it("leaves a plain note untouched", () => {
    const out = renderSubject(
      { id: "s7", title: "X", milestones: [{ title: "M", isCompleted: false, notes: "just text" }] },
      FULL_DETAIL,
    );
    expect(out).toContain("just text");
  });
});
