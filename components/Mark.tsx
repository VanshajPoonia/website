// The KreativVantage K, redrawn as vector from the original logo artwork:
// a purple bar, a blue diagonal, and a green-to-yellow arch with its keyhole.
export const MARK_RATIO = 256 / 323;

export default function Mark({ size = 30, title, id = "mk" }: { size?: number; title?: string; id?: string }) {
  const g = (n: string) => `${id}-${n}`;
  return (
    <svg
      height={size}
      width={Math.round(size * MARK_RATIO)}
      viewBox="0 0 256 323"
      className="mark"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <MarkDefs prefix={id} />
      <path d="M124.4 0H182L98 200H48Z" fill={`url(#${g("cyan")})`} />
      <path d="M182 0h73.5L138 200H98Z" fill={`url(#${g("navy")})`} />
      <rect x="0" y="0" width="37.5" height="323" fill={`url(#${g("barL")})`} />
      <rect x="37" y="0" width="38" height="323" fill={`url(#${g("barR")})`} />
      <path
        fillRule="evenodd"
        d="M0 323C23 226 63 158 116 158c62 0 107 73 135 165ZM37 323c13-67 46-102 85-102 41 0 78 40 93 102Z"
        fill={`url(#${g("archO")})`}
      />
      <path
        fillRule="evenodd"
        d="M37 323c13-67 46-102 85-102 41 0 78 40 93 102ZM76 323c7-32 24-46 47-46s38 16 44 46Z"
        fill={`url(#${g("archI")})`}
      />
    </svg>
  );
}

/** Gradient definitions, shared with the favicon and share-image renderers. */
export function MarkDefs({ prefix }: { prefix: string }) {
  const g = (n: string) => `${prefix}-${n}`;
  return (
    <defs>
      <linearGradient id={g("cyan")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#28bae6" />
        <stop offset="1" stopColor="#2f86c5" />
      </linearGradient>
      <linearGradient id={g("navy")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3a53a4" />
        <stop offset="1" stopColor="#2f86c5" />
      </linearGradient>
      <linearGradient id={g("barL")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9d4189" />
        <stop offset="1" stopColor="#7c3291" />
      </linearGradient>
      <linearGradient id={g("barR")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#742f92" />
        <stop offset="1" stopColor="#95418a" />
      </linearGradient>
      <linearGradient id={g("archO")} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#5ead3f" />
        <stop offset="0.45" stopColor="#79b839" />
        <stop offset="0.75" stopColor="#abcd2d" />
        <stop offset="1" stopColor="#d9e123" />
      </linearGradient>
      <linearGradient id={g("archI")} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#c5d827" />
        <stop offset="0.5" stopColor="#abcd2d" />
        <stop offset="1" stopColor="#5dac3f" />
      </linearGradient>
    </defs>
  );
}
