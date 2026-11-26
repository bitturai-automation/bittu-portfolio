"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import SmartImg from "@/components/ui/SmartImg";
import { SecHead } from "@/components/motion/Type";
import { EASE, host, opt, pad, uiux, web, type Project } from "@/lib/data";
import { useFx } from "@/components/motion/useFx";
import { Modal } from "@/components/sections/Work";

function UxCard({ p, i, onOpen }: { p: Project; i: number; onOpen: (id: string, el: HTMLElement) => void }) {
  const fx = useFx<HTMLAnchorElement>();
  const detail = true; // every project opens a quick-view card
  return (
    <motion.li data-reveal className={`hx-card c${i % 3}`} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.75, delay: 0.06 * (i % 2), ease: EASE }}>
      <a {...fx} className="fx" href="#" data-cursor="Quick view"
        {...(detail ? { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); onOpen(p.id, e.currentTarget); }, "aria-haspopup": "dialog" as const } : {})}
        aria-label={detail ? `${p.title} — quick view` : `${p.title} — view case study on Behance (opens in new tab)`}>
        <span className="hx-n" aria-hidden>{pad(i + 1)}</span>
        {/* media wipes in; the final negative inset keeps the hover shadow from being clipped */}
        <motion.span className="hx-media fx-media" data-reveal initial={{ clipPath: "inset(10% 0% 0% 0%)" }} whileInView={{ clipPath: "inset(-10% -10% -30% -10%)" }}
          viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.9, delay: 0.1 + 0.06 * (i % 2), ease: EASE }}>
          <SmartImg src={opt(p.images[0], 1100)} alt={p.altText ?? `${p.title} — UI/UX design case study cover`} label={p.title} /><i className="fx-arrow" aria-hidden>↗</i>
        </motion.span>
        <span className="hx-meta"><h3>{p.title}</h3><span className="go">{detail ? "Quick view" : "Behance"} <b aria-hidden>{detail ? "→" : "↗"}</b></span></span>
      </a>
    </motion.li>
  );
}

/* 01 — UI/UX Projects: pinned horizontal gallery on desktop, native swipe + snap on touch/small screens */
export function UiuxSection({ head = true, n = "01", tone = "dark" }: { head?: boolean; n?: string; tone?: "dark" | "paper" } = {}) {
  const wrap = useRef<HTMLDivElement>(null), track = useRef<HTMLUListElement>(null);
  const [dist, setDist] = useState(0), [pin, setPin] = useState(false), [idx, setIdx] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const current = uiux.find((p) => p.id === openId) ?? null;
  const close = useCallback(() => { setOpenId(null); trigger.current?.focus(); }, []);
  const open = (id: string, el: HTMLElement) => { trigger.current = el; setOpenId(id); };
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
    <section id="work" className={`sec ${tone} hx-sec${head ? "" : " nohead"}`}>
      {head && <SecHead n={n} title="UI/UX Projects" kicker="Product interfaces for web and mobile. Scroll sideways through the work." count={uiux.length} />}
      <div ref={wrap} className="hx-wrap" style={pin ? { height: `calc(100vh + ${dist}px)` } : undefined}>
        <div className={pin ? "hx-pin" : "hx-free"}>
          <motion.ul ref={track} className="hx-track" style={pin ? { x } : undefined}>
            {uiux.map((p, i) => <UxCard key={p.id} p={p} i={i} onOpen={open} />)}
          </motion.ul>
          {pin && <div className="hx-ui" aria-hidden><span>{pad(idx)} / {pad(uiux.length)}</span><div><motion.i style={{ scaleX: bar }} /></div></div>}
        </div>
      </div>
      {/* portal: the pop-up is a dark slab, so it must live outside the light (.paper) section */}
      {typeof document !== "undefined" && createPortal(<AnimatePresence>{current && <Modal key={current.id} p={current} onClose={close} />}</AnimatePresence>, document.body)}
    </section>
  );
}

/* 03 — Website Development Projects: browser-window gallery. Each site sits in a frame; on hover the page scrolls inside it. */
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

const MotionLink = motion.a;

function WebCard({ p, i }: { p: Project; i: number }) {
  return (
    <li className="wk-card" style={{ "--i": i } as React.CSSProperties}>
      <MotionLink href={p.link} target="_blank" rel="noopener noreferrer" data-cursor="Open" data-reveal aria-label={`${p.title} — open live website (opens in new tab)`}
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-6% 0px -10% 0px" }} transition={{ duration: 0.8, ease: EASE }}>
        <span className="wk-info">
          <span className="wk-top"><span>Website {pad(i + 1)} / {pad(web.length)}</span><span>Live</span></span>
          <span><b className="wk-no" aria-hidden>{pad(i + 1)}</b></span>
          <span><h3>{p.title}</h3><span className="wk-host" style={{ display: "block" }}>{host(p.link)}</span></span>
          <span className="wk-cta">View project <b aria-hidden>→</b></span>
        </span>
        <span className="wk-win">
          <span className="wg-bar" aria-hidden><i /><i /><i /><em>{host(p.link)}</em></span>
          <WebShot src={opt(p.images[0], 1000)} title={p.title} eager={i === 0} />
        </span>
      </MotionLink>
    </li>
  );
}

export function WebSection({ head = true, n = "03", tone = "paper" }: { head?: boolean; n?: string; tone?: "dark" | "paper" } = {}) {
  return (
    <section id="builds" className={`sec ${tone} wk-sec${head ? "" : " nohead"}`}>
      {head && <SecHead n={n} title="Website Development Projects" size="md" kicker="Designed in Figma, built with HTML, CSS and AI-assisted workflows." count={web.length} />}
      <ol className="wk">{web.map((p, i) => <WebCard key={p.id} p={p} i={i} />)}</ol>
    </section>
  );
}
