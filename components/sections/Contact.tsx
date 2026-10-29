"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { Curtain, Magnetic, Split } from "@/components/motion/Type";
import { EASE, site } from "@/lib/data";

const SOC = [["LinkedIn", site.person.socials.linkedin], ["Behance", site.person.socials.behance], ["Instagram", site.person.socials.instagram], ["GitHub", site.person.socials.github]];

const handle = (u: string) => { try { return new URL(u).pathname.replace(/^\/|\/$/g, ""); } catch { return u; } };

export default function Contact() {
  const p = site.person;
  const channels: { label: string; value: string; href: string; ext?: boolean }[] = [
    { label: "WhatsApp", value: "Chat now", href: p.whatsapp, ext: true },
    { label: "Call", value: p.phone, href: p.phoneHref },
    ...SOC.map(([label, href]) => ({ label, value: handle(href), href, ext: true })),
  ];
  return (
    <Curtain id="contact" className="sec accent contact s-ct">
      <Reveal><p className="eyebrow">Contact · Collaboration</p></Reveal>
      <Split text="Let’s make something clear and built." className="big" />

      <div className="s-ct-top">
        <Reveal as="p" className="s-ct-avail" y={20} delay={0.1}><i aria-hidden />{site.availabilityNote}</Reveal>
        <Reveal y={0} scale={0.7} delay={0.2} duration={0.9}>
          <Magnetic strength={0.25}><a className="s-orb" href={`mailto:${p.email}`} data-cursor="Email"><span>Start a<br />project</span><b aria-hidden>↗</b></a></Magnetic>
        </Reveal>
      </div>

      <Reveal className="mail-line s-ct-mail" y={34} delay={0.1}>
        <Magnetic strength={0.12}><a className="mail" href={`mailto:${p.email}`} data-cursor="Email">{p.email}<span aria-hidden> ↗</span></a></Magnetic>
        <CopyEmail email={p.email} />
      </Reveal>

      <ul className="s-ct-grid">
        {channels.map((c, i) => (
          <Reveal as="li" key={c.label} y={34} delay={(i % 3) * 0.08}>
            <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <span className="s-ct-l">{c.label}</span>
              <span className="s-ct-v">{c.value}</span>
              <b aria-hidden>↗</b>
              {c.ext && <span className="sr"> (opens in new tab)</span>}
            </a>
          </Reveal>
        ))}
      </ul>

      <Reveal className="cta-row" y={26} scale={0.94} delay={0.1}>
        <a className="pill dark-pill" href="/resume/bittu-rai-resume.pdf" download="Bittu-Rai-Resume.pdf"><span>Download resume</span><b aria-hidden>↓</b></a>
      </Reveal>
    </Curtain>
  );
}

const INDEX = [["Product & UI/UX", "work"], ["Websites", "builds"], ["Graphic & brand", "brand"], ["About", "about"], ["What I do", "services"], ["Experience", "experience"], ["Skills", "skills"], ["Education", "education"], ["Kind words", "words"], ["Contact", "contact"]];

/** One-tap copy with a visible + announced confirmation */
export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); }
    catch { const t = document.createElement("textarea"); t.value = email; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch {} t.remove(); }
    setDone(true); setTimeout(() => setDone(false), 2000);
  };
  return (
    <button type="button" className={`copy-btn ${done ? "done" : ""} ${className}`} onClick={copy} data-cursor="Copy">
      <span aria-hidden>{done ? "Copied ✓" : "Copy email"}</span>
      <span className="sr" role="status">{done ? "Email address copied" : "Copy email address"}</span>
    </button>
  );
}

/** Footer link row: label slides, arrow swaps in on hover */
function FLink({ href, children, ext }: { href: string; children: React.ReactNode; ext?: boolean }) {
  return (
    <a className="ft-link" href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span className="ft-lt">{children}</span>
      <b aria-hidden>{ext ? "↗" : "→"}</b>
      {ext && <span className="sr"> (opens in new tab)</span>}
    </a>
  );
}

/** Live Indian Standard Time — set after mount so SSR and client markup match */
function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
    const tick = () => setT(f.format(new Date()).toUpperCase());
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="ft-clock">{t || "—"} <small>IST</small></span>;
}

/** Back-to-top button wrapped in a ring that fills as the page is scrolled */
function TopButton() {
  const { scrollYProgress } = useScroll();
  const len = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <a className="ft-top" href="#top" aria-label="Back to top" data-cursor="Top">
      <svg viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="47" className="ft-ring" />
        <motion.circle cx="50" cy="50" r="47" className="ft-ring on" style={{ pathLength: len }} />
      </svg>
      <span aria-hidden>↑</span>
    </a>
  );
}

/** Giant wordmark: letters rise in one by one, then lift and warm to orange as the pointer passes near them */
function Wordmark() {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const text = site.person.name;
  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === "touch") return;
    letters.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2)) / (r.width * 2.2);
      el.style.setProperty("--p", String(Math.max(0, 1 - d).toFixed(3)));
    });
  };
  const leave = () => letters.current.forEach((el) => el?.style.setProperty("--p", "0"));
  return (
    <motion.div ref={box} className="ft-word" aria-label={text} role="img" onPointerMove={move} onPointerLeave={leave}
      initial="h" whileInView="v" viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ staggerChildren: 0.05 }}>
      {[...text].map((ch, i) => (
        <span key={i} className="ft-mask" aria-hidden>
          <motion.span data-reveal className="ft-l" variants={{ h: { y: "115%", rotate: 6 }, v: { y: 0, rotate: 0 } }} transition={{ duration: 0.95, ease: EASE }}>
            <span ref={(el) => { letters.current[i] = el; }} className="ft-lp">{ch === " " ? "\u00A0" : ch}</span>
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

export function Footer() {
  const p = site.person;
  return (
    <footer className="ft">
      <div className="ft-top-row">
        <div className="ft-status">
          <span className="ft-live" aria-hidden><i /></span>
          <span><b>Available for work</b><small>Open to Product Design, UI/UX, Vibe Coding &amp; AI-assisted design roles</small></span>
        </div>
        <TopButton />
      </div>

      <nav className="ft-cols" aria-label="Footer">
        <Reveal className="ft-col">
          <h3 className="ft-h">Index</h3>
          <ul>{INDEX.map(([n, id]) => <li key={id}><FLink href={`#${id}`}>{n}</FLink></li>)}</ul>
        </Reveal>
        <Reveal delay={0.08} className="ft-col">
          <h3 className="ft-h">Elsewhere</h3>
          <ul>{SOC.map(([n, h]) => <li key={n}><FLink href={h as string} ext>{n}</FLink></li>)}</ul>
        </Reveal>
        <Reveal delay={0.16} className="ft-col ft-say">
          <h3 className="ft-h">Say hello</h3>
          <ul>
            <li className="ft-mailrow"><FLink href={`mailto:${p.email}`}>{p.email}</FLink><CopyEmail email={p.email} className="sm" /></li>
            <li><FLink href={p.phoneHref}>{p.phone}</FLink></li>
            <li><FLink href={p.whatsapp} ext>WhatsApp</FLink></li>
            <li><FLink href="/resume/bittu-rai-resume.pdf">Résumé (PDF)</FLink></li>
          </ul>
        </Reveal>
        <Reveal delay={0.24} className="ft-col ft-where">
          <h3 className="ft-h">Based in</h3>
          <p className="ft-big">India</p>
          <Clock />
        </Reveal>
      </nav>

      <Wordmark />

      <div className="ft-base">
        <span>© {p.year} {p.name}</span>
        <span>{p.portfolio}</span>
        <span>Designed in Figma · Built with code &amp; AI</span>
      </div>
    </footer>
  );
}
