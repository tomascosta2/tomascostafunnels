// src/app/pages/thankyou/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';

export default function ThankYouPage() {
  const whatsappNumber = '542616841853';

  const [startAt, setStartAt] = useState<string>('');
  const [countdown, setCountdown] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      const s = q.get('startAt') || localStorage.getItem('meeting_startAt') || '';
      setStartAt(s);
    } catch {}
  }, []);

  useEffect(() => {
    if (!startAt) return;
    const update = () => {
      const diff = new Date(startAt).getTime() - Date.now();
      if (diff <= 0) { setCountdown(null); return; }
      setCountdown({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startAt]);

  const waText = useMemo(() => {
    const msg =
      '¡Hola! Confirmo mi asistencia a la llamada ✅\n\n' +
      '¿Me confirmás si quedó todo OK?';
    return encodeURIComponent(msg);
  }, []);

  const waHref = `https://wa.me/${whatsappNumber}?text=${waText}`;

  return (
    <main className="min-h-screen bg-[#07070A] text-white relative overflow-hidden">
      <div className="bg-[#E34716] left-[calc(50%-150px)] -top-[150px] absolute blur-[300px] size-[300px] rounded-full pointer-events-none"></div>

      <section className="mx-auto max-w-[640px] px-4 py-16 md:py-24 relative">
        <h1 className="text-center text-[28px] md:text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-balance">
          Tu llamada está <span className="text-[#E34716]">agendada</span>, confirmá por WhatsApp
        </h1>

        {countdown && (
          <div className="mt-10 relative">
            <div className="absolute -inset-px bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent rounded-3xl pointer-events-none"></div>
            <div className="relative bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-sm p-8 rounded-3xl">
              <p className="text-[12px] text-white/40 uppercase tracking-[0.18em] font-medium text-center mb-5">
                Tu llamada empieza en
              </p>
              <div className="flex justify-center gap-3 md:gap-4">
                {[
                  { val: countdown.d, label: 'días' },
                  { val: countdown.h, label: 'horas' },
                  { val: countdown.m, label: 'min' },
                  { val: countdown.s, label: 'seg' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className="w-[64px] md:w-[72px] h-[64px] md:h-[72px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.08] rounded-xl flex items-center justify-center">
                      <span className="text-white text-[26px] md:text-[30px] font-bold tabular-nums tracking-tight">
                        {String(item.val).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-[11px] text-white/40 mt-2 uppercase tracking-[0.1em]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              {startAt && (
                <p className="text-center text-[14px] text-white/55 mt-6">
                  {new Date(startAt).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })} a las {new Date(startAt).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <a
            className="tcf-btn group"
            target="_blank"
            rel="noopener noreferrer"
            href={waHref}
          >
            <span className="relative">Confirmar por WhatsApp</span>
          </a>
        </div>
      </section>
    </main>
  );
}
