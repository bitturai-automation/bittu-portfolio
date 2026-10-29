import projectsJson from "@/data/projects.json";
import siteJson from "@/data/site.json";

export type Project = {
  id: string; title: string; category: "graphic" | "uiux" | "web"; subcategory: string;
  images: string[]; description?: string[]; challenge?: string[]; approach?: string[]; outcome?: string[];
  role?: string; tools?: string[]; video?: string; poster?: string; duration?: string;
  link?: string; altText?: string; externalOnly?: boolean;
};

export const SITE_URL = "https://bittu-portfolio-delta.vercel.app"; // from source files; confirm before publishing
export const site = siteJson;
export const projects = projectsJson as Project[];
export const uiux = projects.filter((p) => p.category === "uiux");
export const web = projects.filter((p) => p.category === "web");
export const graphic = projects.filter((p) => p.category === "graphic");
export const toolIcon = (name: string) => site.tools.find((t) => t.name === name)?.icon ?? "";
export const host = (u?: string) => (u ? new URL(u).host.replace(/^www\./, "") : "");
export const pad = (n: number) => String(n).padStart(2, "0");
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Ask Cloudinary for a smaller, auto-format/quality version (keeps non-Cloudinary URLs untouched). */
export const opt = (u: string, w = 900) => (u && u.includes("res.cloudinary.com") && u.includes("/upload/") && !u.includes("/upload/f_auto") ? u.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`) : u);
/** Descriptive alt text when a project has none of its own. */
export const altOf = (p: Project) => p.altText ?? `${p.title} — ${p.subcategory.replace(/^Social Media Design — /, "social media ").toLowerCase()} design by Bittu Rai`;
/** Split a paragraph into its first sentence and the rest. */
export const firstSentence = (t = ""): [string, string] => { const m = t.match(/^(.+?[.!?])(\s+|$)/); return m ? [m[1], t.slice(m[0].length)] : [t, ""]; };

import testimonialsJson from "@/data/testimonials.json";
export type Testimonial = { name: string; quote: string };
export const testimonials = testimonialsJson.testimonials as Testimonial[];
