import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice of the Medina Students | Islamic University of Madinah",
  description:
    "We are students and graduates of the Islamic University of Madinah from Germany, Austria, and Switzerland.",
  alternates: {
    canonical: "/en",
  },
  keywords: [
    "Islamic University Madinah",
    "Study in Medina",
    "Medina Students",
    "DACH",
    "Islamic Sciences",
    "Learn Arabic",
    "Study Saudi Arabia",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.stimme-medinastudenten.de/en",
    siteName: "Voice of the Medina Students",
    title: "Voice of the Medina Students | Islamic University of Madinah",
    description:
      "We are students and graduates of the Islamic University of Madinah from Germany, Austria, and Switzerland.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice of the Medina Students | Islamic University of Madinah",
    description:
      "We are students and graduates of the Islamic University of Madinah from Germany, Austria, and Switzerland.",
  },
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
