import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { CookieConsent } from "@/components/cookie-consent";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Stimme der Medinastudenten | Studenten der Islamischen Universität Medina",
  description:
    "Wir sind Studenten und Absolventen der Islamischen Universität in Medina aus dem deutschsprachigen Raum – Deutschland, Österreich und der Schweiz.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Islamische Universität Medina",
    "Studium Medina",
    "Medinastudenten",
    "DACH",
    "Islamwissenschaften",
    "Arabisch lernen",
    "Studium Saudi-Arabien",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Stimme der Medinastudenten | Islamische Universität Medina",
    description:
      "Wir sind Studenten und Absolventen der Islamischen Universität in Medina aus dem deutschsprachigen Raum – Deutschland, Österreich und der Schweiz.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stimme der Medinastudenten | Islamische Universität Medina",
    description:
      "Wir sind Studenten und Absolventen der Islamischen Universität in Medina aus dem deutschsprachigen Raum – Deutschland, Österreich und der Schweiz.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": SITE_NAME,
  "url": SITE_URL,
  "description": "Studenten und Absolventen der Islamischen Universität in Medina aus dem deutschsprachigen Raum (DACH).",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Medina",
    "addressCountry": "SA"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Germany"
    },
    {
      "@type": "Country",
      "name": "Austria"
    },
    {
      "@type": "Country",
      "name": "Switzerland"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "general",
    "availableLanguage": ["German", "Arabic"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        {/* Schema.org Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-slate-900`}
      >
        <AnalyticsProvider>{children}</AnalyticsProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
