"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Loader2, X } from "lucide-react";
import { listModels } from "@/lib/llm/client";
import {
  DEFAULT_WEBLLM_MODEL,
  PRESETS,
  normalizeBaseUrl,
  saveSettings,
  type LlmProvider,
  type LlmSettings,
} from "@/lib/llm/settings";
import { useIndexing } from "@/hooks/useChat";
import { IndexStatus } from "./index-status";

/**
 * Connection settings for the user's model — either a local server or the
 * in-browser WebLLM engine (§9, §10, §12 of the RAG design).
 *
 * "Test connection" / "Load model" is each provider's primary action rather
 * than a nicety: a wrong base URL and a blocked origin look identical from
 * the panel, and a multi-gigabyte download with no feedback is
 * indistinguishable from a hang. Proving the thing actually works is what
 * makes the rest of the sheet usable.
 */

const CURATED_WEBLLM_MODELS: { id: string; label: string; download: string; note: string }[] = [
  { id: "gemma3-1b-it-q4f16_1-MLC", label: "Gemma 3 1B", download: "711 MB", note: "Floor. Weak machines and slow connections." },
  { id: "Llama-3.2-1B-Instruct-q4f16_1-MLC", label: "Llama 3.2 1B", download: "879 MB", note: "Floor, better instruction-following." },
  { id: "Qwen3-1.7B-q4f16_1-MLC", label: "Qwen3 1.7B", download: "2,037 MB", note: "Default. Best quality per MB — emits <think>." },
  { id: "Llama-3.2-3B-Instruct-q4f16_1-MLC", label: "Llama 3.2 3B", download: "2,264 MB", note: "Strongest grounded Q&A in this tier." },
  { id: "Phi-4-mini-instruct-q4f16_1-MLC", label: "Phi-4 mini", download: "3,438 MB", note: "Tuned for source-grounded answering." },
  { id: "Qwen3.5-4B-q4f16_1-MLC", label: "Qwen3.5 4B", download: "3,868 MB", note: "Best synthesis that still fits a 6 GB GPU." },
  { id: "Llama-3.1-8B-Instruct-q4f16_1-MLC", label: "Llama 3.1 8B", download: "5,001 MB", note: "Ceiling. Needs 8 GB VRAM." },
];

export function SettingsSheet({
  settings,
  onChange,
  onClose,
}: {
  settings: LlmSettings;
  onChange: (next: LlmSettings) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<LlmSettings>(settings);

  const set = <K extends keyof LlmSettings>(key: K, value: LlmSettings[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const save = () => {
    const next = { ...draft, baseUrl: normalizeBaseUrl(draft.baseUrl) };
    saveSettings(next);
    onChange(next);
    onClose();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="lk-sec">connection</span>
        <button type="button" onClick={onClose} className="lk-iconbtn" aria-label="Close settings">
          <X size={15} />
        </button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
        <ProviderToggle value={draft.provider} onChange={(p) => set("provider", p)} />

        {draft.provider === "openai" ? (
          <OpenAiSettings draft={draft} set={set} />
        ) : (
          <WebllmSettings draft={draft} set={set} />
        )}

        <div>
          <label htmlFor="lk-rag" className="flex items-center justify-between gap-2 py-1">
            <span className="lk-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Search notes for context
            </span>
            <input
              id="lk-rag"
              type="checkbox"
              checked={draft.ragEnabled}
              onChange={(e) => set("ragEnabled", e.target.checked)}
              className="h-4 w-4"
            />
          </label>
          <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
            When your plan is too big to send whole, retrieve the passages that answer the question instead of
            silently trimming. Needs WebGPU to embed your notes — chat itself still works without it.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="lk-ctx" className="lk-mono mb-1.5 block text-[11px] uppercase tracking-wide text-muted-foreground">
              Context budget
            </label>
            <input
              id="lk-ctx"
              type="number"
              min={500}
              step={500}
              disabled={draft.provider === "webllm"}
              value={draft.provider === "webllm" ? 2500 : draft.contextTokens}
              onChange={(e) => set("contextTokens", Number(e.target.value))}
              className="lk-mono w-full rounded-md border border-border bg-background px-2.5 py-2 text-[12.5px] outline-none focus:border-foreground disabled:opacity-50"
            />
            {draft.provider === "webllm" && (
              <p className="mt-1 text-[10.5px] leading-relaxed text-muted-foreground">Capped for WebLLM&apos;s 4k window.</p>
            )}
          </div>
          <div>
            <label htmlFor="lk-temp" className="lk-mono mb-1.5 block text-[11px] uppercase tracking-wide text-muted-foreground">
              Temperature
            </label>
            <input
              id="lk-temp"
              type="number"
              min={0}
              max={2}
              step={0.1}
              value={draft.temperature}
              onChange={(e) => set("temperature", Number(e.target.value))}
              className="lk-mono w-full rounded-md border border-border bg-background px-2.5 py-2 text-[12.5px] outline-none focus:border-foreground"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-3">
        <button type="button" onClick={save} className="lk-btn w-full px-3 py-2 text-[10.5px]">
          Save
        </button>
      </div>
    </div>
  );
}

function ProviderToggle({ value, onChange }: { value: LlmProvider; onChange: (p: LlmProvider) => void }) {
  const options: { value: LlmProvider; label: string }[] = [
    { value: "openai", label: "Local server" },
    { value: "webllm", label: "In browser" },
  ];
  return (
    <div className="flex rounded-md border border-border p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`lk-mono flex-1 rounded px-2.5 py-1.5 text-[11px] uppercase tracking-wide transition-colors ${
            value === opt.value ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function OpenAiSettings({
  draft,
  set,
}: {
  draft: LlmSettings;
  set: <K extends keyof LlmSettings>(key: K, value: LlmSettings[K]) => void;
}) {
  const [models, setModels] = useState<string[] | null>(null);
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const test = async () => {
    setTesting(true);
    setResult(null);
    try {
      const found = await listModels(draft);
      setModels(found);
      if (found.length === 0) {
        setResult({ ok: false, message: "Connected, but the server reports no models." });
      } else {
        setResult({ ok: true, message: `Connected · ${found.length} model${found.length === 1 ? "" : "s"}` });
        // Nothing chosen yet, or the choice is gone — take the first available
        // so the user can send a message without a second trip through here.
        if (!draft.model || !found.includes(draft.model)) set("model", found[0]);
      }
    } catch (error) {
      setResult({ ok: false, message: error instanceof Error ? error.message : "Connection failed." });
    } finally {
      setTesting(false);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="lk-base-url" className="lk-mono mb-1.5 block text-[11px] uppercase tracking-wide text-muted-foreground">
          Server URL
        </label>
        <input
          id="lk-base-url"
          value={draft.baseUrl}
          onChange={(e) => set("baseUrl", e.target.value)}
          placeholder="http://localhost:11434/v1"
          spellCheck={false}
          autoComplete="off"
          className="lk-mono w-full rounded-md border border-border bg-background px-2.5 py-2 text-[12.5px] outline-none focus:border-foreground"
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => set("baseUrl", preset.baseUrl)}
              className="lk-mono rounded-md border border-border px-2 py-1 text-[10.5px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="lk-api-key" className="lk-mono mb-1.5 block text-[11px] uppercase tracking-wide text-muted-foreground">
          API key <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="lk-api-key"
          type="password"
          value={draft.apiKey}
          onChange={(e) => set("apiKey", e.target.value)}
          placeholder="Leave empty for local servers"
          autoComplete="off"
          className="lk-mono w-full rounded-md border border-border bg-background px-2.5 py-2 text-[12.5px] outline-none focus:border-foreground"
        />
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
          Stored in this browser only. It is never sent to LockIn&apos;s server.
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={test}
          disabled={testing || !draft.baseUrl.trim()}
          className="lk-btn flex items-center gap-1.5 px-3 py-2 text-[10.5px] disabled:opacity-40"
        >
          {testing ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
          Test connection
        </button>
        {result && (
          <p className={`mt-2 text-[11.5px] leading-relaxed ${result.ok ? "text-muted-foreground" : "text-destructive"}`}>
            {result.message}
          </p>
        )}
        {result && !result.ok && <CorsHelp />}
      </div>

      <div>
        <label htmlFor="lk-model" className="lk-mono mb-1.5 block text-[11px] uppercase tracking-wide text-muted-foreground">
          Model
        </label>
        {models && models.length > 0 ? (
          <select
            id="lk-model"
            value={draft.model}
            onChange={(e) => set("model", e.target.value)}
            className="lk-mono w-full rounded-md border border-border bg-background px-2.5 py-2 text-[12.5px] outline-none focus:border-foreground"
          >
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        ) : (
          <input
            id="lk-model"
            value={draft.model}
            onChange={(e) => set("model", e.target.value)}
            placeholder="llama3.1:8b"
            spellCheck={false}
            autoComplete="off"
            className="lk-mono w-full rounded-md border border-border bg-background px-2.5 py-2 text-[12.5px] outline-none focus:border-foreground"
          />
        )}
      </div>
    </>
  );
}

function WebllmSettings({
  draft,
  set,
}: {
  draft: LlmSettings;
  set: <K extends keyof LlmSettings>(key: K, value: LlmSettings[K]) => void;
}) {
  const [webGpuAvailable, setWebGpuAvailable] = useState<boolean | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [allModels, setAllModels] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<{ progress: number; text: string } | null>(null);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const indexing = useIndexing(draft);

  useEffect(() => {
    let cancelled = false;
    import("@/lib/llm/webllm-transport").then(({ hasWebGPU }) => {
      if (!cancelled) setWebGpuAvailable(hasWebGPU());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const loadShowAll = async () => {
    setShowAll(true);
    if (allModels) return;
    const { listWebllmChatModels } = await import("@/lib/llm/webllm-transport");
    setAllModels(listWebllmChatModels());
  };

  const load = async () => {
    setLoading(true);
    setResult(null);
    setProgress(null);
    try {
      const { preloadEngine } = await import("@/lib/llm/webllm-transport");
      await preloadEngine(draft.webllmModel || DEFAULT_WEBLLM_MODEL, (report) =>
        setProgress({ progress: report.progress, text: report.text }),
      );
      setResult({ ok: true, message: "Model loaded and cached — ready to chat." });
    } catch (error) {
      setResult({ ok: false, message: error instanceof Error ? error.message : "Failed to load the model." });
    } finally {
      setLoading(false);
    }
  };

  const clearCache = async () => {
    const { clearModelCache } = await import("@/lib/llm/webllm-transport");
    const { EMBEDDING_MODEL } = await import("@/lib/rag/embedding-model");
    await Promise.all([clearModelCache(draft.webllmModel || DEFAULT_WEBLLM_MODEL), clearModelCache(EMBEDDING_MODEL)]);
    setResult({ ok: true, message: "Cached weights cleared." });
  };

  if (webGpuAvailable === false) {
    return (
      <div className="lk-card p-3">
        <p className="text-[12.5px] leading-relaxed text-muted-foreground">
          This browser has no WebGPU, so an in-browser model can&apos;t run here. Use a local server instead, or
          switch to a browser with WebGPU support (recent Chrome or Edge).
        </p>
      </div>
    );
  }

  const models = showAll && allModels ? allModels : CURATED_WEBLLM_MODELS.map((m) => m.id);

  return (
    <>
      <div>
        <label className="lk-mono mb-1.5 block text-[11px] uppercase tracking-wide text-muted-foreground">Model</label>
        <div className="space-y-1.5">
          {models.map((id) => {
            const meta = CURATED_WEBLLM_MODELS.find((m) => m.id === id);
            const on = draft.webllmModel === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => set("webllmModel", id)}
                aria-pressed={on}
                className={`lk-mono block w-full rounded-md border px-2.5 py-2 text-left text-[11.5px] transition-colors ${
                  on ? "border-foreground" : "border-border hover:border-foreground/50"
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span>{meta?.label ?? id}</span>
                  {meta && <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{meta.download}</span>}
                </span>
                {meta && <span className="mt-0.5 block text-[10.5px] leading-relaxed text-muted-foreground">{meta.note}</span>}
              </button>
            );
          })}
        </div>
        {!showAll && (
          <button
            type="button"
            onClick={() => void loadShowAll()}
            className="lk-mono mt-2 flex items-center gap-1 text-[10.5px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronDown size={11} /> show all {allModels?.length ?? 163}
          </button>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={load}
          disabled={loading || !draft.webllmModel}
          className="lk-btn flex items-center gap-1.5 px-3 py-2 text-[10.5px] disabled:opacity-40"
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
          Download &amp; load
        </button>
        <button
          type="button"
          onClick={() => void clearCache()}
          className="lk-mono ml-2 text-[10.5px] uppercase tracking-wide text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
        >
          Clear cached weights
        </button>

        {loading && progress && (
          <div className="mt-2.5">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-foreground transition-[width]"
                style={{ width: `${Math.round(Math.min(1, Math.max(0, progress.progress)) * 100)}%` }}
              />
            </div>
            <p className="lk-mono mt-1.5 text-[10.5px] text-muted-foreground">{progress.text}</p>
          </div>
        )}
        {result && (
          <p className={`mt-2 text-[11.5px] leading-relaxed ${result.ok ? "text-muted-foreground" : "text-destructive"}`}>
            {result.message}
          </p>
        )}
      </div>

      <div className="lk-card p-3">
        <IndexStatus indexing={indexing} variant="settings" />
      </div>
    </>
  );
}

/**
 * Shown on any failed connection. A browser reports a blocked cross-origin
 * request as an indistinguishable network error, and allowing the origin is
 * the fix people miss, so the commands are spelled out rather than linked.
 */
function CorsHelp() {
  const origin = typeof window === "undefined" ? "http://localhost:3000" : window.location.origin;

  return (
    <div className="lk-card mt-3 p-3">
      <p className="lk-mono text-[10.5px] uppercase tracking-wide text-muted-foreground">
        If the server is running
      </p>
      <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted-foreground">
        It must allow requests from <span className="lk-mono text-foreground">{origin}</span>.
      </p>
      <pre className="lk-mono mt-2 overflow-x-auto rounded-md bg-muted px-2.5 py-2 text-[11px] leading-relaxed">
{`# Ollama
OLLAMA_ORIGINS=${origin} ollama serve

# Ollama, macOS app
launchctl setenv OLLAMA_ORIGINS "${origin}"
# then restart Ollama`}
      </pre>
      <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">
        LM Studio: enable CORS in the local server tab.
      </p>
    </div>
  );
}
