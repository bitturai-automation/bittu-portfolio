"use client";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Curtain, Split } from "@/components/motion/Type";
import { pad, site } from "@/lib/data";

/**
 * What I do — bento grid.
 *   [ UI/UX   ] [          ] [ Website ]
 *   [ Graphic ] [  photo   ] [ AI build ]
 * Four tinted / illustrated service tiles around one tall photo tile. Every service tile is a link to the matching work page.
 * The artwork inside the tiles is pure CSS / inline SVG (no extra images to load).
 */
type Service = (typeof site.services)[number] & { href?: string };
const hrefOf = (s: Service) => (s.href === "#builds" ? "/projects/websites" : s.mode === "graphic" ? "/projects/graphic-design" : "/projects/ui-ux");

/* ── tile artwork ── */
function ArtFlow() {
  return (
    <div className="wb-art wb-art-flow" aria-hidden>
      {["Flow", "Wireframe", "Prototype"].map((t, i) => <span key={t} style={{ "--i": i } as React.CSSProperties}><b>{pad(i + 1)}</b>{t}</span>)}
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round"><path d="M18 20c40 0 50 30 30 46s-10 40 54 40" /></svg>
    </div>
  );
}
function ArtBrand() {
  return (
    <div className="wb-art wb-art-brand" aria-hidden>
      <span className="wb-aa">Aa</span>
      <i className="c1" /><i className="c2" /><i className="c3" />
      <ul><li style={{ background: "#14213D" }} /><li style={{ background: "#fff" }} /><li style={{ background: "#FFD2BD" }} /><li style={{ background: "#4F6EF7" }} /></ul>
    </div>
  );
}
function ArtBrowser() {
  return (
    <div className="wb-art wb-art-web" aria-hidden>
      <div className="wb-win">
        <header><i /><i /><i /></header>
        <div className="wb-win-hero"><b /><b /><em>Get started</em></div>
        <div className="wb-win-cards"><span /><span /><span /></div>
      </div>
      <div className="wb-win wb-win-2"><header><i /><i /><i /></header><div className="wb-win-hero"><b /><em /></div></div>
    </div>
  );
}
function ArtCode() {
  return (
    <div className="wb-art wb-art-code" aria-hidden>
      <pre><code>
        <span className="k">&lt;section</span> <span className="a">class</span>=<span className="s">&quot;hero&quot;</span><span className="k">&gt;</span>{"\n"}
        {"  "}<span className="k">&lt;h1&gt;</span>Design to live<span className="k">&lt;/h1&gt;</span>{"\n"}
        {"  "}<span className="k">&lt;a</span> <span className="a">href</span>=<span className="s">&quot;#start&quot;</span><span className="k">&gt;</span>Start<span className="k">&lt;/a&gt;</span>{"\n"}
        <span className="k">&lt;/section&gt;</span>
      </code></pre>
      <span className="wb-spark">✦</span>
    </div>
  );
}
const ART = [<ArtFlow key="a" />, <ArtBrand key="b" />, <ArtBrowser key="c" />, <ArtCode key="d" />];
const TONE = ["peach", "orange", "navy", "blue"] as const;
const AREA = ["a", "b", "d", "e"] as const; // grid areas (c is the photo tile)

function Tile({ s, i }: { s: Service; i: number }) {
  return (
    <Reveal as="li" className={`wb-tile wb-${AREA[i]} wb-${TONE[i]}`} y={44} scale={0.97} delay={[0, 0.12, 0.06, 0.18][i]} duration={0.85}>
      <Link className="wb-in" href={hrefOf(s)} aria-label={`${s.title}: see the work`} data-cursor="View">
        <span className="wb-top"><span className="wb-n">{pad(i + 1)}</span><span className="wb-go" aria-hidden>↗</span></span>
        {ART[i % ART.length]}
        <span className="wb-txt">
          <h3>{s.title}</h3>
          <p>{s.blurb}</p>
          <ul className="wb-tags" aria-label={`${s.title} focus areas`}>{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </span>
      </Link>
    </Reveal>
  );
}

export function WhatIDo({ n = "04" }: { n?: string } = {}) {
  const clients = site.stats.find((x) => x.label === "Clients");
  const sv = site.services as Service[];
  return (
    <Curtain id="services" className="sec paper w-sec wb-sec">
      <header className="wb-head">
        <p className="wb-eye"><i aria-hidden />What I do<span className="sr"> — section {n}</span></p>
        <Split as="h2" text="From first sketch to a live website." className="wb-title" />
        <Reveal as="p" className="wb-sub" delay={0.1}>Product design and visual branding first, with websites to bring it all together.</Reveal>
        <span className="wb-rule" aria-hidden />
      </header>
      <ul className="wb-grid">
        <Tile s={sv[0]} i={0} />
        <Tile s={sv[1]} i={1} />
        <Reveal as="li" className="wb-tile wb-c wb-photo" y={44} scale={0.97} delay={0.1} duration={0.85}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/profile.jpg" alt="" width={640} height={800} loading="lazy" decoding="async" />
          <span className="wb-ph-txt">
            {clients && <b>{clients.value}{clients.suffix}</b>}
            <span>clients across startups, agencies and NGOs, who trust one designer for design, brand and build.</span>
          </span>
        </Reveal>
        <Tile s={sv[2]} i={2} />
        <Tile s={sv[3]} i={3} />
      </ul>
    </Curtain>
  );
}
