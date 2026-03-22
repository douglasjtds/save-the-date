export default function StateNetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="state-enter text-center flex flex-col items-center gap-4 py-8">
      <div
        className="text-2xl"
        style={{ color: 'var(--color-ink-muted)' }}
        aria-hidden="true"
      >
        ◆
      </div>
      <h3
        className="text-xl font-bold"
        style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink)' }}
      >
        Não foi possível enviar
      </h3>
      <p
        className="text-base leading-relaxed max-w-sm"
        style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink)' }}
      >
        Houve um problema de conexão. Verifique sua internet e tente novamente.
      </p>
      <button onClick={onRetry} className="btn-primary mt-2">
        Tentar novamente
      </button>
    </div>
  );
}
