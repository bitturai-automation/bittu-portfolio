"use client";
/**
 * Home page: all certificates in ONE row that keeps moving on its own (right → left, seamless loop).
 * Pauses on hover / keyboard focus. Click a certificate to open it large. Respects "reduce motion" (then it is a normal swipe row).
 * Styles are bundled here (cm-* classes) so no global CSS is needed.
 */
import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/data";
import { CG_CSS, CertLightbox, type Cert } from "@/components/sections/CertGallery";

const CSS = `
.cm{background:#14213D;color:#fff;padding:clamp(56px,8vw,104px) 0;overflow:hidden}
.cm-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:16px;padding:0 clamp(20px,4.2vw,72px);margin-bottom:clamp(24px,3.5vw,44px)}
.cm-head h2{margin:0;font:600 clamp(2rem,4.4vw,3.6rem)/1.05 var(--font,system-ui);letter-spacing:-.03em;color:#fff}
.cm-head p{margin:10px 0 0;font-size:clamp(15px,1.1vw,17px);color:#AEB7C9}
.cm-head p b{color:#FD6327;font-weight:600}
.cm-all{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:99px;border:1px solid rgba(255,255,255,.28);color:#fff;font-weight:500;font-size:15px;text-decoration:none;transition:background .2s,border-color .2s}
.cm-all:hover{background:#FD6327;border-color:#FD6327}
.cm-view{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.cm-track{display:flex;flex-wrap:nowrap;width:max-content;animation:cm-move var(--cm-dur,100s) linear infinite;will-change:transform}
.cm-view:hover .cm-track,.cm-view:focus-within .cm-track{animation-play-state:paused}
.cm-set{display:flex;flex-wrap:nowrap;flex:none}
.cm-item{flex:none;width:clamp(240px,26vw,340px);padding-right:clamp(14px,1.6vw,22px)}
.cm-btn{display:block;width:100%;padding:0;margin:0;border:0;background:none;cursor:zoom-in;text-align:left;color:inherit;font:inherit}
.cm-img{display:flex;align-items:center;justify-content:center;aspect-ratio:7/5;border-radius:14px;overflow:hidden;background:#eef1f6;box-shadow:0 10px 28px rgba(0,0,0,.28);transition:transform .3s}
.cm-btn:hover .cm-img,.cm-btn:focus-visible .cm-img{transform:translateY(-4px)}
.cm-img img{display:block;width:100%;height:100%;object-fit:contain}
.cm-cap{display:block;margin-top:12px}
.cm-cap b{display:block;font-weight:600;font-size:15px;line-height:1.3;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cm-cap small{display:block;margin-top:3px;font-size:13px;color:#AEB7C9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@keyframes cm-move{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.cm-view{overflow-x:auto;-webkit-mask-image:none;mask-image:none}.cm-track{animation:none}.cm-set[aria-hidden="true"]{display:none}}
`;

export default function CertMarquee() {
  const certs = site.certifications as Cert[];
  const [open, setOpen] = useState<number | null>(null);
  const dur = Math.max(40, certs.length * 5); // ≈5s per certificate: calm, readable speed

  const set = (dup: boolean) => (
    <div className="cm-set" aria-hidden={dup || undefined}>
      {certs.map((c, i) => (
        <div className="cm-item" key={c.image}>
          <button type="button" className="cm-btn" tabIndex={dup ? -1 : 0} onClick={() => setOpen(i)} aria-label={`View certificate: ${c.title}`}>
            <span className="cm-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={dup ? "" : `${c.title} certificate`} loading="lazy" decoding="async" draggable={false} />
            </span>
            <span className="cm-cap"><b>{c.title}</b><small>{[c.org, c.date].filter(Boolean).join(" · ")}</small></span>
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <section id="certificates" className="cm" aria-label="Certifications">
      <style dangerouslySetInnerHTML={{ __html: CG_CSS + CSS }} />
      <div className="cm-head">
        <div>
          <h2>Certifications</h2>
          <p><b>{certs.length}</b> courses and simulations completed. Hover to pause, click to view.</p>
        </div>
        <Link className="cm-all" href="/about#certifications">See all <span aria-hidden>↗</span></Link>
      </div>
      <div className="cm-view" data-reveal>
        <div className="cm-track" style={{ ["--cm-dur" as string]: `${dur}s` }}>
          {set(false)}
          {set(true)}
        </div>
      </div>
      <CertLightbox certs={certs} open={open} setOpen={setOpen} />
    </section>
  );
}
