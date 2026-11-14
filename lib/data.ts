import projectsJson from "@/data/projects.json";
import siteJson from "@/data/site.json";

/* ═══════════════════════════════════════════════════════════════════════════════════════════
   THE ONE FILE TO EDIT FOR RECRUITER-FACING CONTENT
   ─────────────────────────────────────────────────
   • Anything that still starts with "TODO" is a placeholder: the site hides it automatically
     until you replace it with the real value (see `isTodo` below).
   • Sections: PLACEHOLDERS · LINKS · HERO · ABOUT · LOOKING FOR · SKILLS · TESTIMONIALS · PROJECT TAGS
   • Larger, older content (projects, experience, stats, …) still lives in /data/*.json.
   ═══════════════════════════════════════════════════════════════════════════════════════════ */

/* ───────────── PLACEHOLDERS ───────────── */
/** True for empty values and for anything starting with "TODO". The UI hides these. */
export const isTodo = (v?: string | null): boolean => !v || !v.trim() || /^\s*todo\b/i.test(v);
/** Returns the value, or undefined while it is still a placeholder. */
export const real = (v?: string | null): string | undefined => (isTodo(v) ? undefined : v!.trim());

/* ───────────── LINKS ───────────── */
export const SITE_URL = "https://bittu-portfolio-omega.vercel.app";

/** Profile URLs. Set a value to "" (or "TODO") and its icon disappears everywhere. */
export const SOCIALS = {
  behance: "https://www.behance.net/bitttudesigner",
  linkedin: "https://www.linkedin.com/in/bitttudesigner/",
  github: "https://github.com/bitturai-automation",
  instagram: "https://www.instagram.com/bitttudesigner/",
};
export type SocialKey = "behance" | "linkedin" | "github";
/** The three icon links shown in the navigation and in the hero (order = display order). */
export const ICON_LINKS: { key: SocialKey; label: string; href: string }[] = (
  [["behance", "Behance"], ["linkedin", "LinkedIn"], ["github", "GitHub"]] as const
).map(([key, label]) => ({ key, label, href: real(SOCIALS[key]) ?? "" })).filter((l) => l.href);

/* ───────────── HERO ───────────── */
export const AVAILABILITY = "Open to full-time roles and freelance projects.";
export const HERO = {
  /** What I do + the result, as one sentence (first words are accented). */
  lead: "Product UI/UX designer:",
  rest: "apps and websites that users understand in seconds.",
  /** For whom */
  sub: "I design apps, websites and brand visuals for startups, agencies and NGOs, from first user flow to polished, developer-ready UI.",
  /** Small rotating line under the headline: "Also a …" */
  also: "Also a",
  alsoRoles: ["graphic designer", "brand designer", "website designer"],
};

/* ───────────── ABOUT (3–4 short first-person lines) ───────────── */
export const ABOUT = {
  lines: [
    "I’m Bittu, a Product UI/UX Designer and Graphic Designer.",
    "I design apps, websites and brand visuals for startups, agencies and NGOs.",
    "I also build the websites I design, using HTML, CSS and AI-assisted workflows.",
    "I enjoy turning complex ideas into clear, simple experiences.",
  ],
  /** Drop your photo at /public/img/profile.jpg (square or 4:5 works best). */
  photo: "/img/profile.jpg",
  photoAlt: "Portrait of Bittu Rai",
  /** While profile.jpg is missing: true = show a neat monogram tile, false = hide the photo slot completely. */
  showPlaceholderWhenMissing: true,
};

/* ───────────── "WHAT I'M LOOKING FOR" ───────────── */
export const LOOKING_FOR = {
  role: "Full-time roles and freelance projects in Product UI/UX design and Graphic Design.",
  location: "TODO: add your city and remote / hybrid / on-site preference",
  availability: "TODO: add your availability, e.g. “Available immediately” or “30 days’ notice”",
};

/* ───────────── SKILLS (3 scannable groups) ───────────── */
/* Prefilled from what you already published on the site and resumes. CONFIRM each line; delete what you don't use.
   Tools are limited to the ones that appear in your project case studies (Figma, Photoshop, Illustrator, Canva). */
export const SKILL_GROUPS: { key: "design" | "tools" | "development"; title: string; items: string[] }[] = [
  { key: "design", title: "Design", items: [
    "Product & UI/UX design", "User flows", "Wireframes & prototypes", "Design systems", "Responsive design",
    "Brand identity", "Social media & campaign design", "Banners, print & outdoor",
  ] },
  { key: "tools", title: "Tools", items: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "Canva"] },
  { key: "development", title: "Development", items: [
    "HTML & CSS", "Responsive websites", "Design-to-code", "WordPress", "Webflow", "AI-assisted builds",
  ] },
];

/* ───────────── TESTIMONIALS ───────────── */
/* A testimonial only appears on the site when `name` and `quote` are real. `role` and `company` are shown once filled in.
   `linkedin` is optional (leave "" to hide the link). To add one, copy a block and replace every value.
   Template:
   { name: "TODO: add real name", role: "TODO: add role", company: "TODO: add company", linkedin: "", quote: "TODO: add quote" }, */
export type Testimonial = { name: string; role?: string; company?: string; linkedin?: string; quote: string };
const TESTIMONIALS_RAW: Testimonial[] = [
  { name: "Rohan Mehta", role: "TODO: add role", company: "TODO: add company", linkedin: "",
    quote: "Bittu understood the kind of clean and modern look we wanted. The final website design felt fresh, simple and very easy to navigate. He was also open to feedback throughout the process." },
  { name: "Ananya Kapoor", role: "TODO: add role", company: "TODO: add company", linkedin: "",
    quote: "What I really liked was how Bittu translated a fairly complex AI concept into something that felt simple and easy to understand. The interface looked modern and the user journey was very clear." },
  { name: "Aditya Sharma", role: "TODO: add role", company: "TODO: add company", linkedin: "",
    quote: "Bittu did a great job of making our product communication feel much more user-friendly. He paid attention to the small details and made sure the design looked clean without making it boring." },
  { name: "Rahul Jain", role: "TODO: add role", company: "TODO: add company", linkedin: "",
    quote: "Since Bittu started working on our creatives, our social media has started looking much more premium and consistent. His designs have a very classy feel, and he understands the real estate audience really well." },
  { name: "Neha Verma", role: "TODO: add role", company: "TODO: add company", linkedin: "",
    quote: "Bittu brought a completely different energy to our creatives. The designs became more attractive and engaging, and we started getting much better attention on our campaigns. He is genuinely creative and understands what works visually." },
  { name: "Riya Agarwal", role: "TODO: add role", company: "TODO: add company", linkedin: "",
    quote: "We wanted our social media to look more premium, and Bittu really understood that direction. The designs feel elegant, polished and much more aligned with our jewellery brand. Our overall social presence has improved noticeably." },
  { name: "Amit Kulkarni", role: "TODO: add role", company: "TODO: add company", linkedin: "",
    quote: "Bittu has handled everything from social media creatives to banners, standees and AI videos for us. What I appreciate most is that he maintains the same quality and brand feel across completely different formats." },
];
/** What the site shows: placeholders stripped, nameless entries dropped. */
export const testimonials: Testimonial[] = TESTIMONIALS_RAW
  .filter((t) => !isTodo(t.name) && !isTodo(t.quote))
  .map((t) => ({ name: t.name.trim(), quote: t.quote.trim(), role: real(t.role), company: real(t.company), linkedin: real(t.linkedin) }));

/* ───────────── SITE + PROJECTS ───────────── */
export type Project = {
  id: string; title: string; category: "graphic" | "uiux" | "web"; subcategory: string;
  images: string[]; description?: string[]; challenge?: string[]; approach?: string[]; outcome?: string[];
  role?: string; tools?: string[]; screens?: string; video?: string; poster?: string; duration?: string;
  link?: string; altText?: string; externalOnly?: boolean;
};

export const site = {
  ...siteJson,
  availabilityNote: AVAILABILITY,
  person: { ...siteJson.person, portfolio: SITE_URL.replace(/^https?:\/\//, ""), socials: SOCIALS },
};
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

/* ───────────── PROJECT TAGS ───────────── */
/* Every project gets one or more tags. The "type of work" tag comes from its category (graphic sub-category / website / UI/UX);
   the extra tags below come from what each project's own description says ("a client project", "a demo project", "a personal concept"…).
   The original label (e.g. "UI/UX Design — Client project") is still shown next to the tags, so the work stays honest.
   Add a tag by listing it in PROJECT_EXTRA_TAGS; only tags you list are ever claimed. */
export const TAG_ORDER = [
  "Mobile app", "Desktop app", "Website", "Live site", "Branding", "Social media", "Posters & banners", "Print",
  "Client work", "Concept", "Demo",
] as const;
export type Tag = (typeof TAG_ORDER)[number];

const GRAPHIC_TYPE: Record<string, Tag> = {
  "Social Media Design — Story": "Social media", "Social Media Design — Post": "Social media",
  "Posters & Banners": "Posters & banners", "Website Banner Design": "Posters & banners",
  "Printing Material": "Print", "Brand Identity": "Branding",
};
export const PROJECT_EXTRA_TAGS: Record<string, Tag[]> = {
  // UI/UX (platform + status taken from each project's title and description)
  "netflix-ui-ux-redesign-concept": ["Website", "Concept"],
  "e-commerce-ui-ux-design": ["Website", "Client work"],
  "e-commerce-sign-up-ui-ux-design": ["Website", "Demo"],
  "e-commerce-website-ui-ux-design": ["Website", "Demo"],
  "fashion-shopping-app-mobile-ui-ux-design": ["Mobile app", "Concept"],
  "dating-app-mobile-ui-ux-design": ["Mobile app", "Client work"],
  "whatsapp-desktop-ui-redesign-concept-by-bittu-rai": ["Desktop app", "Concept"],
  "shopping-app-e-commerce-mobile-ui-ux-design": ["Mobile app", "Concept"],
  "consulting-firm-website-modern-ui-ux-design": ["Website", "Concept"],
  "buildexa-construction-company-website-ui-ux-design": ["Website", "Demo"],
  // Graphic projects whose description says they were made for a client.
  // CONFIRM: add "Client work" to any other project you can confirm was paid client work, e.g. "jain-realties": ["Client work"].
  "flashaid-ads": ["Client work"],
  "one-pager": ["Client work"],
};
/** All tags of one project, in display order. */
export const tagsOf = (p: Project): Tag[] => {
  const base: Tag[] = p.category === "web" ? ["Website", "Live site"] : p.category === "graphic" ? [GRAPHIC_TYPE[p.subcategory] ?? "Branding"] : [];
  const all = new Set<Tag>([...base, ...(PROJECT_EXTRA_TAGS[p.id] ?? [])]);
  return TAG_ORDER.filter((t) => all.has(t));
};
/** Tags used by at least one of the given projects, with counts (display order). */
export const tagCounts = (list: Project[]) =>
  TAG_ORDER.map((t) => ({ tag: t, count: list.filter((p) => tagsOf(p).includes(t)).length })).filter((x) => x.count > 0);
