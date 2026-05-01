import type { SearchResult } from '@/lib/guests';

interface DisambiguationListProps {
  query: string;
  matches: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

function buildSubtitle(familyName: string, members: string[], matchedMember: string | null): string {
  const prominent = matchedMember ?? familyName;
  const others = members.filter((m) => m !== matchedMember);
  const pieces: string[] = [];

  if (familyName !== prominent) {
    pieces.push(familyName);
  }
  if (others.length > 0) {
    pieces.push(`com ${others.join(', ')}`);
  }

  return pieces.join(' — ');
}

export default function DisambiguationList({ query, matches, onSelect }: DisambiguationListProps) {
  return (
    <div className="state-enter">
      <h3 className="text-xl md:text-2xl font-bold mb-1 text-center font-playfair text-ink">
        Encontramos mais de uma opção
      </h3>
      <p className="text-sm italic text-center mb-5 font-im-fell text-ink-muted">
        Selecione qual é você para “{query}”
      </p>
      <ul className="flex flex-col gap-3">
        {matches.map((result) => {
          const { group, matchedMember } = result;
          const prominent = matchedMember ?? group.familyName;
          const subtitle = buildSubtitle(group.familyName, group.members, matchedMember);
          return (
            <li key={group.id}>
              <button
                type="button"
                onClick={() => onSelect(result)}
                className="w-full text-left p-4 bg-paper border border-border hover:border-terracota transition-colors cursor-pointer"
              >
                <div className="font-playfair font-bold text-ink">{prominent}</div>
                {subtitle && (
                  <div className="font-im-fell italic text-sm text-ink-muted mt-1">
                    {subtitle}
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
