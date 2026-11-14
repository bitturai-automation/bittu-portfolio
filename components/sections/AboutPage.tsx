"use client";
/**
 * About page redesign ("Aurora glass").
 * Every class is prefixed ap- and lives in styles/about-page.css.
 * Home still uses the original sections in About.tsx, so nothing there changes.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence, animate, motion, useInView, useMotionValue, useMotionValueEvent,
  useScroll, useSpring, useTransform,
} from "framer-motion";
import { Split } from "@/components/motion/Type";
import { ABOUT, EASE, pad, site, toolIcon } from "@/lib/data";
import { AboutLines, LookingFor, ProfilePhoto, SkillsGrid } from "@/components/sections/AboutIntro";

/* ───────────── small helpers ───────────── */

function Num({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  useEffect(() => {
    if (!on || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, { duration: 1.6, ease: EASE, onUpdate: (v) => (el.textContent = Math.round(v) + suffix) });
    return () => c.stop();
  }, [on, to, suffix]);
  return <b ref={ref as React.RefObject<HTMLElement>}>{to}{suffix}</b>;
}

/** Section heading: ghost number, kicker, big masked title. */
function Head({ title }: { n?: string; title: string; kicker?: string; tone?: "dark" | "paper" }) {
  // visible heading strip removed from the design; the title stays as a screen-reader / SEO heading
  return <h2 className="sr">{title}</h2>;
}

const rise = (i = 0, y = 40) => ({
  initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-6% 0px -8% 0px" }, transition: { duration: 0.85, delay: i * 0.08, ease: EASE },
});

/* ═════════════ 0 · HERO ═════════════ */
const TITLE: string[][] = [["Designer", "first,"], ["builder", "*too.*"]];
const TICKER = ["Product UI/UX", "Visual Branding", "Graphic Design", "Website Design", "AI-assisted Build", "Design Systems"];

export function ApHero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 16 }), sy = useSpring(my, { stiffness: 70, damping: 16 });
  const rotY = useTransform(sx, [-1, 1], [-16, 16]), rotX = useTransform(sy, [-1, 1], [12, -12]);
  const a1x = useTransform(sx, [-1, 1], [-40, 40]), a1y = useTransform(sy, [-1, 1], [-30, 30]);
  const a2x = useTransform(sx, [-1, 1], [30, -30]), a2y = useTransform(sy, [-1, 1], [24, -24]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const stats = site.stats;
  const icons = ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva"].map(toolIcon).filter(Boolean);

  return (
    <section id="top" ref={ref} className="ap ap-hero dark"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 2); my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}>
      <div className="ap-aurora" aria-hidden><i /><i /><i /></div>
      <div className="ap-grid" aria-hidden />

      <nav className="ph-crumbs ap-crumbs" aria-label="Breadcrumb">
        <ol><li><Link href="/">Home</Link></li><li><span aria-current="page">About</span></li></ol>
      </nav>

      <div className="ap-hero-row">
        <motion.div className="ap-hero-copy" style={{ y: titleY, opacity: fade }}>
          <h1 className="ap-h1" aria-label="Designer first, builder too.">
            {TITLE.map((line, li) => (
              <span className="ap-line" key={li} aria-hidden>
                {line.map((w, wi) => {
                  const acc = w.startsWith("*");
                  return (
                    <Fragment2 key={wi}>
                      <span className="mask"><motion.span className={`word${acc ? " ap-grad" : ""}`} initial={{ y: "112%", rotate: 4 }} animate={{ y: 0, rotate: 0 }}
                        transition={{ duration: 0.95, delay: 0.2 + (li * 2 + wi) * 0.09, ease: EASE }}>{acc ? w.slice(1, -1) : w}</motion.span></span>{" "}
                    </Fragment2>
                  );
                })}
              </span>
            ))}
          </h1>
          <motion.p className="ap-lede" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease: EASE }}>
            User-focused product design, strong visual communication and the ability to build it. Here is who I am, how I work and where I’ve worked.
          </motion.p>
          <motion.div className="ap-jump" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85, ease: EASE }}>
            {[["Story", "story"], ["What I do", "services"], ["Process", "process"], ["Experience", "experience"], ["Skills", "skills"], ["Learning", "learning"], ["Brands", "brands"]].map(([l, id]) => (
              <Link key={id} href={`/about#${id}`}>{l}</Link>
            ))}
          </motion.div>
        </motion.div>

        {/* floating 3D glass scene */}
        <motion.div className="ap-scene" style={{ y: sceneY, opacity: fade }} aria-hidden>
          <motion.div className="ap-stage" style={{ rotateX: rotX, rotateY: rotY }}
            initial={{ opacity: 0, scale: 0.8, rotateZ: -6 }} animate={{ opacity: 1, scale: 1, rotateZ: 0 }} transition={{ duration: 1.2, delay: 0.3, ease: EASE }}>
            <div className="ap-plate p3"><span>Build</span></div>
            <div className="ap-plate p2"><span>Brand</span></div>
            <div className="ap-plate p1"><span>UI/UX</span></div>
            <div className="ap-id">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo-icon.png" alt="" width={56} height={56} />
              <div><b>Bittu Rai</b><small>Product UI/UX · Graphic Design</small></div>
              <p className="ap-id-live"><i />Open to work</p>
              <ul className="ap-id-tools">{icons.map((s) => /* eslint-disable-next-line @next/next/no-img-element */ <li key={s}><img src={`/${s.replace(/^assets\//, "")}`} alt="" width={26} height={26} /></li>)}</ul>
            </div>
          </motion.div>
          <motion.i className="ap-orb o1" style={{ x: a1x, y: a1y }} />
          <motion.i className="ap-orb o2" style={{ x: a2x, y: a2y }} />
          <motion.i className="ap-ring r1" style={{ x: a2x, y: a1y }} />
        </motion.div>
      </div>

      <motion.dl className="ap-stats" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1, ease: EASE }}>
        {stats.map((s) => (
          <div className="ap-stat ap-card" key={s.label + s.sub}>
            <dd><Num to={s.value} suffix={s.suffix} /></dd>
            <dt>{s.label}{s.sub ? <em> · {s.sub}</em> : null}</dt>
          </div>
        ))}
      </motion.dl>

      <div className="ap-ticker" aria-hidden>
        <div className="ap-ticker-track">{[0, 1].flatMap((c) => TICKER.map((t, i) => <span key={`${c}-${i}`}>{t}<i>✦</i></span>))}</div>
      </div>
    </section>
  );
}
const Fragment2 = ({ children }: { children: React.ReactNode }) => <>{children}</>;

/* ═════════════ 1 · STORY ═════════════ */
const CH_LABEL = ["Who I am", "What I do", "What I build", "What I enjoy"];

function Chapter({ i, text, label }: { i: number; text: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.9", "start 0.45"] });
  const o = useTransform(p, [0, 1], [0.22, 1]);
  const x = useTransform(p, [0, 1], [30, 0]);
  const line = useTransform(p, [0, 1], [0, 1]);
  return (
    <div className="ap-ch" ref={ref}>
      <motion.i className="ap-ch-line" style={{ scaleX: line }} aria-hidden />
      <div className="ap-ch-meta"><span>{pad(i + 1)}</span><em>{label}</em></div>
      <motion.p style={{ opacity: o, x }}>{text}</motion.p>
    </div>
  );
}

export function ApStory() {
  const parts = ABOUT.lines;
  const words = site.bio.positioning.split(" ");
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  return (
    <section id="story" className="sec paper ap ap-story">
      <Head n="01" title="My story" kicker="Design thinking, visual craft and branding, with the ability to build." tone="paper" />
      <div className="ap-story-grid">
        <div className="ap-story-l">
          <p ref={ref} className="ap-statement" aria-label={site.bio.positioning}>
            {words.map((w, i) => <Word key={i} w={w} p={scrollYProgress} a={i / words.length} b={Math.min(1, (i + 3) / words.length)} />)}
          </p>
          <motion.div className="ab-side" {...rise(0, 20)}>
            <ProfilePhoto />
            <LookingFor />
          </motion.div>
        </div>
        <div className="ap-story-r">
          {parts.map((t, i) => <Chapter key={i} i={i} text={t} label={CH_LABEL[i] ?? "More"} />)}
        </div>
      </div>

      <div className="ap-who" aria-label="Who I help">
        {[0, 1].map((row) => (
          <div className="ap-mq" data-dir={row ? "r" : "l"} key={row} aria-hidden={row ? true : undefined}>
            <div className="ap-mq-track">
              {[0, 1, 2].flatMap((c) => site.whoIHelp.map((w, i) => <span key={`${c}-${i}`} className={(i + row) % 2 ? "o" : ""}>{w}<i>✦</i></span>))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function Word({ w, p, a, b }: { w: string; p: ReturnType<typeof useScroll>["scrollYProgress"]; a: number; b: number }) {
  const o = useTransform(p, [a, b], [0.2, 1]);
  return <motion.span style={{ opacity: o }}>{w} </motion.span>;
}

/* ═════════════ 2 · SERVICES (expanding glass panels) ═════════════ */
const ICONS = [
  <svg key="a" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="10" width="34" height="26" rx="4" /><rect x="22" y="28" width="34" height="26" rx="4" /><path d="M29 38h20M29 45h12" /></svg>,
  <svg key="b" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="22" cy="22" r="13" /><rect x="30" y="30" width="26" height="26" rx="3" /><path d="m12 56 10-17 10 17z" /></svg>,
  <svg key="c" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="11" width="50" height="42" rx="5" /><path d="M7 22h50" /><circle cx="14" cy="16.5" r="1.2" fill="currentColor" /><circle cx="20" cy="16.5" r="1.2" fill="currentColor" /><path d="M16 32h14v14H16zM36 32h12M36 39h12M36 46h8" /></svg>,
  <svg key="d" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 20 10 32l12 12M42 20l12 12-12 12" /><path d="M36 14 28 50" /><path d="M50 8v8M46 12h8" /></svg>,
];

export function ApServices() {
  const [on, setOn] = useState(0);
  return (
    <section id="services" className="sec dark ap ap-svc">
      <Head n="02" title="What I do" kicker="Product design and visual branding first, with websites to bring it all together." />
      <ul className="ap-accord">
        {site.services.map((s, i) => {
          const href = (s as { href?: string }).href === "#builds" ? "/projects/websites" : s.mode === "graphic" ? "/projects/graphic-design" : "/projects/ui-ux";
          const open = on === i;
          return (
            <motion.li key={s.title} className={`ap-pan${open ? " on" : ""}`} {...rise(i, 50)}
              onMouseEnter={() => { if (window.matchMedia("(hover:hover)").matches) setOn(i); }}>
              <button type="button" className="ap-pan-btn" aria-expanded={open} aria-controls={`ap-pan-${i}`} onClick={() => setOn(i)} onFocus={() => setOn(i)}>
                <span className="ap-pan-n">{pad(i + 1)}</span>
                <span className="ap-pan-t">{s.title}</span>
                <span className="ap-pan-ico" aria-hidden>{ICONS[i % ICONS.length]}</span>
              </button>
              <div className="ap-pan-body" id={`ap-pan-${i}`} role="region" aria-label={s.title}>
                <div>
                  <p>{s.blurb}</p>
                  <ul className="ap-tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  <Link className="ap-go" href={href} tabIndex={open ? 0 : -1}>See the work <b aria-hidden>↗</b></Link>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

/* ═════════════ 3 · PROCESS (sticky, scroll-driven) ═════════════ */
export function ApProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const steps = site.process, n = steps.length;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  useMotionValueEvent(p, "change", (v) => setI(Math.max(0, Math.min(n - 1, Math.floor(v * n * 0.999)))));
  const ring = useSpring(p, { stiffness: 120, damping: 24 });
  const s = steps[i];
  return (
    <section id="process" className="dark ap ap-proc">
      <div className="ap-proc-head"><Head n="04" title="How I work" kicker="Five steps from a rough brief to design that works." /></div>
      <div className="ap-proc-wrap" ref={ref} style={{ height: `${n * 70}svh` }}>
        <div className="ap-proc-stick">
          <div className="ap-proc-l">
            <div className="ap-dial" aria-hidden>
              <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="92" className="bg" /><motion.circle cx="100" cy="100" r="92" className="fg" style={{ pathLength: ring }} /></svg>
              <AnimatePresence mode="popLayout">
                <motion.span key={i} className="ap-dial-n" initial={{ y: 60, opacity: 0, rotateX: -50 }} animate={{ y: 0, opacity: 1, rotateX: 0 }} exit={{ y: -60, opacity: 0, rotateX: 50 }} transition={{ duration: 0.55, ease: EASE }}>{pad(i + 1)}</motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div className="ap-proc-r">
            <AnimatePresence mode="wait">
              <motion.div key={i} className="ap-proc-copy" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -28 }} transition={{ duration: 0.5, ease: EASE }}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.div>
            </AnimatePresence>
            <ol className="ap-proc-list" aria-label="Process steps">
              {steps.map((st, k) => (
                <li key={st.title} className={k === i ? "on" : k < i ? "done" : ""} aria-current={k === i ? "step" : undefined}>
                  <i aria-hidden /><span>{pad(k + 1)}</span><b>{st.title}</b>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════ 4 · EXPERIENCE (paper, drawing timeline) ═════════════ */
export function ApExperience() {
  const all = site.experience;
  const cur = all.find((e) => e.note === "Present");
  const past = all.filter((e) => e !== cur);
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const draw = useSpring(p, { stiffness: 110, damping: 26 });
  return (
    <section id="experience" className="sec paper ap ap-xp">
      <Head n="03" title="Experience" kicker="Where I’ve worked, and the design work I did there." tone="paper" />
      {cur && (
        <motion.div className="ap-now" {...rise(0, 60)}>
          <div className="ap-now-in ap-card">
            <div className="ap-now-l">
              <span className="ap-badge"><i aria-hidden />Present</span>
              <h3>{cur.org}</h3>
              <p className="ap-now-role">{cur.role}</p>
              <span className="ap-when">{[cur.year, cur.type].filter(Boolean).join(" · ")}</span>
            </div>
            <ol className="ap-now-pts">{cur.bullets.map((b, i) => <li key={b}><span>{pad(i + 1)}</span>{b}</li>)}</ol>
          </div>
        </motion.div>
      )}
      <ol className="ap-tl" ref={ref} aria-label="Earlier roles">
        <span className="ap-tl-rail" aria-hidden><motion.i style={{ scaleY: draw }} /></span>
        {past.map((e, i) => (
          <motion.li key={e.org} className={`ap-xi ${i % 2 ? "r" : "l"}`}
            initial={{ opacity: 0, x: i % 2 ? 70 : -70, y: 20 }} whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px -10% 0px" }} transition={{ duration: 0.9, ease: EASE }}>
            <i className="ap-xi-dot" aria-hidden />
            <div className="ap-xi-card ap-card">
              <div className="ap-xi-top"><b>{e.year}</b>{e.type && <span>{e.type}</span>}</div>
              <h3>{e.org}</h3>
              <p className="ap-xi-role">{e.role}</p>
              <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

/* ═════════════ 5 · SKILLS & TOOLS ═════════════ */
export function ApSkills() {
  return (
    <section id="skills" className="sec paper ap ap-sk">
      <Head n="05" title="Skills & tools" kicker="Design, the tools I use, and what I can build." tone="paper" />
      <motion.div {...rise(1, 30)}><SkillsGrid /></motion.div>
    </section>
  );
}

/* ═════════════ 6 · EDUCATION + CERTIFICATIONS ═════════════ */
function Cert({ i, title, org }: { i: number; title: string; org: string }) {
  const [flip, setFlip] = useState(false);
  return (
    <motion.li {...rise(i % 4, 36)}>
      <button type="button" className={`ap-cert${flip ? " flip" : ""}`} aria-pressed={flip} onClick={() => setFlip((f) => !f)} aria-label={`${title}${org ? `, ${org}` : ""}`}>
        <span className="ap-cert-f front ap-card"><em>{pad(i + 1)}</em><b>{title}</b><small>Tap to flip</small></span>
        <span className="ap-cert-f back"><em>Issued by</em><b>{org || "Completed course"}</b><i aria-hidden>✦</i></span>
      </button>
    </motion.li>
  );
}

export function ApLearning() {
  const edu = site.education, certs = site.certifications;
  return (
    <section id="learning" className="sec dark ap ap-ln">
      <Head n="06" title="Education & certificates" kicker="Where I studied, and the courses I’ve completed along the way." />
      <ol className="ap-edu" id="education">
        {edu.map((e, i) => (
          <motion.li key={e.school} className={i === 0 ? "feat" : ""} {...rise(i, 50)}>
            <div className="ap-edu-in ap-card">
              <span className="ap-edu-p">{e.period}</span>
              <h3>{e.program}</h3>
              <p>{e.school}</p>
            </div>
          </motion.li>
        ))}
      </ol>
      <div id="certifications" className="ap-cert-head">
        <motion.h3 {...rise(0, 24)}>Certifications</motion.h3>
        <motion.span {...rise(1, 24)}><Num to={certs.length} /> completed</motion.span>
      </div>
      <ul className="ap-cert-grid">{certs.map((c, i) => <Cert key={c.title} i={i} title={c.title} org={c.org} />)}</ul>
    </section>
  );
}
