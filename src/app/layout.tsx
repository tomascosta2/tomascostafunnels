import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fontsource-variable/montserrat';
import '@fontsource-variable/inter';

export const metadata: Metadata = {
  title: "Tomás Costa Funnels - Embudos de venta para coaches fitness, nutricionistas y psicologos online",
  description: "Embudos de venta para coaches fitness, nutricionistas y psicologos online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
