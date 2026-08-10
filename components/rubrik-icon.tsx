import {
  Users,
  Car,
  MapPin,
  UtensilsCrossed,
  Building2,
  BookOpen,
} from "lucide-react";

/**
 * Bildet `rubrik.icon` aus der Datenbank auf ein Icon ab.
 *
 * Bewusst als switch und nicht als Nachschlagetabelle: eine Zuweisung wie
 * `const Icon = TABELLE[name]` sieht für den Linter aus wie eine im Render
 * erzeugte Komponente. Unbekannte Werte fallen auf BookOpen zurück, damit
 * eine neue Rubrik nie die Seite zerlegt.
 */
export function RubrikIcon({
  name,
  className,
}: {
  name: string | null;
  className?: string;
}) {
  switch (name) {
    case "Users":
      return <Users className={className} />;
    case "Car":
      return <Car className={className} />;
    case "MapPin":
      return <MapPin className={className} />;
    case "UtensilsCrossed":
      return <UtensilsCrossed className={className} />;
    case "Building2":
      return <Building2 className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}
