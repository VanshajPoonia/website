import { getIndustry, industries } from "@/lib/industries";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "KreativVantage industry page";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const ind = getIndustry((await params).slug);
  return ogImage({ title: ind?.headline ?? "KreativVantage", kicker: ind ? `Industries · ${ind.name}` : undefined });
}
