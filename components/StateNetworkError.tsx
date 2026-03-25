interface StateNetworkErrorProps {
  onRetry: () => void;
}

export default function StateNetworkError({ onRetry }: StateNetworkErrorProps) {
  return (
    <div className="state-enter text-center flex flex-col items-center gap-4 py-8">
      <div className="text-2xl text-ink-muted" aria-hidden="true">
        ◆
      </div>
      <h3 className="text-xl font-bold font-playfair text-ink">
        Não foi possível enviar
      </h3>
      <p className="text-base leading-relaxed max-w-sm font-im-fell text-ink">
        Houve um problema de conexão. Verifique sua internet e tente novamente.
      </p>
      <button onClick={onRetry} className="btn-primary mt-2">
        Tentar novamente
      </button>
    </div>
  );
}
