"use client";

import { useEffect, useRef, useState } from "react";
import HeroFallback from "./HeroFallback";

// Mounts the WebGL cover scene once the page is idle and on screen, so
// three.js never competes with the first paint. The drawn fallback stays in
// place until the scene has rendered, and for good if WebGL is unavailable.
export default function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let stop: (() => void) | undefined;
    let cancelled = false;

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const v = (name: string) => css.getPropertyValue(name).trim();

    const boot = async () => {
      try {
        const { startScene } = await import("@/lib/scene");
        if (cancelled) return;
        stop = await startScene({
          canvas,
          reduced,
          tokens: {
            ink: v("--ink"),
            paper: v("--paper"),
            blue: v("--blue"),
            green: v("--green"),
            yellow: v("--yellow"),
            salmon: v("--salmon"),
            font: v("--font-display") || "sans-serif",
          },
          onReady: () => !cancelled && setReady(true),
        });
        if (cancelled) stop();
      } catch {
        /* the drawn fallback stays */
      }
    };

    // three.js is the heaviest thing on the page, so it waits for the visitor:
    // the first pointer move, touch, scroll or key press, or a few quiet
    // seconds, whichever comes first. Until then the drawn version stands in.
    const INTENT = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;
    let armed = false;
    let fallbackTimer = 0;
    let idleHandle = 0;
    const go = () => {
      if (armed) return;
      armed = true;
      INTENT.forEach((t) => window.removeEventListener(t, go));
      window.clearTimeout(fallbackTimer);
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
      idleHandle = w.requestIdleCallback ? w.requestIdleCallback(boot, { timeout: 800 }) : window.setTimeout(boot, 100);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        io.disconnect();
        INTENT.forEach((t) => window.addEventListener(t, go, { once: true, passive: true }));
        fallbackTimer = window.setTimeout(go, 6000);
      }
    });
    io.observe(canvas);

    return () => {
      cancelled = true;
      io.disconnect();
      INTENT.forEach((t) => window.removeEventListener(t, go));
      window.clearTimeout(fallbackTimer);
      window.cancelIdleCallback?.(idleHandle);
      window.clearTimeout(idleHandle);
      stop?.();
    };
  }, []);

  return (
    <div className="scene" data-ready={ready}>
      <HeroFallback />
      <canvas ref={canvasRef} className="scene__canvas" aria-hidden="true" />
    </div>
  );
}
