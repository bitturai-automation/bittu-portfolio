import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter-tight";
import "@/styles/globals.css";
import "@/styles/motion.css";
import "@/styles/about.css";
import Providers from "@/components/layout/Providers";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { SITE_URL, site } from "@/lib/data";

const title = "Bittu Rai — Product Designer, UI/UX Designer & Vibe Coder";
const description = "Bittu Rai is a Product Designer, UI/UX Designer, AI-assisted designer and Vibe Coder who turns Figma designs into responsive websites. 50+ clients, 4+ years of graphic design, 1+ year each in UI/UX and website development.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title, description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website", url: SITE_URL, title, description, siteName: "Bittu Rai", locale: "en_IN",
    images: [{ url: "/img/og-cover.jpg", width: 1200, height: 630, alt: "Bittu Rai logo: Design | UI/UX | Vibe Code | Create" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/img/og-cover.jpg"] },
};
export const viewport: Viewport = { themeColor: "#0c0c0b", colorScheme: "dark light" };

const jsonLd = {
  "@context": "https://schema.org", "@type": "Person", name: "Bittu Rai", jobTitle: "Product Designer, UI/UX Designer & Vibe Coder",
  url: SITE_URL, email: site.person.email, sameAs: Object.values(site.person.socials),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Watchdog: if the app never hydrates (script blocked/failed/slow network) un-hide everything after 5s. Providers clears it on mount. */}
        <script dangerouslySetInnerHTML={{ __html: "(function(d){setTimeout(function(){if(!d.dataset.ready)d.classList.add('anim-fail')},5000)})(document.documentElement)" }} />
        <noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip" href="#work">Skip to work</a>
        <Providers>{children}</Providers>
        <WhatsAppButton />
      </body>
    </html>
  );
}
