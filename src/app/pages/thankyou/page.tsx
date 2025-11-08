'use client';

import { useMemo, useState } from 'react';
import Script from 'next/script';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

type Faq = { id: string; pregunta: string; respuesta: string };

type Props = {
  nombre?: string;                // Ej: "Tomás Costa"
  whatsappNumber?: string;        // Ej: "+542616841853"
  whatsappMessage?: string;       // Mensaje pre-llenado para confirmar
};

export default function ThankYou({
  nombre = "¡Ya casi estamos!",
  whatsappNumber = "+542616841853",
  whatsappMessage = "Hola Tomi, confirmo mi asistencia a la llamada",
}: Props) {
  // Checklist
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);
  const canConfirm = c1 && c2 && c3;

  const waHref = useMemo(() => {
    const text = encodeURIComponent(whatsappMessage);
    const number = whatsappNumber.replace(/\s+/g, "");
    return `https://wa.me/${number}?text=${text}`;
  }, [whatsappNumber, whatsappMessage]);

  // FAQs orientadas a objeciones reales
  const FAQS: Faq[] = [
    {
      id: "q1",
      pregunta: "¿Cuánto tiempo me va a demandar implementar todo esto?",
      respuesta:
        "Muy poco: mi equipo y yo nos encargamos del grueso del trabajo. Vos solo aprobás guiones, grabás la VSL (con guía) y nos compartís accesos. La coordinación típica es 1–2 horas por semana.",
    },
    {
      id: "q2",
      pregunta: "Probé un funnel con VSL y no funcionó, ¿por qué ahora sería distinto?",
      respuesta:
        "La diferencia es la optimización continua, el triage de tráfico frío y el sistema de medición. No es solo ‘tener una VSL’, sino iterar hooks, ofertas, secuencias y segmentación hasta lograr ‘fit’ y escalar.",
    },
    {
      id: "q3",
      pregunta: "¿En cuánto tiempo puedo esperar ver llamadas nuevas?",
      respuesta:
        "En general, entre 1 y 3 semanas desde que activamos campañas y seguimiento. El primer objetivo es señales (CTR, watch time, costo por visita calificada). Luego consolidamos ‘Schedule’ calificados.",
    },
    {
      id: "q5",
      pregunta: "No tengo tiempo todos los días, ¿igual puedo?",
      respuesta:
        "Sí. Diseñamos el sistema para que trabaje 24/7. Tu tiempo se concentra en llamadas calificadas y entregables. Nosotros manejamos anuncios, CRO, data y ajustes.",
    },
    {
      id: "q6",
      pregunta: "¿Qué necesito preparar de mi lado?",
      respuesta:
        "Accesos a plataformas (ads/analytics/calendly/whatsapp), breve cuestionario, disponibilidad para grabar la VSL con nuestro guion y un testimonio o caso si tenés. Nosotros hacemos el resto.",
    },
    {
      id: "q7",
      pregunta: "¿Hay contrato de permanencia o puedo pausar?",
      respuesta:
        "Sin ataduras largas. Trabajamos por ciclos mensuales con objetivos claros. Si no te suma, podés pausar; preferimos retener por resultados, no por cláusulas.",
    },
    {
      id: "q8",
      pregunta: "¿Qué pasa si entran leads curiosos o poco calificados?",
      respuesta:
        "Aplicamos calificación en página, pre-preguntas y eventos de ‘Qualified Schedule’. Además, afinamos creatividades y segmentación para elevar la calidad de la agenda.",
    },
    {
      id: "q9",
      pregunta: "¿Trabajan solo con coaches fitness?",
      respuesta:
        "Fitness es nuestro core, pero también operamos B2C educativo (formaciones) y algunos B2B de servicios. Si hay prueba social y entrega sólida, podemos escalar.",
    },
    {
      id: "q10",
      pregunta: "¿Cómo sé que no es solo ‘más contenido’ o ‘más anuncios’?",
      respuesta:
        "Porque priorizamos estructura: VSL + funnel + datos. No ‘posteamos más’, medimos fricciones y optimizamos donde impacta el CPA y la tasa de agendados que llegan y compran.",
    },
    {
      id: "q11",
      pregunta: "¿Y si no vendo aunque tenga llamadas?",
      respuesta:
        "Te ayudamos a alinear promesa, triage y manejo de objeciones. Si la conversión a venta es baja, revisamos el guion, los filtros y el flujo post-call para mejorar el cierre.",
    },
    {
      id: "q12",
      pregunta: "¿Cuánto cuesta y qué incluye?",
      respuesta:
        "Incluye: estrategia, guion VSL, setup de funnel, campañas, seguimiento de datos y optimización semanal. Lo ajustamos en la llamada según tu caso y volumen objetivo.",
    },
  ];

  return (
    <div className="max-w-[760px] mx-auto px-4 py-[60px] bg-white text-black">
      {/* Alerta superior */}
      <p className="mb-8 bg-amber-200 flex gap-2 items-center justify-center p-2 rounded-md text-[16px] text-center">
        <svg className="fill-amber-500 size-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z" /></svg>
        <span><strong>¡Último paso!</strong> Confirmá por WhatsApp para no perder tu cupo.</span>
      </p>

      {/* Título */}
      <h1 className="text-[28px] font-bold leading-[115%] mb-5">
        {nombre}, ya casi estamos. ¡Solo falta confirmar!
      </h1>

      {/* Checklist */}
      <div className="space-y-3 mb-6">
        <p className="font-semibold">Checklist (2 minutos) — marcá para habilitar la confirmación:</p>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 size-4"
            checked={c1}
            onChange={(e) => setC1(e.target.checked)}
            aria-label="Lugar tranquilo"
          />
          <span>Voy a estar en un lugar tranquilo, sin interrupciones.</span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 size-4"
            checked={c2}
            onChange={(e) => setC2(e.target.checked)}
            aria-label="Respeto de horarios"
          />
          <span>Me comprometo a llegar a tiempo (respeto el cupo y la agenda).</span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 size-4"
            checked={c3}
            onChange={(e) => setC3(e.target.checked)}
            aria-label="Reprogramación anticipada"
          />
          <span>Si no puedo asistir, reprogramo con anticipación para liberar el lugar.</span>
        </label>
      </div>

      {/* Botón WhatsApp */}
      <a
        className={`block text-center mx-auto md:w-fit px-8 py-3 font-bold rounded-md transition
          ${canConfirm ? 'bg-green-500 text-white hover:opacity-90' : 'bg-gray-300 text-gray-500 pointer-events-none cursor-not-allowed'}`}
        href={canConfirm ? waHref : undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!canConfirm}
      >
        Confirmar mi asistencia por WhatsApp
      </a>

      <p className="text-[14px] text-center text-rose-600 mt-3">
        En caso de no confirmar, tu llamada puede ser cancelada.
      </p>

      {/* Wistia (opcional) */}
      {/*
      <div className="mt-10">
        <iframe
          src="https://fast.wistia.net/embed/iframe/opfsih32cf?web_component=true&seo=true&videoFoam=false"
          title="Video"
          allow="autoplay; fullscreen"
          scrolling="no"
          className="wistia_embed max-w-full w-full aspect-video"
          name="wistia_embed"
        />
        <Script src="https://fast.wistia.net/player.js" strategy="afterInteractive" />
      </div>
      */}

      {/* FAQs */}
      <h3 className="text-center text-[26px] font-bold leading-[115%] capitalize mb-6 mt-12">
        Preguntas reales de coaches reales
      </h3>

      <Accordion type="single" collapsible className="w-full">
        {FAQS.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-[20px] font-bold leading-[120%]">
              {item.pregunta}
            </AccordionTrigger>
            <AccordionContent className="text-[16px]">
              {item.respuesta}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
