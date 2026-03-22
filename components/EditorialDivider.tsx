import LilyDivider from './LilyDivider';

export default function EditorialDivider() {
  return (
    <div
      className="w-full flex flex-col items-center justify-center py-4"
      style={{ backgroundColor: 'var(--color-terracota)' }}
    >
      <p
        className="text-sm italic tracking-wide"
        style={{ color: 'var(--color-white)', fontFamily: 'var(--font-im-fell), serif' }}
      >
        Confirme sua presença abaixo
      </p>
      <LilyDivider className="opacity-30 invert" />
    </div>
  );
}
