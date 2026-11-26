import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import ProjectBrowser from "@/components/projects/ProjectBrowser";
import { overviewGroups } from "@/lib/projectGroups";
import { projects } from "@/lib/data";

export const metadata: Metadata = pageMeta({
  title: "Projects",
  description: "Selected work by Bittu Rai: mobile app and website UI/UX, brand and social media design, and live websites. Search or jump to any type of work.",
  path: "/projects",
});

export default function ProjectsPage() {
  const groups = overviewGroups();
  return (
    <>
      <PageHero
        reveal
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        title="Selected work"
        lede="Product interfaces, brand visuals and live websites. Search for anything, or jump straight to the kind of work you want to see."
        stats={[{ label: "Projects", value: String(projects.length) }, ...groups.map((g) => ({ label: g.chip, value: String(g.items.length) }))]}
      />
      <ProjectBrowser groups={groups} overview placeholder="Search all projects…" />
      <CtaBand />
    </>
  );
}
