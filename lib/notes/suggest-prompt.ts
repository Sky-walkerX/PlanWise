import type { PromptMessage } from "@/lib/chat/types";

/**
 * The on-demand half of note autocomplete: asking the user's own model to
 * continue the sentence they're writing.
 *
 * Pure — builds messages and cleans a reply. The transport, the abort and the
 * engine lock all live in the caller.
 *
 * Two things make this different from chat. The reply has to be a bare
 * continuation, because it gets inserted verbatim at the cursor rather than
 * read as an answer. And it has to be short: ghost text past a line is
 * unreadable, and a local model asked for "a continuation" will otherwise
 * write three paragraphs and a summary.
 */

/** How much preceding note text the model sees. Enough for the paragraph,
 *  short enough that a 1.7B model answers in about a second. */
export const PREFIX_CHARS = 600;

/** Ghost text longer than this stops being a suggestion and starts being an
 *  imposition, whatever the model had in mind. */
const MAX_COMPLETION_CHARS = 200;

const SYSTEM = [
  "You continue a student's study notes. You are an autocomplete, not an assistant.",
  "",
  "Rules:",
  "- Reply with the continuation text only. No preamble, no quotes, no explanation, no markdown fences.",
  "- Continue from exactly where the text stops, mid-sentence if that's where it stops.",
  "- One sentence at most. Usually a few words is right.",
  "- Match the note's existing voice, terminology and formatting.",
  "- If the text gives you nothing to go on, reply with nothing at all.",
].join("\n");

export function buildCompletionPrompt({ before, breadcrumb }: { before: string; breadcrumb: string }): PromptMessage[] {
  const prefix = before.slice(-PREFIX_CHARS);
  const where = breadcrumb.trim() ? `These notes belong to: ${breadcrumb.trim()}\n\n` : "";

  return [
    { role: "system", content: SYSTEM },
    { role: "user", content: `${where}Continue this note. Reply with the continuation only.\n\n${prefix}` },
  ];
}

// Small models preface things no matter how firmly they're told not to.
const PREAMBLE = /^\s*(sure|certainly|of course|okay|ok)?[!,.]*\s*(here'?s?( is)?( the)?( continuation| completion)?|continuation|completion)\s*[:\-—]\s*/i;

/**
 * Turns a model's reply into something safe to insert at the cursor, or null
 * when there's nothing usable in it.
 *
 * Leading whitespace is deliberately preserved: whether the continuation opens
 * with a space is the difference between "frames" and " frames", and only the
 * model knows where in the word the note stopped.
 */
export function cleanCompletion(raw: string): string | null {
  if (!raw.trim()) return null;

  // Only the first line: ghost text is a single run of inline text, and
  // anything after a newline is the model having written past the brief.
  let text = raw.split("\n")[0];
  text = text.replace(PREAMBLE, "");

  // Matched quotes around the whole thing are packaging, not content.
  const trimmed = text.trim();
  if (trimmed.length >= 2 && /^["'`]/.test(trimmed) && trimmed.at(-1) === trimmed[0]) {
    text = trimmed.slice(1, -1);
  }

  if (!text.trim()) return null;

  if (text.length > MAX_COMPLETION_CHARS) {
    const clipped = text.slice(0, MAX_COMPLETION_CHARS);
    // Prefer to end on a sentence, then on a word, rather than mid-token.
    const sentence = Math.max(clipped.lastIndexOf(". "), clipped.lastIndexOf("! "), clipped.lastIndexOf("? "));
    const cut = sentence > 40 ? sentence + 1 : clipped.lastIndexOf(" ");
    text = cut > 0 ? clipped.slice(0, cut) : clipped;
  }

  return text.trimEnd() ? text.replace(/\s+$/, "") : null;
}
