"use client";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { SecHead } from "@/components/motion/Type";
import ResumeChooser from "@/components/ui/ResumeChooser";
import { SITE_URL, isTodo, site } from "@/lib/data";

const p = site.person;
const SOC = ([["LinkedIn", p.socials.linkedin], ["Behance", p.socials.behance], ["Instagram", p.socials.instagram], ["GitHub", p.socials.github]] as [string, string][]).filter(([, u]) => !isTodo(u));
const handle = (u: string) => { try { return new URL(u).pathname.replace(/^\/|\/$/g, ""); } catch { return u; } };

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

export function ContactAside() {
  return (
    <Reveal className="f-panel ca" y={40}>
      <div className="f-mail">
        <span className="f-lab">Write to me</span>
        <a className="f-email" href={`mailto:${p.email}`} data-cursor="Email">{p.email}<span aria-hidden> ↗</span></a>
        <p className="ca-line">Call <a href={p.phoneHref}>{p.phone}</a></p>
        <p className="f-avail"><i aria-hidden />{site.availabilityNote}</p>
        <div className="f-acts"><CopyEmail email={p.email} /><ResumeChooser /></div>
      </div>
    </Reveal>
  );
}

export function ContactChannels({ n = "02" }: { n?: string }) {
  const channels: { label: string; value: string; href: string; ext?: boolean }[] = [
    { label: "WhatsApp", value: "Chat now", href: p.whatsapp, ext: true },
    { label: "Call", value: p.phone, href: p.phoneHref },
    ...SOC.map(([label, href]) => ({ label, value: handle(href), href, ext: true })),
  ];
  return (
    <section id="channels" className="sec dark ct-chan">
      <SecHead n={n} title="Find me online" kicker="Pick whichever is easiest for you." count={channels.length} />
      <ul className="f-grid">
        {channels.map((c) => (
          <li key={c.label}>
            <a href={c.href} {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} data-cursor="Open">
              <span className="f-l">{c.label}</span><span className="f-v">{c.value}</span><b aria-hidden>↗</b>
              {c.ext && <span className="sr"> (opens in new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
      <p className="ct-url">
        <span>My portfolio</span>
        <a href={SITE_URL} data-cursor="Open">{p.portfolio}</a>
      </p>
    </section>
  );
}
