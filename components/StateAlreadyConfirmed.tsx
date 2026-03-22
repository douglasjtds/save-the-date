export default function StateAlreadyConfirmed({ familyName }: { familyName: string }) {
  return (
    <div className="state-enter text-center flex flex-col items-center gap-4 py-8">
      <div
        className="text-3xl"
        style={{ color: 'var(--color-terracota)' }}
        aria-hidden="true"
      >
        ◆
      </div>
      <h3
        className="text-2xl md:text-3xl font-bold"
        style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink)' }}
      >
        Já recebemos sua confirmação!
      </h3>
      <p
        className="text-lg leading-relaxed max-w-sm"
        style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink)' }}
      >
        <span className="italic">{familyName}</span>, sua presença já está registrada.<br />
        Será um prazer tê-los conosco.
      </p>
      <div className="divider-accent w-24 mx-auto" />
      <p
        className="text-sm italic"
        style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink-muted)' }}
      >
        21 de Novembro de 2026 · Igreja Matriz N.S. da Saúde, Lagoa Santa
      </p>
    </div>
  );
}
