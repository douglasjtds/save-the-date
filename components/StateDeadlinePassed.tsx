export default function StateDeadlinePassed() {
  return (
    <div className="state-enter text-center flex flex-col items-center gap-4 py-12">
      <div
        className="text-2xl"
        style={{ color: 'var(--color-ink-muted)' }}
        aria-hidden="true"
      >
        ❧
      </div>
      <h3
        className="text-2xl md:text-3xl font-bold italic"
        style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink)' }}
      >
        O prazo para confirmações foi encerrado
      </h3>
      <p
        className="text-base leading-relaxed max-w-sm italic"
        style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink-muted)' }}
      >
        Aguardamos por todos em 21 de Novembro de 2026.
      </p>
      <div className="divider-accent w-24 mx-auto" />
      <p
        className="text-sm"
        style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink-muted)' }}
      >
        Igreja Matriz Nossa Senhora da Saúde · Lagoa Santa, MG
      </p>
    </div>
  );
}
