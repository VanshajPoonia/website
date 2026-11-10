// The mark: an ink page with a K, and one index tab standing off its edge.
export default function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" className="mark">
      <path d="M25 6h3.2a1.8 1.8 0 0 1 1.8 1.8v6.4a1.8 1.8 0 0 1-1.8 1.8H25Z" fill="var(--yellow)" />
      <rect x="2" y="2" width="24" height="28" rx="3" fill="var(--ink)" />
      <path d="M9 8.5v15M9 17.2 18.5 8.5M12.6 14l6.4 9.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="square" fill="none" />
    </svg>
  );
}
