"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Página de gracias del opt-in: acá están las 3 clases, en
   acordeón. Reemplazar los embeds por los definitivos.
   ───────────────────────────────────────────────────────────── */

const CLASES = [
  {
    n: "01",
    titulo: "Los pilares de un negocio fitness sostenible",
    bajada: "Por qué la mayoría se estanca en 1-5k y qué tiene que estar en su lugar antes de escalar.",
    embed: "https://www.loom.com/embed/76a32d6c14da459f833493e8bd7af9eb",
  },
  {
    n: "02",
    titulo: "Anuncios que traen la gente correcta",
    bajada: "Cómo guionar y configurar campañas que atraen clientes que pueden pagarte.",
    embed: "https://www.loom.com/embed/76a32d6c14da459f833493e8bd7af9eb",
  },
  {
    n: "03",
    titulo: "Los procesos que sostienen las ventas",
    bajada: "Setting, llamadas y seguimiento: lo que pasa entre que te escriben y te pagan.",
    embed: "https://www.loom.com/embed/76a32d6c14da459f833493e8bd7af9eb",
  },
];

export default function GraciasOptInPage() {
  // Arranca abierta la primera: es el orden en el que hay que verlas.
  const [abiertaIdx, setAbiertaIdx] = useState<number | null>(0);
  const [usuario, setUsuario] = useState<string | null>(null);

  useEffect(() => {
    try {
      setUsuario(localStorage.getItem("ff_optin_ig"));
    } catch {}
  }, []);

  return (
    <div className="relative overflow-clip min-h-screen">
      <section className="pt-[60px] md:pt-[80px] pb-[90px] relative px-4">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(227,71,22,0.22),transparent_65%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black_30%,transparent_90%)]"></div>
        </div>

        <div className="max-w-[860px] mx-auto">
          {/* Eyebrow */}
          <div className="flex justify-center mb-6 fade-in-down">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
              <p className="text-white/85 text-[11.5px] md:text-[12px] tracking-[0.14em] uppercase font-medium">
                Pilares, Anuncios y Procesos
              </p>
            </div>
          </div>

          <h1 className="text-white text-center leading-[1.1] md:leading-[1.06] text-[27px] md:text-[40px] tracking-[-0.025em] font-bold text-balance fade-in-up delay-100">
            Estas 3 clases tienen <span className="text-[#E34716]">TODO</span> lo que necesitas para escalar tu Coaching Fitness de forma estable
          </h1>

          <p className="text-white/55 text-center leading-[1.55] max-w-[600px] mx-auto mt-5 md:mt-6 text-[15px] md:text-[17px] fade-in-up delay-200">
            Revisa tus pilares, crea mejores anuncios y hacelo estable gracias a procesos probados.
          </p>

          {usuario && (
            <p className="text-white/30 text-[13px] text-center mt-3 fade-in-up delay-200">
              También te las mandé al WhatsApp, {usuario}.
            </p>
          )}

          {/* ── Acordeón de clases ── */}
          <div className="mt-10 md:mt-12 space-y-4 fade-in-up delay-300">
            {CLASES.map((clase, i) => {
              const abierta = i === abiertaIdx;
              return (
                <div
                  key={clase.n}
                  className={`rounded-[18px] border transition-colors ${
                    abierta
                      ? "border-[#E34716] bg-[#E34716]/[0.06]"
                      : "border-white/[0.09] bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setAbiertaIdx(abierta ? null : i)}
                    aria-expanded={abierta}
                    className="w-full flex items-start gap-4 md:gap-5 p-5 md:p-6 text-left cursor-pointer"
                  >
                    <span
                      className={`grid size-[38px] shrink-0 place-items-center rounded-[10px] text-[14px] font-bold transition-colors ${
                        abierta ? "bg-[#E34716] text-white" : "bg-white/[0.06] text-white/45"
                      }`}
                    >
                      {clase.n}
                    </span>
                    <div className="grow">
                      <p className="text-white font-semibold text-[16px] md:text-[18px] leading-[1.3]">
                        {clase.titulo}
                      </p>
                      <p className="text-white/45 text-[13.5px] leading-[1.5] mt-1">{clase.bajada}</p>
                    </div>
                    <ChevronDown
                      className={`size-[19px] shrink-0 mt-[9px] transition-all duration-300 ${
                        abierta ? "rotate-180 text-[#E34716]" : "text-white/35"
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      abierta ? "max-h-[900px]" : "max-h-0"
                    }`}
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <div className="rounded-[14px] overflow-hidden border border-white/[0.10] bg-[#0a0a0a]">
                        {/* El iframe recién se monta al abrir: no cargamos 3 players de una. */}
                        {abierta && (
                          <iframe
                            className="w-full aspect-video block"
                            src={clase.embed}
                            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                            allowFullScreen
                          ></iframe>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── CTA final ── */}
          <div className="mt-12 rounded-[20px] border border-white/[0.09] bg-white/[0.02] p-6 md:p-8 text-center">
            <p className="text-white font-bold text-[19px] md:text-[22px] leading-[1.3]">
              Agenda una consulta para ver cómo te podemos ayudar
            </p>
            <p className="text-white/50 text-[14.5px] leading-[1.6] max-w-[520px] mx-auto mt-3">
              Si después de ver las clases querés que revisemos juntos qué te está frenando, agendá una llamada. Aceptamos solo 3 clientes por mes.
            </p>
            <a href="/#contact" className="tcf-btn mt-6">
              <span className="relative">Ver si califico →</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
