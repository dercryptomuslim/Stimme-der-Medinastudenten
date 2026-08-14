import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, SearchX } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { aktuellesProfil, darfLesen } from "@/lib/supabase/mitglied";
import { type Rubrik, type Suchtreffer } from "@/lib/intern";
import { Suchfeld } from "@/components/suchfeld";
import { SuchAuszug } from "@/components/such-auszug";
import { TagListe } from "@/components/tag-liste";

export const dynamic = "force-dynamic";

export default async function SuchePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const profil = await aktuellesProfil();
  if (!darfLesen(profil)) {
    redirect("/intern/warteliste");
  }

  const { q } = await searchParams;
  const suchbegriff = (q ?? "").trim();

  const supabase = await createClient();

  // Ohne Suchbegriff gar nicht erst abfragen.
  const [trefferRes, rubrikRes] = await Promise.all([
    suchbegriff
      ? supabase.rpc("beitrag_suchen", { suchbegriff })
      : Promise.resolve({ data: [] as Suchtreffer[], error: null }),
    supabase.from("rubrik").select("slug, titel, beschreibung, icon, reihenfolge"),
  ]);

  if (trefferRes.error) {
    console.error("Suche fehlgeschlagen:", trefferRes.error.message);
  }

  const treffer = (trefferRes.data ?? []) as Suchtreffer[];
  const rubriken = (rubrikRes.data ?? []) as Rubrik[];
  const rubrikTitel = new Map(rubriken.map((r) => [r.slug, r.titel]));

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <Link
          href="/intern"
          className="mb-8 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Übersicht
        </Link>

        <h1 className="mb-6 font-serif text-3xl font-bold text-slate-900">
          Suche
        </h1>

        <div className="mb-10">
          <Suchfeld standardwert={suchbegriff} autoFocus={!suchbegriff} />
        </div>

        {!suchbegriff ? (
          <p className="text-slate-600">
            Gib oben ein Stichwort ein. Gesucht wird in Titeln, Kurzbeschreibungen,
            Tags und im gesamten Text aller Beiträge.
          </p>
        ) : trefferRes.error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-red-800">
              Die Suche ist gerade nicht verfügbar. Bitte versuche es später
              erneut.
            </p>
          </div>
        ) : treffer.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <SearchX className="mx-auto mb-3 h-8 w-8 text-slate-400" />
            <p className="mb-2 font-medium text-slate-700">
              Nichts gefunden zu „{suchbegriff}“
            </p>
            <p className="text-sm text-slate-500">
              Versuch es mit einem anderen Wort — oder trag das Wissen selbst
              ein, wenn es noch fehlt.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-slate-500">
              {treffer.length}{" "}
              {treffer.length === 1 ? "Treffer" : "Treffer"} zu „{suchbegriff}“
            </p>

            <div className="space-y-4">
              {treffer.map((t) => (
                <Link
                  key={t.id}
                  href={`/intern/${t.rubrik_slug}/${t.slug}`}
                  className="group block rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-1 flex items-center gap-3">
                    <h2 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-navy">
                      {t.titel}
                    </h2>
                    {!t.veroeffentlicht && (
                      <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                        Entwurf
                      </span>
                    )}
                  </div>

                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gold">
                    {rubrikTitel.get(t.rubrik_slug) ?? t.rubrik_slug}
                  </p>

                  <SuchAuszug text={t.auszug} />

                  <div className="mt-3 flex items-center justify-between gap-4">
                    <TagListe tags={t.tags} />
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-navy" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
