"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE, HERO, projects, type Project } from "@/lib/data";
import { PROJECT_CATS, thumb } from "@/lib/routes";
import { intro } from "@/lib/intro";

const LEAD = HERO.lead.split(" "), REST = HERO.rest.split(" ");
/** How many project tiles are on screen at once; the whole set is swapped for the next 10 every SWAP_MS. */
const BATCH = 10;
const SWAP_MS = 4500; /* slow enough to read and to keep the page smooth */

type Entry = { p: Project; href: string; cat: string };
/** Every project that has a cover image, interleaved UI/UX → Graphic → Web so each batch of 10 is a mix. */
const ALL: Entry[] = (() => {
  const lists = PROJECT_CATS.map((c) => c.items.filter((p) => thumb(p)).map((p) => ({ p, href: c.href, cat: c.short })));
  const out: Entry[] = [];
  for (let i = 0; i < Math.max(...lists.map((l) => l.length)); i++) lists.forEach((l) => l[i] && out.push(l[i]));
  return out;
})();
const BATCHES = Math.max(1, Math.ceil(ALL.length / BATCH));
const pick = (batch: number, slot: number) => ALL[(batch * BATCH + slot) % ALL.length];

function Tile({ slot, batch }: { slot: number; batch: number }) {
  const e = pick(batch, slot);
  if (!e) return null;
  const d = slot * 0.08;
  return (
    <div className="hz-slot" data-s={slot}>
      <Link href={e.href} className="hz-tile" data-cursor="Open" aria-label={`${e.p.title}, ${e.cat}`}>
        <AnimatePresence initial={false} mode="sync">
          <motion.span key={e.p.id} className="hz-swap"
            initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1, transition: { duration: 0.9, delay: d, ease: EASE } }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.55, delay: d, ease: EASE } }}>
            <img src={thumb(e.p, 520)} alt="" draggable={false} decoding="async" loading="eager" />
          </motion.span>
        </AnimatePresence>
      </Link>
    </div>
  );
}

/**
 * First view of Home (light): headline and CTAs in the centre, and around them 10 real project tiles
 * (5 left, 5 right). Every few seconds the whole set of 10 is swapped for the next 10 until all projects have been shown.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const base = reduce ? 0 : intro.played ? 0.15 : 1.65; // no intro wait when coming back to Home from another page
  let w = 0;
  const [batch, setBatch] = useState(0);
  const hover = useRef(false);

  const sec = useRef<HTMLElement>(null);
  const seen = useRef(true);   // hero is on screen
  const focus = useRef(false); // keyboard focus is inside the hero

  useEffect(() => {
    if (reduce || BATCHES < 2) return;
    const preload = (b: number) => { for (let s = 0; s < BATCH; s++) { const e = pick(b, s); if (e) { const im = new Image(); im.src = thumb(e.p, 520); } } };
    // wait a moment so the first screen is not competing with the next batch of 10 images
    const first = window.setTimeout(() => preload(1), 2500);
    // stop swapping while the hero is scrolled out of view (no re-render, no image loading while the visitor reads further down)
    const io = new IntersectionObserver(([e]) => { seen.current = e.isIntersecting; }, { threshold: 0.1 });
    if (sec.current) io.observe(sec.current);
    let cur = 0;
    const id = window.setInterval(() => {
      if (hover.current || focus.current || !seen.current || document.hidden) return;
      cur = (cur + 1) % BATCHES;
      setBatch(cur);
      preload((cur + 1) % BATCHES);
    }, SWAP_MS);
    return () => { clearTimeout(first); clearInterval(id); io.disconnect(); };
  }, [reduce]);

  return (
    <section ref={sec} id="top" className="hz" onFocusCapture={() => { focus.current = true; }} onBlurCapture={() => { focus.current = false; }} onPointerEnter={(e) => { if (e.pointerType === "mouse") hover.current = true; }} onPointerLeave={() => { hover.current = false; }}>
      <div className="hz-stage">
        <motion.div className="hz-center" data-reveal initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: base + 0.1, ease: EASE }}>
          <p className="hz-open">Open to work</p>
          <h1 className="hz-h" aria-label={`${HERO.lead} ${HERO.rest}`}>
            {[{ words: LEAD, dark: true }, { words: REST, dark: false }].map((line, li) => (
              <span className="line" key={li} aria-hidden>
                {line.words.map((word, wi) => (
                  <span className="mask" key={`${li}-${wi}`}>
                    <motion.span data-reveal className={`word${line.dark ? "" : " hz-soft"}`} initial={{ y: "112%", rotate: 3 }} animate={{ y: 0, rotate: 0 }}
                      transition={{ duration: 1.0, delay: base + 0.05 * w++, ease: EASE }}>{word}</motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hz-sub">{HERO.sub}</p>
          <Link className="hz-btn" href="/projects" data-cursor="Explore"><span>See all {projects.length} projects</span><b aria-hidden>→</b></Link>
        </motion.div>

        {Array.from({ length: BATCH }, (_, s) => (
          <motion.div key={s} className="hz-cell" data-s={s} data-reveal initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: base + 0.2 + s * 0.06, ease: EASE }}>
            <Tile slot={s} batch={batch} />
          </motion.div>
        ))}
      </div>

    </section>
  );
}
