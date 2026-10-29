"use client";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { EASE, pad } from "@/lib/data";

/** SSR-safe media query hook (false until mounted). */
export function useMedia(q: string) {
  const [m, setM] = useState(false);
  useEffect(() => { const mq = window.matchMedia(q); const f = () => setM(mq.matches); f(); mq.addEventListener("change", f); return () => mq.removeEventListener("change", f); }, [q]);
  return m;
}

/** Word-by-word masked rise. Reused for every heading. */
export function Split({ text, as = "h2", className, delay = 0 }: { text: string; as?: "h1" | "h2" | "h3" | "p"; className?: string; delay?: number }) {
  const M = motion[as] as typeof motion.h2;
  return (
    <M className={className} aria-label={text} initial="h" whileInView="v" viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className="mask" aria-hidden>
            <motion.span data-reveal className="word" variants={{ h: { y: "112%" }, v: { y: 0 } }} transition={{ duration: 0.8, ease: EASE }}>{w}</motion.span>
          </span>{" "}{/* the gap lives OUTSIDE the mask: a trailing space inside an inline-block collapses, which glued words together ("Let'smake") */}
        </Fragment>
      ))}
    </M>
  );
}

export function SecHead({ n, title, kicker, count }: { n: string; title: string; kicker: string; count?: number }) {
  return (
    <div className="sh">
      <div className="sh-top"><span className="sh-n">{n}</span><span className="sh-k">{kicker}</span>{count !== undefined && <span className="sh-c">{pad(count)} items</span>}</div>
      <Split text={title} className="sh-t" />
    </div>
  );
}

function W({ w, p, a, b }: { w: string; p: MotionValue<number>; a: number; b: number }) {
  const o = useTransform(p, [a, b], [0.24, 1]);
  return <motion.span style={{ opacity: o }}>{w} </motion.span>;
}
/** Words light up as the paragraph scrolls through the viewport. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.6"] });
  const ws = text.split(" ");
  return <p ref={ref} className={className} aria-label={text}>{ws.map((w, i) => <W key={i} w={w} p={scrollYProgress} a={i / ws.length} b={Math.min(1, (i + 2) / ws.length)} />)}</p>;
}

/** Scroll-driven marquee strip. */
export function Marquee({ items, dir = 1, tone = "dark" }: { items: string[]; dir?: 1 | -1; tone?: "dark" | "paper" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], dir === 1 ? ["0%", "-32%"] : ["-32%", "0%"]);
  const row = [...items, ...items, ...items];
  return (
    <div ref={ref} className={`mq ${tone}`} aria-hidden>
      <motion.div className="mq-track" style={{ x }}>
        {row.map((t, i) => <span key={i} className={i % 2 ? "o" : ""}>{t}<i>✦</i></span>)}
      </motion.div>
    </div>
  );
}

/** Section that scales up and squares its corners as it arrives (scroll-linked "curtain"). */
export function Curtain({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const small = useMedia("(max-width:760px)"); // gentler on phones: these sections are thousands of px tall, so keep the scaled layer cheap
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const scale = useTransform(scrollYProgress, [0, 1], [small ? 0.975 : 0.93, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [small ? 28 : 48, 0]);
  return <motion.section id={id} ref={ref} className={className} style={{ scale, borderTopLeftRadius: radius, borderTopRightRadius: radius }}>{children}</motion.section>;
}

/** Pulls its content slightly toward the pointer (fine pointers only). */
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="mag" onPointerMove={(e) => {
      if (e.pointerType !== "mouse" || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px,${(e.clientY - r.top - r.height / 2) * strength}px)`;
    }} onPointerLeave={() => ref.current && (ref.current.style.transform = "")}>{children}</div>
  );
}
