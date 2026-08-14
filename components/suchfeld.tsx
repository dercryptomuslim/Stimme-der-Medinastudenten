import { Search } from "lucide-react";

/**
 * Suchfeld als einfaches GET-Formular.
 *
 * Bewusst ohne Client-JavaScript: Das Formular funktioniert auch, bevor React
 * geladen ist, die Suche ist als URL teilbar und der Zurück-Button verhält
 * sich wie erwartet.
 */
export function Suchfeld({
  standardwert,
  autoFocus,
}: {
  standardwert?: string;
  autoFocus?: boolean;
}) {
  return (
    <form action="/intern/suche" role="search" className="relative">
      <label htmlFor="suche" className="sr-only">
        Beiträge durchsuchen
      </label>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        id="suche"
        name="q"
        type="search"
        defaultValue={standardwert}
        autoFocus={autoFocus}
        placeholder="Wonach suchst du? z. B. Geld wechseln, Werkstatt, Iqama"
        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-navy/30 focus:ring-2 focus:ring-navy/10"
      />
    </form>
  );
}
