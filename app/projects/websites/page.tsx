import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import { MoreCategories } from "@/components/sections/Projects";
import ProjectBrowser from "@/components/projects/ProjectBrowser";
import { webGroups } from "@/lib/projectGroups";

export const metadata: Metadata = pageMeta({
  title: "Website Projects",
  description: "Live websites designed and built by Bittu Rai with HTML, CSS and AI-assisted workflows. Open any project and visit the real site.",
  path: "/projects/websites",
});

export default function Page() {
  const groups = webGroups();
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: "Websites" }]}
        size="md"
        title="Website Projects"
        lede="Designed in Figma, built with HTML, CSS and AI-assisted workflows. Open a project to see its details and visit the live site."
        stats={[{ label: "Projects", value: String(total) }, { label: "Sections", value: String(groups.length) }]}
      />
      <ProjectBrowser groups={groups} placeholder="Search shop, NGO, fintech…" />
      <MoreCategories current="web" tone="dark" />
      <CtaBand />
    </>
  );
}
