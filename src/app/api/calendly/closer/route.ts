import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { eventUri } = await req.json();

  if (!eventUri || typeof eventUri !== 'string') {
    console.error('[Calendly closer] eventUri inválido:', eventUri);
    return NextResponse.json({ closer: null, error: 'invalid eventUri' }, { status: 400 });
  }

  const token = process.env.CALENDLY_TOKEN || process.env.CALENDLY_API_KEY;
  if (!token) {
    console.error('[Calendly closer] CALENDLY_TOKEN/CALENDLY_API_KEY no definido en env');
    return NextResponse.json({ closer: null, error: 'CALENDLY token missing' }, { status: 500 });
  }

  const uuid = eventUri.split('/').pop();

  let response: Response;
  try {
    response = await fetch(`https://api.calendly.com/scheduled_events/${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('[Calendly closer] fetch a Calendly API falló:', err);
    return NextResponse.json({ closer: null, error: 'network' }, { status: 502 });
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error('[Calendly closer] Calendly API respondió error:', response.status, text);
    return NextResponse.json(
      { closer: null, error: `calendly ${response.status}` },
      { status: 502 }
    );
  }

  const data = await response.json();
  const membership = data?.resource?.event_memberships?.[0];
  const startTime = data?.resource?.start_time ?? null;

  console.log('[Calendly closer] OK — startTime:', startTime);

  return NextResponse.json({
    closer: membership?.user_name ?? null,
    closerEmail: membership?.user_email ?? null,
    startTime,
  });
}
