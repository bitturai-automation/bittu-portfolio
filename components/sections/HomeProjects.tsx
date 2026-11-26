"use client";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { Modal } from "@/components/sections/Work";
import { outLabel, pad, statusOf, type Project } from "@/lib/data";
import { PROJECT_CATS, thumb, type Cat } from "@/lib/routes";

/** Home → Projects: one simple section.  Heading, short paragraph, filter options, then the project cards.
 *  Order everywhere: UI/UX first, then Graphic Design, then Web Development. */
const ORDER: Cat["key"][] = ["uiux", "graphic", "web"];
const CATS = ORDER.map((k) => PROJECT_CATS.find((c) => c.key === k)!);
const LABEL: Record<Cat["key"], string> = { uiux: "UI/UX Design", graphic: "Graphic Design", web: "Web Development" };
const ALL_LIMIT = 6; // cards per category while "All" is selected
const TAB_LIMIT = 9; // cards when a single category is selected (the rest is one click away on its own page)

type Tab = "all" | Cat["key"];
const clean = (t: string) => t.replace(/^UI\/UX Design — /, "").replace(/^Social Media Design — /, "Social · ");

function Card({ p, eager, onOpen }: { p: Project; eager: boolean; onOpen: (p: Project, el: HTMLElement) => void }) {
  const src = thumb(p, 800);
  const [bad, setBad] = useState(!src);
  const out = outLabel(p), status = p.category === "web" ? statusOf(p) : undefined;
  return (
    <li className={`hp-item hp-c-${p.category}`}>
      <button type="button" className="hp-card" aria-haspopup="dialog" data-cursor="View" aria-label={`${p.title}: open project details`} onClick={(e) => onOpen(p, e.currentTarget)}>
        <span className="hp-media">
          {bad
            ? <span className="hp-fb" aria-hidden>{p.title}</span>
            // eslint-disable-next-line @next/next/no-img-element
            : <img src={src} alt="" loading={eager ? "eager" : "lazy"} decoding="async" draggable={false} onError={() => setBad(true)} />}
        </span>
        <span className="hp-body">
          <span className="hp-sub">{p.category === "web" ? "Live website" : clean(p.subcategory)}{status && <b>{status}</b>}</span>
          <span className="hp-t">{p.title}</span>
        </span>
      </button>
      {out && <a className="hp-out" href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`${p.title}: ${out} (opens in new tab)`}>{out} <b aria-hidden>↗</b></a>}
    </li>
  );
}

function Group({ cat, limit, heading, onOpen, first }: { cat: Cat; limit: number; heading: boolean; onOpen: (p: Project, el: HTMLElement) => void; first: boolean }) {
  const label = LABEL[cat.key];
  const more = cat.items.length > limit;
  return (
    <div className="hp-group">
      {heading && (
        <div className="hp-ghead">
          <h3>{label}</h3>
          <Link href={cat.href} data-cursor="Open">View all {pad(cat.items.length)} <b aria-hidden>→</b></Link>
        </div>
      )}
      <ul className="hp-grid" aria-label={`${label} projects`}>
        {cat.items.slice(0, limit).map((p, i) => <Card key={p.id} p={p} eager={first && i < 3} onOpen={onOpen} />)}
      </ul>
      {!heading && more && (
        <div className="hp-more">
          <Link className="pill solid" href={cat.href} data-cursor="Open"><span>View all {pad(cat.items.length)} {label} projects</span><b aria-hidden>→</b></Link>
        </div>
      )}
    </div>
  );
}

export default function HomeProjects() {
  const [tab, setTab] = useState<Tab>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const show = useCallback((p: Project, el: HTMLElement) => { opener.current = el; setOpen(p); }, []);
  const close = useCallback(() => { setOpen(null); opener.current?.focus(); }, []);
  const tabs: { key: Tab; label: string }[] = [{ key: "all", label: "All" }, ...CATS.map((c) => ({ key: c.key as Tab, label: LABEL[c.key] }))];

  return (
    <section id="projects" className="sec hp" aria-labelledby="hp-title">
      <header className="hp-head">
        <h2 id="hp-title" className="hp-title">My Projects</h2>
        <p className="hp-lead">A selection of my work across UI/UX design, graphic design and website development: apps, websites and brand visuals for startups, agencies and NGOs. Pick a category below, then open any project to see the details.</p>
      </header>

      <div className="hp-tabs" role="group" aria-label="Filter projects by type">
        {tabs.map((t) => (
          <button key={t.key} type="button" className="hp-tab" aria-pressed={tab === t.key} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      {/* data-reveal: the site-wide scroll effect leaves this block alone, so cards are never hidden after switching tabs */}
      <div className="hp-panel" key={tab} data-reveal>
        {tab === "all"
          ? CATS.map((c, i) => <Group key={c.key} cat={c} limit={ALL_LIMIT} heading first={i === 0} onOpen={show} />)
          : <Group cat={CATS.find((c) => c.key === tab)!} limit={TAB_LIMIT} heading={false} first onOpen={show} />}
      </div>

      {/* portal: section-level scroll effects (clip/transform) would otherwise offset the fixed pop-up */}
      {typeof document !== "undefined" && createPortal(<AnimatePresence>{open && <Modal key={open.id} p={open} onClose={close} />}</AnimatePresence>, document.body)}
    </section>
  );
}
