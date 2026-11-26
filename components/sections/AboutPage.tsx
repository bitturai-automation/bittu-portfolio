"use client";
/**
 * About page (v3, "clear & friendly").
 * Goals: readable at a glance, no scroll-jacking, no hidden content (everything is visible without hovering or flipping),
 * a sticky in-page menu so people can jump to what they came for, and big tap targets on mobile.
 * Every class starts with abt- and lives in styles/about-v3.css.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import ResumeChooser from "@/components/ui/ResumeChooser";
import CertGallery from "@/components/sections/CertGallery";
import { ABOUT, EASE, LOOKING_FOR, pad, real, site, toolIcon } from "@/lib/data";

/* ───────────── helpers ───────────── */

/** Fades + lifts its children in once. Does nothing when the visitor prefers reduced motion. */
function Rise({ children, i = 0, className, as = "div" }: { children: React.ReactNode; i?: number; className?: string; as?: "div" | "li" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) { const T = as; return <T className={className}>{children}</T>; }
  return (
    <M className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.07, ease: EASE }}>
      {children}
    </M>
  );
}

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!on || !ref.current || reduce) return;
    const el = ref.current;
    const c = animate(0, to, { duration: 1.4, ease: EASE, onUpdate: (v) => (el.textContent = Math.round(v) + suffix) });
    return () => c.stop();
  }, [on, to, suffix, reduce]);
  return <b ref={ref as React.RefObject<HTMLElement>}>{to}{suffix}</b>;
}

/** Section heading used by every block: small label, clear title, one-line helper. */
function Head({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <header className="abt-head">
      <p className="abt-label"><i aria-hidden />{label}</p>
      <h2>{title}</h2>
      {text && <p className="abt-head-t">{text}</p>}
    </header>
  );
}

const iconSrc = (p: string) => `/${p.replace(/^assets\//, "")}`;

/* ═════════════ 1 · HERO ═════════════ */

function Photo() {
  const [bad, setBad] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => { const el = img.current; if (el?.complete && el.naturalWidth === 0) setBad(true); }, []);
  return (
    <div className="abt-photo">
      {bad
        ? <div className="abt-mono" role="img" aria-label={ABOUT.photoAlt}><span aria-hidden>BR</span></div>
        // eslint-disable-next-line @next/next/no-img-element
        : <img ref={img} src={ABOUT.photo} alt={ABOUT.photoAlt} width={480} height={600} decoding="async" fetchPriority="high" onError={() => setBad(true)} />}
    </div>
  );
}

export function AbHero() {
  const p = site.person;
  const tools = ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva"].map((n) => ({ n, src: toolIcon(n) })).filter((t) => t.src);
  return (
    <section id="top" className="abt-hero">
      <nav className="abt-crumbs" aria-label="Breadcrumb">
        <ol><li><Link href="/">Home</Link></li><li><span aria-current="page">About</span></li></ol>
      </nav>

      <div className="abt-hero-row">
        <div className="abt-hero-copy">
          <motion.p className="abt-chip" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <i aria-hidden />{site.availabilityNote}
          </motion.p>
          <motion.h1 className="abt-h1" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: EASE }}>
            Designing products<br />and <span>brands.</span>
          </motion.h1>
          <motion.p className="abt-lede" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.16, ease: EASE }}>
            Hi, I’m {p.name}, a Product UI/UX Designer and Graphic Designer. I create clear, user-focused interfaces and memorable brand visuals, and I can also build websites. Here is who I am, how I work and where I’ve worked.
          </motion.p>
          <motion.div className="abt-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.24, ease: EASE }}>
            <Link className="abt-btn solid" href="/projects">See my work <b aria-hidden>↗</b></Link>
            <ResumeChooser variant="outline" label="Download resume" />
            <Link className="abt-btn ghost" href="/contact">Contact me</Link>
          </motion.div>
        </div>

        <motion.div className="abt-hero-art" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1, ease: EASE }}>
          <Photo />
          <div className="abt-badge">
            <b>{p.name}</b>
            <span>Product UI/UX · Graphic Design</span>
            <ul aria-label="Main tools">{tools.map((t) => (
              // eslint-disable-next-line @next/next/no-img-element
              <li key={t.n} title={t.n}><img src={iconSrc(t.src)} alt={t.n} width={24} height={24} /></li>
            ))}</ul>
          </div>
        </motion.div>
      </div>

      <dl className="abt-stats">
        {site.stats.map((s) => (
          <div className="abt-stat" key={s.label + s.sub}>
            <dd><Count to={s.value} suffix={s.suffix} /></dd>
            <dt>{s.label}{s.sub ? <em>{s.sub}</em> : null}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ═════════════ 2 · STICKY IN-PAGE MENU ═════════════ */

const MENU: [string, string][] = [
  ["story", "My story"], ["services", "What I do"], ["process", "How I work"], ["experience", "Experience"],
  ["skills", "Skills"], ["learning", "Education"], ["brands", "Brands"],
];

export function AbMenu() {
  const [on, setOn] = useState(MENU[0][0]);
  const rail = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = MENU.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!("IntersectionObserver" in window) || !els.length) return;
    const seen = new Map<string, number>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target.id, e.isIntersecting ? 1 : 0));
      // the section nearest the top that is on screen wins
      const first = MENU.find(([id]) => seen.get(id));
      if (first) setOn(first[0]);
    }, { rootMargin: "-22% 0px -58% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // keep the active chip visible on small screens (scrolls the strip only, never the page)
  useEffect(() => {
    const r = rail.current; const a = r?.querySelector<HTMLElement>("[aria-current='true']");
    if (!r || !a) return;
    r.scrollTo({ left: a.offsetLeft - (r.clientWidth - a.clientWidth) / 2, behavior: "smooth" });
  }, [on]);

  return (
    <div className="abt-menu-wrap">
      <nav className="abt-menu" aria-label="On this page">
        <ul ref={rail}>
          {MENU.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} aria-current={on === id ? "true" : undefined}>{label}</a></li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

/* ═════════════ 3 · STORY ═════════════ */

const CH_LABEL = ["Who I am", "What I do", "What I build", "What I enjoy"];

export function AbStory() {
  const lines = ABOUT.lines;
  const where = real(LOOKING_FOR.location), when = real(LOOKING_FOR.availability);
  const rows = ([["Where", where], ["Availability", when]] as [string, string | undefined][]).filter((r): r is [string, string] => !!r[1]);
  const p = site.person;
  return (
    <section id="story" className="abt-sec abt-white">
      <div className="abt-wrap">
        <Head label="My story" title="A little about me" text="Design thinking and visual craft, with the ability to build." />
        <div className="abt-story">
          <Rise className="abt-story-main">
            <p className="abt-statement">{site.bio.positioning}</p>
            <p className="abt-body">{site.bio.body}</p>
            <ul className="abt-who" aria-label="Who I help">
              {site.whoIHelp.map((w) => <li key={w}>{w}</li>)}
            </ul>
          </Rise>

          <Rise className="abt-lf" i={1}>
            <h3>What I’m looking for</h3>
            <p className="abt-lf-lead">{real(LOOKING_FOR.role) ?? site.availabilityNote}</p>
            {rows.length > 0 && <dl>{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
            <div className="abt-lf-acts">
              <a className="abt-btn solid" href={`mailto:${p.email}`}>Email me <b aria-hidden>↗</b></a>
              <a className="abt-btn light" href={p.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </Rise>
        </div>

        <ol className="abt-quick" aria-label="In short">
          {lines.map((t, i) => (
            <Rise as="li" key={i} i={i}>
              <span>{pad(i + 1)} · {CH_LABEL[i] ?? "More"}</span>
              <p>{t}</p>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ═════════════ 4 · SERVICES ═════════════ */

const ICONS = [
  <svg key="a" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="10" width="34" height="26" rx="4" /><rect x="22" y="28" width="34" height="26" rx="4" /><path d="M29 38h20M29 45h12" /></svg>,
  <svg key="b" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="22" cy="22" r="13" /><rect x="30" y="30" width="26" height="26" rx="3" /><path d="m12 56 10-17 10 17z" /></svg>,
  <svg key="c" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="11" width="50" height="42" rx="5" /><path d="M7 22h50" /><path d="M16 32h14v14H16zM36 32h12M36 39h12M36 46h8" /></svg>,
  <svg key="d" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 20 10 32l12 12M42 20l12 12-12 12" /><path d="M36 14 28 50" /></svg>,
];

export function AbServices() {
  const hrefOf = (s: (typeof site.services)[number]) =>
    (s as { href?: string }).href === "#builds" ? "/projects/websites" : s.mode === "graphic" ? "/projects/graphic-design" : "/projects/ui-ux";
  const main = site.services.slice(0, 2), more = site.services.slice(2);
  return (
    <section id="services" className="abt-sec abt-tint">
      <div className="abt-wrap">
        <Head label="What I do" title="How I can help" text="Product UI/UX and graphic design are what I do best. Websites come on top, when you need the design built." />
        <ul className="abt-svc">
          {main.map((s, i) => (
            <Rise as="li" key={s.title} i={i} className="abt-svc-card">
              <span className="abt-svc-ico" aria-hidden>{ICONS[i]}</span>
              <h3>{s.title}</h3>
              <p>{s.blurb}</p>
              <ul className="abt-tags" aria-label="Includes">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              <Link className="abt-link" href={hrefOf(s)}>See the work <b aria-hidden>↗</b></Link>
            </Rise>
          ))}
        </ul>

        <h3 className="abt-sub">And when you need it live</h3>
        <ul className="abt-svc abt-svc-more">
          {more.map((s, i) => (
            <Rise as="li" key={s.title} i={i} className="abt-svc-card sm">
              <span className="abt-svc-ico" aria-hidden>{ICONS[i + 2]}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
                <Link className="abt-link" href={hrefOf(s)}>See the work <b aria-hidden>↗</b></Link>
              </div>
            </Rise>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═════════════ 5 · PROCESS ═════════════ */

export function AbProcess() {
  return (
    <section id="process" className="abt-sec abt-white">
      <div className="abt-wrap">
        <Head label="How I work" title="From a rough brief to design that works" text="Five simple steps, so you always know what happens next." />
        <ol className="abt-steps">
          {site.process.map((s, i) => (
            <Rise as="li" key={s.title} i={i}>
              <span className="abt-step-n" aria-hidden>{pad(i + 1)}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ═════════════ 7 · SKILLS & TOOLS ═════════════ */

export { AbSkills } from "./SkillsShowcase";

/* ═════════════ 8 · EDUCATION + CERTIFICATES ═════════════ */

export function AbLearning() {
  const edu = site.education, certs = site.certifications;
  return (
    <section id="learning" className="abt-sec abt-tint">
      <div className="abt-wrap">
        <Head label="Education & certificates" title="Where I studied and what I’ve learned" text="My degree and the courses I’ve completed along the way." />

        <h3 className="abt-sub" id="education">Education</h3>
        <ol className="abt-edu">
          {edu.map((e, i) => (
            <Rise as="li" key={e.school} i={i} className={i === 0 ? "abt-edu-card main" : "abt-edu-card"}>
              <span className="abt-edu-p">{e.period}</span>
              <h4>{e.program}</h4>
              <p>{e.school}</p>
            </Rise>
          ))}
        </ol>

        <div className="abt-sub-row" id="certifications">
          <h3 className="abt-sub">Certifications</h3>
          <span className="abt-count"><Count to={certs.length} /> completed</span>
        </div>
        <CertGallery certs={certs} />
      </div>
    </section>
  );
}
