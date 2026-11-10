import { ogImage, ogSize } from "@/lib/og";
import { getWork, work } from "@/lib/work";

export const alt = "Kreativ Vantage case file";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const w = getWork((await params).slug);
  return ogImage({ title: w ? w.client : "Case file", kicker: w ? `Case file · ${w.industry}` : undefined });
}
