import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { aktuellesProfil, darfSchreiben } from "@/lib/supabase/mitglied";
import { BeitragForm } from "../beitrag-form";
import { editorDaten } from "../daten";

export const dynamic = "force-dynamic";

export default async function NeuerBeitragPage() {
  const profil = await aktuellesProfil();
  if (!darfSchreiben(profil)) {
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

        <h1 className="mb-8 font-serif text-3xl font-bold text-slate-900">
          Neuer Beitrag
        </h1>

        <BeitragForm rubriken={rubriken} vorschlaege={vorschlaege} />
      </div>
    </section>
  );
}
