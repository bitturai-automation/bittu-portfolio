import { graphic, projects, tagsOf, uiux, web, type Project } from "@/lib/data";
import { PROJECT_CATS } from "@/lib/routes";

/** Shape of one card in a section (picked per section so every kind of work is shown in its natural proportions). */
export type Layout = "brand" | "post" | "story" | "poster" | "banner" | "print" | "ui" | "web";

export type Group = {
  /** URL hash, e.g. /projects/graphic-design#g-stories */
  id: string;
  /** Full title shown as the section heading. */
  label: string;
  /** Short label for the sticky jump chips. */
  chip: string;
  blurb: string;
  layout: Layout;
  items: Project[];
  /** Overview page only: link to the full page of this section. */
  href?: string;
  /** Overview page only: the few cards shown while nobody is searching (a search always looks through `items`). */
  preview?: Project[];
  /** Overview page only: deep links into the full page (one per style / platform). */
  sub?: { label: string; href: string }[];
};

/* ───────────── Graphic design: one section per style ───────────── */
const GRAPHIC_STYLES: { match: string; id: string; label: string; chip: string; blurb: string; layout: Layout }[] = [
  { match: "Social Media Design — Post", id: "g-posts", label: "Social Media Posts", chip: "Posts", layout: "post",
    blurb: "Square and portrait posts made for a brand's social media feed." },
  { match: "Social Media Design — Story", id: "g-stories", label: "Social Media Stories", chip: "Stories", layout: "story",
    blurb: "Vertical 9:16 designs for Instagram and WhatsApp Stories." },
  { match: "Brand Identity", id: "g-brand", label: "Brand Identity", chip: "Brand identity", layout: "brand",
    blurb: "Logo, colours, typography and the visual system that makes a whole brand recognisable." },
  { match: "Posters & Banners", id: "g-posters", label: "Posters & Banners", chip: "Posters & banners", layout: "poster",
    blurb: "Event invitations, promo posters and large banners." },
  { match: "Website Banner Design", id: "g-web-banners", label: "Website Banners", chip: "Website banners", layout: "banner",
    blurb: "Hero banners for landing pages and online stores." },
  { match: "Printing Material", id: "g-print", label: "Print Material", chip: "Print", layout: "print",
    blurb: "Invitations, brochures and layouts prepared for print." },
];

export const graphicGroups = (list: Project[] = graphic): Group[] =>
  GRAPHIC_STYLES.map((s) => ({ ...s, items: list.filter((p) => p.subcategory === s.match) })).filter((g) => g.items.length);

/* ───────────── UI/UX: one section per platform ───────────── */
const UIUX_PLATFORMS: { tag: "Mobile app" | "Website" | "Desktop app"; id: string; label: string; chip: string; blurb: string }[] = [
  { tag: "Mobile app", id: "ui-mobile", label: "Mobile Apps", chip: "Mobile apps", blurb: "Touch-first app interfaces, from user flows to high-fidelity screens." },
  { tag: "Website", id: "ui-websites", label: "Websites", chip: "Websites", blurb: "Landing pages, stores and product sites, from structure to polished UI." },
  { tag: "Desktop app", id: "ui-desktop", label: "Desktop Apps", chip: "Desktop apps", blurb: "Interfaces for desktop software and redesign concepts." },
];

export const uiuxGroups = (list: Project[] = uiux): Group[] =>
  UIUX_PLATFORMS.map((s) => ({ ...s, layout: "ui" as const, items: list.filter((p) => tagsOf(p).includes(s.tag)) })).filter((g) => g.items.length);

/* ───────────── Websites: split by where the live site is hosted (a plain fact, nothing assumed) ───────────── */
const onPlatformHost = (p: Project) => /\.(netlify\.app|vercel\.app|github\.io|pages\.dev)(\/|$)/i.test(p.link ?? "");

export const webGroups = (list: Project[] = web): Group[] => [
  { id: "w-domain", label: "On a custom domain", chip: "Custom domain", layout: "web" as const,
    blurb: "Websites running on their own domain name. Open any of them to see the real thing.", items: list.filter((p) => !onPlatformHost(p)) },
  { id: "w-preview", label: "On Netlify & Vercel", chip: "Netlify / Vercel", layout: "web" as const,
    blurb: "Designed and built end to end, hosted on Netlify or Vercel so you can click through them.", items: list.filter(onPlatformHost) },
].filter((g) => g.items.length);

/* ───────────── Overview page: one section per discipline ───────────── */
export const overviewGroups = (): Group[] => {
  const cat = (k: "uiux" | "graphic" | "web") => PROJECT_CATS.find((c) => c.key === k)!;
  return [
    { id: "all-uiux", label: "UI/UX Design", chip: "UI/UX", layout: "ui", blurb: cat("uiux").blurb, items: uiux, href: cat("uiux").href, preview: uiux.slice(0, 6),
      sub: uiuxGroups().map((g) => ({ label: g.chip, href: `${cat("uiux").href}#${g.id}` })) },
    { id: "all-graphic", label: "Graphic Design", chip: "Graphic design", layout: "post", blurb: cat("graphic").blurb, items: graphic, href: cat("graphic").href,
      preview: graphicGroups().map((g) => g.items[0]),
      sub: graphicGroups().map((g) => ({ label: g.chip, href: `${cat("graphic").href}#${g.id}` })) },
    { id: "all-web", label: "Website Development", chip: "Websites", layout: "web", blurb: cat("web").blurb, items: web, href: cat("web").href, preview: web.slice(0, 4),
      sub: webGroups().map((g) => ({ label: g.chip, href: `${cat("web").href}#${g.id}` })) },
  ];
};

export const totalProjects = projects.length;
