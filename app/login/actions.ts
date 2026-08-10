"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface LoginZustand {
  fehler?: string;
  gesendet?: boolean;
}

/**
 * Anmeldung mit E-Mail und Passwort.
 *
 * Der primäre Weg, solange kein eigenes SMTP eingerichtet ist: Ohne SMTP
 * lassen sich die Supabase-E-Mail-Vorlagen nicht bearbeiten, und der
 * Standard-Magic-Link scheitert außerhalb des anfordernden Browsers
 * (PKCE-Verifier). Passwort-Login verschickt keine einzige E-Mail.
 *
 * Konten legt das Team im Supabase-Dashboard an (Add user, Auto Confirm) –
 * es gibt bewusst keine Selbstregistrierung über dieses Formular.
 */
export async function passwortAnmelden(
  _vorher: LoginZustand,
  formData: FormData
): Promise<LoginZustand> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const passwort = String(formData.get("passwort") ?? "");

  // Dem Hidden-Field nicht vertrauen: nur seiteninterne Ziele zulassen.
  const roh = String(formData.get("weiter") ?? "/intern");
  const weiter = roh.startsWith("/") && !roh.startsWith("//") ? roh : "/intern";

  if (!email || !passwort) {
    return { fehler: "Bitte E-Mail-Adresse und Passwort eingeben." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: passwort,
  });

  if (error) {
    // Serverseitig konkret loggen (z. B. "Email not confirmed"), nach außen
    // bewusst eine einzige Meldung – sonst lässt sich über die Fehlertexte
    // ermitteln, welche Adressen ein Konto haben.
    console.error("Passwort-Login-Fehler:", error.message);
    return { fehler: "E-Mail-Adresse oder Passwort ist nicht korrekt." };
  }

  redirect(weiter);
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

  // Ziel ist /auth/confirm (token_hash), nicht /auth/callback (PKCE-Code).
  // Die E-Mail-Vorlage hängt an diese Adresse &token_hash=…&type=… an – der
  // Fragezeichen-Parameter muss deshalb hier schon vorhanden sein.
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${herkunft}/auth/confirm?weiter=${encodeURIComponent(weiter)}`,
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
