"use client";
import { useCallback, useEffect, useRef } from "react";

/**
 * Pointer-aware card hover. Returns props to spread on the card's *stable* hit element (never the element that moves, so
 * there is no enter/leave flicker). It only toggles `data-fx` and two CSS variables (--mx/--my, -1..1); all visuals are CSS.
 * Mouse/pen get hover; touch gets a short pressed state (data-press) and never a sticky hover. Reduced-motion users get the colour/arrow states but no parallax.
 */
export function useFx<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const raf = useRef(0);
  const pt = useRef({ x: 0, y: 0 });

  const reset = useCallback(() => {
    cancelAnimationFrame(raf.current); raf.current = 0;
    const el = ref.current;
    if (!el) return;
    delete el.dataset.fx; delete el.dataset.press;
    el.style.setProperty("--mx", "0"); el.style.setProperty("--my", "0");
  }, []);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return {
    ref,
    onPointerEnter: (e: React.PointerEvent<T>) => { if (e.pointerType !== "touch") e.currentTarget.dataset.fx = "1"; },
    onPointerMove: (e: React.PointerEvent<T>) => {
      if (e.pointerType === "touch" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      pt.current.x = e.clientX; pt.current.y = e.clientY;
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", String(Math.max(-1, Math.min(1, ((pt.current.x - r.left) / r.width - 0.5) * 2)).toFixed(3)));
        el.style.setProperty("--my", String(Math.max(-1, Math.min(1, ((pt.current.y - r.top) / r.height - 0.5) * 2)).toFixed(3)));
      });
    },
    // Touch: immediate pressed state on finger-down. pointercancel fires when a scroll gesture starts, so scrolling clears it.
    onPointerDown: (e: React.PointerEvent<T>) => { if (e.pointerType === "touch") e.currentTarget.dataset.press = "1"; },
    onPointerUp: (e: React.PointerEvent<T>) => { if (e.pointerType === "touch") delete e.currentTarget.dataset.press; },
    onPointerLeave: reset,
    onPointerCancel: reset,
  };
}
