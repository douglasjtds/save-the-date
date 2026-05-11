'use client';

import { useEffect, useRef, useState } from 'react';
import type { GuestGroup, SearchResult } from '@/lib/guests';
import { searchGuests } from '@/lib/guests';
import { checkIfConfirmed, submitRSVP } from '@/lib/sheets';
import type { RSVPMember } from '@/lib/sheets';
import { isGroupConfirmedLocally, markGroupConfirmed, getLocalMembers } from '@/lib/storage';
import FamilyCard from './FamilyCard';
import DisambiguationList from './DisambiguationList';
import StateSuccess from './StateSuccess';
import StateAlreadyConfirmed from './StateAlreadyConfirmed';
import StateNotFound from './StateNotFound';
import StateNetworkError from './StateNetworkError';
import StateDeadlinePassed from './StateDeadlinePassed';

type AppState =
  | 'idle'
  | 'disambiguating'
  | 'found'
  | 'checking'
  | 'already_confirmed'
  | 'editing'
  | 'submitting'
  | 'success'
  | 'not_found'
  | 'network_error'
  | 'deadline_passed';

type Member = { name: string; attending: boolean };

interface SearchSectionProps {
  guests: GuestGroup[];
  deadline: string | null;
}

/** Merge canonical members from guests.md with previously saved attendance */
function mergeMembers(canonicalNames: string[], previous: RSVPMember[] | null): Member[] {
  return canonicalNames.map((name) => {
    const prev = previous?.find((m) => m.name === name);
    return { name, attending: prev?.attending ?? false };
  });
}

export default function SearchSection({
  guests,
  deadline,
}: SearchSectionProps) {
  const [appState, setAppState] = useState<AppState>('idle');
  const [query, setQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<GuestGroup | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [matches, setMatches] = useState<SearchResult[]>([]);
  const [searchedQuery, setSearchedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Check deadline on mount
  useEffect(() => {
    if (deadline && new Date() > new Date(deadline)) {
      setAppState('deadline_passed');
    }
  }, [deadline]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    const results = searchGuests(query.trim(), guests);

    if (results.length === 0) {
      setSelectedGroup(null);
      setAppState('not_found');
      return;
    }

    if (results.length > 1) {
      setMatches(results);
      setSearchedQuery(query.trim());
      setAppState('disambiguating');
      return;
    }

    await selectGroup(results[0].group);
  }

  async function selectGroup(group: GuestGroup) {
    setSelectedGroup(group);

    // Check localStorage first (fast path)
    if (isGroupConfirmedLocally(group.id)) {
      const localMembers = getLocalMembers(group.id);
      setMembers(mergeMembers(group.members, localMembers));
      setIsUpdate(true);
      setAppState('already_confirmed');
      return;
    }

    // Check spreadsheet
    setAppState('checking');
    const result = await checkIfConfirmed(group.id);
    if (result.confirmed) {
      const previousMembers = result.members ?? null;
      markGroupConfirmed(group.id, previousMembers ?? undefined);
      setMembers(mergeMembers(group.members, previousMembers));
      setIsUpdate(true);
      setAppState('already_confirmed');
      return;
    }

    // Show family card with all members unchecked by default
    setMembers(group.members.map((name) => ({ name, attending: false })));
    setAppState('found');
  }

  async function handleSelectMatch(result: SearchResult) {
    await selectGroup(result.group);
  }

  function handleEdit() {
    setAppState('editing');
  }

  function handleToggle(name: string) {
    setMembers((prev) =>
      prev.map((m) => (m.name === name ? { ...m, attending: !m.attending } : m))
    );
  }

  async function handleConfirm() {
    if (!selectedGroup) return;
    setAppState('submitting');

    // The person who confirmed is the first attending member, or the first member
    const confirmedBy =
      members.find((m) => m.attending)?.name ?? members[0]?.name ?? selectedGroup.familyName;

    const result = await submitRSVP({
      groupId: selectedGroup.id,
      familyName: selectedGroup.familyName,
      confirmed: members,
      confirmedBy,
      timestamp: new Date().toISOString(),
    });

    if (result.success || result.error === 'already_confirmed') {
      markGroupConfirmed(selectedGroup.id, members);
      if (result.error === 'already_confirmed') {
        // Transition period: old Apps Script rejects duplicates — treat as success
        setAppState('success');
      } else {
        setAppState('success');
      }
    } else {
      setAppState('network_error');
    }
  }

  function handleRetry() {
    setAppState('submitting');
    handleConfirm();
  }

  function handleReset() {
    setQuery('');
    setSelectedGroup(null);
    setMembers([]);
    setIsUpdate(false);
    setMatches([]);
    setSearchedQuery('');
    setAppState('idle');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  if (appState === 'deadline_passed') {
    return (
      <div className="w-full py-12">
        <StateDeadlinePassed />
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      {/* RSVP card wrapper */}
      <div
        className="relative p-6 sm:p-8 bg-paper-dark border border-border"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        {/* Inner decorative border */}
        <div className="absolute top-2 left-2 right-2 bottom-2 border border-border pointer-events-none" />

        {/* Search form — always visible unless in a terminal state */}
        {(appState === 'idle' || appState === 'not_found') && (
          <div className="relative z-10 mb-0">
            <h2 className="text-xl md:text-2xl font-bold mb-1 text-center font-playfair text-ink">
              Confirme sua presença
            </h2>
            <p className="text-sm italic text-center mb-5 font-im-fell text-ink-muted">
              Digite o seu nome ou o nome da sua família
            </p>
            <form onSubmit={handleSearch} className="flex flex-col gap-5">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ex: Família Silva ou João Silva"
                autoComplete="off"
                className="input-editorial"
              />
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={!query.trim()}
              >
                Buscar Registro
              </button>
            </form>
          </div>
        )}

        {/* Checking state */}
        {appState === 'checking' && (
          <div className="relative z-10 state-enter text-center py-12">
            <span className="spinner" style={{ borderTopColor: 'var(--color-terracota)', borderColor: 'var(--color-border)' }} aria-hidden="true" />
            <p className="text-sm italic mt-4 font-im-fell text-ink-muted">
              Verificando confirmações…
            </p>
          </div>
        )}

        {/* Disambiguation list */}
        {appState === 'disambiguating' && (
          <div className="relative z-10">
            <DisambiguationList
              query={searchedQuery}
              matches={matches}
              onSelect={handleSelectMatch}
            />
          </div>
        )}

        {/* Family card */}
        {(appState === 'found' || appState === 'editing' || appState === 'submitting') && selectedGroup && (
          <div className="relative z-10">
            <FamilyCard
              familyName={selectedGroup.familyName}
              members={members}
              onToggle={handleToggle}
              onConfirm={handleConfirm}
              isSubmitting={appState === 'submitting'}
              isUpdate={isUpdate}
            />
          </div>
        )}

        {/* Success */}
        {appState === 'success' && selectedGroup && (
          <div className="relative z-10">
            <StateSuccess familyName={selectedGroup.familyName} isUpdate={isUpdate} />
          </div>
        )}

        {/* Already confirmed */}
        {appState === 'already_confirmed' && selectedGroup && (
          <div className="relative z-10">
            <StateAlreadyConfirmed
              familyName={selectedGroup.familyName}
              members={members}
              onEdit={handleEdit}
            />
          </div>
        )}

        {/* Not found */}
        {appState === 'not_found' && (
          <div className="relative z-10">
            <StateNotFound />
          </div>
        )}

        {/* Network error */}
        {appState === 'network_error' && (
          <div className="relative z-10">
            <StateNetworkError onRetry={handleRetry} />
          </div>
        )}

        {/* Reset link for non-idle states (except deadline_passed) */}
        {['disambiguating', 'found', 'editing', 'submitting', 'success', 'already_confirmed', 'network_error'].includes(appState) && (
          <div className="relative z-10 text-center mt-6">
            <button
              onClick={handleReset}
              className="text-sm italic underline underline-offset-2 font-im-fell text-ink-muted bg-transparent border-none cursor-pointer"
            >
              Buscar outro nome
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
