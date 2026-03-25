const WHATSAPP_URL =
  'https://wa.me/5531991848090?text=Oi%20Douglas%2C%20fiquei%20com%20d%C3%BAvidas%20sobre%20como%20confirmar%20presen%C3%A7a%20no%20seu%20casamento%2C%20pode%20me%20ajudar%3F';

export default function StateNotFound() {
  return (
    <div className="state-enter text-center flex flex-col items-center gap-4 py-8">
      <div className="text-2xl text-ink-muted" aria-hidden="true">
        ❧
      </div>
      <h3 className="text-2xl font-bold font-playfair text-ink">
        Não encontramos seu nome
      </h3>
      <p className="text-base leading-relaxed max-w-sm font-im-fell text-ink">
        Tente buscar pelo primeiro nome, sobrenome, ou pelo nome da família
        (ex: {'\u201C'}Família Silva{'\u201D'} ou apenas {'\u201C'}Silva{'\u201D'}).
      </p>
      <div className="divider-accent w-24 mx-auto" />
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm underline underline-offset-2 italic font-im-fell text-terracota"
      >
        Se ficou alguma dúvida sobre como confirmar sua presença, fale comigo aqui
      </a>
    </div>
  );
}
