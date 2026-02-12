# GoSafe Frontend

## Stack

Next.js 15 (App Router) | React 19 | TypeScript 5 | Tailwind CSS v4 | Zod 4 | Mapbox GL | Leaflet | deck.gl | Recharts | Lucide React | Sonner | react-window | Sentry

## Commands

`npm run dev` | `npm run build` | `npm run lint`

## Project Facts

- **Auth**: AuthProvider + UserProvider + ThemeProvider, all fetch wrappers auto-retry 401
- **Services**: `src/lib/services/` object-method pattern, routes in `src/routes/apiRoutes.ts`
- **Wrappers**: fetchWithAuth (internal) · fetchWithNewGoSafeAuth (GoSafe) · fetchStreamWithGosafeAuth (SSE) · fetchWithMassNotificationSystemAuth (notif) · fetchWithFormData (upload)
- **Styling**: Tailwind v4 `@theme inline`, dark mode, breakpoints sm=1024/md=1285/lg=1920, Mulish
- **Maps**: Mapbox+react-map-gl (dynamic ssr:false), clustering via `mapClustering.ts`
- **SSE**: `fetchStreamWithGosafeAuth` — AI Alerts + Travel Advisory generate/refine
- **Git**: `feat:/fix:/refactor:/chore:/docs:` · `feature/develop/GOS-XXX`

## Rules

1. Match prompt to workflow skill (HOW) then domain skill (WHAT) — read ONLY matched SKILL.md files
2. Max 1 workflow + 1 domain skill per task. Follow deep-dive refs only when quick rules aren't enough
3. Discover new skills: `npx skills find <query>` · install: `npx skills add <pkg> -g -y`

## Workflow Skills — `~/Documents/workspace/paras-skill/.agents/skills/<name>/SKILL.md`

| Prompt keywords                             | Skill                            |
| ------------------------------------------- | -------------------------------- |
| design, architect, new idea, create feature | `brainstorming`                  |
| plan, implement, multi-step, requirements   | `writing-plans`                  |
| execute plan, follow plan                   | `executing-plans`                |
| parallel, multiple tasks, concurrent, batch | `dispatching-parallel-agents`    |
| subagent, fresh context, task-by-task       | `subagent-driven-development`    |
| bug, debug, error, failure, broken          | `systematic-debugging`           |
| test, TDD, bugfix                           | `test-driven-development`        |
| done, complete, fixed, commit, PR           | `verification-before-completion` |
| review feedback, implement suggestions      | `receiving-code-review`          |
| review this, PR review, code quality        | `requesting-code-review`         |
| merge, finish branch, ready to merge        | `finishing-a-development-branch` |
| worktree, parallel branches                 | `using-git-worktrees`            |
| create skill, new skill                     | `writing-skills`                 |
| done, finished, build passed, committed     | `task-notification`              |
| synopsis, summary, what changed, changelog  | `change-documentation`           |

## Domain Skills — `~/Documents/workspace/paras-skill/.agents/skills/<name>/SKILL.md`

| Prompt keywords                                          | Skill                |
| -------------------------------------------------------- | -------------------- |
| component, page, layout, UI, button, card, modal, form   | `generate-component` |
| API, service, fetch, endpoint, route handler, POST/GET   | `api-service`        |
| map, Mapbox, Leaflet, marker, cluster, GeoJSON, flight   | `map-development`    |
| SSE, stream, real-time, AI alert, travel advisory        | `sse-streaming`      |
| performance, bundle, optimize, waterfall, lazy, Suspense | `performance-review` |
| review, PR, refactor, naming, audit, conventions, lint   | `code-review`        |
| state, hook, context, useState, useEffect, custom hook   | `state-management`   |
| Next.js, RSC, hydration, metadata, middleware, error.tsx | `nextjs-patterns`    |
| find skill, search skill, install skill, extend          | `find-skills`        |
