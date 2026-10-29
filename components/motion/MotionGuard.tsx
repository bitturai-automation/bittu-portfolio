"use client";
import { useEffect } from "react";

/**
 * Safety net so no content can stay invisible.
 *  1. Marks the document as hydrated (cancels the pre-hydration `anim-fail` fallback in layout.tsx).
 *  2. Watches every [data-reveal] element. If one has been inside the viewport for 2.5s and is STILL hidden
 *     (opacity ~0, or a masked word still pushed out of its mask) its animation evidently failed to fire,
 *     so it is revealed with a short fade. Normal animations never get near this: they finish in <1.5s.
 * The observer uses a stricter root margin than the reveal animations (-10% vs -8%), so it can only ever
 * act on elements whose own trigger has already had its chance to fire.
 */
export default function MotionGuard() {
  useEffect(() => {
    const d = document.documentElement;
    d.dataset.ready = "1";
    d.classList.remove("anim-fail");

    const timers = new Map<Element, number>();
    const hidden = (el: HTMLElement) => {
      if (parseFloat(getComputedStyle(el).opacity) < 0.05) return true;
      const mask = el.classList.contains("word") ? el.parentElement : null;
      return !!mask && el.getBoundingClientRect().top >= mask.getBoundingClientRect().bottom - 1;
    };
    const rescue = (el: HTMLElement) => {
      el.style.transition = "opacity .5s ease, transform .5s ease";
      el.style.opacity = "1"; el.style.transform = "none"; el.style.clipPath = "none";
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement, t = timers.get(el);
        if (e.isIntersecting && t === undefined) {
          timers.set(el, window.setTimeout(() => { timers.delete(el); if (hidden(el)) rescue(el); }, 2500));
        } else if (!e.isIntersecting && t !== undefined) { clearTimeout(t); timers.delete(el); }
      }
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));

    return () => { io.disconnect(); timers.forEach((t) => clearTimeout(t)); timers.clear(); };
  }, []);
  return null;
}
