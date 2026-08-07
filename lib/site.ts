/**
 * Einzige Quelle für die kanonische Domain.
 *
 * Apex-Domain ohne "www", passend zum Redirect in vercel.json
 * (www.stimme-medinastudenten.de -> stimme-medinastudenten.de, 301).
 * Beide Stellen müssen dieselbe Variante nennen – sonst zeigen die
 * Canonical-Tags auf eine URL, die permanent weiterleitet.
 */
export const SITE_URL = "https://stimme-medinastudenten.de";

export const SITE_NAME = "Stimme der Medinastudenten";

export function absoluteUrl(path = ""): string {
  return `${SITE_URL}${path}`;
}
