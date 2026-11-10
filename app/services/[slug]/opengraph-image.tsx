import { ogImage, ogSize } from "@/lib/og";
import { getService, services } from "@/lib/services";

export const alt = "KreativVantage service chapter";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  return ogImage({ title: s?.headline ?? "KreativVantage", kicker: s ? `Chapter ${s.chapter} · ${s.title}` : undefined, chapter: s?.chapter });
}
