import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { aktuellesProfil, darfLesen, darfSchreiben } from "@/lib/supabase/mitglied";
import { type Beitrag, type Rubrik } from "@/lib/intern";
import { Markdown } from "@/components/markdown";
import { TagListe } from "@/components/tag-liste";

export const dynamic = "force-dynamic";

export default async function BeitragPage({
  params,
}: {
  params: Promise<{ rubrik: string; slug: string }>;
}) {
  const profil = await aktuellesProfil();
  if (!darfLesen(profil)) {
    redirect("/intern/warteliste");
  }

  const { rubrik: rubrikSlug, slug } = await params;
  const supabase = await createClient();

  // Beitrag und Rubrik parallel laden. RLS gibt einen Entwurf nur Redakteuren
  // heraus – für alle anderen liefert die Abfrage nichts und wir zeigen 404.
  const [beitragRes, rubrikRes] = await Promise.all([
    supabase
      .from("beitrag")
      .select(
        "id, rubrik_slug, slug, titel, anriss, inhalt, veroeffentlicht, tags, geaendert_am"
      )
      .eq("rubrik_slug", rubrikSlug)
      .eq("slug", slug)
      .maybeSingle(),
    supabase
      .from("rubrik")
      .select("slug, titel, beschreibung, icon, reihenfolge")
      .eq("slug", rubrikSlug)
      .maybeSingle(),
  ]);

  const beitrag = beitragRes.data as Beitrag | null;
  const rubrik = rubrikRes.data as Rubrik | null;

  if (!beitrag || !rubrik) {
    notFound();
  }

  return (
    <article className="py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <Link
          href={`/intern/${rubrik.slug}`}
          className="mb-8 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {rubrik.titel}
        </Link>

        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h1 className="font-serif text-3xl font-bold text-slate-900 md:text-4xl">
              {beitrag.titel}
            </h1>
            {!beitrag.veroeffentlicht && (
              <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                Entwurf
              </span>
            )}
          </div>
          <TagListe tags={beitrag.tags} />
          {darfSchreiben(profil) && (
            <Link
              href={`/intern/redaktion/${beitrag.id}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-navy"
            >
              <Pencil className="h-4 w-4" /> Bearbeiten
            </Link>
          )}
        </header>

        <Markdown>{beitrag.inhalt}</Markdown>
      </div>
    </article>
  );
}
