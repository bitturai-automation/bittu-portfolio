"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Curtain, ScrollWords, SecHead, Split, useMedia } from "@/components/motion/Type";
import { EASE, SKILL_GROUPS, pad, site } from "@/lib/data";
import ExperienceCascade from "@/components/sections/ExperienceCascade";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { AboutLines, LookingFor, ProfilePhoto, SkillsGrid } from "@/components/sections/AboutIntro";

function Count({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  useEffect(() => {
    if (!on || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, { duration: 1.6, ease: EASE, onUpdate: (v) => (el.textContent = Math.round(v) + suffix) });
    return () => c.stop();
  }, [on, to, suffix]);
  return <b ref={ref as React.RefObject<HTMLElement>} className={className}>{to}{suffix}</b>;
}

/* ───────────────────────── 04 · About (dark) ───────────────────────── */
export function About({ head = true, preview = false, n = "01" }: { head?: boolean; preview?: boolean; n?: string } = {}) {
  const clients = site.stats.find((s) => s.label === "Clients");
  const years = site.stats.filter((s) => s.label !== "Clients").sort((a, b) => b.value - a.value);
  return (
    <section id="about" className={`sec dark s-about${head ? "" : " nohead"}`}>
      {head && <SecHead n={n} title="About" kicker="Design thinking, visual craft and branding, with the ability to build." />}
      <ScrollWords className="statement s-statement" text={site.bio.positioning} />

      <div className="s-ab">
        <Reveal className="s-ab-copy">
          <div className="ab-id">
            <ProfilePhoto />
            <AboutLines />
          </div>
          <LookingFor />
          {preview && <Link className="pill solid s-more" href="/about"><span>Read my full story</span><b aria-hidden>→</b></Link>}
        </Reveal>

        <div className="s-bento">
          {clients && (
            <Reveal className="s-tile s-tile-hero" y={40} scale={0.96}>
              <Count to={clients.value} suffix={clients.suffix} />
              <span>clients across startups, agencies and NGOs</span>
            </Reveal>
          )}
          {years.map((y, i) => (
            <Reveal className="s-tile" key={y.sub} y={40} scale={0.96} delay={0.08 + i * 0.08}>
              <Count to={y.value} suffix={y.suffix} />
              <em>{y.value === 1 ? "year" : "years"}</em>
              <span>{y.sub}</span>
            </Reveal>
          ))}
        </div>
      </div>

      {!preview && <div className="s-who">
        <ul>
          {site.whoIHelp.map((w, i) => (
            <Reveal as="li" key={w} y={34} delay={i * 0.07}><span>{w}</span><i aria-hidden>✦</i></Reveal>
          ))}
        </ul>
      </div>}
    </section>
  );
}

/* ───────────────────────── 05 · What I do (paper) — see WhatIDo.tsx ───────────────────────── */
export function Services({ n = "02" }: { n?: string } = {}) {
  return <WhatIDo n={n} />;
}

/* ───────────────────────── 06 · How I work (dark) ───────────────────────── */
function Step({ p, i, n, title, text }: { p: MotionValue<number>; i: number; n: number; title: string; text: string }) {
  const a = 0.05 + (i / (n - 1)) * 0.9;
  const lit = useTransform(p, [Math.max(0, a - 0.17), a], [0, 1]);
  const o = useTransform(lit, [0, 1], [0.3, 1]);
  const y = useTransform(lit, [0, 1], [22, 0]);
  const dot = useTransform(lit, [0, 1], ["rgba(255,255,255,.22)", "#FD6327"]);
  const sc = useTransform(lit, [0, 1], [0.65, 1]);
  return (
    <motion.li className="s-step" style={{ opacity: o, y }}>
      <motion.i className="s-dot" aria-hidden style={{ backgroundColor: dot, scale: sc }} />
      <span className="s-step-n" aria-hidden>{pad(i + 1)}</span>
      <b>{title}</b>
      <p>{text}</p>
    </motion.li>
  );
}

export function Process({ n: no = "03" }: { n?: string } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const vert = useMedia("(max-width:1000px)");
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.85", vert ? "end 0.6" : "start 0.3"] });
  const n = site.process.length;
  return (
    <section id="process" className="sec dark s-proc">
      <SecHead n={no} title="How I work" kicker="Five steps from a rough brief to design that works." count={n} />
      <div className="s-proc-wrap" ref={ref}>
        <div className="s-rail" aria-hidden><motion.i style={vert ? { scaleY: p } : { scaleX: p }} /></div>
        <ol className="s-steps">
          {site.process.map((s, i) => <Step key={s.title} p={p} i={i} n={n} title={s.title} text={s.text} />)}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── 07 · Experience (paper) ───────────────────────── */
export function Experience({ n = "04", preview = false }: { n?: string; preview?: boolean } = {}) {
  const all = site.experience;
  const cur = all.find((e) => e.note === "Present");
  const past = all.filter((e) => e !== cur);
  return (
    <Curtain id="experience" className="sec paper x-sec">
      <SecHead n={n} title="Experience" kicker="Where I’ve worked, and the design work I did there." count={all.length} />

      {preview ? (
        <ExperienceCascade items={all} />
      ) : cur && (
        <Reveal className="x-now" y={48} duration={0.9}>
          <div className="x-now-l">
            <span className="x-badge"><i aria-hidden />Present</span>
            <h3>{cur.role}</h3>
            <p className="x-org">{cur.org}</p>
            <span className="x-when">{[cur.year, cur.type].filter(Boolean).join(" · ")}</span>
          </div>
          <ol className="x-now-pts">
            {cur.bullets.map((b, i) => <li key={b}><span aria-hidden>{pad(i + 1)}</span>{b}</li>)}
          </ol>
        </Reveal>
      )}

      {preview ? (
        <Reveal className="x-more" y={24}><Link className="pill dark-pill" href="/about#experience"><span>See full experience · {all.length} roles</span><b aria-hidden>→</b></Link></Reveal>
      ) : (
      <ol className="x-line" aria-label="Earlier roles">
        {past.map((e) => (
          <Reveal as="li" key={e.org} className="x-item" y={40} duration={0.8}>
            <div className="x-date">
              <b>{e.year}</b>
              {e.type && <span>{e.type}</span>}
            </div>
            <i className="x-dot" aria-hidden />
            <div className="x-card">
              <header>
                <h3>{e.role}</h3>
                <p>{e.org}</p>
              </header>
              <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </ol>
      )}
    </Curtain>
  );
}

/* ───────────────────────── 08 · Skills & tools (dark) ───────────────────────── */
export function Skills({ n = "05", tone = "dark" }: { n?: string; tone?: "dark" | "paper" } = {}) {
  const total = SKILL_GROUPS.reduce((k, g) => k + g.items.length, 0);
  return (
    <section id="skills" className={`sec ${tone} s-sk`}>
      <SecHead n={n} title="Skills & tools" kicker="Design, the tools I use, and what I can build." count={total} />
      <SkillsGrid />
    </section>
  );
}

/* ───────────────────────── 09 · Education (paper) ───────────────────────── */
export function Education({ n = "06" }: { n?: string } = {}) {
  return (
    <Curtain id="education" className="sec paper s-edu">
      <SecHead n={n} title="Education" kicker="Where I studied." count={site.education.length} />
      <ol className="s-edu-grid">
        {site.education.map((e, i) => (
          <Reveal as="li" key={e.school} className={`s-edu-card${i === 0 ? " feat" : ""}`} y={50} delay={i * 0.1} duration={0.85}>
            <span className="s-edu-p">{e.period}</span>
            <div><h3>{e.program}</h3><p>{e.school}</p></div>
          </Reveal>
        ))}
      </ol>
    </Curtain>
  );
}

/* ───────────────────────── 10 · Certifications (dark) ───────────────────────── */
export function Certifications({ n: no = "07" }: { n?: string } = {}) {
  const n = site.certifications.length;
  return (
    <section id="certifications" className="sec dark s-cert">
      <SecHead n={no} title="Certifications" kicker="Courses and simulations I've completed." count={n} />
      <ul className="s-cert-grid">
        {site.certifications.map((c, i) => (
          <Reveal as="li" key={c.title} className="s-cert-card" y={40} scale={0.97} delay={(i % 4) * 0.08}>
            <span className="s-cert-n" aria-hidden>{pad(i + 1)}</span>
            <h3>{c.title}</h3>
            {c.org && <span className="s-cert-org">{c.org}</span>}
          </Reveal>
        ))}
        <Reveal as="li" className="s-cert-card total" y={40} scale={0.97} delay={0.24}>
          <Count to={n} />
          <span>certificates</span>
        </Reveal>
      </ul>
    </section>
  );
}

/* ───────────────────────── 11 · Brands (paper) ───────────────────────── */
export function Brands({ n = "08", limit, marquee = false }: { n?: string; limit?: number; marquee?: boolean } = {}) {
  /* Home: every logo drifts past on two rows (opposite directions), pausing under the pointer; one copy of each row is repeated so the loop never jumps */
  if (marquee) {
    const half = Math.ceil(site.brands.length / 2);
    const rows = [site.brands.slice(0, half), site.brands.slice(half)];
    return (
      <section id="brands" className="sec paper s-br s-br-m">
        <SecHead n={n} title="Brands I’ve worked with" kicker="A selection of the clients behind the work." count={site.brands.length} />
        <Reveal className="bm" y={24}>
          {rows.map((row, r) => (
            <div className="bm-row" data-dir={r ? "r" : "l"} style={{ "--dur": `${row.length * 3.4}s` } as React.CSSProperties} key={r}>
              <ul className="bm-track" aria-label={r ? undefined : "Client brand logos"}>
                {[0, 1].flatMap((copy) => row.map((b, k) => (
                  <li key={`${copy}-${b}`} className={copy ? "dup" : undefined} aria-hidden={copy ? true : undefined}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/${b.replace(/^assets\//, "")}`} alt={copy ? "" : `Client brand logo ${(r ? half : 0) + k + 1}`} width={425} height={213} loading="lazy" decoding="async" draggable={false} />
                  </li>
                )))}
              </ul>
            </div>
          ))}
        </Reveal>
      </section>
    );
  }
  const list = limit ? site.brands.slice(0, limit) : site.brands;
  return (
    <section id="brands" className="sec paper s-br">
      <SecHead n={n} title="Brands I’ve worked with" kicker="A selection of the clients behind the work." count={site.brands.length} />
      <ul className="br-grid">
        {list.map((b, i) => (
          <Reveal as="li" key={b} scale={0.82} y={22} duration={0.6} delay={(i % 7) * 0.06}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/${b.replace(/^assets\//, "")}`} alt={`Client brand logo ${i + 1}`} width={425} height={213} loading="lazy" decoding="async" /></Reveal>
        ))}
      </ul>
      {limit && <Reveal className="br-more" y={20}><Link className="pill dark-pill" href="/about#brands"><span>See all {site.brands.length} brands</span><b aria-hidden>→</b></Link></Reveal>}
    </section>
  );
}
