'use client'
import Image from "next/image";
import Button from "./components/button";
import Faqs from "./components/faqs";
import MultiStepForm from "./components/multi-step-form"
import Script from "next/script";
import { useEffect, useRef } from "react";

export default function Home() {

  const variantRef = useRef<'A' | 'B'>(Math.random() < 0.5 ? 'A' : 'B');
  const variant = variantRef.current;

  useEffect(() => {
    localStorage.setItem("test", variant)
  }, [])

  console.log(variant)

  return (
    <div className="relative overflow-clip">
      <div className="relative overflow-clip">
        <div className="absolute bg-[url('/images/bg.webp')] bg-cover w-full h-full opacity-70 md:bg-center bg-[-400px]">
        </div>
        {/* <div className="size-[600px] rounded-full bg-[#2C80FF]/40 blur-[200px] absolute -bottom-[205px] left-[calc(50%-300px)]"></div> */}
        {/* <div className="size-[413px] rounded-full bg-[#2C80FF]/70 blur-[150px] absolute -top-[205px] -right-[205px]"></div> */}
        {/* <div className="size-[413px] rounded-full bg-[#2C80FF]/70 blur-[150px] absolute top-[205px] right-[calc(50%-205px)]"></div> */}
        <section className="pt-[32px] relative z-50 px-4">
          <img className="mx-auto" src="/images/tomascosta-logo.svg" alt="Tomás Costa Funnels" />
        </section>
        <section className="pt-[32px] pb-[100px] z-50 relative px-4">
          <div className="max-w-[900px] mx-auto">
            <div className="flex gap-2 md:w-auto md:gap-4 mx-auto justify-center items-center mb-4 md:mb-6">
              <img className="h-[32px] w-auto" src="/images/tomascosta-clients.png" alt="Tomás Costa Clientes" />
              <p className="text-white w-[225px] md:w-[262px] font-medium text-[12px] md:text-[14px] max-w-[300px] capitalize leading-[100%]">+50 Coaches fitness online e Infoproductores confian en nosotros</p>
            </div>
            {variant === 'A' && (
              <h1 className="text-white max-w-[640px] mx-auto text-shadow-[0px_2px_30px_#FFFFFF50] text-center leading-[115%] md:leading-[120%] text-[27px] md:text-[32px] tracking-[-1%] font-bold">
                Imagínate tener entre 20 y 60 Llamadas Calificadas Extra Todos los Meses, Sin depender de tu Contenido Orgánico
              </h1>
            )}
            {variant === 'B' && (
              <h1 className="text-white max-w-[640px] mx-auto text-shadow-[0px_2px_30px_#FFFFFF50] text-center leading-[115%] md:leading-[120%] text-[27px] md:text-[32px] tracking-[-1%] font-bold">
                Escalá tu Negocio con un Sistema que te Trae Entre 20 y 60 Llamadas Calificadas Extra al Mes en Piloto Automático
              </h1>
            )}
            <p className="md:block hidden text-white md:text-[16px] text-[14px] text-center leading-[150%] max-w-[500px] mx-auto mt-2 md:px-0 px-4">
              Y sin saber de diseño, marketing ni programación ni lidiar con freelancers o agencias genericas.
            </p>
            <div className="bg-[#0066ff] text-white max-w-[600px] mx-auto mt-4 rounded-[20px] text-[14px] text-center">
              <p className="py-1">Activa el audio y mira el video completo</p>
              <div className="border-4 border-[#0066ff] rounded-[20px] overflow-clip mx-auto">
                <iframe className="aspect-video w-full" id="panda-636f6d70-867a-4d89-94f4-490366e1b5e0" src="https://player-vz-5c2adb98-6a4.tv.pandavideo.com.br/embed/?v=636f6d70-867a-4d89-94f4-490366e1b5e0" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"></iframe>
                <Script id="panda-video-player" strategy="afterInteractive">{`if(!document.querySelector('script[src^="https://player.pandavideo.com.br/api.v2.js"]')){let s=document.createElement('script'); s.src='https://player.pandavideo.com.br/api.v2.js'; s.async=true; document.head.appendChild(s);} window.pandascripttag=window.pandascripttag || []; window.pandascripttag.push(function (){const p=new PandaPlayer('panda-636f6d70-867a-4d89-94f4-490366e1b5e0',{onReady() {p.loadButtonInTime({fetchApi: true})}, library_id: 'vz-5c2adb98-6a4', video_id: '636f6d70-867a-4d89-94f4-490366e1b5e0', defaultStyle: true});});`}</Script>
                
                {/* <iframe id="panda-636f6d70-7708-49b0-b7e2-7fe437824055" src="https://player-vz-5c2adb98-6a4.tv.pandavideo.com.br/embed/?v=636f6d70-7708-49b0-b7e2-7fe437824055" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" className="w-full h-full aspect-video"></iframe>
                <Script id="panda-video-player" strategy="afterInteractive">{`if(!document.querySelector('script[src^="https://player.pandavideo.com.br/api.v2.js"]')){let s=document.createElement('script'); s.src='https://player.pandavideo.com.br/api.v2.js'; s.async=true; document.head.appendChild(s);} window.pandascripttag=window.pandascripttag || []; window.pandascripttag.push(function (){const p=new PandaPlayer('panda-636f6d70-7708-49b0-b7e2-7fe437824055',{onReady() {p.loadButtonInTime({fetchApi: true})}, library_id: 'vz-5c2adb98-6a4', video_id: '636f6d70-7708-49b0-b7e2-7fe437824055', defaultStyle: true});});`}</Script> */}
              </div>
            </div>
            <p className="block md:hidden text-white md:text-[16px] text-[14px] text-center leading-[150%] max-w-[500px] mx-auto mt-4 md:px-0 px-4">
              Y sin saber de diseño, marketing ni programación ni lidiar con freelancers o agencias genericas.
            </p>
            <Button text="Quiero Mi Embudo" />
          </div>
        </section>
      </div>
      {/* <section className="bg-[#1B1B1B] py-12 md:py-6 px-4">
        <ul className="max-w-[720px] mx-auto text-[16px] text-white font-medium flex md:flex-row flex-col justify-between gap-8 md:gap-16">
          <li className="text-center flex flex-col gap-1 md:w-[180px]"><span className="text-[42px] leading-[100%] font-bold text-white">50+</span> <span className="text-white/80 leading-[120%]">casos de éxito</span></li>
          <li className="text-center flex flex-col gap-1 md:w-[180px]"><span className="text-[42px] leading-[100%] font-bold text-white">4+</span> <span className="text-white/80 leading-[120%]">años creando embudos</span></li>
          <li className="text-center flex flex-col gap-1 md:w-[180px]"><span className="text-[42px] leading-[100%] font-bold text-white">100k+</span> <span className="text-white/80 leading-[120%]">dólares vendidos desde nuestros funnels</span></li>
        </ul>
      </section> */}
      <div className="relative overflow-clip">
        <div className="absolute w-[50px] h-full top-0 left-0 blur-[150px] bg-[#0066ff]/40"></div>
        <div className="absolute w-[50px] h-full top-0 right-0 blur-[150px] bg-[#0066ff]/40"></div>
        <section className="py-[80px] px-4 relative overflow-clip">
          <div className="max-w-[1200px] mx-auto relative z-50">
            <h2 className="text-white mb-4 capitalize text-center leading-[140%] md:leading-[120%] text-[32px] md:text-[42px] tracking-[-1%] font-bold">
              ¿Qué opinan nuestros clientes?
            </h2>
            <p className="text-white text-center pb-8 leading-[150%] max-w-[500px] mx-auto mt-4">
              Estamos orgullosos de haber trabajado con coaches y profesionales top de la industria como
            </p>
            <div className="flex flex-wrap md:flex-nowrap gap-4 mb-8">
              <div className="bg-white p-8 flex justify-between md:min-w-[273px] flex-col gap-8 rounded-xl border border-[#0066ff]/20">
                <p className="text-[#030413]/90">“El salto de calidad que tuve en el diseño y calidad de mi Landing Page con Tomi fue increíble. Subí una historia y cerré 3 ventas de 4 llamadas que se agendaron en automático.”</p>
                <div className="flex gap-2 items-center">
                  <img src="/images/tomas-costa-mati.png" alt="Funnel para coach fitness online" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[#030413]">Matias Sanchez</p>
                      <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>
                    </div>
                    <p className="text-[#030413]/80 text-[14px]">Coach Fitness</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 flex justify-between md:min-w-[273px] flex-col gap-8 rounded-xl border border-[#0066ff]/20">
                <p className="text-[#030413]/90">“Trabajar contigo ha sido súper comodo desde el principio. Tienes mucha paciencia conmigo, entendiste perfecto la idea que yo tenia en mente y la plasmaste rapidamente. Me siento muy acompañada en todo el proceso.”</p>
                <div className="flex gap-2 items-center">
                  <img src="/images/tomas-costa-cata.png" alt="Funnel para psicologa online" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[#030413]">Cata Perez</p>
                      <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>
                    </div>
                    <p className="text-[#030413]/80 text-[14px]">Psicologa Online</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 flex justify-between md:min-w-[273px] flex-col gap-8 rounded-xl border border-[#0066ff]/20">
                <p className="text-[#030413]">“Mi experiencia con tu servicio fue 10/10. Sinceramente desde el primer día que comenzamos a trabajar vi mucho profesionalismo, compromiso y dedicación.”</p>
                <div className="flex gap-2 items-center">
                  <img src="/images/tomas-costa-lucas.png" alt="Funnel para coach fitness online" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[#030413]">Lucas Reale</p>
                      <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>
                    </div>
                    <p className="text-[#030413]/80 text-[14px]">Coach Fitness</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 flex justify-between md:min-w-[273px] flex-col gap-8 rounded-xl border border-[#0066ff]/20">
                <p className="text-[#030413]/90">“Trabajar con Tomás fue un lujo impresionante. Expeditivo, atento, responsable y buena persona. Sin dudas un placer trabajar con personas asi: atentas y enfocadas en agregar valor a los demas”</p>
                <div className="flex gap-2 items-center">
                  <img src="/images/tomas-costa-mati-r.png" alt="Funnel para life coach" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[#030413]">Matias Revozob</p>
                      <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>
                    </div>
                    <p className="text-[#030413]/80 text-[14px]">Life Coach</p>
                  </div>
                </div>
              </div>
            </div>
            <Button text="Quiero Mi Funnel" />
          </div>
        </section>
        {/* <section className="pt-[80px] pb-[100px] px-4">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-white max-w-[800px] mx-auto mb-4 capitalize text-center leading-[140%] md:leading-[120%] text-[32px] md:text-[42px] tracking-[-1%] font-bold">
              Un Proceso Pensado para Darte un Servicio de Calidad
            </h2>
            <p className="text-white text-center pb-8 leading-[150%] max-w-[500px] mx-auto mt-4">
              Como Coach Fitness, Nutricionista o , probablemente sepas que sin procesos es difícil lograr buenos resultados, por eso llevamos años perfeccionando el nuestro.
            </p>
            <div className="max-w-[700px] mx-auto">
              <ol className="relative border-s border-gray-700">
                <li className="mb-10 ms-4 group">
                  <div className="absolute w-3 h-3 group-hover:bg-[#0066ff] transition-all rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none group-hover:text-[#0066ff] text-gray-500">Primer Paso</time>
                  <h3 className="text-lg font-semibold text-white">Análisis de tu avatar y el camino que debe recorrer para pasar de no conocerte a comprarte</h3>
                  <p className="mb-4 text-base font-normal text-gray-500">Entendemos con precisión quién es tu cliente ideal y qué lo motiva a tomar acción. Este análisis nos permite diseñar un embudo que hable directamente a sus dolores y deseos, haciendo que tus mensajes generen conexión y confianza desde el primer contacto. Así logramos que cada visita tenga más chances de convertirse en una venta real.</p>
                </li>
                <li className="mb-10 ms-4 group">
                  <div className="absolute w-3 h-3 group-hover:bg-[#0066ff] rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none group-hover:text-[#0066ff] text-gray-500">Segundo Paso</time>
                  <h3 className="text-lg font-semibold text-white">Redacción de textos de todo el embudo</h3>
                  <p className="text-base font-normal text-gray-500">Creamos mensajes que venden sin sonar forzados. Cada texto está pensado para captar atención, mantener interés y guiar al usuario paso a paso hasta agendar o comprar. Esto hace que tu comunicación sea coherente, profesional y sobre todo, persuasiva, multiplicando las conversiones sin necesidad de aumentar tu inversión en anuncios.</p>
                </li>
                <li className="mb-10 ms-4 group">
                  <div className="absolute w-3 h-3 group-hover:bg-[#0066ff] rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none group-hover:text-[#0066ff] text-gray-500">Tercer Paso</time>
                  <h3 className="text-lg font-semibold text-white">Diseño y desarrollo de landings</h3>
                  <p className="text-base font-normal text-gray-500">Transformamos la estrategia en una experiencia visual que convence. Diseñamos páginas modernas, rápidas y centradas en resultados, optimizadas para captar leads o generar ventas. Cada sección está pensada para destacar tu valor diferencial y guiar al visitante hacia la acción que más te importa.</p>
                </li>

                <li className="mb-10 ms-4 group">
                  <div className="absolute w-3 h-3 group-hover:bg-[#0066ff] rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none group-hover:text-[#0066ff] text-gray-500">Cuarto Paso</time>
                  <h3 className="text-lg font-semibold text-white">Setter con IA y Secuencia de email marketing</h3>
                  <p className="text-base font-normal text-gray-500">Responder siempre las mismas dudas no es tiempo bien aprovechado, por eso te instalamos un setter con IA que maneje conversaciones y agende llamadas, y además creamos una secuencia de correos automatizada para que nutras en automático a cada lead que entra en tu embudo.</p>
                </li>

                <li className="ms-4 group">
                  <div className="absolute w-3 h-3 group-hover:bg-[#0066ff] rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none group-hover:text-[#0066ff] text-gray-500">Quinto Paso</time>
                  <h3 className="text-lg font-semibold text-white">2 meses de CRO (Optimización)</h3>
                  <p className="text-base font-normal text-gray-500">No se trata solo de lanzar, sino de mejorar constantemente. Durante dos meses medimos el comportamiento real de tus visitantes, identificamos qué partes del embudo funcionan mejor y optimizamos todo para aumentar tus conversiones. Así aseguramos que tu inversión en tráfico rinda cada vez más y tu embudo se vuelva más rentable con el tiempo.</p>
                </li>
              </ol>
            </div>
            <Button text="Quiero Una Web Para Escalar" />
          </div>
        </section> */}
      </div>
      <section className="py-[60px] md:py-[100px] px-4 relative">
        <div className="absolute top-0 left-0 bg-[url('/images/bg-2.webp')] bg-cover w-full h-full opacity-70 md:bg-center bg-[-400px]">
        </div>
        <div className="relative flex md:flex-row flex-col gap-8 md:items-end max-w-[800px] mx-auto">
          <img className="md:block hidden w-full md:max-w-[330px]" src="/images/tomas-costa-testimonial-2.png" />
          <div className="text-white py-6 md:py-0">
            <h3 className="font-bold text-[32px] mb-4"><span className="text-[#] text-[48px] me-2">“</span>Subí El Precio Cag*n</h3>
            <p className="leading-[150%]">
              Tomi querido, te quería agradecer por todo el laburo que hiciste con la web. Se nota que pusiste compromiso, siempre respondiste, estuviste presente y cumpliste con todo en tiempo y forma.
              <br /><br />
              Me encantó cómo quedó y representa exactamente lo que quería transmitir. Mil gracias! Feliz con el resultado. Y...”
            </p>
            <div className="mt-8 flex gap-4 items-center">
              <img className="block md:hidden size-[60px]" src="/images/tomas-costa-testimonial-mobile.png" />
              <div>
                <div className="flex gap-2 items-center">
                  <p>@juampigardonio</p>
                  <svg aria-label="Verified" className="x1lliihq x1n2onr6" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>
                </div>
                <p>+600k seguidores</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-[100px]">
        <div>
          <h2 className="text-white max-w-[800px] mx-auto mb-4 capitalize text-center leading-[140%] md:leading-[120%] text-[32px] md:text-[42px] tracking-[-1%] font-bold">
            Preguntas Frecuentes
          </h2>
          <Faqs />
        </div>
      </section>
      <section className="pt-[60px] pb-[80px] px-4" id="contact">
          <h2 className="text-white max-w-[800px] mx-auto mb-4 capitalize text-center leading-[140%] md:leading-[120%] text-[32px] md:text-[42px] tracking-[-1%] font-bold">
            Da el Siguiente Paso con tu Nuevo Embudo de Ventas a Medida
          </h2>
          <div className="mt-8">
            <MultiStepForm />
          </div>
      </section>
      <section className="py-8">
        <img className="mx-auto mb-2" src="/images/tomascosta-logo.svg" alt="Tomás Costa Funnels" />
        <p className="text-center text-white/60 text-[14px]">
          tomas@tomascostafunnels.com
          <br />
          Mendoza, Argentina
          <br />
          +54 261 684 1853
        </p>
        <p className="text-white/60 text-center mt-4 text-[14px]">
          © Tomás Costa 2025. Todos derechos reservados.
        </p>
      </section>
    </div>
  );
}
