// src/app/api/track/qualified-lead/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const rawBody = await req.text();
  if (!rawBody) {
    return NextResponse.json({ success: false, error: "Body vacío" }, { status: 400 });
  }

  let data: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ success: false, error: "JSON inválido" }, { status: 400 });
    }
    data = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "JSON inválido" }, { status: 400 });
  }

  console.log("Data", data);

  const correo = valueOrUndefined(data.correo);
  const telefono = valueOrUndefined(data.telefono);

  if (!correo || !telefono) {
    return NextResponse.json({ success: false, error: "Faltan email o phone" }, { status: 400 });
  }

  const hashEmail = await hashSHA256(correo);
  const hashPhone = await hashSHA256(telefono);
  const { firstName, lastName } = splitName(pickFirstString(data.nombre, data.name));
  const externalId = pickFirstString(data.external_id, data.externalId);
  const city = pickFirstString(data.city, data.ct);
  const state = pickFirstString(data.state, data.st);
  const zip = pickFirstString(data.zip, data.zp);
  const dob = pickFirstString(data.dob, data.db);

  const userData: Record<string, unknown> = {
    em: [hashEmail],
    ph: [hashPhone],
    fbp: valueOrUndefined(data.fbp),
    fbc: valueOrUndefined(data.fbc),
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

  // Enviamos todos los Leads
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
            event_id: pickFirstString(data.eventId) ?? `lead-${Date.now()}`,
            event_name: 'Lead',
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

  return NextResponse.json({ success: true });
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

function pickFirstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    const parsed = valueOrUndefined(value);
    if (parsed) return parsed;
  }
  return undefined;
}
