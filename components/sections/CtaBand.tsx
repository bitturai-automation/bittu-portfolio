"use client";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Curtain, Magnetic, Split } from "@/components/motion/Type";
import { CopyEmail } from "@/components/sections/Contact";
import ResumeChooser from "@/components/ui/ResumeChooser";
import { SITE_URL, site } from "@/lib/data";

/** Closing call-to-action shown at the end of Home, About and Projects. */
export default function CtaBand({ title = "Let’s design something meaningful." }: { title?: string }) {
  const p = site.person;
  return (
    <Curtain id="cta" className="sec accent contact f-sec cta-sec">
      <div className="f-top">
        <Reveal as="p" className="f-avail" y={16} delay={0.1}><i aria-hidden />{site.availabilityNote}</Reveal>
      </div>
      <div className="f-hero">
        <Split text={title} className="big f-big" />
        <Reveal y={0} scale={0.7} delay={0.2} duration={0.9} className="f-orb-wrap">
          <Magnetic strength={0.25}>
            <Link className="s-orb" href="/contact" data-cursor="Contact"><span>Start a<br />project</span><b aria-hidden>↗</b></Link>
          </Magnetic>
        </Reveal>
      </div>
      <Reveal className="cta-acts" y={24}>
        <a className="pill dark-pill" href={`mailto:${p.email}`}><span>{p.email}</span><b aria-hidden>↗</b></a>
        <CopyEmail email={p.email} />
        <ResumeChooser variant="outline" label="Get my resume" />
      </Reveal>
      <Reveal className="cta-url" y={16}><p>My portfolio: <a href={SITE_URL}>{p.portfolio}</a></p></Reveal>
    </Curtain>
  );
}
