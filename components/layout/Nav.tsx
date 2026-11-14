"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE, pad, projects } from "@/lib/data";
import { NAV, PROJECT_CATS, isActive, thumb } from "@/lib/routes";
import { intro } from "@/lib/intro";
import Logo from "@/components/layout/Logo";
import ResumeChooser from "@/components/ui/ResumeChooser";
import SocialIcons from "@/components/ui/SocialIcons";

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [delay] = useState(() => (path === "/" && !intro.played ? 1.2 : 0.1)); // wait for the intro only on a first load of Home

  useEffect(() => { setOpen(false); setMega(false); }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const mouse = (fn: () => void) => (e: React.PointerEvent) => { if (e.pointerType === "mouse") fn(); };

  return (
    <motion.header data-reveal className={`nav${mega ? " mega-open" : ""}`} initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay, ease: EASE }}
      onPointerLeave={mouse(() => setMega(false))}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(false); }}
      onKeyDown={(e) => { if (e.key === "Escape") setMega(false); }}>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden />
      <div className="nav-in">
        <Link href="/" className="brand" aria-label="BitttuDesigner, home"><Logo tone="light" tagline /></Link>
        <nav aria-label="Primary" className="nav-links">
          {NAV.filter((l) => l.href !== "/contact").map((l) => {
            const on = isActive(path, l.href);
            const link = (
              <Link href={l.href} aria-current={on ? "page" : undefined} onPointerEnter={"mega" in l ? mouse(() => setMega(true)) : mouse(() => setMega(false))}>
                {l.label}
                {on && <motion.i layoutId="nav-dot" className="dot" transition={{ duration: 0.4, ease: EASE }} />}
              </Link>
            );
            return "mega" in l ? (
              <div key={l.href} className="nav-item">
                {link}
                <button type="button" className="nav-caret" aria-expanded={mega} aria-controls="mega-menu" aria-label="Projects menu" onClick={() => setMega((m) => !m)}>
                  <svg viewBox="0 0 12 12" aria-hidden><path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            ) : <span key={l.href} className="nav-item">{link}</span>;
          })}
        </nav>
        <SocialIcons className="nav-soc" label="Behance, LinkedIn and GitHub" />
        <ResumeChooser variant="nav" label="Resume" />
        <Link href="/contact" className="pill nav-cta">Hire me</Link>
        <button className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <span className="sr">{open ? "Close menu" : "Open menu"}</span>
          <i aria-hidden className={open ? "x" : ""} />
        </button>
      </div>

      <AnimatePresence>
        {mega && (
          <motion.div id="mega-menu" className="mega" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease: EASE }}>
            <div className="mega-in">
              <div className="mega-intro">
                <p className="eyebrow">Projects</p>
                <p className="mega-lead">{projects.length} projects across product design, branding and web.</p>
                <Link className="pill solid" href="/projects" onClick={() => setMega(false)}><span>View all projects</span><b aria-hidden>→</b></Link>
              </div>
              <ul className="mega-cards">
                {PROJECT_CATS.map((c, i) => (
                  <li key={c.key}>
                    <Link href={c.href} className="mega-card" onClick={() => setMega(false)}>
                      <span className="mega-media"><img src={thumb(c.items[0], 640)} alt="" loading="lazy" decoding="async" /></span>
                      <span className="mega-ct">{pad(i + 1)} · {pad(c.items.length)} projects</span>
                      <span className="mega-t">{c.title}</span>
                      <span className="mega-b">{c.blurb}</span>
                      <span className="mega-go">Explore <b aria-hidden>→</b></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" aria-label="Mobile" className="mobile-menu" initial={{ clipPath: "circle(0% at calc(100% - 44px) 36px)" }} animate={{ clipPath: "circle(150% at calc(100% - 44px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 36px)" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            {NAV.map((l, i) => (
              <div key={l.href} className="mm-item">
                <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i + 0.1, duration: 0.5, ease: EASE }}>
                  <Link href={l.href} onClick={() => setOpen(false)} aria-current={isActive(path, l.href) ? "page" : undefined}><small>{pad(i + 1)}</small>{l.label}</Link>
                </motion.div>
                {"mega" in l && (
                  <motion.div className="mm-sub" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i + 0.2, duration: 0.5, ease: EASE }}>
                    {PROJECT_CATS.map((c) => <Link key={c.key} href={c.href} onClick={() => setOpen(false)}>{c.title}<small>{pad(c.items.length)}</small></Link>)}
                  </motion.div>
                )}
              </div>
            ))}
            <div className="mm-resume"><ResumeChooser label="Get my resume" /></div>
            <SocialIcons className="mm-soc" label="Behance, LinkedIn and GitHub" />
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
