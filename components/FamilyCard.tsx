type Member = {
  name: string;
  attending: boolean;
};

type Props = {
  familyName: string;
  members: Member[];
  onToggle: (name: string) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
};

export default function FamilyCard({
  familyName,
  members,
  onToggle,
  onConfirm,
  isSubmitting,
}: Props) {
  return (
    <div
      className="state-enter w-full"
      style={{
        border: '1px solid var(--color-terracota)',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-card)',
        backgroundColor: 'var(--color-white)',
      }}
    >
      {/* Card header */}
      <div
        className="px-6 py-4"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <h3
          className="text-xl font-bold"
          style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink)' }}
        >
          {familyName}
        </h3>
        <p
          className="text-sm italic mt-1"
          style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink-muted)' }}
        >
          Desmarque quem não poderá comparecer
        </p>
      </div>

      {/* Member list */}
      <ul className="px-6 py-2">
        {members.map((member, i) => (
          <li
            key={member.name}
            className="flex items-center gap-4 py-3"
            style={{
              borderBottom: i < members.length - 1 ? '1px solid var(--color-border)' : 'none',
              minHeight: '44px',
            }}
          >
            <input
              type="checkbox"
              id={`member-${i}`}
              checked={member.attending}
              onChange={() => onToggle(member.name)}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`member-${i}`}
              className="text-base cursor-pointer select-none flex-1"
              style={{
                fontFamily: 'var(--font-im-fell), serif',
                color: member.attending ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                textDecoration: member.attending ? 'none' : 'line-through',
              }}
            >
              {member.name}
            </label>
          </li>
        ))}
      </ul>

      {/* Confirm button */}
      <div className="px-6 pb-6 pt-2">
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
