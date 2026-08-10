import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { aktuellesProfil, darfLesen } from "@/lib/supabase/mitglied";
import { type Beitrag, type Rubrik } from "@/lib/intern";
import { RubrikIcon } from "@/components/rubrik-icon";

export const dynamic = "force-dynamic";

export default async function RubrikPage({
  params,
}: {
  params: Promise<{ rubrik: string }>;
}) {
  const profil = await aktuellesProfil();
  if (!darfLesen(profil)) {
    redirect("/intern/warteliste");
  }

  const { rubrik: slug } = await params;
  const supabase = await createClient();

  const { data: rubrikData } = await supabase
    .from("rubrik")
    .select("slug, titel, beschreibung, icon, reihenfolge")
    .eq("slug", slug)
    .maybeSingle();

  if (!rubrikData) {
    notFound();
  }

  const rubrik = rubrikData as Rubrik;

  // RLS filtert unveröffentlichte Beiträge für Mitglieder bereits heraus;
  // Redakteure sehen sie hier mit.
  const { data } = await supabase
    .from("beitrag")
    .select("id, rubrik_slug, slug, titel, anriss, inhalt, veroeffentlicht, geaendert_am")
    .eq("rubrik_slug", slug)
    .order("titel");

  const beitraege = (data ?? []) as Beitrag[];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <Link
          href="/intern"
          className="mb-8 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Übersicht
        </Link>

        <div className="mb-10 flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-navy/5">
            <RubrikIcon name={rubrik.icon} className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              {rubrik.titel}
            </h1>
            {rubrik.beschreibung && (
              <p className="mt-2 text-slate-600">{rubrik.beschreibung}</p>
            )}
          </div>
        </div>

        {beitraege.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-slate-600">
              In dieser Rubrik gibt es noch keine Beiträge.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {beitraege.map((beitrag) => (
              <article
                key={beitrag.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    {beitrag.titel}
                  </h2>
                  {!beitrag.veroeffentlicht && (
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                      Entwurf
                    </span>
                  )}
                </div>
                {beitrag.anriss && (
                  <p className="text-sm leading-relaxed text-slate-600">
                    {beitrag.anriss}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
