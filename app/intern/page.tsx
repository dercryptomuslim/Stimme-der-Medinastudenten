import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { aktuellesProfil, darfLesen } from "@/lib/supabase/mitglied";
import { type Rubrik } from "@/lib/intern";
import { RubrikIcon } from "@/components/rubrik-icon";
import { Suchfeld } from "@/components/suchfeld";

export const dynamic = "force-dynamic";

export default async function InternPage() {
  const profil = await aktuellesProfil();

  // Wer nicht freigegeben ist, sieht die Statusseite. Selbst wenn diese
  // Prüfung fehlschlüge, gäbe RLS keine Rubriken heraus.
  if (!darfLesen(profil)) {
    redirect("/intern/warteliste");
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("rubrik")
    .select("slug, titel, beschreibung, icon, reihenfolge")
    .order("reihenfolge");

  const rubriken = (data ?? []) as Rubrik[];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-4xl px-4 lg:px-8">
        <h1 className="mb-3 font-serif text-3xl font-bold text-slate-900 md:text-4xl">
          Willkommen{profil?.name ? `, ${profil.name}` : ""}
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          Praktische Informationen zum Leben in Medina – gesammelt von
          Studenten, die vor Ort sind.
        </p>

        <div className="mb-12">
          <Suchfeld />
        </div>

        {rubriken.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
            Es sind noch keine Rubriken angelegt.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {rubriken.map((rubrik) => (
                <Link
                  key={rubrik.slug}
                  href={`/intern/${rubrik.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 transition-colors group-hover:bg-gold/10">
                    <RubrikIcon name={rubrik.icon} className="h-6 w-6 text-gold" />
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-navy">
                    {rubrik.titel}
                  </h2>
                  {rubrik.beschreibung && (
                    <p className="mb-4 text-sm leading-relaxed text-slate-600">
                      {rubrik.beschreibung}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-all group-hover:gap-3">
                    Öffnen <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
