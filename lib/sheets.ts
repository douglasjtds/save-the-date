const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

export type RSVPMember = {
  name: string;
  attending: boolean;
};

export type RSVPPayload = {
  groupId: string;
  familyName: string;
  confirmed: RSVPMember[];
  confirmedBy: string;
  timestamp: string;
};

/** Check if a group has already confirmed in the spreadsheet */
export async function checkIfConfirmed(groupId: string): Promise<boolean> {
  if (!APPS_SCRIPT_URL) return false;
  try {
    const url = `${APPS_SCRIPT_URL}?action=check&groupId=${encodeURIComponent(groupId)}`;
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    return data.confirmed === true;
  } catch {
    // On network error, assume not confirmed so user can proceed
    return false;
  }
}

/** Submit an RSVP confirmation to the spreadsheet */
export async function submitRSVP(
  payload: RSVPPayload
): Promise<{ success: boolean; error?: string }> {
  if (!APPS_SCRIPT_URL) {
    // No URL configured — simulate success in development
    console.warn('[sheets] NEXT_PUBLIC_APPS_SCRIPT_URL not set. Simulating success.');
    return { success: true };
  }
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      // Apps Script requires text/plain for cross-origin POST — do NOT use application/json
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch {
    return { success: false, error: 'network_error' };
  }
}
