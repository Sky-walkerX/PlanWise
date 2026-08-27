# LockIn

A personal **study & resource hub** — not an AI generator. You're the brain; LockIn is the shelf + planner. Everything is organized around **Subjects**.

- **Subjects** (e.g. "Operating Systems", "GATE Prep") — each holds a plan and resources.
- **Plan** — an ordered list of **Milestones** (phases) with markdown notes, each holding a checklist of **Tasks**.
- **Resources** — saved URLs only: web links, AI chat links, book/PDF references.
- **Today** — a cross-subject view of tasks due or overdue.
- **Focus** — a timer (Pomodoro / stopwatch) that logs time against a task.
- **Progress** — streaks, completions, focus time and a GitHub-style activity heatmap.
- **Ask** (⌘J) — chat with an LLM running on *your own machine* or entirely *in your browser*, with your subjects, plans and notes as context — retrieved rather than blindly trimmed once a plan outgrows one prompt.

Single user per account. Two interchangeable looks via the theme toggle: **Creative** (light, neobrutalist) and **Focus** (dark, editor-calm).

## Stack

Next.js (App Router) · React 19 · TypeScript · Prisma + PostgreSQL · NextAuth v4 (JWT) · TanStack React Query · shadcn/ui + Tailwind v4 · next-themes.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 (auto-bumps to 3001 if taken)
```

Set the following in `.env` (Prisma CLI) **and** `.env.local` (the app):

```
DATABASE_URL=            # Postgres, runtime. Supabase: transaction pooler (:6543, pgbouncer=true)
DIRECT_URL=              # Postgres, migrations. Supabase: session pooler (:5432, NO pgbouncer params)
AUTH_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=            # e.g. http://localhost:3001
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

`DIRECT_URL` must **not** be a copy of `DATABASE_URL`: pgbouncer in transaction mode can't run DDL, and `prisma db push` hangs forever instead of erroring.

`AUTH_SECRET` is not optional. NextAuth's own routes fall back to an internal secret, so sign-in appears to work without it — but every API route reads the JWT via `getToken` and returns 401, so the app loads and shows no data.

## Commands

```bash
npm run dev      # Next.js + Turbopack
npm run build    # prisma generate && next build
npm run start    # serve the production build
npm run lint     # next lint

npx prisma db push   # sync schema to the database
npx prisma studio    # browse data
```

## Data model

`User ──< Subject ──< Milestone ──< Task ──< TimerSession`, and `Subject ──< Resource`.

The Prisma client is generated into `app/generated/prisma/` (committed) — regenerate with `npx prisma generate` after schema changes; never hand-edit.

## Ask — local LLM chat, in-browser or your own server

Press **⌘J** anywhere to open the chat panel. On a subject page it starts scoped to that subject, so questions are answered against your real milestones, tasks and notes; deselect everything to search everything, or for a plain chat.

The chat panel's settings offer two providers:

- **Local server** — the model runs on your machine and the **browser** talks to it directly; LockIn's server assembles the prompt and stores the transcript, but never sees your endpoint, model, or API key. Any OpenAI-compatible server works: Ollama, LM Studio, llama.cpp, Jan, vLLM. Set the server URL (presets provided) and hit **Test connection** to list models.
- **In browser** — a model runs entirely on your GPU via [WebLLM](https://github.com/mlc-ai/web-llm), no install and no CORS setup. Pick a model from the shortlist (sizes shown) and hit **Download & load**; weights are cached by the browser, so later visits skip the download. Needs a WebGPU-capable browser (recent Chrome or Edge) — Safari and older machines fall back to the local-server path.

Because the local-server path calls your model from the browser, that server has to allow the page's origin:

```bash
OLLAMA_ORIGINS=https://your-lockin-domain.com ollama serve

# macOS app
launchctl setenv OLLAMA_ORIGINS "https://your-lockin-domain.com"   # then restart Ollama
```

Running both on localhost needs no configuration. LM Studio has a CORS toggle in its server tab.

### Retrieval

Once a plan grows past what fits in one prompt, LockIn stops trying to trim it and starts *searching* it. Notes are chunked and embedded in the browser (WebGPU, via WebLLM's fixed embedding model) the first time the panel opens, then re-embedded incrementally as they change — the status row above the composer shows progress and offers a rebuild. A question then gets a full outline of your plan (subjects, milestones, open tasks) plus the handful of note passages that actually score as relevant, instead of a blind cut. This works independently of which chat provider you've picked, including the local-server path — it only needs WebGPU for the embedder. Small plans are unaffected: if everything already fits, the full plan is sent as before. Toggle it off in settings ("Search notes for context") to always fall back to the old trim-and-send behaviour.

Assistant replies that used retrieval show a collapsed **sources** row listing which passages they drew on — useful for telling "the model reasoned badly" apart from "the model never saw the right note."

Assistant replies carry a **save to note** action that appends the answer to any milestone, task or subtask note. Nothing else in your plan is ever written by the model.
