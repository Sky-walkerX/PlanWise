/**
 * Connection settings for the user's own LLM.
 *
 * These live in localStorage, not the database, on purpose: the endpoint is a
 * property of the machine this browser runs on, not of the account. Syncing
 * `http://localhost:11434` to a phone would be actively wrong. It also means an
 * API key typed here never reaches LockIn's server.
 */
export type LlmSettings = {
  baseUrl: string;
  model: string;
  apiKey: string;
  contextTokens: number;
  temperature: number;
};

export const STORAGE_KEY = "lockin.llm";

export const PRESETS: { label: string; baseUrl: string }[] = [
  { label: "Ollama", baseUrl: "http://localhost:11434/v1" },
  { label: "LM Studio", baseUrl: "http://localhost:1234/v1" },
  { label: "llama.cpp", baseUrl: "http://localhost:8080/v1" },
];

export const DEFAULT_SETTINGS: LlmSettings = {
  baseUrl: "",
  model: "",
  apiKey: "",
  contextTokens: 8000,
  temperature: 0.3,
};

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
  return settings.baseUrl.trim().length > 0 && settings.model.trim().length > 0;
}

/** Trailing slashes would double up against the `/chat/completions` suffix. */
export function normalizeBaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}
