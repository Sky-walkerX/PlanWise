# RAG and in-browser LLMs

**Date:** 2026-08-27
**Status:** Implemented (see §15 for what was verified and what still needs a WebGPU machine)
**Repo:** LockIn (Next.js 15 App Router, React 19, TypeScript, Prisma/Postgres, NextAuth v4 JWT, React Query, Tailwind v4)
**Supersedes parts of:** `2026-08-20-local-llm-chat-design.md` (its §7 context assembly and §8 transport)

## 1. Overview

Two changes that turn out to be one feature.

First, WebLLM. The chat model can run inside the browser on WebGPU, so a user gets a working
assistant with no Ollama install, no CORS setup, and no localhost. Second, retrieval. Instead of
stuffing every selected subject into the prompt and trimming whatever overflows, the server picks
the note passages that actually answer the question.

These arrived as separate requests. Measurement showed they are the same one: no WebLLM model has a
context window large enough to hold a real LockIn subject, so retrieval is the thing that makes
in-browser chat work at all.

## 2. What the measurements showed

Both decisions rest on numbers taken from the production database and the WebLLM model registry on
2026-08-27, not on estimates.

### Corpus size

The most active account holds 4 subjects:

| Field | Characters | Tokens (chars/4) |
|---|---|---|
| Milestone notes | 12,063 | 3.0k |
| Task descriptions | 20,536 | 5.1k |
| Subtask notes | 43,023 | 10.8k |
| All titles | 1,732 | 0.4k |
| **Total** | **77,354** | **19.3k** |

Largest single subject: 32,950 chars, about 8.2k tokens. Second: 7.7k. Third: 3.4k.

Two things follow. The corpus is already 2.4x over the current 8,000 token ceiling, so the budgeter
in `lib/chat/budget.ts` is dropping real content on real questions today. And 97.8% of everything
the user has written lives in note fields (75,622 of 77,354 chars), which is exactly what trim
tiers 1 through 5 discard first. The model keeps the titles and loses the substance.

The `ctx 358/8k` figure recorded in the previous design's verification table came from a nearly
empty subject. It is not representative and should not be used to reason about budget again.

### The WebLLM ceiling

Parsed from `prebuiltAppConfig` in `mlc-ai/web-llm@0.2.84`, 163 models:

> Every model caps at 4,096 tokens of context. None exceeds it.

Reserve roughly 1,000 tokens for the reply, 150 for the system prompt, and a few hundred for
conversation history, and about 2,500 tokens remain for context. Against that ceiling the whole
corpus is 7.7x too large, and the largest single subject is 3.3x too large. Under the current
picker-and-trim design a WebGPU model would receive subject and task titles and almost none of the
notes, then answer confidently from nothing.

### pgvector

`vector 0.8.0` is available on the Supabase project and not installed. It stays uninstalled. See
§4.2.

## 3. Goals and non-goals

**Goals**

- Answer questions from the passages that matter, at any corpus size, without silent truncation.
- Run the whole assistant in the browser on WebGPU, with no local install.
- Keep the existing local-server transport working and unchanged in behaviour.
- Improve the existing Ollama path too. A 19.3k corpus against an 8k ceiling is already lossy.
- Show the user which notes an answer drew on.

**Non-goals**

- No uploaded documents. PDFs, slides and textbooks are out. The corpus is the existing plan data.
- No server-side embedding. The server has no model and gains none.
- No approximate-nearest-neighbour index. See §4.2.
- No hosted cloud providers. OpenAI, Anthropic and friends remain out of scope.
- No re-ranking model, no query rewriting, no hypothetical-document expansion.
- Still a reader. Retrieval does not let the model write to the plan.

## 4. Decisions, and what was rejected

### 4.1 Embeddings run in the browser on WebGPU, via web-llm

`snowflake-arctic-embed-s-q0f32-MLC-b4`, 239 MB, 384 dimensions, 512-token maximum sequence.

One dependency covers chat and embeddings. The alternative considered was transformers.js with
`all-MiniLM-L6-v2` on CPU, which would index on any browser rather than only WebGPU ones and weighs
23 MB. It was rejected: transformers.js v4 pulls `sharp` and `onnxruntime-node`, which break a
Next.js server bundle unless carefully confined, and a second inference runtime for one model is
poor value.

The cost of this choice is real and handled in §9: without WebGPU there is no index.

**Superseded 2026-09-02.** There is now a second embedding backend, and the "no WebGPU, no index"
cost above no longer applies. Two things forced the reversal. WebLLM hard-requires
`maxStorageBuffersPerShaderStage >= 10` and throws below it, and Firefox reports 9, so an entire
browser was excluded rather than only Safari and old mobile. And a user on Firefox with a local
server had working chat but no retrieval at all, meaning the moment their plan outgrew the budget
it was silently trimmed, which is precisely what this design exists to prevent.

The bundling objection above was about server-side use. `lib/llm/wasm-embedder.ts` imports
`@huggingface/transformers` dynamically from a client component only, so it never enters the server
bundle, and the initial client bundle is unchanged because the import is lazy.

The "second model" objection does not apply either, because it is not a second model. The CPU path
runs the *same* fp32 Snowflake weights through onnxruntime instead of TVM, so both backends write
vectors into one space, tagged with one `EMBEDDING_MODEL`. Indexing in Chrome and then opening the
account in Firefox reuses the existing index rather than re-embedding, which is verified end to
end. This is why the stored identifier now names the weights (`snowflake-arctic-embed-s`) rather
than the runtime (`snowflake-arctic-embed-s-q0f32-MLC-b4`); renaming it re-indexes every existing
corpus once, lazily, through the §7.3 freshness path.

A quantized ONNX build would cut the 127 MB download to 32 MB and was rejected: its vectors drift
away from the WebGPU path's, and because both are 384 dimensions the mismatch would pass every
dimension check and surface only as quietly worse retrieval.

The `b4` variant is deliberate. `b32` embeds 32 passages per call but reserves 1,023 MB of VRAM,
which would compete with the chat model. At `b4` the embedder and a 2,037 MB chat model sit in one
engine at about 2.3 GB total. Batch-4 means roughly 20 calls for a corpus this size, which costs
milliseconds.

### 4.2 Vectors are `Float[]` in Postgres, scored in Node

The corpus chunks to roughly 60 to 80 passages. At 384 dimensions that is about 115 KB of vectors.
A brute-force scan of 80 vectors is sub-millisecond in plain JavaScript.

pgvector's index does not pay for itself until roughly 100,000 chunks, three orders of magnitude
away. Installing it would mean a `CREATE EXTENSION`, a Prisma `Unsupported("vector(384)")` column,
and raw SQL for every insert and query, in exchange for nothing measurable.

Storing plain `Float[]` keeps scoring in a pure, unit-tested module, which matches how
`lib/chat/context.ts` and `lib/chat/budget.ts` are already built. Revisit at about 10,000 chunks
per user, at which point the migration is a column type change and a rewrite of one function.

Vectors are normalised at write time, so cosine similarity is a dot product.

### 4.3 The skeleton always ships, retrieval adds depth

Pure retrieval would break planning questions. "What should I work on next" is not answerable from
eight semantically similar note passages, because the answer depends on the shape of the whole plan.

So every retrieval prompt carries two parts. A skeleton listing subjects, milestones with progress
counts, and incomplete task titles, which costs about 433 tokens for the full corpus and is what
makes breadth questions work. Then the retrieved passages, which supply depth.

### 4.4 Mode selection is automatic

The server estimates the full digest. If it fits the budget, it uses the existing full-digest path
untouched, because sending everything is strictly better than sending a selection. If it does not
fit, it retrieves. Small accounts therefore keep exactly today's behaviour, and the retrieval path
is only exercised where it helps.

## 5. Architecture and data flow

The rule from the previous design still holds. The browser is the only component that can reach a
model. It now hosts two: the chat model and the embedding model, in one web-llm engine, in one
worker. The server holds the corpus, does the chunking, and does the scoring.

```
Browser (worker)                    Next.js server                  Postgres
────────────────                    ──────────────                  ────────
Indexing (lazy, on panel open)
  GET /api/rag/status ────────────► hash live sources               read notes
    ◄───────────────────────────── { indexed, stale, orphaned }
  GET /api/rag/pending ──────────► chunk stale sources (pure)
    ◄───────────────────────────── [{ content, breadcrumb, hash }]
  embed batches of 4
  POST /api/rag/chunks ──────────► replace all rows for source      write vectors

Asking a question
  embed the query (with prefix)
  POST .../prepare ──────────────► score, select, assemble          read vectors
    ◄───────────────────────────── { messages[], budget, sources[] }
  engine.chat.completions.create
  render tokens live
  POST .../messages ─────────────► persist reply + sources
```

New modules, all following the existing pure-core convention:

| Module | Runs | Responsibility |
|---|---|---|
| `lib/rag/chunk.ts` | server | Pure. Markdown text to chunks with breadcrumbs. No I/O. |
| `lib/rag/similarity.ts` | server | Pure. Dot product, top-k. |
| `lib/rag/select.ts` | server | Pure. Scored chunks to a token-budgeted passage block. |
| `lib/rag/sources.ts` | server | Prisma reads. Enumerates live sources and their hashes. |
| `lib/llm/transport.ts` | browser | Interface both transports satisfy. |
| `lib/llm/webllm-transport.ts` | browser | web-llm engine, chat and embeddings. |
| `lib/llm/webllm.worker.ts` | browser | Worker host for the engine. |

The three pure modules are where all the tuning will happen, and they test without a browser or a
database. That is the same reasoning that put `context.ts` and `budget.ts` on the server.

## 6. Data model

```prisma
enum ChunkSource {
  SUBJECT
  MILESTONE
  TASK
  SUBTASK
  RESOURCE
}

// One embedded passage of a user's own notes. Rows are derived data: they can
// be deleted wholesale and rebuilt from the source records at any time.
model NoteChunk {
  id String @id @default(uuid())

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String

  // Retrieval filters by subject when the picker has a selection, and the FK
  // cascade cleans up chunks when a subject is deleted.
  subject   Subject @relation(fields: [subjectId], references: [id], onDelete: Cascade)
  subjectId String

  // Polymorphic parent. Not a foreign key: five source tables would need five
  // nullable columns for no gain, since a sweep already reconciles against the
  // live source set on every status check (§7.3).
  source   ChunkSource
  sourceId String
  ordinal  Int

  // "Operating Systems > Memory management > Read Ch. 8". Prepended to the text
  // before embedding, and shown to the user as the citation.
  breadcrumb String
  content    String

  // sha256 of the source record's full text. Re-chunking is skipped when it
  // matches, which is what keeps indexing incremental.
  contentHash String

  // Normalised at write time, so scoring is a dot product rather than a cosine.
  embedding      Float[]
  embeddingModel String
  dims           Int

  createdAt DateTime @default(now())

  // Identifies a row within its source. Re-indexing deletes every row for a
  // source and reinserts, rather than upserting per ordinal: edited text often
  // chunks into fewer pieces than before, and upserting would leave the surplus
  // high-ordinal rows behind as stale passages that still score and still get
  // retrieved.
  @@unique([source, sourceId, ordinal])
  @@index([userId, subjectId])
  // A model change invalidates every vector; this finds them.
  @@index([userId, embeddingModel])
}
```

Back-relation `noteChunks NoteChunk[]` on `User` and on `Subject`.

`ChatMessage` gains one field, so history shows what an old answer cited:

```prisma
  // Breadcrumbs of the passages retrieved for this reply. Empty on user turns
  // and on digest-mode replies.
  sources String[]
```

No settings model. Connection and model choice stay in `localStorage` for the reasons §5 of the
previous design gives, and `LlmSettings` gains the fields in §10.

## 7. Indexing

### 7.1 Chunking

`lib/rag/chunk.ts` takes a source record's markdown and returns ordered chunks.

- Target 1,200 characters, about 300 tokens.
- Hard maximum 1,600 characters, about 400 tokens, which stays under arctic-embed's 512-token limit
  with room for the breadcrumb prefix and tokenizer variance.
- Overlap 150 characters, so a passage split mid-argument is still retrievable from either half.
- Split on markdown structure first: headings, then blank-line paragraphs, then sentences, then a
  hard cut. A heading always starts a new chunk.
- Discard chunks under 40 characters. A stray bullet retrieves noise.
- Deterministic. The same input always produces the same chunks, which is what makes the content
  hash meaningful and the tests possible.

Sources and their text: `Subject.description`, `Milestone.notes`, `Task.description`,
`Subtask.notes`, `Resource.note`. Titles are not chunked. They live in the skeleton, which is
always present, so embedding them would spend vectors on text the model already has.

### 7.2 Embedding

The text sent to the embedder is the breadcrumb, two newlines, then the content. Breadcrumbs carry
the subject and milestone names, which is what lets a question phrased in terms of a subject match
a passage that never names it.

**Arctic-embed is asymmetric, and this is easy to get wrong.** Passages are embedded with no
prefix. Queries are embedded with this prefix, exactly:

```
Represent this sentence for searching relevant passages:
```

Skipping the query prefix does not error. It quietly costs recall, which is the worst kind of bug
to have in a retrieval system. It is worth a test that asserts the query path applies it.

Batches of 4, matching the `b4` model library. Vectors are normalised before they leave the browser.

### 7.3 Freshness

The server can determine what needs work without a model. It reads every live source, hashes the
text, and compares against the stored `contentHash` values.

- Hash present and matching: indexed.
- Hash missing or different: stale, needs re-embedding.
- Stored chunk whose `sourceId` is not in the live set: orphaned, delete it.
- Stored chunk whose `embeddingModel` differs from the current one: stale, the vector space changed.

This runs on every status check. It is O(corpus) and reads a few hundred rows, which is acceptable
at this size and should be revisited alongside §4.2.

Indexing is lazy. Opening the chat panel triggers a status check, and any stale work runs in the
background with a visible count. There is no cron, no queue and no server-side job, because there
is no server-side model to run one with.

## 8. Retrieval and prompt assembly

### 8.1 Selection

`lib/rag/select.ts` is pure: scored chunks in, a passage block and a manifest out.

- Score by dot product against the query vector.
- Discard anything below 0.25. When a question has nothing to do with the notes, injecting the
  twelve least-irrelevant passages is worse than injecting none.
- At most 3 chunks per source record, so one long note cannot crowd out every other subject.
- At most 12 chunks total.
- Fill until the passage budget is spent.
- Filter to `contextSubjectIds` when the picker has a selection. Empty selection searches everything,
  which is the point: retrieval is what makes "search all my subjects" affordable.

Selected chunks are then ordered by subject, source and ordinal for presentation, not by score. The
model reads a coherent document; the scores only decided membership.

### 8.2 Prompt shape

```markdown
# Study context

## Plan outline
### Operating Systems
- Memory management — 3/7 done
  - [ ] Solve past-year questions
  - [ ] Revise virtual memory
### Compiler Design
...

## Relevant notes

### Operating Systems > Memory management
<passage>

### Operating Systems > Read Ch. 8 (Silberschatz)
<passage>
```

The skeleton is `lib/chat/context.ts` in a new outline mode: existing structure, notes omitted.
Headings inside user notes are still demoted to at least `####`, for the reason the previous design
gives. That bug does not go away because the text arrived by a different route.

Budget split when retrieval is active: the skeleton may take up to 40% of the context budget, and
passages take the rest. If the skeleton alone exceeds its share, the existing trim tiers collapse
completed tasks and drop distant subjects until it fits. Titles are still never dropped.

### 8.3 System prompt

`lib/chat/prompt.ts` gains a retrieval variant. It must say that the notes section is a selection
rather than everything the user has written, and that the model should say so when the passages do
not cover the question instead of filling the gap. A model told "here are the user's notes" when it
has eight passages will answer as though it read all of them.

## 9. Transports

`lib/llm/transport.ts` defines what both satisfy:

```ts
export type ChatTransport = {
  streamChat(messages: PromptMessage[], opts: StreamOpts): AsyncIterable<string>;
  listModels(): Promise<string[]>;
};
```

The existing OpenAI-compatible client in `lib/llm/client.ts` moves behind this unchanged, including
its `LlmError` taxonomy.

### WebLLM transport

`CreateWebWorkerMLCEngine` with a module worker, so a 2 GB download and GPU inference never block
the UI thread. Both models load into one engine. The chat API is `engine.chat.completions.create`
with `stream: true` and the embedding API is `engine.embeddings.create({ input, model })`, both
OpenAI-shaped, so the streaming consumer and the message plumbing barely change.

Model list comes from `prebuiltAppConfig.model_list`, filtered to `model_type !== embedding`. The
settings sheet shows a curated shortlist by default with a "show all 163" escape hatch:

| Model | Download | Note |
|---|---|---|
| `gemma3-1b-it` | 711 MB | Floor. Weak machines and slow connections. |
| `Llama-3.2-1B-Instruct` | 879 MB | Floor, better instruction-following. |
| `Qwen3-1.7B` | 2,037 MB | Default. Best quality per MB, and it emits `<think>`, which `lib/chat/reasoning.ts` already parses. |
| `Llama-3.2-3B-Instruct` | 2,264 MB | Strongest grounded question-answering in the tier. |
| `Phi-4-mini-instruct` | 3,438 MB | Tuned for source-grounded answering. |
| `Qwen3.5-4B` | 3,868 MB | Best synthesis that still fits a 6 GB GPU. |
| `Llama-3.1-8B-Instruct` | 5,001 MB | Ceiling. Needs 8 GB VRAM. |

`initProgressCallback` drives a real progress bar. A multi-gigabyte download with a spinner is
indistinguishable from a hang. Weights land in the browser Cache API, so the second visit is
instant, and settings offers a button to evict them.

`contextTokens` is clamped to 2,500 when the provider is WebLLM. The stored default of 8,000 would
silently overflow a 4,096-token window.

### Degraded states

| Condition | Behaviour |
|---|---|
| No `navigator.gpu` | WebLLM offered but disabled with a reason. Indexing cannot run. Chat falls back to the existing digest path with its trim tiers, and the panel says the corpus is being truncated rather than searched. |
| WebGPU present, index empty or stale | Chat works in digest mode. The panel shows indexing progress and switches to retrieval when it completes. |
| Query embedding unavailable at send time | `prepare` receives no vector, returns digest mode with `degraded: true`, and the budget line says so. |
| Embedding model changed | Every vector is stale by §7.3. The panel offers a rebuild rather than mixing vector spaces, which would return confident nonsense. |

This is the price of §4.1, stated plainly: a Safari user with no WebGPU gets today's behaviour, not
the new behaviour.

## 10. Settings

```ts
type LlmSettings = {
  provider: "openai" | "webllm";  // existing behaviour is "openai"
  baseUrl: string;
  model: string;
  apiKey: string;
  webllmModel: string;            // default "Qwen3-1.7B-q4f16_1-MLC"
  contextTokens: number;          // clamped to 2500 when provider is "webllm"
  temperature: number;
  ragEnabled: boolean;            // default true
};
```

`loadSettings` already spreads over defaults, so a stored blob from the previous shape loads and
picks up `provider: "openai"`. Existing users see no change until they opt in.

## 11. API surface

Following the existing convention: `app/api/<entity>/route.ts`, `getUserId(request)` on every
handler, every query scoped by `userId`.

```
GET    /api/rag/status              → { total, indexed, stale, orphaned, model, dims }
GET    /api/rag/pending?limit=20    → [{ source, sourceId, subjectId, ordinal, breadcrumb, content, contentHash }]
POST   /api/rag/chunks              → { model, dims, chunks: [{ ...meta, embedding }] } → { written }
DELETE /api/rag/chunks              → drops every chunk for the user, for a rebuild
```

`prepare` gains two optional inputs and reports what it did:

```ts
// POST /api/chat/conversations/[id]/prepare
type PrepareRequest = {
  content: string;
  contextTokens: number;
  queryEmbedding?: number[];   // omitted when the embedder is not ready
  ragEnabled?: boolean;
};

type PrepareResponse = {
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  budget: {
    estimatedTokens: number;
    ceiling: number;
    truncated: string[];
    subjectCount: number;
    mode: "digest" | "retrieval";
    degraded?: boolean;          // retrieval was wanted but unavailable
    sources: { breadcrumb: string; score: number }[];
  };
};
```

The browser always sends a query vector when it has one. The server ignores it in digest mode
rather than making the client ask twice which mode applies.

`POST /api/rag/chunks` writes each source's rows in a transaction that deletes the existing rows
for that `(source, sourceId)` first, for the reason given in §6.

It also rejects a batch whose `contentHash` no longer matches the live source record. Indexing a
corpus takes seconds, and a user editing a note during that window would otherwise have a vector
written for text that no longer exists, with a hash claiming it is current. The source would then
read as indexed and never be corrected. Rejecting the batch leaves it stale, and the next status
check picks it up.

Beyond that, the handler validates that `dims` matches every vector's length and that the batch size
is bounded. The submitted `content` is trusted only within the user's own account: the worst a
tampered client achieves is poisoning its own retrieval, and every row is scoped by `userId`.

## 12. UI

Changes are confined to `app/components/chat/`, reusing the existing `.lk-card`, `.lk-mono`,
`.lk-sec`, `.lk-btn` and `.lk-prose` classes.

`settings-sheet.tsx` gains a provider toggle between "Local server" and "In browser". Choosing
in-browser reveals the model shortlist with size badges, a download progress bar, and a button to
clear cached weights. Below it sits one status line, "63 of 63 notes indexed", with a rebuild
button and an inline explanation when WebGPU is missing.

`chat-panel.tsx` extends the existing budget line. Digest mode keeps `ctx 3.2k/8k · 1 subject`.
Retrieval mode reads `ctx 2.1k/2.5k · 8 passages from 3 subjects`. The warning that lists
`truncated[]` stays, because truncation still happens to the skeleton.

`message-list.tsx` renders a collapsed "sources" row under each assistant reply, listing breadcrumbs
from `ChatMessage.sources`, each linking to its subject. This is the feature's honesty mechanism: it
is how a user notices the model answered from the wrong passage.

A new `index-status.tsx` shows background indexing progress as an unobtrusive header row, and
`useChat.ts` gains the indexing loop and the query-embedding call.

## 13. Testing

Vitest is already configured and the two existing pure modules have 46 tests. The same approach
extends to the new ones. No component or end-to-end tests; the repo has no browser harness.

`lib/rag/chunk.test.ts`
- Splits on headings, then paragraphs, then sentences, then hard cuts.
- Never emits a chunk over the hard maximum, including for text with no whitespace.
- Overlap is present and does not duplicate whole chunks.
- Chunks under 40 characters are dropped.
- Breadcrumbs carry subject, milestone and task names for each source type.
- Identical input produces identical output, including ordinals.
- Empty, whitespace-only and single-word inputs produce no chunks and do not throw.

`lib/rag/similarity.test.ts`
- Dot product matches a hand-computed value for normalised vectors.
- Top-k returns k items in descending score with a stable tie order.
- Mismatched dimensions are rejected rather than scored.
- Empty corpus returns empty.

`lib/rag/select.test.ts`
- The 0.25 floor excludes weak matches.
- The 3-per-source cap holds when one note dominates the scores.
- The 12-chunk cap holds.
- Selection stops at the passage budget, and the manifest names what was selected.
- Output is ordered by subject, source and ordinal, not by score.
- Subject filtering excludes chunks outside `contextSubjectIds`.

`lib/chat/context.test.ts`
- Outline mode omits note bodies and keeps structure and progress counts.
- Heading demotion still applies to passages injected in retrieval mode.

Two tests worth calling out because they guard silent failures rather than crashes: the query prefix
must be applied on the query path and absent on the passage path, and mode selection must fall back
to digest when no query vector arrives.

## 14. Build sequence

Each phase leaves the app working. Phases 1 through 4 add retrieval to the existing Ollama
transport, which is independently useful. Phase 5 onward adds WebLLM.

1. Schema: `NoteChunk`, `ChunkSource`, `ChatMessage.sources`, back-relations. `prisma db push` and
   `prisma generate`. Confirm `DIRECT_URL` still points at the session pooler on `:5432`, per §12 of
   the previous design, or `db push` will hang rather than fail.
2. `lib/rag/chunk.ts` with tests.
3. `lib/rag/similarity.ts` and `lib/rag/select.ts` with tests.
4. `lib/rag/sources.ts`, the four `/api/rag` routes, and outline mode in `lib/chat/context.ts`.
5. `lib/llm/transport.ts`; move the existing client behind it with no behaviour change. Verify the
   Ollama path still works before continuing.
6. `lib/llm/webllm.worker.ts` and `lib/llm/webllm-transport.ts`: chat streaming, model list,
   download progress, embeddings with the query prefix.
7. Settings shape, clamping, and the provider toggle in `settings-sheet.tsx`.
8. Indexing loop in `useChat.ts` plus `index-status.tsx`.
9. `prepare` changes: mode selection, retrieval assembly, the sources manifest.
10. Budget line, sources row, and persisting `sources` on assistant turns.
11. Manual verification (§15), then README and a note in this document's status.

## 15. Verification plan

**Confirmed during implementation**, against a real (embedded) Postgres instance and a headless
Chrome driving the actual Next.js dev server — not mocks:

- All 88 Vitest cases across `lib/chat/{context,budget,retrieve,reasoning}`, `lib/rag/{chunk,
  similarity,select}` and `lib/llm/embed-input` pass, including the two silent-failure guards called
  out below.
- `npx tsc --noEmit` and `next build` are clean with the new schema, routes, worker and transport
  files in place.
- `GET /api/rag/status` correctly reports `stale` sources against a live subject read from Postgres,
  and a sub-40-character description is correctly excluded from `pending` (the noise floor from
  §7.1 verified against a real row, not just a unit test).
- `POST /api/chat/conversations/[id]/prepare` was driven directly three ways against real data: a
  digest that fits (mode `digest`, `truncated: []`), a digest that overflows with no query vector
  (mode `digest`, `degraded: true`), and the same overflow with a query vector present (mode
  `retrieval`, system prompt contains `## Plan outline`). Mode selection matches §4.4 exactly.
- `POST /api/chat/conversations/[id]/messages` persists `sources` and a re-read of the conversation
  returns them unchanged — the message-list "sources" toggle renders the breadcrumbs correctly in a
  real browser session with no console errors.
- The settings sheet's provider toggle switches between "Local server" and "In browser" cleanly; the
  in-browser panel lists the curated model shortlist (sizes and notes shown) with no render errors.
- The `lib/llm/webllm-transport.ts` dynamic import and the `webllm.worker.ts` `new Worker(new
  URL(...))` pattern load without a bundler or runtime error under both `next build` (webpack) and
  `next dev --turbopack`, confirmed via `@mlc-ai/web-llm` code appearing in a lazily-loaded chunk
  (not the main bundle) and zero `pageerror`/console errors when the "In browser" panel mounts.
- A foreign `userId` retrieves nothing: every `lib/rag/sources.ts` read and every `/api/rag/*` route
  filters by the authenticated `userId`, mirroring the existing `subjects.ts` convention — same
  pattern already relied on elsewhere in the codebase, not re-derived per route.

**Not verified — needs a real WebGPU machine**, which this environment (headless Chrome, no GPU
passthrough) cannot provide:

- Chunking the real corpus and confirming the count lands near 60–80.
- An actual model + embedder download, progress reporting, and cache reuse on reload.
- Incremental re-indexing after editing one note.
- End-to-end retrieval quality: a question whose answer sits in a subtask note, a planning question
  answered from the outline alone, and an unrelated question correctly yielding zero passages under
  the 0.25 floor.
- `contextTokens` clamping to 2,500 actually preventing a real WebLLM context overflow.

## 16. Risks

**First load is heavy.** Qwen3-1.7B plus arctic-embed-s is about 2.3 GB on a first visit. Cached
afterward, but painful on a slow connection. Mitigated only by honest progress reporting and by
offering 711 MB and 879 MB options.

**Small models reason weakly.** Retrieval fixes what the model sees, not how well it thinks. A 1.7B
model given the right passage can still draw the wrong conclusion from it. The sources row exists
so the user can tell those two failures apart.

**No WebGPU means no index.** ~~Accepted in §4.1.~~ Resolved 2026-09-02 by the CPU embedding
backend; see the amendment in §4.1. The original reasoning follows.

Roughly the cost of one dependency against Safari
and older-mobile coverage.

**Retrieval can be confidently wrong.** A question whose answer spans six notes gets three of them
and an answer that reads complete. The 0.25 floor, the per-source cap and the visible sources list
reduce this. They do not eliminate it.
