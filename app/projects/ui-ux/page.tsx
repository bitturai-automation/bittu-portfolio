import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import { MoreCategories } from "@/components/sections/Projects";
import ProjectStack from "@/components/sections/ProjectStack";
import { PROJECT_CATS } from "@/lib/routes";

export const metadata: Metadata = pageMeta({
  title: "UI/UX Projects",
  description: "Product UI/UX case studies by Bittu Rai: mobile apps and websites, from user flows to high-fidelity UI. Client work, concepts and demos are labelled.",
  path: "/projects/ui-ux",
});

const cat = PROJECT_CATS.find((c) => c.key === "uiux")!;

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: "UI/UX" }]}
        title="UI/UX Projects"
        lede="Product interfaces for web and mobile. Click any project to see the challenge, approach and outcome."
        stats={[{ label: "Projects", value: String(cat.items.length) }]}
      />
      <ProjectStack cat={cat} tone="paper" />
      <MoreCategories current="uiux" tone="dark" />
      <CtaBand />
    </>
  );
}
