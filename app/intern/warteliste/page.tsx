import { redirect } from "next/navigation";
import { Clock, XCircle } from "lucide-react";
import { aktuellesProfil, darfLesen } from "@/lib/supabase/mitglied";

export const dynamic = "force-dynamic";

export default async function WartelistePage() {
  const profil = await aktuellesProfil();

  if (darfLesen(profil)) {
    redirect("/intern");
  }

  const abgelehnt = profil?.status === "abgelehnt";

  return (
    <section className="flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          {abgelehnt ? (
            <XCircle className="h-7 w-7 text-slate-500" />
          ) : (
            <Clock className="h-7 w-7 text-gold" />
          )}
        </div>

        {abgelehnt ? (
          <>
            <h1 className="mb-4 font-serif text-2xl font-bold text-slate-900 md:text-3xl">
              Kein Zugang
            </h1>
            <p className="leading-relaxed text-slate-600">
              Für dieses Konto wurde kein Zugang zum internen Bereich erteilt.
              Wenn du das für einen Irrtum hältst, melde dich über das
              Kontaktformular.
            </p>
          </>
        ) : (
          <>
            <h1 className="mb-4 font-serif text-2xl font-bold text-slate-900 md:text-3xl">
              Dein Zugang wird geprüft
            </h1>
            <p className="mb-6 leading-relaxed text-slate-600">
              Dein Konto steht auf der Warteliste. Neue Zugänge geben wir von
              Hand frei – das dauert in der Regel ein bis zwei Tage. Sobald es
              soweit ist, kannst du dich hier anmelden und siehst alle Inhalte.
            </p>
            {profil && (
              <p className="text-sm text-slate-500">
                Registriert mit <strong>{profil.email}</strong>
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
