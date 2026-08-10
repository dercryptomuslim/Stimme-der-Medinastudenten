"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwortAnmelden, type LoginZustand } from "./actions";

export function LoginForm({ weiter }: { weiter: string }) {
  const [zustand, formAction, laeuft] = useActionState<LoginZustand, FormData>(
    passwortAnmelden,
    {}
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="weiter" value={weiter} />

      <div className="space-y-2">
        <Label htmlFor="email" className="font-medium text-slate-700">
          E-Mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="name@example.de"
          // React 19 leert das Formular nach jedem Action-Submit; die Adresse
          // kommt deshalb bei Fehlern aus dem Action-Zustand zurück.
          defaultValue={zustand.email ?? ""}
          className="h-11 border-slate-200 bg-slate-50 text-slate-900 focus:ring-navy"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="passwort" className="font-medium text-slate-700">
          Passwort
        </Label>
        <Input
          id="passwort"
          name="passwort"
          type="password"
          autoComplete="current-password"
          required
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
        {laeuft ? "Melde an…" : "Anmelden"}
      </Button>

      <p className="text-center text-xs leading-relaxed text-slate-500">
        Dein Passwort hast du vom Team erhalten. Nach der ersten Anmeldung
        kannst du es unter „Konto&ldquo; ändern.
      </p>
    </form>
  );
}
