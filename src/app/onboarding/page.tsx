"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Download, FileText, Lock, ArrowRight } from "lucide-react";
import SignaturePad from "./signature-pad";

/* ─────────────────────────────────────────────────────────────
   Configuración de la página. Es lo único que se toca para
   cambiar el video, el contrato o el destino del formulario.
   ───────────────────────────────────────────────────────────── */

// Video de bienvenida (Loom, igual que la home). Reemplazar por el definitivo.
const VIDEO_EMBED_URL = "https://www.loom.com/embed/76a32d6c14da459f833493e8bd7af9eb";

// El contrato vive en public/. Al reemplazar el archivo se actualiza solo.
const CONTRATO_PDF_URL = "/documents/contrato-ffc.pdf";

// Formulario de onboarding dentro de la app.
const FORM_ONBOARDING_URL = "https://fit-funnels-analytics.vercel.app/onboarding";

const STORAGE_KEY = "ffc_contrato_firmado";

type Firmado = { nombre: string; fecha: string };

export default function OnboardingPage() {
  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [firma, setFirma] = useState<string | null>(null);
  const [acepta, setAcepta] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firmado, setFirmado] = useState<Firmado | null>(null);
  const [pdfFirmado, setPdfFirmado] = useState<string | null>(null);
  const pasoDosRef = useRef<HTMLDivElement>(null);

  // Si ya firmó y recarga la página, el paso 2 sigue desbloqueado.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFirmado(JSON.parse(raw) as Firmado);
    } catch { }
  }, []);

  const completo = nombre.trim().length > 2 && email.includes("@") && documento.trim().length > 3 && !!firma && acepta;

  async function firmar() {
    if (!completo || enviando) return;
    setEnviando(true);
    setError(null);

    try {
      const res = await fetch("/api/contrato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          documento: documento.trim(),
          email: email.trim().toLowerCase(),
          firma,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "No pudimos registrar la firma. Probá de nuevo o escribime por WhatsApp.");
        return;
      }

      const estado: Firmado = { nombre: nombre.trim(), fecha: data.firmadoEn };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
      setFirmado(estado);
      if (data.pdfBase64) setPdfFirmado(data.pdfBase64);

      // Lo llevamos al paso que se acaba de desbloquear.
      setTimeout(() => pasoDosRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 200);
    } catch {
      setError("Se cortó la conexión antes de registrar la firma. Probá de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  function descargarPdf() {
    if (!pdfFirmado) return;
    const bytes = Uint8Array.from(atob(pdfFirmado), (c) => c.charCodeAt(0));
    const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "contrato-ffc-firmado.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="relative overflow-clip min-h-screen">
      {/* ───────── Hero + VSL ───────── */}
      <section className="pt-[60px] md:pt-[90px] pb-[60px] md:pb-[80px] relative px-4">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(227,71,22,0.22),transparent_65%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black_30%,transparent_90%)]"></div>
        </div>

        <div className="max-w-[860px] mx-auto">
          <div className="flex justify-center mb-7 fade-in-down">
            <div className="inline-flex items-center justify-center rounded-full px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <p className="text-white/80 text-[11px] md:text-[12px] tracking-[0.14em] uppercase font-medium text-center">
                Bienvenido a Fit Funnels Consulting
              </p>
            </div>
          </div>

          <h1 className="text-white text-center leading-[1.08] md:leading-[1.05] text-[28px] md:text-[42px] tracking-[-0.025em] font-bold text-balance fade-in-up delay-100">
            Ya estás adentro, empecemos estos 6 meses <span className="text-[#E34716]">de la mejor manera</span>!
          </h1>

          <p className="text-white/55 text-center leading-[1.55] max-w-[620px] mx-auto mt-5 md:mt-6 text-[15px] md:text-[17px] tracking-[-0.005em] fade-in-up delay-200">
            Mirá el video completo: te explico cómo vamos a trabajar estos meses, qué necesito de vos y qué va a pasar en los próximos días. Después firmá el contrato y completá el formulario. Son 10 minutos y quedás listo para empezar.
          </p>

          <div className="mt-9 md:mt-11 max-w-[760px] mx-auto w-full relative fade-in-up delay-300">
            <div className="absolute -inset-6 bg-gradient-to-br from-[#E34716]/30 via-[#E34716]/5 to-transparent rounded-[32px] blur-3xl pointer-events-none"></div>
            <div className="relative bg-[#0a0a0a] rounded-[20px] overflow-hidden border border-[#E34716] shadow-[0_24px_80px_-12px_rgba(227,71,22,0.35)]">
              <p className="py-1.5 text-white text-[12px] tracking-widest text-center">Mirá este video completo *</p>
              <div className="border-4 border-[#0a0a0a] rounded-[20px] overflow-hidden">
                <iframe
                  className="w-full aspect-[1512/950] block"
                  src={VIDEO_EMBED_URL}
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Paso 1 · Contrato ───────── */}
      <section className="px-4 pb-[70px]">
        <div className="max-w-[860px] mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-[#E34716] text-white text-[15px] font-bold">
              {firmado ? <Check className="size-[18px]" /> : "1"}
            </span>
            <h2 className="text-white text-[20px] md:text-[26px] font-bold tracking-[-0.02em]">
              Firmá el contrato
            </h2>
          </div>

          <div className="rounded-[20px] border border-white/[0.09] bg-white/[0.02] p-5 md:p-8">
            {/* Visor del PDF */}
            <div className="rounded-[14px] overflow-hidden border border-white/[0.09] bg-[#0a0a0a] hidden md:block">
              <iframe src={CONTRATO_PDF_URL} className="w-full h-[520px] block" title="Contrato Fit Funnels Consulting" />
            </div>

            <a
              href={CONTRATO_PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="md:hidden flex items-center gap-3 rounded-[14px] border border-white/[0.09] bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-colors"
            >
              <FileText className="size-[22px] text-[#E34716] shrink-0" />
              <span className="text-white text-[15px] font-semibold">Abrir el contrato para leerlo</span>
            </a>

            <div className="hidden md:flex justify-end mt-3">
              <a
                href={CONTRATO_PDF_URL}
                target="_blank"
                rel="noreferrer"
                className="text-white/45 hover:text-white/80 text-[13px] transition-colors"
              >
                Abrir el contrato en una pestaña nueva →
              </a>
            </div>

            {firmado ? (
              /* ── Estado firmado ── */
              <div className="mt-7 rounded-[14px] border border-[#E34716]/40 bg-[#E34716]/[0.08] p-6">
                <div className="flex items-center gap-3">
                  <Check className="size-[20px] text-[#E34716] shrink-0" />
                  <p className="text-white text-[15px] md:text-[16px] font-semibold">
                    Contrato firmado por {firmado.nombre}
                  </p>
                </div>
                <p className="text-white/50 text-[13.5px] mt-2 leading-[1.55]">
                  Quedó registrado el {firmado.fecha}. Te mandamos una copia y ya tenemos la nuestra guardada.
                </p>
                {pdfFirmado && (
                  <button
                    type="button"
                    onClick={descargarPdf}
                    className="mt-4 inline-flex items-center gap-2 text-[#E34716] hover:text-[#ff5a2a] text-[14px] font-semibold transition-colors"
                  >
                    <Download className="size-[16px]" />
                    Descargar tu copia firmada
                  </button>
                )}
              </div>
            ) : (
              /* ── Formulario de firma ── */
              <div className="mt-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-[13px] mb-2">Nombre y apellido</label>
                    <input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Como figura en tu documento"
                      className="w-full rounded-[10px] bg-white/[0.04] border border-white/[0.10] px-4 py-3 text-white text-[15px] placeholder:text-white/25 outline-none focus:border-[#E34716] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-[13px] mb-2">DNI o CUIT</label>
                    <input
                      value={documento}
                      onChange={(e) => setDocumento(e.target.value)}
                      placeholder="Sin puntos ni guiones"
                      className="w-full rounded-[10px] bg-white/[0.04] border border-white/[0.10] px-4 py-3 text-white text-[15px] placeholder:text-white/25 outline-none focus:border-[#E34716] transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white/70 text-[13px] mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="El mismo que vas a usar en la app"
                      className="w-full rounded-[10px] bg-white/[0.04] border border-white/[0.10] px-4 py-3 text-white text-[15px] placeholder:text-white/25 outline-none focus:border-[#E34716] transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-white/70 text-[13px] mb-2">Tu firma</label>
                  <SignaturePad onChange={setFirma} disabled={enviando} />
                </div>

                <label className="flex items-start gap-3 mt-5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={acepta}
                    onChange={(e) => setAcepta(e.target.checked)}
                    className="mt-[3px] size-[17px] shrink-0 accent-[#E34716] cursor-pointer"
                  />
                  <span className="text-white/60 text-[13.5px] leading-[1.55] group-hover:text-white/75 transition-colors">
                    Leí el contrato completo y acepto sus términos. Entiendo que esta firma tiene la misma validez que una firma de puño y letra.
                  </span>
                </label>

                {error && (
                  <p className="mt-4 text-[#ff6b4a] text-[13.5px] leading-[1.5]">{error}</p>
                )}

                <button
                  type="button"
                  onClick={firmar}
                  disabled={!completo || enviando}
                  className="tcf-btn mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="relative">{enviando ? "Registrando tu firma..." : "Firmar el contrato"}</span>
                </button>

                {!completo && !enviando && (
                  <p className="text-white/35 text-[12.5px] mt-3">
                    Completá los tres campos, firmá y aceptá los términos para habilitar el botón.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── Paso 2 · Formulario ───────── */}
      <section className="px-4 pb-[100px]" ref={pasoDosRef}>
        <div className="max-w-[860px] mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className={`grid size-[34px] shrink-0 place-items-center rounded-full text-[15px] font-bold ${firmado ? "bg-[#E34716] text-white" : "bg-white/[0.06] text-white/40"}`}>
              2
            </span>
            <h2 className={`text-[20px] md:text-[26px] font-bold tracking-[-0.02em] ${firmado ? "text-white" : "text-white/40"}`}>
              Completá el formulario de onboarding
            </h2>
          </div>

          <div className={`rounded-[20px] border p-6 md:p-9 text-center transition-colors ${firmado ? "border-[#E34716]/40 bg-white/[0.02]" : "border-white/[0.07] bg-white/[0.01]"}`}>
            {firmado ? (
              <>
                <p className="text-white/65 text-[15px] md:text-[16px] leading-[1.6] max-w-[560px] mx-auto">
                  Es la información con la que armo tu estrategia: tu oferta, tu cliente ideal, tus números actuales y tus casos de éxito. Tomate el tiempo de contestarlo bien — de esto sale todo lo que hacemos después.
                </p>
                <a href={FORM_ONBOARDING_URL} target="_blank" rel="noreferrer" className="tcf-btn mt-7 group">
                  <span className="relative inline-flex items-center gap-2">
                    Ir al formulario <ArrowRight className="size-[17px]" />
                  </span>
                </a>
              </>
            ) : (
              <>
                <Lock className="size-[22px] text-white/25 mx-auto" />
                <p className="text-white/35 text-[15px] leading-[1.6] mt-4 max-w-[460px] mx-auto">
                  Se desbloquea cuando firmes el contrato del paso 1.
                </p>
              </>
            )}
          </div>

          <p className="text-white/30 text-[13px] text-center mt-8 leading-[1.6]">
            ¿Algo no funciona o tenés una duda antes de firmar? Escribime por WhatsApp y lo resolvemos.
          </p>
        </div>
      </section>
    </div>
  );
}
