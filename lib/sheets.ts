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

export type CheckResult = {
  confirmed: boolean;
  members?: RSVPMember[];
};

/** Check if a group has already confirmed in the spreadsheet */
export async function checkIfConfirmed(groupId: string): Promise<CheckResult> {
  if (!APPS_SCRIPT_URL) return { confirmed: false };
  try {
    const url = `${APPS_SCRIPT_URL}?action=check&groupId=${encodeURIComponent(groupId)}`;
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    if (data.confirmed === true) {
      return { confirmed: true, members: data.members };
    }
    return { confirmed: false };
  } catch {
    // On network error, assume not confirmed so user can proceed
    return { confirmed: false };
  }
}

/** Submit an RSVP confirmation via the Next.js proxy route */
export async function submitRSVP(
  payload: RSVPPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (err) {
    console.error('[sheets] submitRSVP failed:', err);
    return { success: false, error: 'network_error' };
  }
}
