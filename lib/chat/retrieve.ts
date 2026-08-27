import { dotProduct } from "@/lib/rag/similarity";
import { selectPassages, type ScoredChunk } from "@/lib/rag/select";
import type { ScorableChunk } from "@/lib/rag/sources";
import { assemblePrompt, clampCeiling } from "./budget";
import { buildOutline, estimateTokens } from "./context";
import type { ContextSubject, PromptMessage } from "./types";

/**
 * Decides digest vs. retrieval mode and assembles the prompt for whichever
 * one applies (§4.4 and §8 of the RAG design).
 *
 * Pure — scoring is a dot product against already-loaded vectors, no I/O.
 * The caller (`prepare`'s route handler) does the two Prisma reads —
 * subjects and scorable chunks — and hands both in already loaded.
 */

const OUTLINE_SHARE = 0.4;

export type RetrievalBudget = {
  estimatedTokens: number;
  ceiling: number;
  truncated: string[];
  subjectCount: number;
  mode: "digest" | "retrieval";
  /** Retrieval was wanted but unavailable — no query vector arrived. */
  degraded?: boolean;
  sources: { breadcrumb: string; score: number }[];
};

export type AssembleRetrievalInput = {
  digestSystemPrompt: string;
  retrievalSystemPrompt: string;
  subjects: ContextSubject[];
  chunks: ScorableChunk[];
  contextSubjectIds: string[];
  history: PromptMessage[];
  question: string;
  ceiling: number;
  queryEmbedding?: number[];
  ragEnabled: boolean;
};

function scoreChunks(chunks: ScorableChunk[], queryEmbedding: number[]): ScoredChunk[] {
  const scored: ScoredChunk[] = [];
  for (const chunk of chunks) {
    if (chunk.embedding.length !== queryEmbedding.length) continue;
    scored.push({ ...chunk, score: dotProduct(queryEmbedding, chunk.embedding) });
  }
  return scored;
}

/** Drops subjects from the tail until the outline fits its share of the
 *  budget, or until nothing is left. Titles are never dropped outright —
 *  a subject either keeps its full outline entry or is named in `truncated`. */
function fitOutline(subjects: ContextSubject[], budget: number): { outline: string; kept: ContextSubject[]; truncated: string[] } {
  let kept = subjects;
  let outline = buildOutline(kept);
  const truncated: string[] = [];

  while (estimateTokens(outline) > budget && kept.length > 0) {
    const dropped = kept[kept.length - 1];
    kept = kept.slice(0, -1);
    truncated.push(`subject "${dropped.title}"`);
    outline = buildOutline(kept);
  }

  return { outline, kept, truncated };
}

/** Same newest-first fill as `assemblePrompt`'s history step, reused here
 *  because retrieval mode's system message isn't the digest's. */
function fitHistory(history: PromptMessage[], remainingBudget: number): { kept: PromptMessage[]; droppedCount: number } {
  let remaining = remainingBudget;
  const kept: PromptMessage[] = [];

  for (let i = history.length - 1; i >= 0; i--) {
    const cost = estimateTokens(history[i].content);
    if (cost > remaining) break;
    remaining -= cost;
    kept.unshift(history[i]);
  }

  return { kept, droppedCount: history.length - kept.length };
}

export function assembleRetrievalPrompt(input: AssembleRetrievalInput): {
  messages: PromptMessage[];
  budget: RetrievalBudget;
} {
  const ceiling = clampCeiling(input.ceiling);

  // Sending everything is strictly better than a selection (§4.4), so the
  // full digest is always tried first — retrieval only ever kicks in where
  // it's needed.
  const digestAttempt = assemblePrompt({
    systemPrompt: input.digestSystemPrompt,
    subjects: input.subjects,
    history: input.history,
    question: input.question,
    ceiling,
  });
  const fullDigestFits = digestAttempt.budget.truncated.length === 0;

  if (fullDigestFits || !input.ragEnabled) {
    return { messages: digestAttempt.messages, budget: { ...digestAttempt.budget, mode: "digest", sources: [] } };
  }

  if (!input.queryEmbedding || input.queryEmbedding.length === 0) {
    return {
      messages: digestAttempt.messages,
      budget: { ...digestAttempt.budget, mode: "digest", degraded: true, sources: [] },
    };
  }

  // Retrieval mode: skeleton (outline) up to 40% of the budget, passages fill
  // the rest.
  const fixedCost = estimateTokens(input.question) + estimateTokens(input.retrievalSystemPrompt);
  const outlineBudget = Math.max(0, Math.floor((ceiling - fixedCost) * OUTLINE_SHARE));
  const { outline, kept, truncated } = fitOutline(input.subjects, outlineBudget);

  const passageBudget = Math.max(0, ceiling - fixedCost - estimateTokens(outline));
  const scored = scoreChunks(input.chunks, input.queryEmbedding);
  const { block, manifest } = selectPassages(scored, input.contextSubjectIds, passageBudget);

  const contextBlock = [outline, block].filter(Boolean).join("\n\n");
  const system = contextBlock ? `${input.retrievalSystemPrompt}\n\n${contextBlock}` : input.retrievalSystemPrompt;

  const usedBeforeHistory = estimateTokens(system) + estimateTokens(input.question);
  const { kept: keptHistory, droppedCount } = fitHistory(input.history, ceiling - usedBeforeHistory);
  if (droppedCount > 0) truncated.push(`${droppedCount} earlier message${droppedCount === 1 ? "" : "s"}`);

  const messages: PromptMessage[] = [
    { role: "system", content: system },
    ...keptHistory,
    { role: "user", content: input.question },
  ];

  return {
    messages,
    budget: {
      estimatedTokens: messages.reduce((sum, m) => sum + estimateTokens(m.content), 0),
      ceiling,
      truncated,
      subjectCount: kept.length,
      mode: "retrieval",
      sources: manifest,
    },
  };
}
