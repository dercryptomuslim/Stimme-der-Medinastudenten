"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { tagLabel } from "@/lib/intern";
import { tagSlug } from "@/lib/slug";

/**
 * Tag-Eingabe für den Editor.
 *
 * Verwaltet eine Liste von Tag-Slugs, bietet Vorschläge zum Anklicken und
 * erlaubt neue Tags durch Eintippen (Enter oder Komma). Der aktuelle Stand
 * wird als kommagetrennter Wert in einem Hidden-Field mitgesendet, das die
 * Server-Action erneut normalisiert.
 */
export function TagInput({
  name,
  initial,
  vorschlaege,
}: {
  name: string;
  initial: string[];
  vorschlaege: string[];
}) {
  const [tags, setTags] = useState<string[]>(initial);
  const [eingabe, setEingabe] = useState("");

  function hinzufuegen(roh: string) {
    const slug = tagSlug(roh);
    if (!slug || slug === "beitrag") return;
    setTags((vorher) => (vorher.includes(slug) ? vorher : [...vorher, slug]));
    setEingabe("");
  }

  function entfernen(slug: string) {
    setTags((vorher) => vorher.filter((t) => t !== slug));
  }

  function taste(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      hinzufuegen(eingabe);
    } else if (e.key === "Backspace" && !eingabe && tags.length > 0) {
      entfernen(tags[tags.length - 1]);
    }
  }

  const offen = vorschlaege.filter((v) => !tags.includes(v));

  return (
    <div>
      <input type="hidden" name={name} value={tags.join(",")} />

      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
        {tags.map((slug) => (
          <span
            key={slug}
            className="inline-flex items-center gap-1 rounded-full bg-navy/5 px-2.5 py-1 text-xs font-medium text-navy"
          >
            #{tagLabel(slug)}
            <button
              type="button"
              onClick={() => entfernen(slug)}
              className="text-slate-400 hover:text-red-600"
              aria-label={`${tagLabel(slug)} entfernen`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={eingabe}
          onChange={(e) => setEingabe(e.target.value)}
          onKeyDown={taste}
          onBlur={() => eingabe && hinzufuegen(eingabe)}
          placeholder={tags.length === 0 ? "Tag eingeben und Enter…" : ""}
          className="min-w-[8rem] flex-1 bg-transparent px-1 py-1 text-sm text-slate-900 outline-none"
        />
      </div>

      {offen.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {offen.map((slug) => (
            <button
              key={slug}
              type="button"
              onClick={() => hinzufuegen(slug)}
              className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500 transition-colors hover:border-gold/40 hover:text-navy"
            >
              + {tagLabel(slug)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
