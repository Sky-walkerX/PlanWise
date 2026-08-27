import { describe, expect, it } from "vitest";
import { selectPassages, type ScoredChunk } from "./select";

let seq = 0;
const chunk = (over: Partial<ScoredChunk>): ScoredChunk => ({
  subjectId: "s1",
  subjectTitle: "Operating Systems",
  source: "MILESTONE",
  sourceId: `src-${seq++}`,
  ordinal: 0,
  breadcrumb: "Operating Systems > Memory management",
  content: "Paging vs segmentation.",
  score: 0.5,
  ...over,
});

describe("selectPassages", () => {
  it("excludes chunks below the 0.25 score floor", () => {
    const chunks = [chunk({ score: 0.24 }), chunk({ score: 0.26 })];
    const { manifest } = selectPassages(chunks, [], 10_000);
    expect(manifest.length).toBe(1);
    expect(manifest[0].score).toBe(0.26);
  });

  it("caps at 3 chunks per source record even when one note dominates the scores", () => {
    const dominant = Array.from({ length: 5 }, (_, i) =>
      chunk({ sourceId: "task-1", ordinal: i, score: 0.9 - i * 0.01 }),
    );
    const other = chunk({ sourceId: "task-2", score: 0.3 });
    const { manifest } = selectPassages([...dominant, other], [], 10_000);

    expect(manifest.length).toBe(4); // 3 from the dominant source + 1 from the other
  });

  it("caps at 12 chunks total", () => {
    const chunks = Array.from({ length: 20 }, (_, i) =>
      chunk({ sourceId: `task-${i}`, score: 0.9 - i * 0.01 }),
    );
    const { manifest } = selectPassages(chunks, [], 10_000);
    expect(manifest.length).toBe(12);
  });

  it("stops filling once the passage budget is spent and the manifest names what was selected", () => {
    const big = "x".repeat(400); // ~100 tokens for the content alone
    const chunks = [
      chunk({ sourceId: "a", score: 0.9, content: big }),
      chunk({ sourceId: "b", score: 0.8, content: big }),
      chunk({ sourceId: "c", score: 0.7, content: big }),
    ];
    // Budget large enough for exactly one 111-token passage.
    const { manifest } = selectPassages(chunks, [], 111);
    expect(manifest.length).toBe(1);
    expect(manifest[0].score).toBe(0.9);
  });

  it("orders output by subject, source and ordinal, not by score", () => {
    const chunks = [
      chunk({ subjectTitle: "Compiler Design", subjectId: "s2", sourceId: "c-1", ordinal: 1, score: 0.9 }),
      chunk({ subjectTitle: "Compiler Design", subjectId: "s2", sourceId: "c-1", ordinal: 0, score: 0.3 }),
      chunk({ subjectTitle: "Operating Systems", subjectId: "s1", sourceId: "o-1", ordinal: 0, score: 0.5 }),
    ];
    const { manifest } = selectPassages(chunks, [], 10_000);
    // Compiler Design sorts before Operating Systems regardless of score, and
    // within it, ordinal 0 comes before ordinal 1.
    expect(manifest.map((m) => m.score)).toEqual([0.3, 0.9, 0.5]);
  });

  it("filters to contextSubjectIds when the picker has a selection", () => {
    const chunks = [chunk({ subjectId: "s1", score: 0.9 }), chunk({ subjectId: "s2", score: 0.9 })];
    const { manifest } = selectPassages(chunks, ["s1"], 10_000);
    expect(manifest.length).toBe(1);
  });

  it("searches everything when the selection is empty", () => {
    const chunks = [chunk({ subjectId: "s1", score: 0.9 }), chunk({ subjectId: "s2", score: 0.9 })];
    const { manifest } = selectPassages(chunks, [], 10_000);
    expect(manifest.length).toBe(2);
  });

  it("returns an empty block and manifest when nothing survives", () => {
    const { block, manifest } = selectPassages([chunk({ score: 0.1 })], [], 10_000);
    expect(block).toBe("");
    expect(manifest).toEqual([]);
  });

  it("renders each passage under its breadcrumb heading inside the relevant-notes block", () => {
    const { block } = selectPassages([chunk({ score: 0.9 })], [], 10_000);
    expect(block).toContain("## Relevant notes");
    expect(block).toContain("### Operating Systems > Memory management");
    expect(block).toContain("Paging vs segmentation.");
  });

  it("demotes headings inside an injected passage below the breadcrumb heading", () => {
    const { block } = selectPassages([chunk({ score: 0.9, content: "## Key topics\ntext" })], [], 10_000);
    expect(block).toContain("### Operating Systems > Memory management");
    expect(block).toContain("##### Key topics");
    expect(/^## Key topics$/m.test(block)).toBe(false);
  });
});
