import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { KeyRound, LogOut, PenSquare, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/footer";
import { INTERN_ENABLED } from "@/lib/supabase/config";
import { aktuellesProfil, darfSchreiben, istAdmin } from "@/lib/supabase/mitglied";
import { abmelden } from "@/app/login/actions";

export const metadata: Metadata = {
  // Der interne Bereich gehört unter keinen Umständen in einen Suchindex.
  robots: { index: false, follow: false },
};

export default async function InternLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!INTERN_ENABLED) {
    notFound();
  }

  const profil = await aktuellesProfil();

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <Link href="/intern" className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-navy">
              Interner Bereich
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {darfSchreiben(profil) && (
              <Link
                href="/intern/redaktion"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-navy"
              >
                <PenSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Redaktion</span>
              </Link>
            )}
            {istAdmin(profil) && (
              <Link
                href="/intern/verwaltung"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-navy"
              >
                <ShieldCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Verwaltung</span>
              </Link>
            )}
            <Link
              href="/intern/konto"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-navy"
            >
              <KeyRound className="h-4 w-4" />
              <span className="hidden sm:inline">Konto</span>
            </Link>
            {profil && (
              <span className="hidden text-sm text-slate-500 md:inline">
                {profil.email}
              </span>
            )}
            <form action={abmelden}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-navy"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Abmelden</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <Footer />
    </div>
  );
}
