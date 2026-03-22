export default function LilyDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center w-full py-3 ${className}`}>
      <svg
        width="280"
        height="40"
        viewBox="0 0 280 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left branch */}
        <g stroke="var(--color-lily)" strokeWidth="1.2" strokeLinecap="round">
          <path d="M10 20 Q30 10 55 20" />
          <path d="M55 20 Q75 10 100 20" />
          <path d="M30 20 Q32 12 28 8" />
          <path d="M30 20 Q38 13 36 7" />
          <path d="M55 20 Q57 11 52 6" />
          <path d="M55 20 Q63 12 61 5" />
          <path d="M78 20 Q80 12 75 8" />
          <path d="M78 20 Q86 13 84 7" />
          {/* Small leaf dots */}
          <circle cx="28" cy="8" r="1.5" fill="var(--color-lily)" />
          <circle cx="36" cy="7" r="1.5" fill="var(--color-lily)" />
          <circle cx="52" cy="6" r="1.5" fill="var(--color-lily)" />
          <circle cx="61" cy="5" r="1.5" fill="var(--color-lily)" />
          <circle cx="75" cy="8" r="1.5" fill="var(--color-lily)" />
          <circle cx="84" cy="7" r="1.5" fill="var(--color-lily)" />
        </g>

        {/* Central diamond ornament */}
        <g fill="var(--color-terracota)">
          <polygon points="140,14 146,20 140,26 134,20" />
          <polygon points="140,11 142,13 140,15 138,13" opacity="0.5" />
          <polygon points="140,25 142,27 140,29 138,27" opacity="0.5" />
        </g>

        {/* Right branch (mirrored) */}
        <g stroke="var(--color-lily)" strokeWidth="1.2" strokeLinecap="round">
          <path d="M270 20 Q250 10 225 20" />
          <path d="M225 20 Q205 10 180 20" />
          <path d="M250 20 Q248 12 252 8" />
          <path d="M250 20 Q242 13 244 7" />
          <path d="M225 20 Q223 11 228 6" />
          <path d="M225 20 Q217 12 219 5" />
          <path d="M202 20 Q200 12 205 8" />
          <path d="M202 20 Q194 13 196 7" />
          <circle cx="252" cy="8" r="1.5" fill="var(--color-lily)" />
          <circle cx="244" cy="7" r="1.5" fill="var(--color-lily)" />
          <circle cx="228" cy="6" r="1.5" fill="var(--color-lily)" />
          <circle cx="219" cy="5" r="1.5" fill="var(--color-lily)" />
          <circle cx="205" cy="8" r="1.5" fill="var(--color-lily)" />
          <circle cx="196" cy="7" r="1.5" fill="var(--color-lily)" />
        </g>

        {/* Connecting lines */}
        <line x1="100" y1="20" x2="134" y2="20" stroke="var(--color-lily)" strokeWidth="1" />
        <line x1="146" y1="20" x2="180" y2="20" stroke="var(--color-lily)" strokeWidth="1" />
      </svg>
    </div>
  );
}
