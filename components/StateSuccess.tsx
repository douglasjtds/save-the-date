import LilyDivider from './LilyDivider';

interface StateSuccessProps {
  familyName: string;
}

export default function StateSuccess({ familyName }: StateSuccessProps) {
  return (
    <div className="state-enter text-center flex flex-col items-center gap-4 py-8">
      <LilyDivider />

      {/* Rotated icon container */}
      <div
        className="w-16 h-16 flex items-center justify-center rotate-3 border-2 border-success text-success bg-paper"
        aria-hidden="true"
      >
        <svg className="-rotate-3" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12L9.5 17.5L20 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold font-playfair text-ink">
        Confirmação recebida!
      </h3>
      <p className="text-lg leading-relaxed max-w-sm font-im-fell text-ink">
        Obrigado, <span className="italic">{familyName}</span>!<br />
        Esperamos por vocês em 21 de Novembro.
      </p>
      <div className="divider-accent w-24 mx-auto" />
      <p className="text-sm italic font-im-fell text-ink-muted">
        Igreja Matriz Nossa Senhora da Saúde · Lagoa Santa, MG
      </p>
    </div>
  );
}
