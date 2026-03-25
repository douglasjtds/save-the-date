import type { RSVPPayload } from '@/lib/sheets';

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

export async function POST(request: Request) {
  if (!APPS_SCRIPT_URL) {
    console.warn('[rsvp] APPS_SCRIPT_URL not set — simulating success');
    return Response.json({ success: true });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ success: false, error: 'invalid_body' }, { status: 400 });
  }

  if (!isValidPayload(payload)) {
    return Response.json({ success: false, error: 'invalid_payload' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      // GAS may return non-JSON after redirect — if status is OK, assume success
      return Response.json(res.ok ? { success: true } : { success: false, error: 'gas_parse_error' });
    }

    return Response.json(data);
  } catch (err) {
    console.error('[rsvp] GAS request failed:', err);
    return Response.json({ success: false, error: 'network_error' }, { status: 502 });
  }
}

function isValidPayload(p: unknown): p is RSVPPayload {
  if (!p || typeof p !== 'object') return false;
  const obj = p as Record<string, unknown>;
  return (
    typeof obj.groupId === 'string' &&
    typeof obj.familyName === 'string' &&
    Array.isArray(obj.confirmed) &&
    typeof obj.confirmedBy === 'string' &&
    typeof obj.timestamp === 'string'
  );
}
