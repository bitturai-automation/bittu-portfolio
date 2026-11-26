"use client";
/**
 * "What I work with": three cards (Design · Tools · Development) with tool icons.
 * One component, used on both the Home page and the About page. Data: data/site.json → skillGroups + tools.
 * Classes start with abt- (styles/site.css).
 */
import { motion, useReducedMotion } from "framer-motion";
import { EASE, SKILL_GROUPS, pad, toolIcon } from "@/lib/data";

const iconSrc = (p: string) => `/${p.replace(/^assets\//, "")}`;

/** Fades + lifts its children in once. Does nothing when the visitor prefers reduced motion. */
function Rise({ children, i = 0, className }: { children: React.ReactNode; i?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.07, ease: EASE }}>
      {children}
    </motion.div>
  );
}

function Head({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <header className="abt-head">
      <p className="abt-label"><i aria-hidden />{label}</p>
      <h2>{title}</h2>
      {text && <p className="abt-head-t">{text}</p>}
    </header>
  );
}

export function AbSkills() {
  return (
    <section id="skills" className="abt-sec abt-white">
      <div className="abt-wrap">
        <Head label="Skills & tools" title="What I work with" text="Design skills, the tools I use every day, and what I can build." />
        <div className="abt-sk">
          {SKILL_GROUPS.filter((g) => g.items.length).map((g, i) => (
            <Rise key={g.key} i={i} className="abt-sk-card">
              <h3><span aria-hidden>{pad(i + 1)}</span>{g.title}</h3>
              <ul>
                {g.items.map((it) => {
                  const ic = g.key === "tools" ? toolIcon(it) : "";
                  return (
                    <li key={it}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {ic ? <img src={iconSrc(ic)} alt="" width={18} height={18} loading="lazy" /> : null}{it}
                    </li>
                  );
                })}
              </ul>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
