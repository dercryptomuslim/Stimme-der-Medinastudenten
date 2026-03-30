import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Stimme der Medinastudenten e.V.",
  description: "Rechtliche Angaben und Impressum von Stimme der Medinastudenten e.V., Medina, Saudi-Arabien. Kontaktdaten und Angaben gemäß § 5 TMG.",
  alternates: {
    canonical: "/impressum",
  },
  openGraph: {
    title: "Impressum | Stimme der Medinastudenten e.V.",
    description: "Rechtliche Angaben und Impressum von Stimme der Medinastudenten e.V., Medina, Saudi-Arabien.",
    url: "https://www.stimme-medinastudenten.de/impressum",
    siteName: "Stimme der Medinastudenten",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Impressum | Stimme der Medinastudenten",
    description: "Rechtliche Angaben und Impressum von Stimme der Medinastudenten e.V.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col scroll-smooth">
      <Navbar />
      
      <section className="relative pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Impressum
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="prose prose-slate lg:prose-lg mx-auto">
            
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="text-slate-600 mb-8">
              Stimme der Medinastudenten e.V.<br />
              Medina<br />
              Saudi-Arabien
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Kontakt</h2>
            <p className="text-slate-600 mb-8">
              E-Mail: <a href="mailto:kontakt@stimme-medinastudenten.de" className="text-emerald-700 hover:underline">kontakt@stimme-medinastudenten.de</a>
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">EU-Streitschlichtung</h2>
            <p className="text-slate-600 mb-8">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                https://ec.europa.eu/consumers/odr/
              </a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p className="text-slate-600">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

