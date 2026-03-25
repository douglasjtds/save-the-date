interface StateAlreadyConfirmedProps {
  familyName: string;
}

export default function StateAlreadyConfirmed({ familyName }: StateAlreadyConfirmedProps) {
  return (
    <div className="state-enter text-center flex flex-col items-center gap-4 py-8">
      {/* Rotated icon container — ink-muted */}
      <div
        className="w-16 h-16 flex items-center justify-center rotate-3 border-2 border-ink-muted text-ink-muted bg-paper"
        aria-hidden="true"
      >
        <svg className="-rotate-3" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 7V5C3 3.89543 3.89543 3 5 3H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 3H19C20.1046 3 21 3.89543 21 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M21 17V19C21 20.1046 20.1046 21 19 21H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 21H5C3.89543 21 3 20.1046 3 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold font-playfair text-ink">
        Já recebemos sua confirmação!
      </h3>
      <p className="text-lg leading-relaxed max-w-sm font-im-fell text-ink">
        <span className="italic">{familyName}</span>, sua presença já está registrada.<br />
        Será um prazer tê-los conosco.
      </p>
      <div className="divider-accent w-24 mx-auto" />
      <p className="text-sm italic font-im-fell text-ink-muted">
        21 de Novembro de 2026 · Igreja Matriz N.S. da Saúde, Lagoa Santa
      </p>
    </div>
  );
}
