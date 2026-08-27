import { describe, expect, it } from "vitest";
import { buildBreadcrumb, chunkSource, chunkText, hashContent } from "./chunk";

describe("chunkText", () => {
  it("returns nothing for empty, whitespace-only or single-word input", () => {
    expect(chunkText("", "b")).toEqual([]);
    expect(chunkText("   \n\t  ", "b")).toEqual([]);
    expect(chunkText("hello", "b")).toEqual([]);
  });

  it("splits on headings first, starting a new chunk at each one", () => {
    const text = [
      "## Key topics",
      "",
      "Paging vs segmentation, and how it interacts with the TLB during context switches.",
      "",
      "# Top",
      "",
      "A different section entirely, unrelated to the first and long enough to clear the minimum chunk size.",
    ].join("\n");

    const out = chunkText(text, "b");
    expect(out.length).toBe(2);
    expect(out[0].content).toContain("## Key topics");
    expect(out[0].content).toContain("Paging vs segmentation");
    expect(out[1].content).toContain("# Top");
    expect(out[1].content).toContain("A different section entirely");
  });

  it("splits on paragraph boundaries once the target is exceeded", () => {
    const para1 = "A".repeat(700);
    const para2 = "B".repeat(700);
    const text = `${para1}\n\n${para2}`;

    const out = chunkText(text, "b");
    expect(out.length).toBe(2);
    expect(out[0].content).toBe(para1);
    expect(out[1].content.endsWith(para2)).toBe(true);
  });

  it("falls back to sentence splitting for a paragraph over the hard maximum", () => {
    const sentence = `${"A".repeat(100)}. `;
    const para = sentence.repeat(20); // ~2000 chars, one paragraph, many sentences
    const out = chunkText(para, "b");

    expect(out.length).toBeGreaterThan(1);
    for (const chunk of out) expect(chunk.content.length).toBeLessThanOrEqual(1600);
  });

  it("falls back to a hard cut for a single unbroken run with no whitespace", () => {
    const text = "A".repeat(5000); // no sentence boundaries, no paragraphs
    const out = chunkText(text, "b");

    expect(out.length).toBeGreaterThan(1);
    for (const chunk of out) expect(chunk.content.length).toBeLessThanOrEqual(1600);
  });

  it("never emits a chunk over the hard maximum", () => {
    const mixed = `${"word ".repeat(50)}\n\n${"B".repeat(3000)}\n\n${"C. ".repeat(600)}`;
    const out = chunkText(mixed, "b");
    for (const chunk of out) expect(chunk.content.length).toBeLessThanOrEqual(1600);
  });

  it("carries overlap across a size-forced split without duplicating a whole chunk", () => {
    const para1 = "A".repeat(1150);
    const para2 = "B".repeat(700);
    const out = chunkText(`${para1}\n\n${para2}`, "b");

    expect(out.length).toBe(2);
    // The tail of the first chunk reappears at the head of the second...
    const tail = out[0].content.slice(-150);
    expect(out[1].content.startsWith(tail)).toBe(true);
    // ...but the second chunk isn't just a repeat of the first.
    expect(out[1].content).not.toBe(out[0].content);
    expect(out[1].content.length).toBeLessThan(out[0].content.length + 150);
  });

  it("drops chunks under 40 characters", () => {
    const text = `## Heading\n\nshort\n\n${"word ".repeat(300)}`;
    const out = chunkText(text, "b");
    for (const chunk of out) expect(chunk.content.length).toBeGreaterThanOrEqual(40);
  });

  it("is deterministic, including ordinals", () => {
    const text = `## A\n\n${"x".repeat(1300)}\n\n${"y".repeat(1300)}\n\n## B\n\n${"z".repeat(500)}`;
    const a = chunkText(text, "b");
    const b = chunkText(text, "b");
    expect(a).toEqual(b);
    expect(a.map((c) => c.ordinal)).toEqual(a.map((_, i) => i));
  });
});

describe("buildBreadcrumb", () => {
  it("joins only the levels present, in hierarchy order", () => {
    expect(buildBreadcrumb({ source: "SUBJECT", subjectTitle: "Operating Systems" })).toBe("Operating Systems");

    expect(
      buildBreadcrumb({
        source: "MILESTONE",
        subjectTitle: "Operating Systems",
        milestoneTitle: "Memory management",
      }),
    ).toBe("Operating Systems > Memory management");

    expect(
      buildBreadcrumb({
        source: "TASK",
        subjectTitle: "Operating Systems",
        milestoneTitle: "Memory management",
        taskTitle: "Read Ch. 8",
      }),
    ).toBe("Operating Systems > Memory management > Read Ch. 8");

    expect(
      buildBreadcrumb({
        source: "SUBTASK",
        subjectTitle: "Operating Systems",
        milestoneTitle: "Memory management",
        taskTitle: "Read Ch. 8",
        subtaskTitle: "Paging",
      }),
    ).toBe("Operating Systems > Memory management > Read Ch. 8 > Paging");

    expect(
      buildBreadcrumb({
        source: "RESOURCE",
        subjectTitle: "Operating Systems",
        resourceTitle: "OSTEP",
      }),
    ).toBe("Operating Systems > OSTEP");
  });
});

describe("chunkSource", () => {
  it("stamps the built breadcrumb onto every chunk it produces", () => {
    const out = chunkSource({
      source: "TASK",
      subjectTitle: "Operating Systems",
      milestoneTitle: "Memory management",
      taskTitle: "Read Ch. 8",
      text: "word ".repeat(300),
    });
    expect(out.length).toBeGreaterThan(0);
    for (const chunk of out) expect(chunk.breadcrumb).toBe("Operating Systems > Memory management > Read Ch. 8");
  });
});

describe("hashContent", () => {
  it("is deterministic and sensitive to any change", () => {
    expect(hashContent("hello")).toBe(hashContent("hello"));
    expect(hashContent("hello")).not.toBe(hashContent("Hello"));
  });
});
