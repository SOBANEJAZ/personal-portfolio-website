<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (runs lint + typecheck implicitly)
- `npm run lint` — ESLint

## Architecture

- **App Router** — all pages in `src/app/`, each route is a folder with `page.tsx`
- **Components** — `src/components/ui/` holds neobrutalism-styled shadcn/ui components; `src/components/` has layout pieces (navbar, footer, icons)
- **Styling** — neobrutalism theme in `src/app/globals.css` using Tailwind v4 `@theme inline` with CSS variables; do not mix in default shadcn theme tokens
- **Icons** — GitHub and LinkedIn use custom SVGs in `src/components/icons.tsx` (lucide-react does not include brand icons)

## Key Conventions

- All buttons and cards use the neobrutalism push-down hover effect (`hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none`)
- Badges pop up on hover (`hover:-translate-y-1 hover:shadow-lg`) — the inverse of cards/buttons
- Private data lives in `information/` which is gitignored — never commit it
- Resume PDF goes in `public/Soban_Ejaz_Resume.pdf`

## Quirks

- `@tailwindcss/typography` is installed as a dependency (not devDependency) — required by the `@plugin` directive in globals.css
- Brand icons (GitHub, LinkedIn) are custom SVG components, not from lucide-react
