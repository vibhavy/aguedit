import { describe, expect, it } from "vitest";
import {
  buildMetadata,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "./seo";
import { mainNav, siteConfig } from "./site";

describe("AguEdit brand surface", () => {
  it("leads with the editor category", () => {
    expect(siteConfig.name).toBe("AguEdit");
    expect(siteConfig.tagline).toBe("Code with Claude Code and Codex in one editor.");
  });

  it("uses the AguEdit social card and logo", () => {
    const metadata = buildMetadata();
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({ url: "/og-aguedit-light.png" }),
    ]);
    expect(organizationJsonLd().logo).toContain("/aguedit-icon.png");
  });

  it("describes the released application", () => {
    const application = softwareApplicationJsonLd();
    expect(application.name).toBe("AguEdit");
    expect(application.featureList).toContain("Cross-agent conversation handoff");
  });

  it("keeps navigation focused on the product story", () => {
    expect(mainNav.map((item) => item.title)).toEqual([
      "Editor",
      "Agents",
      "Workflow",
      "Security",
    ]);
  });
});
