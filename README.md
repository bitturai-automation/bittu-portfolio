# Bittu Rai — Portfolio (v2)

Next.js 15 (App Router) · React 19 · TypeScript · Framer Motion. Static export-friendly, no backend.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Deploy to Vercel
1. Push this folder to a GitHub repo (or run `npx vercel` inside it).
2. Import the repo at vercel.com/new. Framework preset: Next.js. No env vars needed.
3. If you use a custom domain, change `SITE_URL` in `lib/data.ts` (drives canonical, Open Graph, sitemap, robots, JSON-LD).

## Edit content
- `data/projects.json` — all 49 projects (display order = file order). `category`: `uiux` | `web` | `graphic`.
- `data/site.json` — person, links, stats, bio, services, experience (resume-based; the resume has no dates, so rows are numbered), skills, tools, brands, availabilityNote.
- `data/testimonials.json` — client testimonials shown in the Testimonials section.
- `public/` — resume, brand logos, tool icons, videos, OG image.

## Motion system
Framer Motion only (no GSAP/Lenis). Reusable pieces live in `components/motion/Type.tsx`: `Split` (masked word rise), `ScrollWords` (scroll-lit statement), `Marquee` (scroll-driven strip), `Curtain` (section scales/rounds in), `Magnetic`. Also `sections/Intro.tsx` (opening), `motion/Cursor.tsx` (desktop mouse only), `sections/Showcase.tsx` (pinned horizontal UI/UX gallery). Reduced motion is handled by `MotionConfig` plus CSS.

## Project structure
```
app/            routes, layout/metadata, sitemap, robots, icons
components/
  layout/       Nav, Providers, WhatsAppButton
  sections/     Hero, HeroReveal, Intro, Work, Showcase, About, Testimonials, Contact
  motion/       Type, Reveal, Cursor, MotionGuard, useFx
  ui/           SmartImg
data/           projects.json, site.json, testimonials.json
lib/            data.ts (typed data access + shared constants)
public/         img (logo, brands, tools, og-cover), video, resume
styles/         globals.css, motion.css, about.css
```
