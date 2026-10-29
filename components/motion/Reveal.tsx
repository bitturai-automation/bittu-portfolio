"use client";
import { motion } from "framer-motion";
import { EASE } from "@/lib/data";

type Tag = "div" | "li" | "p" | "h2" | "h3" | "h4" | "span" | "ul" | "ol" | "header";
type Props = {
  children: React.ReactNode; delay?: number; y?: number; x?: number; scale?: number; duration?: number;
  className?: string; as?: Tag; style?: React.CSSProperties;
};

/** One reusable viewport-triggered entrance: opacity + translate (+ optional sideways slide / scale pop).
 *  Defaults are unchanged (y only), so existing uses keep behaving the same. Pass `delay={i * 0.08}` for a stagger. */
export default function Reveal({ children, delay = 0, y = 28, x = 0, scale = 1, duration = 0.7, className, as = "div", style }: Props) {
  const M = motion[as] as typeof motion.div;
  return (
    <M data-reveal className={className} style={style} initial={{ opacity: 0, y, x, scale }} whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ duration, delay, ease: EASE }}>
      {children}
    </M>
  );
}
