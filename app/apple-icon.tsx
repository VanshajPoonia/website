import { ImageResponse } from "next/og";
import { MARK_SVG, markDataUri } from "@/lib/mark-svg";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markDataUri(MARK_SVG)} width={101} height={128} alt="" />
      </div>
    ),
    size,
  );
}
