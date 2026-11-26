"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const RESUMES = [
  { id: "product", title: "UI/UX & Product Designer", note: "Product UI/UX design, design systems & developer handoff", file: "/resume/Bittu-Rai-Product-UIUX-Designer.pdf", name: "Bittu-Rai-Product-UIUX-Designer.pdf" },
  { id: "graphic", title: "Graphic Designer", note: "Graphic design, brand identity, social media & marketing creatives", file: "/resume/Bittu-Rai-Graphic-Designer.pdf", name: "Bittu-Rai-Graphic-Designer.pdf" },
];

/** Resume trigger that opens a small dialog with two choices: UI/UX & Product Designer, or Graphic Designer */
export default function ResumeChooser({ variant = "pill", label = "Download resume", className }: { variant?: "pill" | "link" | "outline" | "nav"; label?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLAnchorElement>(null);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    first.current?.focus();
    const t = trigger.current;
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); t?.focus(); };
  }, [open]);

  return (
    <>
      {variant !== "link" ? (
        <button ref={trigger} type="button" className={className ?? (variant === "pill" ? "pill dark-pill" : variant === "nav" ? "pill nav-cta rc-nav" : "pill")} onClick={() => setOpen(true)} aria-haspopup="dialog" data-cursor="Resume"><span>{label}</span><b aria-hidden>↓</b></button>
      ) : (
        <button ref={trigger} type="button" className="ft-link rc-link" onClick={() => setOpen(true)} aria-haspopup="dialog" data-cursor="Resume"><span className="ft-lt">{label}</span><b aria-hidden>→</b></button>
      )}
      {mounted && open && createPortal(
        <div className="rc-back" onClick={() => setOpen(false)}>
          <div className="rc" role="dialog" aria-modal="true" aria-labelledby="rc-title" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="rc-x" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            <p className="eyebrow">Résumé</p>
            <h2 id="rc-title">Which role are you hiring for?</h2>
            <ul className="rc-list">
              {RESUMES.map((r, i) => (
                <li key={r.id} className="rc-card">
                  <b>{r.title}</b>
                  <span>{r.note}</span>
                  <div className="rc-actions">
                    <a ref={i === 0 ? first : undefined} className="rc-btn solid" href={r.file} download={r.name}>Download PDF ↓</a>
                    <a className="rc-btn" href={r.file} target="_blank" rel="noopener noreferrer">View<span className="sr"> (opens in new tab)</span> ↗</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
