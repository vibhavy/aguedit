import { siteConfig } from "./site";
import { unstable_rethrow } from "next/navigation";

/**
 * Release data model + a read-only pull from the public GitHub releases repo.
 *
 * The desktop app is built by CI and published as a GitHub Release on
 * `${releasesOwner}/${releasesRepo}`. This module reads the durable release
 * snapshot written by CI, with GitHub's API as a fallback. It powers the
 * download page, changelog, /api/releases/latest (also consumed by the app's
 * own update check), and /api/download/[slug].
 */

export type OsFamily = "mac" | "windows" | "linux";

export interface DownloadAsset {
  /** Stable id used in /api/download/[slug], e.g. "mac-aarch64". */
  slug: string;
  os: OsFamily;
  /** "aarch64" | "x86_64" | "universal" */
  arch: string;
  /** Human label, e.g. "macOS (Apple Silicon)". */
  label: string;
  /** File extension without dot: dmg | msi | exe | AppImage | deb. */
  ext: string;
  url: string;
  /** Size in bytes, if known. */
  size?: number;
}

export interface ReleaseManifest {
  /** Semantic version without a leading "v", e.g. "1.2.0". */
  version: string;
  /** Release title. */
  name: string;
  /** Release notes (Markdown from the GitHub Release body). */
  notes: string;
  /** ISO 8601 publish timestamp. */
  pubDate: string;
  /** Link to the release on GitHub. */
  url: string;
  /** Downloadable assets, one per OS/arch/format. */
  assets: DownloadAsset[];
}

interface GithubAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GithubRelease {
  tag_name: string;
  name: string | null;
  body: string | null;
  published_at: string | null;
  html_url: string;
  assets: GithubAsset[];
}

type ReleaseRead =
  | { kind: "release"; value: ReleaseManifest }
  | { kind: "missing" }
  | { kind: "unavailable"; reason: string };

let lastKnownRelease: ReleaseManifest | null = null;

export class ReleaseUnavailableError extends Error {
  constructor(reason: string) {
    super(`Release information is temporarily unavailable: ${reason}`);
    this.name = "ReleaseUnavailableError";
  }
}

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    // GitHub rejects API requests without a User-Agent (403). Node/curl set one
    // implicitly; the Cloudflare Workers runtime does not, so set it explicitly.
    "User-Agent": `${siteConfig.releasesRepo} (aguedit.com)`,
  };
  // Optional token lifts the unauthenticated rate limit (60/hr → 5000/hr).
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

/** Fetch and map the latest published release, or null only when none exists. */
export async function getLatestRelease(): Promise<ReleaseManifest | null> {
  const api = await readRelease(githubApiUrl(), githubHeaders());
  if (api.kind === "release") return remember(api.value);
  if (api.kind === "missing") return null;

  const snapshot = await readRelease(releaseSnapshotUrl(), publicGithubHeaders());
  if (snapshot.kind === "release") return remember(snapshot.value);
  if (lastKnownRelease) return lastKnownRelease;

  throw new ReleaseUnavailableError(api.reason);
}

/**
 * Pick the best asset for a platform: exact os+arch, then any build for the os,
 * then the first asset. Used to resolve the recommended direct download URL.
 */
export function pickAsset(
  release: ReleaseManifest,
  os: OsFamily | "unknown",
  arch: string,
): DownloadAsset | undefined {
  return (
    release.assets.find((a) => a.os === os && a.arch === arch) ??
    release.assets.find((a) => a.os === os) ??
    release.assets[0]
  );
}

function releaseSnapshotUrl(): string {
  const { releasesOwner: owner, releasesRepo: repo } = siteConfig;
  return `https://raw.githubusercontent.com/${owner}/${repo}/main/latest.json`;
}

function githubApiUrl(): string {
  const { releasesOwner: owner, releasesRepo: repo } = siteConfig;
  return `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
}

async function readRelease(url: string, headers: HeadersInit): Promise<ReleaseRead> {
  try {
    const response = await fetch(url, { headers, cache: "no-store" });
    if (response.status === 404) return { kind: "missing" };
    if (!response.ok) return unavailable(response.status);
    return mappedRead((await response.json()) as GithubRelease);
  } catch (error) {
    unstable_rethrow(error);
    return { kind: "unavailable", reason: errorMessage(error) };
  }
}

function publicGithubHeaders(): HeadersInit {
  return { "User-Agent": `${siteConfig.releasesRepo} (aguedit.com)` };
}

function mappedRead(release: GithubRelease): ReleaseRead {
  const value = mapRelease(release);
  return value
    ? { kind: "release", value }
    : { kind: "unavailable", reason: "GitHub returned an invalid release." };
}

function unavailable(status: number): ReleaseRead {
  return { kind: "unavailable", reason: `GitHub returned HTTP ${status}.` };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "The GitHub request failed.";
}

function remember(release: ReleaseManifest): ReleaseManifest {
  lastKnownRelease = release;
  return release;
}

function mapRelease(release: GithubRelease): ReleaseManifest | null {
  const version = (release.tag_name ?? "").replace(/^v/, "");
  if (!version) return null;
  const assets = release.assets
    .map(mapAsset)
    .filter((a): a is DownloadAsset => a !== null)
    // Stable, predictable order for the download page.
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return {
    version,
    name: release.name || `v${version}`,
    notes: release.body ?? "",
    pubDate: release.published_at ?? new Date().toISOString(),
    url: release.html_url,
    assets,
  };
}

/** Map a GitHub release asset filename to a typed download, or null to skip. */
function mapAsset(asset: GithubAsset): DownloadAsset | null {
  const name = asset.name.toLowerCase();

  // Skip signatures and the Tauri updater sidecar bundle — not user downloads.
  if (name.endsWith(".sig") || name.endsWith(".app.tar.gz")) return null;

  const os = osFor(name);
  if (!os) return null;
  const ext = name.split(".").pop() ?? "";
  const arch = archFor(name);

  return {
    slug: `${os}-${arch}`,
    os,
    arch,
    label: labelFor(os, arch, ext),
    ext: ext === "appimage" ? "AppImage" : ext,
    url: asset.browser_download_url,
    size: asset.size,
  };
}

function osFor(name: string): OsFamily | null {
  if (name.endsWith(".dmg")) return "mac";
  if (name.endsWith(".msi") || name.endsWith(".exe")) return "windows";
  if (name.endsWith(".appimage") || name.endsWith(".deb") || name.endsWith(".rpm")) return "linux";
  return null;
}

function archFor(name: string): string {
  if (name.includes("aarch64") || name.includes("arm64")) return "aarch64";
  if (name.includes("universal")) return "universal";
  return "x86_64";
}

function labelFor(os: OsFamily, arch: string, ext: string): string {
  if (os === "mac") {
    if (arch === "aarch64") return "macOS (Apple Silicon)";
    if (arch === "universal") return "macOS (Universal)";
    return "macOS (Intel)";
  }
  if (os === "windows") return "Windows";
  return `Linux (${ext === "deb" ? "Debian/Ubuntu" : ext === "rpm" ? "Fedora/RHEL" : "AppImage"})`;
}
