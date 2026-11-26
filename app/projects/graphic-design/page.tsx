import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import { MoreCategories } from "@/components/sections/Projects";
import ProjectBrowser from "@/components/projects/ProjectBrowser";
import { graphicGroups } from "@/lib/projectGroups";

export const metadata: Metadata = pageMeta({
  title: "Graphic Design Projects",
  description: "Graphic design and visual branding by Bittu Rai: brand identity, social media posts and stories, posters, website banners and print.",
  path: "/projects/graphic-design",
});

export default function Page() {
  const groups = graphicGroups();
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: "Graphic Design" }]}
        size="md"
        title="Graphic Design Projects"
        lede="Every style of graphic work in its own section: brand identity, social media, posters, banners and print. Search, or jump to a style."
        stats={[{ label: "Projects", value: String(total) }, { label: "Sections", value: String(groups.length) }]}
      />
      <ProjectBrowser groups={groups} placeholder="Search brand, story, poster…" />
      <MoreCategories current="graphic" tone="dark" />
      <CtaBand />
    </>
  );
}
