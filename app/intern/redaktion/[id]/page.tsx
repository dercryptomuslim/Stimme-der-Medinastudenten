import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { aktuellesProfil, darfSchreiben } from "@/lib/supabase/mitglied";
import { type Beitrag } from "@/lib/intern";
import { BeitragForm } from "../beitrag-form";
import { LoeschenButton } from "../loeschen-button";
import { editorDaten } from "../daten";

export const dynamic = "force-dynamic";

export default async function BeitragBearbeitenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const profil = await aktuellesProfil();
  if (!darfSchreiben(profil)) {
    notFound();
  }

  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("beitrag")
    .select(
      "id, rubrik_slug, slug, titel, anriss, inhalt, veroeffentlicht, tags, geaendert_am"
    )
    .eq("id", id)
    .maybeSingle();

  const beitrag = data as Beitrag | null;
  if (!beitrag) {
    notFound();
  }

  const { rubriken, vorschlaege } = await editorDaten();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-2xl px-4 lg:px-8">
        <Link
          href="/intern/redaktion"
          className="mb-8 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Redaktion
        </Link>

        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="font-serif text-3xl font-bold text-slate-900">
            Beitrag bearbeiten
          </h1>
          <Link
            href={`/intern/${beitrag.rubrik_slug}/${beitrag.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-navy"
          >
            <Eye className="h-4 w-4" /> Ansehen
          </Link>
        </div>

        <BeitragForm
          rubriken={rubriken}
          vorschlaege={vorschlaege}
          werte={{
            id: beitrag.id,
            rubrik_slug: beitrag.rubrik_slug,
            slug: beitrag.slug,
            titel: beitrag.titel,
            anriss: beitrag.anriss ?? "",
            inhalt: beitrag.inhalt,
            veroeffentlicht: beitrag.veroeffentlicht,
            tags: beitrag.tags,
          }}
        />

        <div className="mt-10 border-t border-slate-200 pt-6">
          <LoeschenButton id={beitrag.id} />
        </div>
      </div>
    </section>
  );
}
