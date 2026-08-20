/**
 * Splits a reply into visible answer and hidden reasoning.
 *
 * Reasoning models (qwen3, deepseek-r1, and others) wrap their scratchpad in
 * `<think>` tags. Rendered as-is it buries the answer, so the panel shows the
 * answer and tucks the reasoning behind a toggle.
 *
 * Written to run on partial text: while a reply streams, the opening tag
 * arrives long before the closing one, and an unterminated block is treated as
 * reasoning-so-far rather than as answer text that flashes and disappears.
 */
export type SplitReply = {
  answer: string;
  reasoning: string;
  /** True while an opened `<think>` has not yet been closed. */
  thinking: boolean;
};

const OPEN = "<think>";
const CLOSE = "</think>";

export function splitReasoning(text: string): SplitReply {
  const reasoning: string[] = [];
  let answer = "";
  let rest = text;
  let thinking = false;

  while (true) {
    const start = rest.indexOf(OPEN);
    if (start === -1) {
      answer += rest;
      break;
    }

    answer += rest.slice(0, start);
    const after = rest.slice(start + OPEN.length);
    const end = after.indexOf(CLOSE);

    if (end === -1) {
      // Still inside the block — everything that follows is reasoning for now.
      reasoning.push(after);
      thinking = true;
      break;
    }

    reasoning.push(after.slice(0, end));
    rest = after.slice(end + CLOSE.length);
  }

  return { answer: answer.trim(), reasoning: reasoning.join("\n").trim(), thinking };
}
