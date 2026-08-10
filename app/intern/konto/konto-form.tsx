"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { passwortAendern, type PasswortAendernZustand } from "./actions";

export function KontoForm() {
  const [zustand, formAction, laeuft] = useActionState<
    PasswortAendernZustand,
    FormData
  >(passwortAendern, {});

  if (zustand.erfolg) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy/5">
          <CheckCircle2 className="h-6 w-6 text-gold" />
        </div>
        <h2 className="mb-2 text-lg font-bold text-slate-900">
          Passwort geändert
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Ab der nächsten Anmeldung gilt dein neues Passwort.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="neu" className="font-medium text-slate-700">
          Neues Passwort
        </Label>
        <Input
          id="neu"
          name="neu"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="h-11 border-slate-200 bg-slate-50 text-slate-900 focus:ring-navy"
        />
        <p className="text-xs text-slate-500">Mindestens 8 Zeichen.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="wiederholung" className="font-medium text-slate-700">
          Neues Passwort wiederholen
        </Label>
        <Input
          id="wiederholung"
          name="wiederholung"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="h-11 border-slate-200 bg-slate-50 text-slate-900 focus:ring-navy"
        />
      </div>

      {zustand.fehler && (
        <p className="text-sm text-red-700" role="alert">
          {zustand.fehler}
        </p>
      )}

      <Button
        type="submit"
        disabled={laeuft}
        className="h-12 w-full bg-slate-900 text-base font-semibold text-white shadow-md hover:bg-slate-800"
      >
        {laeuft ? "Speichere…" : "Passwort ändern"}
      </Button>
    </form>
  );
}
