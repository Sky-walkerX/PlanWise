import { describe, expect, it } from "vitest";
import { splitReasoning } from "./reasoning";

describe("splitReasoning", () => {
  it("passes plain text through untouched", () => {
    expect(splitReasoning("Just an answer.")).toEqual({
      answer: "Just an answer.",
      reasoning: "",
      thinking: false,
    });
  });

  it("separates a closed think block from the answer", () => {
    const { answer, reasoning, thinking } = splitReasoning("<think>weighing it up</think>The answer.");
    expect(answer).toBe("The answer.");
    expect(reasoning).toBe("weighing it up");
    expect(thinking).toBe(false);
  });

  it("treats an unclosed block as reasoning still in progress", () => {
    const { answer, reasoning, thinking } = splitReasoning("<think>halfway through");
    expect(answer).toBe("");
    expect(reasoning).toBe("halfway through");
    expect(thinking).toBe(true);
  });

  it("keeps text that precedes the block", () => {
    const { answer, reasoning } = splitReasoning("Sure. <think>hmm</think> Done.");
    expect(answer).toBe("Sure.  Done.".trim());
    expect(reasoning).toBe("hmm");
  });

  it("merges multiple blocks", () => {
    const { answer, reasoning } = splitReasoning("<think>one</think>A<think>two</think>B");
    expect(answer).toBe("AB");
    expect(reasoning).toBe("one\ntwo");
  });

  it("handles a block that never opens", () => {
    expect(splitReasoning("plain </think> text").answer).toBe("plain </think> text");
  });

  it("survives the tag arriving one character at a time", () => {
    const full = "<think>reasoning here</think>Final answer.";
    // Every prefix must parse without throwing and without leaking tag text
    // into the answer — this is exactly what streaming produces.
    for (let i = 1; i <= full.length; i++) {
      const { answer } = splitReasoning(full.slice(0, i));
      expect(answer).not.toContain("</think>");
      expect(answer).not.toContain("reasoning here");
    }
    expect(splitReasoning(full).answer).toBe("Final answer.");
  });
});
