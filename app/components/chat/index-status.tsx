"use client";

import { Loader2, RefreshCw } from "lucide-react";
import type { useIndexing } from "@/hooks/useChat";

/**
 * Background indexing progress (§12). In the chat panel this is an
 * unobtrusive header row that renders nothing when retrieval isn't in play.
 * In the settings sheet it also explains *why* when WebGPU is the reason —
 * that's the one place a Safari user should be told plainly.
 */
export function IndexStatus({
  indexing,
  variant = "header",
}: {
  indexing: ReturnType<typeof useIndexing>;
  variant?: "header" | "settings";
}) {
  const { enabled, webGpuAvailable, status, isIndexing, indexedThisRun, rebuild } = indexing;

  if (variant === "settings" && webGpuAvailable === false) {
    return (
      <p className="text-[11.5px] leading-relaxed text-muted-foreground">
        This browser has no WebGPU, so notes can&apos;t be indexed. Chat still works — it falls back to sending as
        much of your plan as fits, the way it always has.
      </p>
    );
  }

  if (!enabled || !status) return null;

  return (
    <div
      className={
        variant === "header"
          ? "flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-1.5"
          : "flex items-center justify-between gap-2"
      }
    >
      <span className="lk-mono flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
        {isIndexing ? (
          <>
            <Loader2 size={11} className="animate-spin" />
            indexing notes… {indexedThisRun > 0 && `${indexedThisRun} done`}
          </>
        ) : (
          `${status.indexed} of ${status.total} notes indexed`
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
  );
}
