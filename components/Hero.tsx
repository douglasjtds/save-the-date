import Countdown from './Countdown';

export default function Hero({ deadline }: { deadline: string | null }) {
  return (
    <section className="w-full bg-[var(--color-paper)] px-6 py-10 md:py-16">
      <div
        className="mx-auto"
        style={{ maxWidth: 'var(--max-width-hero)' }}
      >
        {/* Desktop: 3-column grid | Mobile: stacked */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 md:gap-8 items-start">

          {/* Left photo */}
          <div className="hidden md:block">
            <div
              className="w-full aspect-[3/4] bg-[var(--color-border)] flex items-center justify-center"
              style={{ border: '2px solid var(--color-ink)', boxShadow: 'var(--shadow-photo)', filter: 'sepia(15%) contrast(105%)' }}
            >
              {/* TODO: replace with <Image src="/photos/photo-1.webp" alt="Iara e Douglas" fill className="object-cover" /> */}
              <span className="text-xs italic" style={{ color: 'var(--color-ink-muted)' }}>foto</span>
            </div>
          </div>

          {/* Center: editorial headline */}
          <div className="text-center flex flex-col items-center gap-4">
            {/* Badge */}
            <div
              className="inline-block px-4 py-1 text-xs tracking-[0.2em] uppercase"
              style={{
                border: '1px solid var(--color-terracota)',
                color: 'var(--color-terracota)',
                fontFamily: 'var(--font-playfair), serif',
                fontVariant: 'small-caps',
              }}
            >
              Save the Date
            </div>

            {/* Couple name */}
            <h2
              className="text-4xl md:text-5xl leading-tight font-black italic"
              style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink)' }}
            >
              Iara Mello
              <br />
              <span className="font-normal text-2xl md:text-3xl not-italic" style={{ color: 'var(--color-ink-muted)' }}>
                &amp;
              </span>
              <br />
              Douglas Tertuliano
            </h2>

            {/* Divider accent */}
            <div className="w-24 divider-accent" />

            {/* Wedding details */}
            <div style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink)' }}>
              <p className="text-lg font-normal">21 de Novembro de 2026</p>
              <p className="text-sm italic mt-1" style={{ color: 'var(--color-ink-muted)' }}>
                Igreja Matriz Nossa Senhora da Saúde
              </p>
              <p className="text-sm italic" style={{ color: 'var(--color-ink-muted)' }}>
                Lagoa Santa, MG
              </p>
            </div>

            {/* Mobile photo 1 */}
            <div
              className="block md:hidden w-48 aspect-[3/4] bg-[var(--color-border)] flex items-center justify-center mx-auto"
              style={{ border: '2px solid var(--color-ink)', boxShadow: 'var(--shadow-photo)' }}
            >
              <span className="text-xs italic" style={{ color: 'var(--color-ink-muted)' }}>foto</span>
            </div>

            {/* CTA */}
            <a
              href="#busca"
              className="btn-primary mt-2 w-full md:w-auto"
            >
              Confirmar Presença
            </a>

            {/* Mobile photo 2 */}
            <div
              className="block md:hidden w-48 aspect-[3/4] bg-[var(--color-border)] flex items-center justify-center mx-auto"
              style={{ border: '2px solid var(--color-ink)', boxShadow: 'var(--shadow-photo)' }}
            >
              <span className="text-xs italic" style={{ color: 'var(--color-ink-muted)' }}>foto</span>
            </div>

            {/* Countdown (only if deadline set) */}
            <Countdown deadline={deadline} />
          </div>

          {/* Right photo */}
          <div className="hidden md:block">
            <div
              className="w-full aspect-[3/4] bg-[var(--color-border)] flex items-center justify-center"
              style={{ border: '2px solid var(--color-ink)', boxShadow: 'var(--shadow-photo)', filter: 'sepia(15%) contrast(105%)' }}
            >
              {/* TODO: replace with <Image src="/photos/photo-2.webp" alt="Iara e Douglas" fill className="object-cover" /> */}
              <span className="text-xs italic" style={{ color: 'var(--color-ink-muted)' }}>foto</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
