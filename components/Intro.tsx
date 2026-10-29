"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

/** The tagline from the logo, cycled in the dimension chip while the frame sits on screen. */
const WORDS = ["Design", "UI/UX", "Vibe code", "Create"];
const OPEN_AT = 1400; // ms: when the cursor drags the frame open
const OPEN_MS = 800;  // ms: how long the frame takes to fill the viewport

/**
 * ~2.3s opening: a design-tool selection frame draws around the name, a "Bittu" cursor grabs the corner and drags it
 * to full screen, and the site shows through the growing frame. The page is already rendered underneath; input is never blocked.
 * Hero entrance delay (Hero.tsx `base`) is tuned to OPEN_AT.
 */
export default function Intro() {
  const [on, setOn] = useState(true);
  const [w, setW] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setOn(false); return; }
    const t: number[] = [];
    WORDS.forEach((_, i) => { if (i) t.push(window.setTimeout(() => setW(i), 500 + i * 280)); });
    t.push(window.setTimeout(() => {
      const el = frame.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.dataset.open = "1";
      animate(el, { width: [r.width, window.innerWidth], height: [r.height, window.innerHeight] }, { duration: OPEN_MS / 1000, ease: [0.76, 0, 0.24, 1] });
      animate(el, { backgroundColor: ["rgba(12,12,11,1)", "rgba(12,12,11,0)"] }, { duration: 0.5, delay: 0.15, ease: "easeOut" });
    }, OPEN_AT));
    t.push(window.setTimeout(() => setOn(false), OPEN_AT + OPEN_MS + 100));
    return () => t.forEach(clearTimeout);
  }, [reduce]);

  if (!on) return null;
  return (
    <div className="intro" aria-hidden>
      <noscript><style>{`.intro{display:none}`}</style></noscript>
      <div className="intro-frame" ref={frame}>
        <svg className="intro-stroke" focusable="false"><rect x="0" y="0" width="100%" height="100%" pathLength={1} /></svg>
        <i className="intro-h h1" /><i className="intro-h h2" /><i className="intro-h h3" /><i className="intro-h h4" />
        <span className="intro-mask"><span className="intro-word">Bittu Rai</span></span>
        <span className="intro-chip">{WORDS[w]}</span>
        <span className="intro-cursor">
          <svg width="20" height="22" viewBox="0 0 20 22" focusable="false"><path d="M2 2v16l4.4-4 3 6.6 3-1.3-3-6.5H16z" /></svg>
          <b>Bittu</b>
        </span>
      </div>
    </div>
  );
}
