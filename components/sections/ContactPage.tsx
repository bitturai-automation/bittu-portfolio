"use client";
/**
 * Contact page (v3, "clear & friendly").
 * A short message composer that opens WhatsApp with the message already written
 * (the site has no backend, so nothing is stored or sent from here), plus every other way to reach me.
 * Classes start with cnt- and live in styles/contact-v3.css.
 */
import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import ResumeChooser from "@/components/ui/ResumeChooser";
import { EASE, SITE_URL, isTodo, site } from "@/lib/data";

const p = site.person;
const handle = (u: string) => { try { return new URL(u).pathname.replace(/^\/|\/$/g, ""); } catch { return u; } };
const SOC = ([["LinkedIn", p.socials.linkedin], ["Behance", p.socials.behance], ["Instagram", p.socials.instagram], ["GitHub", p.socials.github]] as [string, string][])
  .filter(([, u]) => !isTodo(u));

function Rise({ children, i = 0, className }: { children: React.ReactNode; i?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.08, ease: EASE }}>
      {children}
    </motion.div>
  );
}

/* ═════════════ HERO ═════════════ */
export function CntHero() {
  return (
    <section id="top" className="cnt-hero">
      <nav className="cnt-crumbs" aria-label="Breadcrumb">
        <ol><li><Link href="/">Home</Link></li><li><span aria-current="page">Contact</span></li></ol>
      </nav>
      <div className="cnt-hero-in">
        <motion.p className="cnt-chip" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <i aria-hidden />{site.availabilityNote}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: EASE }}>
          Let’s <span>talk.</span>
        </motion.h1>
        <motion.p className="cnt-lede" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.16, ease: EASE }}>
          Tell me about your product, brand, role or idea. Write it below and send it on WhatsApp. I’ll reply there as soon as I can.
        </motion.p>
      </div>
    </section>
  );
}

/* ═════════════ COMPOSER + QUICK WAYS ═════════════ */
const TOPICS = ["Product UI/UX design", "Graphic design & branding", "Website / landing page", "Full-time role", "Something else"];

function Composer() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState<{ name?: string; msg?: string }>({});

  const text = () => `Hi Bittu, I’m ${name.trim()}. I’m getting in touch about: ${topic}.\n\n${msg.trim()}`;
  const check = () => {
    const e: typeof err = {};
    if (!name.trim()) e.name = "Please add your name.";
    if (msg.trim().length < 10) e.msg = "A line or two about your project helps me reply properly.";
    setErr(e);
    return !e.name && !e.msg;
  };
  const whatsapp = () => { if (check()) window.open(`${p.whatsapp}?text=${encodeURIComponent(text())}`, "_blank", "noopener,noreferrer"); };

  return (
    <form className="cnt-card cnt-form" onSubmit={(e) => e.preventDefault()} noValidate aria-labelledby="cnt-form-h">
      <h2 id="cnt-form-h">Send me a message</h2>
      <p className="cnt-form-sub">Takes a minute. Nothing is stored on this site: your message opens ready to send in WhatsApp.</p>

      <div className="cnt-field">
        <label htmlFor="cnt-name">Your name</label>
        <input id="cnt-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)}
          aria-invalid={!!err.name} aria-describedby={err.name ? "cnt-name-e" : undefined} placeholder="e.g. Aarav Sharma" />
        {err.name && <small id="cnt-name-e" className="cnt-err" role="alert">{err.name}</small>}
      </div>

      <fieldset className="cnt-field">
        <legend>What do you need?</legend>
        <div className="cnt-topics">
          {TOPICS.map((t) => (
            <label key={t} className={topic === t ? "on" : ""}>
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />{t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="cnt-field">
        <label htmlFor="cnt-msg">Your message</label>
        <textarea id="cnt-msg" name="message" rows={5} value={msg} onChange={(e) => setMsg(e.target.value)}
          aria-invalid={!!err.msg} aria-describedby={err.msg ? "cnt-msg-e" : "cnt-msg-h"}
          placeholder="What are you building or hiring for? Who is it for, and when do you need it?" />
        {err.msg ? <small id="cnt-msg-e" className="cnt-err" role="alert">{err.msg}</small> : <small id="cnt-msg-h" className="cnt-hint">Helpful to include: the goal, your timeline and any links.</small>}
      </div>

      <div className="cnt-send">
        <button type="button" className="cnt-btn wa" onClick={whatsapp}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden><path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.45 1.33-2 1.4-.52.07-1.17.1-1.9-.12a17 17 0 0 1-1.72-.64c-3.03-1.31-5-4.37-5.15-4.57-.15-.2-1.23-1.64-1.23-3.12s.78-2.21 1.05-2.51c.28-.3.6-.38.8-.38h.58c.19 0 .43-.07.67.5.25.6.84 2.06.91 2.2.07.16.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.53-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.05 1.13 1 2.09 1.31 2.39 1.46.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.74.82 2.04.97.3.15.5.22.57.35.08.12.08.72-.17 1.42Z" /></svg>
          Send on WhatsApp
        </button>
      </div>
    </form>
  );
}

function CopyRow() {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(p.email); }
    catch { const t = document.createElement("textarea"); t.value = p.email; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch {} t.remove(); }
    setDone(true); setTimeout(() => setDone(false), 2000);
  };
  return (
    <button type="button" className="cnt-copy" onClick={copy}>
      <span aria-hidden>{done ? "Copied ✓" : "Copy"}</span>
      <span className="sr" role="status">{done ? "Email address copied" : "Copy email address"}</span>
    </button>
  );
}

export function CntMain() {
  return (
    <section id="message" className="cnt-sec cnt-tint">
      <div className="cnt-wrap cnt-grid">
        <Rise><Composer /></Rise>

        <Rise i={1} className="cnt-side">
          <h2 className="cnt-side-h">Prefer to reach out directly?</h2>
          <ul className="cnt-quick">
            <li>
              <a className="cnt-q hot" href={p.whatsapp} target="_blank" rel="noopener noreferrer">
                <span className="cnt-q-l">WhatsApp</span><span className="cnt-q-v">Chat now</span><b aria-hidden>↗</b>
                <span className="sr"> (opens in new tab)</span>
              </a>
            </li>
            <li className="cnt-q-mail">
              <a className="cnt-q" href={`mailto:${p.email}`}>
                <span className="cnt-q-l">Email</span><span className="cnt-q-v">{p.email}</span><b aria-hidden>↗</b>
              </a>
              <CopyRow />
            </li>
            <li>
              <a className="cnt-q" href={p.phoneHref}>
                <span className="cnt-q-l">Call</span><span className="cnt-q-v">{p.phone}</span><b aria-hidden>↗</b>
              </a>
            </li>
          </ul>
          <div className="cnt-resume">
            <div><b>Hiring?</b><span>Pick the resume that fits the role.</span></div>
            <ResumeChooser variant="outline" label="Get my resume" />
          </div>
        </Rise>
      </div>
    </section>
  );
}

/* ═════════════ FIND ME ONLINE ═════════════ */
export function CntOnline() {
  return (
    <section id="channels" className="cnt-sec cnt-white">
      <div className="cnt-wrap">
        <header className="cnt-head">
          <p className="cnt-label"><i aria-hidden />Find me online</p>
          <h2>See my work and say hi</h2>
          <p>Pick whichever platform is easiest for you.</p>
        </header>
        <ul className="cnt-soc">
          {SOC.map(([label, href], i) => (
            <li key={label}>
              <Rise i={i}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <span className="cnt-soc-l">{label}</span><span className="cnt-soc-v">{handle(href)}</span><b aria-hidden>↗</b>
                  <span className="sr"> (opens in new tab)</span>
                </a>
              </Rise>
            </li>
          ))}
        </ul>
        <p className="cnt-url"><span>My portfolio</span><a href={SITE_URL}>{p.portfolio}</a></p>
      </div>
    </section>
  );
}
