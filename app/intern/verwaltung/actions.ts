"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { aktuellesProfil, istAdmin } from "@/lib/supabase/mitglied";

export async function statusSetzen(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !["freigegeben", "abgelehnt", "wartend"].includes(status)) {
    return;
  }

  // Doppelte Absicherung: die RLS-Policy erlaubt das Update ohnehin nur
  // Admins, aber ein stiller Fehlversuch wäre schwer zu bemerken.
  const profil = await aktuellesProfil();
  if (!istAdmin(profil)) {
    throw new Error("Nicht berechtigt.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profile")
    .update({
      status,
      freigegeben_am: status === "freigegeben" ? new Date().toISOString() : null,
      freigegeben_von: status === "freigegeben" ? profil!.id : null,
    })
    .eq("id", id);

  if (error) {
    console.error("Freigabe fehlgeschlagen:", error.message);
    throw new Error("Die Änderung konnte nicht gespeichert werden.");
  }

  revalidatePath("/intern/verwaltung");
}
