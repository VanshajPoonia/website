import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { ChapterColor } from "./site";

export const ogSize = { width: 1200, height: 630 };

const STOCK: Record<ChapterColor, string> = { blue: "#a9ccf0", green: "#a8ddb5", yellow: "#f5d66b", salmon: "#f4ae95" };
const TABS: { n: number; label: string; color: ChapterColor }[] = [
  { n: 1, label: "Websites", color: "blue" },
  { n: 2, label: "Stores & portals", color: "green" },
  { n: 3, label: "Automation & AI", color: "yellow" },
  { n: 4, label: "Care & training", color: "salmon" },
];

async function fonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [expanded, semi, mono] = await Promise.all([
    readFile(join(dir, "archivo-expanded-700.ttf")),
    readFile(join(dir, "archivo-600.ttf")),
    readFile(join(dir, "fragmentmono-400.ttf")),
  ]);
  return [
    { name: "Archivo Expanded", data: expanded, weight: 700 as const, style: "normal" as const },
    { name: "Archivo", data: semi, weight: 600 as const, style: "normal" as const },
    { name: "Fragment Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

/** The social card: a manual page with the chapter tabs along the top edge. */
export async function ogImage({ title, kicker, chapter }: { title: string; kicker?: string; chapter?: number }) {
  const active = TABS.find((t) => t.n === chapter);
  const ground = active ? STOCK[active.color] : "#fcfcfd";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#e9ebef", padding: "0 56px 0" }}>
        <div style={{ display: "flex", gap: 8, height: 64, alignItems: "flex-end" }}>
          {TABS.map((t) => (
            <div
              key={t.n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                height: t.n === chapter ? 64 : 50,
                padding: "0 22px",
                background: STOCK[t.color],
                borderRadius: "14px 14px 0 0",
                fontFamily: "Archivo",
                fontSize: 21,
                color: "#15171c",
              }}
            >
              <span style={{ fontFamily: "Archivo Expanded", fontSize: 24 }}>{t.n}</span>
              {t.label}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", background: ground, padding: "52px 60px 44px", borderRadius: "0 6px 0 0" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontFamily: "Fragment Mono", fontSize: 24, color: "#444a55" }}>{kicker ?? "KreativVantage"}</div>
            <div style={{ fontFamily: "Archivo Expanded", fontSize: title.length > 48 ? 58 : 70, lineHeight: 1.02, letterSpacing: -2.5, color: "#15171c", maxWidth: 1000 }}>
              {title}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Fragment Mono", fontSize: 22, color: "#15171c" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <svg width="40" height="40" viewBox="0 0 32 32">
                <path d="M25 6h3.2a1.8 1.8 0 0 1 1.8 1.8v6.4a1.8 1.8 0 0 1-1.8 1.8H25Z" fill="#f5d66b" />
                <rect x="2" y="2" width="24" height="28" rx="3" fill="#15171c" />
                <path d="M9 8.5v15M9 17.2 18.5 8.5M12.6 14l6.4 9.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="square" fill="none" />
              </svg>
              <span style={{ fontFamily: "Archivo", fontSize: 28 }}>KreativVantage</span>
            </div>
            <span>kreativvantage.com · (314) 780-2331</span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
