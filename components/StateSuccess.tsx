import LilyDivider from './LilyDivider';

export default function StateSuccess({ familyName }: { familyName: string }) {
  return (
    <div className="state-enter text-center flex flex-col items-center gap-4 py-8">
      <LilyDivider />

      {/* Rotated icon container */}
      <div
        className="w-16 h-16 flex items-center justify-center rotate-[3deg]"
        style={{
          border: '2px solid var(--color-success)',
          color: 'var(--color-success)',
          backgroundColor: 'var(--color-paper)',
        }}
        aria-hidden="true"
      >
        <svg className="-rotate-[3deg]" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12L9.5 17.5L20 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h3
        className="text-2xl md:text-3xl font-bold"
        style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink)' }}
      >
        Confirma&#231;&#227;o recebida!
      </h3>
      <p
        className="text-lg leading-relaxed max-w-sm"
        style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink)' }}
      >
        Obrigado, <span className="italic">{familyName}</span>!<br />
        Esperamos por voc&#234;s em 21 de Novembro.
      </p>
      <div className="divider-accent w-24 mx-auto" />
      <p
        className="text-sm italic"
        style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink-muted)' }}
      >
        Igreja Matriz Nossa Senhora da Sa&#250;de &#183; Lagoa Santa, MG
      </p>
    </div>
  );
}
