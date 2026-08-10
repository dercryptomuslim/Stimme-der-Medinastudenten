"use client";

import { useActionState } from "react";
import { beitragLoeschen, type BeitragZustand } from "./actions";

/**
 * Löschen mit Sicherheitsabfrage. Der Klick öffnet erst eine Rückfrage;
 * Fehler kommen als Zustand zurück und werden inline gezeigt, statt auf einer
 * generischen Fehlerseite zu landen.
 */
export function LoeschenButton({ id }: { id: string }) {
  const [zustand, formAction] = useActionState<BeitragZustand, FormData>(
    beitragLoeschen,
    {}
  );

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (
          !window.confirm(
            "Diesen Beitrag wirklich löschen? Das lässt sich nicht rückgängig machen."
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-slate-500 underline transition-colors hover:text-red-700"
      >
        Diesen Beitrag löschen
      </button>
      {zustand.fehler && (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {zustand.fehler}
        </p>
      )}
    </form>
  );
}
