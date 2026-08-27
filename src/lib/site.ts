/**
 * Central site configuration. Single source of truth for name, URLs, nav,
 * social links, and marketing copy constants used across the app and in SEO
 * metadata / structured data.
 */

export const siteConfig = {
  name: "AguEdit",
  shortName: "AguEdit",
  // Canonical production URL. Override with NEXT_PUBLIC_SITE_URL in each env.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aguedit.com",
  tagline:
    "Use multiple coding agents in one conversation without losing context.",
  footerDescription:
    "A local coding workspace where multiple agents share one conversation and project context.",
  description:
    "AguEdit is a desktop coding workspace for Claude Code, Codex, Antigravity, Cursor, and custom Responses-compatible models, with shared project context across agent handoffs.",
  keywords: [
    "cross-agent coding continuity",
    "coding agent context handoff",
    "Claude Code Codex handoff",
    "AI native code editor",
    "AI code editor",
    "Claude Code GUI",
    "Claude Code desktop app",
    "Claude Code code editor",
    "Codex CLI GUI",
    "Codex CLI desktop app",
    "OpenAI Codex desktop app",
    "ChatGPT coding workspace",
    "GPT coding agent",
    "Antigravity coding agent",
    "Cursor coding agent",
    "VS Code AI coding alternative",
    "Zed AI editor alternative",
    "Cline alternative",
    "AI coding agent orchestrator",
    "coding agent orchestration tool",
    "multi-agent coding workspace",
    "local-first AI coding tool",
    "shared project context",
    "switch coding agents",
    "AI coding task manager",
    "coding agent Git client",
    "coding agent terminal",
  ],
  creator: "AguEdit",
  supportEmail: "support@aigoco.com",
  personalEmail: "vibhav@aigoco.com",
  // Public repo that holds the built releases (code lives in a separate private
  // repo). The site pulls the latest release from here via the GitHub API.
  releasesOwner: "vibhavy",
  releasesRepo: "aguedit",
  socials: {
    github: "https://github.com/vibhavy/aguedit",
    x: "https://x.com/agenticmonkey",
    discord: "https://discord.gg/agenticmonkey",
  },
} as const;

export const githubReleasesUrl = `https://github.com/${siteConfig.releasesOwner}/${siteConfig.releasesRepo}/releases`;

export const searchCrawlerUserAgents = [
  "*",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
] as const;

/**
 * Primary navigation shown in the header, after the Features menu. The Features
 * menu itself is rendered from `pillars` in `@/lib/content`.
 */
export const headerNav = [
  { title: "Features", href: "/features" },
  { title: "Utilities", href: "/utilities" },
] as const;

/** Grouped links rendered in the footer. */
export const footerNav = [
  {
    title: "Product",
    links: [
      { title: "Editor features", href: "/features" },
      { title: "App utilities", href: "/utilities" },
      { title: "Local-first security", href: "/security" },
      { title: "Download Free", href: "/download" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Product docs", href: "/docs" },
      { title: "AI coding agent guide", href: "/features/ai-coding" },
      { title: "Coding agent blog", href: "/blog" },
      { title: "GitHub releases", href: siteConfig.socials.github },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
    ],
  },
] as const;

export type SiteConfig = typeof siteConfig;
