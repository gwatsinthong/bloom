import { useId } from "react";

type CanProps = {
  className?: string;
  /** Optional brand tint washed over the holographic body */
  tint?: { from: string; to: string };
  label?: string;
  subLabel?: string;
};

/**
 * The Bloom can, drawn entirely in SVG — a brushed-aluminium cylinder
 * with a holographic wash and the interlocked-O wordmark.
 */
export default function Can({
  className = "",
  tint,
  label = "BLOOM",
  subLabel = "botanical sparkling water",
}: CanProps) {
  const id = useId().replace(/[:«»]/g, "");
  const body = `body-${id}`;
  const holo = `holo-${id}`;
  const lid = `lid-${id}`;
  const streak = `streak-${id}`;
  const tintId = `tint-${id}`;

  return (
    <svg
      viewBox="0 0 220 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${label} — ${subLabel}`}
    >
      <defs>
        <linearGradient id={body} x1="42" y1="0" x2="178" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8d8298" />
          <stop offset="0.12" stopColor="#b6abc2" />
          <stop offset="0.32" stopColor="#ebe3ee" />
          <stop offset="0.5" stopColor="#fcf8fc" />
          <stop offset="0.66" stopColor="#efe5ed" />
          <stop offset="0.85" stopColor="#bfb0c6" />
          <stop offset="1" stopColor="#90869c" />
        </linearGradient>
        <linearGradient id={holo} x1="42" y1="36" x2="178" y2="342" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffd7e8" />
          <stop offset="0.3" stopColor="#d3f3e0" />
          <stop offset="0.55" stopColor="#d9d2f5" />
          <stop offset="0.8" stopColor="#ffe5d0" />
          <stop offset="1" stopColor="#cfe4fb" />
        </linearGradient>
        <linearGradient id={lid} x1="48" y1="0" x2="172" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7d7488" />
          <stop offset="0.5" stopColor="#d9d2de" />
          <stop offset="1" stopColor="#847a90" />
        </linearGradient>
        <linearGradient id={streak} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {tint && (
          <linearGradient id={tintId} x1="0" y1="36" x2="0" y2="342" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={tint.from} />
            <stop offset="1" stopColor={tint.to} />
          </linearGradient>
        )}
      </defs>

      {/* body */}
      <rect x="42" y="36" width="136" height="306" rx="22" fill={`url(#${body})`} />
      <rect x="42" y="36" width="136" height="306" rx="22" fill={`url(#${holo})`} opacity="0.42" />
      {tint && (
        <rect x="42" y="36" width="136" height="306" rx="22" fill={`url(#${tintId})`} opacity="0.5" />
      )}

      {/* specular streaks */}
      <rect x="62" y="44" width="14" height="290" rx="7" fill={`url(#${streak})`} opacity="0.5" />
      <rect x="148" y="48" width="8" height="284" rx="4" fill={`url(#${streak})`} opacity="0.3" />

      {/* neck + bottom shading */}
      <path d="M42 58 Q110 76 178 58 L178 46 Q110 64 42 46 Z" fill="#544c60" opacity="0.18" />
      <path d="M42 330 Q110 314 178 330 L178 320 Q110 336 42 320 Z" fill="#ffffff" opacity="0.28" />
      <ellipse cx="110" cy="338" rx="60" ry="7" fill="#4d4458" opacity="0.3" />

      {/* lid */}
      <ellipse cx="110" cy="40" rx="68" ry="15" fill={`url(#${lid})`} />
      <ellipse cx="110" cy="39" rx="56" ry="11" fill="#b9b0c4" />
      <ellipse cx="110" cy="39" rx="46" ry="8.5" fill="#cfc7d8" />
      <rect x="103" y="32" width="14" height="9" rx="4.5" fill="#9a90a8" />
      <ellipse cx="110" cy="36" rx="4" ry="2.4" fill="#7b7189" />

      {/* label */}
      <text
        x="110"
        y="180"
        textAnchor="middle"
        fontFamily="var(--font-instrument-serif), serif"
        fontSize="36"
        letterSpacing="1.5"
        fill="#2b2433"
        opacity="0.88"
      >
        {label === "BLOOM" ? (
          <>
            BL<tspan>O</tspan>
            <tspan dx="-12">O</tspan>M
          </>
        ) : (
          label
        )}
      </text>
      <text
        x="110"
        y="226"
        textAnchor="middle"
        fontFamily="var(--font-inter), sans-serif"
        fontSize="9.5"
        letterSpacing="0.6"
        fill="#4d4458"
        opacity="0.8"
      >
        {subLabel}
      </text>
      <text
        x="110"
        y="240"
        textAnchor="middle"
        fontFamily="var(--font-inter), sans-serif"
        fontSize="9.5"
        letterSpacing="0.6"
        fill="#4d4458"
        opacity="0.7"
      >
        water
      </text>
    </svg>
  );
}
