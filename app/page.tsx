import type { Metadata } from "next";
import { pageMeta, SITE_DESC, SITE_TITLE } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import Audience from "@/components/sections/Audience";
import Testimonials from "@/components/sections/Testimonials";
import CtaBand from "@/components/sections/CtaBand";
import { FeaturedWork } from "@/components/sections/Projects";
import { About, Services, Experience, Brands } from "@/components/sections/About";

export const metadata: Metadata = { ...pageMeta({ description: SITE_DESC, path: "/" }), title: { absolute: SITE_TITLE } };

/** Home: the first screen already shows real projects; below it, a short demo of every other page with links to the full versions. */
export default function Home() {
  return (
    <>
      <Hero />
      <Audience />
      <FeaturedWork n={1} />
      {/* colour rhythm: dark / light alternate all the way down (Hero D, Audience L, UI/UX D, Graphic L, Web D, Services L, About D, Experience L, Testimonials D, Brands L, CTA accent) */}
      <Services n="04" />
      <About n="05" preview />
      <Experience n="06" preview />
      <Testimonials no="07" />
      <Brands n="08" marquee />
      <CtaBand />
    </>
  );
}
