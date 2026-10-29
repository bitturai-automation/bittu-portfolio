"use client";
import { useEffect, useRef, useState } from "react";

type Props = { src: string; alt: string; label?: string; eager?: boolean; ratio?: string; className?: string };

/** Natural-ratio image (never cropped). A failed source shows a labelled placeholder instead of breaking the layout. */
export default function SmartImg({ src, alt, label, eager, ratio = "4 / 3", className }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  useEffect(() => {
    const el = ref.current;
    if (el?.complete) setState(el.naturalWidth > 0 ? "ok" : "error");
  }, [src]);
  if (state === "error")
    return <div className={`img-fallback ${className ?? ""}`} style={{ aspectRatio: ratio }} role="img" aria-label={alt}><span>{label ?? alt}</span></div>;
  return (
    <div className={`img-wrap ${state} ${className ?? ""}`} style={state === "loading" ? { aspectRatio: ratio } : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={ref} src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async"
        fetchPriority={eager ? "high" : "auto"} onLoad={() => setState("ok")} onError={() => setState("error")} />
    </div>
  );
}
