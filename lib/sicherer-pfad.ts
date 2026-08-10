/**
 * Validiert ein Rücksprungziel aus Nutzereingaben (z. B. ?weiter=…).
 *
 * Ein simples startsWith("/")-Guard genügt nicht: Browser und der
 * Next-Client-Router normalisieren Backslashes zu Slashes, aus "/\evil.com"
 * wird "//evil.com" und damit eine externe Adresse — ein Open Redirect nach
 * erfolgreicher Anmeldung. Deshalb wird hier zusätzlich per URL-Gegenprobe
 * geprüft, dass das Ziel same-origin bleibt.
 */
export function sichererPfad(roh: unknown, fallback = "/intern"): string {
  if (typeof roh !== "string" || !roh.startsWith("/")) return fallback;
  if (roh.startsWith("//") || roh.includes("\\")) return fallback;

  // Gegenprobe über die WHATWG-Normalisierung: Bleibt die Origin erhalten?
  const basis = "https://intern.invalid";
  try {
    const ziel = new URL(roh, basis);
    if (ziel.origin !== basis) return fallback;

    // Entscheidend ist der NORMALISIERTE Pfad, nicht die Eingabe: aus
    // "/..//evil.com" macht die ..-Auflösung "//evil.com", das beim Redirect
    // wieder als protokollrelative externe URL gelesen würde. Deshalb die
    // Invariante am Ergebnis prüfen.
    const pfad = ziel.pathname + ziel.search;
    if (!pfad.startsWith("/") || pfad.startsWith("//") || pfad.includes("\\")) {
      return fallback;
    }
    return pfad;
  } catch {
    return fallback;
  }
}
