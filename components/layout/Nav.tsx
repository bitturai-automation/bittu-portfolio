"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, type Variants } from "framer-motion";
import { EASE, pad, projects, site } from "@/lib/data";
import { NAV, PROJECT_CATS, isActive, thumb } from "@/lib/routes";
import { intro } from "@/lib/intro";
import Logo from "@/components/layout/Logo";
import ResumeChooser from "@/components/ui/ResumeChooser";
import SocialIcons from "@/components/ui/SocialIcons";

/* Header + burger menu. All styling lives in styles/nav.css (classes start with "hd-"). */

const BREAKPOINT = 1000; // px: below this the links collapse into the burger menu (keep in sync with nav.css)
const ORIGIN = "calc(100% - 50px) 40px"; // where the burger sits: the full-screen menu opens out of this point

const ArrowUpRight = () => (
  <svg viewBox="0 0 16 16" aria-hidden focusable="false"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Chevron = () => (
  <svg viewBox="0 0 12 12" aria-hidden focusable="false"><path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const list: Variants = { show: { transition: { staggerChildren: 0.06, delayChildren: 0.28 } } };
const item: Variants = {
  hidden: { y: 26, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE } },
};

export default function Nav() {
  const path = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [sub, setSub] = useState(false); // "Projects" accordion inside the burger menu
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [delay] = useState(() => (path === "/" && !intro.played ? 1.2 : 0.1)); // wait for the intro only on a first load of Home

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  useEffect(() => { setOpen(false); setMega(false); setSub(path.startsWith("/projects")); }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia(`(min-width:${BREAKPOINT + 1}px)`);
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); mq.removeEventListener("change", onMq); document.body.style.overflow = ""; };
  }, [open]);

  const mouse = (fn: () => void) => (e: React.PointerEvent) => { if (e.pointerType === "mouse") fn(); };
  const close = () => setOpen(false);
  const clip = (r: string) => `circle(${r} at ${ORIGIN})`;

  return (
    <motion.header data-reveal className={`hd${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}${mega ? " is-mega" : ""}`}
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay, ease: EASE }}>
      <div className="hd-wrap"
        onPointerLeave={mouse(() => setMega(false))}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(false); }}
        onKeyDown={(e) => { if (e.key === "Escape") setMega(false); }}>
        <div className="hd-bar">
          <motion.div className="hd-progress" style={{ scaleX: progress }} aria-hidden />

          <Link href="/" className="hd-brand" aria-label="BitttuDesigner, home"><Logo tone={open ? "light" : "dark"} tagline /></Link>

          <nav aria-label="Primary" className="hd-links">
            {NAV.filter((l) => l.href !== "/contact").map((l) => {
              const on = isActive(path, l.href);
              const hasMega = "mega" in l;
              return (
                <div key={l.href} className={`hd-item${on ? " on" : ""}`} onPointerEnter={mouse(() => setMega(hasMega))}>
                  {on && <motion.i layoutId="hd-pill" className="hd-pill" transition={{ duration: 0.45, ease: EASE }} />}
                  <Link href={l.href} aria-current={on ? "page" : undefined} className="hd-link">{l.label}</Link>
                  {hasMega && (
                    <button type="button" className="hd-caret" aria-expanded={mega} aria-controls="mega-menu" aria-label="Projects menu" onClick={() => setMega((m) => !m)}>
                      <Chevron />
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hd-right">
            <SocialIcons className="hd-soc" label="Behance, LinkedIn and GitHub" />
            <ResumeChooser className="hd-btn hd-btn-ghost hd-resume" label="Resume" />
            <Link href="/contact" className="hd-btn hd-btn-solid hd-cta"><span>Hire me</span><i className="hd-ico"><ArrowUpRight /></i></Link>
            <button type="button" className="hd-burger" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
              <span className="sr">{open ? "Close menu" : "Open menu"}</span>
              <span className="hd-bars" aria-hidden><i /><i /></span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mega && (
            <motion.div id="mega-menu" className="hd-mega" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: EASE }}>
              <div className="hd-mega-card">
                <div className="hd-mega-intro">
                  <p className="eyebrow">Projects</p>
                  <p className="hd-mega-lead">{projects.length} projects across product design, branding and web.</p>
                  <Link className="hd-btn hd-btn-solid" href="/projects" onClick={() => setMega(false)}><span>View all projects</span><i className="hd-ico"><ArrowUpRight /></i></Link>
                </div>
                <ul className="hd-mega-cards">
                  {PROJECT_CATS.map((c, i) => (
                    <li key={c.key}>
                      <Link href={c.href} className="hd-mc" onClick={() => setMega(false)}>
                        <span className="hd-mc-media"><img src={thumb(c.items[0], 640)} alt="" loading="lazy" decoding="async" /></span>
                        <span className="hd-mc-ct">{pad(i + 1)} · {pad(c.items.length)} projects</span>
                        <span className="hd-mc-t">{c.title}</span>
                        <span className="hd-mc-b">{c.blurb}</span>
                        <span className="hd-mc-go">Explore <b aria-hidden>→</b></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" aria-label="Mobile" className="hd-menu"
            initial={reduce ? { opacity: 0 } : { clipPath: clip("0px") }}
            animate={reduce ? { opacity: 1 } : { clipPath: clip("2400px") }}
            exit={reduce ? { opacity: 0 } : { clipPath: clip("0px") }}
            transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.76, 0, 0.24, 1] }}>
            <motion.div className="hd-mbody" variants={list} initial="hidden" animate="show">
              <motion.p variants={item} className="hd-mlabel">Menu</motion.p>
              <ul className="hd-mlist">
                {NAV.map((l, i) => {
                  const on = isActive(path, l.href);
                  const hasSub = "mega" in l;
                  return (
                    <motion.li key={l.href} variants={item} className="hd-mrow">
                      <div className="hd-mrow-in">
                        <Link href={l.href} onClick={close} aria-current={on ? "page" : undefined} className="hd-mlink">
                          <small>{pad(i + 1)}</small><span>{l.label}</span>
                          {!hasSub && <i className="hd-marrow"><ArrowUpRight /></i>}
                        </Link>
                        {hasSub && (
                          <button type="button" className="hd-mtoggle" aria-expanded={sub} aria-controls="mm-projects" aria-label={sub ? "Hide project categories" : "Show project categories"} onClick={() => setSub((s) => !s)}>
                            <Chevron />
                          </button>
                        )}
                      </div>
                      {hasSub && (
                        <AnimatePresence initial={false}>
                          {sub && (
                            <motion.div id="mm-projects" className="hd-msubs-wrap" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                              <div className="hd-msubs">
                                {PROJECT_CATS.map((c) => (
                                  <Link key={c.key} href={c.href} onClick={close} className="hd-msub" aria-current={isActive(path, c.href) ? "page" : undefined}>
                                    <span className="hd-msub-img"><img src={thumb(c.items[0], 160)} alt="" loading="lazy" decoding="async" /></span>
                                    <span className="hd-msub-t"><b>{c.title}</b><small>{pad(c.items.length)} projects</small></span>
                                    <i className="hd-marrow"><ArrowUpRight /></i>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div variants={item} className="hd-mfoot">
                <Link href="/contact" onClick={close} className="hd-btn hd-btn-solid hd-btn-lg"><span>Hire me</span><i className="hd-ico"><ArrowUpRight /></i></Link>
                <div className="hd-mfoot-row">
                  <ResumeChooser className="hd-btn hd-btn-onink" label="Get my resume" />
                  <SocialIcons className="hd-soc hd-soc-m" label="Behance, LinkedIn and GitHub" />
                </div>
                {site.person.email && <a className="hd-mmail" href={`mailto:${site.person.email}`}>{site.person.email}</a>}
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
