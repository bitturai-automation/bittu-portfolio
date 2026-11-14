"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useMedia } from "@/components/motion/Type";
import { pad, site } from "@/lib/data";

type Exp = (typeof site.experience)[number];
const AUTO_S = 6; // seconds each role stays on screen (only on small screens / reduced motion, where the section is not pinned)
const STEP_VH = 70; // desktop: how much scroll (in vh) each role gets while the section is pinned

/**
 * Home · Experience ("role switcher").
 *  - Left: a vertical list of every role. The active row opens, shows the role title and fills a progress line.
 *  - Right: a dark glass stage with a ghost number, the company in big type and the key points as numbered cards.
 *  - Auto-advance every AUTO_S seconds (only while on screen; pauses on keyboard focus). Click / arrows / arrow keys jump.
 *  - Desktop (≥1001px wide, ≥600px tall): the section PINS to the screen and the mouse wheel drives it. Each role opens one by one as you scroll
 *    (the line under the active row fills with your scroll), and only after the last role does the page move on to the next section.
 *  - Smaller screens: unchanged auto-advance.
 *  - prefers-reduced-motion: no auto-advance, no animation. All panels share one grid cell so the height never jumps.
 */
export default function ExperienceAuto({ items }: { items: Exp[] }) {
  const reduce = useReducedMotion();
  const n = items.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const big = useMedia("(min-width:1001px) and (min-height:600px)");
  const pinned = big && !reduce;
  const inView = useInView(box, { margin: "0px 0px -15% 0px" });
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });

  // pinned: scroll position -> active role (+ fill of the progress line inside the active row)
  const sync = useCallback((v: number) => {
    const x = Math.min(Math.max(v, 0), 0.9999) * n;
    const k = Math.floor(x);
    setI(k);
    box.current?.style.setProperty("--f", String(x - k));
  }, [n]);
  useMotionValueEvent(scrollYProgress, "change", (v) => { if (pinned) sync(v); });
  useEffect(() => { if (pinned) sync(scrollYProgress.get()); }, [pinned, sync, scrollYProgress]);

  const go = useCallback((to: number) => {
    const k = ((to % n) + n) % n;
    const w = wrap.current;
    if (pinned && w) {
      // jump = scroll to that role's slice of the pinned track
      const top = w.getBoundingClientRect().top + window.scrollY;
      const dist = w.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + ((k + 0.5) / n) * dist, behavior: "smooth" });
    } else setI(k);
  }, [n, pinned]);
  const running = !reduce && !pinned && inView && !paused;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(i + 1), AUTO_S * 1000);
    return () => window.clearTimeout(t);
  }, [running, i, go]);

  // on small screens the list scrolls sideways: keep the active row in view (never scrolls the page)
  useEffect(() => {
    const row = list.current, el = row?.children[i] as HTMLElement | undefined;
    if (!row || !el || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: el.offsetLeft - (row.clientWidth - el.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [i, reduce]);

  const onKey = (e: React.KeyboardEvent, k: number) => {
    const to = e.key === "ArrowRight" || e.key === "ArrowDown" ? k + 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? k - 1 : null;
    if (to === null) return;
    e.preventDefault(); go(to);
    document.getElementById(`xr-t${((to % n) + n) % n}`)?.focus();
  };

  return (
    <div ref={wrap} className={pinned ? "xr-pin" : undefined} style={pinned ? { height: `calc(100vh + ${(n - 1) * STEP_VH}vh)` } : undefined}>
    <div className={pinned ? "xr-sticky" : "xr-free"}>
    <div ref={box} className={`xr${pinned ? " pin" : ""}`} onFocus={(e) => { if (e.target.matches(":focus-visible")) setPaused(true); }} onBlur={() => setPaused(false)}>
      <div className="xr-list" role="tablist" aria-label="Work experience" aria-orientation="vertical" ref={list}>
        {items.map((e, k) => (
          <button key={e.org} type="button" role="tab" id={`xr-t${k}`} aria-selected={k === i} aria-controls={`xr-p${k}`} tabIndex={k === i ? 0 : -1}
            className={`xr-row${k === i ? " on" : ""}${k < i ? " seen" : ""}`} onClick={() => go(k)} onKeyDown={(ev) => onKey(ev, k)} data-cursor="View">
            <span className="xr-no" aria-hidden>{pad(k + 1)}</span>
            <span className="xr-org">{e.org}</span>
            <span className="xr-yr">{e.year}</span>
            <span className="xr-role">{e.role}</span>
            <span className="xr-fill" aria-hidden>
              <b key={k === i ? `on-${i}` : "off"} className={k === i && running ? "run" : ""} style={{ animationDuration: `${AUTO_S}s` }} />
            </span>
          </button>
        ))}
      </div>

      <div className="xr-stage" style={{ "--i": i, "--n": n } as React.CSSProperties}>
        <i className="xr-orb" aria-hidden />
        <i className="xr-orb b" aria-hidden />
        <div className="xr-ctrl">
          <span aria-live="polite">{pad(i + 1)} <em>/ {pad(n)}</em></span>
          <div>
            <button type="button" aria-label="Previous role" onClick={() => go(i - 1)}>←</button>
            <button type="button" aria-label="Next role" onClick={() => go(i + 1)}>→</button>
          </div>
        </div>
        <div className="xr-panels">
          {items.map((e, k) => {
            const now = e.note === "Present";
            return (
              <div key={e.org} id={`xr-p${k}`} role="tabpanel" aria-labelledby={`xr-t${k}`} className={`xr-panel${k === i ? " on" : ""}`} inert={k !== i}>
                <span className="xr-ghost" aria-hidden>{pad(k + 1)}</span>
                <div className="xr-head">
                  <span className={`xr-badge${now ? " live" : ""}`}><i aria-hidden />{now ? "Present" : e.type || "Past role"}</span>
                  <h3>{e.org}</h3>
                  <p className="xr-prole">{e.role}</p>
                  <span className="xr-when">{now ? [e.year, e.type].filter(Boolean).join(" · ") : e.year}</span>
                </div>
                <ol className="xr-pts">
                  {e.bullets.map((b, j) => <li key={b} style={{ "--k": j } as React.CSSProperties}><span aria-hidden>{pad(j + 1)}</span><p>{b}</p></li>)}
                </ol>
              </div>
            );
          })}
        </div>
      </div>
      {pinned && <p className="xr-hint" aria-hidden><i />Scroll to explore · {pad(i + 1)} / {pad(n)}</p>}
    </div>
    </div>
    </div>
  );
}
