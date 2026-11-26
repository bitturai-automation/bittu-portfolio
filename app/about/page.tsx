import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import ExperienceNotes from "@/components/sections/ExperienceNotes";
import CtaBand from "@/components/sections/CtaBand";
import { Brands } from "@/components/sections/About";
import { AbHero, AbMenu, AbStory, AbServices, AbProcess, AbSkills, AbLearning } from "@/components/sections/AboutPage";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: "About Bittu Rai: a Product UI/UX Designer and Graphic Designer who also builds websites. Story, experience, skills and what I’m looking for.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AbHero />
      <AbMenu />
      <AbStory />
      <AbServices />
      <AbProcess />
      <ExperienceNotes />
      <AbSkills />
      <AbLearning />
      <Brands n="07" marquee />
      <CtaBand />
    </>
  );
}
