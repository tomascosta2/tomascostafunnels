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
  const heroTitle =
    variant === "B"
      ? <>En 3 Semanas Lanzamos Tu Embudo VSL Para Que Tengas Minimo 40 Llamadas CALIFICADAS Extra Todos Los Meses <br /> <span className="text-[#E34716]">O No Pagas</span></>
      : <>Creamos Embudos Para Coaches Fitness High Ticket Que Quieren Minimo 40 Llamadas CALIFICADAS Extra Al Mes <br /> <span className="text-[#E34716]">O No Pagas</span></>;

  return (
    <div className="relative overflow-clip">
      {/* <img className="absolute w-[1000px] max-w-none opacity-[20%] -left-[100px] md:-left-[150px] md:w-[3500px] top-[300px] md:-top-[100px]" src="/images/elemento-lineas.png" alt="Lineas" /> */}
      {/* <img className="absolute w-[600px] max-w-none mx-auto left-[calc(50%-300px)] top-[-54px]" src="/images/elemento-luz-2.png" alt="Luz" /> */}
      <div className="relative overflow-x-clip">
        <section className="pt-[32px] pb-[60px] z-50 relative px-4">
          <div className="max-w-[900px] mx-auto">
            <div className="rounded-full py-2 px-4 w-fit mx-auto mb-4 border border-[#E34716]/30 bg-[#E34716]/10 backdrop-blur">
              <p className="text-white w-full md:w-[600px] tracking-widest font-medium text-[14px] max-w-[300px] leading-[120%] text-center">
                Solo para Coaches Fitness con Ticket de MÍNIMO US$500
              </p>
            </div>
            <h1 className="text-white max-w-[750px] mx-auto text-shadow-[0px_2px_30px_#FFFFFF50] text-center leading-[115%] md:leading-[120%] text-[26px] md:text-[32px] tracking-[-1%] font-bold">
              {heroTitle}
            </h1>
            <p className="md:block hidden px-8 text-white text-center leading-[150%] max-w-[700px] mx-auto mt-2 md:px-0 px-4">
              100% DFY y además pasamos 2 meses enteros optimizando tu embudo.
            </p>
            <div className="bg-[#121212] border border-[#E34716] text-white max-w-[600px] mx-auto mt-4 rounded-[20px] text-[12px] text-center">
              <p className="py-1 px-12 tracking-widest">MIRA ESTE VIDEO Y DESPUES AGENDA TU LLAMADA</p>
              <div className="border-4 border-[#121212] rounded-[20px] overflow-clip mx-auto">
                <iframe
                  className="w-full aspect-video"
                  id="panda-edd19f7b-e123-4ec2-a1d2-a4939b1e0617"
                  src="https://player-vz-5c2adb98-6a4.tv.pandavideo.com/embed/?v=edd19f7b-e123-4ec2-a1d2-a4939b1e0617"
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                ></iframe>
              </div>
            </div>
            <p className="md:hidden text-[14px] block px-4 text-white text-center leading-[150%] text-[16px] max-w-[500px] mx-auto mt-2 md:px-0 px-4">
              100% DFY y además pasamos 2 meses enteros optimizando tu embudo.
            </p>

            {/* CTA que abre el formulario */}
            <div onClick={() => setIsFormOpen(true)}>
              <Button text="Quiero Mi Embudo VSL  →" />
            </div>
          </div>
          <div className="bg-[#E34716] -z-50 size-[300px] blur-[160px] opacity-80 md:blur-[200px] absolute bottom-[-100px] -left-[50%]"></div>

          <div className="flex items-center justify-center mt-8">
            <img className="h-[75px]" src="/images/marcas-personales.png" alt="Coaches Fitness" />
            <p className="text-white/80 max-w-[250px] text-[14px]">+25 Coaches Fitness ya venden con nuestros embudos</p>
          </div>
        </section>
      </div>

      <section className="px-4 pb-[80px]">
        <div className="bg-white/10 py-16 px-4 rounded-2xl max-w-[900px] mx-auto relative z-50">
          <h3 className="text-white text-center leading-[110%] text-[24px] md:text-[28px]">Esta oferta es solo para <span className="text-[#e6b6a7]">Coaches Fitness establecidos con una oferta validada de AL MENOS US$500 y multiples casos de exito.</span></h3>
        </div>
      </section>

      <section className="pt-[80px] pb-[60px] bg-white">
        <div className="max-w-[700px] mx-auto px-8">
          <div>
            <h3 className="text-[#111] text-center leading-[110%] text-[24px] md:text-[28px]">Cómo funciona:</h3>

            <div className="mt-10 text-[#111]">
              <div className="mb-8">
                <h5 className="text-[22px] font-semibold"><span className="text-[#E34716]">Fase 1:</span> Guionamos tus anuncios y redactamos los textos de tu landing (Semana 1)</h5>
                <ul className="space-y-2 mt-4 text-[18px]">
                  <li><Check className="inline-block mr-2 text-[#E34716]" />Guiones de anuncios hechos por nosotros con la misma estructura que ha generado miles de dólares y llamadas calificadas a nuestros clientes.</li>
                  <li><Check className="inline-block mr-2 text-[#E34716]" />Redactamos cada sección del embudo con textos pensados psicológicamente para vender más.</li>
                </ul>
              </div>

              <div className="mb-8">
                <h5 className="text-[22px] font-semibold"><span className="text-[#E34716]">Fase 2:</span> Diseñamos y desarrollamos tu embudo (Semanas 2 a 3)</h5>
                <ul className="space-y-2 mt-4 text-[18px]">
                  <li><Check className="inline-block mr-2 text-[#E34716]" />Diseñamos landing, página de agradecimiento y formulario con bases probadas enfocadas en convertir.</li>
                  <li><Check className="inline-block mr-2 text-[#E34716]" />Desarrollamos todo con las mejores prácticas para no perder ventas.</li>
                  <li><Check className="inline-block mr-2 text-[#E34716]" />Conectamos todo con el Pixel y la API de conversiones para que Meta trabaje para vos y no al revés.</li>
                </ul>
              </div>

              <div className="">
                <h5 className="text-[22px] font-semibold"><span className="text-[#E34716]">Fase 3:</span> Revisamos, analizamos y mejoramos (Semanas 4 a 12)</h5>
                <ul className="space-y-2 mt-4 text-[18px]">
                  <li><Check className="inline-block mr-2 text-[#E34716]" />Analizamos el rendimiento y detectamos puntos de mejora.</li>
                  <li><Check className="inline-block mr-2 text-[#E34716]" />Creamos testeos A/B de cada elemento importante de la landing para mejorar el rendimiento general del embudo.</li>
                  <li><Check className="inline-block mr-2 text-[#E34716]" />Detectamos el ángulo ganador y creamos nuevos anuncios según eso.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 px-4" onClick={() => setIsFormOpen(true)}>
          <Button text="Quiero Mi Embudo VSL  →" />
        </div>
      </section>

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
            <h2 className="text-white max-w-[800px] mx-auto mb-4 capitalize text-center leading-[120%] text-[22px] md:text-[32px] tracking-[-1%] font-bold">
              Llena el formulario, agenda tu consulta, y obtene un embudo que te aporte estabilidad, predictibilidad y, escalabilidad
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
