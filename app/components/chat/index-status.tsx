"use client";

import { Cpu, Loader2, RefreshCw } from "lucide-react";
import type { useIndexing } from "@/hooks/useChat";

/**
 * Background indexing progress (§12). In the chat panel this is an
 * unobtrusive header row that renders nothing when retrieval isn't in play.
 * In the settings sheet it also says which runtime is embedding, because the
 * CPU one is slower by an order of magnitude and a user watching a slow first
 * index deserves to know why.
 */
export function IndexStatus({
  indexing,
  variant = "header",
}: {
  indexing: ReturnType<typeof useIndexing>;
  variant?: "header" | "settings";
}) {
  const { enabled, backend, status, isIndexing, indexedThisRun, rebuild } = indexing;

  // Neither WebGPU nor WebAssembly. Effectively unreachable in a browser that
  // can run the rest of this app, but the index genuinely cannot be built.
  if (variant === "settings" && backend === null) {
    return (
      <p className="text-[11.5px] leading-relaxed text-muted-foreground">
        This browser can&apos;t run an embedding model, so notes can&apos;t be indexed. Chat still works — it falls
        back to sending as much of your plan as fits.
      </p>
    );
  }

  if (!enabled || !status) return null;

  return (
    <div
      className={
        variant === "header"
          ? "flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-1.5"
          : "flex flex-col gap-1"
      }
    >
      <div className="flex items-center justify-between gap-2">
        <span className="lk-mono flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
          {isIndexing ? (
            <>
              <Loader2 size={11} className="animate-spin" />
              indexing notes… {indexedThisRun > 0 && `${indexedThisRun} done`}
            </>
          ) : (
            <>
              {status.indexed} of {status.total} notes indexed
              {backend === "wasm" && <Cpu size={10} aria-label="Indexing on CPU" />}
            </>
          )}
        </span>
        {!isIndexing && (
          <button
            type="button"
            onClick={() => void rebuild()}
            aria-label="Rebuild the note index"
            className="lk-mono flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            <RefreshCw size={10} /> rebuild
          </button>
        )}
      </div>

      {variant === "settings" && backend === "wasm" && (
        <p className="text-[11.5px] leading-relaxed text-muted-foreground">
          No WebGPU here, so notes are embedded on the CPU. Same model and the same results, but the first index
          downloads 127 MB and runs slower — leave this open and it&apos;ll finish in the background.
        </p>
      )}
    </div>
  );
}
