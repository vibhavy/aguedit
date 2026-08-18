/**
 * Central site configuration. Single source of truth for name, URLs, nav,
 * social links, and marketing copy constants used across the app and in SEO
 * metadata / structured data.
 */

export const siteConfig = {
  name: "AguEdit",
  shortName: "AguEdit",
  // Canonical production URL. Override with NEXT_PUBLIC_SITE_URL in each env.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://getagenticmonkey.com",
  tagline: "Code with Claude Code and Codex in one editor.",
  footerDescription:
    "A code editor with Claude Code, Codex, file editing, Git, plans, and a built-in terminal.",
  description:
    "AguEdit is a desktop code editor for Claude Code and Codex with file editing, Git, plans, persistent terminals, and agent handoffs.",
  keywords: [
    "cross-agent coding continuity",
    "coding agent context handoff",
    "Claude Code Codex handoff",
    "AI native code editor",
    "AI code editor",
    "Claude Code GUI",
    "Claude Code desktop app",
    "Codex CLI GUI",
    "Codex CLI desktop app",
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
  // Public repo that holds the built releases (code lives in a separate private
  // repo). The site pulls the latest release from here via the GitHub API.
  releasesOwner: "vibhavy",
  releasesRepo: "agentic-monkey-desktop-app-releases",
  socials: {
    github: "https://github.com/vibhavy/agentic-monkey-desktop-app-releases",
    x: "https://x.com/agenticmonkey",
    discord: "https://discord.gg/agenticmonkey",
  },
} as const;

export const githubReleasesUrl = `https://github.com/${siteConfig.releasesOwner}/${siteConfig.releasesRepo}/releases`;

/** Primary navigation shown in the header. */
export const mainNav = [
  { title: "Editor", href: "/#editor" },
  { title: "Agents", href: "/#agents" },
  { title: "Workflow", href: "/#workflow" },
  { title: "Security", href: "/#security" },
] as const;

/** Grouped links rendered in the footer. */
export const footerNav = [
  {
    title: "Product",
    links: [
      { title: "Editor features", href: "/features" },
      { title: "Local-first security", href: "/security" },
      { title: "Free pricing", href: "/pricing" },
      { title: "Download for macOS", href: "/download" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Product docs", href: "/docs" },
      { title: "Releases & changelog", href: "/changelog" },
      { title: "Coding agent blog", href: "/blog" },
      { title: "GitHub releases", href: siteConfig.socials.github },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
    ],
  },
] as const;

export type SiteConfig = typeof siteConfig;
