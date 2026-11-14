import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import CtaBand from "@/components/sections/CtaBand";
import { Brands } from "@/components/sections/About";
import { ApHero, ApStory, ApServices, ApProcess, ApExperience, ApSkills, ApLearning } from "@/components/sections/AboutPage";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: "About Bittu Rai: a Product UI/UX Designer and Graphic Designer who also builds websites. Story, experience, skills and what I’m looking for.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <ApHero />
      {/* colour rhythm: Hero D, Story L, Services D, Experience L, Process D, Skills L, Learning D, Brands L, CTA accent */}
      <ApStory />
      <ApServices />
      <ApExperience />
      <ApProcess />
      <ApSkills />
      <ApLearning />
      <Brands n="07" marquee />
      <CtaBand />
    </>
  );
}
