"use client";

import { createElement, useEffect, useRef } from "react";

// Letters assemble into words. The final text is rendered on the server, so
// search engines, screen readers and the first paint all see real copy. On the
// client each glyph cell is locked to its final width, cycles through noise,
// and lands left to right. Nothing reflows while it runs.

const NOISE_UPPER = "ABDEFGHKMNPRSTUVWXYZ0123456789#%&+=/<>";
const NOISE_LOWER = "abcdefghkmnoprstuvwxyz0123456789#%&+=/";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  id?: string;
  /** "mount" runs once on hydration, "view" when scrolled into view. */
  trigger?: "mount" | "view";
  /** Total duration in ms. */
  duration?: number;
};

export default function Decode({ text, as = "h2", className, id, trigger = "view", duration = 900 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cells = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-c]"));
    let raf = 0;
    let started = false;

    const run = async () => {
      if (started) return;
      started = true;
      await document.fonts?.ready;
      const finals = cells.map((c) => c.dataset.c ?? "");
      // Lock every cell to the width of its final glyph before scrambling.
      const widths = cells.map((c) => c.getBoundingClientRect().width);
      cells.forEach((c, i) => {
        c.style.display = "inline-block";
        c.style.width = `${widths[i]}px`;
        c.classList.add("is-noise");
      });
      const n = cells.length;
      const settleAt = cells.map((_, i) => (i / Math.max(1, n - 1)) * duration * 0.7 + Math.random() * duration * 0.3);
      const t0 = performance.now();
      let lastSwap = 0;
      const tick = (now: number) => {
        const t = now - t0;
        const swap = now - lastSwap > 45;
        if (swap) lastSwap = now;
        let pending = 0;
        for (let i = 0; i < n; i++) {
          const c = cells[i];
          if (t >= settleAt[i]) {
            if (c.classList.contains("is-noise")) {
              c.textContent = finals[i];
              c.classList.remove("is-noise");
            }
            continue;
          }
          pending++;
          if (swap && finals[i].trim()) {
            const pool = finals[i] === finals[i].toLowerCase() ? NOISE_LOWER : NOISE_UPPER;
            c.textContent = pool[(Math.random() * pool.length) | 0];
          }
        }
        if (pending) raf = requestAnimationFrame(tick);
        else
          cells.forEach((c) => {
            c.style.display = "";
            c.style.width = "";
          });
      };
      raf = requestAnimationFrame(tick);
    };

    let io: IntersectionObserver | undefined;
    if (trigger === "mount") run();
    else {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect();
            run();
          }
        },
        { threshold: 0.55 },
      );
      io.observe(el);
    }
    return () => {
      io?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [trigger, duration]);

  const words = text.split(" ");
  return createElement(
    as,
    { ref, className: ["decode", className].filter(Boolean).join(" "), id, "aria-label": text },
    // Spaces sit between the no-wrap word spans so lines can still break.
    words.flatMap((w, wi) => [
      wi > 0 ? " " : null,
      <span key={wi} className="decode__w" aria-hidden="true">
        {Array.from(w).map((ch, ci) => (
          <span key={ci} data-c={ch}>
            {ch}
          </span>
        ))}
      </span>,
    ]),
  );
}
