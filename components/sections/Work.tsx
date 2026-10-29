"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, useMotionValue, type PanInfo } from "framer-motion";
import { SecHead, useMedia } from "@/components/motion/Type";
import SmartImg from "@/components/ui/SmartImg";
import { EASE, altOf, firstSentence, graphic, opt, pad, site, type Project } from "@/lib/data";

/* 03 — Graphic & brand: "The Deck". A typographic index on the left picks a category; on the right the
   projects are a fanned stack of cards you drag, swipe, click or arrow through. Detail dialog on open. */
const short = (c: string) => c.replace(/^Social Media Design — /, "Social · ");
/** Local files live in /public/video, but the data references them as "assets/video/..." */
const local = (u?: string) => (u ? `/${u.replace(/^\/?assets\//, "")}` : "");
const cover = (p: Project, wd = 900) => (p.images[0] ? opt(p.images[0], wd) : local(p.poster));
/** Plain-language explanation of each category, shown above the deck */
const DESC: Record<string, string> = {
  All: "Every graphic project in one place — switch to Grid to scan them all at once.",
  "Social Media Design — Story": "Vertical 9:16 designs made for Instagram and WhatsApp Stories.",
  "Social Media Design — Post": "Square and portrait posts for a brand's social media feed.",
  "Posters & Banners": "Event invitations, promo posters and large banners.",
  "Website Banner Design": "Hero banners for landing pages and online stores.",
  "Printing Material": "Invitations, brochures and layouts prepared for print.",
  "AI Video": "Short AI-generated video concepts for ads and reels.",
  "Brand Identity": "Logo, colours and visual system for a whole brand.",
};
const gist = (p: Project) => { const [s] = firstSentence(p.description?.[0]); return s.length > 150 ? s.slice(0, 147).replace(/\s+\S*$/, "") + "…" : s; };

/* fan layout by depth: 0 = front card */
const FAN = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, b: 1 },
  { x: 46, y: -14, rotate: 4.5, scale: 0.94, opacity: 1, b: 0.55 },
  { x: -44, y: -26, rotate: -5.5, scale: 0.88, opacity: 0.85, b: 0.38 },
];
const GONE = { x: 0, y: -34, rotate: 0, scale: 0.8, opacity: 0, b: 0.3 };

export function GraphicSection() {
  const reduce = useReducedMotion();
  const chapters = [
    { name: "All", items: graphic },
    ...site.graphicCategories.map((c) => ({ name: c, items: graphic.filter((p) => p.subcategory === c) })).filter((c) => c.items.length),
  ];
  const [ci, setCi] = useState(1);
  const [view, setView] = useState<"deck" | "grid">("deck");
  const [touched, setTouched] = useState(false);
  const [idx, setIdx] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const sec = useRef<HTMLDivElement>(null);
  const chap = chapters[ci];
  const n = chap.items.length;
  const current = graphic.find((p) => p.id === openId) ?? null;
  const close = useCallback(() => { setOpenId(null); trigger.current?.focus(); }, []);
  const open = (id: string, el: HTMLElement) => { trigger.current = el; setTouched(true); setOpenId(id); };
  const go = useCallback((d: 1 | -1) => { setTouched(true); setIdx((i) => (i + d + n) % n); }, [n]);

  /* Desktop: the section pins to the viewport and plain scrolling steps through the categories one by one
     (01 → 02 → …). Once the last category has been shown the page continues to the next section.
     Touch / small screens, reduced motion and the Grid view keep the normal, un-pinned layout. */
  const wrap = useRef<HTMLDivElement>(null);
  const [canPin, setCanPin] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width:900px) and (hover:hover) and (min-height:560px)");
    const on = () => setCanPin(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const pinned = canPin && view === "deck" && !reduce;
  const steps = Math.max(1, chapters.length - 1);        // every category except "All work"
  const last = useRef(-1);
  const { scrollYProgress: wp } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  useMotionValueEvent(wp, "change", (v) => {
    if (!pinned) return;
    const s = Math.min(steps - 1, Math.max(0, Math.floor(v * steps)));
    if (s !== last.current) { last.current = s; setCi(s + 1); setIdx(0); }
  });
  const pick = (i: number) => {
    setCi(i); setIdx(0); setTouched(true);
    const w = wrap.current;
    if (pinned && w && i > 0) {            // keep scroll position in sync with the chosen category
      last.current = i - 1;
      const range = w.offsetHeight - window.innerHeight;
      window.scrollTo({ top: w.getBoundingClientRect().top + window.scrollY + (range * (i - 0.5)) / steps, behavior: reduce ? "auto" : "smooth" });
    }
  };

  /* big ghost numeral drifts as the section scrolls */
  const { scrollYProgress } = useScroll({ target: sec, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], [90, -90]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  return (
    <section id="brand" className={`sec dark gd-sec${pinned ? " gd-pinned" : ""}`}>
      <SecHead n="03" title="Graphic & brand" kicker="Scroll to move through each category, then shuffle the deck. Open a card for the brief and approach." count={graphic.length} />
      <div ref={wrap} className="gd-wrap" style={pinned ? { height: `${100 + (steps - 1) * 75}vh` } : undefined}>
      <div className={pinned ? "gd-pin" : undefined}>
      <div ref={sec} className="gd">
        <motion.ul className="gd-idx" aria-label="Categories" initial="h" whileInView="v" viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ staggerChildren: 0.06 }}>
          {chapters.map((c, i) => (
            <motion.li key={c.name} variants={{ h: { opacity: 0, x: -30 }, v: { opacity: 1, x: 0 } }} transition={{ duration: 0.7, ease: EASE }} data-reveal>
              <button className="gd-row" aria-pressed={i === ci} onClick={(e) => { pick(i); if (!pinned) e.currentTarget.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" }); }} data-cursor="Open">
                {i === ci && <motion.span layoutId="gd-active" className="gd-fill" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 36 }} />}
                <span className="gd-rno">{pad(i)}</span>
                <span className="gd-rname">{c.name === "All" ? "All work" : short(c.name)}</span>
                <span className="gd-rct">{pad(c.items.length)}</span>
              </button>
            </motion.li>
          ))}
        </motion.ul>

        <div className="gd-main">
          <div className="gd-tools">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={chap.name} className="gd-desc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }}>{DESC[chap.name]}</motion.p>
            </AnimatePresence>
            <div className="gd-view" role="group" aria-label="Choose view">
              {(["deck", "grid"] as const).map((v) => (
                <button key={v} aria-pressed={view === v} onClick={() => { setView(v); setTouched(true); }}>
                  {view === v && <motion.span layoutId="gd-view" className="gd-vfill" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} />}
                  <span>{v === "deck" ? "Deck" : "Grid"}</span>
                </button>
              ))}
            </div>
          </div>

          {view === "grid" ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul key={chap.name} className="gd-grid" aria-label={`${chap.name === "All" ? "All work" : short(chap.name)} projects`}
                initial="h" animate="v" exit={{ opacity: 0 }} transition={{ staggerChildren: reduce ? 0 : 0.04 }}>
                {chap.items.map((p) => (
                  <motion.li key={p.id} variants={{ h: { opacity: 0, y: 24 }, v: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, ease: EASE }}>
                    <GridTile p={p} onOpen={(el) => open(p.id, el)} />
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          ) : (<>
          <motion.span className="gd-ghost" aria-hidden style={reduce ? undefined : { y: ghostY }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={ci} initial={{ y: "60%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-60%", opacity: 0 }} transition={{ duration: 0.6, ease: EASE }}>{pad(ci)}</motion.span>
            </AnimatePresence>
          </motion.span>

          <div className="gd-stage" tabIndex={0} role="group" aria-roledescription="carousel" aria-label={`${chap.name === "All" ? "All work" : short(chap.name)} — ${n} projects. Use left and right arrow keys to browse.`} onKeyDown={onKey}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={chap.name} className="gd-deck"
                initial={reduce ? false : { opacity: 0, y: 36, rotate: -2.5, scale: 0.96 }} animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -36, rotate: 2.5, scale: 0.96 }} transition={{ duration: 0.45, ease: EASE }}>
                {chap.items.map((p, i) => {
                  const k = (i - idx + n) % n;
                  return <Card key={p.id} p={p} k={k} n={n} reduce={!!reduce} onNext={() => go(1)} onPrev={() => go(-1)} onOpen={(el) => open(p.id, el)} touched={touched} />;
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="gd-bar">
            <div className="gd-info" aria-live="polite">
              <span className="gd-sub">{short(chap.items[idx].subcategory)}</span>
              <span className="gd-tmask">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={chap.items[idx].id} className="gd-t" initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "-110%" }} transition={{ duration: 0.38, ease: EASE }}>{chap.items[idx].title}</motion.span>
                </AnimatePresence>
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={chap.items[idx].id} className="gd-gist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>{gist(chap.items[idx])}</motion.span>
              </AnimatePresence>
            </div>
            <div className="gd-ctrl">
              <span className="gd-ticks" aria-hidden>
                {chap.items.map((p, i) => <motion.i key={p.id} animate={{ width: i === idx ? 28 : 8, backgroundColor: i === idx ? "#fd5e20" : "rgba(239,234,223,.25)" }} transition={{ duration: 0.4, ease: EASE }} />)}
              </span>
              <span className="gd-cnt">{pad(idx + 1)}<small> / {pad(n)}</small></span>
              <span className="gd-arrows">
                <button onClick={() => go(-1)} aria-label="Previous project" disabled={n < 2}>←</button>
                <button onClick={() => go(1)} aria-label="Next project" disabled={n < 2}>→</button>
              </span>
            </div>
          </div>
          <p className="gd-hint" aria-hidden>{pinned ? "Scroll to change category · drag the card to browse" : "Drag the card · swipe · or use ← →"}</p>
          </>)}
        </div>
      </div>
      </div>
      </div>
      <AnimatePresence>{current && <Modal key={current.id} p={current} onClose={close} />}</AnimatePresence>
    </section>
  );
}

function GridTile({ p, onOpen }: { p: Project; onOpen: (el: HTMLElement) => void }) {
  const [bad, setBad] = useState(false);
  return (
    <button className="gd-tile" onClick={(e) => onOpen(e.currentTarget)} aria-haspopup="dialog" data-cursor="View" aria-label={`${p.title} — open project details`}>
      <span className="gd-tmedia">
        {bad
          ? <span className="img-fallback gd-fb" role="img" aria-label={altOf(p)}><span>{p.title}</span></span>
          // eslint-disable-next-line @next/next/no-img-element
          : <img src={cover(p, 600)} alt={altOf(p)} loading="lazy" decoding="async" draggable={false} onError={() => setBad(true)} />}
        {(p.video || p.images.length > 1) && <i className="gd-badge" aria-hidden>{p.video ? "▶ Video" : `${p.images.length} images`}</i>}
      </span>
      <span className="gd-tt">{p.title}</span>
    </button>
  );
}

function Card({ p, k, n, reduce, touched, onNext, onPrev, onOpen }: { p: Project; k: number; n: number; reduce: boolean; touched: boolean; onNext: () => void; onPrev: () => void; onOpen: (el: HTMLElement) => void }) {
  const [bad, setBad] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const x = useMotionValue(0);
  const tilt = useTransform(x, [-220, 220], [-9, 9]);
  const top = k === 0;
  const small = useMedia("(max-width:640px)");
  const base = k < FAN.length ? FAN[k] : GONE;
  const f = small ? { ...base, x: base.x * 0.55, rotate: base.rotate * 0.8 } : base;
  const src = cover(p);
  useEffect(() => { const el = img.current; if (el?.complete && el.naturalWidth === 0) setBad(true); }, [src]);
  const end = (_: unknown, i: PanInfo) => {
    if (i.offset.x < -110 || i.velocity.x < -500) onNext();
    else if (i.offset.x > 110 || i.velocity.x > 500) onPrev();
  };
  return (
    <div className="gd-slot" style={{ zIndex: top ? 10 : 10 - k, pointerEvents: k > 1 ? "none" : "auto" }} aria-hidden={!top}>
      <motion.div className="gd-fan" initial={false}
        animate={reduce ? { opacity: top ? 1 : 0, x: 0, y: 0, rotate: 0, scale: 1 } : { x: f.x, y: f.y, rotate: f.rotate, scale: f.scale, opacity: f.opacity }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 210, damping: 24, mass: 0.9 }}>
        <motion.div className="gd-card" data-top={top} style={{ x: top ? x : 0, rotate: top && !reduce ? tilt : 0 }}
          drag={top && n > 1 ? "x" : false} dragSnapToOrigin dragElastic={0.7} dragConstraints={{ left: 0, right: 0 }} onDragEnd={end}
          role={top ? "button" : undefined} tabIndex={top ? 0 : -1} aria-haspopup={top ? "dialog" : undefined} aria-label={top ? `${p.title} — open project details` : undefined}
          data-cursor={top ? "View" : k === 1 ? "Next" : undefined}
          onTap={(e) => { const el = (e.target as HTMLElement).closest<HTMLElement>(".gd-card"); if (top && el) onOpen(el); else if (k === 1) onNext(); }}
          onKeyDown={(e) => { if (top && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onOpen(e.currentTarget); } }}>
          {bad
            ? <span className="img-fallback gd-fb" role="img" aria-label={altOf(p)}><span>{p.title}</span></span>
            // eslint-disable-next-line @next/next/no-img-element
            : <img ref={img} src={src} alt={top ? altOf(p) : ""} loading={k < 3 ? "eager" : "lazy"} decoding="async" draggable={false} onError={() => setBad(true)} />}
          <motion.i className="gd-dim" initial={false} animate={{ opacity: 1 - f.b }} transition={{ duration: 0.4 }} aria-hidden />
          {top && (p.video || p.images.length > 1) && <i className="gd-badge" aria-hidden>{p.video ? "▶ Video" : `${p.images.length} images`}</i>}
          {top && <i className="gd-open" aria-hidden>View ↗</i>}
          {top && !touched && <i className="gd-tap" aria-hidden><span className="t-touch">Tap to open · swipe for more</span><span className="t-hover">Click to open · drag for more</span></i>}
        </motion.div>
      </motion.div>
    </div>
  );
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    box.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !box.current) return;
      const f = [...box.current.querySelectorAll<HTMLElement>("a[href],button,video[controls]")];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const [lede, restFirst] = firstSentence(p.description?.[0]);
  const overview = [restFirst, ...(p.description?.slice(1) ?? [])].filter(Boolean);
  const blocks: [string, string[] | undefined][] = [["More about the project", overview.length ? overview : undefined], ["Challenge", p.challenge], ["Approach", p.approach], ["Outcome", p.outcome]];
  return (
    <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div ref={box} role="dialog" aria-modal="true" aria-labelledby="m-title" className="modal" onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
        <button className="m-close" onClick={onClose} aria-label="Close project details">✕</button>
        <div className="m-info">
          <p className="eyebrow">{p.subcategory}</p>
          <h3 id="m-title">{p.title}</h3>
          {lede && <p className="m-lede">{lede}</p>}
          {(p.role || p.tools) && (
            <dl className="m-facts">
              {p.role && <div><dt>Role</dt><dd>{p.role}</dd></div>}
              {p.tools && <div><dt>Tools</dt><dd>{p.tools.join(" · ")}</dd></div>}
            </dl>
          )}
          {blocks.map(([h, t]) => t && (
            <div className="m-block" key={h}><h4>{h}</h4>{t.map((x, i) => <p key={i}>{x}</p>)}</div>
          ))}
        </div>
        <div className="m-media">
          {p.video && <video controls playsInline preload="none" poster={local(p.poster)} src={local(p.video)} aria-label={`${p.title} video`} />}
          {p.images.map((src, i) => <SmartImg key={src} src={opt(src, 1600)} alt={`${altOf(p)} (image ${i + 1} of ${p.images.length})`} label={p.title} />)}
        </div>
      </motion.div>
    </motion.div>
  );
}
