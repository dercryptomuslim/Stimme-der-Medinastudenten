"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupVariant, setPopupVariant] = useState<"success" | "error">("success");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setPopupVariant("success");
        setPopupTitle("Gesendet!");
        setPopupMessage("Danke für deine Nachricht! Wir melden uns bei dir.");
        setPopupOpen(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setPopupVariant("error");
        setPopupTitle("Fehler beim Senden");
        setPopupMessage("Bitte versuche es später erneut.");
        setPopupOpen(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setPopupVariant("error");
      setPopupTitle("Unerwarteter Fehler");
      setPopupMessage("Bitte versuche es später erneut.");
      setPopupOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="kontakt" className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Kontakt
          </h2>
          <p className="text-lg text-slate-600">
            Solltest du angenommen worden sein, kannst du dich bei uns melden. Anfragen vor einer Zusage können nicht berücksichtigt werden.
          </p>
        </div>

        <Card className="max-w-xl mx-auto border border-slate-200 bg-white shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-slate-900">Nachricht senden</CardTitle>
            <CardDescription className="text-slate-500 text-base">
              Nur für angenommene Studenten.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-700 font-medium">Vorname</Label>
                  <Input name="firstName" id="firstName" placeholder="Ahmad" className="bg-slate-50 border-slate-200 text-slate-900 focus:ring-navy h-11" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-700 font-medium">Nachname</Label>
                  <Input name="lastName" id="lastName" placeholder="Müller" className="bg-slate-50 border-slate-200 text-slate-900 focus:ring-navy h-11" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">E-Mail</Label>
                <Input name="email" id="email" type="email" placeholder="ahmad@example.de" className="bg-slate-50 border-slate-200 text-slate-900 focus:ring-navy h-11" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-700 font-medium">Nachricht</Label>
                <Textarea
                  name="message"
                  id="message"
                  placeholder="Deine Nachricht an uns..."
                  className="min-h-[120px] bg-slate-50 border-slate-200 text-slate-900 focus:ring-navy"
                  required
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base font-semibold shadow-md">
                {isSubmitting ? "Sende..." : "Nachricht senden"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle
                className={popupVariant === "success" ? "text-gold-dark" : "text-red-700"}
              >
                {popupTitle}
              </DialogTitle>
              <DialogDescription className="text-slate-600">{popupMessage}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => setPopupOpen(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white"
              >
                OK
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
