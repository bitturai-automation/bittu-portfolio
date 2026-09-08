# Bittu Rai — Portfolio (Redesign)

> **Animation & responsiveness pass (latest):** added a top scroll-progress
> bar; batched, cascading scroll-reveals via `ScrollTrigger.batch` (falls
> back to the previous IntersectionObserver if GSAP is unavailable); a
> clip-path "wipe" reveal on project thumbnails/grid tiles as they scroll
> into view; two ambient drifting gradient blobs behind the hero type;
> hover-pause on both marquees; magnetic hover extended to the social
> icons; and tap/press feedback (`:active` scale) on buttons, chips,
> filters and grid tiles so touch feels as responsive as a mouse. On the
> responsive side: safe-area padding for notched phones, a mid-size
> (1180px) breakpoint for the nav/hero gap, tighter section padding under
> 768px, full-width stacked CTA buttons and a single-row stat layout under
> 640px, a dedicated sub-430px tile/typography pass, and a landscape-phone
> fix so the hero doesn't overflow short viewports. Everything respects
> `prefers-reduced-motion`. See `css/style.css` (search "Scroll progress",
> "hero-blob", "Reveal helper", "Responsive") and `js/main.js`
> (`initReveals`, `onScroll`, `animateMarquee`) for the implementation.

> **Refinement pass:** the hero no longer uses a portrait photo.
> It's now a typography-first, editorial hero — oversized masked-line type,
> a metadata bar, a hairline-divided facts list in place of the photo, and
> a GSAP text-reveal on load (this also fixed a pre-existing bug where the
> title's mask-reveal transform was never triggered, so the headline was
> invisible). Section padding was trimmed across the site to cut down on
> excess empty space, and the hero now flows into the tools marquee via a
> shared hairline, a subtle scroll-linked parallax fade, and a direct
> "01 — Selected Work" jump link. No content, projects, or copy changed —
> see `css/style.css` (Hero + Marquee blocks) and `js/main.js`
> (`heroIntro`, `renderHeroFacts`, `initHeroParallax`, `initAnchorScroll`)
> for the implementation.

A full redesign of the existing portfolio, rebuilt as a premium editorial
site instead of a card-grid template. All content — projects, experience,
skills, testimonials, FAQs, contact details, resumes — is carried over
from the original `data.js`; nothing was invented or replaced.

## What changed

- **Visual system**: new type-led design language (Bricolage Grotesque for
  display type, Inter for body copy, JetBrains Mono for numbers/labels) on
  a warm studio-paper background with a single marker-orange accent
  (swaps to blue in the "Product" lens).
- **Structure**: same one-page layout, rebuilt section by section as an
  editorial story — oversized hero type, a typographic skills cloud
  instead of progress bars, a numbered services list, and a project
  showcase that switches between a dense image grid (quick social/print
  pieces) and full case-study rows (branding, Behance, live sites)
  depending on what each category actually has to show.
- **Interaction**: Lenis smooth scroll synced to GSAP ScrollTrigger,
  scroll-reveal on every section, a custom cursor with contextual labels
  (VIEW / OPEN / TALK…), magnetic buttons, a fullscreen mobile menu, and
  a case-study modal / photo viewer for project detail.
- **Preserved**: the Graphic ⇄ Product "lens" toggle (now in the nav and
  mobile menu), resume downloads, WhatsApp/email CTAs, all social links,
  and every real stat, testimonial and FAQ from the original site.
- **Accessibility & performance**: semantic sections, visible focus via
  native browser outlines, `prefers-reduced-motion` disables the cursor,
  parallax and marquees, lazy-loaded images, and IntersectionObserver-based
  reveals instead of scroll-jank listeners.

## Running locally

No build step — static HTML/CSS/JS.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Files

```
index.html        Markup
css/style.css      Design system + layout
js/data.js         Your content (unchanged from the original)
js/main.js         Rendering + interaction logic
img/, resume/       Your original images and resumes
```

## Adding a new project

Same as before — open `js/data.js` and add an entry to the relevant
category's `projects` array. Categories with more than 5 simple (image +
caption only) projects render as a grid automatically; everything else
renders as editorial rows.
