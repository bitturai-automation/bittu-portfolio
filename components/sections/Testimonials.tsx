"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SecHead } from "@/components/motion/Type";
import { EASE, pad, testimonials } from "@/lib/data";

/**
 * Kind words — "hanging cards".
 *  - Every card hangs from a sagging string with a clip and sways gently (CSS, paused for reduced-motion).
 *  - On the way in each card swings down from the string.
 *  - Mouse: hover a card and it flips to show the testimonial on its back. Touch / keyboard: tap or press Enter / Space to flip, Esc or tap again to flip back.
 *  - The front shows a small illustrated avatar. To use a real photo instead, add `photo: "/img/clients/rohan.jpg"` to that testimonial in lib/data.ts.
 */

type Look = { skin: string; hair: string; shirt: string; bg: string; style: "short" | "long" | "bun" | "curly" | "side" };
const LOOKS: Look[] = [
  { skin: "#F1C3A0", hair: "#1F1A17", shirt: "#14213D", bg: "#FFD9C2", style: "short" },
  { skin: "#E9B58F", hair: "#2A1B14", shirt: "#FD6327", bg: "#E4DCFF", style: "long" },
  { skin: "#D9A47C", hair: "#171717", shirt: "#3B5BDB", bg: "#FFE7A8", style: "side" },
  { skin: "#F0BE98", hair: "#3A2418", shirt: "#0F766E", bg: "#CFE8FF", style: "curly" },
  { skin: "#E7B08A", hair: "#2B1A12", shirt: "#B83280", bg: "#FFD1DC", style: "bun" },
  { skin: "#F3CBA8", hair: "#4A2C1A", shirt: "#14213D", bg: "#D3F2DD", style: "long" },
  { skin: "#D6A07A", hair: "#1A1A1A", shirt: "#7C3AED", bg: "#FFE0CC", style: "short" },
];

function Avatar({ i }: { i: number }) {
  const l = LOOKS[i % LOOKS.length];
  return (
    <svg viewBox="0 0 120 120" aria-hidden focusable="false" className="hg-av-svg">
      <rect width="120" height="120" fill={l.bg} />
      {l.style === "long" && <path d="M28 108c-6-30-4-62 10-76 8-8 36-8 44 0 14 14 16 46 10 76z" fill={l.hair} />}
      <path d="M16 124c0-26 20-38 44-38s44 12 44 38z" fill={l.shirt} />
      <path d="M50 78h20v14c0 6-20 6-20 0z" fill={l.skin} />
      <path d="M50 84h20v5c-6 4-14 4-20 0z" fill="#000" opacity=".12" />
      <ellipse cx="36.5" cy="56" rx="4" ry="6" fill={l.skin} />
      <ellipse cx="83.5" cy="56" rx="4" ry="6" fill={l.skin} />
      <ellipse cx="60" cy="52" rx="24" ry="27" fill={l.skin} />
      {l.style === "short" && <path d="M35 50c-3-24 11-34 26-34s30 9 25 34c-4-11-10-16-25-16s-22 5-26 16z" fill={l.hair} />}
      {l.style === "side" && <path d="M35 50c-4-26 12-35 28-34 16 1 27 12 22 34-2-9-6-12-12-14-10 4-26 2-38 14z" fill={l.hair} />}
      {l.style === "long" && <path d="M35 52c-5-26 10-37 26-37s31 11 25 37c-3-12-9-20-25-20s-23 8-26 20z" fill={l.hair} />}
      {l.style === "bun" && (<><circle cx="60" cy="18" r="10" fill={l.hair} /><path d="M35 50c-3-24 11-33 26-33s28 9 25 33c-4-11-10-16-25-16s-22 5-26 16z" fill={l.hair} /></>)}
      {l.style === "curly" && (<g fill={l.hair}>{[[38, 34], [49, 26], [61, 23], [73, 26], [83, 35], [34, 46], [87, 46]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="10" />)}</g>)}
      <circle cx="50" cy="54" r="2.6" fill="#1b1b1b" />
      <circle cx="70" cy="54" r="2.6" fill="#1b1b1b" />
      <circle cx="44" cy="63" r="4.5" fill="#F25F5C" opacity=".28" />
      <circle cx="76" cy="63" r="4.5" fill="#F25F5C" opacity=".28" />
      <path d="M51 65c4 5 14 5 18 0" fill="none" stroke="#1b1b1b" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Only testimonials with a real name and quote exist in `testimonials` (lib/data.ts); with none, the whole section is hidden. */
export default function Testimonials(props: { no?: string } = {}) {
  return testimonials.length ? <TestimonialsInner {...props} /> : null;
}

function TestimonialsInner({ no = "07" }: { no?: string } = {}) {
  const n = testimonials.length;
  return (
    <section id="words" className="sec paper hg-sec" aria-labelledby="tm-h">
      <SecHead n={no} title="Kind words" kicker="What clients say about working together." count={n} />
      <p className="hg-hint" aria-hidden><i /><span className="h">Hover a card to read it</span><span className="t">Tap a card to read it</span></p>
      <ul className="hg-row" data-reveal>
        {testimonials.map((t, k) => <HangingCard key={t.name} t={t} k={k} n={n} />)}
      </ul>
      <h2 id="tm-h" className="sr">Client testimonials</h2>
    </section>
  );
}

function HangingCard({ t, k, n }: { t: (typeof testimonials)[number]; k: number; n: number }) {
  const reduce = useReducedMotion();
  const [flip, setFlip] = useState(false);
  const dir = k % 2 ? -1 : 1;
  const role = [t.role, t.company].filter(Boolean).join(" · ") || "Client";
  const style = { "--dur": `${5.2 + (k % 4) * 0.9}s`, "--del": `${-(k * 0.8)}s`, "--amp": `${1.4 + (k % 3) * 0.5}deg`, "--dir": dir } as React.CSSProperties;

  return (
    <li className="hg-cell" style={style}>
      {/* the sagging string; each cell draws one scallop so the row reads as one garland at any width */}
      <svg className="hg-rope" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden focusable="false">
        <path d="M0 3 Q50 25 100 3" vectorEffect="non-scaling-stroke" />
      </svg>
      <motion.div className="hg-drop" initial={reduce ? false : { rotate: 16 * dir, y: -26, opacity: 0 }} whileInView={{ rotate: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }} transition={{ type: "spring", stiffness: 70, damping: 7.5, mass: 1.1, delay: (k % 4) * 0.12, opacity: { duration: 0.4, delay: (k % 4) * 0.12 } }}>
        <div className="hg-card" data-flip={flip}
          onPointerEnter={(e) => { if (e.pointerType === "mouse") setFlip(true); }}
          onPointerLeave={(e) => { if (e.pointerType === "mouse") setFlip(false); }}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFlip(false); }}
          onKeyDown={(e) => { if (e.key === "Escape") setFlip(false); }}>
          <span className="hg-clip" aria-hidden />
          <div className="hg-inner">
            <div className="hg-face hg-front" aria-hidden>
              <div className="hg-meta"><span>Client</span><span>{pad(k + 1)} / {pad(n)}</span></div>
              <div className="hg-photo">
                {t.photo ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={t.photo} alt="" width={320} height={320} loading="lazy" decoding="async" /> : <Avatar i={k} />}
              </div>
              <div className="hg-id"><b>{t.name}</b><small>{role}</small></div>
              <span className="hg-view"><em>View testimonial</em><i aria-hidden>↻</i></span>
            </div>
            <div className="hg-face hg-back" aria-hidden={!flip} onClick={(e) => { if (!(e.target as HTMLElement).closest("a")) setFlip(false); }}>
              <span className="hg-q" aria-hidden>“</span>
              <blockquote><p>{t.quote}</p></blockquote>
              <div className="hg-by">
                <b>{t.name}</b>
                <small>{role}</small>
                {t.linkedin && <a href={t.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={flip ? 0 : -1} aria-label={`${t.name} on LinkedIn (opens in new tab)`}>LinkedIn ↗</a>}
              </div>
            </div>
          </div>
          {/* one real control per card: it carries the accessible name + the whole quote, and flips on tap / Enter / Space (mouse uses hover) */}
          <button type="button" className="hg-hit" aria-pressed={flip} aria-label={`${t.name}${role !== "Client" ? `, ${role}` : ""}. ${flip ? "Hide" : "Read"} testimonial`}
            onClick={(e) => { if ((e.nativeEvent as PointerEvent).pointerType === "mouse") return; setFlip((v) => !v); }} />
          {!flip && <span className="sr">{t.quote}</span>}
        </div>
      </motion.div>
    </li>
  );
}
