"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface LoginZustand {
  fehler?: string;
  gesendet?: boolean;
}

export async function magicLinkSenden(
  _vorher: LoginZustand,
  formData: FormData
): Promise<LoginZustand> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const weiter = String(formData.get("weiter") ?? "/intern");

  if (!email || !email.includes("@")) {
    return { fehler: "Bitte eine gültige E-Mail-Adresse eingeben." };
  }

  const supabase = await createClient();
  const kopf = await headers();

  // Der Anmeldelink muss dorthin zurückführen, wo die Anmeldung begonnen hat –
  // also primär auf den anfragenden Host, nicht auf eine feste Adresse. Sonst
  // schickt eine lokale Anmeldung den Link auf die Produktionsseite.
  // Das Schema kommt von Vercel per x-forwarded-proto; lokal gibt es kein TLS.
  const host = kopf.get("host");
  const schema =
    kopf.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") || host?.startsWith("127.0.0.1")
      ? "http"
      : "https");
  const herkunft = host
    ? `${schema}://${host}`
    : (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:7001");

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${herkunft}/auth/callback?weiter=${encodeURIComponent(weiter)}`,
    },
  });

  if (error) {
    console.error("Magic-Link-Fehler:", error.message);
    // Bewusst unspezifisch: sonst lässt sich über die Fehlermeldung
    // herausfinden, welche Adressen registriert sind.
    return { fehler: "Der Link konnte nicht versendet werden. Bitte später erneut versuchen." };
  }

  return { gesendet: true };
}

export async function abmelden() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
