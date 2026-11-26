"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { Modal } from "@/components/sections/Work";
import { altOf, host, outLabel, pad, statusOf, tagsOf, type Project } from "@/lib/data";
import type { Group, Layout } from "@/lib/projectGroups";
import { thumb } from "@/lib/routes";

/* One page of projects: a sticky bar (search + jump chips) on top, then one section per group.
   Search looks through title, type, tags, role, tools and the description, across every section.
   The chips are plain anchor links: the one for the section you are reading lights up while you scroll. */

const STATUS = ["Client work", "Concept", "Personal", "Demo"] as const;
const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
/* Graphic work is found by its own style name (subcategory); its derived tag (e.g. "Posters & banners" on a website banner) would make "poster" match banners. */
const searchTags = (p: Project) => (p.category === "graphic" ? tagsOf(p).filter((t) => (STATUS as readonly string[]).includes(t)) : tagsOf(p));
const haystack = (p: Project) =>
  norm([p.title, p.subcategory, p.role, p.tools?.join(" "), searchTags(p).join(" "), p.description?.join(" "), p.link ? host(p.link) : ""].filter(Boolean).join(" "));
const cleanSub = (s: string) => s.replace(/^UI\/UX Design — /, "").replace(/^Social Media Design — /, "Social · ");

/** Per layout: media proportions + whether the whole artwork must stay visible (graphic work is never cropped). */
const SHAPE: Record<Layout, { ratio: string; fit: "contain" | "cover" }> = {
  brand: { ratio: "4 / 3", fit: "contain" }, post: { ratio: "1 / 1", fit: "contain" }, story: { ratio: "9 / 16", fit: "contain" },
  poster: { ratio: "3 / 4", fit: "contain" }, banner: { ratio: "16 / 10", fit: "contain" }, print: { ratio: "4 / 3", fit: "contain" },
  ui: { ratio: "16 / 9", fit: "cover" }, web: { ratio: "16 / 9", fit: "cover" },
};

function Cover({ p, layout, eager }: { p: Project; layout: Layout; eager?: boolean }) {
  const [bad, setBad] = useState(false);
  const src = thumb(p, layout === "story" ? 700 : 1000);
  const { ratio, fit } = SHAPE[layout];
  return (
    <span className={`pj-media pj-${fit}`} style={{ aspectRatio: ratio }}>
      {!src || bad
        ? <span className="pj-fallback" role="img" aria-label={altOf(p)}>{p.title}</span>
        // eslint-disable-next-line @next/next/no-img-element
        : <img src={src} alt="" loading={eager ? "eager" : "lazy"} decoding="async" draggable={false} onError={() => setBad(true)} />}
      {(p.video || p.images.length > 1) && <i className="pj-badge" aria-hidden>{p.video ? "▶ Video" : `${p.images.length} images`}</i>}
      <i className="pj-view" aria-hidden>View <b>↗</b></i>
    </span>
  );
}

function Card({ p, layout, eager, onOpen }: { p: Project; layout: Layout; eager: boolean; onOpen: (p: Project, el: HTMLElement) => void }) {
  const out = outLabel(p), status = statusOf(p);
  return (
    <li className={`pj-item pj-l-${layout}`}>
      <button type="button" className="pj-card" aria-haspopup="dialog" data-cursor="View" aria-label={`${p.title}: open project details`} onClick={(e) => onOpen(p, e.currentTarget)}>
        {layout === "web" ? (
          <span className="pj-browser" aria-hidden>
            <span className="pj-bar"><i /><i /><i /><em>{host(p.link)}</em></span>
            <Cover p={p} layout={layout} eager={eager} />
          </span>
        ) : <Cover p={p} layout={layout} eager={eager} />}
        <span className="pj-cap">
          <span className="pj-t">{p.title}</span>
          <span className="pj-sub">
            {layout === "ui" ? <b>{cleanSub(p.subcategory)}</b> : layout === "web" ? <>Live website{status && <b>{status}</b>}</> : cleanSub(p.subcategory)}
          </span>
        </span>
      </button>
      {/* the card opens the details pop-up; this real link says (and goes) where the full project lives */}
      {out && <a className="pj-out" href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`${p.title}: ${out} (opens in new tab)`}>{out} <b aria-hidden>↗</b></a>}
    </li>
  );
}

type Props = {
  groups: Group[];
  /** Placeholder of the search box. */
  placeholder?: string;
  /** Overview page: show each group's `preview` cards and a "View all" link, until somebody searches. */
  overview?: boolean;
};

export default function ProjectBrowser({ groups, placeholder = "Search projects…", overview }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const chipRow = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const [open, setOpen] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const total = useMemo(() => groups.reduce((n, g) => n + g.items.length, 0), [groups]);
  const index = useMemo(() => new Map(groups.flatMap((g) => g.items).map((p) => [p.id, haystack(p)])), [groups]);
  const words = useMemo(() => norm(q).split(/\s+/).filter(Boolean), [q]);
  const searching = words.length > 0;

  const shown = useMemo(() => groups.map((g) => {
    const hits = searching ? g.items.filter((p) => words.every((w) => index.get(p.id)!.includes(w))) : g.items;
    const cards = !searching && overview && g.preview ? g.preview : hits;
    return { g, hits, cards };
  }), [groups, words, searching, index, overview]);
  const matches = shown.reduce((n, s) => n + s.hits.length, 0);

  /* the page's fixed nav and this bar set where sections must stop when you jump to them */
  useEffect(() => {
    const el = root.current, nav = document.querySelector<HTMLElement>(".nav-in"), b = bar.current;
    if (!el || !b) return;
    const sync = () => {
      el.style.setProperty("--nav-h", `${nav?.getBoundingClientRect().height ?? 76}px`);
      el.style.setProperty("--bar-h", `${b.getBoundingClientRect().height}px`);
    };
    sync();
    /* arriving with #section in the address: the browser scrolled before the real heights were known, so land exactly once more */
    const id = decodeURIComponent(location.hash.slice(1)), target = id ? document.getElementById(id) : null;
    if (target && el.contains(target)) requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "auto" }));
    const ro = new ResizeObserver(sync);
    nav && ro.observe(nav); ro.observe(b);
    window.addEventListener("resize", sync);
    return () => { ro.disconnect(); window.removeEventListener("resize", sync); };
  }, []);

  /* scroll-spy: the active chip is the last section whose top has passed the sticky bar */
  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      const el = root.current; if (!el) return;
      const line = parseFloat(el.style.getPropertyValue("--nav-h") || "76") + parseFloat(el.style.getPropertyValue("--bar-h") || "64") + 48;
      let cur = "";
      for (const g of groups) {
        const s = document.getElementById(g.id);
        if (s && s.getBoundingClientRect().top <= line) cur = g.id;
      }
      setActive(cur);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, [groups, shown]);

  /* keep the lit chip visible inside the (sideways-scrolling) chip row without moving the page */
  useEffect(() => {
    const row = chipRow.current, chip = row?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!row || !chip) return;
    const left = chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [active]);

  /* "/" jumps to the search box */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey || t?.closest("input,textarea,select,[contenteditable]")) return;
      e.preventDefault(); input.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const jump = (e: React.MouseEvent, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const s = document.getElementById(id);
    if (!s) return;
    e.preventDefault();
    s.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  const show = useCallback((p: Project, el: HTMLElement) => { opener.current = el; setOpen(p); }, []);
  const close = useCallback(() => { setOpen(null); opener.current?.focus(); }, []);

  const quick = useMemo(() => {
    const seen = new Map<string, number>();
    groups.flatMap((g) => g.items).forEach((p) => tagsOf(p).forEach((t) => seen.set(t, (seen.get(t) ?? 0) + 1)));
    return [...seen.entries()].filter(([, n]) => n > 0).slice(0, 6).map(([t]) => t);
  }, [groups]);

  let firstImages = 2; // only the first cards on the page load eagerly

  return (
    <div ref={root} className="pj" data-searching={searching ? "1" : undefined}>
      <div ref={bar} className="pj-top">
        <div className="pj-top-in">
          <label className="pj-search">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            <span className="sr">Search projects</span>
            <input ref={input} type="search" value={q} placeholder={placeholder} autoComplete="off" spellCheck={false}
              onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Escape") { setQ(""); } }} />
            {q ? <button type="button" className="pj-clear" onClick={() => { setQ(""); input.current?.focus(); }} aria-label="Clear search">✕</button> : <kbd aria-hidden>/</kbd>}
          </label>
          <nav className="pj-chips" aria-label="Jump to a section">
            <span className="pj-chips-lab" aria-hidden>Jump to</span>
            <div className="pj-chips-row" ref={chipRow}>
              {shown.map(({ g, hits }) => {
                const none = searching && hits.length === 0;
                return (
                  <a key={g.id} data-id={g.id} href={`#${g.id}`} className="pj-chip" aria-current={active === g.id ? "location" : undefined} aria-disabled={none || undefined}
                    tabIndex={none ? -1 : undefined} onClick={(e) => (none ? e.preventDefault() : jump(e, g.id))}>
                    {g.chip}<em>{pad(searching ? hits.length : g.items.length)}</em>
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
        <p className="pj-status" role="status" aria-live="polite">
          {searching ? (matches ? `${matches} of ${total} projects match “${q.trim()}”` : `No project matches “${q.trim()}”`) : ""}
        </p>
      </div>

      {searching && matches === 0 ? (
        <div className="pj-empty">
          <h2>Nothing found for “{q.trim()}”</h2>
          <p>Try a shorter word, or start from one of these:</p>
          <div className="pj-quick">{quick.map((t) => <button key={t} type="button" onClick={() => { setQ(t); input.current?.focus(); }}>{t}</button>)}</div>
          <button type="button" className="pill solid" onClick={() => setQ("")}><span>Clear search</span></button>
        </div>
      ) : shown.filter((s) => !searching || s.hits.length > 0).map(({ g, hits, cards }, gi) => {
        const more = overview && !searching ? g.items.length - cards.length : 0;
        return (
          <section key={g.id} id={g.id} className={`pj-sec ${gi % 2 ? "alt" : ""}`} aria-labelledby={`${g.id}-h`}>
            <header className="pj-head">
              <span className="pj-no" aria-hidden>{pad(gi + 1)}</span>
              <div className="pj-head-txt">
                <h2 id={`${g.id}-h`}>{g.label}</h2>
                <p>{g.blurb}</p>
                {overview && g.sub && g.sub.length > 1 && (
                  <p className="pj-sublinks"><span>Go straight to</span>{g.sub.map((s) => <Link key={s.href} href={s.href}>{s.label}</Link>)}</p>
                )}
              </div>
              <span className="pj-count">{pad(searching ? hits.length : g.items.length)}<small>{(searching ? hits.length : g.items.length) === 1 ? "project" : "projects"}</small></span>
            </header>
            <ul className={`pj-grid pj-g-${g.layout}`}>
              {cards.map((p) => <Card key={p.id} p={p} layout={g.layout} eager={firstImages-- > 0} onOpen={show} />)}
            </ul>
            {overview && g.href && !searching && (
              <div className="pj-more">
                <Link className="pill solid" href={g.href} data-cursor="Open"><span>{more > 0 ? `View all ${pad(g.items.length)} ${g.chip.toLowerCase()} projects` : `Open the ${g.chip} page`}</span><b aria-hidden>→</b></Link>
              </div>
            )}
          </section>
        );
      })}

      {/* portal: nothing inside the page's scroll effects may offset the fixed pop-up */}
      {typeof document !== "undefined" && createPortal(<AnimatePresence>{open && <Modal key={open.id} p={open} onClose={close} />}</AnimatePresence>, document.body)}
    </div>
  );
}
