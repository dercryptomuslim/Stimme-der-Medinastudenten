"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CONSENT_KEY = "cookie-consent";

type ConsentStatus = "pending" | "accepted" | "declined";
type Locale = "de" | "en" | null;

export function CookieConsent() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending");
  const [isVisible, setIsVisible] = useState(false);
  const [locale, setLocale] = useState<Locale | null>(null);

  // Translation helper - use detected locale or default to "de"
  const t = (de: string, en: string) => (locale === "en" ? en : de);

  useEffect(() => {
    // Detect locale from URL path first - check multiple times for mobile
    const detectLocale = () => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        const isEnglish = path.startsWith("/en") || path.startsWith("/en/");
        setLocale(isEnglish ? "en" : "de");
      }
    };
    
    // Initial detection
    detectLocale();
    
    // Re-check after a short delay for mobile browsers
    const timer = setTimeout(detectLocale, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only proceed after locale is detected
    if (locale === null) return;

    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (savedConsent === "accepted" || savedConsent === "declined") {
      setConsentStatus(savedConsent as ConsentStatus);
      if (savedConsent === "accepted") {
        enableAnalytics();
      }
    } else {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 500);
    }
  }, [locale]);

  const enableAnalytics = () => {
    // Load Google Analytics
    if (typeof window !== "undefined" && !window.gtag) {
      // Create dataLayer if it doesn't exist
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", "G-5H0KZ4V7QH", {
        anonymize_ip: true, // Extra privacy measure
      });

      // Load the gtag.js script
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-5H0KZ4V7QH";
      script.async = true;
      document.head.appendChild(script);
    }
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsentStatus("accepted");
    setIsVisible(false);
    enableAnalytics();
    
    // Dispatch custom event for other components to react
    window.dispatchEvent(new Event("consentChanged"));
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsentStatus("declined");
    setIsVisible(false);
    // Optionally: disable any existing tracking
    if (typeof window !== "undefined") {
      // Set GA opt-out
      (window as unknown as Record<string, unknown>)[`ga-disable-G-5H0KZ4V7QH`] = true;
    }
  };

  if (!isVisible || consentStatus !== "pending" || locale === null) {
    return null;
  }

  const privacyLink = locale === "en" ? "/en/privacy" : "/datenschutz";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white border-t border-slate-200 shadow-2xl animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-1">
              {t("🍪 Cookie-Einstellungen", "🍪 Cookie Settings")}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t(
                'Wir verwenden Cookies und Google Analytics, um unsere Website zu verbessern und die Nutzung zu analysieren. Mit "Akzeptieren" stimmst du der Verwendung zu. Mehr Infos in unserer ',
                'We use cookies and Google Analytics to improve our website and analyze usage. By clicking "Accept" you agree to their use. More info in our '
              )}
              <Link href={privacyLink} className="text-emerald-700 hover:text-emerald-800 underline">
                {t("Datenschutzerklärung", "Privacy Policy")}
              </Link>.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="flex-1 md:flex-none border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              {t("Ablehnen", "Decline")}
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 text-white"
            >
              {t("Akzeptieren", "Accept")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook to check consent status (for other components if needed)
export function useConsentStatus(): ConsentStatus {
  const [status, setStatus] = useState<ConsentStatus>("pending");

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted" || saved === "declined") {
      setStatus(saved);
    }
  }, []);

  return status;
}
