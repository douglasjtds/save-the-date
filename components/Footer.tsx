export default function Footer() {
  return (
    <footer className="w-full bg-[var(--color-paper)] px-6 pt-10 pb-12">
      <div className="max-w-[var(--max-width-content)] mx-auto">
        <div className="divider-editorial mb-6" />
        <div className="text-center flex flex-col items-center gap-2">
          <p
            className="text-xs tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink-muted)' }}
          >
            The Wedding Post
          </p>
          <p
            className="text-sm"
            style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink-muted)' }}
          >
            21 de Novembro de 2026
          </p>
          <p
            className="text-sm italic mt-1"
            style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink-muted)' }}
          >
            ❧ Com amor, Iara &amp; Douglas ❧
          </p>
        </div>
      </div>
    </footer>
  );
}
