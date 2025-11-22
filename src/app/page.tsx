'use client'
import Image from "next/image";
import Button from "./components/button";
import Faqs from "./components/faqs";
import MultiStepForm from "./components/multi-step-form"
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [isFormOpen, setIsFormOpen] = useState(false);

  const variantRef = useRef<'A' | 'B'>(Math.random() < 0.5 ? 'A' : 'B');
  const variant = variantRef.current;

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

  return (
    <div className="relative overflow-clip">
      <div className="relative overflow-clip">
        <section className="pt-[32px] pb-[100px] z-50 relative px-4">
          <div className="max-w-[900px] mx-auto">
            <div className="rounded-full py-2 px-4 w-fit mx-auto mb-4 border border-[#0066ff]/30 bg-[#0066ff]/10">
              <p className="text-white w-full md:w-[290px] font-medium text-[14px] max-w-[300px] capitalize leading-[120%] text-center">
                SOLO PARA COACHES FITNESS ONLINE
              </p>
            </div>
            {variant === 'A' && (
              <h1 className="text-white max-w-[640px] mx-auto text-shadow-[0px_2px_30px_#FFFFFF50] text-center leading-[115%] md:leading-[120%] text-[28px] md:text-[32px] tracking-[-1%] font-bold">
                +40 Llamadas Calificadas, Directo a tus Closers Con un Embudo de Ventas VSL
              </h1>
            )}
            {variant === 'B' && (
              <h1 className="text-white max-w-[640px] mx-auto text-shadow-[0px_2px_30px_#FFFFFF50] text-center leading-[115%] md:leading-[120%] text-[28px] md:text-[32px] tracking-[-1%] font-bold">
                +40 Llamadas Calificadas, Directo a tus Closers Con un Embudo de Ventas VSL
              </h1>
            )}
            <p className="md:block hidden px-8 text-white text-center leading-[150%] max-w-[500px] mx-auto mt-2 md:px-0 px-4">
              Sin depender de que tan bien le va a tu contenido organico
            </p>
            <div className="bg-[#0066ff] text-white max-w-[600px] mx-auto mt-4 rounded-[20px] text-[14px] text-center">
              <p className="py-1">Mira el video completo</p>
              <div className="border-4 border-[#0066ff] rounded-[20px] overflow-clip mx-auto">
                <iframe
                  className="w-full aspect-video"
                  id="panda-75206d15-88f9-4725-8952-68deee609f57"
                  src="https://player-vz-5c2adb98-6a4.tv.pandavideo.com/embed/?v=75206d15-88f9-4725-8952-68deee609f57"
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                ></iframe>
              </div>
            </div>
            <p className="md:hidden block px-8 text-white text-center leading-[150%] text-[16px] max-w-[500px] mx-auto mt-2 md:px-0 px-4">
              Sin depender de que tan bien le va a tu contenido organico
            </p>

            {/* CTA que abre el formulario */}
            <div onClick={() => setIsFormOpen(true)}>
              <Button text="¡Quiero mi Embudo VSL!" />
            </div>
          </div>
        </section>
      </div>

      <section className="px-4">
        <h2 className="text-white max-w-[800px] mx-auto mb-4 capitalize text-center leading-[120%] text-[24px] md:text-[32px] tracking-[-1%] font-bold">
          Hemos trabajado con +40 Coaches como...
        </h2>
        <div
          className="mt-8 max-w-[900px] mx-auto grid md:grid-cols-2 gap-8"
        >
          {
            SCREENSHOT_TESTIMONIALS_REG.map((testimonial) => {
              return (
                <img
                  key={testimonial.captura}
                  className="w-full min-h-[50px] rounded-lg"
                  src={`/images/${testimonial.captura}`}
                  alt="Captura con cambio || resultados"
                />
              );
            })
          }
        </div>
        <div className="mt-8" onClick={() => setIsFormOpen(true)}>
          <Button text="¡Quiero Mi Funnel!" />
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
            <h2 className="text-white max-w-[800px] mx-auto mb-4 capitalize text-center leading-[120%] text-[24px] md:text-[32px] tracking-[-1%] font-bold">
              Llena el formulario, agenda tu consulta, y déjanos construirte un embudo que te aporte estabilidad, predictibilidad y, por lo tanto, escalabilidad
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
        <img className="mx-auto mb-2" src="/images/tomascosta-logo.svg" alt="Tomás Costa Funnels" />
        <p className="text-white/60 text-center mt-4 text-[14px]">
          © Tomás Costa 2025. Todos derechos reservados.
        </p>
      </section>
    </div>
  );
}
