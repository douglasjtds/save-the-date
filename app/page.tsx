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

            {/* Mobile photo 1 */}
            <figure className="block lg:hidden photo-editorial -rotate-1 max-w-[280px] mx-auto mt-8 mb-4">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/IMG_2711.JPG"
                  alt="Iara e Douglas"
                  fill
                  className="object-cover mix-blend-multiply"
                  sizes="280px"
                />
              </div>
              <figcaption className="text-center text-sm italic mt-3 mb-1 font-im-fell text-ink-muted">
                Retrato dos Noivos, 2024
              </figcaption>
            </figure>

            <Hero deadline={deadline} />
            <LilyDivider />

            <section id="busca" className="w-full flex-1">
              <SearchSection guests={guests} deadline={deadline} />
            </section>

            {/* Mobile photo 2 */}
            <figure className="block lg:hidden photo-editorial rotate-[2deg] max-w-[280px] mx-auto mt-8 mb-4">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/IMG_2722.JPG"
                  alt="Igreja Matriz N. Sra. da Saúde"
                  fill
                  className="object-cover mix-blend-multiply"
                  sizes="280px"
                />
              </div>
              <figcaption className="text-center text-sm italic mt-3 mb-1 font-im-fell text-ink-muted">
                Igreja Matriz N. Sra. da Saúde
              </figcaption>
            </figure>
          </article>

          {/* ── Left photo column (desktop only) ── */}
          <aside className="hidden lg:flex col-span-1 order-2 lg:order-1 flex-col items-center">
            <figure className="w-full photo-editorial rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/IMG_2711.JPG"
                  alt="Iara e Douglas"
                  fill
                  className="object-cover mix-blend-multiply"
                  sizes="(min-width: 1024px) 25vw, 0px"
                />
              </div>
              <figcaption className="text-center text-sm italic mt-3 mb-1 font-im-fell text-ink-muted">
                Retrato dos Noivos, 2024
              </figcaption>
            </figure>
          </aside>

          {/* ── Right photo column (desktop only) ── */}
          <aside className="hidden lg:flex col-span-1 order-3 lg:order-3 flex-col items-center lg:mt-32">
            <figure className="w-full photo-editorial rotate-[2deg] hover:rotate-0 transition-transform duration-500">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/IMG_2722.JPG"
                  alt="Igreja Matriz N. Sra. da Saúde"
                  fill
                  className="object-cover mix-blend-multiply"
                  sizes="(min-width: 1024px) 25vw, 0px"
                />
              </div>
              <figcaption className="text-center text-sm italic mt-3 mb-1 font-im-fell text-ink-muted">
                Igreja Matriz N. Sra. da Saúde
              </figcaption>
            </figure>
          </aside>

        </div>
      </div>
      <Footer />
    </main>
  );
}
