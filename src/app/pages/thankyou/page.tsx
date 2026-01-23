// src/app/pages/thankyou/page.tsx
'use client';

import { useMemo, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export default function ThankYouPage() {
  // WhatsApp (SOLO dígitos para wa.me)
  const whatsappNumber = '542616841853';

  const waText = useMemo(() => {
    const msg =
      '¡Hola! Confirmo mi asistencia a la llamada ✅\n\n' +
      'Ya completé el checklist y voy a estar a tiempo.\n' +
      '¿Me confirmás si quedó todo OK?';
    return encodeURIComponent(msg);
  }, []);

  const waHref = useMemo(
    () => `https://wa.me/${whatsappNumber}?text=${waText}`,
    [whatsappNumber, waText]
  );

  // Checklist
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);
  const canConfirm = c1 && c2 && c3;

  const FAQS = [
    {
      id: 'q1',
      pregunta: '¿Cuánto tiempo me va a demandar implementar todo esto?',
      respuesta:
        'Muy poco: mi equipo y yo nos encargamos del grueso del trabajo. Vos solo aprobás guiones, grabás la VSL (con guía) y nos compartís accesos. La coordinación típica es 1–2 horas por semana.',
    },
    {
      id: 'q2',
      pregunta: 'Probé un funnel con VSL y no funcionó, ¿por qué ahora sería distinto?',
      respuesta:
        'La diferencia es la optimización continua, el triage de tráfico frío y el sistema de medición. No es solo “tener una VSL”, sino iterar hooks, ofertas, secuencias y segmentación hasta lograr fit y escalar.',
    },
    {
      id: 'q3',
      pregunta: '¿En cuánto tiempo puedo esperar ver llamadas nuevas?',
      respuesta:
        'Generalmente entre 1 y 3 semanas desde activación de campañas. Primero buscamos señales (CTR, watch time, costo por visita calificada) y luego consolidamos “Schedule” calificados.',
    },
    {
      id: 'q5',
      pregunta: 'No tengo tiempo todos los días, ¿igual puedo?',
      respuesta:
        'Sí. El sistema trabaja 24/7. Tu tiempo se concentra en llamadas calificadas y entregables; nosotros manejamos anuncios, CRO, datos y ajustes.',
    },
    {
      id: 'q6',
      pregunta: '¿Qué necesito preparar de mi lado?',
      respuesta:
        'Accesos (ads/analytics/calendly/whatsapp), breve cuestionario, disponibilidad para grabar la VSL con nuestro guion y un testimonio o caso si tenés. Nosotros hacemos el resto.',
    },
    {
      id: 'q7',
      pregunta: '¿Hay contrato de permanencia o puedo pausar?',
      respuesta:
        'Trabajamos por ciclos mensuales con objetivos claros. Si no te suma, podés pausar; retenemos por resultados, no por cláusulas.',
    },
    {
      id: 'q8',
      pregunta: '¿Qué pasa si entran leads curiosos o poco calificados?',
      respuesta:
        'Calificamos en página (pre-preguntas) y optimizamos creatividades/segmentación para elevar la calidad de agenda.',
    },
    {
      id: 'q12',
      pregunta: '¿Cuánto cuesta y qué incluye?',
      respuesta:
        'Incluye estrategia, guion VSL, setup de funnel, campañas, seguimiento de datos y optimización semanal. Ajustamos en la llamada según tu caso y volumen objetivo.',
    },
  ] as const;

  return (
    <main className="min-h-screen bg-[#07070A] text-white">
      {/* Fondo tipo landing: glow + grid/blur */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,59,0,0.25),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_20%_20%,rgba(255,176,0,0.18),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:54px_54px]" />
      </div>

      <section className="mx-auto max-w-[860px] px-4 py-10 md:py-14">
        {/* Header */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/20 bg-amber-400/10 px-3 py-2 text-[14px] text-amber-200">
            <svg
              className="h-5 w-5 fill-amber-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z" />
            </svg>
            <span>
              <strong>¡Último paso!</strong> Confirmá por WhatsApp para no perder tu cupo.
            </span>
          </p>

          <h1 className="text-[26px] font-extrabold leading-[115%] md:text-[32px]">
            Genial — ya casi estamos. Solo falta confirmar.
          </h1>
          <p className="mt-2 text-[15px] text-white/70">
            Marcá el checklist para habilitar el botón (tarda 2 minutos).
          </p>
        </div>

        {/* Checklist card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="mb-3 text-[16px] font-semibold">
            Checklist — habilita la confirmación:
          </p>

          <div className="space-y-3">
            <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#FF3B00]"
                checked={c1}
                onChange={(e) => setC1(e.target.checked)}
              />
              <span className="text-[15px] text-white/85">
                Voy a estar en un lugar tranquilo, sin interrupciones.
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#FF3B00]"
                checked={c2}
                onChange={(e) => setC2(e.target.checked)}
              />
              <span className="text-[15px] text-white/85">
                Me comprometo a llegar a tiempo (respeto el cupo y la agenda).
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#FF3B00]"
                checked={c3}
                onChange={(e) => setC3(e.target.checked)}
              />
              <span className="text-[15px] text-white/85">
                Si no puedo asistir, reprogramo con anticipación para liberar el lugar.
              </span>
            </label>
          </div>

          {/* CTA */}
          <div className="mt-5">
            <a
              className={[
                'block w-full rounded-xl px-5 py-3 text-center text-[15px] font-bold transition md:w-fit',
                canConfirm
                  ? 'bg-[#FF3B00] text-white hover:opacity-90 shadow-[0_14px_60px_rgba(255,59,0,0.25)]'
                  : 'bg-white/10 text-white/40 cursor-not-allowed',
              ].join(' ')}
              target="_blank"
              rel="noopener noreferrer"
              href={canConfirm ? waHref : undefined}
              aria-disabled={!canConfirm}
            >
              Confirmar mi asistencia por WhatsApp
            </a>

            <p className="mt-2 text-center text-[13px] text-red-300/90">
              Si no confirmás, tu llamada puede cancelarse y el sistema libera tu cupo.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h3 className="text-center text-[22px] font-extrabold leading-[115%] md:text-[26px]">
            Preguntas frecuentes
          </h3>

          <div className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-white/10"
                >
                  <AccordionTrigger className="text-left text-[16px] font-bold text-white/90">
                    {item.pregunta}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-white/75">
                    {item.respuesta}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="text-[15px] text-white/75">
            Si ya marcaste el checklist arriba, confirmá acá:
          </p>

          <a
            className={[
              'mt-4 block w-full rounded-xl px-5 py-3 text-center text-[15px] font-bold transition md:w-fit',
              canConfirm
                ? 'bg-[#FF3B00] text-white hover:opacity-90 shadow-[0_14px_60px_rgba(255,59,0,0.25)]'
                : 'bg-white/10 text-white/40 cursor-not-allowed',
            ].join(' ')}
            target="_blank"
            rel="noopener noreferrer"
            href={canConfirm ? waHref : undefined}
            aria-disabled={!canConfirm}
          >
            Confirmar mi asistencia por WhatsApp
          </a>

          <p className="mt-2 text-center text-[13px] text-white/55">
            Cupos limitados: si no confirmás, el sistema libera tu lugar automáticamente.
          </p>
        </div>
      </section>
    </main>
  );
}