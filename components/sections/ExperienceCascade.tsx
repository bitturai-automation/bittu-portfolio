"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { pad, site } from "@/lib/data";

type Exp = (typeof site.experience)[number];

/**
 * Home · Experience — "pinned notes" cascade.
 *  Each role is a note pinned to the board, zig-zagging left / right. They are driven by the scroll position, so:
 *   - scrolling DOWN: the notes open one by one, rising up from below the screen, and a dashed line draws itself from the previous pin to the next;
 *   - scrolling UP (back through the section): the lowest note closes first, then the one above it, … bottom to top.
 *  Nothing is pinned or hijacked, the page scrolls normally. Reduced motion: all notes simply sit open.
 */
const TONES = [
  { bg: "#FFE9DD", pin: "#FD6327" },
  { bg: "#E5EBFF", pin: "#4F6EF7" },
  { bg: "#EFE7FF", pin: "#8B5CF6" },
];

export default function ExperienceCascade({ items }: { items: Exp[] }) {
  return (
    <div className="xc" data-reveal>
      <ol className="xc-list" aria-label="Work experience">
        {items.map((e, k) => <Note key={e.org} e={e} k={k} />)}
      </ol>
    </div>
  );
}

function Note({ e, k }: { e: Exp; k: number }) {
  const reduce = useReducedMotion();
  const li = useRef<HTMLLIElement>(null);
  const card_ = useRef<HTMLElement>(null);
  const [link, setLink] = useState<{ x: number; y: number; dx: number; dy: number } | null>(null);
  const right = k % 2 === 1;
  const tone = TONES[k % TONES.length];
  const PIN_Y = 16; // distance from the top of a note to the centre of its pin
  const tilt = right ? 1.4 : -1.4;
  const now = e.note === "Present";

  // 0 = closed (card top is at the bottom edge of the screen) → 1 = fully open. Reversible, so scrolling up closes it again.
  const { scrollYProgress } = useScroll({ target: li, offset: ["start 0.99", "start 0.66"] });
  const p: MotionValue<number> = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.6, restDelta: 0.001 });
  const y = useTransform(p, [0, 1], [110, 0]);
  const o = useTransform(p, [0, 0.35, 1], [0, 1, 1]);
  const rot = useTransform(p, [0, 1], [tilt + (right ? 9 : -9), tilt]);
  const rx = useTransform(p, [0, 1], [34, 0]);
  const sc = useTransform(p, [0, 1], [0.9, 1]);
  const pin = useTransform(p, [0.55, 0.9, 1], [0, 1.25, 1]);
  const draw = useTransform(p, [0.15, 1], [0, 1]);

  // dashed link from the previous note's pin to this note's pin. Measured from layout boxes (offset*), which ignore the scroll transforms, so it follows any resize.
  useLayoutEffect(() => {
    if (k === 0) return;
    const el = li.current, prev = el?.previousElementSibling as HTMLElement | null, card = card_.current, pcard = prev?.firstElementChild as HTMLElement | null;
    if (!el || !prev || !card || !pcard) return;
    const measure = () => {
      if (getComputedStyle(el).getPropertyValue("--xc-cols").trim() !== "2") return setLink(null);
      const here = { x: el.offsetLeft + card.offsetLeft + card.offsetWidth / 2, y: el.offsetTop + card.offsetTop + PIN_Y };
      const there = { x: prev.offsetLeft + pcard.offsetLeft + pcard.offsetWidth / 2, y: prev.offsetTop + pcard.offsetTop + PIN_Y };
      setLink({ x: card.offsetLeft + card.offsetWidth / 2, y: card.offsetTop + PIN_Y, dx: there.x - here.x, dy: there.y - here.y });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el); ro.observe(prev); ro.observe(card); ro.observe(pcard);
    return () => ro.disconnect();
  }, [k]);

  const motionStyle = reduce ? undefined : { y, opacity: o, rotate: rot, rotateX: rx, scale: sc, transformPerspective: 900 };
  const h = link ? Math.abs(link.dy) * 0.5 : 0;
  const d = link ? `M${link.dx} ${link.dy} C${link.dx} ${link.dy + h} 0 ${-h} 0 0` : "";

  return (
    <li ref={li} className={`xc-item ${right ? "r" : "l"}`} style={{ "--tone": tone.bg, "--pin": tone.pin } as React.CSSProperties}>
      <motion.article ref={card_} className="xc-card" style={motionStyle ?? { rotate: tilt }} aria-label={`${e.role}, ${e.org}`}>
        <motion.i className="xc-pin" aria-hidden style={reduce ? undefined : { scale: pin }} />
        <header>
          <span className="xc-no">{pad(k + 1)}</span>
          {now && <span className="xc-live"><i aria-hidden />Present</span>}
          <h3>{e.role}</h3>
          <p className="xc-org">{e.org}</p>
          <span className="xc-when">{[e.year, e.type].filter(Boolean).join(" · ")}</span>
        </header>
        <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
      </motion.article>
      {link && (
        <svg className="xc-link" aria-hidden focusable="false" width="2" height="2" style={{ left: link.x, top: link.y }}>
          <motion.path d={d} pathLength={1} style={reduce ? undefined : { pathLength: draw }} />
        </svg>
      )}
    </li>
  );
}
