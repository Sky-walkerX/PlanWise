import { describe, expect, it } from "vitest";
import { streamingPrefix } from "./stream-buffer";

describe("streamingPrefix", () => {
  it("shows nothing for empty text", () => {
    expect(streamingPrefix("")).toBe("");
  });

  it("shows nothing while the first word is still forming", () => {
    // No whitespace yet means no completed word, and painting "Pag" then
    // "Pagin" then "Paging" is exactly the flicker this exists to stop.
    expect(streamingPrefix("Pagin")).toBe("");
  });

  it("stops at the last completed word", () => {
    expect(streamingPrefix("Paging splits memory into fix")).toBe("Paging splits memory into");
  });

  it("keeps a word that a trailing space has completed", () => {
    expect(streamingPrefix("Paging splits ")).toBe("Paging splits");
  });

  it("treats a newline as a word boundary", () => {
    expect(streamingPrefix("First line\nSec")).toBe("First line");
  });

  it("hides an unclosed bold marker rather than painting the asterisks", () => {
    expect(streamingPrefix("Use **fixed size ")).toBe("Use fixed size");
  });

  it("leaves balanced bold alone", () => {
    expect(streamingPrefix("Use **fixed size** frames ")).toBe("Use **fixed size** frames");
  });

  it("hides an unclosed inline code marker", () => {
    expect(streamingPrefix("Call `chunkSource ")).toBe("Call chunkSource");
  });

  it("leaves balanced inline code alone", () => {
    expect(streamingPrefix("Call `chunkSource()` first ")).toBe("Call `chunkSource()` first");
  });

  it("only balances the final line, so earlier markers survive", () => {
    expect(streamingPrefix("**Done** already\nNow `partial ")).toBe("**Done** already\nNow partial");
  });

  it("closes an open code fence so it renders as code, not as backticks", () => {
    const text = "Here:\n```ts\nconst a = 1\n";
    expect(streamingPrefix(text)).toBe("Here:\n```ts\nconst a = 1\n```");
  });

  it("leaves a closed fence alone", () => {
    const text = "Here:\n```ts\nconst a = 1\n```\nDone now ";
    expect(streamingPrefix(text)).toBe("Here:\n```ts\nconst a = 1\n```\nDone now");
  });

  it("does not balance markers inside an open fence", () => {
    // `**` in code is code, not emphasis, and rewriting it would corrupt it.
    const text = "```py\nx = a ** 2\n";
    expect(streamingPrefix(text)).toBe("```py\nx = a ** 2\n```");
  });

  it("does not mistake a bullet list for an unclosed emphasis", () => {
    expect(streamingPrefix("- first\n- second item ")).toBe("- first\n- second item");
  });
});
