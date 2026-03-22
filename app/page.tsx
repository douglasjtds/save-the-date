import fs from 'fs';
import path from 'path';
import { parseGuestList } from '@/lib/guests';

function loadGuests() {
  const filePath = path.join(process.cwd(), 'data', 'guests.md');
  const content = fs.readFileSync(filePath, 'utf-8');
  return parseGuestList(content);
}
import Masthead from '@/components/Masthead';
import Hero from '@/components/Hero';
import LilyDivider from '@/components/LilyDivider';
import EditorialDivider from '@/components/EditorialDivider';
import SearchSection from '@/components/SearchSection';
import Footer from '@/components/Footer';

export default function Home() {
  const guests = loadGuests();
  const deadline = process.env.NEXT_PUBLIC_RSVP_DEADLINE ?? null;

  return (
    <main className="flex flex-col flex-1">
      <Masthead />
      <Hero deadline={deadline} />
      <LilyDivider />
      <EditorialDivider />
      <section id="busca" className="flex-1">
        <SearchSection guests={guests} deadline={deadline} />
      </section>
      <Footer />
    </main>
  );
}
