/**
 * Rubriken des internen Bereichs.
 *
 * Spiegelt bewusst den Seed in supabase/migrations/. Solange es keine
 * Datenbank gibt, ist das hier die einzige Quelle; danach kommen die Rubriken
 * aus der Tabelle `rubrik` und diese Liste dient nur noch als Fallback für
 * die Strukturvorschau.
 */
export interface Rubrik {
  slug: string;
  titel: string;
  beschreibung: string;
  /** Lucide-Icon-Name, entspricht rubrik.icon in der Datenbank. */
  icon: "Users" | "Car" | "MapPin";
  /** Geplante Inhalte – ersetzt später die Beitragsliste aus der Datenbank. */
  geplant: string[];
}

export const RUBRIKEN: Rubrik[] = [
  {
    slug: "familie",
    titel: "Familie & Alltag",
    beschreibung: "Ehe, Kinder, Schule, Behördengänge und Wohnen in Medina.",
    icon: "Users",
    geplant: [
      "Eheschließung und Anerkennung",
      "Geburt, Krankenhaus und Papiere",
      "Schulen und Kindergärten",
      "Wohnungssuche und Mietverträge",
      "Behördengänge und Iqama-Fragen",
    ],
  },
  {
    slug: "auto",
    titel: "Auto",
    beschreibung: "Kauf, Zulassung, Versicherung und Werkstätten.",
    icon: "Car",
    geplant: [
      "Gebrauchtwagen kaufen – worauf achten",
      "Zulassung und Übertragung",
      "Versicherung",
      "Werkstätten und Ersatzteile",
      "Führerschein umschreiben",
    ],
  },
  {
    slug: "mekka",
    titel: "Mekka & Umrah",
    beschreibung: "Anreise, günstige Unterkünfte und Transport.",
    icon: "MapPin",
    geplant: [
      "Anreise von Medina nach Mekka",
      "Günstige Unterkünfte",
      "Transport vor Ort",
      "Umrah außerhalb der Stoßzeiten",
    ],
  },
];

/**
 * Schaltet die Strukturvorschau unter /intern frei.
 *
 * Standard ist aus: ohne Anmeldung darf kein Bereich erreichbar sein, der
 * nach einem Mitgliederbereich aussieht. Erst wenn Supabase angebunden ist,
 * ersetzt die echte Anmeldung dieses Flag.
 */
export const INTERN_VORSCHAU = process.env.NEXT_PUBLIC_INTERN_VORSCHAU === "true";
