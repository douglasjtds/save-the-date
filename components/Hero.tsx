import Countdown from './Countdown';

interface HeroProps {
  deadline: string | null;
}

export default function Hero({ deadline }: HeroProps) {
  return (
    <section className="w-full py-6">
      <div className="text-center mb-6">
        {/* Badge — inverted ink */}
        <span className="inline-block px-3 py-1 text-xs uppercase font-bold tracking-widest mb-6 rounded-[2px] font-playfair bg-ink text-paper">
          Save The Date
        </span>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight font-playfair text-ink">
          Iara & Douglas anunciam a data da cerimônia
        </h2>
      </div>

      {/* Editorial text with drop cap */}
      <div className="text-base sm:text-lg leading-relaxed text-justify space-y-4 mb-8 font-im-fell text-ink">
        <p>
          <span className="float-left text-6xl font-black leading-[0.75] mr-3 mt-1 font-playfair text-ink">
            É
          </span>
          com imensa alegria que convidamos você para testemunhar e celebrar este novo capítulo de nossas vidas. Após anos de histórias compartilhadas, risadas e cumplicidade, decidimos oficializar nossa união cercados pelas pessoas que tornam nossa jornada autêntica e inesquecível.
        </p>
        <p>
          A cerimônia e a recepção ocorrerão no mesmo local, pensadas com esmero para proporcionar uma tarde memorável. Haverá boa música, comida afetiva e memórias que guardaremos para a posteridade.
        </p>
      </div>

      {/* Countdown */}
      <Countdown deadline={deadline} />
    </section>
  );
}
