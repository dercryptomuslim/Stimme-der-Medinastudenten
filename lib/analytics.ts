// Google Analytics 4 Event Tracking Utilities

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const CONSENT_KEY = "cookie-consent";

// Helper to check if gtag is available AND user has consented
function isGtagAvailable(): boolean {
  if (typeof window === "undefined") return false;
  
  // Check consent
  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent !== "accepted") return false;
  
  return typeof window.gtag === "function";
}

// Generic event tracking function
export function trackEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) {
  if (!isGtagAvailable()) return;
  
  window.gtag("event", eventName, parameters);
}

// ==========================================
// FORM EVENTS
// ==========================================

// Track contact form submission
export function trackFormSubmit(formData: {
  formName: string;
  topic?: string;
}) {
  trackEvent("form_submit", {
    form_name: formData.formName,
    form_topic: formData.topic || "general",
  });
}

// Track funnel completion
export function trackFunnelComplete(funnelData: {
  outcome: string;
  stepPath: string;
}) {
  trackEvent("funnel_complete", {
    funnel_outcome: funnelData.outcome,
    funnel_path: funnelData.stepPath,
  });
}

// ==========================================
// CLICK EVENTS
// ==========================================

// Track CTA button clicks
export function trackCtaClick(ctaData: {
  buttonText: string;
  location: string;
  destination?: string;
}) {
  trackEvent("cta_click", {
    button_text: ctaData.buttonText,
    click_location: ctaData.location,
    destination: ctaData.destination || "",
  });
}

// Track booking/calendar button clicks
export function trackBookingClick(bookingData: {
  source: string;
  bookingType?: string;
}) {
  trackEvent("booking_click", {
    booking_source: bookingData.source,
    booking_type: bookingData.bookingType || "consultation",
  });
}

// Track phone number clicks
export function trackPhoneClick(phone: string) {
  trackEvent("phone_click", {
    phone_number: phone,
  });
}

// Track email clicks
export function trackEmailClick(email: string) {
  trackEvent("email_click", {
    email_address: email,
  });
}

// Track external link clicks
export function trackExternalLinkClick(linkData: {
  url: string;
  linkText: string;
}) {
  trackEvent("external_link_click", {
    link_url: linkData.url,
    link_text: linkData.linkText,
  });
}

// ==========================================
// SCROLL TRACKING
// ==========================================

// Track scroll depth milestones
export function trackScrollDepth(percentage: number) {
  trackEvent("scroll_depth", {
    depth_percentage: percentage,
  });
}

// Initialize scroll depth tracking
export function initScrollTracking() {
  if (typeof window === "undefined") return;

  const milestones = [25, 50, 75, 100];
  const trackedMilestones = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    milestones.forEach((milestone) => {
      if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        trackScrollDepth(milestone);
      }
    });
  };

  // Throttle scroll events
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ==========================================
// PAGE VIEW TRACKING (optional enhancement)
// ==========================================

export function trackPageView(pagePath: string, pageTitle?: string) {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
}
