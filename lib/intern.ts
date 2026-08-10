export interface Rubrik {
  slug: string;
  titel: string;
  beschreibung: string | null;
  /** Icon-Name, wird von components/rubrik-icon.tsx aufgelöst. */
  icon: string | null;
  reihenfolge: number;
}

export interface Beitrag {
  id: string;
  rubrik_slug: string;
  slug: string;
  titel: string;
  anriss: string | null;
  inhalt: string;
  veroeffentlicht: boolean;
  /** Normalisierte Tag-Slugs, z. B. ["finanzen", "wichtige-apps"]. */
  tags: string[];
  geaendert_am: string;
}

/**
 * Startvokabular der Tags – die Hashtags aus der Telegram-Gruppe.
 * Dient nur als Vorschlagsliste im Editor; neue Tags entstehen einfach durch
 * Eintippen und leben danach in den Beiträgen. slug -> Anzeigename.
 */
export const TAG_LABELS: Record<string, string> = {
  auto: "Auto",
  essen: "Essen",
  lebensmittel: "Lebensmittel",
  haushaltsware: "Haushaltsware",
  kinder: "Kinder",
  baby: "Baby",
  arzt: "Arzt",
  wohnung: "Wohnung",
  idarah: "Idarah",
  "wichtige-apps": "Wichtige Apps",
  handwerker: "Handwerker",
  finanzen: "Finanzen",
  moebel: "Möbel",
  "unterlagen-fuer-deutschland": "Unterlagen für Deutschland",
  sonstiges: "Sonstiges",
};

/** Reihenfolge der Vorschlags-Tags im Editor. */
export const TAG_VORSCHLAEGE = Object.keys(TAG_LABELS);

/**
 * Anzeigename eines Tags. Bekannte Tags aus TAG_LABELS, sonst wird der Slug
 * lesbar gemacht ("eigener-tag" -> "Eigener Tag").
 */
export function tagLabel(slug: string): string {
  if (TAG_LABELS[slug]) return TAG_LABELS[slug];
  return slug
    .split("-")
    .map((teil) => teil.charAt(0).toUpperCase() + teil.slice(1))
    .join(" ");
}
