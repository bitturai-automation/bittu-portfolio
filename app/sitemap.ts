import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

const ROUTES = ["/", "/about", "/projects", "/projects/ui-ux", "/projects/websites", "/projects/graphic-design", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({ url: `${SITE_URL}${r}`, lastModified: new Date() }));
}
