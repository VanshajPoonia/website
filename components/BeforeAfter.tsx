"use client";

import { useEffect, useRef, useState } from "react";

// One quote request, drawn two ways. Dashed lines are steps a person does by
// hand; solid lines run on their own. Flipping the switch moves "You" out of
// the middle of the flow.

type Mode = "hand" | "auto";

const NODES = {
  website: { x: 150, y: 190, label: "Website", color: "var(--blue)" },
  crm: { x: 560, y: 72, label: "CRM", color: "var(--green)" },
  inbox: { x: 600, y: 190, label: "Inbox", color: "var(--salmon)" },
  calendar: { x: 560, y: 308, label: "Calendar", color: "var(--yellow)" },
};
const YOU = { hand: { x: 360, y: 190 }, auto: { x: 360, y: 330 } };

const HAND = [
  { d: "M212 190 L 318 190", label: "you check email", lx: 265, ly: 178 },
  { d: "M398 176 C 440 120, 470 86, 504 78", label: "you type it in", lx: 430, ly: 104 },
  { d: "M404 190 L 540 190", label: "you write back", lx: 470, ly: 178 },
  { d: "M398 204 C 440 260, 470 296, 504 302", label: "you call to book", lx: 440, ly: 290 },
];
const AUTO = [
  { d: "M212 182 C 320 120, 420 80, 500 74", label: "contact created", lx: 300, ly: 112 },
  { d: "M572 100 C 592 130, 600 150, 600 164", label: "reply sent", lx: 606, ly: 136 },
  { d: "M548 100 C 520 180, 520 240, 548 282", label: "visit booked", lx: 470, ly: 238 },
  { d: "M520 88 C 470 200, 430 300, 398 322", label: "one summary to you", lx: 372, ly: 270, thin: true },
];

const STEPS: Record<Mode, { title: string; items: string[] }> = {
  hand: {
    title: "By hand",
    items: [
      "Check your email for new requests.",
      "Type the details into your CRM or a spreadsheet.",
      "Write the customer a reply.",
      "Call back and forth to find a time.",
    ],
  },
  auto: {
    title: "Automated",
    items: ["Read the summary on your phone.", "Do the job."],
  },
};

export default function BeforeAfter() {
  const [mode, setMode] = useState<Mode>("hand");
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Flip once, a beat after the diagram comes into view, to show the change.
  useEffect(() => {
    if (touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let t = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          io.disconnect();
          t = window.setTimeout(() => setMode("auto"), 1600);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [touched]);

  const pick = (m: Mode) => {
    setTouched(true);
    setMode(m);
  };
  const you = YOU[mode];

  return (
    <div className="ba" ref={ref} data-mode={mode}>
      <div className="ba__switch" role="group" aria-label="Show the work">
        {(["hand", "auto"] as Mode[]).map((m) => (
          <button key={m} type="button" aria-pressed={mode === m} onClick={() => pick(m)}>
            {STEPS[m].title}
          </button>
        ))}
      </div>
      <div className="ba__body">
        <svg className="ba__svg" viewBox="0 0 700 380" role="img" aria-labelledby="ba-title">
          <title id="ba-title">
            {mode === "hand"
              ? "By hand: you sit between the website, CRM, inbox and calendar and move every request yourself."
              : "Automated: the website feeds the CRM, which sends the reply and books the visit. You get one summary."}
          </title>
          <g className="ba__set ba__set--hand">
            {HAND.map((e) => (
              <g key={e.d}>
                <path d={e.d} pathLength={1} className="ba__edge ba__edge--hand" />
                <text x={e.lx} y={e.ly} className="ba__elabel">
                  {e.label}
                </text>
              </g>
            ))}
          </g>
          <g className="ba__set ba__set--auto">
            {AUTO.map((e) => (
              <g key={e.d}>
                <path d={e.d} pathLength={1} className={`ba__edge ba__edge--auto${e.thin ? " is-thin" : ""}`} />
                <text x={e.lx} y={e.ly} className="ba__elabel">
                  {e.label}
                </text>
              </g>
            ))}
          </g>
          {Object.entries(NODES).map(([id, n]) => (
            <g key={id} transform={`translate(${n.x} ${n.y})`} className="ba__node">
              <rect x={-58} y={-24} width={116} height={48} rx={6} fill={n.color} />
              <rect x={-52} y={-18} width={104} height={36} rx={3} fill="var(--paper)" />
              <text textAnchor="middle" y={5} className="ba__nlabel">
                {n.label}
              </text>
            </g>
          ))}
          <g className="ba__you" style={{ transform: `translate(${you.x}px, ${you.y}px)` }}>
            <circle r={36} className="ba__youring" />
            <circle r={26} className="ba__youdot" />
            <text textAnchor="middle" y={5} className="ba__ylabel">
              You
            </text>
          </g>
        </svg>
        <div className="ba__steps" aria-live="polite">
          <p className="ba__steps-h">What you do</p>
          <ol>
            {STEPS[mode].items.map((s, i) => (
              <li key={`${mode}-${i}`} style={{ ["--i" as string]: i }}>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
