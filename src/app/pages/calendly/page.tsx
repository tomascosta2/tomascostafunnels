'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import { is } from "react-day-picker/locale";

/* =========================
   Helpers cookies / params
   ========================= */
function getCookieValue(cookieName: string) {
  try {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie || '');
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(name) === 0) return c.substring(name.length);
    }
  } catch { }
  return '';
}

function getQueryParam(name: string) {
  if (typeof window === 'undefined') return '';
  try {
    const url = new URL(window.location.href);
    return url.searchParams.get(name) || '';
  } catch {
    return '';
  }
}

/** Construye fbc si falta: fb.1.<timestamp>.<fbclid> */
function buildFbcIfMissing(): string | undefined {
  const cookieFbc = getCookieValue('_fbc') || getCookieValue('__fbc');
  if (cookieFbc) return cookieFbc;

  // robusto: buscar fbclid antes de #
  try {
    const href = window.location.href.split('#')[0];
    const match = href.match(/[?&]fbclid=([^&]+)/);
    const fbclid = match ? match[1] : null;
    if (!fbclid) return undefined;
    const ts = Date.now(); // Meta acepta ms también
    return `fb.1.${ts}.${fbclid}`;
  } catch {
    return undefined;
  }
}

/** Normaliza E.164 simple (preserva + si ya viene; sino quita no-dígitos y antepone +) */
function normalizePhoneE164(raw: string) {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (trimmed.startsWith('+')) return trimmed.replace(/\s+/g, '');
  const digits = trimmed.replace(/\D/g, '');
  return digits ? `+${digits}` : '';
}

export default function Calendly() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [frameLoaded, setFrameLoaded] = useState(false);
  const processedRef = useRef(false); // evita doble envío por múltiples postMessage

  // 1) Prefill desde localStorage (flujo del form)
  useEffect(() => {
    try {
      setName(localStorage.getItem('name') || '');
      setEmail(localStorage.getItem('email') || '');
      setPhone(localStorage.getItem('phone') || '');
    } catch { }
  }, []);

  // 2) Listener de Calendly (sin widget.js)
  useEffect(() => {
    const handleCalendlyEvent = async (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      if (!e?.data || typeof e.data !== 'object') return;

      interface CalendlyMessage { event?: string;[k: string]: unknown }
      const data = e.data as CalendlyMessage;
      const evt = typeof data?.event === 'string' ? data.event : '';

      if (!evt.startsWith('calendly.')) return;
      if (evt !== 'calendly.event_scheduled') return;

      if (processedRef.current) return; // evita duplicados
      processedRef.current = true;

      try {
        const n8nRes = await fetch('https://n8n.srv953925.hstgr.cloud/webhook/687876d3-0b32-431e-86d2-c3d37f5ae524', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        })
      } catch { }

      // 2b) Lee flag calificado (clave actual y fallback)
      const isQualified =
        localStorage.getItem('cf_isQualified') === 'true' ||
        localStorage.getItem('isQualified') === 'true';

      console.log(isQualified)

      // 2c) Cookies pixel
      const fbp = getCookieValue('_fbp') || getCookieValue('__fbp') || undefined;
      const fbc = buildFbcIfMissing();

      // 2d) ID único del evento
      const eventId = `schedule-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      // 2e) CAPI sólo si califica y tenemos email/phone normalizado
      if (isQualified) {
        const phoneE164 = normalizePhoneE164(phone);
        if (email && phoneE164) {
          const capiPayload = {
            email,
            phone: phoneE164,
            fbp,
            fbc,
            eventId,
            page_url: typeof window !== "undefined" ? window.location.href : undefined,
            page_referrer: typeof document !== "undefined" ? document.referrer : undefined,
          };

          try {
            const blob = new Blob([JSON.stringify(capiPayload)], { type: 'application/json' });
            const ok = navigator.sendBeacon?.('/api/track/qualified-shedule', blob);
            if (!ok) {
              // fallback
              fetch('/api/track/qualified-shedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(capiPayload),
                keepalive: true,
              }).catch(() => { });
            }
          } catch (err) {
            console.error('CAPI Schedule error:', err);
          }
        } else {
          console.warn('[Calendly] Falta email o phone normalizado; no se envía CAPI.');
        }
      }

      // 2f) Redirección a gracias
      setTimeout(() => {
        window.location.href = '/pages/thankyou';
      })
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [email, phone]);

  // 3) URL del iframe (prefill por querystring)
  const calendlyUrl = useMemo(() => {
    const base = 'https://calendly.com/tomascostapp/45min';
    const params = new URLSearchParams({
      hide_gdpr_banner: '1',
      embed_type: 'InlineWidget',
      embed_domain: typeof window !== 'undefined' ? window.location.hostname : '',
      name,
      email,
      primary_color: '1500ff',
    });
    return `${base}?${params.toString()}`;
  }, [name, email]);

  // 4) (Opcional) Lazy (dejado simple, montamos directo)
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <main>
      <section className="pt-8 pb-[80px] text-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <p className="text-orange-400 text-center mb-4 text-[14px]">(El Calendario puede demorar, si no carga reinicia la página)</p>
          <h1 className="text-[24px] md:text-[32px] font-bold leading-[120%] max-w-[800px] mb-8 mx-auto text-center">
            Agenda una llamada de 30 minutos para hablar sobre tu embudo de ventas
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:-order-1 order-2">
              <h2 className="text-[26px] font-bold leading-[120%] mb-8">
                Nuestros embudos han generado miles de llamadas para nuestros clientes
              </h2>
              <ul className="mb-8 text-[18px]">
                <li>✅ Analizamos tu caso particular.</li>
                <li>✅ Te contamos en detalle cómo funciona el embudo.</li>
                <li>✅ Determinamos objetivos y plazos del proyecto.</li>
              </ul>
              <div className="mt-8 hidden md:block">
                <img className="h-[32px] mt-8" src="/images/reviews-callfunnels.png" alt="Tomas Costa Funnels Reviews" />
              </div>
            </div>

            <div ref={containerRef} className="bg-white w-full min-h-[600px] rounded-lg overflow-clip relative">
              {!frameLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gray-100">
                  <div className="h-10 w-3/4 mx-auto mt-6 rounded bg-gray-200" />
                  <div className="h-6 w-1/2 mx-auto mt-4 rounded bg-gray-200" />
                  <div className="h-[560px] mt-6 mx-4 rounded-lg bg-gray-200" />
                </div>
              )}

              <iframe
                key={calendlyUrl}
                title="Calendly Inline"
                src={calendlyUrl}
                loading="eager"
                width="100%"
                height="800"
                className="w-full h-[800px] border-0"
                onLoad={() => setFrameLoaded(true)}
                referrerPolicy="no-referrer-when-downgrade"
                allow="clipboard-write; geolocation; microphone; camera"
              />
            </div>

            <div className="md:hidden block">
              <img className="h-[32px] mx-auto" src="/images/reviews-callfunnels.png" alt="Tomas Costa Funnels Reviews" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
