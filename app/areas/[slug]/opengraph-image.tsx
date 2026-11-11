import { areas, getArea } from "@/lib/areas";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "KreativVantage area page";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArea((await params).slug);
  return ogImage({ title: a?.headline ?? "KreativVantage", kicker: a ? `Areas · ${a.region}` : undefined });
}
