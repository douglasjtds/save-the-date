import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { parseGuestList } from '@/lib/guests';

function loadGuests() {
  const filePath = path.join(process.cwd(), 'data', 'guests.md');
  const content = fs.readFileSync(filePath, 'utf-8');
  return parseGuestList(content);
}

import Masthead from '@/components/Masthead';
import Hero from '@/components/Hero';
import LilyDivider from '@/components/LilyDivider';
import SearchSection from '@/components/SearchSection';
import Footer from '@/components/Footer';

export default function Home() {
  const guests = loadGuests();
  const deadline = process.env.NEXT_PUBLIC_RSVP_DEADLINE ?? null;

  return (
    <main className="flex flex-col flex-1">
      <div className="max-w-(--max-width-site) mx-auto px-4 sm:px-8 py-8 sm:py-12 grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">

          {/* ── Center column ── */}
          <article className="col-span-1 lg:col-span-2 order-1 lg:order-2 flex flex-col items-center max-w-(--max-width-content) mx-auto w-full">
            <Masthead />

            {/* Mobile: spread de jornal — foto + manchete em duas colunas */}
            <div className="lg:hidden grid grid-cols-[2fr_3fr] gap-3 items-start mt-4 mb-2 w-full">
              <figure className="photo-editorial -rotate-1">
                <div className="relative aspect-3/4 w-full">
                  <Image
                    src="/images/IMG_2711.JPG"
                    alt="Iara e Douglas"
                    fill
                    className="object-cover mix-blend-multiply"
                    sizes="38vw"
                  />
                </div>
                <figcaption className="text-center text-[10px] italic mt-1.5 mb-0 font-im-fell text-ink-muted">
                  Nossa Essência
                </figcaption>
              </figure>

              <div className="flex flex-col items-center pt-1 gap-2">
                <Image
                  src="/logo_i-d.png"
                  alt="Iara & Douglas"
                  width={80}
                  height={80}
                  className="w-16 h-auto"
                />
                <h2 className="text-base font-bold leading-snug font-playfair text-ink text-center">
                  Iara & Douglas anunciam a data da cerimônia
                </h2>
                <div className="w-full border-t border-b border-border py-1 mt-1">
                  <p className="text-[9px] uppercase tracking-widest font-playfair text-ink-muted text-center leading-relaxed">
                    21 de Novembro de 2026
                  </p>
                  <p className="text-[9px] uppercase tracking-widest font-playfair text-ink-muted text-center leading-relaxed">
                    Lagoa Santa, MG
                  </p>
                </div>
              </div>
            </div>

            <Hero deadline={deadline} />
            <LilyDivider />

            <section id="busca" className="w-full flex-1">
              <SearchSection guests={guests} deadline={deadline} />
            </section>

            {/* Mobile: foto 2 full-width após o RSVP */}
            <figure className="lg:hidden photo-editorial rotate-1 w-full mt-8 mb-4">
              <div className="relative w-full aspect-3/4">
                <Image
                  src="/images/IMG_2722.JPG"
                  alt="Conexão real"
                  fill
                  className="object-cover mix-blend-multiply"
                  sizes="100vw"
                />
              </div>
              <figcaption className="text-center text-xs italic mt-2 mb-0 font-im-fell text-ink-muted">
                Conexão real
              </figcaption>
            </figure>
          </article>

          {/* ── Left photo column (desktop only) ── */}
          <aside className="hidden lg:flex col-span-1 order-2 lg:order-1 flex-col items-center">
            <figure className="w-full photo-editorial -rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="relative aspect-3/4 w-full">
                <Image
                  src="/images/IMG_2711.JPG"
                  alt="Iara e Douglas"
                  fill
                  className="object-cover mix-blend-multiply"
                  sizes="(min-width: 1024px) 25vw, 0px"
                />
              </div>
              <figcaption className="text-center text-lg italic mt-3 mb-1 font-im-fell text-ink-muted">
                Nossa Essência
              </figcaption>
            </figure>
          </aside>

          {/* ── Right photo column (desktop only) ── */}
          <aside className="hidden lg:flex col-span-1 order-3 lg:order-3 flex-col items-center lg:mt-32">
            <figure className="w-full photo-editorial rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="relative aspect-3/4 w-full">
                <Image
                  src="/images/IMG_2722.JPG"
                  alt="Conexão real"
                  fill
                  className="object-cover mix-blend-multiply"
                  sizes="(min-width: 1024px) 25vw, 0px"
                />
              </div>
              <figcaption className="text-center text-lg italic bold mt-3 mb-1 font-im-fell text-ink-muted">
                Conexão real
              </figcaption>
            </figure>
          </aside>

        </div>
      </div>
      <Footer />
    </main>
  );
}
