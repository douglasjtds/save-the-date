import Countdown from './Countdown';

export default function Hero({ deadline }: { deadline: string | null }) {
  return (
    <section className="w-full py-6">
      <div className="text-center mb-6">
        {/* Badge — inverted ink */}
        <span
          className="inline-block px-3 py-1 text-xs uppercase font-bold tracking-widest mb-6 rounded-[2px]"
          style={{
            fontFamily: 'var(--font-playfair), serif',
            backgroundColor: 'var(--color-ink)',
            color: 'var(--color-paper)',
          }}
        >
          Save The Date
        </span>

        {/* Headline */}
        <h2
          className="text-3xl sm:text-4xl font-bold leading-tight"
          style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink)' }}
        >
          Iara &amp; Douglas anunciam a data da cerim&#244;nia
        </h2>
      </div>

      {/* Editorial text with drop cap */}
      <div
        className="text-base sm:text-lg leading-relaxed text-justify space-y-4 mb-8"
        style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink)' }}
      >
        <p>
          <span
            className="float-left text-6xl font-black leading-[0.75] mr-3 mt-1"
            style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink)' }}
          >
            &#201;
          </span>
          com imensa alegria que convidamos voc&#234; para testemunhar e celebrar este novo cap&#237;tulo de nossas vidas. Ap&#243;s anos de hist&#243;rias compartilhadas, risadas e cumplicidade, decidimos oficializar nossa uni&#227;o cercados pelas pessoas que tornam nossa jornada aut&#234;ntica e inesquec&#237;vel.
        </p>
        <p>
          A cerim&#244;nia e a recep&#231;&#227;o ocorrer&#227;o no mesmo local, pensadas com esmero para proporcionar uma tarde memor&#225;vel. Haver&#225; boa m&#250;sica, comida afetiva e mem&#243;rias que guardaremos para a posteridade.
        </p>
      </div>

      {/* Countdown */}
      <Countdown deadline={deadline} />
    </section>
  );
}
