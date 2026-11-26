"use client";
import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/motion/Reveal";
import { pad } from "@/lib/data";
import { UiuxSection, WebSection } from "@/components/sections/Showcase";
import { GraphicSection } from "@/components/sections/Work";
import { PROJECT_CATS, thumb, type Cat } from "@/lib/routes";

function Img({ src, className }: { src: string; className?: string }) {
  const [bad, setBad] = useState(!src);
  return bad ? null : <img className={className} src={src} alt="" loading="lazy" decoding="async" draggable={false} onError={() => setBad(true)} />;
}

function ViewAll({ cat, tone }: { cat: Cat; tone: "dark" | "paper" }) {
  return (
    <div className={`sec-more ${tone}`}>
      <Link className="pill solid" href={cat.href} data-cursor="Open"><span>View all {pad(cat.items.length)} {cat.short} projects</span><b aria-hidden>→</b></Link>
    </div>
  );
}

/** Home: the same three animated showcases as the Projects page (sideways gallery, card deck, browser frames), each followed by a "View all" button to its own page. */
export function FeaturedWork({ n = 1 }: { n?: number }) {
  const no = (i: number) => String(n + i).padStart(2, "0");
  const cat = (k: Cat["key"]) => PROJECT_CATS.find((c) => c.key === k)!;
  return (
    <>
      <UiuxSection n={no(0)} />
      <ViewAll cat={cat("uiux")} tone="dark" />
      <GraphicSection no={no(1)} tone="paper" />
      <ViewAll cat={cat("graphic")} tone="paper" />
      <WebSection n={no(2)} tone="dark" />
      <ViewAll cat={cat("web")} tone="dark" />
    </>
  );
}

/** End of a category page: jump to the other two categories. */
export function MoreCategories({ current, tone }: { current: Cat["key"]; tone: "dark" | "paper" }) {
  const rest = PROJECT_CATS.filter((c) => c.key !== current);
  return (
    <section className={`sec ${tone} mc`}>
      <Reveal as="h2" className="au-h" delay={0.05}><span>More of my work</span></Reveal>
      <ul className="mc-grid">
        {rest.map((c, i) => (
          <Reveal as="li" key={c.key} className="mc-card" y={36} delay={i * 0.1}>
            <Link href={c.href} data-cursor="Open">
              <span className="mc-media"><Img src={thumb(c.items[0], 500)} /></span>
              <span className="mc-txt"><small>{pad(c.items.length)} projects</small><h3>{c.title}</h3><span className="go">Explore <b aria-hidden>→</b></span></span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
