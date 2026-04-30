import { NextRequest, NextResponse } from "next/server";

// Proxy server→server hacia el FFA. El cliente solo manda { sessionId, variant, ad, fbc, fbp }
// y este endpoint le suma el clientId/clientName + la API key, que no deben
// quedar expuestas en el bundle.

const FFA_API_KEY = process.env.FFA_API_KEY;
const FFA_CLIENT_NAME = "Fit Funnels";
const FFA_CLIENT_ID = 11;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.sessionId || typeof body.sessionId !== "string") {
      return NextResponse.json({ success: false, error: "sessionId required" }, { status: 400 });
    }

    const payload = {
      clientId: FFA_CLIENT_ID,
      clientName: FFA_CLIENT_NAME,
      sessionId: body.sessionId,
      variant: body.variant ?? null,
      ad: body.ad ?? null,
      fbc: body.fbc ?? null,
      fbp: body.fbp ?? null,
    };

    const response = await fetch("https://fit-funnels-analytics.vercel.app/api/webhook/pageview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": FFA_API_KEY ?? "",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[FFA pageview] Error:", response.status, text);
      return NextResponse.json({ success: false, status: response.status }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[FFA pageview] Error:", e);
    return NextResponse.json({ success: false, error: "bad_request" }, { status: 400 });
  }
}
