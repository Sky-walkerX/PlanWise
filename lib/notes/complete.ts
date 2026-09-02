/**
 * Matching what the user has typed against their own vocabulary.
 *
 * Runs on every keystroke, so it stays a scan over a few hundred short
 * strings and nothing more. `lib/notes/phrases.ts` builds the list; this
 * decides what, if anything, to show as ghost text.
 *
 * Pure — document, cursor and vocabulary in, a suggestion or null out.
 */

/** Below this, a prefix matches half the corpus and the suggestion is noise. */
const MIN_PREFIX_CHARS = 3;
/** How many preceding words to try as context, most specific first. */
const MAX_CONTEXT_WORDS = 4;

/** A phrase never spans these, so neither does the text we match against. */
const SEGMENT_BREAK = /[.!?;:\n]/;

function segmentStart(before: string): number {
  for (let i = before.length - 1; i >= 0; i--) {
    if (SEGMENT_BREAK.test(before[i])) return i + 1;
  }
  return 0;
}

/** Start offsets of each word in `text`, left to right. */
function wordStarts(text: string): number[] {
  const starts: number[] = [];
  let inWord = false;
  for (let i = 0; i < text.length; i++) {
    const isWord = /[^\s]/.test(text[i]);
    if (isWord && !inWord) starts.push(i);
    inWord = isWord;
  }
  return starts;
}

/**
 * The completion to show after the cursor, or null for none.
 *
 * Tries the longest context first: four preceding words pin down a phrase far
 * better than one does, and a match on more context is a match the user is
 * more likely to accept.
 */
export function completeAt(doc: string, cursor: number, vocabulary: string[]): string | null {
  if (cursor <= 0 || vocabulary.length === 0) return null;

  // Mid-word means the user is editing what's already there, not extending it.
  const next = doc[cursor];
  if (next && /[A-Za-z0-9]/.test(next)) return null;

  const before = doc.slice(0, cursor);
  const segment = before.slice(segmentStart(before));
  if (!segment.trim()) return null;

  const starts = wordStarts(segment);
  const after = doc.slice(cursor);

  for (let k = Math.min(MAX_CONTEXT_WORDS, starts.length); k >= 1; k--) {
    const tail = segment.slice(starts[starts.length - k]);
    if (tail.length < MIN_PREFIX_CHARS) continue;

    const lower = tail.toLowerCase();
    for (const entry of vocabulary) {
      if (entry.length <= tail.length) continue;
      if (!entry.toLowerCase().startsWith(lower)) continue;

      const suggestion = entry.slice(tail.length);
      if (!suggestion.trim()) continue;
      // Already written just past the cursor: offering it again would only
      // duplicate it on Tab.
      if (after.startsWith(suggestion)) continue;

      return suggestion;
    }
  }

  return null;
}
