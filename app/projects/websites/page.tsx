import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import { MoreCategories } from "@/components/sections/Projects";
import ProjectStack from "@/components/sections/ProjectStack";
import { PROJECT_CATS } from "@/lib/routes";

export const metadata: Metadata = pageMeta({
  title: "Website Projects",
  description: "Live websites designed in Figma and built by Bittu Rai with HTML, CSS and AI-assisted workflows. Open any of them in a new tab.",
  path: "/projects/websites",
});

const cat = PROJECT_CATS.find((c) => c.key === "web")!;

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: "Websites" }]}
        title="Website Projects"
        lede="Designed in Figma, built with HTML, CSS and AI-assisted workflows. Click any project to see its details and visit the live site."
        stats={[{ label: "Projects", value: String(cat.items.length) }]}
      />
      <ProjectStack cat={cat} tone="paper" />
      <MoreCategories current="web" tone="dark" />
      <CtaBand />
    </>
  );
}
