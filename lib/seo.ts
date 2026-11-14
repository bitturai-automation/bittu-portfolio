import type { Metadata } from "next";
import { SITE_URL } from "@/lib/data";

export const OG_IMAGE = { url: "/img/og-cover.jpg", width: 1200, height: 630, alt: "BitttuDesigner: Bittu Rai, Product UI/UX Designer and Graphic Designer" };
export const SITE_TITLE = "Bittu Rai | Product UI/UX Designer & Graphic Designer";
/** 1–2 lines: what I do, for whom, and what I'm open to. Keep under ~160 characters so LinkedIn and WhatsApp don't cut it. */
export const SITE_DESC = "Product UI/UX designer and graphic designer: apps, websites and brand visuals for startups, agencies and NGOs. Open to full-time roles and freelance projects.";

/** Metadata for one page: title, description, canonical URL, Open Graph and Twitter cards (all with the share image). */
export function pageMeta({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const full = title ? `${title} — Bittu Rai` : SITE_TITLE;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url, title: full, description, siteName: "Bittu Rai", locale: "en_IN", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }] },
  };
}
