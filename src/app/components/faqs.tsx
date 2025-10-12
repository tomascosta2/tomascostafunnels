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
			"¿Pregunta?",
		respuesta:
			"Respuesta",
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
								className="faq-question cursor-pointer w-full text-left font-semibold text-[18px] md:text-[20px] text-white flex justify-between items-center"
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
								<p className="text-white/80 text-[18px] pt-[10px]">
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
