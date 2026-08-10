import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { aktuellesProfil, darfSchreiben } from "@/lib/supabase/mitglied";
import { type Beitrag, type Rubrik } from "@/lib/intern";

export const dynamic = "force-dynamic";

export default async function RedaktionPage() {
  const profil = await aktuellesProfil();

  // Kein redirect: Wer nicht schreiben darf, soll die Seite gar nicht kennen.
  if (!darfSchreiben(profil)) {
    notFound();
  }

  const supabase = await createClient();
  const [beitragRes, rubrikRes] = await Promise.all([
    supabase
      .from("beitrag")
      .select(
        "id, rubrik_slug, slug, titel, anriss, inhalt, veroeffentlicht, tags, geaendert_am"
      )
      .order("geaendert_am", { ascending: false }),
    supabase
      .from("rubrik")
      .select("slug, titel, beschreibung, icon, reihenfolge"),
  ]);

  const beitraege = (beitragRes.data ?? []) as Beitrag[];
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

        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="font-serif text-3xl font-bold text-slate-900">
            Redaktion
          </h1>
          <Button
            asChild
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            <Link href="/intern/redaktion/neu">
              <Plus className="mr-1.5 h-4 w-4" /> Neuer Beitrag
            </Link>
          </Button>
        </div>

        {beitraege.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-slate-600">
              Noch keine Beiträge. Lege den ersten an.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-200">
                {beitraege.map((b) => (
                  <tr key={b.id} className="bg-white">
                    <td className="px-4 py-3">
                      <Link
                        href={`/intern/redaktion/${b.id}`}
                        className="font-medium text-slate-900 hover:text-navy"
                      >
                        {b.titel}
                      </Link>
                      <span className="block text-xs text-slate-500">
                        {rubrikTitel.get(b.rubrik_slug) ?? b.rubrik_slug}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {b.veroeffentlicht ? (
                        <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-800">
                          Veröffentlicht
                        </span>
                      ) : (
                        <span className="rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                          Entwurf
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
