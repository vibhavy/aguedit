import { describe, expect, it } from "vitest";
import {
  ctaImpressionEvent,
  linkInteractionEvents,
} from "./analytics-events";

const base = {
  origin: "https://aguedit.com",
  linkText: "Download Free",
  pagePath: "/features",
};

describe("linkInteractionEvents", () => {
  it("builds a stable CTA impression event", () => {
    expect(
      ctaImpressionEvent({
        name: "download_free",
        location: "home_hero",
        linkText: "Download Free",
        pagePath: "/",
      }),
    ).toEqual({
      name: "cta_impression",
      params: {
        cta_name: "download_free",
        cta_location: "home_hero",
        link_text: "Download Free",
        page_path: "/",
      },
    });
  });

  it("records a named CTA and its download intent", () => {
    const events = linkInteractionEvents({
      ...base,
      href: "/download",
      ctaName: "download_free",
      ctaLocation: "features_hero",
    });

    expect(events.map(({ name }) => name)).toEqual([
      "cta_click",
      "download_intent",
    ]);
    expect(events[0].params).toMatchObject({
      cta_name: "download_free",
      cta_location: "features_hero",
      destination_path: "/download",
    });
  });

  it("records release downloads without an outbound-click duplicate", () => {
    const events = linkInteractionEvents({
      ...base,
      href: "https://github.com/vibhavy/aguedit/releases/download/v1/app.dmg",
      ctaName: "download_release_asset",
      ctaLocation: "download_release_assets",
      download: {
        label: "macOS Apple Silicon",
        slug: "mac-aarch64",
        surface: "release_asset",
        extension: "dmg",
      },
    });

    expect(events.map(({ name }) => name)).toEqual([
      "cta_click",
      "file_download",
    ]);
    expect(events[1].params).toMatchObject({
      download_slug: "mac-aarch64",
      download_surface: "release_asset",
      file_extension: "dmg",
    });
  });

  it("classifies ordinary internal and external navigation", () => {
    const internal = linkInteractionEvents({ ...base, href: "/security" });
    const external = linkInteractionEvents({
      ...base,
      href: "mailto:support@aigoco.com?subject=Help",
    });

    expect(internal).toEqual([
      expect.objectContaining({
        name: "navigation_click",
        params: expect.objectContaining({ destination_path: "/security" }),
      }),
    ]);
    expect(external).toEqual([
      expect.objectContaining({
        name: "outbound_click",
        params: expect.objectContaining({ destination_host: "mailto" }),
      }),
    ]);
  });

  it("keeps untagged download links measurable", () => {
    const events = linkInteractionEvents({ ...base, href: "/download" });

    expect(events).toEqual([
      expect.objectContaining({
        name: "download_intent",
        params: expect.objectContaining({
          cta_name: "download",
          cta_location: "content",
        }),
      }),
    ]);
  });
});
