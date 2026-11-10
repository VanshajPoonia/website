import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#fcfcfd" }}>
        <svg width="132" height="132" viewBox="0 0 32 32">
          <path d="M25 6h3.2a1.8 1.8 0 0 1 1.8 1.8v6.4a1.8 1.8 0 0 1-1.8 1.8H25Z" fill="#f5d66b" />
          <rect x="2" y="2" width="24" height="28" rx="3" fill="#15171c" />
          <path d="M9 8.5v15M9 17.2 18.5 8.5M12.6 14l6.4 9.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="square" fill="none" />
        </svg>
      </div>
    ),
    size,
  );
}
