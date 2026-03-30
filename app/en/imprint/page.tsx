import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint | Voice of the Medina Students",
  description: "Legal information and imprint of Stimme der Medinastudenten e.V., Medina, Saudi Arabia. Contact details and legal notices.",
  alternates: {
    canonical: "/en/imprint",
    languages: {
      "de": "/impressum",
      "en": "/en/imprint",
    },
  },
  openGraph: {
    title: "Imprint | Voice of the Medina Students",
    description: "Legal information and imprint of Stimme der Medinastudenten e.V., Medina, Saudi Arabia.",
    url: "https://www.stimme-medinastudenten.de/en/imprint",
    siteName: "Voice of the Medina Students",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Imprint | Voice of the Medina Students",
    description: "Legal information and imprint of Stimme der Medinastudenten e.V.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImprintEnPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col scroll-smooth">
      <Navbar />

      <section className="relative pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Imprint</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="prose prose-slate lg:prose-lg mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Information pursuant to § 5 TMG</h2>
            <p className="text-slate-600 mb-8">
              Stimme der Medinastudenten e.V.
              <br />
              Medina
              <br />
              Saudi Arabia
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact</h2>
            <p className="text-slate-600 mb-8">
              Email:{" "}
              <a href="mailto:kontakt@stimme-medinastudenten.de" className="text-emerald-700 hover:underline">
                kontakt@stimme-medinastudenten.de
              </a>
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">EU online dispute resolution</h2>
            <p className="text-slate-600 mb-8">
              The European Commission provides a platform for online dispute resolution (ODR):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .
              <br />
              You can find our email address above.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Consumer dispute resolution / universal arbitration board
            </h2>
            <p className="text-slate-600">
              We are not willing or obliged to participate in dispute resolution proceedings before a
              consumer arbitration board.
            </p>
          </div>
        </div>
      </section>

      <Footer locale="en" />
    </main>
  );
}

