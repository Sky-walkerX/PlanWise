import { describe, expect, it } from "vitest";
import { buildVocabulary } from "./phrases";

const vocab = (notes: string[], titles: string[] = []) => buildVocabulary({ notes, titles });

describe("buildVocabulary", () => {
  it("keeps a phrase the user has written more than once", () => {
    const out = vocab(["Paging splits memory into frames.", "Later, paging splits memory again."]);
    expect(out).toContain("paging splits memory");
  });

  it("ignores a phrase seen only once", () => {
    // One use is not yet vocabulary, it's just a sentence.
    const out = vocab(["Segmentation divides by logical unit."]);
    expect(out).not.toContain("segmentation divides");
  });

  it("always includes titles, even unrepeated ones", () => {
    // A task title is the user's own name for a thing; they will retype it.
    const out = vocab([], ["Read Ch. 8 (Silberschatz)"]);
    expect(out).toContain("Read Ch. 8 (Silberschatz)");
  });

  it("ranks titles ahead of mined phrases", () => {
    const out = vocab(["memory management is hard", "memory management again"], ["Memory Management Unit"]);
    expect(out[0]).toBe("Memory Management Unit");
  });

  it("strips emphasis so a completion never carries markdown syntax", () => {
    const out = vocab(["**Translation lookaside buffer** caches.", "The translation lookaside buffer helps."]);
    expect(out).toContain("translation lookaside buffer");
    expect(out.every((p) => !p.includes("*"))).toBe(true);
  });

  it("does not build a phrase across a sentence boundary", () => {
    const out = vocab(["Frames are fixed. Pages are virtual.", "Frames are fixed. Pages are virtual."]);
    expect(out).not.toContain("fixed pages");
    expect(out.some((p) => p.includes("."))).toBe(false);
  });

  it("does not build a phrase across a line break", () => {
    const out = vocab(["- first item\n- second item", "- first item\n- second item"]);
    expect(out).not.toContain("item second");
  });

  it("drops a phrase that ends on a stopword", () => {
    // "the page table" is worth completing; "page table the" is not.
    const out = vocab(["the page table is here", "the page table is here"]);
    expect(out.every((p) => !/\b(the|is|a|of)$/.test(p))).toBe(true);
  });

  it("keeps a long repeated technical term on its own", () => {
    const out = vocab(["polymorphism matters", "polymorphism again"]);
    expect(out).toContain("polymorphism");
  });

  it("does not keep a short repeated word on its own", () => {
    const out = vocab(["cache one", "cache two"]);
    expect(out).not.toContain("cache");
  });

  it("ignores fenced code, which is not prose to complete", () => {
    const notes = ["```py\nfoo bar baz\n```\nreal prose here", "```py\nfoo bar baz\n```\nreal prose here"];
    const out = vocab(notes);
    expect(out).not.toContain("foo bar");
    expect(out).toContain("real prose here");
  });

  it("keeps link text but drops the URL", () => {
    const out = vocab(["see [the paging guide](https://x.com/a)", "see [the paging guide](https://x.com/a)"]);
    expect(out).toContain("the paging guide");
    expect(out.every((p) => !p.includes("http"))).toBe(true);
  });

  it("dedupes case-insensitively", () => {
    const out = vocab(["Memory Management here", "memory management there", "MEMORY MANAGEMENT again"]);
    expect(out.filter((p) => p.toLowerCase() === "memory management")).toHaveLength(1);
  });

  it("returns nothing for empty input", () => {
    expect(vocab([], [])).toEqual([]);
  });
});
