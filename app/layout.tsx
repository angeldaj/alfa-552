import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { HERO_SRC } from "@/components/alfa/images";

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CIA ALFA 552 · Centro de Instrucción Aeronáutica",
  description:
    "Formamos técnicos de mantenimiento aeronáutico, tripulantes de cabina, despachadores de vuelo y, próximamente, pilotos, bajo las Regulaciones Aeronáuticas Venezolanas. INAC, CIAC 552.",
};

// Runs before first paint so the theme is correct with no flash.
const THEME_INIT = `try{var t=localStorage.getItem('alfa-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="dark"
      className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Runs before body content paints — corrects theme with no flash */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        {/* React 19 hoists this preload into <head> for hero LCP */}
        <link rel="preload" as="image" href={HERO_SRC} fetchPriority="high" />
        {children}
      </body>
    </html>
  );
}
