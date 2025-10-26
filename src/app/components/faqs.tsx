"use client";

import { useState } from "react";

// Types
type Faq = {
	pregunta: string;
	respuesta: string;
};

// Data (you can also pass this as a prop)
const faqs: Faq[] = [
  {
    pregunta:
      "¿Y si no tengo idea de diseño, embudos ni tecnología?",
    respuesta:
      "No te preocupes: nosotros nos encargamos de todo. Desde el análisis estratégico hasta el diseño y la automatización. Vos no tenés que saber de diseño, marketing ni programación — solo contános tu visión, nosotros la convertimos en embudo funcional.",
  },
  {
    pregunta:
      "¿Cómo sé que me va a dar resultados y no será plata tirada?",
    respuesta:
      "Porque trabajamos con base en datos: lanzamos, medimos, optimizamos (CRO) para mejorar continuamente y formar una relación a largo plazo con vos y tu negocio. Además, ya tenemos casos de éxito con más de 50 coaches e infoproductores que validan nuestra metodología.",
  },
  {
    pregunta:
      "¿Cuánto tiempo tarda y cuánto debo invertir para que funcione?",
    respuesta:
      "El proceso completo lleva desde el análisis hasta la optimización continua; en general trabajamos por fases con entregables claros. En cuanto a inversión, personalizamos según tu necesidad, pero te mostramos una propuesta con costos transparentes desde el inicio para que sepas lo que vas a recibir y cuándo.",
  },
];


export default function Faqs() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (idx: number) => {
		setOpenIndex((prev) => (prev === idx ? null : idx));
	};

	return (
		<div>
			<div
				className="max-w-[700px] mx-auto mt-8 grid gap-4 px-4"
				id="faq-container"
			>
				{faqs.map((item, index) => {
					const isOpen = openIndex === index;
					return (
						<div
							key={index}
							className="faq-item w-full cursor-pointer p-[20px] bg-[#050720] border border-[#0085FF]/20 rounded-[14px]"
							data-index={index}
							aria-expanded={isOpen}
							aria-controls={`faq-panel-${index}`}
							onClick={() => toggle(index)}
						>
							<button
								type="button"
								className="faq-question cursor-pointer w-full text-left font-semibold text-[18px] text-white flex justify-between items-center"
							>
								<span className="pe-8">{item.pregunta}</span>
								<div className="rounded-[10px] w-[35px] h-[35px] bg-[#0085FF]/30 min-w-[35px] flex items-center justify-center">
									<svg
										className={`faq-icon size-[14px] transition-all duration-300 ${isOpen ? "rotate-45" : ""
											}`}
										fill="#FFF"
										viewBox="0 0 448 512"
										aria-hidden="true"
									>
										<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
									</svg>
								</div>
							</button>

							{/* Answer */}
							<div
								id={`faq-panel-${index}`}
								role="region"
								aria-labelledby={`faq-header-${index}`}
								className={`faq-answer normal-case overflow-hidden duration-500 transition-all ${isOpen ? "max-h-[2000px]" : "max-h-0"
									}`}
							>
								<p className="text-white/80 text-[16px] leading-[150%] pt-[10px]">
									{item.respuesta}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
