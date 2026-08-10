"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Rubrik } from "@/lib/intern";
import { beitragSpeichern, type BeitragZustand } from "./actions";
import { TagInput } from "./tag-input";

export interface BeitragFormWerte {
  id?: string;
  rubrik_slug?: string;
  slug?: string;
  titel?: string;
  anriss?: string;
  inhalt?: string;
  veroeffentlicht?: boolean;
  tags?: string[];
}

export function BeitragForm({
  rubriken,
  vorschlaege,
  werte,
}: {
  rubriken: Rubrik[];
  vorschlaege: string[];
  werte?: BeitragFormWerte;
}) {
  const [zustand, formAction, laeuft] = useActionState<
    BeitragZustand,
    FormData
  >(beitragSpeichern, {});

  return (
    <form action={formAction} className="space-y-6">
      {werte?.id && <input type="hidden" name="id" value={werte.id} />}

      <div className="space-y-2">
        <Label htmlFor="rubrik_slug" className="font-medium text-slate-700">
          Rubrik
        </Label>
        <select
          id="rubrik_slug"
          name="rubrik_slug"
          defaultValue={werte?.rubrik_slug ?? ""}
          required
          className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:ring-navy"
        >
          <option value="" disabled>
            Bitte wählen…
          </option>
          {rubriken.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.titel}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="titel" className="font-medium text-slate-700">
          Titel
        </Label>
        <Input
          id="titel"
          name="titel"
          defaultValue={werte?.titel ?? ""}
          required
          placeholder="z. B. Konto eröffnen in Medina"
          className="h-11 border-slate-200 bg-slate-50 text-slate-900 focus:ring-navy"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="anriss" className="font-medium text-slate-700">
          Kurzbeschreibung <span className="text-slate-400">(optional)</span>
        </Label>
        <Input
          id="anriss"
          name="anriss"
          defaultValue={werte?.anriss ?? ""}
          placeholder="Ein Satz, der in der Übersicht erscheint."
          className="h-11 border-slate-200 bg-slate-50 text-slate-900 focus:ring-navy"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inhalt" className="font-medium text-slate-700">
          Inhalt
        </Label>
        <Textarea
          id="inhalt"
          name="inhalt"
          defaultValue={werte?.inhalt ?? ""}
          required
          rows={16}
          placeholder={"Text im Markdown-Format.\n\n## Überschrift\n\n- Aufzählung\n- **Fett** und Links: https://…"}
          className="border-slate-200 bg-slate-50 font-mono text-sm text-slate-900 focus:ring-navy"
        />
        <p className="text-xs text-slate-500">
          Markdown: <code>## Überschrift</code>, <code>- Liste</code>,{" "}
          <code>**fett**</code>. Nackte Links werden automatisch verlinkt.
        </p>
      </div>

      <div className="space-y-2">
        <Label className="font-medium text-slate-700">Tags</Label>
        <TagInput
          name="tags"
          initial={werte?.tags ?? []}
          vorschlaege={vorschlaege}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug" className="font-medium text-slate-700">
          Slug <span className="text-slate-400">(optional)</span>
        </Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={werte?.slug ?? ""}
          placeholder="Wird sonst aus dem Titel gebildet."
          className="h-11 border-slate-200 bg-slate-50 font-mono text-sm text-slate-900 focus:ring-navy"
        />
        <p className="text-xs text-slate-500">
          Teil der Adresse des Beitrags. Leer lassen, dann automatisch aus dem
          Titel.
        </p>
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="veroeffentlicht"
          defaultChecked={werte?.veroeffentlicht ?? false}
          className="h-4 w-4 rounded border-slate-300 text-navy focus:ring-navy"
        />
        <span className="text-sm text-slate-700">
          Veröffentlichen (sonst nur als Entwurf für das Team sichtbar)
        </span>
      </label>

      {zustand.fehler && (
        <p className="text-sm text-red-700" role="alert">
          {zustand.fehler}
        </p>
      )}

      <Button
        type="submit"
        disabled={laeuft}
        className="h-12 bg-slate-900 px-8 text-base font-semibold text-white shadow-md hover:bg-slate-800"
      >
        {laeuft ? "Speichere…" : "Speichern"}
      </Button>
    </form>
  );
}
