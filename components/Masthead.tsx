export default function Masthead() {
  return (
    <header className="w-full divider-editorial">
      {/* Top rubric */}
      <div className="flex justify-between items-center w-full uppercase text-[10px] sm:text-xs font-bold tracking-widest border-b border-[var(--color-ink)] pb-2 mb-3 mt-1"
        style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink-muted)' }}
      >
        <span>Edi&#231;&#227;o Especial</span>
        <span>Pre&#231;o: Amor</span>
      </div>

      {/* Title */}
      <h1
        className="text-4xl sm:text-5xl lg:text-7xl text-center my-4 leading-[0.9] tracking-widest"
        style={{ fontFamily: 'var(--font-cloister)', color: 'var(--color-ink)' }}
      >
        The Wedding<br />Post
      </h1>

      {/* Bottom rubric */}
      <div className="flex justify-between items-center w-full uppercase text-[10px] sm:text-xs font-bold tracking-widest border-t border-[var(--color-ink)] pt-2 mt-3 mb-1"
        style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink-muted)' }}
      >
        <span>S&#227;o Paulo, SP</span>
        <span>S&#225;bado, 21 Nov 2026</span>
      </div>
    </header>
  );
}
