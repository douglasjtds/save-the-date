const PREFIX = 'wedding_rsvp_';

export function markGroupConfirmed(groupId: string): void {
  try {
    localStorage.setItem(`${PREFIX}${groupId}`, 'confirmed');
  } catch {
    // localStorage may be blocked in some browsers — fail silently
  }
}

export function isGroupConfirmedLocally(groupId: string): boolean {
  try {
    return localStorage.getItem(`${PREFIX}${groupId}`) === 'confirmed';
  } catch {
    return false;
  }
}
