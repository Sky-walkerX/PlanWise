# Local LLM Chat — Design

**Date:** 2026-08-20
**Status:** Approved (design)
**Repo:** LockIn (Next.js 15 App Router, React 19, TypeScript, Prisma/Postgres, NextAuth v4 JWT, React Query, Tailwind v4)

## 1. Overview

Let a user connect LockIn to an LLM running on their own machine (Ollama, LM Studio, llama.cpp server, or anything else speaking the OpenAI chat API) and ask questions — either plain, or with their own subjects, plans and notes injected as context.

The feature is a **reader**, not a writer. It answers questions about the plan; it never edits the plan on its own. The only path from a reply back into the data is an explicit, user-pressed "save to note".

## 2. Goals & non-goals

**Goals**
- Ask questions grounded in the user's own subjects, milestones, tasks, subtasks, notes and resources.
- Plain, context-free chat in the same surface.
- Works while LockIn is deployed remotely and the model runs on the user's laptop.
- Conversations persist and are browsable.
- One explicit action to file a good answer into a note.

**Non-goals (v1)**
- No embeddings, vector store, or semantic retrieval. Context is an explicit picker.
- No tool calling — the model cannot create or modify milestones, tasks, or subjects.
- No server-side model hosting, no cloud provider keys managed by LockIn.
- No image/vision input, no file attachments.
- No sharing or multi-user chats.

## 3. The hosting constraint (why the design looks like this)

LockIn is deployed remotely. The model runs on `http://localhost:11434` **on the user's machine**. A Vercel server can never reach that address. So:

> **The browser is the only component that can talk to the LLM.**

Everything else follows. The server assembles prompts and stores transcripts; the browser is the transport. The server never learns the base URL, never sees the model name, never handles an API key.

## 4. Architecture & data flow

```
Browser (⌘J panel)                  Next.js server                 User's machine
──────────────────                  ──────────────                 ──────────────
1. user types question
2. POST /prepare ─────────────────► persist user msg
                                    load prior turns
                                    load + shape context
                                    budget → truncate
   ◄──────────────────────────────  { messages[], budget }
3. POST {baseUrl}/chat/completions ─────────────────────────────► Ollama / LM Studio
   stream:true, model from localStorage
   ◄──────────────────────────────────────────────────── SSE token stream
4. render tokens live
5. POST /messages ────────────────► persist assistant msg
                                    auto-title if first turn
```

Three thin layers:

| Module | Runs | Responsibility |
|---|---|---|
| `lib/chat/context.ts` | server | Pure. `SubjectDetail[] → markdown digest`. No I/O, no Prisma. |
| `lib/chat/budget.ts` | server | Pure. Trims digest + history to a token ceiling, reports what it dropped. |
| `lib/llm/client.ts` | browser | Streaming fetch to an OpenAI-compatible endpoint, plus `listModels()`. |

The two pure modules are the reason for this split: context shaping and budgeting are where all the tuning will happen as small context windows bite, and here they test without a browser or a database.

**Failure semantics.** If the stream dies mid-reply, the assistant message is never persisted — the transcript simply ends on a user turn. `prepare` detects a trailing unanswered user message and re-sends it instead of inserting a duplicate, so retry is free and idempotent.

## 5. Data model

Additions to `prisma/schema.prisma`:

```prisma
enum ChatRole {
  USER
  ASSISTANT
}

model Conversation {
  id        String   @id @default(uuid())
  title     String   @default("New chat")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String

  // Where the chat was opened from; drives the panel's default scope.
  subject   Subject? @relation(fields: [subjectId], references: [id], onDelete: SetNull)
  subjectId String?

  // Picker selection. Plain ids rather than a join table: the assembler
  // re-checks ownership on every load anyway, so FK integrity buys nothing.
  contextSubjectIds String[]

  messages  ChatMessage[]

  @@index([userId, updatedAt(sort: Desc)])
}

model ChatMessage {
  id        String   @id @default(uuid())
  role      ChatRole
  content   String
  model     String?  // which local model produced it; null on user turns
  createdAt DateTime @default(now())

  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  conversationId String

  @@index([conversationId, createdAt])
}
```

Plus back-relations `conversations Conversation[]` on `User` and on `Subject`.

**No settings model.** Base URL, model, optional API key and tuning live in `localStorage`. The endpoint is a property of the machine the browser runs on, not of the account — syncing `http://localhost:11434` to a phone would be actively wrong. Bonus: an API key typed into that field never reaches our server.

## 6. API surface

Follows the existing `app/api/<entity>/[id]/route.ts` convention, `PUT` not `PATCH` (matching `lib/fetcher.ts`), auth via `getUserId(request)` on every handler.

```
GET    /api/chat/conversations              list (id, title, subjectId, updatedAt)
POST   /api/chat/conversations              create { subjectId?, contextSubjectIds[] }
GET    /api/chat/conversations/[id]         one, with messages ordered by createdAt
PUT    /api/chat/conversations/[id]         { title?, contextSubjectIds? }
DELETE /api/chat/conversations/[id]         cascades messages
POST   /api/chat/conversations/[id]/prepare { content, contextTokens } → { messages[], budget }
POST   /api/chat/conversations/[id]/messages { content, model } → persisted assistant turn
```

`prepare` takes `contextTokens` from the caller because the ceiling lives in the browser's `localStorage` (§8) while the budgeting runs on the server. It is clamped server-side to a sane range so a bad client value can't ask for an unbounded query. The subject selection is *not* sent per-turn: the picker `PUT`s `contextSubjectIds` onto the conversation when it changes, and `prepare` reads it from the row — one source of truth.

Titles are derived server-side from the first user message (truncated, no LLM call) when the conversation is still at its default title.

`prepare` response:

```ts
type PrepareResponse = {
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  budget: {
    estimatedTokens: number;
    ceiling: number;
    truncated: string[];   // human-readable list of what was dropped
    subjectCount: number;
  };
};
```

Every handler scopes by `userId`. `prepare` re-reads `contextSubjectIds` through a `where: { userId }` filter, so a stale or forged id yields nothing rather than another user's plan.

## 7. Context assembly

### Format

A single markdown digest, not JSON. Small local models follow markdown headings far more reliably than nested JSON, and it costs roughly 40% fewer tokens for identical content — no repeated keys, quotes or braces.

```markdown
# Study context

## Subject: Operating Systems
Processes, memory, filesystems for GATE.

### Milestone: Memory management — 3/7 done
Paging vs segmentation; TLB numericals are the weak spot.

- [x] Read Ch. 8 (Silberschatz) · HIGH · due 2026-08-22
  - [x] paging
  - [ ] segmentation
- [ ] Solve past-year questions · MEDIUM
  note: focus on TLB numericals

### Tasks — no milestone
- [ ] Revise virtual memory

### Resources
- LINK · OSTEP — https://pages.cs.wisc.edu/~remzi/OSTEP/
```

Deterministic ordering throughout (milestone `order`, task `order`), so the same data always produces the same digest — which is what makes it testable and what makes prompt caching possible later.

### System prompt

Fixed, in `lib/chat/prompt.ts`. Establishes: you are a study assistant inside LockIn; the context below is the user's own plan; answer from it where relevant; say plainly when the context doesn't cover something rather than guessing; never invent tasks, deadlines, or progress that aren't in the context.

### Plain chat

Zero subjects selected ⇒ no digest, no context section, system prompt only. Plain chat is the same code path with an empty selection, not a separate mode.

### Budgeting

Token estimate is `chars / 4`. No tokenizer dependency: every runtime uses a different tokenizer, and the estimate only has to be conservative, not exact.

Ceiling is user-configurable, default **8000** tokens for system + context + history, leaving room for the reply.

Trim order — first to go, first listed:

1. Resource notes
2. Subtasks of completed tasks
3. Completed tasks (collapsed to a `— N completed` count line)
4. Milestone notes (truncated per-milestone, marked `…[truncated]`)
5. Task descriptions
6. Whole subjects, furthest-from-home first; the subject the chat was opened from is dropped last

Never dropped: subject titles, milestone titles, incomplete task titles. Whatever gets cut is named in `budget.truncated[]` so the panel can tell the user what the model couldn't see — silent truncation is how grounded answers quietly become wrong ones.

History is budgeted after context: keep the newest user message unconditionally, then add prior turns newest-first while they fit, dropping oldest pairs.

## 8. Transport & connection

### Settings shape

```ts
type LlmSettings = {
  baseUrl: string;        // "http://localhost:11434/v1"
  model: string;          // "llama3.1:8b"
  apiKey?: string;        // optional; sent as Authorization: Bearer
  contextTokens: number;  // default 8000
  temperature: number;    // default 0.3
};
```

Stored in `localStorage` under `lockin.llm`. Presets fill `http://localhost:11434/v1` (Ollama) and `http://localhost:1234/v1` (LM Studio). "Test connection" hits `GET {baseUrl}/models` and populates the model dropdown from the response.

### CORS — the primary footgun

Ollama refuses cross-origin browser requests unless the app's origin is allowed. This will be the single most common setup failure, so the panel detects it and shows the fix inline rather than logging a bare network error:

```bash
# Linux / manual serve
OLLAMA_ORIGINS=https://your-lockin-domain.com ollama serve

# macOS app
launchctl setenv OLLAMA_ORIGINS "https://your-lockin-domain.com"
# then restart Ollama
```

LM Studio: enable CORS in the local-server tab.

### Mixed content — the secondary footgun

An `https://` page fetching `http://localhost` is normally blocked. Browsers exempt loopback addresses as "potentially trustworthy" origins, so Chrome and Firefox permit it — Safari has historically been stricter. **To be verified against real browsers during implementation**, and documented with its outcome. Fallback if a browser blocks it: run LockIn locally, or terminate TLS in front of the model.

### Error taxonomy

| Condition | Message shown |
|---|---|
| `TypeError: Failed to fetch` | Can't reach `{baseUrl}` — is the server running, and does it allow this origin? (+ CORS help) |
| 404 on `/models` | Reachable, but no OpenAI-compatible API there. Try appending `/v1`. |
| 401 / 403 | The endpoint rejected the API key. |
| 400, model not found | Model `{x}` isn't loaded on that server. |
| `AbortError` | Silent — the user pressed stop. |

## 9. UI

New directory `app/components/chat/`:

| File | Role |
|---|---|
| `chat-provider.tsx` | Context + ⌘J hotkey. Mirrors `quick-add.tsx` exactly; registered in `QueryProviders.tsx` inside `SessionProvider`. |
| `chat-panel.tsx` | Slide-over shell: header (model badge, history, settings), message list, composer. |
| `message-list.tsx` | Transcript + live streaming bubble + autoscroll. |
| `message-bubble.tsx` | One turn; assistant content rendered through the existing `<Markdown>`. |
| `context-picker.tsx` | Subject chips; pre-selects from the pathname. |
| `settings-sheet.tsx` | Base URL / model / key / test connection / CORS help. |
| `history-list.tsx` | Conversations: switch, rename, delete. |

Panel docks right — `w-full sm:w-[420px] lg:w-[480px]`, full height, `border-l border-border bg-background`, backdrop below `sm`. Escape closes. Styling reuses the existing `.lk-card` / `.lk-mono` / `.lk-sec` / `.lk-btn` / `.lk-prose` vocabulary; only bubble and composer rules get new `.lk-chat*` classes in `globals.css`.

Scoping uses `usePathname()` — on `/subjects/[id]` the current subject is pre-selected, the same trick `quick-add.tsx` already uses.

Streaming appends chunks to local state; a stop button aborts through `AbortController`. The budget line sits under the composer: `ctx 3.2k/8k · 1 subject` — and turns into a warning listing `truncated[]` when anything was cut.

Hooks land in `hooks/useChat.ts`, one file, matching the per-entity convention of `hooks/useSubjects.ts`.

## 10. Save to note

Each assistant bubble carries a "save to note" action. It opens a small target picker — milestones, tasks and subtasks of the currently scoped subject — and appends to that record's markdown:

```markdown

---
*from chat · 2026-08-20*

<the answer>
```

This reuses the existing `PUT /api/milestones/[id]`, `PUT /api/tasks/[id]` and `PUT /api/subtasks/[id]` endpoints (fields `notes`, `description`, `notes` respectively). **No new endpoint.** On success it invalidates the `["subject", id]` query so the page behind the panel updates live.

## 11. Testing

The repo currently has no test runner. This design's central claim is that context assembly and budgeting are testable in isolation, so implementation adds **Vitest** as a dev dependency and an `npm run test` script — used for the two pure modules only.

`lib/chat/context.test.ts`
- digest shape for a full subject; completed vs incomplete rendering
- empty subject, subject with no milestones, task with no subtasks
- notes, due dates, priorities, resources present and correctly placed
- deterministic ordering

`lib/chat/budget.test.ts`
- each trim tier fires in order as the ceiling tightens
- never-drop invariants hold even at an absurdly small ceiling
- `truncated[]` names everything that was actually cut
- history drops oldest-first and always keeps the newest user message
- home subject survives longer than the others

No component or end-to-end tests — the repo has no browser harness and adding one is out of scope. Manual verification instead:

1. Ollama running locally, LockIn on `npm run dev`, connect and list models.
2. Ask a question on a subject page; confirm the reply cites real milestone/task names.
3. Kill the model mid-stream; confirm the transcript stays coherent and retry works.
4. Deselect all subjects; confirm plain chat answers without leaking context.
5. Save a reply to a milestone note; confirm the page behind updates.
6. Reload; confirm the conversation is still there.
7. Point at a wrong port; confirm the CORS/unreachable help appears rather than a raw error.

## 12. Build sequence

1. Schema: two models, one enum, back-relations, `prisma db push` + `prisma generate`
2. Vitest setup
3. `lib/chat/context.ts` + tests
4. `lib/chat/budget.ts` + tests
5. `lib/chat/prompt.ts`
6. API routes (conversations, prepare, messages)
7. `lib/llm/client.ts` — streaming, `listModels`, error taxonomy
8. `hooks/useChat.ts`
9. Chat provider + panel + message list
10. Context picker, settings sheet, history list
11. Save-to-note
12. Manual verification pass; README + docs note
