import { graphic, opt, site, uiux, web, type Project } from "@/lib/data";

export type Cat = {
  key: "uiux" | "web" | "graphic"; href: string; title: string; short: string; blurb: string; tags: string[]; items: Project[];
};

/** The three project categories: used by the mega menu, the Projects index, the Home preview and the "keep exploring" cards. */
export const PROJECT_CATS: Cat[] = [
  { key: "uiux", href: "/projects/ui-ux", title: "UI/UX Design", short: "UI/UX", items: uiux,
    blurb: "Product interfaces for web and mobile, from user flows to high-fidelity UI, prototypes and case studies.",
    tags: ["Case studies", "Mobile apps", "Web apps", "Prototypes"] },
  { key: "graphic", href: "/projects/graphic-design", title: "Graphic Design", short: "Graphic", items: graphic,
    blurb: "Brand identity, social media, posters and print for startups, agencies and NGOs.",
    tags: site.graphicCategories.map((c) => c.replace(/^Social Media Design — /, "Social ")) },
  { key: "web", href: "/projects/websites", title: "Website Development", short: "Websites", items: web,
    blurb: "Figma designs built into live, responsive websites with HTML, CSS and AI-assisted workflows.",
    tags: ["Live websites", "Design to code", "Responsive", "AI-assisted"] },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects", mega: true },
  { href: "/contact", label: "Contact" },
] as const;

/** Small cover image for a project (Cloudinary-optimised; falls back to a local poster for video-only projects). */
export const thumb = (p?: Project, w = 640) =>
  !p ? "" : p.images[0] ? opt(p.images[0], w) : p.poster ? `/${p.poster.replace(/^\/?assets\//, "")}` : "";

export const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));
