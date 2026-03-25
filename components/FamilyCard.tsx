interface Member {
  name: string;
  attending: boolean;
}

interface FamilyCardProps {
  familyName: string;
  members: Member[];
  onToggle: (name: string) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export default function FamilyCard({
  familyName,
  members,
  onToggle,
  onConfirm,
  isSubmitting,
}: FamilyCardProps) {
  return (
    <div
      className="state-enter w-full relative bg-paper-dark border border-border"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Inner decorative border */}
      <div className="absolute top-2 left-2 right-2 bottom-2 border border-[var(--color-border)] pointer-events-none" />

      {/* Card header */}
      <div className="relative z-10 px-6 py-4 border-b border-border">
        <h3 className="text-xl font-bold font-playfair text-ink">
          {familyName}
        </h3>
        <p className="text-sm italic mt-1 font-im-fell text-ink-muted">
          Desmarque quem não poderá comparecer
        </p>
      </div>

      {/* Member list */}
      <ul className="relative z-10 px-6 py-2">
        {members.map((member, i) => (
          <li
            key={member.name}
            className="flex items-center gap-4 py-3 border-b border-border last:border-b-0 min-h-[44px]"
          >
            <label className="checkbox-editorial">
              <input
                type="checkbox"
                id={`member-${i}`}
                checked={member.attending}
                onChange={() => onToggle(member.name)}
                disabled={isSubmitting}
              />
              <div className="checkbox-visual" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </label>
            <label
              htmlFor={`member-${i}`}
              className={`text-base cursor-pointer select-none flex-1 font-im-fell ${member.attending ? 'text-ink' : 'text-ink-muted line-through'}`}
            >
              {member.name}
            </label>
          </li>
        ))}
      </ul>

      {/* Confirm button */}
      <div className="relative z-10 px-6 pb-6 pt-2">
        <button
          className="btn-primary w-full"
          onClick={onConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Confirmando…
            </>
          ) : (
            'Confirmar Presença'
          )}
        </button>
      </div>
    </div>
  );
}
