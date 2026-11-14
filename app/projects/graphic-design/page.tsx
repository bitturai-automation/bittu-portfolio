import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import { MoreCategories } from "@/components/sections/Projects";
import ProjectStack from "@/components/sections/ProjectStack";
import { PROJECT_CATS } from "@/lib/routes";

export const metadata: Metadata = pageMeta({
  title: "Graphic Design Projects",
  description: "Graphic design and visual branding by Bittu Rai: brand identity, social media, posters, banners and print.",
  path: "/projects/graphic-design",
});

const cat = PROJECT_CATS.find((c) => c.key === "graphic")!;

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: "Graphic Design" }]}
        title="Graphic Design Projects"
        lede="Brand identity, social media, posters and print. Click any project to see its details."
        stats={[{ label: "Projects", value: String(cat.items.length) }]}
      />
      <ProjectStack cat={cat} tone="paper" />
      <MoreCategories current="graphic" tone="dark" />
      <CtaBand />
    </>
  );
}
