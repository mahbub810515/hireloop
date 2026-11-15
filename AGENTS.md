<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop-client

Next.js 16.4.4 (App Router) + React 19 + Tailwind v4 + shadcn/ui + better-auth/MongoDB. Single package, no monorepo.

## Commands

- `npm run dev` / `build` / `start` — standard Next.js
- `npm run lint` — bare `eslint` (flat config, ESLint 9)
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — prettier on `**/*.{ts,tsx}` only (not css/md/json)
- **No test suite exists.** Do not invent one unless asked.
- Verify changes with `npm run lint && npm run typecheck`.

Known pre-existing lint failures (not yours to fix unless asked): `react-hooks/set-state-in-effect` errors in `components/ui/carousel.tsx:98` and `hooks/use-mobile.ts:14`. Lint exits 1 because of these.

## Layout

- App Router at repo root: `app/` — there is **no `src/`**. Path alias `@/*` maps to `./` (tsconfig `paths`).
- `components/ui/` = shadcn-generated primitives; `components/` root = app-specific; `lib/`, `hooks/` at root.
- `CLAUDE.md` is just `@AGENTS.md` — this file is the single source of agent instructions.

## Stack quirks

- **shadcn style `base-nova` runs on `@base-ui/react`, not Radix.** Don't assume Radix APIs when editing `components/ui/*`. Add components with `npx shadcn@latest add <name>` (config: `components.json`).
- All 61 `components/ui/*` files import `import { cn } from "cn"` (the `cn` npm package). `lib/utils.ts` only re-exports it; both resolve, but match the `"cn"` import in UI files.
- **Tailwind v4**: no `tailwind.config` — styling is CSS-first in `app/globals.css` via `@tailwindcss/postcss`. Prettier's tailwind plugin reads `tailwindStylesheet: app/globals.css`.
- Prettier: no semicolons, double quotes, LF. Existing code is inconsistently semicoloned — running `npm run format` will rewrite files repo-wide; expect large diffs.

## Auth / env

- better-auth server: `lib/auth.ts`; client: `lib/auth-client.ts`; catch-all handler: `app/api/auth/[...all]/route.ts` (export `{ GET, POST }` via `toNextJsHandler`).
- MongoDB is **hardcoded** to `mongodb://localhost:27017`, db `hireloopdb` in `lib/auth.ts`. Local Mongo must be running for auth routes to work.
- `.env` (gitignored) requires `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`. `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` are read in `lib/auth.ts` but not present — Google sign-in fails until added.

## Next.js 16 docs

Bundled docs for this exact version live in `node_modules/next/dist/docs/` (`01-app/`, `02-pages/`, `03-architecture/`). Prefer them over training-data knowledge; see the generated block at the top of this file.
