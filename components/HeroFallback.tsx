// The cover scene drawn flat: same trays, same solid lines. Shown before the
// WebGL scene loads and whenever it cannot.

const trays = [
  { id: "website", x: 92, y: 190, label: "Website", fill: "var(--blue)" },
  { id: "crm", x: 300, y: 104, label: "CRM", fill: "var(--green)" },
  { id: "inbox", x: 520, y: 92, label: "Inbox", fill: "var(--purple)" },
  { id: "calendar", x: 505, y: 250, label: "Calendar", fill: "var(--yellow)" },
];

export default function HeroFallback() {
  return (
    <svg className="scene__fallback" viewBox="0 0 640 420" aria-hidden="true" focusable="false">
      <g fill="none" stroke="var(--ink)" strokeWidth="2.2">
        <path d="M156 186 C 190 150, 210 132, 238 122" />
        <path d="M362 104 C 400 92, 430 92, 458 96" />
        <path d="M340 140 C 380 190, 410 214, 444 236" />
      </g>
      {trays.map((t) => (
        <g key={t.id} transform={`translate(${t.x - 62} ${t.y - 42})`}>
          <rect x="4" y="14" width="124" height="80" rx="8" fill="rgba(21,23,28,.08)" />
          <rect x="0" y="22" width="124" height="62" rx="7" fill={t.fill} />
          <rect x="0" y="22" width="124" height="62" rx="7" fill="rgba(21,23,28,.12)" />
          <rect x="0" y="0" width="124" height="78" rx="7" fill={t.fill} />
          <rect x="8" y="8" width="108" height="62" rx="3" fill="var(--paper)" />
          <text x="20" y="34" fontFamily="var(--font-display)" fontWeight="600" fontSize="17" fill="var(--ink)">
            {t.label}
          </text>
          <path d="M20 48h80M20 58h56" stroke="rgba(21,23,28,.12)" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}
