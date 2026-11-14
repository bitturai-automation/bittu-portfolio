import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/motion/Reveal";
import { ContactAside, ContactChannels } from "@/components/sections/Contact";
import { site } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Contact Bittu Rai about a full-time role or a freelance project: email, WhatsApp, phone, Behance and LinkedIn.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} title="Let’s talk" lede="Tell me about your product, brand, role or idea. I’ll reply by email or WhatsApp.">
        <Reveal as="p" className="s-avail ph-avail" y={14} delay={0.3}><i aria-hidden />{site.availabilityNote}</Reveal>
      </PageHero>
      <section id="message" className="sec paper ct-sec nohead">
        <div className="ct-grid ct-solo">
          <ContactAside />
        </div>
      </section>
      <ContactChannels n="02" />
    </>
  );
}
