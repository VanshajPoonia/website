"use client";

import { useEffect, useRef, useState } from "react";
import { sendRoute, type StationId } from "@/lib/route";

// The example log beside the cover scene. It is the scene's clock: each line
// it writes sends a card between trays. A small clerk made of characters
// keeps watch and changes face as the work gets done.

type Step = { at: string; text: string; station: StationId; route?: [StationId, StationId] };
type Scenario = { title: string; steps: Step[]; yours: string };

const SCENARIOS: Scenario[] = [
  {
    title: "a roof repair quote",
    steps: [
      { at: "09:14", text: "Quote request from your website", station: "website", route: ["website", "crm"] },
      { at: "09:14", text: "Contact created in your CRM", station: "crm", route: ["crm", "inbox"] },
      { at: "09:14", text: "Reply sent to the customer", station: "inbox", route: ["crm", "calendar"] },
      { at: "09:15", text: "Inspection booked, Tue 10:00", station: "calendar" },
    ],
    yours: "Your part: show up on Tuesday.",
  },
  {
    title: "an online order",
    steps: [
      { at: "13:02", text: "Order placed on your website", station: "website", route: ["website", "crm"] },
      { at: "13:02", text: "Customer record updated", station: "crm", route: ["crm", "inbox"] },
      { at: "13:02", text: "Receipt emailed to the customer", station: "inbox", route: ["crm", "calendar"] },
      { at: "13:03", text: "Delivery booked, Fri 2:00 PM", station: "calendar" },
    ],
    yours: "Your part: load the truck.",
  },
  {
    title: "a membership application",
    steps: [
      { at: "18:40", text: "Application sent from your website", station: "website", route: ["website", "crm"] },
      { at: "18:40", text: "Applicant added to your CRM", station: "crm", route: ["crm", "inbox"] },
      { at: "18:40", text: "Welcome email sent", station: "inbox", route: ["crm", "calendar"] },
      { at: "18:41", text: "Tour booked, Sat 11:00 AM", station: "calendar" },
    ],
    yours: "Your part: give the tour.",
  },
];

const FACES = {
  idle: ["(", "•", "_", "•", ")"],
  busy: ["(", "•", "‿", "•", ")"],
  done: ["(", "^", "‿", "^", ")"],
} as const;
type Mood = keyof typeof FACES;
const NOISE = "▓▒░#%*+=<>/\\|◇◆°~:;";

const STEP_MS = 1250;
const HOLD_MS = 3600;

export default function RoutingLog() {
  const [scenario, setScenario] = useState(0);
  const [shown, setShown] = useState(0);
  const [mood, setMood] = useState<Mood>("idle");
  const faceRef = useRef<HTMLSpanElement>(null);
  const reduced = useRef(false);

  // Timeline: write one line per beat, then hold, then move to the next example.
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) {
      setShown(SCENARIOS[0].steps.length + 1);
      setMood("done");
      return;
    }
    let cancelled = false;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(() => !cancelled && fn(), ms));
    let paused = false;
    const run = (idx: number) => {
      const s = SCENARIOS[idx];
      setScenario(idx);
      setShown(0);
      setMood("idle");
      s.steps.forEach((step, i) => {
        at(500 + i * STEP_MS, () => {
          if (paused) return;
          setShown(i + 1);
          setMood("busy");
          if (step.route) sendRoute(step.route[0], step.route[1]);
        });
      });
      const end = 500 + s.steps.length * STEP_MS;
      at(end, () => {
        setShown(s.steps.length + 1);
        setMood("done");
      });
      at(end + HOLD_MS, () => run((idx + 1) % SCENARIOS.length));
    };
    const onVis = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);
    run(0);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // The clerk's face decodes from one expression to the next, slot by slot.
  useEffect(() => {
    const el = faceRef.current;
    if (!el) return;
    const slots = Array.from(el.children) as HTMLSpanElement[];
    const target = FACES[mood];
    if (reduced.current) {
      slots.forEach((s, i) => (s.textContent = target[i]));
      return;
    }
    const timers: number[] = [];
    slots.forEach((slot, i) => {
      if (slot.textContent === target[i]) return;
      const frames = 4 + ((Math.random() * 4) | 0);
      for (let f = 0; f < frames; f++) {
        timers.push(window.setTimeout(() => (slot.textContent = NOISE[(Math.random() * NOISE.length) | 0]), f * 40 + i * 25));
      }
      timers.push(window.setTimeout(() => (slot.textContent = target[i]), frames * 40 + i * 25));
    });
    return () => timers.forEach(clearTimeout);
  }, [mood]);

  const s = SCENARIOS[scenario];
  return (
    <figure className="log" aria-label="Example: how an automated request moves through a business">
      <figcaption className="log__head">
        <span className="log__title">
          Example: <span className="log__scenario">{s.title}</span>
        </span>
        <span className="log__clerk mono" ref={faceRef} aria-hidden="true">
          {FACES.idle.map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </span>
      </figcaption>
      <ol className="log__lines mono">
        {s.steps.map((step, i) => (
          <li key={`${scenario}-${i}`} className="log__line" data-on={i < shown} data-station={step.station}>
            <span className="log__at">{step.at}</span>
            <span className="log__text">{step.text}</span>
            <span className="log__chip" data-station={step.station}>
              {step.station}
            </span>
          </li>
        ))}
      </ol>
      <p className="log__yours" data-on={shown > s.steps.length}>
        {s.yours}
      </p>
    </figure>
  );
}
