import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import { INTERN_ENABLED } from "@/lib/supabase/config";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Anmelden | Stimme der Medinastudenten",
  robots: { index: false, follow: false },
};

// Die Seite liest searchParams und ist damit ohnehin nicht statisch.
export const dynamic = "force-dynamic";

const FEHLERTEXTE: Record<string, string> = {
  abgelaufen:
    "Der Anmeldelink ist abgelaufen oder wurde bereits verwendet. Bitte fordere einen neuen an.",
  kein_code:
    "Der Aufruf war unvollständig. Bitte fordere einen neuen Anmeldelink an.",
};

/**
 * Bewusst ohne die normale Navbar: die Anmeldung soll nicht in die
 * Marketing-Navigation eingebettet sein. Nebeneffekt – das Radix-Sheet der
 * mobilen Navigation vergibt seine IDs je nach Renderpfad unterschiedlich
 * und verursachte hier Hydration-Abweichungen.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ weiter?: string; fehler?: string }>;
}) {
  if (!INTERN_ENABLED) {
    notFound();
  }

  const { weiter, fehler } = await searchParams;
  const ziel =
    weiter?.startsWith("/") && !weiter.startsWith("//") ? weiter : "/intern";

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex h-20 items-center px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-serif text-lg font-bold text-navy">
              Stimme der Medinastudenten
            </span>
          </Link>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5">
              <Lock className="h-6 w-6 text-gold" />
            </div>
            <h1 className="mb-3 font-serif text-3xl font-bold text-slate-900">
              Interner Bereich
            </h1>
            <p className="text-slate-600">
              Für Studenten und Absolventen der Islamischen Universität Medina.
            </p>
          </div>

          {fehler && FEHLERTEXTE[fehler] && (
            <p
              className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              role="alert"
            >
              {FEHLERTEXTE[fehler]}
            </p>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
            <LoginForm weiter={ziel} />
          </div>

          <p className="mt-6 text-center text-sm leading-relaxed text-slate-500">
            Zugänge werden vom Team vergeben. Wenn du noch keinen hast, melde
            dich über das Kontaktformular – wir legen dein Konto an und
            schicken dir die Zugangsdaten.
          </p>

          <p className="mt-8 text-center text-sm">
            <Link href="/" className="text-slate-500 underline hover:text-navy">
              Zurück zur Website
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
