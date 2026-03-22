'use client';

import { useEffect, useRef, useState } from 'react';
import type { GuestGroup } from '@/lib/guests';
import { searchGuests } from '@/lib/guests';
import { checkIfConfirmed, submitRSVP } from '@/lib/sheets';
import { isGroupConfirmedLocally, markGroupConfirmed } from '@/lib/storage';
import FamilyCard from './FamilyCard';
import StateSuccess from './StateSuccess';
import StateAlreadyConfirmed from './StateAlreadyConfirmed';
import StateNotFound from './StateNotFound';
import StateNetworkError from './StateNetworkError';
import StateDeadlinePassed from './StateDeadlinePassed';

type AppState =
  | 'idle'
  | 'found'
  | 'checking'
  | 'already_confirmed'
  | 'submitting'
  | 'success'
  | 'not_found'
  | 'network_error'
  | 'deadline_passed';

type Member = { name: string; attending: boolean };

export default function SearchSection({
  guests,
  deadline,
}: {
  guests: GuestGroup[];
  deadline: string | null;
}) {
  const [appState, setAppState] = useState<AppState>('idle');
  const [query, setQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<GuestGroup | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
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

    // Use first result
    const group = results[0];
    setSelectedGroup(group);

    // Check localStorage first (fast path)
    if (isGroupConfirmedLocally(group.id)) {
      setAppState('already_confirmed');
      return;
    }

    // Check spreadsheet
    setAppState('checking');
    const confirmed = await checkIfConfirmed(group.id);
    if (confirmed) {
      markGroupConfirmed(group.id);
      setAppState('already_confirmed');
      return;
    }

    // Show family card with all members checked by default
    setMembers(group.members.map((name) => ({ name, attending: true })));
    setAppState('found');
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
      markGroupConfirmed(selectedGroup.id);
      setAppState(result.error === 'already_confirmed' ? 'already_confirmed' : 'success');
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
    setAppState('idle');
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  if (appState === 'deadline_passed') {
    return (
      <div className="w-full px-6 py-12">
        <div className="mx-auto" style={{ maxWidth: 'var(--max-width-content)' }}>
          <StateDeadlinePassed />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-12">
      <div className="mx-auto" style={{ maxWidth: '560px' }}>

        {/* Search form — always visible unless in a terminal state */}
        {(appState === 'idle' || appState === 'not_found') && (
          <div className="mb-8">
            <h2
              className="text-xl md:text-2xl font-bold mb-1 text-center"
              style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--color-ink)' }}
            >
              Confirme sua presença
            </h2>
            <p
              className="text-sm italic text-center mb-5"
              style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink-muted)' }}
            >
              Digite seu nome ou o nome da sua família
            </p>
            <form onSubmit={handleSearch} className="flex gap-0">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ex: Família Silva ou João Silva"
                autoComplete="off"
                style={{ borderRight: 'none' }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ borderRadius: 'var(--radius-none)', flexShrink: 0 }}
                disabled={!query.trim()}
              >
                Buscar
              </button>
            </form>
          </div>
        )}

        {/* Checking state */}
        {appState === 'checking' && (
          <div className="state-enter text-center py-12">
            <span className="spinner" style={{ borderTopColor: 'var(--color-terracota)', borderColor: 'var(--color-border)' }} aria-hidden="true" />
            <p
              className="text-sm italic mt-4"
              style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink-muted)' }}
            >
              Verificando confirmações…
            </p>
          </div>
        )}

        {/* Family card */}
        {(appState === 'found' || appState === 'submitting') && selectedGroup && (
          <FamilyCard
            familyName={selectedGroup.familyName}
            members={members}
            onToggle={handleToggle}
            onConfirm={handleConfirm}
            isSubmitting={appState === 'submitting'}
          />
        )}

        {/* Success */}
        {appState === 'success' && selectedGroup && (
          <StateSuccess familyName={selectedGroup.familyName} />
        )}

        {/* Already confirmed */}
        {appState === 'already_confirmed' && selectedGroup && (
          <StateAlreadyConfirmed familyName={selectedGroup.familyName} />
        )}

        {/* Not found */}
        {appState === 'not_found' && <StateNotFound />}

        {/* Network error */}
        {appState === 'network_error' && <StateNetworkError onRetry={handleRetry} />}

        {/* Reset link for non-idle states (except deadline_passed) */}
        {['found', 'submitting', 'success', 'already_confirmed', 'network_error'].includes(appState) && (
          <div className="text-center mt-6">
            <button
              onClick={handleReset}
              className="text-sm italic underline underline-offset-2"
              style={{ fontFamily: 'var(--font-im-fell), serif', color: 'var(--color-ink-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Buscar outro nome
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
