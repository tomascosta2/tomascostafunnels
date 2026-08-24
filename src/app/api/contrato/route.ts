import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import crypto from "crypto";

export const runtime = "nodejs";

const FFA_API_KEY = process.env.FFA_API_KEY;
const FFA_ENDPOINT = "https://fit-funnels-analytics.vercel.app/api/webhook/contratos";
const CONTRATO_PATH = "/documents/contrato-ffc.pdf";

// El contrato base no debería pesar más que esto: el PDF firmado viaja en
// base64 hasta la app y un archivo grande revienta el límite del body.
const MAX_PDF_BYTES = 3_000_000;

const NARANJA = rgb(0.886, 0.278, 0.086);
const GRIS = rgb(0.42, 0.42, 0.42);
const NEGRO = rgb(0.07, 0.07, 0.07);

/** Helvetica sólo escribe WinAnsi: sacamos lo que no entre para no romper el PDF. */
function limpiar(texto: string) {
  return texto.replace(/[^\x20-\x7E\xA0-\xFF]/g, "").trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const nombre = limpiar(String(body.nombre || ""));
    const documento = limpiar(String(body.documento || ""));
    const email = limpiar(String(body.email || "")).toLowerCase();
    const firma = String(body.firma || "");

    if (!nombre || !documento || !email || !firma.startsWith("data:image/png;base64,")) {
      return NextResponse.json({ success: false, error: "Faltan datos para registrar la firma." }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Revisá el email: no parece válido." }, { status: 400 });
    }

    // El contrato se lee por HTTP y no del filesystem: en Vercel los archivos
    // de public/ no siempre viajan dentro del bundle de la función.
    const contratoRes = await fetch(new URL(CONTRATO_PATH, request.nextUrl.origin), { cache: "no-store" });
    if (!contratoRes.ok) {
      console.error("[contrato] No se pudo leer el PDF base:", contratoRes.status);
      return NextResponse.json({ success: false, error: "No encontramos el contrato. Avisale a Tomás." }, { status: 500 });
    }

    const contratoBytes = new Uint8Array(await contratoRes.arrayBuffer());
    if (contratoBytes.byteLength > MAX_PDF_BYTES) {
      console.error("[contrato] PDF base demasiado grande:", contratoBytes.byteLength);
      return NextResponse.json({ success: false, error: "El contrato pesa demasiado para firmarse online." }, { status: 500 });
    }

    const contratoHash = crypto.createHash("sha256").update(contratoBytes).digest("hex");
    const firmadoEn = new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "desconocida";
    const userAgent = limpiar(request.headers.get("user-agent") || "desconocido").slice(0, 300);

    // ── Constancia de firma: se agrega como última página ──
    // Página aparte en vez de estampar sobre el contrato: no sabemos el layout
    // del documento que suba Tomás y no queremos taparle texto.
    const pdf = await PDFDocument.load(contratoBytes);
    const helvetica = await pdf.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const firmaPng = await pdf.embedPng(Buffer.from(firma.split(",")[1], "base64"));

    const page = pdf.addPage([595.28, 841.89]); // A4
    const { width, height } = page.getSize();
    const margen = 56;
    let y = height - margen - 10;

    page.drawText("CONSTANCIA DE FIRMA", { x: margen, y, size: 9, font: helveticaBold, color: NARANJA });
    y -= 26;
    page.drawText("Contrato de prestacion de servicios", { x: margen, y, size: 19, font: helveticaBold, color: NEGRO });
    y -= 14;
    page.drawLine({
      start: { x: margen, y },
      end: { x: width - margen, y },
      thickness: 1.2,
      color: NARANJA,
    });

    y -= 38;
    const filas: [string, string][] = [
      ["Firmante", nombre],
      ["Documento", documento],
      ["Email", email],
      ["Fecha y hora", firmadoEn + " (hora de Argentina)"],
      ["Direccion IP", ip],
      ["Dispositivo", userAgent.slice(0, 78)],
      ["Huella del documento", contratoHash.slice(0, 32) + "..."],
    ];

    for (const [etiqueta, valor] of filas) {
      page.drawText(etiqueta.toUpperCase(), { x: margen, y, size: 8, font: helveticaBold, color: GRIS });
      page.drawText(valor, { x: margen + 150, y, size: 10.5, font: helvetica, color: NEGRO });
      y -= 26;
    }

    // ── Firma manuscrita ──
    y -= 26;
    const maxAncho = 230;
    const maxAlto = 85;
    const escala = Math.min(maxAncho / firmaPng.width, maxAlto / firmaPng.height, 1);
    const firmaAncho = firmaPng.width * escala;
    const firmaAlto = firmaPng.height * escala;

    page.drawImage(firmaPng, { x: margen, y: y - firmaAlto + 14, width: firmaAncho, height: firmaAlto });
    y -= firmaAlto;
    page.drawLine({
      start: { x: margen, y: y + 6 },
      end: { x: margen + maxAncho, y: y + 6 },
      thickness: 0.8,
      color: GRIS,
    });
    y -= 12;
    page.drawText(nombre, { x: margen, y, size: 10, font: helveticaBold, color: NEGRO });
    y -= 14;
    page.drawText("Doc. " + documento, { x: margen, y, size: 9, font: helvetica, color: GRIS });

    page.drawText(
      "Firmado electronicamente en tomascostafunnels. La huella identifica la version exacta del contrato aceptado.",
      { x: margen, y: margen, size: 7.5, font: helvetica, color: GRIS }
    );

    const pdfFirmado = await pdf.save();
    const pdfBase64 = Buffer.from(pdfFirmado).toString("base64");

    // ── Registro en la app ──
    const ffaRes = await fetch(FFA_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": FFA_API_KEY ?? "" },
      body: JSON.stringify({
        nombre, documento, email,
        firmadoEn, ip, userAgent, contratoHash,
        fileName: "contrato-ffc-" + email.replace(/[^a-z0-9]/g, "-") + ".pdf",
        pdfBase64,
      }),
    });

    if (!ffaRes.ok) {
      const detalle = await ffaRes.text();
      console.error("[contrato] FFA rechazó el registro:", ffaRes.status, detalle);
      return NextResponse.json(
        { success: false, error: "No pudimos guardar el contrato firmado. Probá de nuevo en un minuto." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, firmadoEn, pdfBase64 });
  } catch (e) {
    console.error("[contrato] Error:", e);
    return NextResponse.json({ success: false, error: "Algo falló al firmar. Probá de nuevo." }, { status: 500 });
  }
}
