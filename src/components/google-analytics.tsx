"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ANALYTICS_CONSENT_CHANGED,
  ANALYTICS_CONSENT_KEY,
  type AnalyticsConsent,
  OPEN_ANALYTICS_SETTINGS,
  disableAnalytics,
  initializeAnalytics,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";
import {
  ctaImpressionEvent,
  linkInteractionEvents,
  type DownloadInteraction,
} from "@/lib/analytics-events";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);
  const preference = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    serverConsent,
  );
  const region = useAnalyticsRegion();
  const consent = effectiveConsent(preference, region);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => listenForSettings(() => setSettingsOpen(true)), []);
  useEffect(() => installInteractionTracking(consent), [consent]);
  useEffect(() => installCtaImpressionTracking(consent), [consent, pathname]);
  useEffect(() => {
    if (consent === "denied") disableAnalytics();
  }, [consent]);

  useEffect(() => {
    if (consent !== "granted" || lastPage.current === pathname) return;
    initializeAnalytics();
    trackPageView(pathname);
    lastPage.current = pathname;
  }, [consent, pathname]);

  function choose(next: AnalyticsConsent) {
    saveConsent(next);
    setSettingsOpen(false);
    if (next === "granted") {
      initializeAnalytics();
      trackEvent("analytics_consent", { selection: "granted" });
    } else {
      disableAnalytics();
    }
  }

  if (consent === "loading" || (consent !== null && !settingsOpen)) return null;
  return (
    <ConsentPanel
      automatic={preference === null && region === "automatic"}
      consent={consent}
      onChoose={choose}
    />
  );
}

export function AnalyticsSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_ANALYTICS_SETTINGS))}
      className="text-sm text-muted transition-colors hover:text-foreground"
    >
      Analytics settings
    </button>
  );
}

function ConsentPanel({
  automatic,
  consent,
  onChoose,
}: {
  automatic: boolean;
  consent: AnalyticsConsent | null;
  onChoose: (choice: AnalyticsConsent) => void;
}) {
  return (
    <aside
      className="analytics-consent"
      role="dialog"
      aria-label="Analytics settings"
    >
      <div>
        <p className="font-semibold text-foreground">
          Help improve AguEdit
        </p>
        <p className="mt-1 text-sm leading-6 text-muted">
          {automatic
            ? "Analytics is enabled for this region to measure page journeys and download clicks. "
            : "With your permission, Google Analytics measures page journeys and download clicks. "}
          We never send form contents, prompts, or project data.{" "}
          <Link href="/privacy" className="text-brand-strong hover:underline">
            Privacy details
          </Link>
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <button
          type="button"
          className="analytics-decline"
          onClick={() => onChoose("denied")}
        >
          {consent === "denied" ? "Keep disabled" : "No thanks"}
        </button>
        <button
          type="button"
          className="analytics-accept"
          onClick={() => onChoose("granted")}
        >
          {consent === "granted" ? "Keep enabled" : "Accept analytics"}
        </button>
      </div>
    </aside>
  );
}

function installInteractionTracking(consent: ConsentState) {
  if (consent !== "granted") return;
  const handler = (event: MouseEvent) => trackInteraction(event);
  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}

function installCtaImpressionTracking(consent: ConsentState) {
  if (consent !== "granted" || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => trackCtaImpression(entry, observer));
  });
  const observe = (root: ParentNode) => observeCtas(root, observer);
  observe(document);
  const mutations = new MutationObserver((records) => {
    records.flatMap((record) => [...record.addedNodes]).forEach((node) => {
      if (node instanceof Element) observe(node);
    });
  });
  mutations.observe(document.body, { childList: true, subtree: true });
  return () => {
    observer.disconnect();
    mutations.disconnect();
  };
}

function observeCtas(root: ParentNode, observer: IntersectionObserver) {
  if (root instanceof Element && root.matches("[data-analytics-cta]")) {
    observer.observe(root);
  }
  root.querySelectorAll("[data-analytics-cta]").forEach((cta) => {
    observer.observe(cta);
  });
}

function trackCtaImpression(
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) {
  if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return;
  const event = ctaImpressionEvent({
    name: entry.target.dataset.analyticsCta ?? "unknown",
    location: clickLocation(entry.target),
    linkText: safeText(entry.target),
    pagePath: window.location.pathname,
  });
  trackEvent(event.name, event.params);
  observer.unobserve(entry.target);
}

function trackInteraction(event: MouseEvent) {
  const target = event.target instanceof Element ? event.target : null;
  const summary = target?.closest("summary");
  if (summary) trackFaq(summary);
  const anchor = target?.closest("a");
  if (anchor instanceof HTMLAnchorElement) trackLink(anchor);
}

function trackFaq(summary: Element) {
  const details = summary.closest("details");
  if (!(details instanceof HTMLDetailsElement)) return;
  trackEvent("faq_toggle", {
    faq_question: safeText(summary),
    expanded: !details.open,
    page_path: window.location.pathname,
  });
}

function trackLink(anchor: HTMLAnchorElement) {
  const events = linkInteractionEvents({
    href: anchor.href,
    origin: window.location.origin,
    linkText: safeText(anchor),
    pagePath: window.location.pathname,
    ctaName: anchor.dataset.analyticsCta,
    ctaLocation: clickLocation(anchor),
    download: downloadInteraction(anchor),
  });
  events.forEach(({ name, params }) => trackEvent(name, params));
}

function clickLocation(anchor: Element): string {
  const marked = anchor.closest<HTMLElement>("[data-analytics-location]");
  return marked?.dataset.analyticsLocation ?? "content";
}

function downloadInteraction(
  anchor: HTMLAnchorElement,
): DownloadInteraction | undefined {
  if (!anchor.hasAttribute("data-analytics-download")) return undefined;
  return {
    label: anchor.dataset.analyticsDownloadLabel ?? safeText(anchor),
    slug: anchor.dataset.analyticsDownloadSlug ?? "unknown",
    surface: anchor.dataset.analyticsDownloadSurface ?? "unknown",
    extension: anchor.dataset.analyticsDownloadExtension,
  };
}

function safeText(element: Element): string {
  return (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80);
}

function listenForSettings(open: () => void) {
  window.addEventListener(OPEN_ANALYTICS_SETTINGS, open);
  return () => window.removeEventListener(OPEN_ANALYTICS_SETTINGS, open);
}

function readConsent(): AnalyticsConsent | null {
  try {
    const value = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

type ConsentState = AnalyticsConsent | null | "loading";
type RegionState = "automatic" | "consent" | "loading";

function serverConsent(): ConsentState {
  return "loading";
}

function effectiveConsent(
  preference: ConsentState,
  region: RegionState,
): ConsentState {
  if (preference === "granted" || preference === "denied") return preference;
  if (preference === "loading" || region === "loading") return "loading";
  return region === "automatic" ? "granted" : null;
}

function useAnalyticsRegion(): RegionState {
  const [region, setRegion] = useState<RegionState>("loading");
  useEffect(() => {
    const controller = new AbortController();
    detectRegion(controller.signal).then((next) => {
      if (!controller.signal.aborted) setRegion(next);
    });
    return () => controller.abort();
  }, []);
  return region;
}

async function detectRegion(signal: AbortSignal): Promise<RegionState> {
  try {
    const response = await fetch("/api/analytics-region", {
      cache: "no-store",
      signal,
    });
    if (!response.ok) return "consent";
    const data = (await response.json()) as { requiresConsent?: boolean };
    return data.requiresConsent === false ? "automatic" : "consent";
  } catch {
    return "consent";
  }
}

function subscribeToConsent(notify: () => void) {
  window.addEventListener(ANALYTICS_CONSENT_CHANGED, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(ANALYTICS_CONSENT_CHANGED, notify);
    window.removeEventListener("storage", notify);
  };
}

function saveConsent(consent: AnalyticsConsent) {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  } catch {
    // Storage may be unavailable in private browsing; honor this page's choice.
  }
  window.dispatchEvent(new Event(ANALYTICS_CONSENT_CHANGED));
}
