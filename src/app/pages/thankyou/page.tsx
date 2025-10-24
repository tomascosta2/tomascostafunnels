'use client';
import { useEffect, useRef } from "react";
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function ThankYou() {

  // const FAQS = [
  //   {
  //     pregunta: "¿Qué es una llamada calificada?",
  //     respuesta:
  //       "Una llamada calificada no es cualquier persona que agenda por curiosidad. Son potenciales clientes que ya pasaron filtros previos: tienen interés real en tu programa, cumplen con los requisitos que definimos juntos y llegan a la llamada con la intención de escuchar tu propuesta.",
  //   },
  //   {
  //     pregunta: "¿Cómo es diferente de los leads que me llegan por contenido orgánico?",
  //     respuesta:
  //       "El contenido organico es una excelente forma de generar autoridad y darte a conocer, pero en mi experiencia es agotador depender unicamente de eso, un VSL bien logrado te ahorra conversaciónes con curiosos, explica de forma ordenada lo que haces y ayuda a que la persona confie más en vos.",
  //   },
  //   {
  //     pregunta: "¿Qué pasa si la gente agenda pero no aparece?",
  //     respuesta:
  //       "Usamos recordatorios automáticos y mensajes que generan compromiso para que la mayoría llegue puntual a la llamada. Al estar pre-calificados, el interés es mucho más alto, lo que significa menos ausencias y más conversaciones que terminan en clientes.",
  //   },
  //   {
  //     pregunta: "¿Qué tipo de coaches pueden aplicar este sistema?",
  //     respuesta:
  //       "Está diseñado para coaches con ofertas validadas y programas de alto valor. Funciona especialmente bien con coaches online que ya tienen un negocio funcionando y buscan sumar activos de valor a su negocio que los ayuden a escalar y alivianar su dia a dia.",
  //   },
  //   {
  //     pregunta: "¿Cuánto tiempo me libera este sistema comparado con responder chats?",
  //     respuesta:
  //       "Muchísimo. En lugar de estar atado a contestar mensajes y perseguir leads que nunca responden, tenés un sistema que filtra, educa y agenda por vos. Pasás de ser esclavo de tu bandeja de entrada a tener un calendario con llamadas ya calificadas.",
  //   },
  //   {
  //     pregunta: "¿Qué soporte recibo después de implementar el embudo?",
  //     respuesta:
  //       "Depende del plan, pero por lo general durante dos meses analizamos el rendimiento, optimizamos los textos, el diseño y ajustamos el embudo para que te quede funcionando de la mejor manera posible.",
  //   },
  // ];

  return (
    <div className="max-w-[700px] mx-auto px-4 py-[60px] bg-white">
      <p className="mb-8 bg-amber-200 flex justify-center p-1 rounded-md text-[18px] text-center text-black">
        <svg className="fill-amber-500 size-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z" /></svg>
        <span><strong>¡Importante!</strong> Mira el video y lee el texto</span>
      </p>
      <iframe src="https://fast.wistia.net/embed/iframe/opfsih32cf?web_component=true&seo=true&videoFoam=false" title="Tomi" allow="autoplay; fullscreen" scrolling="no" className="wistia_embed max-w-full w-full aspect-video" name="wistia_embed"></iframe>
      <script src="https://fast.wistia.net/player.js" async></script>
      <h1 className="text-[24px] text-black font-bold my-8 leading-[115%]">
        ¡Felicidades!
        <br /><br />
        Solo falta un paso!
      </h1>
      <p className="text-[20px] text-black">
        Te debería haber llegado un WhatsApp, necesito que lo respondas para confirmar la llamada y asegurar tu lugar.
        <br /><br />
        En caso de que no te haya llegado, hace clic en el botón de abajo y confirma tu asistencia.
        <a className="py-3 bg-green-500 block text-center mx-auto md:w-fit mt-8 px-8 text-white font-bold" target="_blank" href="https://wa.me/+542616841853">Confirmar mi asistencia</a>
      </p>
      {/* <h3 className="text-center text-black text-[28px] leading-[115%] font-bold capitalize mb-8 mt-12">Preguntas reales de coaches reales</h3> */}
      {/* <Accordion type="single" collapsible className="w-full text-black">
        {
          FAQS.map((item, i) => {
            return (
              <AccordionItem value={`${i}`}>
                <AccordionTrigger className="text-[22px] font-bold leading-[120%]">
                  {item.pregunta}
                </AccordionTrigger>
                <AccordionContent className="text-[18px]">
                  {item.respuesta}
                </AccordionContent>
              </AccordionItem>
            )
          })
        }
      </Accordion> */}
    </div>
  );
}
