"use client";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, type PanInfo } from "framer-motion";
import { SecHead } from "@/components/motion/Type";
import { EASE, pad, testimonials } from "@/lib/data";

/* 06 — Kind words: one large quote at a time, a name index to jump between them, auto-advance that pauses on hover/focus */
const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");
const AUTO_S = 9;

export default function Testimonials() {
  const reduce = useReducedMotion();
  const n = testimonials.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { margin: "0px 0px -20% 0px" }); // the timer only runs while the section is on screen
  const [manual, setManual] = useState(false); // once the visitor takes control, stop auto-advancing
  const go = useCallback((to: number, user = true) => { setI(((to % n) + n) % n); if (user) setManual(true); }, [n]);
  const t = testimonials[i];
  const words = t.quote.split(" ");
  const auto = !reduce && !manual;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -450) go(i + 1);
    else if (info.offset.x > 70 || info.velocity.x > 450) go(i - 1);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
  };

  return (
    <section id="words" className="sec dark tm-sec" aria-labelledby="tm-h">
      <SecHead n="12" title="Kind words" kicker="What clients say about working together." count={n} />
      <div ref={box} className="tm" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <span className="tm-mark" aria-hidden>“</span>

        <ul className="tm-names" role="tablist" aria-label="Choose a testimonial" aria-orientation="vertical">
          {testimonials.map((x, k) => (
            <li key={x.name} role="presentation">
              <button role="tab" id={`tm-t${k}`} aria-selected={k === i} aria-controls="tm-panel" tabIndex={k === i ? 0 : -1} onClick={() => go(k)}
                onKeyDown={(e) => { if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); go(k + 1); document.getElementById(`tm-t${(k + 1) % n}`)?.focus(); } if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); go(k - 1); document.getElementById(`tm-t${(k - 1 + n) % n}`)?.focus(); } }}>
                {k === i && <motion.span layoutId="tm-fill" className="tm-fill" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 36 }} />}
                <span className="tm-no">{pad(k + 1)}</span>
                <span className="tm-nm">{x.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="tm-main" id="tm-panel" role="tabpanel" aria-labelledby={`tm-t${i}`} tabIndex={0} onKeyDown={onKey}>
          <motion.div className="tm-drag" drag={n > 1 ? "x" : false} dragSnapToOrigin dragElastic={0.35} dragConstraints={{ left: 0, right: 0 }} onDragEnd={onDragEnd}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure key={i} className="tm-fig" exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.25 }}>
                <blockquote className="tm-q" aria-label={t.quote}>
                  <p aria-hidden>
                    {words.map((w, k) => (
                      <span className="tm-mask" key={k}>
                        <motion.span className="tm-w" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: Math.min(k, 40) * 0.018, ease: EASE }}>{w}</motion.span>
                      </span>
                    ))}
                  </p>
                </blockquote>
                <motion.figcaption className="tm-by" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease: EASE }}>
                  <span className="tm-av" aria-hidden>{initials(t.name)}</span>
                  <span><b>{t.name}</b><small>Client</small></span>
                </motion.figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>

          <div className="tm-ctrl">
            <span className="tm-bar" aria-hidden>
              <i key={`${i}-${auto}`} className={auto ? "run" : ""} data-paused={paused || !inView} onAnimationEnd={() => auto && go(i + 1, false)} style={{ animationDuration: `${AUTO_S}s` }} />
            </span>
            <span className="tm-cnt">{pad(i + 1)}<small> / {pad(n)}</small></span>
            <span className="tm-arrows">
              <button onClick={() => go(i - 1)} aria-label="Previous testimonial">←</button>
              <button onClick={() => go(i + 1)} aria-label="Next testimonial">→</button>
            </span>
          </div>
        </div>
      </div>
      <h2 id="tm-h" className="sr">Client testimonials</h2>
    </section>
  );
}
