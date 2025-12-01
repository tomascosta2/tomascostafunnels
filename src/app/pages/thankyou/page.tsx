// src/app/pages/thankyou/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Script from 'next/script';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function ThankYouPage() {

  // WhatsApp (solo dígitos)
  const whatsappNumber = "+542616841853";

  // ====== WhatsApp confirm ======
  const waHref = `https://wa.me/${whatsappNumber}?text=`;

  // ====== Checklist ======
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);
  const canConfirm = c1 && c2 && c3;

  // ====== FAQs ======
  const FAQS = [
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
        "Generalmente entre 1 y 3 semanas desde activación de campañas. Primero buscamos señales (CTR, watch time, costo por visita calificada) y luego consolidamos ‘Schedule’ calificados.",
    },
    {
      id: "q5",
      pregunta: "No tengo tiempo todos los días, ¿igual puedo?",
      respuesta:
        "Sí. El sistema trabaja 24/7. Tu tiempo se concentra en llamadas calificadas y entregables; nosotros manejamos anuncios, CRO, datos y ajustes.",
    },
    {
      id: "q6",
      pregunta: "¿Qué necesito preparar de mi lado?",
      respuesta:
        "Accesos (ads/analytics/calendly/whatsapp), breve cuestionario, disponibilidad para grabar la VSL con nuestro guion y un testimonio o caso si tenés. Nosotros hacemos el resto.",
    },
    {
      id: "q7",
      pregunta: "¿Hay contrato de permanencia o puedo pausar?",
      respuesta:
        "Trabajamos por ciclos mensuales con objetivos claros. Si no te suma, podés pausar; retenemos por resultados, no por cláusulas.",
    },
    {
      id: "q8",
      pregunta: "¿Qué pasa si entran leads curiosos o poco calificados?",
      respuesta:
        "Calificamos en página (pre-preguntas) y optimizamos creatividades/segmentación para elevar la calidad de agenda.",
    },
    {
      id: "q12",
      pregunta: "¿Cuánto cuesta y qué incluye?",
      respuesta:
        "Incluye estrategia, guion VSL, setup de funnel, campañas, seguimiento de datos y optimización semanal. Ajustamos en la llamada según tu caso y volumen objetivo.",
    },
  ] as const;

  // ====== UI ======
  return (
    <div className="bg-white">
      <div className="max-w-[760px] mx-auto px-4 py-[36px] text-black">
        {/* Aviso destacado */}
        <p className="mb-3 bg-amber-200 flex items-center gap-2 justify-center p-2 rounded-md text-[16px]">
          <svg className="fill-amber-500 size-[22px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z" /></svg>
          <span><strong>¡Último paso!</strong> Confirmá y agendá para no perder tu cupo.</span>
        </p>

        {/* Título + countdown */}
        <h1 className="text-[26px] font-bold leading-[115%] mb-2">
          Genial! ya casi estamos. Solo falta confirmar.
        </h1> 

        {/* Checklist */}
        <div className="rounded-xl border p-4 bg-white mb-4">
          <p className="font-semibold text-[18px] mb-2">Checklist (2 minutos) — marcá para habilitar la confirmación:</p>
          <label className="flex items-start gap-3 mb-2">
            <input type="checkbox" className="mt-1" checked={c1} onChange={e => setC1(e.target.checked)} />
            <span>Voy a estar en un lugar tranquilo, sin interrupciones.</span>
          </label>
          <label className="flex items-start gap-3 mb-2">
            <input type="checkbox" className="mt-1" checked={c2} onChange={e => setC2(e.target.checked)} />
            <span>Me comprometo a llegar a tiempo (respeto el cupo y la agenda).</span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" className="mt-1" checked={c3} onChange={e => setC3(e.target.checked)} />
            <span>Si no puedo asistir, reprogramo con anticipación para liberar el lugar.</span>
          </label>
        </div>

        {/* CTA principal */}
        <a
          className={`py-3 block text-center mx-auto md:w-fit px-8 font-bold rounded-lg transition ${
            canConfirm ? "bg-green-600 text-white hover:opacity-90" : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          target="_blank"
          rel="noopener noreferrer"
          href={canConfirm ? waHref : undefined}
          aria-disabled={!canConfirm}
        >
          Confirmar mi asistencia por WhatsApp
        </a>
        <p className="text-red-500 text-[14px] text-center mt-2">En caso de no confirmar, tu llamada puede ser cancelada.</p>

        {/* FAQ */}
        <h3 className="text-center text-[24px] font-bold leading-[115%] mb-6 mt-10">
          Preguntas frecuentes
        </h3>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-[18px] font-bold leading-[120%]">
                {item.pregunta}
              </AccordionTrigger>
              <AccordionContent className="text-[16px]">
                {item.respuesta}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Repetición del checklist + CTA al final (scroll largo) */}
        <div className="rounded-xl border p-4 bg-white mt-8">
          <p className="font-semibold text-[18px] mb-2">Checklist (2 minutos) — marcá para habilitar la confirmación:</p>
          <label className="flex items-start gap-3 mb-2">
            <input type="checkbox" className="mt-1" checked={c1} onChange={e => setC1(e.target.checked)} />
            <span>Voy a estar en un lugar tranquilo, sin interrupciones.</span>
          </label>
          <label className="flex items-start gap-3 mb-2">
            <input type="checkbox" className="mt-1" checked={c2} onChange={e => setC2(e.target.checked)} />
            <span>Me comprometo a llegar a tiempo (respeto el cupo y la agenda).</span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" className="mt-1" checked={c3} onChange={e => setC3(e.target.checked)} />
            <span>Si no puedo asistir, reprogramo con anticipación para liberar el lugar.</span>
          </label>
        </div>

        <a
          className={`py-3 block text-center mx-auto md:w-fit mt-4 px-8 font-bold rounded-lg transition ${
            canConfirm ? "bg-green-600 text-white hover:opacity-90" : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          target="_blank"
          rel="noopener noreferrer"
          href={canConfirm ? waHref : undefined}
          aria-disabled={!canConfirm}
        >
          Confirmar mi asistencia por WhatsApp
        </a>

        <p className="text-center text-[14px] text-red-500 mt-2">
          Cupos limitados: si no confirmás, el sistema libera tu lugar automáticamente.
        </p>
      </div>
    </div>
  );
}
