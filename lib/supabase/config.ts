/**
 * Zentrale Konfiguration der Supabase-Anbindung.
 *
 * Der interne Bereich ist nur erreichbar, wenn beide Werte gesetzt sind.
 * Fehlt einer, liefern alle geschützten Routen 404 – ein Bereich, der nach
 * Mitgliederbereich aussieht, darf niemals ohne echte Anmeldung existieren.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

// Supabase nennt den öffentlichen Schlüssel je nach Projektalter
// "publishable key" (sb_publishable_…) oder "anon key" (JWT). Beide sind für
// den Browser bestimmt und funktionieren hier gleichwertig.
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

export const INTERN_ENABLED = Boolean(SUPABASE_URL && SUPABASE_KEY);
