/**
 * Rendert den Textauszug eines Suchtreffers und hebt die Fundstellen hervor.
 *
 * Die Datenbank markiert Treffer mit « », nicht mit HTML. Dadurch wird nie
 * Auszeichnung aus der Datenbank ausgeführt – der Auszug bleibt reiner Text,
 * die Hervorhebung entsteht erst hier.
 */
export function SuchAuszug({ text }: { text: string | null }) {
  if (!text) return null;

  const teile = text.split(/«|»/);

  return (
    <p className="text-sm leading-relaxed text-slate-600">
      {teile.map((teil, i) =>
        // Ungerade Indizes liegen zwischen « und » – das sind die Treffer.
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-gold/20 px-0.5 text-slate-900">
            {teil}
          </mark>
        ) : (
          <span key={i}>{teil}</span>
        )
      )}
    </p>
  );
}
