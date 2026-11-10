// The cover scene: four paper trays on the page (website, CRM, inbox,
// calendar) joined by solid ink lines. Cards fly between them when the
// example log fires a route. Loaded on idle, paused off screen, one static
// frame under reduced motion.

import {
  BoxGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  OrthographicCamera,
  PCFShadowMap,
  PlaneGeometry,
  QuadraticBezierCurve3,
  Scene,
  ShadowMaterial,
  SphereGeometry,
  SRGBColorSpace,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
  type BufferGeometry,
  type Material,
  type Texture,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { ROUTE_EVENT, type RouteDetail, type StationId } from "./route";

type Tokens = { ink: string; paper: string; blue: string; green: string; yellow: string; salmon: string; font: string };

const LAYOUT: Record<StationId, { pos: [number, number]; label: string; color: keyof Tokens; icon: StationId }> = {
  website: { pos: [-3.55, -0.35], label: "Website", color: "blue", icon: "website" },
  crm: { pos: [-0.2, -1.75], label: "CRM", color: "green", icon: "crm" },
  inbox: { pos: [3.4, -1.95], label: "Inbox", color: "salmon", icon: "inbox" },
  calendar: { pos: [3.45, 0.7], label: "Calendar", color: "yellow", icon: "calendar" },
};
const LINKS: [StationId, StationId][] = [
  ["website", "crm"],
  ["crm", "inbox"],
  ["crm", "calendar"],
];

const TRAY = { w: 2.05, h: 0.4, d: 1.45 };
const CARD = { w: 0.66, h: 0.018, d: 0.46 };

// Hand the main thread back between setup steps so the scene never lands as
// one long task.
const pause = () => new Promise<void>((r) => setTimeout(r, 0));

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function drawIcon(ctx: CanvasRenderingContext2D, id: StationId, x: number, y: number, s: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s / 24, s / 24);
  ctx.lineWidth = 1.7;
  ctx.lineCap = "square";
  ctx.lineJoin = "miter";
  ctx.beginPath();
  if (id === "website") {
    ctx.rect(3, 4.5, 18, 15);
    ctx.moveTo(3, 9);
    ctx.lineTo(21, 9);
  } else if (id === "crm") {
    ctx.rect(3, 4.5, 18, 15);
    ctx.moveTo(11.3, 11);
    ctx.arc(9, 11, 2.3, 0, Math.PI * 2);
    ctx.moveTo(5.8, 16.5);
    ctx.quadraticCurveTo(9, 12.8, 12.2, 16.5);
    ctx.moveTo(14.5, 10);
    ctx.lineTo(18, 10);
    ctx.moveTo(14.5, 13.5);
    ctx.lineTo(18, 13.5);
  } else if (id === "inbox") {
    ctx.moveTo(3.5, 13.5);
    ctx.lineTo(6, 5.5);
    ctx.lineTo(18, 5.5);
    ctx.lineTo(20.5, 13.5);
    ctx.lineTo(20.5, 20);
    ctx.lineTo(3.5, 20);
    ctx.closePath();
    ctx.moveTo(3.5, 13.5);
    ctx.lineTo(8, 13.5);
    ctx.lineTo(9.5, 16);
    ctx.lineTo(14.5, 16);
    ctx.lineTo(16, 13.5);
    ctx.lineTo(20.5, 13.5);
  } else {
    ctx.rect(3.5, 5, 17, 15);
    ctx.moveTo(3.5, 9.5);
    ctx.lineTo(20.5, 9.5);
    ctx.moveTo(8, 3);
    ctx.lineTo(8, 7);
    ctx.moveTo(16, 3);
    ctx.lineTo(16, 7);
  }
  ctx.stroke();
  ctx.restore();
}

function labelTexture(label: string, icon: StationId, t: Tokens): CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 340;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = t.paper;
  ctx.fillRect(0, 0, c.width, c.height);
  // ruled lines, like a filing card
  ctx.strokeStyle = "rgba(21,23,28,0.09)";
  ctx.lineWidth = 2;
  for (let y = 214; y < c.height - 20; y += 38) {
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(c.width - 40, y);
    ctx.stroke();
  }
  ctx.strokeStyle = t.ink;
  ctx.fillStyle = t.ink;
  drawIcon(ctx, icon, 40, 52, 92);
  ctx.font = `600 76px ${t.font}`;
  ctx.textBaseline = "middle";
  ctx.fillText(label, 150, 100);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export async function startScene({
  canvas,
  reduced,
  tokens,
  onReady,
}: {
  canvas: HTMLCanvasElement;
  reduced: boolean;
  tokens: Tokens;
  onReady?: () => void;
}): Promise<() => void> {
  try {
    await document.fonts?.load(`600 76px ${tokens.font}`);
  } catch {
    /* canvas falls back to the next family in the stack */
  }

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  const scene = new Scene();
  const camera = new OrthographicCamera(-5, 5, 3, -3, 0.1, 100);
  camera.position.set(2.6, 9.2, 8.4);
  camera.lookAt(0, 0, 0.15);

  scene.add(new HemisphereLight(0xffffff, 0xd9dee6, 1.9));
  const sun = new DirectionalLight(0xffffff, 2.1);
  sun.position.set(-4.5, 11, 5.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -7;
  sun.shadow.camera.right = 7;
  sun.shadow.camera.top = 6;
  sun.shadow.camera.bottom = -6;
  sun.shadow.radius = 5;
  sun.shadow.bias = -0.0006;
  scene.add(sun);
  await pause();

  const disposables: (BufferGeometry | Material | Texture)[] = [];
  const keep = <T extends BufferGeometry | Material | Texture>(x: T) => (disposables.push(x), x);

  const root = new Group();
  scene.add(root);

  const ground = new Mesh(keep(new PlaneGeometry(40, 40)), keep(new ShadowMaterial({ opacity: 0.11 })));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  root.add(ground);

  const ink = new Color(tokens.ink);
  const inkMat = keep(new MeshStandardMaterial({ color: ink, roughness: 0.6 }));

  // Stations
  const trayGeo = keep(new RoundedBoxGeometry(TRAY.w, TRAY.h, TRAY.d, 4, 0.09));
  const topGeo = keep(new PlaneGeometry(TRAY.w - 0.24, TRAY.d - 0.24));
  const stations = {} as Record<StationId, { group: Group; top: Vector3; squash: number; vel: number; stack: number }>;
  (Object.keys(LAYOUT) as StationId[]).forEach((id) => {
    const def = LAYOUT[id];
    const g = new Group();
    g.position.set(def.pos[0], 0, def.pos[1]);
    const tray = new Mesh(trayGeo, keep(new MeshStandardMaterial({ color: new Color(tokens[def.color]), roughness: 0.78 })));
    tray.position.y = TRAY.h / 2;
    tray.castShadow = true;
    tray.receiveShadow = true;
    const label = new Mesh(topGeo, keep(new MeshBasicMaterial({ map: keep(labelTexture(def.label, def.icon, tokens)), toneMapped: false })));
    label.rotation.x = -Math.PI / 2;
    label.position.y = TRAY.h + 0.003;
    g.add(tray, label);
    root.add(g);
    stations[id] = { group: g, top: new Vector3(def.pos[0], TRAY.h + 0.02, def.pos[1]), squash: 1, vel: 0, stack: 0 };
  });

  await pause();

  // Links: solid ink lines, the automated path
  const rivetGeo = keep(new SphereGeometry(0.055, 16, 12));
  LINKS.forEach(([a, b]) => {
    const pa = stations[a].group.position;
    const pb = stations[b].group.position;
    const dir = new Vector3().subVectors(pb, pa).setY(0).normalize();
    const start = pa.clone().addScaledVector(dir, 0.95).setY(0.02);
    const end = pb.clone().addScaledVector(dir, -0.95).setY(0.02);
    const mid = start.clone().lerp(end, 0.5);
    mid.x += dir.z * 0.35;
    mid.z -= dir.x * 0.35;
    const curve = new CatmullRomCurve3([start, mid, end]);
    const tube = new Mesh(keep(new TubeGeometry(curve, 48, 0.022, 8, false)), inkMat);
    tube.castShadow = true;
    root.add(tube);
    [start, end].forEach((p) => {
      const r = new Mesh(rivetGeo, inkMat);
      r.position.copy(p);
      root.add(r);
    });
  });

  // Cards: a pool of paper sheets with a coloured edge strip
  const sheetGeo = keep(new BoxGeometry(CARD.w, CARD.h, CARD.d));
  const stripGeo = keep(new BoxGeometry(CARD.w, CARD.h + 0.004, 0.085));
  const lineGeo = keep(new BoxGeometry(0.42, CARD.h + 0.003, 0.028));
  const paperMat = keep(new MeshStandardMaterial({ color: new Color(tokens.paper), roughness: 0.88 }));
  const lineMat = keep(new MeshStandardMaterial({ color: new Color("#c9ced6"), roughness: 0.9 }));
  const stripMats = {} as Record<StationId, MeshStandardMaterial>;
  (Object.keys(LAYOUT) as StationId[]).forEach((id) => {
    stripMats[id] = keep(new MeshStandardMaterial({ color: new Color(tokens[LAYOUT[id].color]), roughness: 0.7 }));
  });

  type Card = {
    g: Group;
    strip: Mesh;
    busy: boolean;
    from?: StationId;
    to?: StationId;
    t0: number;
    dur: number;
    curve?: QuadraticBezierCurve3;
    land?: number;
    spin: number;
  };
  const cards: Card[] = Array.from({ length: 10 }, () => {
    const g = new Group();
    const sheet = new Mesh(sheetGeo, paperMat);
    sheet.castShadow = true;
    sheet.receiveShadow = true;
    const strip = new Mesh(stripGeo, stripMats.website);
    strip.position.z = -CARD.d / 2 + 0.0425;
    const l1 = new Mesh(lineGeo, lineMat);
    l1.position.set(-0.06, 0, 0.02);
    const l2 = new Mesh(lineGeo, lineMat);
    l2.position.set(-0.1, 0, 0.1);
    l2.scale.x = 0.7;
    g.add(sheet, strip, l1, l2);
    g.visible = false;
    root.add(g);
    return { g, strip, busy: false, t0: 0, dur: 1, spin: 0 };
  });

  const launch = (from: StationId, to: StationId, now: number) => {
    const card = cards.find((c) => !c.busy);
    if (!card) return;
    const a = stations[from].top.clone();
    a.y += 0.02;
    const b = stations[to].top.clone();
    b.y += 0.02 + stations[to].stack * 0.024;
    b.x += (Math.random() - 0.5) * 0.18;
    b.z += (Math.random() - 0.5) * 0.12;
    const ctrl = a.clone().lerp(b, 0.5);
    ctrl.y = 1.7 + Math.random() * 0.3;
    card.curve = new QuadraticBezierCurve3(a, ctrl, b);
    card.busy = true;
    card.from = from;
    card.to = to;
    card.t0 = now;
    card.dur = 1150;
    card.land = undefined;
    card.spin = (Math.random() - 0.5) * 0.9;
    card.strip.material = stripMats[from];
    card.g.visible = true;
    card.g.scale.setScalar(1);
    card.g.position.copy(a);
    stations[to].stack = Math.min(stations[to].stack + 1, 5);
  };

  await pause();

  // Size the orthographic frustum to keep the whole layout in frame.
  const fit = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    let halfH = 3.15;
    let halfW = halfH * aspect;
    if (halfW < 5.4) {
      halfW = 5.4;
      halfH = halfW / aspect;
    }
    camera.left = -halfW;
    camera.right = halfW;
    camera.top = halfH;
    camera.bottom = -halfH;
    camera.updateProjectionMatrix();
  };
  fit();
  const ro = new ResizeObserver(() => {
    fit();
    if (reduced) renderer.render(scene, camera);
  });
  ro.observe(canvas);

  // Compile every shader up front, without blocking, cards included.
  cards.forEach((c) => (c.g.visible = true));
  try {
    await renderer.compileAsync(scene, camera);
  } catch {
    /* older drivers: shaders compile on first render instead */
  }
  cards.forEach((c) => (c.g.visible = false));
  await pause();

  if (reduced) {
    // One quiet frame: two cards already delivered.
    const now = performance.now();
    launch("website", "crm", now - 5000);
    launch("crm", "calendar", now - 5000);
    cards.forEach((c) => {
      if (c.busy && c.curve) {
        c.g.position.copy(c.curve.getPoint(1));
        c.g.rotation.y = c.spin * 0.3;
      }
    });
    renderer.render(scene, camera);
    onReady?.();
    return () => {
      ro.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }

  // Pointer parallax, damped.
  let targetYaw = 0;
  let targetPitch = 0;
  const onPointer = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    targetYaw = ((e.clientX - r.left) / r.width - 0.5) * 0.14;
    targetPitch = ((e.clientY - r.top) / r.height - 0.5) * 0.05;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  let lastRoute = 0;
  const onRoute = (e: Event) => {
    const d = (e as CustomEvent<RouteDetail>).detail;
    if (!d) return;
    lastRoute = performance.now();
    launch(d.from, d.to, lastRoute);
  };
  window.addEventListener(ROUTE_EVENT, onRoute);

  // Idle fallback: if nothing drives the scene, keep a gentle flow going.
  const demo: [StationId, StationId][] = [
    ["website", "crm"],
    ["crm", "inbox"],
    ["crm", "calendar"],
  ];
  let demoIdx = 0;
  let lastDemo = 0;

  let visible = true;
  let raf = 0;
  let prev = performance.now();
  const io = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true;
    if (visible && !raf) {
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    }
  });
  io.observe(canvas);

  function frame(now: number) {
    raf = 0;
    if (!visible || document.hidden) return;
    const dt = Math.min(0.05, (now - prev) / 1000);
    prev = now;

    if (now - lastRoute > 6000 && now - lastDemo > 1300) {
      const [a, b] = demo[demoIdx++ % demo.length];
      launch(a, b, now);
      lastDemo = now;
    }

    root.rotation.y += (targetYaw - root.rotation.y) * Math.min(1, dt * 3.2);
    root.rotation.x += (targetPitch - root.rotation.x) * Math.min(1, dt * 3.2);

    for (const c of cards) {
      if (!c.busy || !c.curve || !c.to) continue;
      const t = Math.min(1, (now - c.t0) / c.dur);
      if (t < 1) {
        const k = easeInOut(t);
        c.g.position.copy(c.curve.getPoint(k));
        c.g.rotation.x = Math.sin(k * Math.PI) * 0.42;
        c.g.rotation.z = Math.sin(k * Math.PI) * c.spin * 0.4;
        c.g.rotation.y = c.spin * (1 - k) * 1.4;
      } else {
        if (c.land === undefined) {
          c.land = now;
          c.g.position.copy(c.curve.getPoint(1));
          c.g.rotation.set(0, c.spin * 0.25, 0);
          stations[c.to].vel -= 1.6;
        }
        const held = now - c.land;
        if (held > 1900) {
          const s = 1 - easeOut(Math.min(1, (held - 1900) / 380));
          c.g.scale.setScalar(Math.max(0.0001, s));
          if (s <= 0.001) {
            c.busy = false;
            c.g.visible = false;
            stations[c.to].stack = Math.max(0, stations[c.to].stack - 1);
          }
        }
      }
    }

    // Trays squash on arrival and spring back.
    (Object.keys(stations) as StationId[]).forEach((id) => {
      const s = stations[id];
      const acc = -90 * (s.squash - 1) - 11 * s.vel;
      s.vel += acc * dt;
      s.squash += s.vel * dt;
      s.group.scale.set(1 + (1 - s.squash) * 0.35, s.squash, 1 + (1 - s.squash) * 0.35);
    });

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }

  renderer.render(scene, camera);
  onReady?.();
  raf = requestAnimationFrame(frame);

  const onVis = () => {
    if (!document.hidden && visible && !raf) {
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };
  document.addEventListener("visibilitychange", onVis);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener(ROUTE_EVENT, onRoute);
    document.removeEventListener("visibilitychange", onVis);
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };
}
