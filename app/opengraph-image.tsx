import { ogImage, ogSize } from "@/lib/og";

export const alt = "KreativVantage: websites that do the busywork";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Websites that do the busywork.", kicker: "Websites, stores and automation for small businesses" });
}
