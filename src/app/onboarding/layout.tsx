import type { Metadata } from "next";

// Página privada: se comparte por link con el coach que entra, no se indexa.
export const metadata: Metadata = {
  title: "Onboarding · Fit Funnels Consulting",
  description: "Tu primer paso dentro de Fit Funnels Consulting.",
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
