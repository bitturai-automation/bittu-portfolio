"use client";
import Reveal from "@/components/motion/Reveal";
import { Curtain, Split } from "@/components/motion/Type";
import { CopyEmail } from "@/components/sections/Contact";
import ResumeChooser from "@/components/ui/ResumeChooser";
import { isTodo, site } from "@/lib/data";

const handle = (u: string) => { try { return new URL(u).pathname.replace(/^\/|\/$/g, ""); } catch { return u; } };

/** Home · Contact: one big headline, then every way to reach me in a single card. */
export default function HomeContact() {
  const p = site.person;
  const rows: { label: string; value: string; href: string; ext?: boolean }[] = [
    { label: "Email", value: p.email, href: `mailto:${p.email}` },
    { label: "WhatsApp", value: "Chat now", href: p.whatsapp, ext: true },
    { label: "Call", value: p.phone, href: p.phoneHref },
    ...([["LinkedIn", p.socials.linkedin], ["Behance", p.socials.behance], ["Instagram", p.socials.instagram], ["GitHub", p.socials.github]] as [string, string][])
      .filter(([, u]) => !isTodo(u)).map(([label, href]) => ({ label, value: handle(href), href, ext: true })),
  ];
  return (
    <Curtain id="contact" className="sec accent hc-sec">
      <div className="hc-grid">
        <div className="hc-copy">
          <Reveal as="p" className="f-avail" y={14}><i aria-hidden />{site.availabilityNote}</Reveal>
          <Split text="Let’s design something meaningful." className="hc-big" />
          <Reveal as="p" className="hc-sub" y={18} delay={0.1}>Tell me about your product, brand, role or idea. I’ll reply by email or WhatsApp.</Reveal>
          <Reveal className="hc-acts" y={18} delay={0.15}>
            <a className="pill dark-pill" href={`mailto:${p.email}`}><span>Start a project</span><b aria-hidden>↗</b></a>
            <CopyEmail email={p.email} />
            <ResumeChooser variant="outline" label="Get my resume" />
          </Reveal>
        </div>
        <Reveal className="hc-card" y={40} delay={0.1}>
          <h2 className="hc-h">Contact</h2>
          <ul>
            {rows.map((r) => (
              <li key={r.label}>
                <a href={r.href} {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} data-cursor="Open">
                  <span className="hc-l">{r.label}</span><span className="hc-v">{r.value}</span><b aria-hidden>↗</b>
                  {r.ext && <span className="sr"> (opens in new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Curtain>
  );
}
