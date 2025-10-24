'use client'

import { useEffect, useMemo, useRef, useState } from "react";

function getCookieValue(cookieName: string) {
	const name = cookieName + '=';
	const decodedCookie = decodeURIComponent(document.cookie || '');
	const ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		const c = ca[i].trim();
		if (c.indexOf(name) === 0) return c.substring(name.length);
	}
	return '';
}

function getQueryParam(name: string) {
	if (typeof window === 'undefined') return '';
	const url = new URL(window.location.href);
	return url.searchParams.get(name) || '';
}

function buildFbcIfMissing(): string | undefined {
	const cookieFbc = getCookieValue('_fbc');
	if (cookieFbc) return cookieFbc;
	const fbclid = getQueryParam('fbclid');
	if (!fbclid) return undefined;
	const ts = Math.floor(Date.now() / 1000);
	return `fb.1.${ts}.${fbclid}`;
}

function normalizePhoneE164(raw: string) {
	if (!raw) return '';
	const digits = raw.replace(/\D/g, '');
	if (!digits) return '';
	// si ya viene con +, respetamos; si no, anteponemos +
	return raw.trim().startsWith('+') ? raw.trim() : `+${digits}`;
}

export default function Calendly() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [frameLoaded, setFrameLoaded] = useState(false);

	// 1) Prefill desde localStorage (tu flujo actual)
	useEffect(() => {
		setName(localStorage.getItem('name') || '');
		setEmail(localStorage.getItem('email') || '');
		setPhone(localStorage.getItem('phone') || '');
	}, []);

	// 2) Listener de Calendly (sin widget.js)
	useEffect(() => {
		const handleCalendlyEvent = async (e: MessageEvent) => {
			// origen de Calendly:
			if (e.origin !== 'https://calendly.com') return;
			// estructura del mensaje:
			if (!e?.data || typeof e.data !== 'object') return;
			interface CalendlyMessage {
				event?: string;
				[key: string]: unknown;
			}

			const data = e.data as CalendlyMessage;
			const evt = data?.event ?? "";

			if (typeof evt !== 'string' || !evt.startsWith('calendly.')) return;
			if (evt !== 'calendly.event_scheduled') return;

			// ping a make (tu hook)
			fetch('https://hook.us2.make.com/jxwzmi4n62c3nfmie24ti5aoe4o8ukuk', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			}).catch(err => console.error('Tracking error:', err));

			// lee flag calificado (clave correcta):
			const isQualified =
				localStorage.getItem('cf_isQualified') === 'true' ||
				localStorage.getItem('isQualified') === 'true'; // fallback por si quedó la vieja

			console.log('CALIFICADO:', isQualified);

			// cookies pixel
			const fbp = getCookieValue('_fbp') || undefined;
			const fbc = buildFbcIfMissing();

			const eventId = `schedule-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

			// 1) CAPI (tu route) solo si califica Y tenemos email/phone
			if (isQualified) {
				const phoneE164 = normalizePhoneE164(phone);
				if (email && phoneE164) {
					fetch('/api/track/qualified-shedule', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							email,
							phone: phoneE164,
							fbp,
							fbc,
							eventId,
						}),
					}).catch(err => console.error('CAPI Schedule error:', err));
				} else {
					console.warn('[Calendly] Falta email o phone normalizado; no se envía CAPI.');
				}

			}
			
			window.location.href = '/pages/thankyou';
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

	// 4) (Opcional) Lazy
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [canMountIframe, setCanMountIframe] = useState(true);

	return (
		<main>
			<section className="pt-8 pb-[80px] text-white">
				<div className="max-w-[1200px] mx-auto px-4">
					<h1 className="text-[24px] md:text-[32px] font-bold leading-[120%] max-w-[800px] mb-8 mx-auto text-center">
						Agenda una llamada de 45 minutos para hablar sobre tu embudo de ventas
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

							{canMountIframe && (
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
							)}
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
