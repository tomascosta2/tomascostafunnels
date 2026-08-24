"use client";

import { useEffect, useState } from "react";
import { Check, Instagram, Layers, Megaphone, MessageCircle, Workflow } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Opt-in de las 3 clases gratuitas.
   El lead entra acá, deja WhatsApp e Instagram, y se va a
   /opt-in/gracias con las clases. La pregunta calificadora no
   bloquea: todos reciben las clases, pero el que no factura
   1-5k queda marcado como no calificado en FFA.
   ───────────────────────────────────────────────────────────── */

const CLASES = [
  {
    n: "01",
    Icono: Layers,
    titulo: "Los pilares de un negocio fitness sostenible",
    bajada: "Por qué la mayoría de los coaches se estanca en 1-5k, y qué tiene que estar en su lugar antes de meterle un peso a anuncios.",
  },
  {
    n: "02",
    Icono: Megaphone,
    titulo: "Anuncios que traen la gente correcta",
    bajada: "Cómo guionar y configurar campañas que atraen clientes que pueden pagarte, en vez de llenarte el perfil de curiosos.",
  },
  {
    n: "03",
    Icono: Workflow,
    titulo: "Los procesos que sostienen las ventas",
    bajada: "Lo que pasa entre que alguien te escribe y te paga: setting, llamadas y seguimiento. Sin esto, escalar solo multiplica el caos.",
  },
];

type Facturacion = "" | "1-5k" | "todavia-no" | "mas-de-5k" | "sin-coaching";

// Solo la primera califica; las otras igual reciben las clases, pero entran
// a FFA marcadas como no calificadas y con el motivo.
const OPCIONES_FACTURACION: { value: Exclude<Facturacion, "">; label: string }[] = [
  { value: "1-5k", label: "Sí, tengo un coaching que factura entre 1 y 5k por mes" },
  { value: "todavia-no", label: "No, todavía no llego ahí" },
  { value: "mas-de-5k", label: "No, facturo mucho más que eso por mes" },
  { value: "sin-coaching", label: "No, no tengo un Coaching Fitness" },
];

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const v = `; ${document.cookie}`;
  const parts = v.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? "";
  return "";
}

export default function OptInPage() {
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [factura, setFactura] = useState<Facturacion>("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }
  }, []);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const tel = whatsapp.replace(/[^\d+]/g, "");
    if (tel.replace(/\D/g, "").length < 8) {
      setError("Dejame tu WhatsApp con el código de país.");
      return;
    }
    if (!instagram.trim()) {
      setError("Necesito tu usuario de Instagram para ver tu perfil antes de escribirte.");
      return;
    }
    if (!factura) {
      setError("Respondé la última pregunta y te mando las clases.");
      return;
    }

    setEnviando(true);
    try {
      const usuario = instagram.trim().replace(/^@+/, "");
      const calificado = factura === "1-5k";

      const fbp = getCookie("_fbp") || null;
      const fbc = getCookie("_fbc") || null;

      const payload = {
        // Sin nombre en el form: el usuario de IG es lo que identifica al lead.
        nombre: `@${usuario}`,
        telefono: tel,
        instagram: `@${usuario}`,
        ad: "opt-in-3-clases",
        isQualified: calificado,
        presupuesto: factura,
        ...(fbp && { fbp }),
        ...(fbc && { fbc }),
      };

      const esProd = window.location.hostname.includes(".com");
      const webhookUrl = esProd
        ? "https://n8n.srv953925.hstgr.cloud/webhook/1c8b3e88-b35f-4952-8c02-b9f2a0aefc78"
        : "https://n8n.srv953925.hstgr.cloud/webhook-test/1c8b3e88-b35f-4952-8c02-b9f2a0aefc78";

      await Promise.allSettled([
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, origen: "opt-in" }),
          keepalive: true,
        }),
        fetch("/api/analytics/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }),
      ]);

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }

      try {
        localStorage.setItem("ff_optin_ig", `@${usuario}`);
      } catch {}

      window.location.href = "/opt-in/gracias";
    } catch (err) {
      console.error(err);
      setError("Algo falló al enviar. Probá de nuevo.");
      setEnviando(false);
    }
  }

  return (
    <div className="relative overflow-clip min-h-screen">
      <section className="pt-[60px] md:pt-[90px] pb-[80px] relative px-4">
        {/* Background decorativo, igual que la home */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(227,71,22,0.22),transparent_65%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black_30%,transparent_90%)]"></div>
        </div>

        <div className="max-w-[820px] mx-auto">
          {/* ── Encabezado ── */}
          <div className="flex justify-center mb-7 fade-in-down">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <p className="text-white/80 text-[11px] md:text-[12px] tracking-[0.14em] uppercase font-medium">
                Para Coaches Fitness Online
              </p>
            </div>
          </div>

          <h1 className="text-white text-center leading-[1.08] md:leading-[1.05] text-[28px] md:text-[42px] tracking-[-0.025em] font-bold text-balance fade-in-up delay-100">
            Las 3 clases que te faltan para dejar de estar <span className="text-[#E34716]">estancado en 1-5k</span>
          </h1>

          <p className="text-white/55 text-center leading-[1.55] max-w-[600px] mx-auto mt-5 md:mt-6 text-[15px] md:text-[17px] fade-in-up delay-200">
            No es más contenido ni un hook mágico. Es entender qué sostiene un negocio de coaching que factura estable.
          </p>

          {/* ── Gráfico: el PNG tiene fondo transparente, va suelto sobre el dark ── */}
          <div className="mt-8 md:mt-10 fade-in-up delay-300">
            <img
              src="/images/grafico-facturacion.png"
              alt="Evolución de facturación y cash collected mes a mes hasta superar la meta de 11k"
              width={986}
              height={561}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>

          <div className="flex justify-center mt-8 fade-in-up delay-400">
            <a href="#form-optin" className="tcf-btn">
              <span className="relative">Quiero las 3 clases →</span>
            </a>
          </div>

          {/* ── Las 3 clases ── */}
          <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-3 fade-in-up delay-300">
            {CLASES.map((c) => (
              <div
                key={c.n}
                className="rounded-[16px] border border-white/[0.08] bg-white/[0.02] p-5"
              >
                <span className="grid size-[38px] shrink-0 place-items-center rounded-[10px] bg-[#E34716]/12 border border-[#E34716]/30">
                  <c.Icono className="size-[18px] text-[#E34716]" />
                </span>
                <p className="text-white font-semibold text-[16px] leading-[1.35] mt-3.5">{c.titulo}</p>
                <p className="text-white/50 text-[13.5px] leading-[1.55] mt-1.5">{c.bajada}</p>
              </div>
            ))}
          </div>

          {/* ── Formulario ── */}
          <div id="form-optin" className="mt-10 md:mt-12 max-w-[520px] mx-auto relative scroll-mt-8 fade-in-up delay-400">
            <div className="absolute -inset-5 bg-gradient-to-br from-[#E34716]/25 via-[#E34716]/5 to-transparent rounded-[28px] blur-3xl pointer-events-none"></div>
            <form
              onSubmit={enviar}
              className="relative rounded-[20px] border border-white/[0.10] bg-[#0d0d0d] p-6 md:p-7"
            >
              <p className="text-white font-bold text-[19px] leading-[1.3]">Dejame por dónde mandártelas</p>
              <p className="text-white/45 text-[13.5px] mt-1.5 leading-[1.5]">Te llegan al WhatsApp en el momento.</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="whatsapp" className="block text-white/70 text-[13px] mb-2">
                    Tu WhatsApp
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 size-[17px] text-white/30" />
                    <input
                      id="whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+54 9 11 1234 5678"
                      autoComplete="tel"
                      className="w-full rounded-[10px] bg-white/[0.04] border border-white/[0.10] pl-10 pr-4 py-3 text-white text-[15px] placeholder:text-white/25 outline-none focus:border-[#E34716] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="instagram" className="block text-white/70 text-[13px] mb-2">
                    Tu perfil de Instagram
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-3.5 top-1/2 -translate-y-1/2 size-[17px] text-white/30" />
                    <input
                      id="instagram"
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="@tuusuario"
                      className="w-full rounded-[10px] bg-white/[0.04] border border-white/[0.10] pl-10 pr-4 py-3 text-white text-[15px] placeholder:text-white/25 outline-none focus:border-[#E34716] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-white/70 text-[13px] mb-2.5">
                    ¿Tenés un coaching fitness facturando entre 1 y 5k por mes?
                  </p>
                  <div className="space-y-2">
                    {OPCIONES_FACTURACION.map((op) => {
                      const elegida = factura === op.value;
                      return (
                        <button
                          key={op.value}
                          type="button"
                          onClick={() => setFactura(op.value)}
                          className={`w-full flex items-start gap-3 rounded-[10px] border px-4 py-3 text-left text-[14px] leading-[1.4] transition-colors ${
                            elegida
                              ? "border-[#E34716] bg-[#E34716]/10 text-white"
                              : "border-white/[0.10] bg-white/[0.03] text-white/60 hover:bg-white/[0.06]"
                          }`}
                        >
                          <span
                            className={`mt-[2px] grid size-[16px] shrink-0 place-items-center rounded-full border transition-colors ${
                              elegida ? "border-[#E34716] bg-[#E34716]" : "border-white/25"
                            }`}
                          >
                            {elegida && <Check className="size-[10px] text-white" />}
                          </span>
                          <span>{op.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {error && <p className="mt-4 text-[#ff6b4a] text-[13.5px] leading-[1.5]">{error}</p>}

              <button type="submit" disabled={enviando} className="tcf-btn mt-6 disabled:opacity-50">
                <span className="relative">{enviando ? "Enviando…" : "Quiero las 3 clases"}</span>
              </button>

              <p className="text-white/30 text-[11.5px] text-center mt-4 leading-[1.5]">
                Tus datos quedan entre nosotros. Los uso para mandarte las clases y nada más.
              </p>
            </form>
          </div>

          <p className="relative z-10 text-white/35 text-[13px] mt-6 text-center">
            PD: No te voy a spamear ni poner un setter a molestar
          </p>
        </div>

      </section>
    </div>
  );
}
