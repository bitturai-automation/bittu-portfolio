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
- `data/withheld-testimonials.json` — testimonials withheld in your source; NOT imported by the site.
- `public/` — resumes, brand logos, tool icons, videos, favicons, OG image.

## Motion system (v3)
Framer Motion only (no GSAP/Lenis). Reusable pieces in `components/Type.tsx`: `Split` (masked word rise), `ScrollWords` (scroll-lit statement), `Marquee` (scroll-driven strip), `Curtain` (section scales/rounds in), `Magnetic`. Also `Intro.tsx` (1.9s opening), `Cursor.tsx` (desktop mouse only), `Showcase.tsx` (pinned horizontal UI/UX gallery, website index with preview panel). Styles: `app/globals.css` + `app/motion.css` (overrides). Reduced motion is handled by `MotionConfig` plus CSS.

## Structure
`app/` routes, metadata, sitemap, robots, global CSS · `components/` Nav, Hero, Work (three sections + dialog), About, Contact, Reveal, SmartImg · `lib/data.ts` typed data access and shared constants.
