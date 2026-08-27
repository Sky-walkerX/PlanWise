import { createHash } from "node:crypto";

/**
 * Splits a source record's markdown into ordered, breadcrumbed passages for
 * embedding.
 *
 * Pure — no I/O, no Prisma, no clock. Splitting priority is headings, then
 * paragraphs, then sentences, then a hard character cut, each tier only
 * engaging when the tier above it isn't enough to stay under the hard
 * maximum. Determinism is what makes `contentHash` meaningful: the same
 * source text always chunks the same way, so freshness (`lib/rag/sources.ts`)
 * can tell "unchanged" from "re-chunk this" without re-embedding to check.
 */

export type Chunk = {
  ordinal: number;
  breadcrumb: string;
  content: string;
};

export type ChunkSourceType = "SUBJECT" | "MILESTONE" | "TASK" | "SUBTASK" | "RESOURCE";

export type ChunkInput = {
  source: ChunkSourceType;
  text: string;
  subjectTitle: string;
  milestoneTitle?: string | null;
  taskTitle?: string | null;
  subtaskTitle?: string | null;
  resourceTitle?: string | null;
};

// Target ~300 tokens; hard max stays under arctic-embed's 512-token limit with
// room for the breadcrumb prefix and tokenizer variance.
const TARGET_CHARS = 1200;
const HARD_MAX_CHARS = 1600;
const OVERLAP_CHARS = 150;
const MIN_CHUNK_CHARS = 40;

/** sha256 of a source record's full text, for the freshness check in §7.3. */
export function hashContent(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

/** "Operating Systems > Memory management > Read Ch. 8". Titles are joined in
 *  hierarchy order; only the levels present for this source type appear. */
export function buildBreadcrumb(input: Omit<ChunkInput, "text">): string {
  const parts = [input.subjectTitle, input.milestoneTitle, input.taskTitle, input.subtaskTitle, input.resourceTitle];
  return parts.filter((p): p is string => !!p?.trim()).join(" > ");
}

type Unit = { text: string; forceBreak: boolean };
type Section = { heading: string | null; body: string };

const HEADING_LINE = /^#{1,6}\s+/;

function splitSections(text: string): Section[] {
  const lines = text.split("\n");
  const sections: Section[] = [];
  let heading: string | null = null;
  let buffer: string[] = [];

  const flush = () => {
    const body = buffer.join("\n").trim();
    if (heading || body) sections.push({ heading, body });
  };

  for (const line of lines) {
    if (HEADING_LINE.test(line)) {
      flush();
      heading = line.trim();
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  flush();

  return sections;
}

function splitParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

/** Crude but deterministic: split after sentence-ending punctuation. */
function splitSentences(paragraph: string): string[] {
  const parts = paragraph
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length > 0 ? parts : [paragraph];
}

function hardCut(text: string): string[] {
  const pieces: string[] = [];
  for (let i = 0; i < text.length; i += HARD_MAX_CHARS) {
    pieces.push(text.slice(i, i + HARD_MAX_CHARS));
  }
  return pieces;
}

/** A unit over the hard maximum falls through sentences, then a hard cut —
 *  each piece still capped at the hard maximum. */
function splitOversized(text: string): string[] {
  if (text.length <= HARD_MAX_CHARS) return [text];
  return splitSentences(text).flatMap((s) => (s.length <= HARD_MAX_CHARS ? [s] : hardCut(s)));
}

function sectionToUnitTexts(section: Section): string[] {
  const paragraphs = splitParagraphs(section.body);
  if (!section.heading) return paragraphs;
  if (paragraphs.length === 0) return [section.heading];
  return [`${section.heading}\n${paragraphs[0]}`, ...paragraphs.slice(1)];
}

function toUnits(sections: Section[]): Unit[] {
  const units: Unit[] = [];
  for (const section of sections) {
    let first = true;
    for (const unitText of sectionToUnitTexts(section)) {
      for (const piece of splitOversized(unitText)) {
        units.push({ text: piece, forceBreak: first });
        first = false;
      }
    }
  }
  return units;
}

/** Greedily packs units up to the target size; a lone unit already over the
 *  target (but under the hard max, by construction) is accepted as-is since
 *  it can't be split further without breaking the priority order. A
 *  heading-forced break never carries overlap; a size-forced break carries a
 *  trailing slice of the previous chunk, trimmed so the result still never
 *  exceeds the hard max. */
function pack(units: Unit[]): string[] {
  const chunks: string[] = [];
  let buffer = "";

  const flush = () => {
    if (buffer.length > 0) chunks.push(buffer);
    buffer = "";
  };

  for (const unit of units) {
    if (unit.forceBreak) flush();

    if (buffer.length === 0) {
      buffer = unit.text;
      continue;
    }

    const candidate = `${buffer}\n\n${unit.text}`;
    if (candidate.length <= TARGET_CHARS) {
      buffer = candidate;
      continue;
    }

    const tail = buffer.slice(-OVERLAP_CHARS);
    flush();
    const withOverlap = `${tail}\n\n${unit.text}`;
    buffer = withOverlap.length <= HARD_MAX_CHARS ? withOverlap : unit.text;
  }

  flush();
  return chunks;
}

/** The pure splitter: markdown text in, ordered breadcrumbed chunks out. */
export function chunkText(text: string, breadcrumb: string): Chunk[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const units = toUnits(splitSections(trimmed));
  const packed = pack(units);

  const chunks: Chunk[] = [];
  for (const content of packed) {
    if (content.length < MIN_CHUNK_CHARS) continue;
    chunks.push({ ordinal: chunks.length, breadcrumb, content });
  }
  return chunks;
}

/** Builds the breadcrumb from the record's place in the hierarchy, then
 *  chunks its text. What `lib/rag/sources.ts` calls per live source record. */
export function chunkSource(input: ChunkInput): Chunk[] {
  return chunkText(input.text, buildBreadcrumb(input));
}
