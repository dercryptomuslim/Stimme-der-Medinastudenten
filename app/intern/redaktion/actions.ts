"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { aktuellesProfil, darfSchreiben } from "@/lib/supabase/mitglied";
import { slugify, tagSlug } from "@/lib/slug";

export interface BeitragZustand {
  fehler?: string;
}

function tagsAusEingabe(roh: string): string[] {
  const gesehen = new Set<string>();
  for (const teil of roh.split(",")) {
    const slug = tagSlug(teil.trim());
    if (slug && slug !== "beitrag") gesehen.add(slug);
  }
  return [...gesehen];
}

/**
 * Legt einen Beitrag an oder aktualisiert ihn.
 *
 * Der Schreibschutz liegt zusätzlich in den RLS-Policies (hat_rolle
 * 'redakteur'); die Prüfung hier verhindert nur, dass ein stiller
 * Fehlversuch schwer zu deuten wäre.
 */
export async function beitragSpeichern(
  _vorher: BeitragZustand,
  formData: FormData
): Promise<BeitragZustand> {
  const profil = await aktuellesProfil();
  if (!darfSchreiben(profil)) {
    return { fehler: "Keine Berechtigung." };
  }

  const id = String(formData.get("id") ?? "").trim();
  const rubrikSlug = String(formData.get("rubrik_slug") ?? "").trim();
  const titel = String(formData.get("titel") ?? "").trim();
  const anriss = String(formData.get("anriss") ?? "").trim();
  const inhalt = String(formData.get("inhalt") ?? "").trim();
  const veroeffentlicht = formData.get("veroeffentlicht") === "on";
  const tags = tagsAusEingabe(String(formData.get("tags") ?? ""));

  const slugEingabe = String(formData.get("slug") ?? "").trim();
  const slug = slugEingabe ? slugify(slugEingabe) : slugify(titel);

  if (!rubrikSlug || !titel || !inhalt) {
    return { fehler: "Rubrik, Titel und Inhalt sind erforderlich." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const werte = {
    rubrik_slug: rubrikSlug,
    slug,
    titel,
    anriss: anriss || null,
    inhalt,
    veroeffentlicht,
    tags,
  };

  let fehler;
  if (id) {
    ({ error: fehler } = await supabase
      .from("beitrag")
      .update(werte)
      .eq("id", id));
  } else {
    ({ error: fehler } = await supabase
      .from("beitrag")
      .insert({ ...werte, autor: user?.id ?? null }));
  }

  if (fehler) {
    console.error("Beitrag speichern fehlgeschlagen:", fehler.message);
    if (fehler.code === "23505") {
      return {
        fehler:
          "In dieser Rubrik gibt es bereits einen Beitrag mit diesem Kürzel (Slug). Bitte Titel oder Slug anpassen.",
      };
    }
    if (fehler.code === "23503") {
      return { fehler: "Die gewählte Rubrik existiert nicht." };
    }
    return { fehler: "Der Beitrag konnte nicht gespeichert werden." };
  }

  revalidatePath("/intern");
  revalidatePath(`/intern/${rubrikSlug}`);
  redirect(`/intern/${rubrikSlug}/${slug}`);
}

// Signatur für useActionState: Fehler werden als Zustand zurückgegeben und
// inline angezeigt – nicht geworfen, was sonst auf einer generischen
// Fehlerseite landen würde. Bei Erfolg leitet redirect() weiter.
export async function beitragLoeschen(
  _vorher: BeitragZustand,
  formData: FormData
): Promise<BeitragZustand> {
  const profil = await aktuellesProfil();
  if (!darfSchreiben(profil)) {
    return { fehler: "Keine Berechtigung." };
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return { fehler: "Kein Beitrag angegeben." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("beitrag").delete().eq("id", id);

  if (error) {
    console.error("Beitrag löschen fehlgeschlagen:", error.message);
    return { fehler: "Der Beitrag konnte nicht gelöscht werden." };
  }

  revalidatePath("/intern");
  redirect("/intern/redaktion");
}
