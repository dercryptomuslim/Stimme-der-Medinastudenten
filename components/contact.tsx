"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Contact({ locale = "de" }: { locale?: Locale }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = (de: string, en: string) => (locale === "en" ? en : de);
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
        setPopupTitle(t("Gesendet!", "Sent!"));
        setPopupMessage(
          t(
            "Danke für deine Nachricht! Wir melden uns bei dir.",
            "Thanks for your message! We'll get back to you."
          )
        );
        setPopupOpen(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setPopupVariant("error");
        setPopupTitle(t("Fehler beim Senden", "Failed to send"));
        setPopupMessage(t("Bitte versuche es später erneut.", "Please try again later."));
        setPopupOpen(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setPopupVariant("error");
      setPopupTitle(t("Unerwarteter Fehler", "Unexpected error"));
      setPopupMessage(t("Bitte versuche es später erneut.", "Please try again later."));
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
            {t("Kontakt", "Contact")}
          </h2>
          <p className="text-lg text-slate-600">
            {t(
              "Solltest du angenommen worden sein, kannst du dich bei uns melden. Anfragen vor einer Zusage können nicht berücksichtigt werden.",
              "If you have been accepted, you can contact us. Inquiries before an acceptance cannot be considered."
            )}
          </p>
        </div>

        <Card className="max-w-xl mx-auto border border-slate-200 bg-white shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-slate-900">{t("Nachricht senden", "Send a message")}</CardTitle>
            <CardDescription className="text-slate-500 text-base">
              {t("Nur für angenommene Studenten.", "Only for accepted students.")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-700 font-medium">{t("Vorname", "First name")}</Label>
                  <Input name="firstName" id="firstName" placeholder={t("Ahmad", "Ahmad")} className="bg-slate-50 border-slate-200 text-slate-900 focus:ring-navy h-11" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-700 font-medium">{t("Nachname", "Last name")}</Label>
                  <Input name="lastName" id="lastName" placeholder={t("Müller", "Mueller")} className="bg-slate-50 border-slate-200 text-slate-900 focus:ring-navy h-11" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">{t("E-Mail", "Email")}</Label>
                <Input name="email" id="email" type="email" placeholder="ahmad@example.de" className="bg-slate-50 border-slate-200 text-slate-900 focus:ring-navy h-11" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-700 font-medium">{t("Nachricht", "Message")}</Label>
                <Textarea
                  name="message"
                  id="message"
                  placeholder={t("Deine Nachricht an uns...", "Your message to us...")}
                  className="min-h-[120px] bg-slate-50 border-slate-200 text-slate-900 focus:ring-navy"
                  required
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 text-base font-semibold shadow-md">
                {isSubmitting ? t("Sende...", "Sending...") : t("Nachricht senden", "Send message")}
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
                {t("OK", "OK")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
