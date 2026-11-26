"use client";
/**
 * Certificate gallery: image cards + click-to-zoom lightbox.
 * Styles are bundled inside this component (cg-* classes), so it looks right even if the global CSS files are old or cached.
 */
import { useEffect, useState } from "react";

export type Cert = { title: string; org?: string; date?: string; image: string; w?: number; h?: number };

export const CG_CSS = `
.cg-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;align-items:stretch}
.cg-card{display:flex;flex-direction:column;background:#fff;border:1px solid rgba(20,33,61,.12);border-radius:18px;overflow:hidden;transition:transform .25s,box-shadow .25s}
.cg-card:hover{transform:translateY(-3px);box-shadow:0 14px 32px rgba(20,33,61,.10)}
.cg-btn{display:flex;align-items:center;justify-content:center;width:100%;margin:0;padding:0;border:0;border-bottom:1px solid rgba(20,33,61,.08);background:#eef1f6;cursor:zoom-in;aspect-ratio:7/5;overflow:hidden}
.cg-btn img{display:block;width:100%;height:100%;max-width:100%;object-fit:contain}
.cg-txt{display:block;padding:14px 16px 16px;text-align:left}
.cg-txt b{display:block;font-weight:600;font-size:15px;line-height:1.35;color:#14213d}
.cg-txt small{display:block;margin-top:4px;font-size:13px;color:#5b667a}
.cg-lb{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;gap:12px;padding:16px;background:rgba(10,12,18,.88)}
.cg-lb figure{margin:0;max-width:min(1100px,86vw);display:flex;flex-direction:column;align-items:center;gap:12px}
.cg-lb figure img{display:block;max-width:100%;max-height:78vh;width:auto;height:auto;border-radius:8px;background:#fff}
.cg-lb figcaption{color:#fff;font-size:14px;text-align:center}
.cg-lb figcaption b{display:block;font-size:16px;margin-bottom:2px}
.cg-x,.cg-n{border:0;border-radius:50%;background:rgba(255,255,255,.16);color:#fff;cursor:pointer;display:grid;place-items:center;padding:0}
.cg-x:hover,.cg-n:hover{background:rgba(255,255,255,.3)}
.cg-x{position:absolute;top:16px;right:16px;width:44px;height:44px;font-size:18px}
.cg-n{flex:none;width:48px;height:48px;font-size:28px;line-height:1}
@media(max-width:640px){.cg-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.cg-txt{padding:10px 12px 12px}.cg-txt b{font-size:13.5px}.cg-txt small{font-size:12px}.cg-n{position:absolute;bottom:20px}.cg-n.p{left:calc(50% - 60px)}.cg-n.n{right:calc(50% - 60px)}.cg-lb figure{max-width:94vw}}
`;

export function CertLightbox({ certs, open, setOpen }: { certs: Cert[]; open: number | null; setOpen: (n: number | null) => void }) {
  const cur = open === null ? null : certs[open];
  const go = (d: number) => { if (open !== null) setOpen((open + d + certs.length) % certs.length); };

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = prev; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!cur) return null;
  return (
    <div className="cg-lb" role="dialog" aria-modal="true" aria-label={cur.title} onClick={() => setOpen(null)}>
      <button type="button" className="cg-x" onClick={() => setOpen(null)} aria-label="Close">✕</button>
      <button type="button" className="cg-n p" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous certificate">‹</button>
      <figure onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cur.image} alt={`${cur.title} certificate`} />
        <figcaption><b>{cur.title}</b>{[cur.org, cur.date].filter(Boolean).join(" · ")}</figcaption>
      </figure>
      <button type="button" className="cg-n n" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next certificate">›</button>
    </div>
  );
}

export default function CertGallery({ certs }: { certs: Cert[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CG_CSS }} />
      <ul className="cg-grid">
        {certs.map((c, i) => (
          <li key={c.image} className="cg-card">
            <button type="button" className="cg-btn" onClick={() => setOpen(i)} aria-label={`View certificate: ${c.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={`${c.title} certificate`} loading="lazy" decoding="async" />
            </button>
            <span className="cg-txt"><b>{c.title}</b><small>{[c.org, c.date].filter(Boolean).join(" · ")}</small></span>
          </li>
        ))}
      </ul>
      <CertLightbox certs={certs} open={open} setOpen={setOpen} />
    </>
  );
}
