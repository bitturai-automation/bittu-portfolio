"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE, site } from "@/lib/data";

const LINKS = [
  { id: "work", label: "Product & UI/UX" },
  { id: "builds", label: "Websites" },
  { id: "brand", label: "Graphic" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useEffect(() => {
    const ids = [...LINKS.map((l) => l.id), "contact"];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <motion.header data-reveal className="nav" initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 1.2, ease: EASE }}>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden />
      <div className="nav-in">
        <a href="#top" className="brand" aria-label="Bittu Rai, back to top">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/img/logo-light.png" alt="" width={150} height={34} /></a>
        <nav aria-label="Primary" className="nav-links">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined}>
              {l.label}
              {active === l.id && <motion.i layoutId="nav-dot" className="dot" transition={{ duration: 0.4, ease: EASE }} />}
            </a>
          ))}
        </nav>
        <a href="#contact" className="pill nav-cta">Hire me</a>
        <button className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <span className="sr">{open ? "Close menu" : "Open menu"}</span>
          <i aria-hidden className={open ? "x" : ""} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" aria-label="Mobile" className="mobile-menu" initial={{ clipPath: "circle(0% at calc(100% - 44px) 36px)" }} animate={{ clipPath: "circle(150% at calc(100% - 44px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 36px)" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            {[...LINKS, { id: "contact", label: "Contact" }].map((l, i) => (
              <motion.a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i + 0.1, duration: 0.5, ease: EASE }}>
                <small>{String(i + 1).padStart(2, "0")}</small>{l.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
