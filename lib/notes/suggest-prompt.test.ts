import { describe, expect, it } from "vitest";
import { buildCompletionPrompt, cleanCompletion, PREFIX_CHARS } from "./suggest-prompt";

describe("buildCompletionPrompt", () => {
  it("puts the note text last so the model continues it", () => {
    const messages = buildCompletionPrompt({ before: "Paging splits memory", breadcrumb: "OS > Memory" });
    expect(messages[messages.length - 1].content).toContain("Paging splits memory");
    expect(messages[0].role).toBe("system");
  });

  it("names where the note lives, so the continuation is on topic", () => {
    const messages = buildCompletionPrompt({ before: "x", breadcrumb: "OS > Memory management" });
    expect(messages.some((m) => m.content.includes("OS > Memory management"))).toBe(true);
  });

  it("sends only the tail of a long note", () => {
    const before = `${"a".repeat(5000)}THE-END`;
    const messages = buildCompletionPrompt({ before, breadcrumb: "S" });
    const user = messages[messages.length - 1].content;
    expect(user).toContain("THE-END");
    expect(user.length).toBeLessThan(PREFIX_CHARS + 400);
  });

  it("works without a breadcrumb", () => {
    expect(() => buildCompletionPrompt({ before: "x", breadcrumb: "" })).not.toThrow();
  });
});

describe("cleanCompletion", () => {
  it("keeps a plain continuation", () => {
    expect(cleanCompletion(" into fixed-size frames")).toBe(" into fixed-size frames");
  });

  it("drops a model's surrounding quotes", () => {
    expect(cleanCompletion('" into frames"')).toBe(" into frames");
  });

  it("keeps only the first line", () => {
    // A local model asked for one continuation will happily write an essay.
    expect(cleanCompletion(" into frames\n\nThis is a new paragraph.")).toBe(" into frames");
  });

  it("strips a chatty preamble", () => {
    expect(cleanCompletion("Sure! Here's the continuation: into frames")).toBe("into frames");
  });

  it("drops a completion that is only whitespace", () => {
    expect(cleanCompletion("   ")).toBeNull();
  });

  it("drops an empty completion", () => {
    expect(cleanCompletion("")).toBeNull();
  });

  it("caps a runaway completion at a sentence end", () => {
    const long = ` ${"word ".repeat(60)}`;
    const out = cleanCompletion(long);
    expect(out).not.toBeNull();
    expect(out!.length).toBeLessThanOrEqual(200);
  });
});
