"use client";

import { useEffect } from "react";
import { initScrollTracking } from "@/lib/analytics";

const CONSENT_KEY = "cookie-consent";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize scroll tracking if user has consented
    const checkAndInitTracking = () => {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (consent === "accepted") {
        initScrollTracking();
      }
    };

    // Check immediately
    checkAndInitTracking();

    // Also listen for consent changes (when user accepts in cookie banner)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY && e.newValue === "accepted") {
        initScrollTracking();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Custom event for same-tab consent changes
    const handleConsentChange = () => checkAndInitTracking();
    window.addEventListener("consentChanged", handleConsentChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("consentChanged", handleConsentChange);
    };
  }, []);

  return <>{children}</>;
}
