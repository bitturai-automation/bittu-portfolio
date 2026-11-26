import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import { MoreCategories } from "@/components/sections/Projects";
import ProjectBrowser from "@/components/projects/ProjectBrowser";
import { uiuxGroups } from "@/lib/projectGroups";

export const metadata: Metadata = pageMeta({
  title: "UI/UX Projects",
  description: "Product UI/UX case studies by Bittu Rai: mobile apps, websites and desktop apps, from user flows to high-fidelity UI. Client work, concepts and demos are labelled.",
  path: "/projects/ui-ux",
});

export default function Page() {
  const groups = uiuxGroups();
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: "UI/UX" }]}
        size="md"
        title="UI/UX Projects"
        lede="Product interfaces grouped by platform: mobile apps, websites and desktop apps. Open any project for the challenge, approach and outcome."
        stats={[{ label: "Projects", value: String(total) }, { label: "Sections", value: String(groups.length) }]}
      />
      <ProjectBrowser groups={groups} placeholder="Search app, website, concept…" />
      <MoreCategories current="uiux" tone="dark" />
      <CtaBand />
    </>
  );
}
