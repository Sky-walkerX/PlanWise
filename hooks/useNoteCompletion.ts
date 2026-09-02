"use client";

import { useCallback, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/fetcher";
import { acquireEngine } from "@/lib/llm/engine-lock";
import { createOpenAiTransport } from "@/lib/llm/client";
import { isConfigured, loadSettings } from "@/lib/llm/settings";
import { buildCompletionPrompt, cleanCompletion } from "@/lib/notes/suggest-prompt";

/**
 * Both halves of note autocomplete, wired to the editor's needs.
 *
 * The vocabulary is a cached query that the CodeMirror extension reads through
 * a getter, so a refetch takes effect without rebuilding the editor's
 * extensions — reconfiguring CodeMirror mid-edit loses the undo history.
 */

/** The corpus only changes when notes are saved, so this is generous. */
const VOCABULARY_STALE_MS = 5 * 60_000;
/** A suggestion nobody has seen in this long has been overtaken by typing. */
const MODEL_TIMEOUT_MS = 12_000;
/** Enough raw text to survive a preamble and still yield one clean line. */
const MAX_RAW_CHARS = 400;

type VocabularyResponse = { phrases: string[] };

export function useNoteCompletion(subjectId: string | null, breadcrumb: string) {
  const [modelPending, setModelPending] = useState(false);

  const { data } = useQuery({
    queryKey: ["note-vocabulary", subjectId],
    queryFn: () =>
      api.get<VocabularyResponse>(
        subjectId ? `/api/suggest/vocabulary?subjectId=${encodeURIComponent(subjectId)}` : "/api/suggest/vocabulary",
      ),
    staleTime: VOCABULARY_STALE_MS,
  });

  // Read through a ref so the getter handed to CodeMirror stays referentially
  // stable across refetches.
  const phrasesRef = useRef<string[]>([]);
  phrasesRef.current = data?.phrases ?? [];
  const vocabulary = useCallback(() => phrasesRef.current, []);

  const breadcrumbRef = useRef(breadcrumb);
  breadcrumbRef.current = breadcrumb;

  const requestModel = useCallback(async (doc: string, pos: number): Promise<string | null> => {
    const settings = loadSettings();
    if (!isConfigured(settings)) return null;

    // A keystroke should never start a multi-gigabyte download. If the model
    // isn't on disk yet, the settings sheet is where that decision belongs.
    if (settings.provider === "webllm") {
      const { isModelCached } = await import("@/lib/llm/webllm-transport");
      if (!(await isModelCached(settings.webllmModel))) return null;
    }

    // Chat holds the engine while it streams. Waiting behind a twenty second
    // reply would deliver ghost text long after the user moved on.
    const release = acquireEngine("completion");
    if (!release) return null;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), MODEL_TIMEOUT_MS);

    try {
      const transport =
        settings.provider === "webllm"
          ? (await import("@/lib/llm/webllm-transport")).createWebllmTransport(settings.webllmModel)
          : createOpenAiTransport(settings);

      const messages = buildCompletionPrompt({
        before: doc.slice(0, pos),
        breadcrumb: breadcrumbRef.current,
      });

      let raw = "";
      try {
        for await (const token of transport.streamChat(messages, { signal: controller.signal })) {
          raw += token;
          // Only the first line survives `cleanCompletion`, so there's nothing
          // to gain from the rest. Aborting rather than breaking is what makes
          // the model actually stop: the transport interrupts generation on
          // the next chunk, where an abandoned loop would leave it running.
          if (raw.includes("\n") || raw.length > MAX_RAW_CHARS) controller.abort();
        }
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) throw err;
      }

      return cleanCompletion(raw);
    } catch {
      // Autocomplete is a convenience. A failure here is silence.
      return null;
    } finally {
      clearTimeout(timeout);
      release();
    }
  }, []);

  return { vocabulary, requestModel, modelPending, setModelPending };
}
