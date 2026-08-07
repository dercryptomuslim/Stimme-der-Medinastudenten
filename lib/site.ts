/**
 * Einzige Quelle für die kanonische Domain.
 *
 * Solange keine eigene Domain angebunden ist, muss hier die tatsächlich
 * erreichbare Adresse stehen – ein Canonical auf eine nicht existierende
 * Domain entwertet sonst die gesamte Indexierung.
 *
 * Sobald die Wunschdomain in Vercel hinterlegt ist, wird
 * NEXT_PUBLIC_SITE_URL auf diese gesetzt (ohne abschließenden Slash).
 * Der www-Redirect in vercel.json muss dann zur selben Variante passen.
 */
const FALLBACK_URL = "https://stimme-der-medinastudenten.vercel.app";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL
).replace(/\/+$/, "");

export const SITE_NAME = "Stimme der Medinastudenten";

/**
 * Steuert, ob Suchmaschinen die Seite aufnehmen dürfen.
 *
 * Standard ist bewusst "nein": Solange die Seite nur unter der
 * .vercel.app-Adresse läuft und Impressum wie Blog noch Platzhalter
 * enthalten, soll nichts davon im Index landen.
 *
 * Zum Launch NEXT_PUBLIC_ALLOW_INDEXING=true setzen.
 */
export const IS_INDEXABLE = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export function absoluteUrl(path = ""): string {
  return `${SITE_URL}${path}`;
}
