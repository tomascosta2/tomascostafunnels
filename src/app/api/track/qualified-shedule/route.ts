// src/app/api/track/qualified-shedule/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();

  console.log("Data", data)

  if (!data.email || !data.phone) {
    return NextResponse.json({ success: false, error: "Faltan email o phone" }, { status: 400 });
  }

  const hashEmail = await hashSHA256(data.email);
  const hashPhone = await hashSHA256(data.phone);
  const { firstName, lastName } = splitName(data.name ?? data.nombre);
  const externalId = valueOrUndefined(data.external_id ?? data.externalId);
  const city = valueOrUndefined(data.city ?? data.ct);
  const state = valueOrUndefined(data.state ?? data.st);
  const zip = valueOrUndefined(data.zip ?? data.zp);
  const dob = valueOrUndefined(data.dob ?? data.db);

  const userData: Record<string, unknown> = {
    em: [hashEmail],
    ph: [hashPhone],
    fbp: data.fbp,
    fbc: data.fbc,
    client_user_agent: req.headers.get('user-agent'),
    client_ip_address: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
  };

  if (externalId) userData.external_id = externalId;
  if (firstName) userData.fn = [await hashSHA256(firstName)];
  if (lastName) userData.ln = [await hashSHA256(lastName)];
  if (city) userData.ct = [await hashSHA256(city)];
  if (state) userData.st = [await hashSHA256(state)];
  if (zip) userData.zp = [await hashSHA256(zip)];
  if (dob) userData.db = [await hashSHA256(normalizeDob(dob))];

  const response = await fetch(
    `https://graph.facebook.com/v18.0/1143124444651311/events?access_token=${process.env.API_ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [
          {
            event_id: data.eventId ?? `schedule-${Date.now()}`,
            event_name: 'Schedule',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            user_data: userData,
          },
        ],
        test_event_code: 'TEST35778'
      }),
    }
  );

  const result = await response.json();
  console.log("RESPONSE FROM META:", result);

  return NextResponse.json({ success: true, result });
}

async function hashSHA256(value: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function splitName(rawName: string | undefined) {
  const clean = valueOrUndefined(rawName);
  if (!clean) return { firstName: undefined, lastName: undefined };

  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: undefined, lastName: undefined };
  if (parts.length === 1) return { firstName: parts[0], lastName: undefined };

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' ')
  };
}

function normalizeDob(rawDob: string) {
  const digits = rawDob.replace(/\D/g, '');
  if (digits.length === 8) return digits;
  return rawDob.trim();
}

function valueOrUndefined(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
