"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ResumeChooser from "@/components/ui/ResumeChooser";
import SocialIcons from "@/components/ui/SocialIcons";
import { AVAILABILITY, EASE, HERO, pad, projects, site } from "@/lib/data";
import { PROJECT_CATS, thumb } from "@/lib/routes";
import { intro } from "@/lib/intro";

/** The small line under the headline ("Also a …") cycles through these roles; edit them in lib/data.ts (HERO.alsoRoles). */
const TITLES = HERO.alsoRoles;
/** Headline = WHAT I do + the RESULT; words of the first part are accented. */
const LEAD = HERO.lead.split(" "), REST = HERO.rest.split(" ");
const ROTATE_MS = 2400;
const ROLES = ["Product UI/UX Designer", "Graphic & Brand Designer", "Website Design & Development", "AI-Assisted Workflow"];
const SHOW: Record<string, number> = { uiux: 6, web: 6, graphic: 8 }; // tiles per column in the wall

/**
 * First view of Home: who I am on the left, and on the right a live wall of REAL projects in three columns
 * (UI/UX, websites, graphic) that drift slowly. Every tile links to its category; hovering the wall pauses it.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const base = reduce ? 0 : intro.played ? 0.15 : 1.65; // no intro wait when coming back to Home from another page
  let w = 0;
  const [ti, setTi] = useState(0);
  useEffect(() => {
    if (reduce) return;
    let id: number | undefined;
    const start = window.setTimeout(() => { id = window.setInterval(() => setTi((i) => (i + 1) % TITLES.length), ROTATE_MS); }, (base + 2.2) * 1000);
    return () => { clearTimeout(start); if (id) clearInterval(id); };
  }, [reduce, base]);
  const cols = PROJECT_CATS.map((c, i) => ({ c, i, items: c.items.filter((p) => thumb(p)).slice(0, SHOW[c.key]) }));

  return (
    <section id="top" className="hv">
      <div className="ap-aurora" aria-hidden><i /><i /><i /></div>
      <div className="ap-grid" aria-hidden />
      <div className="hv-copy">
        <motion.ul className="hv-roles" aria-label="Roles" data-reveal initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: base + 0.1, duration: 0.8 }}>
          {ROLES.map((r) => <li key={r}>{r}</li>)}
        </motion.ul>
        <motion.p className="hv-open" data-reveal initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: base + 0.2, duration: 0.8 }}><i aria-hidden />{AVAILABILITY}</motion.p>

        <h1 className="hv-h" aria-label={`${HERO.lead} ${HERO.rest}`}>
          {[{ words: LEAD, acc: true }, { words: REST, acc: false }].map((line, li) => (
            <span className="line" key={li} aria-hidden>
              {line.words.map((word, wi) => (
                <span className="mask" key={`${li}-${wi}`}>
                  <motion.span data-reveal className={`word${line.acc ? " hv-acc" : ""}`} initial={{ y: "112%", rotate: 4 }} animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 1.05, delay: base + 0.06 * w++, ease: EASE }}>{word}</motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>
        <motion.p className="hv-also" aria-hidden data-reveal initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: base + 0.7, ease: EASE }}>
          <span>{HERO.also}</span>
          <span className="mask hv-rot">
            <span className="hv-sz">{TITLES.map((t) => <span key={t}>{t}</span>)}</span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={ti} className="hv-rw" initial={{ y: "112%" }} animate={{ y: 0 }} exit={{ y: "-112%" }} transition={{ duration: 0.7, ease: EASE }}>{TITLES[ti]}</motion.span>
            </AnimatePresence>
          </span>
        </motion.p>

        <motion.div className="hv-rest" data-reveal initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: base + 0.5, ease: EASE }}>
          <p className="hv-plain">{HERO.sub}</p>
          <div className="cta-row">
            <Link className="pill solid" href="/projects" data-cursor="Explore"><span>See all {projects.length} projects</span><b aria-hidden>→</b></Link>
            <a className="pill" href={`mailto:${site.person.email}`}><span>Start a project</span><b aria-hidden>↗</b></a>
            <ResumeChooser variant="outline" label="Get my resume" />
          </div>
          <SocialIcons className="hv-soc" label="Find me on Behance, LinkedIn and GitHub" />
          <dl className="hv-stats">
            {site.stats.map((s) => <div key={s.label + s.sub}><dt>{s.label}{s.sub ? ` · ${s.sub}` : ""}</dt><dd>{s.value}{s.suffix}</dd></div>)}
          </dl>
        </motion.div>
      </div>

      <motion.div className="hv-wall" data-reveal initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: base + 0.3, ease: EASE }}>
        {cols.map(({ c, i, items }) => (
          <div className="hv-col" data-k={c.key} style={{ "--d": `${46 + i * 9}s` } as React.CSSProperties} key={c.key}>
            <Link className="hv-label" href={c.href} data-cursor="Open"><span>{c.title}</span><b>{pad(c.items.length)} ↗</b></Link>
            <div className="hv-view">
              <ul className={`hv-track${i === 1 ? " rev" : ""}`}>
                {[0, 1].flatMap((copy) => items.map((p) => (
                  <li key={`${copy}-${p.id}`} aria-hidden={copy ? true : undefined}>
                    <Link href={c.href} className="hv-tile" tabIndex={copy ? -1 : undefined} aria-label={copy ? undefined : `${p.title} — ${c.title}`}>
                      <img src={thumb(p, 520)} alt="" loading={copy ? "lazy" : "eager"} decoding="async" draggable={false} />
                      <span className="hv-cap">{p.title}</span>
                    </Link>
                  </li>
                )))}
              </ul>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
