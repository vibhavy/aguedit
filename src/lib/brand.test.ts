import { describe, expect, it } from "vitest";
import {
  aiCodingQuestions,
  aiCodingTopics,
  featureGroups,
  featurePages,
  pillars,
} from "./content";
import {
  buildMetadata,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "./seo";
import {
  footerNav,
  headerNav,
  searchCrawlerUserAgents,
  siteConfig,
} from "./site";

function getFooterLinks(): { title: string; href: string }[] {
  const links: { title: string; href: string }[] = [];
  for (const group of footerNav) links.push(...group.links);
  return links;
}

describe("AguEdit brand surface", () => {
  it("leads with the editor category", () => {
    expect(siteConfig.name).toBe("AguEdit");
    expect(siteConfig.tagline).toBe(
      "Use multiple coding agents in one conversation without losing context.",
    );
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
    expect(application.featureList).toContain(
      "Cross-agent conversation handoff",
    );
  });

  it("names the current agent and custom-provider surface", () => {
    const agentPage = featurePages.find((page) => page.slug === "ai-coding");

    for (const agent of ["Claude Code", "Codex", "Antigravity", "Cursor"]) {
      expect(agentPage?.lede).toContain(agent);
    }
    expect(agentPage?.lede).toContain("Responses-compatible");
    expect(agentPage?.metaDescription?.length).toBeLessThanOrEqual(160);
  });

  it("keeps navigation pointed at real pages", () => {
    expect(headerNav.map((item) => item.title)).toEqual([
      "Features",
      "Utilities",
    ]);
    // Header links must resolve to routes, not dead homepage anchors.
    for (const item of headerNav) {
      expect(item.href.startsWith("/")).toBe(true);
      expect(item.href).not.toContain("#");
    }
  });

  it("keeps removed pages out and uses the canonical download label", () => {
    const links: { title: string; href: string }[] = [...headerNav];

    for (const group of footerNav) links.push(...group.links);

    expect(links.find((link) => link.href === "/pricing")).toBeUndefined();
    expect(links.find((link) => link.href === "/changelog")).toBeUndefined();
    expect(links.find((link) => link.href === "/download")?.title).toBe(
      "Download Free",
    );
  });

  it("publishes the support contact", () => {
    expect(siteConfig.supportEmail).toBe("support@aigoco.com");
    expect(siteConfig.personalEmail).toBe("vibhav@aigoco.com");
    expect(
      getFooterLinks().find((link) => link.href === "/contact"),
    ).toBeDefined();
  });

  it("keeps security and contact in the footer only", () => {
    const footerLinks = getFooterLinks();
    const headerHrefs: readonly string[] = headerNav.map((link) => link.href);

    expect(headerHrefs).not.toContain("/security");
    expect(headerHrefs).not.toContain("/contact");
    expect(footerLinks.find((link) => link.href === "/security")).toBeDefined();
    expect(footerLinks.find((link) => link.href === "/contact")).toBeDefined();
  });

  it("surfaces every product pillar in the Features menu", () => {
    expect(pillars.map((pillar) => pillar.label)).toEqual([
      "AI-based coding",
      "Manual coding",
      "Git",
      "Planning",
      "Terminal",
      "Browser",
    ]);
    // Each pillar links to its own dedicated feature page, and never uses
    // a purple accent.
    for (const pillar of pillars) {
      expect(pillar.href).toBe(`/features/${pillar.id}`);
      expect(pillar.accent).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it("has a dedicated page for every pillar", () => {
    for (const pillar of pillars) {
      const page = featurePages.find((item) => item.slug === pillar.id);
      expect(page, `missing feature page for ${pillar.id}`).toBeDefined();
      expect(page?.accent).toBe(pillar.accent);
      expect(page?.capabilities.length).toBeGreaterThan(0);
    }
  });

  it("surfaces plugins and skills in the Features index", () => {
    const extensions = featureGroups.find((group) => group.id === "extensions");
    const titles = extensions?.features.map((feature) => feature.title) ?? [];

    expect(titles).toContain("Plugin marketplace");
    expect(titles).toContain("Plugins in the composer");
    expect(titles).toContain("Personal and project skills");
    expect(titles).toContain("Skills selected per message");
  });

  it("answers the requested AI coding searches with factual visible content", () => {
    const content = [...aiCodingTopics, ...aiCodingQuestions]
      .map((item) => Object.values(item).join(" "))
      .join(" ");

    for (const term of [
      "Claude Code",
      "Codex",
      "ChatGPT",
      "GPT",
      "Antigravity",
      "Cursor",
      "VS Code",
      "Zed",
      "Cline",
    ]) {
      expect(content).toContain(term);
    }
  });

  it("allows Google and OpenAI search crawlers", () => {
    expect(searchCrawlerUserAgents).toEqual([
      "*",
      "OAI-SearchBot",
      "ChatGPT-User",
      "GPTBot",
    ]);
  });
});
