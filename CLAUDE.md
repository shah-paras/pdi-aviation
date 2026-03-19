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

## Frontend Aesthetics

<frontend_aesthetics>
When building or modifying UI in this project, avoid generic "AI slop" aesthetics. Create distinctive, premium frontends that evoke the precision and luxury of private aviation.

### Typography
Use the established font pairing: Inter for UI/technical data, Lora for editorial emphasis and hero text. Aviation UIs demand clear hierarchy — specs and data tables need tight, readable Inter; marketing sections need Lora at display sizes with generous letter-spacing. Vary font weights aggressively to separate data from narrative.

### Color & Theme
This is a dark-first application. The primary palette is deep slate backgrounds (`222 47% 5%`) with sky blue accents (`199 89% 48%`). Commit to this cockpit-instrument aesthetic — dominant dark surfaces with sharp, luminous blue accents. Draw from aviation instrument panels, HUD displays, and luxury jet interior lighting for inspiration. Gradients should flow sky-400 → blue-500/600, never purple or generic SaaS palettes. Use `hsl(var(--token))` CSS variables for all colors.

### Motion
Framer Motion is the primary animation tool — use it confidently. Focus on high-impact orchestrated moments: staggered reveals on page load (`staggerChildren: 0.1`), `AnimatePresence` for route transitions, `whileInView` for scroll-triggered reveals. Canvas-based particle effects (FloatingParticles) add atmospheric depth. Always gate animations behind `useReducedMotion` for accessibility. Timing: 0.2s for interactions, 0.3-0.5s for reveals, 5s for ambient shimmer loops.

### Backgrounds & Depth
Create atmosphere with layered glass effects (`backdrop-blur-xl` + `bg-white/5`), radial gradient spotlights that follow cursor (SpotlightCard pattern), and Canvas particle systems. Dark themes demand depth — use subtle `white/5` to `white/10` surface layers, not flat black. Gradient meshes and radial glows at strategic focal points. The sky blue accent should bleed into backgrounds as soft radial gradients, never hard edges.

### Avoid
- Light/white backgrounds in main content areas (dark-first is the brand)
- Clichéd color schemes (purple gradients, teal-to-green, generic SaaS blue)
- Flat, depthless dark surfaces without glass or gradient layers
- Predictable card grids without visual rhythm or spotlight emphasis
- Cookie-cutter layouts that could belong to any industry
- Overusing motion — one well-orchestrated staggered reveal beats ten scattered animations
- Ignoring reduced motion — every Framer Motion animation must have a `useReducedMotion` gate
</frontend_aesthetics>
