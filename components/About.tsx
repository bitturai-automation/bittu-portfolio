"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import Reveal from "./Reveal";
import { Curtain, ScrollWords, SecHead, Split, useMedia } from "./Type";
import { EASE, pad, site, toolIcon } from "@/lib/data";

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
export function About() {
  const clients = site.stats.find((s) => s.label === "Clients");
  const years = site.stats.filter((s) => s.label !== "Clients").sort((a, b) => b.value - a.value);
  return (
    <section id="about" className="sec dark s-about">
      <SecHead n="04" title="About" kicker="Design thinking, visual craft and the ability to build it." />
      <ScrollWords className="statement s-statement" text={site.bio.positioning} />

      <div className="s-ab">
        <Reveal className="s-ab-copy">
          <p>{site.bio.body}</p>
          <p className="s-avail"><i aria-hidden />{site.availabilityNote}</p>
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

      <div className="s-who">
        <Reveal as="p" className="eyebrow" y={14}>Who I help</Reveal>
        <ul>
          {site.whoIHelp.map((w, i) => (
            <Reveal as="li" key={w} y={34} delay={i * 0.07}><span>{w}</span><i aria-hidden>✦</i></Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── 05 · What I do (paper) ───────────────────────── */
type Service = (typeof site.services)[number] & { href?: string };

function ServiceRow({ s, i, open, toggle }: { s: Service; i: number; open: boolean; toggle: () => void }) {
  const id = `svc-panel-${i}`;
  const href = s.href ?? (s.mode === "graphic" ? "#brand" : "#work");
  return (
    <Reveal as="li" className={`s-svc-row${open ? " on" : ""}`} y={36} delay={i * 0.06}>
      <button type="button" className="s-svc-btn" aria-expanded={open} aria-controls={id} onClick={toggle} data-cursor={open ? "Close" : "Open"}>
        <span className="s-svc-n">{pad(i + 1)}</span>
        <span className="s-svc-t">{s.title}</span>
        <i className="s-svc-i" aria-hidden />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={id} role="region" aria-label={s.title} className="s-svc-panel" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease: EASE }}>
            <div className="s-svc-in">
              <p>{s.blurb}</p>
              <div>
                <ul className="s-tags" aria-label={`${s.title} focus areas`}>{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <a className="s-link" href={href}>See the work <b aria-hidden>→</b></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

export function Services() {
  const [open, setOpen] = useState(0);
  return (
    <Curtain id="services" className="sec paper s-svc">
      <SecHead n="05" title="What I do" kicker="Four ways I can help. Pick one, or combine them." count={site.services.length} />
      <ul className="s-svc-list">
        {site.services.map((s, i) => <ServiceRow key={s.title} s={s as Service} i={i} open={open === i} toggle={() => setOpen(open === i ? -1 : i)} />)}
      </ul>
    </Curtain>
  );
}

/* ───────────────────────── 06 · How I work (dark) ───────────────────────── */
function Step({ p, i, n, title, text }: { p: MotionValue<number>; i: number; n: number; title: string; text: string }) {
  const a = 0.05 + (i / (n - 1)) * 0.9;
  const lit = useTransform(p, [Math.max(0, a - 0.17), a], [0, 1]);
  const o = useTransform(lit, [0, 1], [0.3, 1]);
  const y = useTransform(lit, [0, 1], [22, 0]);
  const dot = useTransform(lit, [0, 1], ["rgba(239,234,223,.22)", "#fd5e20"]);
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

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const vert = useMedia("(max-width:1000px)");
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.85", vert ? "end 0.6" : "start 0.3"] });
  const n = site.process.length;
  return (
    <section id="process" className="sec dark s-proc">
      <SecHead n="06" title="How I work" kicker="Five steps from a messy brief to finished work." count={n} />
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
export function Experience() {
  return (
    <Curtain id="experience" className="sec paper s-xp">
      <SecHead n="07" title="Experience" kicker="Where I've worked, and what I did there." count={site.experience.length} />
      <ol className="s-xp-list">
        {site.experience.map((e, i) => {
          const now = e.note === "Present";
          return (
            <Reveal as="li" key={e.org} className={`s-xp-row${now ? " now" : ""}`} y={44} duration={0.85}>
              <span className="s-xp-n" aria-hidden>{pad(i + 1)}</span>
              <div className="s-xp-who">
                <h3>{e.role}</h3>
                <p>{e.org}</p>
                {e.note && <span className="s-xp-note"><i aria-hidden />{e.note}</span>}
              </div>
              <ul className="s-xp-pts">{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </Reveal>
          );
        })}
      </ol>
    </Curtain>
  );
}

/* ───────────────────────── 08 · Skills & tools (dark) ───────────────────────── */
export function Skills() {
  const total = site.skills.reduce((n, g) => n + g.items.length, 0);
  return (
    <section id="skills" className="sec dark s-sk">
      <SecHead n="08" title="Skills & tools" kicker="What I do well, and what I build it with." count={total} />
      <div className="s-sk-grid">
        {site.skills.map((g, gi) => (
          <Reveal className="s-sk-card" key={g.group} y={44} delay={gi * 0.1}>
            <header><span>{pad(gi + 1)}</span><h3>{g.group}</h3></header>
            <ul>{g.items.map((it, j) => <Reveal as="li" key={it} y={14} scale={0.88} duration={0.5} delay={0.15 + Math.min(j, 10) * 0.04}>{it}</Reveal>)}</ul>
          </Reveal>
        ))}
      </div>

      <div className="s-tools">
        {site.toolGroups.map((g) => (
          <div className="s-tools-row" key={g.group}>
            <Reveal as="h3" y={14} x={-14}>{g.group}</Reveal>
            <ul>
              {g.names.map((nm, i) => (
                <Reveal as="li" key={nm} scale={0.75} y={24} duration={0.55} delay={i * 0.05}>
                  {toolIcon(nm)
                    ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={`/${toolIcon(nm).replace(/^assets\//, "")}`} alt="" width={36} height={36} loading="lazy" />
                    : <span className="s-mono" aria-hidden>{nm[0]}</span>}
                  <span>{nm}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── 09 · Education (paper) ───────────────────────── */
export function Education() {
  return (
    <Curtain id="education" className="sec paper s-edu">
      <SecHead n="09" title="Education" kicker="Where I studied." count={site.education.length} />
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
export function Certifications() {
  const n = site.certifications.length;
  return (
    <section id="certifications" className="sec dark s-cert">
      <SecHead n="10" title="Certifications" kicker="Courses and simulations I've completed." count={n} />
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
export function Brands() {
  return (
    <section id="brands" className="sec paper s-br">
      <SecHead n="11" title="Brands I’ve worked with" kicker="A selection of the clients behind the work." count={site.brands.length} />
      <ul className="br-grid">
        {site.brands.map((b, i) => (
          <Reveal as="li" key={b} scale={0.82} y={22} duration={0.6} delay={(i % 7) * 0.06}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`/${b.replace(/^assets\//, "")}`} alt={`Client brand logo ${i + 1}`} width={425} height={213} loading="lazy" decoding="async" /></Reveal>
        ))}
      </ul>
    </section>
  );
}
