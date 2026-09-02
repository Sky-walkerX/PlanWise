/**
 * The user's own writing, turned into a list of things they are likely to
 * type again.
 *
 * This is the instant half of note autocomplete: no model, no GPU, no network
 * round trip per keystroke. It can't invent a sentence, but study notes are
 * unusually repetitive — the same course vocabulary, the same task titles, the
 * same handful of technical terms — and finishing "translation lookaside
 * buffer" after four characters is most of the value at none of the cost.
 *
 * Pure — text in, ranked phrases out. No I/O, no clock.
 */

/** Beyond this, phrases are too specific to ever match a second time. */
const MAX_WORDS = 5;
const MIN_WORDS = 2;
/** A phrase has to have been used before to count as the user's vocabulary. */
const MIN_COUNT = 2;
/** A single word earns a slot only if it's long enough to be worth completing. */
const MIN_SOLO_WORD_CHARS = 8;
/** The matcher scans this list per keystroke, so it stays small enough to be free. */
const MAX_ENTRIES = 500;

/** Completing *to* one of these is useless: nobody wants "page table the". */
const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "been", "but", "by", "can", "do", "for", "from",
  "had", "has", "have", "if", "in", "into", "is", "it", "its", "of", "on", "or", "our", "so",
  "than", "that", "the", "their", "then", "there", "these", "they", "this", "to", "was", "were",
  "when", "which", "will", "with", "you", "your",
]);

export type VocabularyInput = {
  /** Raw markdown note bodies. */
  notes: string[];
  /** Subject, milestone, task and subtask titles. */
  titles: string[];
};

/**
 * Removes the markdown that would otherwise end up inside a suggestion.
 *
 * Ghost text is inserted verbatim on Tab, so a phrase carrying a stray `**` or
 * a URL would be inserted carrying it too. Fenced code goes entirely: it's not
 * prose, and completing a user's note with a fragment of someone's Python is
 * worse than completing nothing.
 */
export function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?(```|$)/g, "\n")
    .replace(/~~~[\s\S]*?(~~~|$)/g, "\n")
    .replace(/`[^`\n]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    // Keep what the user wrote, drop where it points.
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, "")
    .replace(/(\*\*|__|\*|_|~~)/g, "")
    .replace(/https?:\/\/\S+/g, " ");
}

const WORD = /[A-Za-z0-9][A-Za-z0-9'’-]*/g;

/** Phrases must not span these: a completion that runs across a sentence or a
 *  list item is a completion nobody would ever accept. */
function segments(text: string): string[] {
  return stripMarkdown(text)
    .split(/[.!?;:]+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

type Entry = { text: string; count: number; words: number };

export function buildVocabulary({ notes, titles }: VocabularyInput): string[] {
  const counts = new Map<string, Entry>();

  const bump = (words: string[]) => {
    const text = words.join(" ");
    const key = text.toLowerCase();
    const found = counts.get(key);
    if (found) found.count += 1;
    else counts.set(key, { text: key, count: 1, words: words.length });
  };

  for (const note of notes) {
    for (const segment of segments(note)) {
      const words = segment.match(WORD) ?? [];
      for (let start = 0; start < words.length; start++) {
        const limit = Math.min(MAX_WORDS, words.length - start);
        for (let n = 1; n <= limit; n++) {
          bump(words.slice(start, start + n));
        }
      }
    }
  }

  const mined = [...counts.values()]
    .filter((e) => e.count >= MIN_COUNT)
    .filter((e) => (e.words >= MIN_WORDS ? true : e.text.length >= MIN_SOLO_WORD_CHARS))
    .filter((e) => !STOPWORDS.has(e.text.split(" ")[e.words - 1]))
    // A phrase used often and running long is the one most worth offering.
    .sort((a, b) => b.count * b.words - a.count * a.words || b.text.length - a.text.length)
    .map((e) => e.text);

  // Titles go first and unconditionally: a task title is the user's own name
  // for something, and they retype it into notes constantly.
  const seen = new Set<string>();
  const out: string[] = [];
  for (const phrase of [...titles.map((t) => t.trim()).filter(Boolean), ...mined]) {
    const key = phrase.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(phrase);
    if (out.length >= MAX_ENTRIES) break;
  }

  return out;
}
