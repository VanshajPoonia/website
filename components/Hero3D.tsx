"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// The cover's sorting line. A poster frame of the 3D scene paints first; the
// live scene takes over once the visitor moves, scrolls or waits a few
// seconds. Under reduced motion, on Save-Data or without WebGL the poster is
// all there is, and it says the same thing.
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;

    const css = getComputedStyle(document.documentElement);
    const v = (name: string) => css.getPropertyValue(name).trim();

    const boot = async () => {
      try {
        const { startScene } = await import("@/lib/scene");
        if (cancelled) return;
        stop = await startScene({
          canvas,
          tokens: {
            ink: v("--ink"),
            paper: v("--paper"),
            blue: v("--blue"),
            green: v("--green"),
            yellow: v("--yellow"),
            purple: v("--purple"),
            font: v("--font-display") || "sans-serif",
          },
          onReady: () => !cancelled && setReady(true),
        });
        if (cancelled) stop();
      } catch {
        /* the poster stays */
      }
    };

    // three.js is the heaviest thing on the page, so it waits for the visitor:
    // the first pointer move, touch, scroll or key press, or a few quiet
    // seconds, whichever comes first.
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
        fallbackTimer = window.setTimeout(go, 5000);
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
    <figure className="scene" data-ready={ready}>
      <Image
        className="scene__poster"
        src="/hero/sorting-line.webp"
        alt=""
        width={1402}
        height={876}
        sizes="(max-width: 1100px) min(92vw, 720px), 680px"
        loading="eager"
        fetchPriority="high"
      />
      <canvas ref={canvasRef} className="scene__canvas" aria-hidden="true" />
      <figcaption className="sr-only">
        Example: an email, a web form, a text and an order arrive. AI reads each one, tags it, and a robot arm files it in the
        CRM, the calendar or the replies tray.
      </figcaption>
    </figure>
  );
}
