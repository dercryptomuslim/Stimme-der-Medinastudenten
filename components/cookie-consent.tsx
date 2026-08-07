"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CONSENT_KEY = "cookie-consent";

// Ohne gesetzte Property wird kein Analytics geladen – und damit auch keine
// Einwilligung abgefragt. In Vercel als NEXT_PUBLIC_GA_MEASUREMENT_ID setzen.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Lädt Google Analytics nach – wird erst nach erteilter Einwilligung aufgerufen.
function enableAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined" || typeof window.gtag === "function") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  });

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);
}

export function CookieConsent() {
  // Das Banner ist ausschließlich für Besucher ohne gespeicherte Entscheidung sichtbar –
  // eine separate Status-State-Variable wird daher nicht benötigt.
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Kein Tracking konfiguriert -> keine einwilligungspflichtigen Cookies -> kein Banner.
    if (!GA_MEASUREMENT_ID) return;

    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (savedConsent === "accepted") {
      enableAnalytics();
      return;
    }
    if (savedConsent === "declined") {
      return;
    }

    // Show banner after a short delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setIsVisible(false);
    enableAnalytics();
    window.dispatchEvent(new Event("consentChanged"));
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setIsVisible(false);
    if (typeof window !== "undefined") {
      (window as unknown as Record<string, unknown>)[
        `ga-disable-${GA_MEASUREMENT_ID}`
      ] = true;
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white border-t border-slate-200 shadow-2xl animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-1">
              Cookie-Einstellungen
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Wir verwenden Cookies und Google Analytics, um unsere Website zu verbessern und die Nutzung zu analysieren. Mit &quot;Akzeptieren&quot; stimmst du der Verwendung zu. Mehr Infos in unserer{" "}
              <Link href="/datenschutz" className="text-gold hover:text-gold-dark underline">
                Datenschutzerklärung
              </Link>.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="flex-1 md:flex-none border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Ablehnen
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 text-white"
            >
              Akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
