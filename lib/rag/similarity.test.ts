import { describe, expect, it } from "vitest";
import { dotProduct, topK } from "./similarity";

describe("dotProduct", () => {
  it("matches a hand-computed value for normalised vectors", () => {
    expect(dotProduct([1, 0, 0], [1, 0, 0])).toBe(1);
    expect(dotProduct([1, 0, 0], [0, 1, 0])).toBe(0);
    expect(dotProduct([0.6, 0.8], [0.6, 0.8])).toBeCloseTo(1, 10);
    expect(dotProduct([1, 2, 3], [4, 5, 6])).toBe(1 * 4 + 2 * 5 + 3 * 6);
  });

  it("throws on mismatched dimensions rather than scoring them", () => {
    expect(() => dotProduct([1, 0], [1, 0, 0])).toThrow();
  });
});

describe("topK", () => {
  type Item = { id: string; vector: number[] };
  const item = (id: string, vector: number[]): Item => ({ id, vector });

  it("returns k items in descending score with a stable tie order", () => {
    const items = [item("a", [1, 0]), item("b", [0, 1]), item("c", [0.9, 0.1]), item("d", [0, 1])];
    const out = topK([1, 0], items, (i) => i.vector, 3);

    expect(out.map((s) => s.item.id)).toEqual(["a", "c", "b"]);
    expect(out[0].score).toBeGreaterThan(out[1].score);
    // "b" and "d" tie at score 0 — original order breaks the tie.
    const full = topK([1, 0], items, (i) => i.vector, 4);
    expect(full.map((s) => s.item.id)).toEqual(["a", "c", "b", "d"]);
  });

  it("skips items with mismatched dimensions rather than scoring them", () => {
    const items = [item("a", [1, 0]), item("bad", [1, 0, 0]), item("b", [0.5, 0.5])];
    const out = topK([1, 0], items, (i) => i.vector, 10);
    expect(out.map((s) => s.item.id)).toEqual(["a", "b"]);
  });

  it("returns empty for an empty corpus", () => {
    expect(topK([1, 0], [], (i: Item) => i.vector, 5)).toEqual([]);
  });
});
