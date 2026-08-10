import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Hash } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { aktuellesProfil, darfLesen } from "@/lib/supabase/mitglied";
import { tagLabel, type Beitrag } from "@/lib/intern";
import { TagListe } from "@/components/tag-liste";

export const dynamic = "force-dynamic";

export default async function ThemaPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const profil = await aktuellesProfil();
  if (!darfLesen(profil)) {
    redirect("/intern/warteliste");
  }

  const { tag } = await params;
  const supabase = await createClient();

  // Alle sichtbaren Beiträge mit diesem Tag, rubrikübergreifend.
  const { data } = await supabase
    .from("beitrag")
    .select(
      "id, rubrik_slug, slug, titel, anriss, inhalt, veroeffentlicht, tags, geaendert_am"
    )
    .contains("tags", [tag])
    .order("geaendert_am", { ascending: false });

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

        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-navy/5">
            <Hash className="h-6 w-6 text-gold" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">
            {tagLabel(tag)}
          </h1>
        </div>

        {beitraege.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-slate-600">
              Zu diesem Thema gibt es noch keine Beiträge.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {beitraege.map((beitrag) => (
              <Link
                key={beitrag.id}
                href={`/intern/${beitrag.rubrik_slug}/${beitrag.slug}`}
                className="group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-2 flex items-center gap-3">
                  <h2 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-navy">
                    {beitrag.titel}
                  </h2>
                  {!beitrag.veroeffentlicht && (
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                      Entwurf
                    </span>
                  )}
                </div>
                {beitrag.anriss && (
                  <p className="mb-3 text-sm leading-relaxed text-slate-600">
                    {beitrag.anriss}
                  </p>
                )}
                <div className="flex items-center justify-between gap-4">
                  <TagListe tags={beitrag.tags} />
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-navy" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
