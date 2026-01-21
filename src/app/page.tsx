'use client'
import Image from "next/image";
import Button from "./components/button";
import Faqs from "./components/faqs";
import MultiStepForm from "./components/multi-step-form"
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Variant = "A" | "B";
const VARIANT_KEY = "ff_variant";

export default function Home() {

  const [isFormOpen, setIsFormOpen] = useState(false);

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
    variant === "A"
      ? <>Aumentamos y Estabilizamos las Ventas de tu Coaching Fitness en 12 semanas con un <span className="text-[#E34716]">Embudo VSL Optimizado.</span></>
      : <>Te generamos de 20 y 50 llamadas de venta calificadas por mes para tu Coaching Fitness con un <span className="text-[#E34716]">Embudo VSL Optimizado.</span></>;

  return (
    <div className="relative overflow-clip">
      {/* <img className="absolute w-[1000px] max-w-none opacity-[20%] -left-[100px] md:-left-[150px] md:w-[3500px] top-[300px] md:-top-[100px]" src="/images/elemento-lineas.png" alt="Lineas" /> */}
      {/* <img className="absolute w-[600px] max-w-none mx-auto left-[calc(50%-300px)] top-[-54px]" src="/images/elemento-luz-2.png" alt="Luz" /> */}
      <div className="relative overflow-x-clip">
        <section className="pt-[32px] pb-[100px] z-50 relative px-4">
          <div className="max-w-[900px] mx-auto">
            <div className="rounded-full py-2 px-4 w-fit mx-auto mb-4 border border-[#E34716]/30 bg-[#E34716]/10 backdrop-blur">
              <p className="text-white w-full md:w-[600px] tracking-widest font-medium text-[14px] max-w-[300px] capitalize leading-[120%] text-center">
                SOLO PARA COACHES FITNESS ONLINE CON PROGRAMAS HIGH TICKET
              </p>
            </div>
            <h1 className="text-white max-w-[640px] mx-auto text-shadow-[0px_2px_30px_#FFFFFF50] text-center leading-[115%] md:leading-[120%] text-[26px] md:text-[32px] tracking-[-1%] font-bold">
              {heroTitle}
            </h1>
            <p className="md:block hidden px-8 text-white text-center leading-[150%] max-w-[500px] mx-auto mt-2 md:px-0 px-4">
              Descubre como disminuimos un 70%+ los curiosos sin dinero, y un 50%+ el costo por venta.
            </p>
            <div className="bg-[#E34716] text-white max-w-[600px] mx-auto mt-4 rounded-[20px] text-[14px] text-center">
              <p className="py-1 tracking-widest">MIRA ESTE VIDEO DE 3 MINUTOS</p>
              <div className="border-4 border-[#E34716] rounded-[20px] overflow-clip mx-auto">
                <iframe
                  className="w-full aspect-video"
                  id="panda-7ec8be5e-3943-4c8b-8db7-19ab91e90821"
                  src="https://player-vz-5c2adb98-6a4.tv.pandavideo.com/embed/?v=7ec8be5e-3943-4c8b-8db7-19ab91e90821" 
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                ></iframe>
              </div>
            </div>
            <p className="md:hidden text-[14px] block px-4 text-white text-center leading-[150%] text-[16px] max-w-[500px] mx-auto mt-2 md:px-0 px-4">
              Descubre como <strong className="text-[#E34716]">disminuimos un 70%+</strong> los curiosos sin dinero, y <strong className="text-[#E34716]">más de un 50%</strong> tu costo por venta.
            </p>

            {/* CTA que abre el formulario */}
            <div onClick={() => setIsFormOpen(true)}>
              <Button text="¡Quiero Mi Embudo VSL!" />
            </div>
          </div>
          <div className="bg-[#E34716] -z-50 size-[300px] blur-[160px] opacity-80 md:blur-[200px] absolute bottom-[-100px] -left-[50%]"></div>
        </section>
      </div>

      <section className="px-4 relative z-50">
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
          <Button text="¡Quiero Mi Embudo VSL!" />
        </div>

      </section>

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
              <MultiStepForm variant={variant} />
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
