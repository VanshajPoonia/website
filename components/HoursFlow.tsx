"use client";

import { useEffect, useRef } from "react";
import Icon, { iconPaths, type IconName } from "./Icon";

// One quote request, run two ways on two lanes: your tools on top, you
// underneath. By hand, the request drops into your lane four times. With
// automation it runs straight along the tools, through AI, and reaches you
// once. The same four jobs still happen there, done by the tools, and each
// one lights up as the request passes. Dashed is done by hand, solid runs on
// its own. Both rows start together. When the automated run is done, the
// hand row pins a lime tag where its own request has got to.

type Lane = "tools" | "you";
type Pt = [number, number];
type Orient = { key: "h" | "v"; w: number; h: number; at: (f: number, lane: Lane) => Pt; r: number };

// Positions are written once along the flow (f) and mapped to a wide layout
// or a tall phone layout.
const WIDE: Orient = { key: "h", w: 1040, h: 196, at: (f, l) => [f, l === "tools" ? 46 : 142], r: 12 };
const TALL: Orient = { key: "v", w: 340, h: 456, at: (f, l) => [l === "tools" ? 78 : 222, 20 + f * 0.42], r: 8 };

const TOOLS: { label: string; icon: IconName; f: number }[] = [
  { label: "Website", icon: "website", f: 150 },
  { label: "CRM", icon: "crm", f: 490 },
  { label: "Inbox", icon: "inbox", f: 730 },
  { label: "Calendar", icon: "calendar", f: 966 },
];
const AI_F = 320;
const YOU_F = 36;
const NODE_W = { tool: 120, ai: 76 };
const NODE_H = 40;
/** Where the "you" lane stops drawing. */
const wideEnd = (o: Orient) => (o.key === "h" ? 1010 : 985);

type Row = {
  id: "hand" | "auto";
  name: string;
  path: [number, Lane][];
  /** Where the request drops into your lane, and rough minutes each one takes. */
  stops: { f: number; label: string; min: number }[];
  /** Work the tools do on their own, labelled at the tool that does it. */
  jobs: { f: number; label: string }[];
  ai: boolean;
  /** Seconds the token spends moving, whatever the layout. */
  move: number;
  pause: number;
  tally: number;
};

const ROWS: Row[] = [
  {
    id: "hand",
    name: "By hand",
    path: [
      [150, "tools"],
      [236, "tools"],
      [236, "you"],
      [404, "you"],
      [404, "tools"],
      [578, "tools"],
      [578, "you"],
      [644, "you"],
      [644, "tools"],
      [818, "tools"],
      [818, "you"],
      [884, "you"],
      [884, "tools"],
      [966, "tools"],
    ],
    stops: [
      // Rough minutes for a typical small business. Calling allows for
      // phone tag.
      { f: 262, label: "check email", min: 2 },
      { f: 380, label: "type it in", min: 5 },
      { f: 611, label: "write back", min: 8 },
      { f: 851, label: "call to book", min: 10 },
    ],
    jobs: [],
    ai: false,
    move: 4.2,
    pause: 0.7,
    tally: 4,
  },
  {
    id: "auto",
    name: "Automated",
    path: [
      [150, "tools"],
      [966, "tools"],
      [966, "you"],
    ],
    stops: [{ f: 966, label: "read summary", min: 1 }],
    jobs: [
      { f: AI_F, label: "reads it" },
      { f: 490, label: "logs it" },
      { f: 730, label: "replies" },
      { f: 966, label: "books it" },
    ],
    ai: true,
    move: 1.7,
    pause: 0.45,
    tally: 1,
  },
];

const HAND = ROWS.find((r) => r.id === "hand")!;
const AUTO = ROWS.find((r) => r.id === "auto")!;

/** Rough minutes of your time the first n stops of a row take. */
const minutes = (r: Row, n = r.stops.length) => r.stops.slice(0, n).reduce((sum, s) => sum + s.min, 0);

/** Quote requests a week for the weekly line. A rough figure for a busy
 *  small business, footnoted on the page. */
const WEEK = 20;

/** 500 → "over 8 hours", 480 → "8 hours", 20 → "20 minutes". */
function spell(m: number): string {
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"}`;
  const h = Math.floor(m / 60);
  return `${m % 60 ? "over " : ""}${h} hour${h === 1 ? "" : "s"}`;
}

// ---------- Path model: orthogonal lines with rounded corners ----------

type Piece = { a: Pt; c?: Pt; b: Pt; len: number; start: number };
type Model = { d: string; pieces: Piece[]; total: number };

const dist = (a: Pt, b: Pt) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const quad = (a: Pt, c: Pt, b: Pt, t: number): Pt => {
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
};

function buildPath(pts: Pt[], radius = 12): Model {
  const pieces: Piece[] = [];
  let cursor = pts[0];
  const push = (p: Omit<Piece, "len" | "start">) => {
    let len = 0;
    if (p.c) {
      let prev = p.a;
      for (let i = 1; i <= 16; i++) {
        const q = quad(p.a, p.c, p.b, i / 16);
        len += dist(prev, q);
        prev = q;
      }
    } else len = dist(p.a, p.b);
    pieces.push({ ...p, len, start: 0 });
  };
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i];
    const r = Math.min(radius, dist(pts[i - 1], p) / 2, dist(p, pts[i + 1]) / 2);
    const inDir: Pt = [(p[0] - pts[i - 1][0]) / dist(pts[i - 1], p), (p[1] - pts[i - 1][1]) / dist(pts[i - 1], p)];
    const outDir: Pt = [(pts[i + 1][0] - p[0]) / dist(p, pts[i + 1]), (pts[i + 1][1] - p[1]) / dist(p, pts[i + 1])];
    const a: Pt = [p[0] - inDir[0] * r, p[1] - inDir[1] * r];
    const b: Pt = [p[0] + outDir[0] * r, p[1] + outDir[1] * r];
    push({ a: cursor, b: a });
    push({ a, c: p, b });
    cursor = b;
  }
  push({ a: cursor, b: pts[pts.length - 1] });
  let total = 0;
  pieces.forEach((p) => {
    p.start = total;
    total += p.len;
  });
  const f = (n: number) => Math.round(n * 10) / 10;
  const d =
    `M${f(pts[0][0])} ${f(pts[0][1])}` +
    pieces.map((p) => (p.c ? `Q${f(p.c[0])} ${f(p.c[1])} ${f(p.b[0])} ${f(p.b[1])}` : `L${f(p.b[0])} ${f(p.b[1])}`)).join("");
  return { d, pieces, total };
}

function pointAt(m: Model, L: number): Pt {
  const l = Math.max(0, Math.min(m.total, L));
  for (const p of m.pieces) {
    if (l <= p.start + p.len || p === m.pieces[m.pieces.length - 1]) {
      const t = p.len ? (l - p.start) / p.len : 0;
      return p.c ? quad(p.a, p.c, p.b, t) : [p.a[0] + (p.b[0] - p.a[0]) * t, p.a[1] + (p.b[1] - p.a[1]) * t];
    }
  }
  return m.pieces[m.pieces.length - 1].b;
}

/** Distance along the path to the point nearest q. Exact on straight
 *  stretches, sampled on corners (a tool sitting on a turn lands there). */
function lengthTo(m: Model, q: Pt): number {
  let best = m.total;
  let gap = Infinity;
  for (const p of m.pieces) {
    if (p.c) {
      for (let i = 0; i <= 16; i++) {
        const d = dist(quad(p.a, p.c, p.b, i / 16), q);
        if (d < gap) [gap, best] = [d, p.start + (p.len * i) / 16];
      }
    } else if (p.len) {
      const ux = (p.b[0] - p.a[0]) / p.len;
      const uy = (p.b[1] - p.a[1]) / p.len;
      const s = Math.max(0, Math.min(p.len, (q[0] - p.a[0]) * ux + (q[1] - p.a[1]) * uy));
      const d = dist([p.a[0] + ux * s, p.a[1] + uy * s], q);
      if (d < gap) [gap, best] = [d, p.start + s];
    }
  }
  return best;
}

// ---------- Timeline ----------

type Ev = { L: number; kind: "touch" | "ai"; stop: number };
type Plan = { model: Model; events: Ev[]; speed: number; pause: number; duration: number };

function plan(row: Row, o: Orient): Plan {
  const model = buildPath(
    row.path.map(([f, l]) => o.at(f, l)),
    o.r,
  );
  const events: Ev[] = row.stops.map((s, i) => ({ L: lengthTo(model, o.at(s.f, "you")), kind: "touch" as const, stop: i }));
  if (row.ai) events.push({ L: lengthTo(model, o.at(AI_F, "tools")), kind: "ai", stop: -1 });
  events.sort((a, b) => a.L - b.L);
  const speed = model.total / row.move;
  return { model, events, speed, pause: row.pause, duration: row.move + events.length * row.pause };
}

type State = { L: number; touches: number; active: Ev | null; tagged: boolean; done: boolean };

function stateAt(p: Plan, t: number): State {
  let L = 0;
  let time = 0;
  let touches = 0;
  let tagged = false;
  for (const e of p.events) {
    const travel = (e.L - L) / p.speed;
    if (t < time + travel) return { L: L + (t - time) * p.speed, touches, active: null, tagged, done: false };
    time += travel;
    L = e.L;
    if (e.kind === "touch") touches++;
    else tagged = true;
    if (t < time + p.pause) return { L, touches, active: e, tagged, done: false };
    time += p.pause;
  }
  const travel = (p.model.total - L) / p.speed;
  if (t < time + travel) return { L: L + (t - time) * p.speed, touches, active: null, tagged, done: false };
  return { L: p.model.total, touches, active: null, tagged, done: true };
}

const LEAD = 0.5;
const HOLD = 2.8;
/** Seconds until the automated run is done. Timings don't depend on layout. */
const AUTO_DONE = plan(AUTO, WIDE).duration;
const MARK_TEXT = "automated: done";

// ---------- Drawing ----------

function Node({ o, f, label, icon, kind = "tool" }: { o: Orient; f: number; label: string; icon: IconName; kind?: "tool" | "ai" }) {
  const [x, y] = o.at(f, "tools");
  const w = NODE_W[kind];
  return (
    <g className={`hf-node hf-node--${kind}`} transform={`translate(${x} ${y})`} data-f={f} data-ai={kind === "ai" || undefined}>
      <g className="hf-node__body">
        <rect x={-w / 2} y={-NODE_H / 2} width={w} height={NODE_H} rx={3} />
        <g transform={`translate(${-w / 2 + 12} -9) scale(0.75)`} className="hf-icon">
          {iconPaths[icon]}
        </g>
        <text x={-w / 2 + 38} y={6}>
          {label}
        </text>
      </g>
    </g>
  );
}

/** A lime tag on the hand row at the spot its request had reached when the
 *  automated run finished. */
function DoneMark({ o, p }: { o: Orient; p: Plan }) {
  const [x, y] = pointAt(p.model, stateAt(p, AUTO_DONE).L);
  const wide = o.key === "h";
  const size = wide ? 13 : 12;
  const w = Math.round(MARK_TEXT.length * size * 0.6) + 16;
  const h = wide ? 26 : 24;
  // Wide: the request is climbing back up to a tool, so the tag sits beside
  // it. Tall: the climb runs sideways, so the tag sits above, kept between
  // the lanes.
  const [toolsX] = o.at(0, "tools");
  const [youX] = o.at(0, "you");
  const tx = wide ? x + 14 : Math.min(Math.max(x - w / 2, toolsX + 6), youX - 6 - w);
  const ty = wide ? y - h / 2 : y - 14 - h;
  return (
    <g className="hf-mark" data-mark>
      <circle className="hf-mark__pin" cx={x} cy={y} r={6} />
      <g className="hf-mark__tag">
        <rect x={tx} y={ty} width={w} height={h} rx={2} />
        <text x={tx + 8} y={ty + h / 2 + size * 0.36} fontSize={size}>
          {MARK_TEXT}
        </text>
      </g>
    </g>
  );
}

function Diagram({ row, o }: { row: Row; o: Orient }) {
  const p = plan(row, o);
  const you = o.at(YOU_F, "you");
  const laneEnd = o.at(wideEnd(o), "you");
  const wide = o.key === "h";
  return (
    <svg
      className={`hf-svg hf-svg--${o.key}`}
      viewBox={`0 0 ${o.w} ${o.h}`}
      data-orient={o.key}
      aria-hidden="true"
      focusable="false"
    >
      <line className="hf-lane" x1={you[0]} y1={you[1]} x2={laneEnd[0]} y2={laneEnd[1]} />
      <path className={`hf-path hf-path--${row.id}`} d={p.model.d} />
      {row.stops.map((s, i) => {
        const [x, y] = o.at(s.f, "you");
        return (
          <g key={s.label} className="hf-stop" data-stop={i} transform={`translate(${x} ${y})`}>
            <circle className="hf-ring" r={8} />
            <circle className="hf-dot" r={7} />
            <text className="hf-label" x={wide ? 0 : 16} y={wide ? 32 : 5} textAnchor={wide ? "middle" : "start"}>
              {s.label}
            </text>
            <text className="hf-min" x={wide ? 0 : 16} y={wide ? 49 : 20} textAnchor={wide ? "middle" : "start"}>
              {s.min} min
            </text>
          </g>
        );
      })}
      {row.id === "hand" ? <DoneMark o={o} p={p} /> : null}
      <g className="hf-token" data-token>
        <rect x={-10} y={-7} width={20} height={14} rx={2} />
        <path d="M-6 -2.5h12M-6 1.5h7" />
      </g>
      {TOOLS.map((t) => (
        <Node key={t.label} o={o} f={t.f} label={t.label} icon={t.icon} />
      ))}
      {row.ai ? <Node o={o} f={AI_F} label="AI" icon="spark" kind="ai" /> : null}
      {row.jobs.map((j, i) => {
        // Wide: above the tool. Tall: beside it, high enough to clear the
        // line that leaves the last tool sideways.
        const [x, y] = o.at(j.f, "tools");
        const half = (j.f === AI_F ? NODE_W.ai : NODE_W.tool) / 2;
        return (
          <text
            key={j.label}
            className="hf-label hf-job"
            data-job={i}
            x={wide ? x : x + half + 8}
            y={wide ? y - NODE_H / 2 - 10 : y - 8}
            textAnchor={wide ? "middle" : "start"}
          >
            {j.label}
          </text>
        );
      })}
      <g className="hf-you" transform={`translate(${you[0]} ${you[1]})`}>
        <g className="hf-you__body">
          <rect x={-31} y={-16} width={62} height={32} rx={3} />
          <text y={5} textAnchor="middle">
            You
          </text>
        </g>
      </g>
    </svg>
  );
}

type Controls = { toggle: () => void; replay: () => void };

export default function HoursFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const ctl = useRef<Controls | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const views = ROWS.flatMap((row) =>
      [WIDE, TALL].map((o) => {
        const svg = root.querySelector<SVGSVGElement>(`[data-row="${row.id}"] svg[data-orient="${o.key}"]`)!;
        const p = plan(row, o);
        const ai = svg.querySelector<SVGGElement>("[data-ai]");
        return {
          row,
          plan: p,
          token: svg.querySelector<SVGGElement>("[data-token]")!,
          stops: Array.from(svg.querySelectorAll<SVGGElement>(".hf-stop")),
          you: svg.querySelector<SVGGElement>(".hf-you")!,
          ai,
          mark: svg.querySelector<SVGGElement>("[data-mark]"),
          jobs: row.jobs.map((j, i) => {
            const node = svg.querySelector<SVGGElement>(`.hf-node[data-f="${j.f}"]`)!;
            const w = j.f === AI_F ? NODE_W.ai : NODE_W.tool;
            return {
              L: lengthTo(p.model, o.at(j.f, "tools")),
              /** How far either side of the tool's centre the token is inside it. */
              reach: (o.key === "h" ? w : NODE_H) / 2,
              label: svg.querySelector<SVGTextElement>(`[data-job="${i}"]`)!,
              node: node === ai ? null : node,
            };
          }),
        };
      }),
    );
    const tallies = Object.fromEntries(ROWS.map((r) => [r.id, root.querySelector<HTMLElement>(`[data-row="${r.id}"] [data-tally]`)!]));
    const mins = Object.fromEntries(ROWS.map((r) => [r.id, root.querySelector<HTMLElement>(`[data-row="${r.id}"] [data-mins]`)!]));
    const counters = Object.fromEntries(ROWS.map((r) => [r.id, root.querySelector<HTMLElement>(`[data-row="${r.id}"] [data-n]`)!]));
    const toggleBtn = root.querySelector<HTMLButtonElement>("[data-ctl='toggle']")!;
    const longest = Math.max(...views.map((v) => v.plan.duration));
    const cycle = LEAD + longest + HOLD;

    const paint = (t: number) => {
      views.forEach((v) => {
        const s = stateAt(v.plan, t);
        const started = t > 0;
        const [x, y] = pointAt(v.plan.model, s.L);
        v.token.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
        v.token.dataset.on = String(started && !s.done);
        v.token.dataset.tagged = String(s.tagged);
        v.stops.forEach((el, i) => {
          el.dataset.on = String(i < s.touches);
          el.dataset.active = String(s.active?.kind === "touch" && s.active.stop === i);
        });
        v.you.dataset.active = String(s.active?.kind === "touch");
        if (v.ai) v.ai.dataset.active = String(s.active?.kind === "ai");
        v.jobs.forEach((j) => {
          j.label.dataset.on = String(started && s.L >= j.L);
          if (j.node) j.node.dataset.active = String(started && !s.done && Math.abs(s.L - j.L) < j.reach);
        });
        if (v.mark) v.mark.dataset.on = String(t >= AUTO_DONE);
        tallies[v.row.id].textContent = String(s.touches);
        counters[v.row.id].dataset.done = String(s.touches >= v.row.tally);
        mins[v.row.id].textContent = String(minutes(v.row, s.touches));
      });
    };

    // Reduced motion opens on the finished state, paused. Play still runs it.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let playing = !reduce;
    let clock = reduce ? LEAD + longest : 0;
    let raf = 0;
    let prev = 0;
    let visible = false;

    const tick = (now: number) => {
      raf = 0;
      if (!playing || !visible || document.hidden) return;
      clock = (clock + Math.min(0.05, (now - prev) / 1000)) % cycle;
      prev = now;
      paint(clock - LEAD);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || !visible || !playing) return;
      prev = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const setPlaying = (on: boolean) => {
      playing = on;
      toggleBtn.dataset.playing = String(on);
      if (on) start();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    ctl.current = {
      toggle() {
        // Paused on the finished state: play from the top.
        if (!playing && clock - LEAD >= longest) clock = 0;
        setPlaying(!playing);
      },
      replay() {
        clock = 0;
        paint(-LEAD);
        setPlaying(true);
      },
    };

    toggleBtn.dataset.playing = String(playing);
    paint(clock - LEAD);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        start();
      },
      { threshold: 0.35 },
    );
    io.observe(root);
    const onVis = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      ctl.current = null;
      io.disconnect();
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="hours" ref={ref}>
      {ROWS.map((row) => (
        <figure key={row.id} className="hours__row" data-row={row.id}>
          <figcaption className="hours__head">
            <span className="hours__name">
              {/* Same stroke as the row's path, so the key always matches it. */}
              <svg className="hours__key" viewBox="0 0 34 4" aria-hidden="true" focusable="false">
                <line className={`hf-path hf-path--${row.id}`} x1={1.5} y1={2} x2={32.5} y2={2} />
              </svg>
              {row.name}
            </span>
            <span className="hours__tally">
              {/* Counting: the live count, then the total faded. Done: only
                  the total, now in ink, in the same spot. */}
              <span className="hours__n mono" data-n data-done="true" aria-hidden="true">
                <span className="hours__now" data-tally>
                  {row.tally}
                </span>
                <span className="hours__of">/</span>
                <span className="hours__total">{row.tally}</span>
              </span>
              <span aria-hidden="true">× through you</span>
              <span className="hours__mins" aria-hidden="true">
                · <span className="mono" data-mins>{minutes(row)}</span> min
              </span>
              <span className="sr-only">
                {row.id === "hand"
                  ? `By hand, the request goes through you four times, about ${minutes(row)} minutes in all: you check email, type it into the CRM, write back, and call to book. The automated run is done before this one reaches the CRM.`
                  : `Automated, the AI reads it, the CRM logs it, the inbox replies and the calendar books it. It reaches you once, as a summary that takes about ${minutes(row)} minute to read.`}
              </span>
            </span>
          </figcaption>
          <Diagram row={row} o={WIDE} />
          <Diagram row={row} o={TALL} />
        </figure>
      ))}
      <div className="hours__foot">
        <div>
          <p className="hours__sum">
            {WEEK} quote requests a week. By hand, <strong>{spell(minutes(HAND) * WEEK)}</strong>. Automated,{" "}
            <strong className="hours__hl">{spell(minutes(AUTO) * WEEK)}</strong>.*
          </p>
          <p className="hours__note">*Rough estimates for a typical small business. Yours will vary.</p>
        </div>
        <div className="hours__ctls">
          <button type="button" className="hours__ctl" data-ctl="toggle" data-playing="true" onClick={() => ctl.current?.toggle()}>
            <span className="hours__ctl-pause">
              <Icon name="pause" size={16} />
              Pause<span className="sr-only"> animation</span>
            </span>
            <span className="hours__ctl-play">
              <Icon name="play" size={16} />
              Play<span className="sr-only"> animation</span>
            </span>
          </button>
          <button type="button" className="hours__ctl" onClick={() => ctl.current?.replay()}>
            <Icon name="replay" size={16} />
            Replay
          </button>
        </div>
      </div>
    </div>
  );
}
