import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import ProjectsExplorer from "@/components/sections/ProjectsExplorer";
import { UiuxSection, WebSection } from "@/components/sections/Showcase";
import { GraphicSection } from "@/components/sections/Work";
import { projects } from "@/lib/data";
import { PROJECT_CATS } from "@/lib/routes";

export const metadata: Metadata = pageMeta({
  title: "Projects",
  description: "Selected work by Bittu Rai: mobile app and website UI/UX, brand and social media design, and live websites. Filter by type.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        reveal
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        title="Selected work"
        lede="Product interfaces, brand visuals and live websites. Scroll through each discipline, or jump straight to one."
        stats={[{ label: "Projects", value: String(projects.length) }, ...PROJECT_CATS.map((c) => ({ label: c.short, value: String(c.items.length) }))]}
        links={PROJECT_CATS.map((c) => ({ label: c.title, href: c.href }))}
      />
      {/* colour rhythm: hero dark -> UI/UX light -> Graphic dark -> Websites light -> CTA accent */}
      <ProjectsExplorer>
        <UiuxSection tone="paper" />
        <GraphicSection tone="dark" />
        <WebSection tone="paper" />
      </ProjectsExplorer>
      <CtaBand />
    </>
  );
}
