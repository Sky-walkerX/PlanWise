/**
 * How much of a half-arrived reply is safe to paint.
 *
 * Tokens are subword, so rendering the raw stream shows "fix", "fixe",
 * "fixed" on three consecutive frames, and markdown makes it worse: a lone
 * `**` renders as literal asterisks until its partner arrives, and an
 * unterminated ``` dumps the fence and its contents as paragraph text. Both
 * resolve a few tokens later, which is exactly what makes them flicker.
 *
 * The rule is to publish only what won't change interpretation once more
 * text lands: whole words, balanced inline markers, closed fences.
 *
 * Pure — no clock, no DOM. The caller decides how often to ask.
 */

/** Opening fences and closing fences look identical, so parity decides. */
const FENCE_LINE = /^\s{0,3}(```|~~~)/;

function fenceIsOpen(text: string): boolean {
  let open = false;
  for (const line of text.split("\n")) {
    if (FENCE_LINE.test(line)) open = !open;
  }
  return open;
}

/** Drops the last occurrence of `marker` when there's an odd number of them,
 *  which is what an unclosed `**` or `` ` `` amounts to. */
function balance(line: string, marker: string): string {
  const count = line.split(marker).length - 1;
  if (count % 2 === 0) return line;
  const last = line.lastIndexOf(marker);
  return line.slice(0, last) + line.slice(last + marker.length);
}

/**
 * Inline markers can't span lines in markdown, so only the final line can hold
 * an unclosed one. Restricting the rewrite to that line keeps it from touching
 * anything the user is already reading.
 */
function balanceLastLine(text: string): string {
  const lines = text.split("\n");
  const last = lines.length - 1;
  if (FENCE_LINE.test(lines[last])) return text;
  lines[last] = balance(balance(lines[last], "**"), "`");
  return lines.join("\n");
}

/**
 * The prefix of a streaming reply that can be rendered without flicker.
 *
 * Returns "" until the first whole word exists, which lets the caller keep
 * showing its thinking state rather than a one-letter bubble.
 */
export function streamingPrefix(text: string): string {
  if (!text) return "";

  const cut = text.slice(0, lastBoundary(text)).trimEnd();
  if (!cut) return "";

  // Inside a fence, `**` is code and rewriting it would corrupt the snippet.
  // Closing the fence is enough to make it render as the code block it is.
  if (fenceIsOpen(cut)) return `${cut}\n\`\`\``;

  return balanceLastLine(cut);
}

/** Index just past the last completed word, or 0 when none has completed. */
function lastBoundary(text: string): number {
  for (let i = text.length - 1; i >= 0; i--) {
    if (/\s/.test(text[i])) return i;
  }
  return 0;
}
