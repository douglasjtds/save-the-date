export default function Masthead() {
  return (
    <header className="w-full bg-[var(--color-paper)] px-6 pt-8 pb-4">
      <div className="max-w-[var(--max-width-hero)] mx-auto">
        {/* Top double rule */}
        <div className="divider-editorial mb-3" />

        {/* Masthead text */}
        <div className="text-center py-2">
          <p
            className="text-xs tracking-[0.25em] uppercase mb-1"
            style={{ fontFamily: "var(--font-im-fell), serif", color: "var(--color-ink-muted)" }}
          >
            Edição Especial
          </p>
          <h1
            className="text-4xl md:text-6xl font-black tracking-[0.12em] uppercase leading-none"
            style={{ fontFamily: "var(--font-playfair), serif", color: "var(--color-ink)" }}
          >
            The Wedding Post
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px flex-1 bg-[var(--color-terracota)]" />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--color-terracota)", fontFamily: "var(--font-im-fell), serif" }}
            >
              ✦ 21 de Novembro de 2026 ✦
            </span>
            <div className="h-px flex-1 bg-[var(--color-terracota)]" />
          </div>
        </div>

        {/* Bottom double rule */}
        <div className="divider-editorial mt-3" />
      </div>
    </header>
  );
}
