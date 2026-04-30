'use client'
import Image from "next/image";
import Button from "./components/button";
import Faqs from "./components/faqs";
import MultiStepForm from "./components/multi-step-form"
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";
import { Check } from "lucide-react";

type Variant = "A" | "B";
const VARIANT_KEY = "ff_variant";

export default function Home() {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [ad, setAd] = useState("default");

  const [variant] = useState<Variant>(() => {
    if (typeof window === "undefined") return "A"; // fallback (no debería pegar porque es client)
    const saved = window.localStorage.getItem(VARIANT_KEY) as Variant | null;
    if (saved === "A" || saved === "B") return saved;

    const v: Variant = Math.random() < 0.5 ? "A" : "B";
    window.localStorage.setItem(VARIANT_KEY, v); // sync: no espera a useEffect
    return v;
  });

  useEffect(() => {

    localStorage.setItem("test", variant)

    const ad = new URLSearchParams(window.location.search).get("ad") || "default";
    setAd(ad);

  }, [variant])

  console.log(variant)

  const SCREENSHOT_TESTIMONIALS_REG = [
    {
      captura: "call-funnels-cliente-1.jpg",
    },
    {
      captura: "call-funnels-cliente-2.jpg",
    },
    {
      captura: "call-funnels-cliente-3.jpg",
    },
    {
      captura: "call-funnels-cliente-4.jpg",
    },
    {
      captura: "call-funnels-cliente-5.jpg",
    },
    {
      captura: "call-funnels-cliente-6.jpg",
    },
    {
      captura: "call-funnels-cliente-7.jpg",
    },
    {
      captura: "call-funnels-cliente-8.jpg",
    },
  ];
  const heroTitle = <>Aumentamos las Llamadas Calificadas de tu Coaching Fitness con un Embudo VSL probado en 90 Días</>;

  return (
    <div className="relative overflow-clip">
      {/* <img className="absolute w-[1000px] max-w-none opacity-[20%] -left-[100px] md:-left-[150px] md:w-[3500px] top-[300px] md:-top-[100px]" src="/images/elemento-lineas.png" alt="Lineas" /> */}
      {/* <img className="absolute w-[600px] max-w-none mx-auto left-[calc(50%-300px)] top-[-54px]" src="/images/elemento-luz-2.png" alt="Luz" /> */}
      <div className="relative overflow-x-clip">
        <section className="pt-[60px] md:pt-[100px] pb-[80px] md:pb-[120px] z-50 relative px-4">
          {/* Background decorativo */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(227,71,22,0.22),transparent_65%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black_30%,transparent_90%)]"></div>
          </div>

          <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] md:gap-x-12 md:items-center">
            {/* Eyebrow */}
            <div className="flex justify-center md:justify-start md:col-start-1 md:row-start-1 mb-7 md:mb-7 fade-in-down">
              <div className="inline-flex items-center justify-center rounded-full px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                <p className="text-white/80 text-[11px] md:text-[12px] tracking-[0.14em] uppercase font-medium text-center">
                  Exclusivo para coaches fitness online
                </p>
              </div>
            </div>

            {/* H1 */}
            <h1 className="text-white text-center md:text-left leading-[1.08] md:leading-[1.05] text-[28px] md:text-[40px] tracking-[-0.025em] font-bold text-balance fade-in-up delay-100 md:col-start-1 md:row-start-2">
              {heroTitle}
            </h1>

            {/* Subtítulo */}
            <p className="text-white/55 text-center md:text-left leading-[1.55] max-w-[560px] mx-auto md:mx-0 mt-5 md:mt-6 text-[15px] md:text-[17px] tracking-[-0.005em] fade-in-up delay-200 md:col-start-1 md:row-start-3">
              Sin depender solo del orgánico ni campañas inestables que se te rompen cada dos semanas. Tenemos frameworks probados en el nicho para cada etapa del funnel.
            </p>

            {/* Video card — columna derecha en desktop */}
            <div className="mt-8 md:mt-0 max-w-[680px] mx-auto md:mx-0 w-full relative fade-in-up delay-300 md:col-start-2 md:row-start-1 md:row-span-5">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#E34716]/30 via-[#E34716]/5 to-transparent rounded-[32px] blur-3xl pointer-events-none"></div>
              <div className="relative bg-[#0a0a0a] rounded-[20px] overflow-hidden border border-[#E34716] shadow-[0_24px_80px_-12px_rgba(227,71,22,0.35)]">
                <p className="py-1.5 text-white text-[12px] tracking-widest text-center">Mira este video completo *</p>
                <div className="border-4 border-[#0a0a0a] rounded-[20px] overflow-hidden">
                  <iframe
                    className="w-full aspect-video block"
                    id="panda-90743a54-1155-4570-a9f4-23bcaa558b82"
                    src="https://player-vz-5c2adb98-6a4.tv.pandavideo.com/embed/?v=90743a54-1155-4570-a9f4-23bcaa558b82"
                    allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="fade-in-up delay-400 md:col-start-1 md:row-start-4 md:mt-2 md:flex md:justify-start" onClick={() => setIsFormOpen(true)}>
              <Button text="Ver si califico  →" />
            </div>
            <p className="text-white/45 text-center md:text-left text-[13px] mt-4 tracking-[-0.005em] fade-in-up delay-400 md:col-start-1 md:row-start-5">
              Aceptamos solo <span className="text-white/70 font-semibold">3 clientes por mes</span>
            </p>
          </div>

          {/* Sección de marcas */}
          <div className="mt-20 md:mt-28 max-w-[800px] mx-auto">
            <p className="text-white/35 text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-center mb-7 font-medium">
              Coaches con los que trabajamos
            </p>
            <div className="flex items-center justify-center gap-2">
              <img
                className="h-[78px]"
                src="/images/marcas-personales.png"
                alt="Coaches Fitness"
              />
              <p className="text-white/55 max-w-[200px] text-[13px] md:text-[14px] leading-[1.5] tracking-[-0.005em]">
                +25 Coaches Fitness ya venden con nuestros embudos
              </p>
            </div>
          </div>
        </section>
      </div>


      {/* <section className="px-4 relative z-50">
        <h2 className="text-white max-w-[500px] mx-auto mb-4 capitalize text-center leading-[120%] text-[24px] md:text-[32px] tracking-[-1%] font-bold">
          Hemos trabajado con +40 Coaches como...
        </h2>
        <p className="text-center max-w-[450px] mx-auto text-white/80 leading-[110%] mb-8">Nos enfocamos en Coaches Fitness Online. Y en algunos casos, si realmente vemos potencial, con Infoproductores B2C</p>
        <div
          className="mt-8 max-w-[900px] mx-auto grid md:grid-cols-2 gap-8"
        >
          {
            SCREENSHOT_TESTIMONIALS_REG.map((testimonial) => {
              return (
                <img
                  key={testimonial.captura}
                  className="w-full min-h-[50px] rounded-xl border border-white/10"
                  src={`/images/${testimonial.captura}`}
                  alt="Captura con cambio || resultados"
                />
              );
            })
          }
        </div>
        <div className="mt-8" onClick={() => setIsFormOpen(true)}>
          <Button text="Quiero Mi Embudo VSL  →" />
        </div>

      </section> */}

      {/* Overlay del formulario: oculto por defecto y visible cuando isFormOpen = true */}
      <div
        className={`
          fixed top-0 left-0 w-full h-full z-50 backdrop-blur-2xl transition-all duration-300
          ${isFormOpen
            ? "bg-black/70 opacity-100 pointer-events-auto"
            : "bg-black/0 opacity-0 pointer-events-none"
          }
        `}
      // si querés que clic en fondo cierre, descomentá:
      // onClick={() => setIsFormOpen(false)}
      >
        <section
          className="pt-[60px] pb-[80px] px-4 h-full flex items-start justify-center overflow-y-auto"
          id="contact"
          // para que el click adentro no cierre si usás onClick en el padre
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-[900px] w-full">
            <h2 className="text-white max-w-[760px] mx-auto mb-8 text-center leading-[1.15] md:leading-[1.1] text-[24px] md:text-[36px] tracking-[-0.025em] font-bold text-balance">
              Llená el formulario, agendá tu consulta, y obtené un embudo que te aporte estabilidad, predictibilidad y escalabilidad
            </h2>
            <div className="mt-8">
              <MultiStepForm variant={variant} ad={ad} />
            </div>
            <button
              className="mt-6 mx-auto block text-white/70 text-sm underline"
              onClick={() => setIsFormOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </section>
      </div>

      <section className="pt-16 pb-8">
        <img className="mx-auto w-[250px] mb-2" src="/images/fit-funnels-logo.png" alt="Fit Funnels" />
        <p className="text-white/60 text-center mt-4 text-[14px]">
          © Fit Funnels 2025. Todos derechos reservados.
        </p>
      </section>
    </div>
  );
}
