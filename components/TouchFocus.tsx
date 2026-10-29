"use client";
import { useEffect } from "react";

/**
 * Touch devices have no :hover, so rows that fill/highlight on hover get the same state from scroll position instead:
 * a row sets data-focus="1" while it crosses the middle band of the viewport (CSS mirrors the hover style on [data-focus]).
 * Scroll-driven, passive (IntersectionObserver only), no listeners on touch events, so scrolling is never affected.
 */
export default function TouchFocus({ selector }: { selector: string }) {
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { (e.target as HTMLElement).dataset.focus = e.isIntersecting ? "1" : "0"; }),
      { rootMargin: "-40% 0px -40% 0px" },
    );
    document.querySelectorAll(selector).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
  return null;
}
