import type { Metadata } from "next";
import { pageMeta, SITE_DESC, SITE_TITLE } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import HomeContact from "@/components/sections/HomeContact";
import HomeProjects from "@/components/sections/HomeProjects";
import ExperienceNotes from "@/components/sections/ExperienceNotes";
import { About, Services, Education } from "@/components/sections/About";
import { AbSkills } from "@/components/sections/SkillsShowcase";
import CertMarquee from "@/components/sections/CertMarquee";

export const metadata: Metadata = { ...pageMeta({ description: SITE_DESC, path: "/" }), title: { absolute: SITE_TITLE } };

/**
 * Home, in this order (the footer is added by the layout):
 *  1 Hero · 2 Services · 3 About · Projects · Experience · Skills & tools (same cards as the About page) · 6 Academic · 7 Pricing · 8 Testimonials · 9 FAQ · 10 Contact
 * Projects = one simple section: heading, paragraph, filter options, then cards (UI/UX → Graphic → Web Development).
 * Not on Home any more (components still exist): Audience, Brands, CtaBand.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Services n="02" />
      <About n="03" preview />
      <HomeProjects />
      <ExperienceNotes />
      <AbSkills />
      <Education n="06" />
      <CertMarquee />
      <Pricing />
      <Testimonials no="08" />
      <Faq />
      <HomeContact />
    </>
  );
}
