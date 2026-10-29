"use client";
import { useEffect, useRef, type RefObject } from "react";
import { animate } from "framer-motion";
import { EASE, graphic, uiux, web, type Project } from "@/lib/data";

/**
 * Hero mouse-reveal layer.
 *
 * - Previews are the REAL first image of real projects (data/projects.json), preloaded quietly and only shown once decoded,
 *   so a broken/slow image never appears as a placeholder.
 * - A fixed pool of DOM slots is reused. Pointer movement never touches React state: listeners write straight to the DOM,
 *   position is eased in one requestAnimationFrame loop that only runs while previews are visible.
 * - ONE idle timer (`timer`) is the single source of truth: every interaction clears it before arming a new one.
 *     idle 3s        -> fade everything out
 *     pointer leaves -> fade everything out after a short 160ms grace
 * - Touch/pen-less devices: tap reveals a small fan of previews, same 3s idle rule; scrolling is never intercepted.
 * - prefers-reduced-motion: max 3 previews, opacity-only, no drift/rotation.
 */

const IDLE_MS = 3000;
const LEAVE_MS = 160;
const POOL = 9;
const MAX_LIVE = 6;
const MIN_DIST = 150; // px of pointer travel between spawns
const MIN_GAP = 110; // ms between spawns
const SIZES = [230, 170, 270, 200, 150, 250, 180, 220, 160]; // box width at 1440px viewport
const DEPTH = [0.14, 0.3, 0.2, 0.38, 0.17, 0.32, 0.22, 0.27, 0.12]; // how far each artifact trails the pointer
const KIND: Record<Project["category"], string> = { uiux: "UI/UX", web: "Website", graphic: "Brand" };
const FAN = [[-0.9, -0.55], [0.85, -0.1], [-0.15, 0.8]]; // tap layout, in preview-widths from the tap point

type Slot = {
  i: number; el: HTMLDivElement; inner: HTMLDivElement; box: HTMLDivElement; img: HTMLImageElement; title: HTMLElement; kind: HTMLElement;
  state: "free" | "live" | "fading"; token: number; freeT?: number; ctl?: { stop: () => void };
  x: number; y: number; ax: number; ay: number; px0: number; py0: number; w: number; h: number; tilt: number; rot: number; id: string; depth: number;
};

/** Candidate previews: interleave UI/UX, websites and a few brand covers so the mix feels curated, not random. */
function candidates(): Project[] {
  const a = uiux.filter((p) => p.images[0]).slice(0, 7), b = web.filter((p) => p.images[0]).slice(0, 6), c = graphic.filter((p) => p.images[0]).slice(0, 3);
  const out: Project[] = [];
  for (let i = 0; i < 7; i++) [a[i], b[i], c[i]].forEach((p) => p && out.push(p));
  return out;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export default function HeroReveal({ host }: { host: RefObject<HTMLElement | null> }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = host.current, layer = layerRef.current;
    if (!section || !layer) return;
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dead = false;

    /* ---------- slots ---------- */
    const slots: Slot[] = [...layer.children].map((n, i) => {
      const el = n as HTMLDivElement;
      return {
        i, el, inner: el.querySelector(".pv-in") as HTMLDivElement, box: el.querySelector(".pv-img") as HTMLDivElement,
        img: el.querySelector("img") as HTMLImageElement, title: el.querySelector(".pv-cap b") as HTMLElement, kind: el.querySelector(".pv-cap i") as HTMLElement,
        state: "free", token: 0, x: 0, y: 0, ax: 0, ay: 0, px0: 0, py0: 0, w: 0, h: 0, tilt: 0, rot: 0, id: "", depth: 0,
      };
    });
    slots.forEach((s) => { s.el.dataset.state = "free"; s.inner.style.opacity = "0"; });
    let live: Slot[] = []; // oldest first
    let zTop = 1;
    const setLive = (on: boolean) => { section.dataset.live = on ? "1" : "0"; };

    /* ---------- image loading (quiet, low priority, concurrency 3) ---------- */
    const list = candidates();
    const ready: Project[] = [];
    const dims = new Map<string, [number, number]>();
    const keep: HTMLImageElement[] = []; // hold decoded bitmaps so they stay in memory cache
    let loading = false, cursor = 0;
    const startLoading = () => {
      if (loading || dead) return;
      loading = true;
      const queue = [...list];
      let running = 0;
      const pump = () => {
        while (!dead && running < 3 && queue.length) {
          const p = queue.shift()!;
          running++;
          const im = new Image();
          im.decoding = "async";
          (im as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "low";
          const done = () => { running--; pump(); };
          im.onload = () => {
            const ok = () => { if (!dead && im.naturalWidth > 0) { dims.set(p.id, [im.naturalWidth, im.naturalHeight]); ready.push(p); keep.push(im); } };
            (im.decode ? im.decode() : Promise.resolve()).then(ok, ok); // decode failure still has a usable image
            done();
          };
          im.onerror = done; // failed thumbnails are silently skipped: no broken placeholders
          im.src = p.images[0];
        }
      };
      pump();
    };
    const idleStart = window.setTimeout(startLoading, 1500); // begin quiet preloading shortly after first paint

    const nextProject = (): Project | null => {
      if (!ready.length) return null;
      const used = new Set(slots.filter((s) => s.state === "live").map((s) => s.id));
      for (let k = 0; k < ready.length; k++) {
        const idx = (cursor + k) % ready.length;
        if (!used.has(ready[idx].id)) { cursor = idx + 1; return ready[idx]; }
      }
      return null;
    };

    /* ---------- placement ---------- */
    let rect = layer.getBoundingClientRect();
    const place = (s: Slot) => {
      s.el.style.transform = `translate3d(${(s.x - rect.left - s.w / 2).toFixed(1)}px,${(s.y - rect.top - s.h / 2).toFixed(1)}px,0) rotate(${s.tilt.toFixed(2)}deg)`;
    };
    const bounds = (s: Slot, x: number, y: number): [number, number] => [
      clamp(x, rect.left + s.w / 2 + 8, rect.right - s.w / 2 - 8),
      clamp(y, rect.top + s.h / 2 + 8, rect.bottom - s.h / 2 - 28),
    ];

    const ptr = { x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 };
    let lastSpawn: { x: number; y: number; t: number } | null = null;

    const takeSlot = (): Slot => {
      let s = slots.find((x) => x.state === "free");
      if (!s) s = slots.filter((x) => x.state === "fading").sort((a, b) => a.token - b.token)[0] ?? live[0];
      s.ctl?.stop(); window.clearTimeout(s.freeT);
      s.token++;
      live = live.filter((x) => x !== s);
      return s;
    };

    const retire = (s: Slot, delay = 0, dur = 0.55) => {
      if (s.state !== "live") return;
      live = live.filter((x) => x !== s);
      s.state = "fading"; s.el.dataset.state = "fading";
      const tok = ++s.token;
      const reduce = mqReduce.matches;
      s.ctl = animate(s.inner, reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -10, rotate: s.rot + 3 }, { duration: dur, delay, ease: [0.4, 0, 0.2, 1] });
      // Mark the slot reusable once the fade has finished. A timeout (not the animation promise) is authoritative so a
      // no-op animation (slot retired before its entrance began) can never leave a slot stuck in "fading".
      window.clearTimeout(s.freeT);
      s.freeT = window.setTimeout(() => {
        if (s.token === tok && !dead) { s.state = "free"; s.el.dataset.state = "free"; s.id = ""; }
      }, (delay + dur) * 1000 + 60);
    };

    const spawn = (cx: number, cy: number, o: { delay?: number; jitter?: boolean } = {}) => {
      const p = nextProject();
      const dim = p && dims.get(p.id);
      if (!p || !dim) return false;
      rect = layer.getBoundingClientRect();
      const reduce = mqReduce.matches;
      const max = reduce ? 3 : MAX_LIVE;
      while (live.length >= max) retire(live[0], 0, 0.4);
      const s = takeSlot();
      const sc = clamp(innerWidth / 1440, 0.55, 1.1);
      const bw = SIZES[s.i] * sc, bh = bw * 0.8;
      const k = Math.min(bw / dim[0], bh / dim[1]); // fit inside the box, natural ratio preserved (no crop, no stretch)
      s.w = Math.round(dim[0] * k); s.h = Math.round(dim[1] * k); s.id = p.id;
      s.box.style.width = s.w + "px"; s.box.style.height = s.h + "px"; s.inner.style.width = s.w + "px";
      s.img.src = p.images[0];
      s.title.textContent = p.title.replace(/\s+[—–-]\s+.*$/, ""); s.kind.textContent = KIND[p.category];
      const j = o.jitter === false || reduce ? 0 : 22;
      [s.x, s.y] = bounds(s, cx + (Math.random() - 0.5) * 2 * j, cy + (Math.random() - 0.5) * 2 * j);
      s.ax = s.x; s.ay = s.y; s.px0 = ptr.x; s.py0 = ptr.y; s.depth = DEPTH[s.i];
      s.rot = reduce ? 0 : (Math.random() < 0.5 ? -1 : 1) * (3 + Math.random() * 6); s.tilt = 0;
      s.state = "live"; s.el.dataset.state = "live"; s.el.style.zIndex = String(++zTop);
      place(s); live.push(s); setLive(true);
      const tok = s.token;
      s.inner.style.opacity = "0";
      const show = () => {
        if (s.token !== tok || dead) return;
        s.ctl = animate(
          s.inner,
          reduce ? { opacity: [0, 1] } : { opacity: [0, 1], scale: [0.78, 1], rotate: [s.rot - 9, s.rot], y: [22, 0] },
          { duration: reduce ? 0.35 : 0.75, delay: o.delay ?? 0, ease: EASE },
        );
      };
      (s.img.decode ? s.img.decode() : Promise.resolve()).then(show, show);
      return true;
    };

    /* ---------- the one idle timer ---------- */
    let timer = 0;
    const arm = (ms: number) => { window.clearTimeout(timer); timer = window.setTimeout(() => { timer = 0; clearAll(); }, ms); };
    const clearAll = () => {
      window.clearTimeout(timer); timer = 0;
      live.slice().forEach((s, i) => retire(s, i * 0.045));
      live = [];
      setLive(false);
      lastSpawn = null;
    };

    /* ---------- easing loop (runs only while previews are live) ---------- */
    let raf = 0, last = 0;
    const frame = (t: number) => {
      raf = 0;
      if (!live.length || dead) return;
      const dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t;
      rect = layer.getBoundingClientRect();
      const k = 1 - Math.exp(-dt * 5.5);
      ptr.vx += ((ptr.x - ptr.lastX) / Math.max(dt, 0.001) - ptr.vx) * k; ptr.vy += ((ptr.y - ptr.lastY) / Math.max(dt, 0.001) - ptr.vy) * k;
      ptr.lastX = ptr.x; ptr.lastY = ptr.y;
      for (const s of live) {
        const [tx, ty] = bounds(s, s.ax + (ptr.x - s.px0) * s.depth, s.ay + (ptr.y - s.py0) * s.depth);
        s.x += (tx - s.x) * k; s.y += (ty - s.y) * k;
        s.tilt += (clamp(ptr.vx * 0.004 * (s.depth + 0.5), -5, 5) - s.tilt) * k;
        place(s);
      }
      raf = requestAnimationFrame(frame);
    };
    const loop = () => { if (!raf && !mqReduce.matches && live.length) { last = performance.now(); ptr.lastX = ptr.x; ptr.lastY = ptr.y; raf = requestAnimationFrame(frame); } };

    /* ---------- mouse / pen ---------- */
    const interactive = (t: EventTarget | null) => !!(t as Element | null)?.closest?.("a,button,[role=button]");
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      ptr.x = e.clientX; ptr.y = e.clientY;
      startLoading();
      const now = performance.now();
      const far = !lastSpawn || Math.hypot(e.clientX - lastSpawn.x, e.clientY - lastSpawn.y) >= MIN_DIST;
      if (far && (!lastSpawn || now - lastSpawn.t >= MIN_GAP) && !interactive(e.target)) {
        if (spawn(e.clientX, e.clientY)) lastSpawn = { x: e.clientX, y: e.clientY, t: now };
      }
      arm(IDLE_MS); // every movement cancels the previous countdown and starts a fresh one
      loop();
    };
    const onEnter = (e: PointerEvent) => { if (e.pointerType !== "touch") { ptr.x = ptr.lastX = e.clientX; ptr.y = ptr.lastY = e.clientY; startLoading(); } };
    const onLeave = (e: PointerEvent) => { if (e.pointerType !== "touch") arm(LEAVE_MS); };
    const poke = () => { if (live.length) arm(IDLE_MS); }; // wheel / key / click count as interaction while previews are showing

    /* ---------- touch: tap to reveal, never blocks scrolling ---------- */
    let down: { id: number; x: number; y: number; t: number } | null = null;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return poke();
      down = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() };
      startLoading();
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || !down || down.id !== e.pointerId) return;
      const d = down; down = null;
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 10 || performance.now() - d.t > 500 || interactive(e.target)) return;
      live.slice().forEach((s) => retire(s, 0, 0.3));
      live = [];
      ptr.x = e.clientX; ptr.y = e.clientY;
      const sc = clamp(innerWidth / 1440, 0.55, 1.1) * 150;
      let shown = 0;
      FAN.slice(0, mqReduce.matches ? 2 : 3).forEach(([fx, fy], n) => { if (spawn(e.clientX + fx * sc, e.clientY + fy * sc, { delay: n * 0.09, jitter: false })) shown++; });
      if (shown) arm(IDLE_MS);
    };
    const onCancel = () => { down = null; };

    /* ---------- housekeeping ---------- */
    const io = new IntersectionObserver(([en]) => { if (!en.isIntersecting) clearAll(); }, { threshold: 0.05 });
    io.observe(section);
    const onHide = () => { if (document.hidden) clearAll(); };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerenter", onEnter, { passive: true });
    section.addEventListener("pointerleave", onLeave, { passive: true });
    section.addEventListener("pointerdown", onDown, { passive: true });
    section.addEventListener("pointerup", onUp, { passive: true });
    section.addEventListener("pointercancel", onCancel, { passive: true });
    section.addEventListener("wheel", poke, { passive: true });
    section.addEventListener("keydown", poke);
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("blur", clearAll);
    setLive(false);

    return () => {
      dead = true;
      window.clearTimeout(timer);
      window.clearTimeout(idleStart);
      cancelAnimationFrame(raf);
      io.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerenter", onEnter);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointerdown", onDown);
      section.removeEventListener("pointerup", onUp);
      section.removeEventListener("pointercancel", onCancel);
      section.removeEventListener("wheel", poke);
      section.removeEventListener("keydown", poke);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("blur", clearAll);
      slots.forEach((s) => { s.ctl?.stop(); window.clearTimeout(s.freeT); });
    };
  }, [host]);

  return (
    <div className="pv-layer" ref={layerRef} aria-hidden>
      {Array.from({ length: POOL }, (_, i) => (
        <div className="pv" data-state="free" key={i}>
          <div className="pv-in">
            <div className="pv-img">{/* eslint-disable-next-line @next/next/no-img-element */}<img alt="" draggable={false} decoding="async" /></div>
            <p className="pv-cap"><b /><i /></p>
          </div>
        </div>
      ))}
    </div>
  );
}
