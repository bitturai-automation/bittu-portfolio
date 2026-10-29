"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Follower ring for desktop mice only. The native cursor is never hidden. */
export default function Cursor() {
  const [fine, setFine] = useState(false);
  const [label, setLabel] = useState("");
  const [hot, setHot] = useState(false);
  const x = useSpring(useMotionValue(-100), { stiffness: 380, damping: 32, mass: 0.4 });
  const y = useSpring(useMotionValue(-100), { stiffness: 380, damping: 32, mass: 0.4 });
  useEffect(() => {
    const mq = window.matchMedia("(pointer:fine) and (hover:hover)");
    setFine(mq.matches);
    if (!mq.matches) return;
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const c = t.closest<HTMLElement>("[data-cursor]");
      setLabel(c?.dataset.cursor ?? "");
      setHot(!!t.closest("a,button,summary,[data-cursor]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerover", over); };
  }, [x, y]);
  if (!fine) return null;
  return (
    <motion.div className={`cursor ${hot ? "hot" : ""} ${label ? "lbl" : ""}`} style={{ x, y }} aria-hidden>
      <span>{label}</span>
    </motion.div>
  );
}
