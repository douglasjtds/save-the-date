import type { RSVPMember } from '@/lib/sheets';

const PREFIX = 'wedding_rsvp_';

type StoredData = {
  status: 'confirmed';
  members?: RSVPMember[];
};

export function markGroupConfirmed(groupId: string, members?: RSVPMember[]): void {
  try {
    const data: StoredData = { status: 'confirmed', members };
    localStorage.setItem(`${PREFIX}${groupId}`, JSON.stringify(data));
  } catch {
    // localStorage may be blocked in some browsers — fail silently
  }
}

export function isGroupConfirmedLocally(groupId: string): boolean {
  try {
    const raw = localStorage.getItem(`${PREFIX}${groupId}`);
    if (!raw) return false;
    // Support old format ('confirmed' string)
    if (raw === 'confirmed') return true;
    const data = JSON.parse(raw) as StoredData;
    return data.status === 'confirmed';
  } catch {
    return false;
  }
}

export function getLocalMembers(groupId: string): RSVPMember[] | null {
  try {
    const raw = localStorage.getItem(`${PREFIX}${groupId}`);
    if (!raw || raw === 'confirmed') return null;
    const data = JSON.parse(raw) as StoredData;
    return data.members ?? null;
  } catch {
    return null;
  }
}
