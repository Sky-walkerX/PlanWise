"use client";

import { useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { listModels } from "@/lib/llm/client";
import {
  PRESETS,
  normalizeBaseUrl,
  saveSettings,
  type LlmSettings,
} from "@/lib/llm/settings";

/**
 * Connection settings for the user's own model server.
 *
 * "Test connection" is the primary action rather than a nicety: a wrong base
 * URL and a blocked origin look identical from the panel, so proving the
 * endpoint answers — and listing its models — is what makes the rest usable.
 */
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
  const [models, setModels] = useState<string[] | null>(null);
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const set = <K extends keyof LlmSettings>(key: K, value: LlmSettings[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

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
              value={draft.contextTokens}
              onChange={(e) => set("contextTokens", Number(e.target.value))}
              className="lk-mono w-full rounded-md border border-border bg-background px-2.5 py-2 text-[12.5px] outline-none focus:border-foreground"
            />
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
