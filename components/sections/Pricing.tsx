"use client";
import Reveal from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Type";
import { pad, site } from "@/lib/data";

/**
 * Pricing — three plans. Edit the numbers / lines here only.
 * Prices are in Indian rupees (₹). `from` and `to` are the two ends of the range.
 */
const PLANS = [
  { key: "graphic", tone: "peach", name: "Graphic Design", tag: "Monthly plan", from: 14999, to: 24999, per: "/ month",
    intro: "A steady stream of on-brand social creatives every month.",
    items: ["10–20 static posts", "3–6 carousels", "5–10 stories"],
    note: "Price depends on how many creatives you need each month." },
  { key: "ui", tone: "navy", name: "UI Design", tag: "Project based", from: 4999, to: 19999, per: "",
    intro: "A complete website interface, designed in Figma.",
    items: ["Full website UI design", "Up to 6 pages"],
    note: "Price depends on page count and detail." },
  { key: "web", tone: "blue", name: "Website Development", tag: "Project based", from: 5999, to: 29999, per: "",
    intro: "Your complete custom website, designed and built for you.",
    items: ["Full custom website", "Responsive on every device", "From design to live"],
    note: "Price depends on pages and features." },
] as const;

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function Pricing() {
  const p = site.person;
  return (
    <section id="pricing" className="sec dark pr-sec" aria-labelledby="pr-h">
      <header className="wb-head">
        <p className="wb-eye"><i aria-hidden />Pricing</p>
        <Split as="h2" text="Clear pricing, three ways to work together." className="wb-title" />
        <Reveal as="p" className="wb-sub" delay={0.1}>Pick a plan, or tell me what you need and I’ll quote it exactly.</Reveal>
        <span className="wb-rule" aria-hidden />
      </header>
      <h2 id="pr-h" className="sr">Pricing plans</h2>
      <ul className="pr-grid">
        {PLANS.map((pl, i) => (
          <Reveal as="li" key={pl.key} className={`pr-card pr-${pl.tone}`} y={44} scale={0.97} delay={i * 0.1} duration={0.85}>
            <div className="pr-top"><span className="pr-n">{pad(i + 1)}</span><span className="pr-tag">{pl.tag}</span></div>
            <h3>{pl.name}</h3>
            <p className="pr-intro">{pl.intro}</p>
            <p className="pr-price" aria-label={`${inr(pl.from)} to ${inr(pl.to)} ${pl.per}`}>
              <span><small>from</small><b>{inr(pl.from)}</b></span>
              <i aria-hidden>–</i>
              <span><small>up to</small><b>{inr(pl.to)}</b></span>
              {pl.per && <em>{pl.per}</em>}
            </p>
            <ul className="pr-list">{pl.items.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="pr-note">{pl.note}</p>
            <div className="pr-act">
              <a className="pill" href={`mailto:${p.email}?subject=${encodeURIComponent(pl.name + " — quote")}`}><span>Get a quote</span><b aria-hidden>↗</b></a>
              <a className="pr-quiet" href={p.whatsapp} target="_blank" rel="noopener noreferrer">or WhatsApp<span className="sr"> (opens in new tab)</span></a>
            </div>
          </Reveal>
        ))}
      </ul>
      <p className="pr-foot">All prices are in Indian rupees (₹). The final price is confirmed after I understand your scope.</p>
    </section>
  );
}
