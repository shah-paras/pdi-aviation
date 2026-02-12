# PDI Aviation

## Stack
Vite 6 | React 18 | JavaScript (JSConfig) | Tailwind CSS v3 | shadcn/ui (New York) | React Router DOM 6 | React Hook Form + Zod 3 | TanStack React Query 5 | Mapbox GL + react-map-gl | Recharts | Framer Motion | Lucide React

## Commands
`npm run dev` — dev server on :3000 | `npm run build` — production build | `npm run lint` — ESLint | `npm run preview` — preview build

## Key Facts
- Auth removed — app runs fully public, no login
- Data hardcoded in page components — no backend API yet
- Styling: Tailwind v3 + CSS variables (HSL), light/dark mode, shadcn/ui "new-york"
- Maps: Mapbox GL + react-map-gl, geodetic utils in `src/lib/utils/mapUtils.js`
- Aliases: `@/` → `src/` (Vite + JSConfig)
- Env: `VITE_MAPBOX_TOKEN` only (`.env.local`)
- Git: `feat:/fix:/refactor:/chore:/docs:` · branch from `dev`
- Skill tables inherited from global `~/.claude/CLAUDE.md`
