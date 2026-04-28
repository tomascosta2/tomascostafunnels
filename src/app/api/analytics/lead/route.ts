import { NextRequest, NextResponse } from "next/server";

const FFA_API_KEY = process.env.FFA_API_KEY;
const FFA_CLIENT_NAME = "Fit Funnels";
const FFA_CLIENT_ID = 11;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const payload = {
      clientName: FFA_CLIENT_NAME,
      clientId: FFA_CLIENT_ID,
      lead: {
        nombre: body.nombre,
        correo: body.correo,
        telefono: body.telefono,
        ...(body.ad !== undefined && { campana: body.ad }),
        ...(body.variant !== undefined && { splitTest: body.variant }),
        ...(body.rol !== undefined && { ocupacion: body.rol }),
        ...(body.facturacion !== undefined && { presupuesto: body.facturacion }),
        ...(body.casosExito !== undefined && { casosExito: body.casosExito }),
        ...(body.isQualified !== undefined && { calificado: body.isQualified ? "Si" : "No" }),
        ...(body.fbc != null && { fbc: body.fbc }),
        ...(body.fbp != null && { fbp: body.fbp }),
      },
    };

    console.log("[FFA] Enviando payload:", JSON.stringify(payload, null, 2));

    const response = await fetch("https://fit-funnels-analytics.vercel.app/api/webhook/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": FFA_API_KEY ?? "",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log("[FFA] Respuesta:", response.status, text);

    if (!response.ok) {
      console.error("[FFA] Error al enviar lead:", response.status, text);
      return NextResponse.json({ success: false, status: response.status, body: text }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[FFA] Error:", e);
    return NextResponse.json({ success: false, error: "bad_request" }, { status: 400 });
  }
}
