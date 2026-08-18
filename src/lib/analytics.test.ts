import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.resetModules();
  vi.unstubAllGlobals();
});

describe("analytics commands", () => {
  it("grants consent and configures GA exactly once", async () => {
    const calls = await setupAnalytics();
    const { initializeAnalytics } = await import("./analytics");

    initializeAnalytics();
    initializeAnalytics();

    expect(calls).toEqual([
      ["consent", "update", expect.objectContaining({ analytics_storage: "granted" })],
      ["config", "G-NQ1WLM1D7Y", { send_page_view: false }],
    ]);
  });

  it("sends a page view only after analytics is enabled", async () => {
    const calls = await setupAnalytics();
    const analytics = await import("./analytics");

    analytics.trackPageView("/before-consent");
    analytics.initializeAnalytics();
    analytics.trackPageView("/features");

    expect(calls.at(-1)).toEqual([
      "event",
      "page_view",
      expect.objectContaining({ page_path: "/features" }),
    ]);
  });
});

async function setupAnalytics(): Promise<unknown[][]> {
  const calls: unknown[][] = [];
  vi.stubGlobal("window", {
    dataLayer: calls,
    gtag: (...args: unknown[]) => calls.push(args),
    location: { origin: "https://getagenticmonkey.com" },
  });
  vi.stubGlobal("document", { title: "AguEdit" });
  return calls;
}
