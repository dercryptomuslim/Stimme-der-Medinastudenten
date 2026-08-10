"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailCheck } from "lucide-react";
import { magicLinkSenden, type LoginZustand } from "./actions";

export function LoginForm({ weiter }: { weiter: string }) {
  const [zustand, formAction, laeuft] = useActionState<LoginZustand, FormData>(
    magicLinkSenden,
    {}
  );

  if (zustand.gesendet) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy/5">
          <MailCheck className="h-6 w-6 text-gold" />
        </div>
        <h2 className="mb-2 text-lg font-bold text-slate-900">
          E-Mail unterwegs
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          Falls für diese Adresse ein Zugang besteht oder angelegt werden kann,
          ist ein Anmeldelink unterwegs. Er ist nur kurze Zeit gültig.
        </p>
      </div>
    );
  }

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
        {laeuft ? "Sende…" : "Anmeldelink anfordern"}
      </Button>

      <p className="text-center text-xs leading-relaxed text-slate-500">
        Es gibt kein Passwort. Du bekommst einen Link per E-Mail, mit dem du
        dich anmeldest.
      </p>
    </form>
  );
}
