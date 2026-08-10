import { createClient } from "./server";

export type MitgliedStatus = "wartend" | "freigegeben" | "abgelehnt";
export type MitgliedRolle = "mitglied" | "redakteur" | "admin";

export interface Profil {
  id: string;
  email: string;
  name: string | null;
  status: MitgliedStatus;
  rolle: MitgliedRolle;
  erstellt_am: string;
}

/**
 * Liefert das Profil des angemeldeten Nutzers oder null.
 *
 * Der Datenbankzugriff ist zusätzlich durch RLS abgesichert: ein Mitglied
 * sieht ausschließlich den eigenen Datensatz.
 */
export async function aktuellesProfil(): Promise<Profil | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profile")
    .select("id, email, name, status, rolle, erstellt_am")
    .eq("id", user.id)
    .maybeSingle();

  return (data as Profil) ?? null;
}

export function istAdmin(profil: Profil | null): boolean {
  return profil?.status === "freigegeben" && profil.rolle === "admin";
}

export function darfLesen(profil: Profil | null): boolean {
  return profil?.status === "freigegeben";
}

/** Darf Beiträge anlegen und bearbeiten (Redakteure und Admins). */
export function darfSchreiben(profil: Profil | null): boolean {
  return (
    profil?.status === "freigegeben" &&
    (profil.rolle === "redakteur" || profil.rolle === "admin")
  );
}
