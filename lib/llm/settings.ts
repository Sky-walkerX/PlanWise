/**
 * Connection settings for the user's own LLM.
 *
 * These live in localStorage, not the database, on purpose: the endpoint is a
 * property of the machine this browser runs on, not of the account. Syncing
 * `http://localhost:11434` to a phone would be actively wrong. It also means an
 * API key typed here never reaches LockIn's server.
 *
 * `provider` picks between the local-server transport (`client.ts`) and the
 * in-browser one (`webllm-transport.ts`); everything below `apiKey` is
 * specific to one or the other, but both stay in the same blob so switching
 * providers doesn't lose the other's settings.
 */
export type LlmProvider = "openai" | "webllm";

export type LlmSettings = {
  provider: LlmProvider;
  baseUrl: string;
  model: string;
  apiKey: string;
  webllmModel: string;
  contextTokens: number;
  temperature: number;
  ragEnabled: boolean;
};

export const STORAGE_KEY = "lockin.llm";

export const PRESETS: { label: string; baseUrl: string }[] = [
  { label: "Ollama", baseUrl: "http://localhost:11434/v1" },
  { label: "LM Studio", baseUrl: "http://localhost:1234/v1" },
  { label: "llama.cpp", baseUrl: "http://localhost:8080/v1" },
];

export const DEFAULT_WEBLLM_MODEL = "Qwen3-1.7B-q4f16_1-MLC";

// No WebLLM model exceeds 4,096 tokens of context (§2 of the RAG design). The
// stored default of 8,000 would silently overflow that window.
export const WEBLLM_CONTEXT_CEILING = 2500;

export const DEFAULT_SETTINGS: LlmSettings = {
  provider: "openai",
  baseUrl: "",
  model: "",
  apiKey: "",
  webllmModel: DEFAULT_WEBLLM_MODEL,
  contextTokens: 8000,
  temperature: 0.3,
  ragEnabled: true,
};

/** The ceiling actually sent to `prepare` — clamped for WebLLM regardless of
 *  what's stored, since the stored value may predate a provider switch. */
export function effectiveContextTokens(settings: LlmSettings): number {
  return settings.provider === "webllm" ? Math.min(settings.contextTokens, WEBLLM_CONTEXT_CEILING) : settings.contextTokens;
}

export function loadSettings(): LlmSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    // Spread over the defaults so a stored blob from an older shape still loads.
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<LlmSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: LlmSettings): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function isConfigured(settings: LlmSettings): boolean {
  if (settings.provider === "webllm") return settings.webllmModel.trim().length > 0;
  return settings.baseUrl.trim().length > 0 && settings.model.trim().length > 0;
}

/** Trailing slashes would double up against the `/chat/completions` suffix. */
export function normalizeBaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}
