# Bittu Rai — Portfolio

Next.js 15 (App Router) + React 19 + Framer Motion. Static pages, deployed on Vercel.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript check
npm run build      # production build
```

## Where to edit what

| What | File |
| --- | --- |
| Name, contact, bio, stats, experience, education, certifications | `data/site.json` |
| Skills lists (Design / Tools / Development) and tool icons | `data/site.json` → `skillGroups`, `tools` |
| Projects (53) | `data/projects.json` |
| Hero text, testimonials, social links, site URL, project tags | `lib/data.ts` |
| SEO title / description / share image | `lib/seo.ts` |
| Pricing plans | `components/sections/Pricing.tsx` |
| All styles | `styles/site.css` (one file, sections are marked `═══ name.css ═══`) |
| Resumes | `public/resume/` |

Tool icons live in `public/img/tools/`. To add a tool: put its icon there, add `{ name, icon }` to `tools`, then list the name in `skillGroups`.
