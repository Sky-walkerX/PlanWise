import { describe, expect, it } from "vitest";
import { completeAt } from "./complete";

const VOCAB = [
  "Read Ch. 8 (Silberschatz)",
  "translation lookaside buffer",
  "memory management unit",
  "paging splits memory into frames",
  "segmentation fault",
];

/** Marks the cursor with | so the cases read as what the user actually sees. */
function at(docWithCursor: string, vocabulary = VOCAB): string | null {
  const cursor = docWithCursor.indexOf("|");
  return completeAt(docWithCursor.replace("|", ""), cursor, vocabulary);
}

describe("completeAt", () => {
  it("completes a partial word", () => {
    expect(at("The transl|")).toBe("ation lookaside buffer");
  });

  it("completes right after a space", () => {
    expect(at("The translation |")).toBe("lookaside buffer");
  });

  it("uses the preceding words to choose the more specific phrase", () => {
    // "memory" alone could go several ways; "paging splits mem" cannot.
    expect(at("paging splits mem|")).toBe("ory into frames");
  });

  it("preserves what the user typed, including their casing", () => {
    // The suggestion is the tail only, so "Transl" is never rewritten.
    expect(at("Transl|")).toBe("ation lookaside buffer");
  });

  it("stays quiet in the middle of a word", () => {
    // The cursor sits before "ation": the user is editing, not appending.
    expect(at("The transl|ation is done")).toBeNull();
  });

  it("stays quiet for a prefix too short to mean anything", () => {
    expect(at("me|")).toBeNull();
  });

  it("does not complete across a sentence boundary", () => {
    expect(at("Done. transl|")).toBe("ation lookaside buffer");
    expect(at("about memory. management |")).toBeNull();
  });

  it("does not complete across a line break", () => {
    expect(at("memory\nmanagement |")).toBeNull();
  });

  it("returns null when nothing matches", () => {
    expect(at("quantum entangle|")).toBeNull();
  });

  it("returns null once the phrase is fully typed", () => {
    expect(at("translation lookaside buffer|")).toBeNull();
  });

  it("does not repeat text that already follows the cursor", () => {
    // Cursor parked at the end of a word whose phrase is already written out.
    // The mid-word guard doesn't catch this one: the next character is a
    // space, so only comparing against the following text does.
    expect(at("translation| lookaside buffer")).toBeNull();
  });

  it("completes a title with punctuation in it", () => {
    expect(at("Read Ch|")).toBe(". 8 (Silberschatz)");
  });

  it("handles an empty document", () => {
    expect(at("|")).toBeNull();
  });

  it("handles an empty vocabulary", () => {
    expect(at("transl|", [])).toBeNull();
  });
});
