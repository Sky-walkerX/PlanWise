---
name: verify
description: Build, run, and drive LockIn locally to verify changes end-to-end (embedded Postgres + headless Chrome).
---

# Verifying LockIn changes

## Build / typecheck
```bash
npx tsc --noEmit
npm run build        # prisma generate + next build
```

## Database
Fresh clones have **no `.env` / `.env.local`** (gitignored) — the app cannot reach
the real Supabase DB. Boot a throwaway Postgres instead (no Docker/psql on this
machine):

```bash
# in a scratch dir:
npm i embedded-postgres
node -e '…'   # see pg.mjs pattern: initialise(), start(), createDatabase("lockin"), port 54321
DATABASE_URL="postgresql://postgres:postgres@localhost:54321/lockin" \
DIRECT_URL="postgresql://postgres:postgres@localhost:54321/lockin" npx prisma db push
```

## Run the app
Pass env inline — do NOT create `.env` files in the repo:

```bash
DATABASE_URL=… DIRECT_URL=… AUTH_SECRET=x NEXTAUTH_SECRET=x \
NEXTAUTH_URL=http://localhost:3001 npx next dev --turbopack -p 3001
```

Create a user via `POST /api/register` (`{email, password≥8}`), then log in.

## Drive the API (curl)
NextAuth credentials login for a cookie jar:
```bash
CSRF=$(curl -s -c jar http://localhost:3001/api/auth/csrf | jq -r .csrfToken)
curl -b jar -c jar -X POST http://localhost:3001/api/auth/callback/credentials \
  --data-urlencode "csrfToken=$CSRF" --data-urlencode "email=…" \
  --data-urlencode "password=…" --data-urlencode "json=true"
```
Then hit `/api/subjects`, `/api/tasks`, etc. with `-b jar`.

## Drive the GUI
No Playwright browsers installed; use `playwright-core` + system Chrome:
```js
const browser = await chromium.launch({ channel: "chrome", headless: true });
```
- Login form: `input[type=email]`, `input[type=password]`, submit → waits for `/`.
- Subject page: navigate directly to `/subjects/<id>` (card click is unreliable in tests).
- Theme toggle: `page.getByRole("button", { name: /creative|focus/i })`.
- CodeMirror notes editor mounts lazily on "Add notes"/"Edit notes" click (`.cm-editor`).
- Simulate slow network via CDP `Network.emulateNetworkConditions` to see
  optimistic UI vs server reconcile.

## Gotchas
- Turbopack dev can serve a **stale root layout per-route** after editing
  `app/layout.tsx` — restart the dev server before trusting font/class probes.
- `page.keyboard.type` of multi-line markdown fights the editor's list
  auto-continue; set notes via `PUT /api/milestones/[id]` when you need
  well-formed content for rendering checks.
- Flows worth driving: add task/subtask/milestone (row must appear instantly),
  milestone ▲▼ reorder, complete a recurring task (next occurrence keeps its
  position), notes edit/preview/save in BOTH themes.
