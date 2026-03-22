import LilyDivider from './LilyDivider';

export default function StateSuccess({ familyName }: { familyName: string }) {
  return (
    <div className="state-enter text-center flex flex-col items-center gap-4 py-8">
      <LilyDivider />
      <div
        className="w-12 h-12 flex items-center justify-center text-2xl"
        style={{ color: 'var(--color-success)' }}
        aria-hidden="true"
      >
        ✦
      </div>
      <h3
        className="text-2xl md:text-3xl font-bold"
        style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink)' }}
      >
        Confirmação recebida!
      </h3>
      <p
        className="text-lg leading-relaxed max-w-sm"
        style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink)' }}
      >
        Obrigado, <span className="italic">{familyName}</span>!<br />
        Esperamos por vocês em 21 de Novembro.
      </p>
      <div className="divider-accent w-24 mx-auto" />
      <p
        className="text-sm italic"
        style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink-muted)' }}
      >
        Igreja Matriz Nossa Senhora da Saúde · Lagoa Santa, MG
      </p>
    </div>
  );
}
