"use client";
import { useEffect, useRef, useState } from "react";
import { ABOUT, LOOKING_FOR, SKILL_GROUPS, pad, real } from "@/lib/data";

/** The 3–4 short first-person lines (lib/data.ts → ABOUT.lines). */
export function AboutLines({ className = "" }: { className?: string }) {
  return (
    <div className={`ab-lines ${className}`}>
      {ABOUT.lines.map((l) => <p key={l}>{l}</p>)}
    </div>
  );
}

/** Photo slot: /public/img/profile.jpg when it exists, otherwise a neat monogram tile (or nothing, see ABOUT.showPlaceholderWhenMissing). */
export function ProfilePhoto({ className = "" }: { className?: string }) {
  const [bad, setBad] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => { const el = img.current; if (el?.complete && el.naturalWidth === 0) setBad(true); }, []);
  if (bad && !ABOUT.showPlaceholderWhenMissing) return null;
  return (
    <figure className={`ab-photo${bad ? " ab-photo-empty" : ""} ${className}`}>
      {bad
        ? <div className="ab-mono" role="img" aria-label={ABOUT.photoAlt}><span aria-hidden>BR</span></div>
        // eslint-disable-next-line @next/next/no-img-element
        : <img ref={img} src={ABOUT.photo} alt={ABOUT.photoAlt} width={480} height={600} loading="lazy" decoding="async" onError={() => setBad(true)} />}
    </figure>
  );
}

/** "What I'm looking for": role type, city / remote preference, availability. Rows still marked TODO are hidden; with none left the block disappears. */
export function LookingFor({ className = "" }: { className?: string }) {
  const rows = ([["Role", real(LOOKING_FOR.role)], ["Where", real(LOOKING_FOR.location)], ["Availability", real(LOOKING_FOR.availability)]] as [string, string | undefined][]).filter((r): r is [string, string] => !!r[1]);
  if (!rows.length) return null;
  return (
    <section className={`lf ${className}`} aria-label="What I’m looking for">
      <h3>What I’m looking for</h3>
      <dl>{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    </section>
  );
}

/** Skills in three labelled cards: Design, Tools, Development (lib/data.ts → SKILL_GROUPS). Text only, no logo clutter. */
export function SkillsGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`sk3 ${className}`}>
      {SKILL_GROUPS.filter((g) => g.items.length).map((g, i) => (
        <section className={`sk3-card sk3-${g.key}`} key={g.key} aria-labelledby={`sk3-${g.key}`}>
          <header><span aria-hidden>{pad(i + 1)}</span><h3 id={`sk3-${g.key}`}>{g.title}</h3></header>
          <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
        </section>
      ))}
    </div>
  );
}
