import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "./alfa.css";
import { HERO_SRC } from "@/components/alfa/images";
import { ChatWidget } from "@/components/alfa/chatbot/chat-widget";
import { SITE_URL } from "@/lib/seo/site";

// Geist: neutral, modern grotesque. Premium and highly legible in UI and
// headlines. Paired with IBM Plex Mono for the technical/aviation texture.
const sans = Geist({
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

const SITE_TITLE = {
  default: "CIA ALFA 552 · Centro de Instrucción Aeronáutica",
  template: "%s · CIA ALFA 552",
};
const SITE_DESCRIPTION =
  "Formamos técnicos de mantenimiento, tripulantes de cabina, despachadores de vuelo y pilotos bajo las Regulaciones Aeronáuticas Venezolanas. INAC · CIAC 552.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_VE",
    siteName: "CIA ALFA 552",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "CIA ALFA 552",
  alternateName: "Centro de Instrucción Aeronáutica ALFA 552",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  identifier: "CIAC 552",
};

// Runs before first paint so the theme is correct with no flash.
const THEME_INIT = `try{var t=localStorage.getItem('alfa-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="dark"
      className={`${sans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {/* Runs before body content paints — corrects theme with no flash */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        {/* React 19 hoists this preload into <head> for hero LCP */}
        <link rel="preload" as="image" href={HERO_SRC} fetchPriority="high" />
        {children}
        {/* Global fake assistant, rides above every route via the root layout */}
        <ChatWidget />
      </body>
    </html>
  );
}
