export const GOOGLE_ANALYTICS_ID = "G-NQ1WLM1D7Y";
export const ANALYTICS_CONSENT_KEY = "agenticmonkey.analytics-consent";
export const OPEN_ANALYTICS_SETTINGS = "agenticmonkey:analytics-settings";
export const ANALYTICS_CONSENT_CHANGED =
  "agenticmonkey:analytics-consent-changed";

export type AnalyticsConsent = "granted" | "denied";
export type AnalyticsValue = string | number | boolean;
export type AnalyticsParams = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

let analyticsEnabled = false;

function command(...args: unknown[]) {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...values) => window.dataLayer?.push(values));
  window.gtag(...args);
}

export function initializeAnalytics() {
  if (analyticsEnabled) return;
  analyticsEnabled = true;
  command("consent", "update", grantedConsent());
  command("config", GOOGLE_ANALYTICS_ID, { send_page_view: false });
}

export function disableAnalytics() {
  if (typeof window === "undefined" || !window.gtag) return;
  command("consent", "update", deniedConsent());
  analyticsEnabled = false;
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!analyticsEnabled || typeof window === "undefined") return;
  command("event", name, cleanParams(params));
}

export function trackPageView(pathname: string) {
  trackEvent("page_view", {
    page_location: `${window.location.origin}${pathname}`,
    page_path: pathname,
    page_title: document.title,
  });
}

function cleanParams(params: AnalyticsParams): Record<string, AnalyticsValue> {
  return Object.fromEntries(
    Object.entries(params).filter(
      (entry): entry is [string, AnalyticsValue] => entry[1] !== undefined,
    ),
  );
}

function deniedConsent() {
  return {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  };
}

function grantedConsent() {
  return { ...deniedConsent(), analytics_storage: "granted" };
}
