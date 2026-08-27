import type { PromptMessage } from "@/lib/chat/types";
import type { ChatTransport, StreamOpts } from "./transport";
import { normalizeBaseUrl, type LlmSettings } from "./settings";

/**
 * Browser-side transport to an OpenAI-compatible endpoint.
 *
 * This runs in the browser because it has to: LockIn is deployed remotely and
 * the model listens on the user's own localhost, which no server of ours can
 * reach. One wire format (`/chat/completions` + `/models`) covers Ollama, LM
 * Studio, llama.cpp, Jan, vLLM and LocalAI.
 */

/** A failure with a message worth showing the user verbatim. */
export class LlmError extends Error {
  readonly hint: "cors" | "endpoint" | "auth" | "model" | "server";

  constructor(message: string, hint: LlmError["hint"]) {
    super(message);
    this.name = "LlmError";
    this.hint = hint;
  }
}

function headers(settings: LlmSettings): HeadersInit {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (settings.apiKey.trim()) h.Authorization = `Bearer ${settings.apiKey.trim()}`;
  return h;
}

/**
 * A cross-origin fetch that a browser blocks fails as a bare `TypeError` with
 * no status — indistinguishable from the server being down. Since a misconfigured
 * `OLLAMA_ORIGINS` is by far the most likely cause, that's what we lead with.
 */
function asNetworkError(baseUrl: string): LlmError {
  return new LlmError(
    `Can't reach ${baseUrl}. Check the server is running and that it allows requests from this page's origin.`,
    "cors",
  );
}

async function describeHttpError(response: Response, baseUrl: string): Promise<LlmError> {
  if (response.status === 401 || response.status === 403) {
    return new LlmError("The endpoint rejected the API key.", "auth");
  }
  if (response.status === 404) {
    return new LlmError(
      `Reached ${baseUrl}, but there's no OpenAI-compatible API there. Most servers need the path to end in /v1.`,
      "endpoint",
    );
  }

  const body = await response.text().catch(() => "");
  if (/model/i.test(body) && (response.status === 400 || response.status === 404)) {
    return new LlmError("That model isn't loaded on the server.", "model");
  }
  const detail = body.slice(0, 200).trim();
  return new LlmError(
    `The model server returned ${response.status}${detail ? `: ${detail}` : ""}.`,
    "server",
  );
}

/** Model ids the endpoint reports, for the settings dropdown. */
export async function listModels(settings: LlmSettings): Promise<string[]> {
  const baseUrl = normalizeBaseUrl(settings.baseUrl);
  if (!baseUrl) throw new LlmError("Set a server URL first.", "endpoint");

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/models`, { headers: headers(settings) });
  } catch {
    throw asNetworkError(baseUrl);
  }
  if (!response.ok) throw await describeHttpError(response, baseUrl);

  const body = (await response.json()) as { data?: { id?: string }[] };
  return (body.data ?? []).map((m) => m.id).filter((id): id is string => typeof id === "string" && id.length > 0);
}

export type StreamOptions = {
  settings: LlmSettings;
  messages: PromptMessage[];
  signal: AbortSignal;
  onToken: (chunk: string) => void;
};

/**
 * Streams a completion, invoking `onToken` per chunk, and resolves with the
 * full text. Aborting rejects with a DOMException named `AbortError`, which the
 * caller treats as a deliberate stop rather than a failure.
 */
export async function streamCompletion({
  settings,
  messages,
  signal,
  onToken,
}: StreamOptions): Promise<string> {
  const baseUrl = normalizeBaseUrl(settings.baseUrl);

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: headers(settings),
      signal,
      body: JSON.stringify({
        model: settings.model,
        messages,
        temperature: settings.temperature,
        stream: true,
      }),
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw asNetworkError(baseUrl);
  }

  if (!response.ok) throw await describeHttpError(response, baseUrl);
  if (!response.body) throw new LlmError("The model server sent an empty response.", "server");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // SSE frames are newline-delimited; a chunk can split one mid-line, so the
    // trailing partial stays in the buffer until the rest arrives.
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;

      const payload = trimmed.slice(5).trim();
      if (payload === "[DONE]") continue;

      try {
        const parsed = JSON.parse(payload) as {
          choices?: { delta?: { content?: string } }[];
        };
        const token = parsed.choices?.[0]?.delta?.content;
        if (token) {
          full += token;
          onToken(token);
        }
      } catch {
        // A frame we can't parse is not worth killing a good stream over.
      }
    }
  }

  return full;
}

/**
 * Bridges `streamCompletion`'s callback style to `ChatTransport`'s
 * `AsyncIterable`. `streamCompletion` itself is unchanged — this only adapts
 * how its tokens are consumed, via a small resolve-queue: tokens pushed by
 * `onToken` wake a generator that's parked awaiting the next one.
 */
async function* streamTokens(settings: LlmSettings, messages: PromptMessage[], opts: StreamOpts): AsyncGenerator<string> {
  const queue: string[] = [];
  let done = false;
  let failure: unknown = null;
  let wake: (() => void) | null = null;

  const notify = () => {
    if (wake) {
      const fn = wake;
      wake = null;
      fn();
    }
  };

  streamCompletion({
    settings,
    messages,
    signal: opts.signal,
    onToken: (token) => {
      queue.push(token);
      notify();
    },
  })
    .then(() => {
      done = true;
      notify();
    })
    .catch((error) => {
      failure = error;
      done = true;
      notify();
    });

  while (true) {
    if (queue.length > 0) {
      yield queue.shift()!;
      continue;
    }
    if (done) {
      if (failure) throw failure;
      return;
    }
    await new Promise<void>((resolve) => {
      wake = resolve;
    });
  }
}

/** The local-server transport: an OpenAI-compatible endpoint on the user's
 *  own machine, wrapped to satisfy `ChatTransport`. */
export function createOpenAiTransport(settings: LlmSettings): ChatTransport {
  return {
    listModels: () => listModels(settings),
    streamChat: (messages, opts) => streamTokens(settings, messages, opts),
  };
}
