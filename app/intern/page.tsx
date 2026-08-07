import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Users, Car, MapPin, Lock } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { INTERN_VORSCHAU, RUBRIKEN } from "@/lib/intern";

const ICONS = { Users, Car, MapPin } as const;

export const metadata: Metadata = {
  title: "Interner Bereich | Stimme der Medinastudenten",
  // Der interne Bereich gehört unter keinen Umständen in einen Suchindex.
  robots: { index: false, follow: false },
};

export default function InternPage() {
  // Ohne Anmeldung darf nichts erreichbar sein, das nach einem
  // Mitgliederbereich aussieht. Sobald Supabase angebunden ist, ersetzt die
  // Sessionprüfung diese Abfrage.
  if (!INTERN_VORSCHAU) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <section className="pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="mb-8 rounded-lg border-2 border-dashed border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Strukturvorschau.</strong> Es gibt noch keine Anmeldung und
            keine Inhalte. Diese Seite zeigt nur, wie der interne Bereich
            aufgebaut sein wird.
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5">
              <Lock className="h-5 w-5 text-gold" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wide text-gold">
              Nur für Mitglieder
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Interner Bereich
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Praktische Informationen zum Leben in Medina – gesammelt von
            Studenten, die vor Ort sind.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            {RUBRIKEN.map((rubrik) => {
              const Icon = ICONS[rubrik.icon];
              return (
                <div
                  key={rubrik.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-slate-900">
                    {rubrik.titel}
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-slate-600">
                    {rubrik.beschreibung}
                  </p>
                  <ul className="space-y-2">
                    {rubrik.geplant.map((thema) => (
                      <li
                        key={thema}
                        className="flex items-start gap-2 text-sm text-slate-500"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                        {thema}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="mb-3 text-xl font-serif font-bold text-slate-900">
              Wie der Zugang funktionieren wird
            </h2>
            <ol className="space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="font-bold text-gold">1.</span>
                E-Mail-Adresse eintragen. Es gibt kein Passwort – die Anmeldung
                läuft über einen Link, der per E-Mail zugeschickt wird.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gold">2.</span>
                Die Registrierung landet auf einer Warteliste.
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-gold">3.</span>
                Das Team gibt den Zugang von Hand frei. Erst danach werden
                Inhalte sichtbar.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
