"use client";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import ResumeChooser from "@/components/ui/ResumeChooser";
import { site } from "@/lib/data";

/** "Start here": two clear paths so a founder and a recruiter each reach what they need in one click. */
export default function Audience() {
  const p = site.person;
  return (
    <section id="start" className="sec paper au" aria-labelledby="au-h">
      <Reveal as="h2" className="au-h" delay={0.05}><span id="au-h">What brings you by?</span></Reveal>
      <div className="au-grid">
        <Reveal className="au-card" delay={0.1}>
          <span className="au-tag">For founders &amp; teams</span>
          <h3>I need a product designed or a brand built.</h3>
          <ul>
            <li>Product UI/UX designed in Figma: flows, prototypes and developer-ready handoff</li>
            <li>Brand identity, social media and marketing creatives with one consistent visual voice</li>
            <li>Responsive websites designed and built, so the design reaches the live product intact</li>
          </ul>
          <div className="au-act">
            <a className="pill dark-pill" href={`mailto:${p.email}`}><span>Start a project</span><b aria-hidden>↗</b></a>
            <Link className="pill" href="/projects/ui-ux"><span>See UI/UX work</span><b aria-hidden>→</b></Link>
            <a className="au-quiet" href={p.whatsapp} target="_blank" rel="noopener noreferrer">or message on WhatsApp ↗<span className="sr"> (opens in new tab)</span></a>
          </div>
        </Reveal>
        <Reveal className="au-card au-alt" delay={0.18}>
          <span className="au-tag">For recruiters &amp; hiring managers</span>
          <h3>I’m hiring a designer.</h3>
          <ul>
            <li>Product UI/UX and graphic design: 2+ years in UI/UX, 4+ years in graphic design, plus website development</li>
            <li>Two resumes: UI/UX &amp; Product Designer, or Graphic Designer</li>
            <li>Work history, skills and certifications on the About page</li>
          </ul>
          <div className="au-act">
            <ResumeChooser label="Get my resume" />
            <Link className="pill" href="/about#experience"><span>See experience</span><b aria-hidden>→</b></Link>
            <a className="au-quiet" href={`mailto:${p.email}?subject=Role%20for%20Bittu%20Rai`}>or email me directly ↗</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
