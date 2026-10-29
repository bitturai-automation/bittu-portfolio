"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import SmartImg from "@/components/ui/SmartImg";
import { SecHead } from "@/components/motion/Type";
import { EASE, host, opt, pad, uiux, web, type Project } from "@/lib/data";
import { useFx } from "@/components/motion/useFx";

function UxCard({ p, i }: { p: Project; i: number }) {
  const fx = useFx<HTMLAnchorElement>();
  return (
    <motion.li data-reveal className={`hx-card c${i % 3}`} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.75, delay: 0.06 * (i % 2), ease: EASE }}>
      <a {...fx} className="fx" href={p.link} target="_blank" rel="noopener noreferrer" data-cursor="Behance" aria-label={`${p.title} — view case study on Behance (opens in new tab)`}>
        <span className="hx-n" aria-hidden>{pad(i + 1)}</span>
        {/* media wipes in; the final negative inset keeps the hover shadow from being clipped */}
        <motion.span className="hx-media fx-media" data-reveal initial={{ clipPath: "inset(10% 0% 0% 0%)" }} whileInView={{ clipPath: "inset(-10% -10% -30% -10%)" }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, delay: 0.1 + 0.06 * (i % 2), ease: EASE }}>
          <SmartImg src={opt(p.images[0], 1100)} alt={p.altText ?? `${p.title} — UI/UX design case study cover`} label={p.title} /><i className="fx-arrow" aria-hidden>↗</i>
        </motion.span>
        <span className="hx-meta"><h3>{p.title}</h3><span className="go">Behance <b aria-hidden>↗</b></span></span>
      </a>
    </motion.li>
  );
}

/* 01 — UI/UX: pinned horizontal gallery on desktop, native swipe + snap on touch/small screens */
export function UiuxSection() {
  const wrap = useRef<HTMLDivElement>(null), track = useRef<HTMLUListElement>(null);
  const [dist, setDist] = useState(0), [pin, setPin] = useState(false), [idx, setIdx] = useState(1);
  useEffect(() => {
    const mq = window.matchMedia("(min-width:900px) and (hover:hover)");
    const measure = () => { setPin(mq.matches); if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 8)); };
    measure();
    const ro = new ResizeObserver(measure);
    track.current && ro.observe(track.current);
    mq.addEventListener("change", measure); window.addEventListener("resize", measure);
    return () => { ro.disconnect(); mq.removeEventListener("change", measure); window.removeEventListener("resize", measure); };
  }, []);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], [0.04, 1]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.min(uiux.length, Math.floor(v * uiux.length) + 1)));

  return (
    <section id="work" className="sec dark hx-sec">
      <SecHead n="01" title="Product & UI/UX" kicker="Interfaces for web and mobile — scroll sideways through the work." count={uiux.length} />
      <div ref={wrap} className="hx-wrap" style={pin ? { height: `calc(100vh + ${dist}px)` } : undefined}>
        <div className={pin ? "hx-pin" : "hx-free"}>
          <motion.ul ref={track} className="hx-track" style={pin ? { x } : undefined}>
            {uiux.map((p, i) => <UxCard key={p.id} p={p} i={i} />)}
          </motion.ul>
          {pin && <div className="hx-ui" aria-hidden><span>{pad(idx)} / {pad(uiux.length)}</span><div><motion.i style={{ scaleX: bar }} /></div></div>}
        </div>
      </div>
    </section>
  );
}

/* 02 — Websites: browser-window gallery. Each site sits in a frame; on hover the page scrolls inside it. */
function WebShot({ src, title, eager }: { src: string; title: string; eager?: boolean }) {
  const view = useRef<HTMLDivElement>(null), img = useRef<HTMLImageElement>(null);
  const [bad, setBad] = useState(false);
  const measure = () => {
    const v = view.current, im = img.current;
    if (v && im) v.style.setProperty("--shift", `${Math.max(0, im.offsetHeight - v.clientHeight)}px`);
  };
  useEffect(() => {
    if (img.current?.complete) { if (img.current.naturalWidth) measure(); else setBad(true); }
    const ro = new ResizeObserver(measure); if (view.current) ro.observe(view.current);
    return () => ro.disconnect();
  }, [src]);
  return (
    <div ref={view} className="wg-view">
      {bad
        ? <div className="img-fallback" role="img" aria-label={title}><span>{title}</span></div>
        // eslint-disable-next-line @next/next/no-img-element
        : <img ref={img} src={src} alt="" loading={eager ? "eager" : "lazy"} decoding="async" onLoad={measure} onError={() => setBad(true)} />}
    </div>
  );
}

function WebCard({ p, i }: { p: Project; i: number }) {
  return (
    <li className="wk-card" style={{ "--i": i } as React.CSSProperties}>
      <motion.a href={p.link} target="_blank" rel="noopener noreferrer" data-cursor="Visit" data-reveal aria-label={`${p.title} — view live website (opens in new tab)`}
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.8, ease: EASE }}>
        <span className="wk-info">
          <span className="wk-top"><span>Website {pad(i + 1)} / {pad(web.length)}</span><span>Live</span></span>
          <span><b className="wk-no" aria-hidden>{pad(i + 1)}</b></span>
          <span><h3>{p.title}</h3><span className="wk-host" style={{ display: "block" }}>{host(p.link)}</span></span>
          <span className="wk-cta">Visit live site <b aria-hidden>↗</b></span>
        </span>
        <span className="wk-win">
          <span className="wg-bar" aria-hidden><i /><i /><i /><em>{host(p.link)}</em></span>
          <WebShot src={p.images[0]} title={p.title} eager={i === 0} />
        </span>
      </motion.a>
    </li>
  );
}

export function WebSection() {
  return (
    <section id="builds" className="sec paper">
      <SecHead n="02" title="Websites, built" kicker="Designed in Figma, built with HTML, CSS and AI-assisted Vibe Coding." count={web.length} />
      <ol className="wk">{web.map((p, i) => <WebCard key={p.id} p={p} i={i} />)}</ol>
    </section>
  );
}
