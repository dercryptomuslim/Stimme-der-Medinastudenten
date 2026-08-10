import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";
import { aktuellesProfil } from "@/lib/supabase/mitglied";
import { KontoForm } from "./konto-form";

export const dynamic = "force-dynamic";

/**
 * Bewusst ohne Freigabe-Prüfung: Auch wer noch auf der Warteliste steht,
 * darf das eigene Passwort ändern – das Konto gehört der Person, nicht dem
 * Freigabestatus. Die Anmeldung selbst erzwingt die Middleware.
 */
export default async function KontoPage() {
  const profil = await aktuellesProfil();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-md px-4 lg:px-8">
        <Link
          href="/intern"
          className="mb-8 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Übersicht
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5">
            <KeyRound className="h-6 w-6 text-gold" />
          </div>
          <h1 className="mb-2 font-serif text-3xl font-bold text-slate-900">
            Konto
          </h1>
          {profil && (
            <p className="text-slate-600">
              Angemeldet als <strong>{profil.email}</strong>
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-lg font-bold text-slate-900">
            Passwort ändern
          </h2>
          <KontoForm />
        </div>

        <p className="mt-6 text-sm leading-relaxed text-slate-500">
          Wenn du dein Startpasswort vom Team erhalten hast, ändere es hier
          bitte bei der ersten Gelegenheit.
        </p>
      </div>
    </section>
  );
}
