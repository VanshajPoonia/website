// The cover scene: a small sorting line. Requests drop onto a belt (an
// email, a web form, a text, an order), pass through the AI gate and come out
// as tagged records, and a robot arm files each record into the right tray.
//
// Everything on screen is a pure function of the scene clock, so the poster
// image shown before three.js loads is an exact frame of this scene
// (POSTER_T). Loaded on idle, paused off screen, never loaded under reduced
// motion.

import {
  BoxGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  OrthographicCamera,
  PCFShadowMap,
  PlaneGeometry,
  PMREMGenerator,
  RepeatWrapping,
  Scene,
  ShadowMaterial,
  Shape,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type BufferGeometry,
  type Material,
  type Texture,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type Tokens = {
  ink: string;
  paper: string;
  blue: string;
  green: string;
  yellow: string;
  purple: string;
  font: string;
};

/** Seconds into the loop that the poster image shows. */
export const POSTER_T = 35.65;

type Kind = "email" | "form" | "text" | "order";
type TrayId = "crm" | "calendar" | "replies";
type Hue = "green" | "blue" | "purple";
type IconId = "crm" | "calendar" | "inbox" | "spark";

// What arrives, in order, and where the AI files it.
const SEQ: { kind: Kind; tray: TrayId; tag: string }[] = [
  { kind: "email", tray: "crm", tag: "Quote request" },
  { kind: "form", tray: "calendar", tag: "Booking" },
  { kind: "text", tray: "replies", tag: "Question" },
  { kind: "order", tray: "crm", tag: "New order" },
];

const TRAYS: Record<TrayId, { x: number; z: number; label: string; hue: Hue; icon: IconId }> = {
  crm: { x: 3.5, z: -1.4, label: "CRM", hue: "green", icon: "crm" },
  calendar: { x: 4.05, z: 1.0, label: "Calendar", hue: "blue", icon: "calendar" },
  replies: { x: 2.15, z: 2.75, label: "Replies", hue: "purple", icon: "inbox" },
};

// Timing (seconds) and layout (world units, y up).
const T = 2.4; // one request per beat
const FALL = 0.5;
const DROP_H = 1.7;
const SPEED = 0.8;
const LIFE = 6 * T; // how long a record sits in its tray
const SINK = 0.6;
const POOL = 16; // must be a multiple of SEQ.length

// The belt, gate and stop live in their own frame: x runs along the belt and
// the line is turned so requests travel from the back left toward the arm.
const LINE = { yaw: -0.38, x: 0, z: 0.55 };
const BELT = { x0: -4.45, x1: 0.9, z: 0, top: 0.36, width: 0.84 };
const DROP_X = -3.85;
const PICK_X = 0.45;
const GATE_X = -1.45;
const GATE = { len: 1.0, outer: 0.8, inner: 0.56, height: 1.16, opening: 0.86 };

const CARD = { w: 0.7, h: 0.045, d: 0.5 };
const TRAY = { w: 1.6, d: 1.18, h: 0.34, floor: 0.07 };

const ARM = { x: 2.05, z: 0.35, shoulder: 0.66, l1: 1.55, l2: 1.42, wrist: 0.46 };
const HOVER_Y = 1.32;

const ARRIVE = FALL + (PICK_X - DROP_X) / SPEED; // spawn to pick
const RELEASE = 1.25; // after pick
const LAND = RELEASE + 0.12;

const pause = () => new Promise<void>((r) => setTimeout(r, 0));
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t;
const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

// ---------- Drawing ----------

function drawIcon(ctx: CanvasRenderingContext2D, id: IconId, x: number, y: number, s: number, width = 1.8) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s / 24, s / 24);
  ctx.lineWidth = width;
  ctx.lineCap = "square";
  ctx.lineJoin = "miter";
  ctx.beginPath();
  if (id === "crm") {
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
  } else if (id === "calendar") {
    ctx.rect(3.5, 5, 17, 15);
    ctx.moveTo(3.5, 9.5);
    ctx.lineTo(20.5, 9.5);
    ctx.moveTo(8, 3);
    ctx.lineTo(8, 7);
    ctx.moveTo(16, 3);
    ctx.lineTo(16, 7);
  } else {
    // spark: the AI mark
    ctx.moveTo(12, 3);
    ctx.quadraticCurveTo(13, 11, 21, 12);
    ctx.quadraticCurveTo(13, 13, 12, 21);
    ctx.quadraticCurveTo(11, 13, 3, 12);
    ctx.quadraticCurveTo(11, 11, 12, 3);
    ctx.closePath();
  }
  ctx.stroke();
  ctx.restore();
}

function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void): CanvasTexture {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  draw(ctx);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function setFont(ctx: CanvasRenderingContext2D, weight: number, px: number, font: string, stretch: "normal" | "semi-expanded" | "expanded" = "normal") {
  ctx.font = `${weight} ${px}px ${font}`;
  if ("fontStretch" in ctx) (ctx as CanvasRenderingContext2D & { fontStretch: string }).fontStretch = stretch;
}

/** Top face of each incoming request, drawn like a paper object seen from above. */
function inputTexture(kind: Kind, t: Tokens): CanvasTexture {
  const W = 512;
  const dims = { email: [0.74, 0.5], form: [0.56, 0.74], text: [0.72, 0.48], order: [0.46, 0.74] }[kind];
  const H = Math.round((W * dims[1]) / dims[0]);
  return canvasTexture(W, H, (ctx) => {
    ctx.fillStyle = t.paper;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = t.ink;
    ctx.fillStyle = t.ink;
    ctx.lineWidth = 9;
    ctx.lineJoin = "round";
    const m = 40;
    if (kind === "email") {
      ctx.strokeRect(m, m, W - m * 2, H - m * 2);
      ctx.beginPath();
      ctx.moveTo(m, m);
      ctx.lineTo(W / 2, H * 0.58);
      ctx.lineTo(W - m, m);
      ctx.stroke();
    } else if (kind === "form") {
      ctx.lineWidth = 7;
      const rows = [0.16, 0.36, 0.56];
      rows.forEach((r) => {
        ctx.fillRect(m, H * r - 22, W * 0.32, 12);
        ctx.strokeRect(m, H * r, W - m * 2, 46);
      });
      ctx.fillRect(m, H * 0.8, W * 0.42, 62);
    } else if (kind === "text") {
      const r = 46;
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.roundRect(m, m, W - m * 2, H - m * 2 - 30, r);
      ctx.stroke();
      [0.36, 0.5, 0.64].forEach((x) => {
        ctx.beginPath();
        ctx.arc(W * x, H * 0.44, 20, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      ctx.lineWidth = 7;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 32) ctx.lineTo(x, x % 64 ? 18 : 0);
      ctx.stroke();
      ctx.fillRect(m, 70, W * 0.5, 22);
      [0.3, 0.42, 0.54].forEach((r) => {
        ctx.fillRect(m, H * r, W * 0.46, 10);
        ctx.fillRect(W - m - W * 0.18, H * r, W * 0.18, 10);
      });
      ctx.fillRect(m, H * 0.7, W - m * 2, 6);
      ctx.fillRect(W - m - W * 0.3, H * 0.76, W * 0.3, 22);
    }
  });
}

/** The tidy record the AI hands back: a filing card with its tray's colour. */
function recordTexture(hue: string, icon: IconId, t: Tokens): CanvasTexture {
  const W = 512;
  const H = Math.round((W * CARD.d) / CARD.w);
  return canvasTexture(W, H, (ctx) => {
    ctx.fillStyle = t.paper;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = hue;
    ctx.fillRect(0, 0, W, 78);
    ctx.strokeStyle = t.ink;
    drawIcon(ctx, icon, 34, 120, 92, 1.7);
    ctx.fillStyle = "rgba(21,23,28,0.82)";
    ctx.fillRect(150, 140, 250, 18);
    ctx.fillStyle = "rgba(21,23,28,0.22)";
    ctx.fillRect(150, 180, 200, 12);
    ctx.fillRect(40, 262, W - 80, 10);
    ctx.fillRect(40, 300, W - 160, 10);
  });
}

/** The paper tag the AI writes for each request. Sized to its text. */
function tagTexture(text: string, dest: string, hue: string, t: Tokens): { tex: CanvasTexture; aspect: number } {
  const H = 150;
  const probe = document.createElement("canvas").getContext("2d")!;
  setFont(probe, 650, 54, t.font, "semi-expanded");
  const tw = probe.measureText(text).width;
  const label = `→ ${dest}`;
  setFont(probe, 600, 46, t.font);
  const lw = probe.measureText(label).width;
  const W = Math.ceil(126 + tw + 22 + lw + 28 + 30);
  const tex = canvasTexture(W, H, (ctx) => {
    ctx.fillStyle = t.paper;
    ctx.strokeStyle = t.ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.roundRect(4, 4, W - 8, H - 8, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = t.yellow;
    ctx.fillRect(6.5, 6.5, 94, H - 13);
    ctx.strokeStyle = t.ink;
    drawIcon(ctx, "spark", 18, 39, 70, 2.1);
    ctx.beginPath();
    ctx.moveTo(100, 6);
    ctx.lineTo(100, H - 6);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = t.ink;
    ctx.textBaseline = "middle";
    setFont(ctx, 650, 54, t.font, "semi-expanded");
    ctx.fillText(text, 126, H / 2 + 3);
    const x = 126 + tw + 22;
    setFont(ctx, 600, 46, t.font);
    ctx.fillStyle = hue;
    ctx.beginPath();
    ctx.roundRect(x, 34, lw + 28, H - 68, 6);
    ctx.fill();
    ctx.fillStyle = t.ink;
    ctx.fillText(label, x + 14, H / 2 + 3);
  });
  return { tex, aspect: W / H };
}

/** Label printed on a tray's index tab. Transparent ground, ink type. */
function tabTexture(label: string, icon: IconId, t: Tokens): { tex: CanvasTexture; aspect: number } {
  const H = 200;
  const probe = document.createElement("canvas").getContext("2d")!;
  setFont(probe, 680, 92, t.font, "semi-expanded");
  const W = Math.ceil(170 + probe.measureText(label).width + 44);
  const tex = canvasTexture(W, H, (ctx) => {
    ctx.strokeStyle = t.ink;
    ctx.fillStyle = t.ink;
    drawIcon(ctx, icon, 44, 50, 100, 1.9);
    setFont(ctx, 680, 92, t.font, "semi-expanded");
    ctx.textBaseline = "middle";
    ctx.fillText(label, 170, 104);
  });
  return { tex, aspect: W / H };
}

function gateTexture(t: Tokens): CanvasTexture {
  const W = 512;
  const H = Math.round((W * (GATE.outer * 2 - 0.16)) / (GATE.len - 0.12));
  return canvasTexture(W, H, (ctx) => {
    ctx.strokeStyle = t.ink;
    ctx.fillStyle = t.ink;
    drawIcon(ctx, "spark", W / 2 - 176, H / 2 - 64, 128, 1.9);
    setFont(ctx, 750, 170, t.font, "expanded");
    ctx.textBaseline = "middle";
    ctx.fillText("AI", W / 2 - 22, H / 2 + 10);
  });
}

/** The belt: ink, a touch lifted, with faint ribs so its motion reads. */
function beltTexture(): CanvasTexture {
  const tex = canvasTexture(64, 64, (ctx) => {
    ctx.fillStyle = "#23262c";
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = "#30343b";
    ctx.fillRect(0, 0, 8, 64);
  });
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  return tex;
}

// ---------- Shapes ----------

/** An open tray: a rounded rim around a hole, extruded upward. */
function rimGeometry(): ExtrudeGeometry {
  const rr = (s: Shape | import("three").Path, w: number, d: number, r: number) => {
    s.moveTo(-w / 2 + r, -d / 2);
    s.lineTo(w / 2 - r, -d / 2);
    s.quadraticCurveTo(w / 2, -d / 2, w / 2, -d / 2 + r);
    s.lineTo(w / 2, d / 2 - r);
    s.quadraticCurveTo(w / 2, d / 2, w / 2 - r, d / 2);
    s.lineTo(-w / 2 + r, d / 2);
    s.quadraticCurveTo(-w / 2, d / 2, -w / 2, d / 2 - r);
    s.lineTo(-w / 2, -d / 2 + r);
    s.quadraticCurveTo(-w / 2, -d / 2, -w / 2 + r, -d / 2);
  };
  const outer = new Shape();
  rr(outer, TRAY.w, TRAY.d, 0.14);
  const hole = new Shape();
  rr(hole, TRAY.w - 0.2, TRAY.d - 0.2, 0.07);
  outer.holes.push(hole);
  const g = new ExtrudeGeometry(outer, { depth: TRAY.h - 0.04, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3, curveSegments: 6 });
  g.rotateX(-Math.PI / 2);
  g.translate(0, 0.02, 0);
  return g;
}

/** An index tab with rounded top corners, standing on the tray's back edge. */
function tabGeometry(w: number, h: number): ExtrudeGeometry {
  const r = 0.12;
  const s = new Shape();
  s.moveTo(-w / 2, 0);
  s.lineTo(w / 2, 0);
  s.lineTo(w / 2, h - r);
  s.quadraticCurveTo(w / 2, h, w / 2 - r, h);
  s.lineTo(-w / 2 + r, h);
  s.quadraticCurveTo(-w / 2, h, -w / 2, h - r);
  s.closePath();
  const g = new ExtrudeGeometry(s, { depth: 0.035, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2, curveSegments: 8 });
  g.translate(0, 0, -0.0175);
  return g;
}

/** The AI gate: an arch the belt runs through, extruded along the belt. */
function gateGeometry(): ExtrudeGeometry {
  const { outer, inner, height, opening } = GATE;
  const r = 0.22;
  const ri = 0.1;
  const s = new Shape();
  s.moveTo(-outer, 0);
  s.lineTo(-outer, height - r);
  s.quadraticCurveTo(-outer, height, -outer + r, height);
  s.lineTo(outer - r, height);
  s.quadraticCurveTo(outer, height, outer, height - r);
  s.lineTo(outer, 0);
  s.lineTo(inner, 0);
  s.lineTo(inner, opening - ri);
  s.quadraticCurveTo(inner, opening, inner - ri, opening);
  s.lineTo(-inner + ri, opening);
  s.quadraticCurveTo(-inner, opening, -inner, opening - ri);
  s.lineTo(-inner, 0);
  s.closePath();
  const g = new ExtrudeGeometry(s, { depth: GATE.len - 0.08, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 4, curveSegments: 10 });
  // Shape x becomes world z, extrusion becomes world x.
  g.rotateY(-Math.PI / 2);
  g.translate((GATE.len - 0.08) / 2, 0, 0);
  return g;
}

// ---------- Scene ----------

export async function startScene({
  canvas,
  tokens,
  onReady,
}: {
  canvas: HTMLCanvasElement;
  tokens: Tokens;
  onReady?: () => void;
}): Promise<() => void> {
  try {
    await Promise.all([document.fonts?.load(`650 54px ${tokens.font}`), document.fonts?.load(`750 150px ${tokens.font}`)]);
  } catch {
    /* canvas falls back to the next family in the stack */
  }

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.55;
  pmrem.dispose();

  const camera = new OrthographicCamera(-5, 5, 3, -3, 0.1, 100);
  camera.position.set(3.6, 9.6, 11.2);
  camera.lookAt(0.3, 0.2, 0.4);

  scene.add(new HemisphereLight(0xffffff, 0xd6dbe3, 1.25));
  const sun = new DirectionalLight(0xffffff, 2.2);
  sun.position.set(-3.5, 11, 6.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -8;
  sun.shadow.camera.right = 8;
  sun.shadow.camera.top = 7;
  sun.shadow.camera.bottom = -7;
  sun.shadow.radius = 4;
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  await pause();

  const disposables: (BufferGeometry | Material | Texture)[] = [envTex];
  const keep = <T extends BufferGeometry | Material | Texture>(x: T) => (disposables.push(x), x);
  const std = (color: string, roughness = 0.72) => keep(new MeshStandardMaterial({ color: new Color(color), roughness }));
  const flat = (map: Texture, transparent = false) => keep(new MeshBasicMaterial({ map: keep(map), toneMapped: false, transparent }));
  const printed = (map: Texture) => keep(new MeshStandardMaterial({ map: keep(map), roughness: 0.9 }));
  const shadowed = <M extends Mesh>(m: M, cast = true, receive = true) => ((m.castShadow = cast), (m.receiveShadow = receive), m);

  const root = new Group();
  scene.add(root);

  const ground = new Mesh(keep(new PlaneGeometry(40, 40)), keep(new ShadowMaterial({ opacity: 0.12 })));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  root.add(ground);

  const hueOf = (h: Hue) => tokens[h];
  const inkMat = std(tokens.ink, 0.5);
  const paperMat = std(tokens.paper, 0.85);
  const shellMat = std("#f1f2f5", 0.55);

  // The line: belt, gate and stop, turned as one.
  const line = new Group();
  line.rotation.y = LINE.yaw;
  line.position.set(LINE.x, 0, LINE.z);
  root.add(line);
  const cosY = Math.cos(LINE.yaw);
  const sinY = Math.sin(LINE.yaw);
  /** Line coordinates to scene coordinates. */
  const onLine = (x: number, y: number, z: number, out = new Vector3()) =>
    out.set(LINE.x + x * cosY + z * sinY, y, LINE.z - x * sinY + z * cosY);

  // Belt
  const beltLen = BELT.x1 - BELT.x0;
  const beltFrame = shadowed(new Mesh(keep(new RoundedBoxGeometry(beltLen, BELT.top - 0.02, BELT.width + 0.26, 4, 0.08)), shellMat));
  beltFrame.position.set((BELT.x0 + BELT.x1) / 2, (BELT.top - 0.02) / 2, BELT.z);
  line.add(beltFrame);
  const beltTex = keep(beltTexture());
  beltTex.repeat.set((beltLen - 0.14) / 0.2, 1);
  const beltSurface = new Mesh(keep(new PlaneGeometry(beltLen - 0.14, BELT.width)), keep(new MeshStandardMaterial({ map: beltTex, roughness: 0.9 })));
  beltSurface.rotation.x = -Math.PI / 2;
  beltSurface.position.set((BELT.x0 + BELT.x1) / 2, BELT.top - 0.005, BELT.z);
  beltSurface.receiveShadow = true;
  line.add(beltSurface);
  const lipGeo = keep(new RoundedBoxGeometry(beltLen, 0.1, 0.1, 3, 0.04));
  [-1, 1].forEach((side) => {
    const lip = shadowed(new Mesh(lipGeo, shellMat));
    lip.position.set((BELT.x0 + BELT.x1) / 2, BELT.top + 0.03, BELT.z + side * (BELT.width / 2 + 0.07));
    line.add(lip);
  });
  // A stop at the end of the belt, where the arm picks up.
  const stop = shadowed(new Mesh(keep(new RoundedBoxGeometry(0.1, 0.16, BELT.width + 0.1, 3, 0.04)), inkMat));
  stop.position.set(BELT.x1 - 0.07, BELT.top + 0.06, BELT.z);
  line.add(stop);

  // AI gate
  const gate = shadowed(new Mesh(keep(gateGeometry()), std(tokens.yellow, 0.6)));
  gate.position.set(GATE_X, 0, BELT.z);
  line.add(gate);
  const gateTop = new Mesh(keep(new PlaneGeometry(GATE.len - 0.12, GATE.outer * 2 - 0.16)), flat(gateTexture(tokens), true));
  gateTop.rotation.x = -Math.PI / 2;
  gateTop.position.set(GATE_X, GATE.height + 0.041, BELT.z);
  line.add(gateTop);
  // Three dots on the gate's face that bounce while the AI is reading.
  const dotGeo = keep(new SphereGeometry(0.055, 16, 12));
  const dots = [0, 1, 2].map((i) => {
    const d = new Mesh(dotGeo, inkMat);
    d.position.set(GATE_X - 0.2 + i * 0.2, 0.6, BELT.z + GATE.outer + 0.06);
    line.add(d);
    return d;
  });
  await pause();

  // Trays, each with an index tab on its back edge.
  const rimGeo = keep(rimGeometry());
  const floorGeo = keep(new RoundedBoxGeometry(TRAY.w - 0.12, TRAY.floor, TRAY.d - 0.12, 3, 0.03));
  const trays = {} as Record<TrayId, Group>;
  (Object.keys(TRAYS) as TrayId[]).forEach((id) => {
    const def = TRAYS[id];
    const mat = std(hueOf(def.hue), 0.7);
    const g = new Group();
    g.position.set(def.x, 0, def.z);
    const rim = shadowed(new Mesh(rimGeo, mat));
    const floor = shadowed(new Mesh(floorGeo, mat));
    floor.position.y = TRAY.floor / 2;
    const { tex, aspect } = tabTexture(def.label, def.icon, tokens);
    const lw = 0.34 * aspect;
    const tab = shadowed(new Mesh(keep(tabGeometry(lw + 0.12, 0.6)), mat));
    tab.position.set(-TRAY.w / 2 + 0.1 + (lw + 0.12) / 2, TRAY.h - 0.08, -TRAY.d / 2 + 0.04);
    const label = new Mesh(keep(new PlaneGeometry(lw, 0.34)), flat(tex, true));
    label.position.set(tab.position.x, tab.position.y + 0.31, tab.position.z + 0.03);
    g.add(rim, floor, tab, label);
    root.add(g);
    trays[id] = g;
  });
  await pause();

  // Robot arm
  const arm = new Group();
  arm.position.set(ARM.x, 0, ARM.z);
  root.add(arm);
  const base = shadowed(new Mesh(keep(new CylinderGeometry(0.42, 0.47, 0.12, 40)), inkMat));
  base.position.y = 0.06;
  arm.add(base);
  const yaw = new Group();
  arm.add(yaw);
  const turret = shadowed(new Mesh(keep(new CylinderGeometry(0.27, 0.33, 0.44, 40)), shellMat));
  turret.position.y = 0.34;
  yaw.add(turret);
  const jointMat = inkMat;
  const joint = (r: number, len: number) => {
    const m = shadowed(new Mesh(keep(new CylinderGeometry(r, r, len, 32)), jointMat));
    m.rotation.x = Math.PI / 2;
    return m;
  };
  const shoulder = new Group();
  shoulder.position.y = ARM.shoulder;
  yaw.add(shoulder);
  shoulder.add(joint(0.17, 0.4));
  const upper = shadowed(new Mesh(keep(new RoundedBoxGeometry(ARM.l1 + 0.16, 0.22, 0.24, 4, 0.09)), shellMat));
  upper.position.x = ARM.l1 / 2;
  shoulder.add(upper);
  const elbow = new Group();
  elbow.position.x = ARM.l1;
  shoulder.add(elbow);
  elbow.add(joint(0.14, 0.34));
  const fore = shadowed(new Mesh(keep(new RoundedBoxGeometry(ARM.l2 + 0.12, 0.18, 0.2, 4, 0.08)), shellMat));
  fore.position.x = ARM.l2 / 2;
  elbow.add(fore);
  const wrist = new Group();
  wrist.position.x = ARM.l2;
  elbow.add(wrist);
  wrist.add(joint(0.12, 0.3));
  const rod = shadowed(new Mesh(keep(new CylinderGeometry(0.055, 0.055, ARM.wrist - 0.1, 20)), inkMat));
  rod.rotation.z = -Math.PI / 2;
  rod.position.x = (ARM.wrist - 0.1) / 2;
  wrist.add(rod);
  const cup = shadowed(new Mesh(keep(new CylinderGeometry(0.1, 0.17, 0.1, 32)), std(tokens.yellow, 0.6)));
  cup.rotation.z = -Math.PI / 2;
  cup.position.x = ARM.wrist - 0.05;
  wrist.add(cup);
  await pause();

  // Requests: a pool of objects, each slot always the same kind.
  const inputGeos: Record<Kind, BufferGeometry> = {
    email: keep(new BoxGeometry(0.74, 0.05, 0.5)),
    form: keep(new BoxGeometry(0.56, 0.035, 0.74)),
    text: keep(new RoundedBoxGeometry(0.72, 0.13, 0.48, 3, 0.06)),
    order: keep(new BoxGeometry(0.46, 0.03, 0.74)),
  };
  const inputH: Record<Kind, number> = { email: 0.05, form: 0.035, text: 0.13, order: 0.03 };
  const inputTops: Record<Kind, Material> = {
    email: printed(inputTexture("email", tokens)),
    form: printed(inputTexture("form", tokens)),
    text: printed(inputTexture("text", tokens)),
    order: printed(inputTexture("order", tokens)),
  };
  const topGeos: Record<Kind, BufferGeometry> = {
    email: keep(new PlaneGeometry(0.74, 0.5)),
    form: keep(new PlaneGeometry(0.56, 0.74)),
    text: keep(new PlaneGeometry(0.66, 0.42)),
    order: keep(new PlaneGeometry(0.46, 0.74)),
  };
  const cardGeo = keep(new BoxGeometry(CARD.w, CARD.h, CARD.d));
  const cardTopGeo = keep(new PlaneGeometry(CARD.w, CARD.d));
  const recordTops = {} as Record<TrayId, Material>;
  (Object.keys(TRAYS) as TrayId[]).forEach((id) => {
    recordTops[id] = printed(recordTexture(hueOf(TRAYS[id].hue), TRAYS[id].icon, tokens));
  });
  const tags = SEQ.map((s) => {
    const { tex, aspect } = tagTexture(s.tag, TRAYS[s.tray].label, hueOf(TRAYS[s.tray].hue), tokens);
    keep(tex);
    return { mat: keep(new SpriteMaterial({ map: tex, toneMapped: false, transparent: true, depthTest: false })), aspect };
  });

  type Slot = { input: Group; record: Group; tag: Sprite; kind: Kind; tray: TrayId; seq: number };
  const slots: Slot[] = Array.from({ length: POOL }, (_, i) => {
    const seq = i % SEQ.length;
    const { kind, tray } = SEQ[seq];
    const input = new Group();
    const body = shadowed(new Mesh(inputGeos[kind], paperMat));
    const top = new Mesh(topGeos[kind], inputTops[kind]);
    top.receiveShadow = true;
    top.rotation.x = -Math.PI / 2;
    top.position.y = inputH[kind] / 2 + 0.002;
    input.add(body, top);
    const record = new Group();
    const rb = shadowed(new Mesh(cardGeo, paperMat));
    const rt = new Mesh(cardTopGeo, recordTops[tray]);
    rt.receiveShadow = true;
    rt.rotation.x = -Math.PI / 2;
    rt.position.y = CARD.h / 2 + 0.002;
    record.add(rb, rt);
    const tag = new Sprite(tags[seq].mat.clone());
    disposables.push(tag.material);
    tag.scale.set(0.46 * tags[seq].aspect, 0.46, 1);
    tag.renderOrder = 10;
    input.visible = record.visible = tag.visible = false;
    root.add(input, record, tag);
    return { input, record, tag, kind, tray, seq };
  });

  // ---------- Time functions ----------

  const spawnOf = (k: number) => k * T;
  const pickOf = (k: number) => k * T + ARRIVE;
  const landOf = (k: number) => pickOf(k) + LAND;
  const trayOf = (k: number) => SEQ[((k % SEQ.length) + SEQ.length) % SEQ.length].tray;

  /** 1 while a record sits in its tray, falling to 0 as it is filed away. */
  const presence = (j: number, t: number) => {
    const l = landOf(j);
    if (t < l) return 0;
    const out = t - (l + LIFE);
    return out < 0 ? 1 : 1 - clamp01(out / SINK);
  };
  /** Height of the stack under record k in its tray at time t. */
  const stackUnder = (k: number, t: number) => {
    const tray = trayOf(k);
    let n = 0;
    for (let j = k - 1; j >= k - 14; j--) if (trayOf(j) === tray) n += presence(j, t);
    return n * CARD.h;
  };
  const restY = (kind: Kind) => BELT.top + inputH[kind] / 2;
  const recordRestY = BELT.top + CARD.h / 2;
  const jitter = (k: number) => ({ x: (hash(k) - 0.5) * 0.16, z: (hash(k + 7) - 0.5) * 0.12, r: (hash(k + 3) - 0.5) * 0.3 });
  const releasePoint = (k: number) => {
    const tr = TRAYS[trayOf(k)];
    const j = jitter(k);
    return new Vector3(tr.x + j.x, TRAY.floor + stackUnder(k, pickOf(k) + RELEASE) + CARD.h + 0.08, tr.z + j.z);
  };

  // Arm pose: interpolate around the base so swings travel on an arc.
  const toPolar = (p: Vector3) => ({ a: Math.atan2(p.z - ARM.z, p.x - ARM.x), r: Math.hypot(p.x - ARM.x, p.z - ARM.z), y: p.y });
  const swing = (a: Vector3, b: Vector3, u: number, out: Vector3) => {
    const pa = toPolar(a);
    const pb = toPolar(b);
    let da = pb.a - pa.a;
    if (da > Math.PI) da -= Math.PI * 2;
    if (da < -Math.PI) da += Math.PI * 2;
    const k = easeInOut(u);
    const ang = pa.a + da * k;
    const r = pa.r + (pb.r - pa.r) * k;
    const lift = Math.sin(Math.PI * k) * 0.18;
    return out.set(ARM.x + Math.cos(ang) * r, pa.y + (pb.y - pa.y) * k + lift, ARM.z + Math.sin(ang) * r);
  };
  const lerpV = (a: Vector3, b: Vector3, u: number, out: Vector3) => out.copy(a).lerp(b, u);

  const tip = new Vector3();
  const hover = onLine(PICK_X, HOVER_Y, BELT.z);
  const grab = onLine(PICK_X, recordRestY + CARD.h / 2, BELT.z);
  const lifted = onLine(PICK_X, HOVER_Y + 0.06, BELT.z);
  const at = new Vector3();
  const above = new Vector3();
  const rel = new Vector3();

  /** Where the suction cup is at time t, and which record it is serving. */
  const armAt = (t: number) => {
    const k = Math.floor((t - ARRIVE + 0.3) / T);
    const p = t - pickOf(k);
    rel.copy(releasePoint(k));
    above.set(rel.x, HOVER_Y + 0.12, rel.z);
    if (p < 0) lerpV(hover, grab, easeInOut((p + 0.3) / 0.3), tip);
    else if (p < 0.1) tip.copy(grab);
    else if (p < 0.4) lerpV(grab, lifted, easeOut((p - 0.1) / 0.3), tip);
    else if (p < 1.0) swing(lifted, above, (p - 0.4) / 0.6, tip);
    else if (p < RELEASE) lerpV(above, rel, easeInOut((p - 1.0) / (RELEASE - 1.0)), tip);
    else if (p < 1.35) tip.copy(rel);
    else if (p < 1.55) lerpV(rel, above, easeOut((p - 1.35) / 0.2), tip);
    else swing(above, hover, (p - 1.55) / (T - 0.3 - 1.55), tip);
    return { k, p };
  };

  const solveArm = (target: Vector3) => {
    const wx = target.x - ARM.x;
    const wz = target.z - ARM.z;
    const wy = target.y + ARM.wrist - ARM.shoulder;
    yaw.rotation.y = Math.atan2(-wz, wx);
    const r = Math.hypot(wx, wz);
    const d = Math.min(Math.hypot(r, wy), ARM.l1 + ARM.l2 - 0.001);
    const { l1, l2 } = ARM;
    const inner = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + l2 * l2 - d * d) / (2 * l1 * l2))));
    const a1 = Math.atan2(wy, r) + Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
    const a2 = -(Math.PI - inner);
    shoulder.rotation.z = a1;
    elbow.rotation.z = a2;
    wrist.rotation.z = -Math.PI / 2 - (a1 + a2);
  };

  const pose = (t: number) => {
    // Belt surface slides with the items on it.
    beltTex.offset.x = -((t * SPEED) / 0.2) % 1;

    armAt(t);
    solveArm(tip);

    let reading = 0;
    const kNow = Math.floor(t / T);
    for (let i = 0; i < POOL; i++) {
      const s = slots[i];
      const k = kNow - ((((kNow - i) % POOL) + POOL) % POOL);
      const spawn = spawnOf(k);
      const pick = pickOf(k);
      const land = landOf(k);
      const gone = land + LIFE + SINK;
      s.input.visible = s.record.visible = s.tag.visible = false;
      if (k < 0 || t < spawn || t >= gone) continue;

      const age = t - spawn;
      let x = DROP_X;
      let y = 0;
      let rotX = 0;
      let rotZ = 0;
      let rotY = 0;
      let z = BELT.z;
      let asRecord = false;
      let tagAlpha = 0;
      let scale = 1;

      if (age < FALL) {
        // A new request pops in above the belt and drops onto it.
        const u = age / FALL;
        y = restY(s.kind) + (DROP_H - restY(s.kind)) * (1 - easeIn(u));
        rotX = (1 - u) * 0.5 * (hash(k) > 0.5 ? 1 : -1);
        rotZ = (1 - u) * 0.35;
        rotY = LINE.yaw + (1 - u) * (hash(k + 1) - 0.5) * 1.2;
        scale = 0.15 + 0.85 * easeOut(clamp01(u * 3));
        onLine(x, y, z, at);
        x = at.x;
        z = at.z;
      } else if (t < pick + 0.1) {
        const onBelt = t - spawn - FALL;
        x = Math.min(PICK_X, DROP_X + onBelt * SPEED);
        asRecord = x >= GATE_X;
        const hop = onBelt < 0.24 ? Math.sin((onBelt / 0.24) * Math.PI) * 0.07 : 0;
        y = (asRecord ? recordRestY : restY(s.kind)) + hop;
        if (Math.abs(x - GATE_X) < GATE.len / 2 + 0.25) reading = 1;
        const out = x - (GATE_X + GATE.len / 2 - 0.05);
        tagAlpha = clamp01(out / 0.25);
        rotY = LINE.yaw;
        onLine(x, y, z, at);
        x = at.x;
        z = at.z;
      } else if (t < pick + RELEASE) {
        asRecord = true;
        x = tip.x;
        z = tip.z;
        y = tip.y - CARD.h / 2;
        const p = t - pick;
        rotZ = Math.sin(clamp01((p - 0.4) / 0.6) * Math.PI) * 0.12;
        rotY = LINE.yaw * (1 - easeInOut(clamp01((p - 0.4) / 0.6)));
        tagAlpha = 1 - clamp01((p - 0.1) / 0.25);
      } else {
        asRecord = true;
        const j = jitter(k);
        const r = releasePoint(k);
        const restInTray = TRAY.floor + stackUnder(k, t) + CARD.h / 2;
        const fallU = clamp01((t - pick - RELEASE) / (LAND - RELEASE));
        x = r.x;
        z = r.z;
        y = r.y - CARD.h / 2 + (restInTray - (r.y - CARD.h / 2)) * easeIn(fallU);
        rotY = j.r * fallU;
        const sink = t - (land + LIFE);
        if (sink > 0) y -= easeIn(clamp01(sink / SINK)) * 0.5;
      }

      const obj = asRecord ? s.record : s.input;
      obj.visible = true;
      obj.position.set(x, y, z);
      obj.rotation.set(rotX, rotY, rotZ);
      obj.scale.setScalar(scale);
      if (tagAlpha > 0.01) {
        s.tag.visible = true;
        s.tag.position.set(x, y + 0.62 + (1 - tagAlpha) * -0.12, z);
        (s.tag.material as SpriteMaterial).opacity = tagAlpha;
      }
    }

    // The gate's dots bounce while a request is inside.
    dots.forEach((d, i) => {
      const b = Math.max(0, Math.sin(t * 9 - i * 0.9));
      d.position.y = 0.6 + b * 0.09 * reading;
    });

    // Trays give a little when a record lands.
    (Object.keys(trays) as TrayId[]).forEach((id) => {
      let last = -Infinity;
      for (let k = kNow; k >= kNow - 12; k--) {
        if (trayOf(k) !== id) continue;
        const l = landOf(k);
        if (l <= t) {
          last = l;
          break;
        }
      }
      const dt = t - last;
      const sq = dt >= 0 && dt < 1.4 ? 0.07 * Math.exp(-6 * dt) * Math.cos(17 * dt) : 0;
      trays[id].scale.set(1 + sq * 0.4, 1 - sq, 1 + sq * 0.4);
    });
  };

  // ---------- Framing ----------

  // Frame the content, not a fixed box: project the corners of everything
  // that moves or stands, then fit the orthographic frustum around them.
  const bounds: Vector3[] = [];
  [BELT.x0, BELT.x1].forEach((x) => [-0.6, 0.6].forEach((z) => bounds.push(onLine(x, 0, z), onLine(x, 0.5, z))));
  bounds.push(onLine(DROP_X, DROP_H + 0.35, 0), onLine(DROP_X - 0.45, DROP_H, 0));
  [GATE_X - 0.62, GATE_X + 0.62].forEach((x) => [-0.88, 0.88].forEach((z) => bounds.push(onLine(x, GATE.height + 0.05, z))));
  bounds.push(onLine(PICK_X, recordRestY + 0.95, 0));
  (Object.values(TRAYS) as { x: number; z: number }[]).forEach((tr) => {
    [-TRAY.w / 2, TRAY.w / 2].forEach((dx) => [-TRAY.d / 2, TRAY.d / 2].forEach((dz) => bounds.push(new Vector3(tr.x + dx, 0, tr.z + dz))));
    bounds.push(new Vector3(tr.x, 0.95, tr.z - TRAY.d / 2));
  });
  bounds.push(new Vector3(ARM.x, 2.2, ARM.z), new Vector3(ARM.x - 0.6, 0, ARM.z + 0.6));
  camera.updateMatrixWorld();
  const view = new Vector3();
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  bounds.forEach((b) => {
    view.copy(b).applyMatrix4(camera.matrixWorldInverse);
    minX = Math.min(minX, view.x);
    maxX = Math.max(maxX, view.x);
    minY = Math.min(minY, view.y);
    maxY = Math.max(maxY, view.y);
  });
  const fit = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    let bw = (maxX - minX) * 1.06;
    let bh = (maxY - minY) * 1.06;
    if (bw / bh < aspect) bw = bh * aspect;
    else bh = bw / aspect;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    camera.left = cx - bw / 2;
    camera.right = cx + bw / 2;
    camera.top = cy + bh / 2;
    camera.bottom = cy - bh / 2;
    camera.updateProjectionMatrix();
  };
  fit();

  let clock = POSTER_T;
  pose(clock);

  // Compile every shader up front, without blocking.
  slots.forEach((s) => (s.input.visible = s.record.visible = s.tag.visible = true));
  try {
    await renderer.compileAsync(scene, camera);
  } catch {
    /* older drivers: shaders compile on first render instead */
  }
  pose(clock);
  await pause();

  const ro = new ResizeObserver(() => {
    fit();
    renderer.render(scene, camera);
  });
  ro.observe(canvas);

  // Pointer parallax, damped.
  let targetYaw = 0;
  let targetPitch = 0;
  const onPointer = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    targetYaw = ((e.clientX - r.left) / r.width - 0.5) * 0.12;
    targetPitch = ((e.clientY - r.top) / r.height - 0.5) * 0.04;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

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
    clock += dt;
    root.rotation.y += (targetYaw - root.rotation.y) * Math.min(1, dt * 3);
    root.rotation.x += (targetPitch - root.rotation.x) * Math.min(1, dt * 3);
    pose(clock);
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
    document.removeEventListener("visibilitychange", onVis);
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };
}
