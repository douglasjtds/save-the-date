interface LilyDividerProps {
  className?: string;
}

export default function LilyDivider({ className = "" }: LilyDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-4 w-full py-3 text-[var(--color-lily)] text-2xl opacity-80 ${className}`}>
      <span className="divider-accent flex-grow max-w-[60px]" />
      <span aria-hidden="true">❧</span>
      <span className="divider-accent flex-grow max-w-[60px]" />
    </div>
  );
}
