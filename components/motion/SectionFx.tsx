"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll choreography.
 *  - Every section OPENS as it scrolls in (soft curtain: rounded clip that widens to full width) and CLOSES again when it scrolls out.
 *  - Inside each section, its parts (heading, text, cards, list items, chips…) open ONE BY ONE, and close again as they leave the screen,
 *    in both scroll directions.
 *  Elements that already animate through <Reveal>/<Split> (Framer Motion) are left alone here; those now replay too (once:false).
 *  Pinned / sticky galleries (#work, #brand, #builds) only get the parts stagger, never a section clip, so their pinning is untouched.
 *  Everything is class-toggled by IntersectionObserver (no per-frame work), and fully skipped for prefers-reduced-motion.
 */
const PINNED = "#work,#brand,#builds,#experience";
const SKIP = "[data-reveal],.sr,.skip,.hx-wrap,.gd-pin,.xr-pin,.wk,.mq,.tm-mark,.badge,.mag,script,style";
const STEP = 90;   // ms between parts that open together
const MAX = 8;     // cap so a long list never waits too long

function parts(sec: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  const ok = (el: Element): el is HTMLElement => el instanceof HTMLElement && !el.matches(SKIP) && !el.closest("[data-reveal]") && !el.querySelector("[data-reveal]") && getComputedStyle(el).position !== "fixed";
  const walk = (el: HTMLElement, depth: number) => {
    const kids = Array.from(el.children).filter((c): c is HTMLElement => c instanceof HTMLElement && !c.matches("script,style"));
    for (const k of kids) {
      if (k.matches(SKIP) || k.closest("[data-reveal]")) continue;
      // a long list / grid / flex row of siblings: animate its items, not the box
      const grid = k.children.length >= 3 && /(grid|flex)/.test(getComputedStyle(k).display);
      const isList = k.matches("ul,ol") || grid;
      if (isList && depth < 3) { walk(k, depth + 1); continue; }
      // thin wrapper with one child: look inside
      if (k.children.length === 1 && depth < 3 && !k.matches("a,button,li,p,h1,h2,h3,h4,figure,blockquote,span")) { walk(k, depth + 1); continue; }
      if (ok(k)) out.push(k);
    }
  };
  walk(sec, 0);
  return out;
}

export default function SectionFx() {
  const pathname = usePathname(); // the layout persists between pages, so redo the setup for each new page
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const secs = Array.from(document.querySelectorAll<HTMLElement>("main > section")).filter((s) => s.id !== "top" && !s.classList.contains("ap"));
    const cleanup: Array<() => void> = [];

    // ---- 1. parts open one by one ----
    const items: HTMLElement[] = [];
    secs.forEach((s) => parts(s).forEach((el) => { if (!items.includes(el)) items.push(el); }));
    items.forEach((el) => el.classList.add("sfx"));
    const io = new IntersectionObserver((entries) => {
      const entering = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      entering.forEach((e, i) => { const el = e.target as HTMLElement; el.style.transitionDelay = `${Math.min(i, MAX) * STEP}ms`; el.dataset.in = "1"; });
      entries.filter((e) => !e.isIntersecting).forEach((e) => { const el = e.target as HTMLElement; el.style.transitionDelay = "0ms"; delete el.dataset.in; });
    }, { rootMargin: "-5% 0px -9% 0px", threshold: 0.08 });
    items.forEach((el) => io.observe(el));
    cleanup.push(() => { io.disconnect(); items.forEach((el) => { el.classList.remove("sfx"); delete el.dataset.in; el.style.transitionDelay = ""; }); });

    // ---- 2. sections open / close ----
    const free = secs.filter((s) => !s.matches(PINNED));
    free.forEach((s) => s.classList.add("sfx-sec"));
    const so = new IntersectionObserver((entries) => {
      entries.forEach((e) => { const s = e.target as HTMLElement; if (e.isIntersecting) s.dataset.open = "1"; else delete s.dataset.open; });
    }, { rootMargin: "0px 0px -14% 0px", threshold: 0 });
    free.forEach((s) => so.observe(s));
    cleanup.push(() => { so.disconnect(); free.forEach((s) => { s.classList.remove("sfx-sec"); delete s.dataset.open; }); });

    // ---- 3. performance: pause looping animations that are off-screen; pause everything while a page change is loading ----
    const LOOPS = ".ap-aurora,.hv-wall,.bm-track,.ap-ticker,.ap-mq-track,.ap-ring,.mq";
    const loops = Array.from(document.querySelectorAll<HTMLElement>(LOOPS));
    loops.forEach((el) => el.classList.add("fx-off"));
    const lo = new IntersectionObserver((es) => es.forEach((e) => (e.target as HTMLElement).classList.toggle("fx-off", !e.isIntersecting)), { rootMargin: "80px 0px" });
    loops.forEach((el) => lo.observe(el));
    cleanup.push(() => { lo.disconnect(); loops.forEach((el) => el.classList.remove("fx-off")); });
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.origin !== location.origin || a.pathname === location.pathname || ev.metaKey || ev.ctrlKey) return;
      root.classList.add("navigating");
      window.setTimeout(() => root.classList.remove("navigating"), 6000); // safety: never stay paused if the page did not change
    };
    document.addEventListener("click", onClick, true);
    root.classList.remove("navigating"); // the new page has arrived
    cleanup.push(() => document.removeEventListener("click", onClick, true));

    root.dataset.sfx = "1";
    return () => { delete root.dataset.sfx; cleanup.forEach((f) => f()); };
  }, [pathname]);
  return null;
}
