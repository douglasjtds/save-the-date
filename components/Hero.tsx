import Image from 'next/image';
import Countdown from './Countdown';

interface HeroProps {
  deadline: string | null;
}

export default function Hero({ deadline }: HeroProps) {
  return (
    <section className="w-full py-6">
      <div className="text-center mb-6">
        <Image
          src="/logo_i-d.png"
          alt="Iara & Douglas"
          width={240}
          height={240}
          priority
          className="mx-auto mb-6 w-32 sm:w-40 lg:w-60 h-auto"
        />

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight font-playfair text-ink">
          Iara & Douglas anunciam a data da cerimônia
        </h2>
      </div>

      {/* Editorial text with drop cap */}
      <div className="text-base sm:text-lg leading-relaxed text-justify space-y-4 mb-8 font-im-fell text-ink">
        <p>
          <span className="float-left text-6xl font-black leading-[0.75] mr-3 mt-1 font-playfair text-ink">
            C
          </span>
          om imensa alegria, convidamos você para celebrar conosco esse momento tão especial! Uma história de amor construída em Cristo, tornada ainda mais inesquecível pela presença de quem amamos.
        </p>
        <p>
          Para conseguirmos fazer tudo com excelência, confirme sua presença até 02 de junho. A cerimônia e a recepção serão em Lagoa Santa. Horários e endereços exatos serão informados no convite entregue em mãos.
        </p>
        <p>
          Ter você conosco é muito importante para nós!
        </p>
      </div>

      {/* Countdown */}
      <Countdown deadline={deadline} />
    </section>
  );
}
