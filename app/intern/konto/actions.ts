"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface PasswortAendernZustand {
  fehler?: string;
  erfolg?: boolean;
}

/**
 * Passwort des angemeldeten Nutzers ändern.
 *
 * Läuft ohne E-Mail-Versand – wichtig, solange kein eigenes SMTP existiert.
 * Voraussetzung dafür ist, dass in Supabase "Secure password change"
 * (Bestätigung per E-Mail) deaktiviert bleibt; das ist der Standard.
 */
export async function passwortAendern(
  _vorher: PasswortAendernZustand,
  formData: FormData
): Promise<PasswortAendernZustand> {
  const neu = String(formData.get("neu") ?? "");
  const wiederholung = String(formData.get("wiederholung") ?? "");

  if (neu.length < 8) {
    return { fehler: "Das Passwort muss mindestens 8 Zeichen lang sein." };
  }
  if (neu !== wiederholung) {
    return { fehler: "Die beiden Passwörter stimmen nicht überein." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?weiter=%2Fintern%2Fkonto");
  }

  const { error } = await supabase.auth.updateUser({ password: neu });

  if (error) {
    console.error("Passwort-Änderung fehlgeschlagen:", error.message);
    if (error.message.toLowerCase().includes("different")) {
      return {
        fehler: "Das neue Passwort muss sich vom bisherigen unterscheiden.",
      };
    }
    return {
      fehler:
        "Das Passwort konnte nicht geändert werden. Bitte versuche es später erneut.",
    };
  }

  return { erfolg: true };
}
