import { createClient } from "@/lib/supabase/server";
import { TAG_VORSCHLAEGE, type Rubrik } from "@/lib/intern";

/**
 * Lädt die Auswahllisten für den Editor: die Rubriken und die
 * Tag-Vorschläge (Startvokabular plus alle bereits vergebenen Tags).
 */
export async function editorDaten(): Promise<{
  rubriken: Rubrik[];
  vorschlaege: string[];
}> {
  const supabase = await createClient();

  const [rubrikRes, tagRes] = await Promise.all([
    supabase
      .from("rubrik")
      .select("slug, titel, beschreibung, icon, reihenfolge")
      .order("reihenfolge"),
    supabase.from("beitrag").select("tags"),
  ]);

  const rubriken = (rubrikRes.data ?? []) as Rubrik[];

  const ausBeitraegen = (tagRes.data ?? []).flatMap(
    (z: { tags: string[] | null }) => z.tags ?? []
  );
  const vorschlaege = [...new Set([...TAG_VORSCHLAEGE, ...ausBeitraegen])];

  return { rubriken, vorschlaege };
}
