import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/motion.css";
import "@/styles/about.css";
import "@/styles/sections.css";
import "@/styles/pages.css";
import "@/styles/glass3d.css";
import "@/styles/about-page.css";
import Providers from "@/components/layout/Providers";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/motion/Cursor";
import SectionFx from "@/components/motion/SectionFx";
import { SITE_URL, site } from "@/lib/data";
import { OG_IMAGE, SITE_DESC, SITE_TITLE } from "@/lib/seo";
import "@/styles/recruiter.css";
import "@/styles/flat.css";

/* Only 2 fonts on the whole site, both self-hosted, latin subset, one variable file each (all weights), preloaded. */
const outfit = localFont({ src: "./fonts/outfit-latin-wght-normal.woff2", weight: "100 900", display: "swap", variable: "--f-outfit" });
const mono = localFont({ src: "./fonts/jetbrains-mono-latin-wght-normal.woff2", weight: "100 800", display: "swap", variable: "--f-mono" });

const title = SITE_TITLE;
const description = SITE_DESC;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s — Bittu Rai" }, description,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: SITE_URL, title, description, siteName: "Bittu Rai", locale: "en_IN",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title, description, images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }] },
};
export const viewport: Viewport = { themeColor: "#14213D", colorScheme: "dark light" };

const jsonLd = {
  "@context": "https://schema.org", "@type": "Person", name: "Bittu Rai", jobTitle: "Product UI/UX Designer & Graphic Designer",
  url: SITE_URL, email: site.person.email, image: `${SITE_URL}${OG_IMAGE.url}`, description,
  sameAs: Object.values(site.person.socials).filter((u) => u && !/^\s*todo/i.test(u)),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* Watchdog: if the app never hydrates (script blocked/failed/slow network) un-hide everything after 5s. Providers clears it on mount. */}
        <script dangerouslySetInnerHTML={{ __html: "(function(d){setTimeout(function(){if(!d.dataset.ready)d.classList.add('anim-fail')},5000)})(document.documentElement)" }} />
        <noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip" href="#main">Skip to content</a>
        <Providers>
          <Cursor />
          <SectionFx />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
        <WhatsAppButton />
      </body>
    </html>
  );
}
