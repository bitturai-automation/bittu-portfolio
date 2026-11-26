import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CntHero, CntMain, CntOnline } from "@/components/sections/ContactPage";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Contact Bittu Rai about a full-time role or a freelance project: email, WhatsApp, phone, Behance and LinkedIn.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <CntHero />
      <CntMain />
      <CntOnline />
    </>
  );
}
