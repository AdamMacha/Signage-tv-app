import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#121211",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://alionadvert.cz"),
  title: "ALION Advert | Prémiová síť digitální reklamy na obrazovkách",
  description:
    "Propojujeme firmy s frekventovanými místy. Získejte novou vlnu zákazníků díky reklamním spotům v kavárnách, hotelech a fitness centrech, nebo umístěte obrazovku a získejte pasivní provizi.",
  keywords: [
    "digitální reklama",
    "reklama na obrazovkách",
    "digital signage",
    "reklamní obrazovky",
    "reklamní plochy",
    "reklama v Praze",
    "reklamní síť",
    "pronájem reklamní obrazovky",
    "reklama v kavárnách",
    "reklama ve fitness",
    "inzerce pro firmy",
    "pasivní příjem z televize",
  ],
  authors: [{ name: "ALION Advert" }],
  creator: "ALION Advert",
  publisher: "ALION Advert",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://alionadvert.cz",
    siteName: "ALION Advert",
    title: "ALION Advert | Vaše reklama. Na správném místě. Ve správný čas.",
    description:
      "Moderní síť reklamních obrazovek po celé České republice. Prémiová venkovní reklama v kavárnách, fitness a hotelech.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ALION Advert Digital Signage Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALION Advert | Prémiová síť digitální reklamy",
    description:
      "Proměňujeme obrazovky v reklamní prostor. Reklama pro firmy a pravidelná provize pro majitele lokalit.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ALION Advert",
    url: "https://alionadvert.cz",
    logo: "https://alionadvert.cz/favicon.ico",
    description: "Moderní síť reklamních digitálních obrazovek (digital signage) v České republice.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@alionadvert.cz",
      contactType: "customer service",
      areaServed: "CZ",
      availableLanguage: "Czech",
    },
  };

  return (
    <html
      lang="cs"
      className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable} dark antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[oklch(13%_0.005_60)] text-[oklch(96%_0.01_80)] selection:bg-[oklch(78%_0.13_84)] selection:text-black">
        {children}
      </body>
    </html>
  );
}
