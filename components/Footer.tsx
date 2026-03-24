export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-[var(--color-border)] text-center mt-auto bg-[var(--color-paper-dark)]">
      <p
        className="text-xs uppercase tracking-widest font-bold"
        style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink-muted)' }}
      >
        Iara Mello &amp; Douglas Tertuliano &#10022; 2026
      </p>
    </footer>
  );
}
