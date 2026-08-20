import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { GoogleAnalyticsBootstrap } from "./google-analytics-bootstrap";

describe("GoogleAnalyticsBootstrap", () => {
  it("renders consent before the document-level GA loader", () => {
    const html = renderToStaticMarkup(<GoogleAnalyticsBootstrap />);
    const consent = html.indexOf("ga-consent-default");
    const loader = html.indexOf("googletagmanager.com/gtag/js?id=G-H8E4PNWPV4");

    expect(consent).toBeGreaterThanOrEqual(0);
    expect(loader).toBeGreaterThan(consent);
    expect(html).toContain("analytics_storage: 'denied'");
  });
});
