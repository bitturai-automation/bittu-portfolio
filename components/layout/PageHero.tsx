"use client";
import { useRef } from "react";
import Link from "next/link";
import HeroReveal from "@/components/sections/HeroReveal";
import { Split } from "@/components/motion/Type";
import Reveal from "@/components/motion/Reveal";

type Props = {
  crumbs: { label: string; href?: string }[]; title: string; lede: string;
  stats?: { label: string; value: string }[]; links?: { label: string; href: string }[]; children?: React.ReactNode;
  /** Same mouse-reveal as the old Home hero: project previews follow the cursor (tap on touch screens). */
  reveal?: boolean;
  /** "md" for long titles (project names). */
  size?: "md";
};

/** Top of every inner page: breadcrumb, big title, one-line intro, optional numbers + quick links. */
export default function PageHero({ crumbs, title, lede, stats, links, children, reveal, size }: Props) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section id="top" ref={ref} className="sec dark ph" data-live="0">
      <div className="ap-aurora" aria-hidden><i /><i /><i /></div>
      <div className="ap-grid" aria-hidden />
      {reveal && <HeroReveal host={ref} />}
      <nav className="ph-crumbs" aria-label="Breadcrumb">
        <ol>
          {crumbs.map((c, i) => (
            <li key={c.label}>{c.href && i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
          ))}
        </ol>
      </nav>
      {reveal && (
        <p className="hint ph-hint"><span className="hint-dot" aria-hidden /><span className="hint-mouse">Move your cursor to reveal the work</span><span className="hint-touch">Tap anywhere to reveal the work</span></p>
      )}
      <Split text={title} as="h1" className={size === "md" ? "ph-t ph-t-md" : "ph-t"} />
      <Reveal className="ph-low" y={24} delay={0.15}>
        <p className="ph-lede">{lede}</p>
        {stats && <dl className="ph-stats">{stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}</dl>}
      </Reveal>
      {links && <Reveal className="ph-chips" y={16} delay={0.25}>{links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</Reveal>}
      {children}
    </section>
  );
}
