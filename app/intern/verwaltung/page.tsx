import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { aktuellesProfil, istAdmin, type Profil } from "@/lib/supabase/mitglied";
import { statusSetzen } from "./actions";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  wartend: "Wartet",
  freigegeben: "Freigegeben",
  abgelehnt: "Abgelehnt",
};

const STATUS_STIL: Record<string, string> = {
  wartend: "bg-amber-100 text-amber-800",
  freigegeben: "bg-emerald-100 text-emerald-800",
  abgelehnt: "bg-slate-200 text-slate-700",
};

export default async function VerwaltungPage() {
  const profil = await aktuellesProfil();

  // Kein redirect: wer kein Admin ist, soll nicht einmal erfahren,
  // dass es diese Seite gibt.
  if (!istAdmin(profil)) {
    notFound();
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("profile")
    .select("id, email, name, status, rolle, erstellt_am")
    .order("erstellt_am", { ascending: false });

  const mitglieder = (data ?? []) as Profil[];
  const wartend = mitglieder.filter((m) => m.status === "wartend");
  const uebrige = mitglieder.filter((m) => m.status !== "wartend");

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-4 lg:px-8">
        <Link
          href="/intern"
          className="mb-8 inline-flex items-center text-sm text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Übersicht
        </Link>

        <h1 className="mb-2 font-serif text-3xl font-bold text-slate-900">
          Verwaltung
        </h1>
        <p className="mb-10 text-slate-600">
          {wartend.length === 0
            ? "Keine offenen Anfragen."
            : `${wartend.length} Anfrage${wartend.length === 1 ? "" : "n"} wartet auf Freigabe.`}
        </p>

        {wartend.length > 0 && (
          <div className="mb-12 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gold">
              Offen
            </h2>
            {wartend.map((m) => (
              <div
                key={m.id}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">{m.email}</p>
                  <p className="text-sm text-slate-500">
                    Registriert am{" "}
                    {new Date(m.erstellt_am).toLocaleDateString("de-DE")}
                  </p>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <form action={statusSetzen}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="status" value="freigegeben" />
                    <Button
                      type="submit"
                      className="bg-slate-900 text-white hover:bg-slate-800"
                    >
                      Freigeben
                    </Button>
                  </form>
                  <form action={statusSetzen}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="status" value="abgelehnt" />
                    <Button
                      type="submit"
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      Ablehnen
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
          Alle Konten
        </h2>
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-200">
              {uebrige.map((m) => (
                <tr key={m.id} className="bg-white">
                  <td className="px-4 py-3">
                    <span className="block truncate text-slate-900">
                      {m.email}
                    </span>
                    <span className="text-xs text-slate-500">{m.rolle}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`rounded px-2 py-1 text-xs font-semibold ${STATUS_STIL[m.status]}`}
                    >
                      {STATUS_LABEL[m.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {m.status === "freigegeben" && m.id !== profil!.id && (
                      <form action={statusSetzen}>
                        <input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="status" value="abgelehnt" />
                        <button
                          type="submit"
                          className="text-xs text-slate-500 underline hover:text-red-700"
                        >
                          Zugang entziehen
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
