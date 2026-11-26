"use client";
/**
 * Experience as pinned notes: tilted pastel cards, a pin on each, numbered, joined by a dotted zig-zag line.
 * Used on Home and on the About page (id="experience" is what the About menu and /about#experience point at).
 * Classes start with xn- and live in styles/experience-notes.css. Roles come from data/site.json → experience.
 */
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, pad, site } from "@/lib/data";

/* peach, blue, purple, then around again. Tilt alternates so the cards look hand-placed. */
const TONES = ["peach", "blue", "purple"] as const;
const TILT = [-2.2, 2, -1.6, 2.4, -2, 1.7];
const PIN_X = [38, 62, 30, 56, 44, 66]; // % across the card

export default function ExperienceNotes({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const roles = site.experience;
  return (
    <section id="experience" className={`xn ${className}`} aria-labelledby="xn-h">
      <div className="xn-wrap">
        <header className="xn-head">
          <p className="xn-label"><i aria-hidden />Experience</p>
          <h2 id="xn-h">Where I’ve <b>worked</b></h2>
          <p className="xn-sub">The teams I’ve designed for, and what I did there.</p>
        </header>

        <ol className="xn-list">
          {roles.map((e, i) => {
            const side = i % 2 ? "r" : "l";
            const last = i === roles.length - 1;
            const present = e.note === "Present";
            const Item = reduce ? "li" : motion.li;
            const anim = reduce ? {} : {
              initial: { opacity: 0, y: 46 }, whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "0px 0px -10% 0px" }, transition: { duration: 0.8, ease: EASE },
            };
            return (
              <Item key={e.org} className={`xn-item ${side}`} {...anim}>
                <article className={`xn-card xn-${TONES[i % 3]}`} style={{ "--rot": `${TILT[i % TILT.length]}deg`, "--px": `${PIN_X[i % PIN_X.length]}%` } as React.CSSProperties}>
                  <i className="xn-pin" aria-hidden />
                  <div className="xn-top">
                    <span className="xn-n">{pad(i + 1)}</span>
                    {present && <span className="xn-now"><i aria-hidden />Present</span>}
                  </div>
                  <h3>{e.org}</h3>
                  <p className="xn-role">{e.role}</p>
                  <p className="xn-when">{[e.year, e.type].filter(Boolean).join(" · ")}</p>
                  <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                </article>

                {!last && (
                  <svg className="xn-link" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden focusable="false">
                    <path className="d" d={side === "l" ? "M31 0 C31 70, 69 30, 69 100" : "M69 0 C69 70, 31 30, 31 100"} />
                    <path className="m" d={side === "l" ? "M40 0 C40 70, 60 30, 60 100" : "M60 0 C60 70, 40 30, 40 100"} />
                  </svg>
                )}
              </Item>
            );
          })}
        </ol>

        <p className="xn-more"><Link href="/contact">Want to work together? Say hello <b aria-hidden>↗</b></Link></p>
      </div>
    </section>
  );
}
