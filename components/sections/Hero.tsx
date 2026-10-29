"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "@/components/motion/Type";
import HeroReveal from "@/components/sections/HeroReveal";
import { EASE, pad, projects, site } from "@/lib/data";

const LINES = [["Product", "designer"], ["who", "ships"], ["the", "build."]];
const ROLES = ["Product Designer", "UI/UX Designer", "AI-Assisted Designer", "Vibe Coder"];

/**
 * Type-led hero. No imagery on load: previews of real projects are revealed by <HeroReveal/> on pointer movement (desktop)
 * or tap (touch) and removed again after 3s of inactivity.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const base = reduce ? 0 : 1.65;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const headY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  let w = 0;

  return (
    <section id="top" ref={ref} className="hero" data-live="0">
      <div className="hero-bg" aria-hidden>
        <i className="x x1" /><i className="x x2" />
        <span className="hb-v">Bittu Rai — Portfolio — Index {pad(projects.length)}</span>
      </div>
      <HeroReveal host={ref} />

      <div className="hero-top">
        <motion.p className="hint" data-reveal initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: base + 0.1, duration: 0.8 }}>
          <span className="hint-dot" aria-hidden />
          <span className="hint-mouse">Move your cursor to reveal the work</span>
          <span className="hint-touch">Tap anywhere to reveal the work</span>
        </motion.p>
        <motion.ul className="roles" aria-label="Roles" data-reveal initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: base + 0.2, duration: 0.8 }}>
          {ROLES.map((r, i) => <li key={r}><span aria-hidden>{pad(i + 1)}</span>{r}</li>)}
        </motion.ul>
      </div>

      <motion.h1 className="hero-h" style={{ y: headY }} aria-label="Product designer who ships the build.">
        {LINES.map((line, li) => (
          <span className="line" key={li} aria-hidden>
            {line.map((word) => (
              <span className="mask" key={word}>
                <motion.span data-reveal className="word" initial={{ y: "112%", rotate: 4 }} animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 1.05, delay: base + 0.09 * w++, ease: EASE }}>{word}</motion.span>
              </span>
            ))}
          </span>
        ))}
      </motion.h1>

      <motion.div className="hero-low" data-reveal initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: base + 0.55, ease: EASE }}>
        <div className="hero-copy">
          <p className="hero-plain">I design apps, websites and brand visuals — then build them into live, working sites.</p>
          <p className="hero-sub">{site.bio.positioning}</p>
          <div className="cta-row">
            <a className="pill solid" href="#work" data-cursor="Explore"><span>See selected work</span><b aria-hidden>↓</b></a>
            <a className="pill" href={`mailto:${site.person.email}`}><span>Start a conversation</span><b aria-hidden>↗</b></a>
          </div>
        </div>
        <dl className="hero-stats">{site.stats.map((s, i) => <div key={s.label + s.sub} className={i === 0 ? "hl" : undefined}><dt>{s.label}{s.sub ? ` ${s.sub}` : ""}</dt><dd>{s.value}{s.suffix}</dd></div>)}</dl>
      </motion.div>
      <Magnetic strength={0.35}>
        <a href="#work" className="badge" aria-label="Scroll to selected work" data-cursor="Scroll">
          <motion.svg viewBox="0 0 120 120" style={{ rotate: rot }} aria-hidden>
            <defs><path id="c" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
            <text><textPath href="#c" textLength="284" lengthAdjust="spacing">SCROLL · SELECTED WORK · SCROLL · SELECTED WORK ·</textPath></text>
          </motion.svg>
          <b>↓</b>
        </a>
      </Magnetic>
    </section>
  );
}
