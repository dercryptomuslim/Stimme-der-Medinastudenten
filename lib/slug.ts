/**
 * Wandelt beliebigen Text in einen URL-tauglichen Slug.
 * Deutsche Umlaute werden ausgeschrieben (ä→ae), damit Slugs stabil und
 * lesbar bleiben. Wird für Beitrags-Slugs und Tag-Normalisierung genutzt.
 */
export function slugify(text: string): string {
  const s = text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // übrige Akzente entfernen
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return s || "beitrag";
}

/**
 * Normalisiert eine Tag-Eingabe: führendes # entfernen, dann slugifizieren.
 * "#Wichtige Apps" -> "wichtige-apps".
 */
export function tagSlug(eingabe: string): string {
  return slugify(eingabe.replace(/^#/, ""));
}
