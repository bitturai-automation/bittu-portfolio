"use client";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { SecHead } from "@/components/motion/Type";
import { Modal } from "@/components/sections/Work";
import TagFilter, { TagList } from "@/components/ui/TagFilter";
import { firstSentence, host, pad, tagsOf, type Project, type Tag } from "@/lib/data";
import { thumb, type Cat } from "@/lib/routes";

const clean = (t: string) => t.replace(/^UI\/UX Design — /, "").replace(/^Social Media Design — /, "Social · ");

const gistOf = (p: Project, fallback: string) => {
  const [t] = firstSentence(p.description?.[0]);
  const g = t || fallback;
  return g.length > 160 ? g.slice(0, 157).replace(/\s+\S*$/, "") + "…" : g;
};

/** The cards themselves: one under the other, click opens the detail pop-up. `limit` shows only the first N (Home). */
export function ProjectList({ cat, items, limit }: { cat?: Cat; items?: Project[]; limit?: number }) {
  const list = items ?? cat?.items ?? [];
  const [open, setOpen] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const show = useCallback((p: Project, el: HTMLElement) => { opener.current = el; setOpen(p); }, []);
  const close = useCallback(() => { setOpen(null); opener.current?.focus(); }, []);
  const total = list.length;

  return (
    <>
      <ol className="ps-list">
        {list.slice(0, limit).map((p, i) => {
          const meta = [p.role, p.duration, p.screens && p.screens !== "None" && p.screens].filter(Boolean) as string[];
          const img = thumb(p, 1400);
          return (
            <Reveal as="li" key={p.id} className={`ps-item${p.category === "graphic" ? " ps-graphic" : ""}`} y={40}>
              <button type="button" className="ps-card" aria-haspopup="dialog" data-cursor="View"
                aria-label={`${p.title}: open project details`} onClick={(e) => show(p, e.currentTarget)}>
                <span className="ps-media">
                  {img && <img src={img} alt="" loading={i < 2 ? "eager" : "lazy"} decoding="async" draggable={false} />}
                  <i className="ps-no" aria-hidden>{pad(i + 1)} / {pad(total)}</i>
                </span>
                <span className="ps-body">
                  <span className="ps-sub">{clean(p.subcategory)}</span>
                  <h3>{p.title}</h3>
                  <TagList inline tags={tagsOf(p)} />
                  <span className="ps-gist">{gistOf(p, cat?.blurb ?? "")}</span>
                  {meta.length > 0 && <span className="ps-meta">{meta.slice(0, 3).join(" · ")}</span>}
                  {p.category === "web" && p.link && <span className="ps-meta">{host(p.link)}</span>}
                  {p.tools && <span className="ps-tools" aria-hidden>{p.tools.slice(0, 4).map((t) => <b key={t}>{t}</b>)}</span>}
                  <span className="go">View details <b aria-hidden>→</b></span>
                </span>
              </button>
            </Reveal>
          );
        })}
      </ol>
      {/* portal: section-level scroll effects (clip/transform) would otherwise offset the fixed pop-up */}
      {typeof document !== "undefined" && createPortal(<AnimatePresence>{open && <Modal key={open.id} p={open} onClose={close} />}</AnimatePresence>, document.body)}
    </>
  );
}

/** Category page: a type filter, then every project of the category as its own card, one under the other. */
export default function ProjectStack({ cat, tone = "dark", head }: { cat: Cat; tone?: "dark" | "paper"; head?: { n: string; title: string; kicker: string } }) {
  const [tag, setTag] = useState<Tag | null>(null);
  const shown = tag ? cat.items.filter((p) => tagsOf(p).includes(tag)) : cat.items;
  return (
    <section id={head ? cat.key : undefined} className={`sec ${tone} ps ps-${cat.key}${head ? " ps-h" : ""}`} aria-label={`${cat.title} projects`}>
      {head && <SecHead n={head.n} title={head.title} kicker={head.kicker} count={cat.items.length} />}
      <TagFilter items={cat.items} value={tag} onChange={setTag} label={`Filter ${cat.title} projects by type`} />
      <p className="tf-count" role="status" aria-live="polite">{tag ? `Showing ${shown.length} of ${cat.items.length}: ${tag}` : ""}</p>
      <ProjectList cat={cat} items={shown} />
    </section>
  );
}
