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
  geaendert_am: string;
}
