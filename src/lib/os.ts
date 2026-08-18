import type { OsFamily } from "@/lib/releases";

/** Detected client platform, used to pre-select the right download. */
export interface DetectedPlatform {
  os: OsFamily | "unknown";
  arch: "aarch64" | "x86_64" | "unknown";
  label: string;
}

/** Best-effort OS/arch detection from a User-Agent string. */
export function detectPlatform(userAgent: string | null | undefined): DetectedPlatform {
  const ua = (userAgent ?? "").toLowerCase();

  if (ua.includes("mac")) {
    // Apple Silicon is not reliably exposed in UA; default to arm64 for modern Macs.
    const arch = ua.includes("intel") ? "x86_64" : "aarch64";
    return { os: "mac", arch, label: arch === "aarch64" ? "macOS (Apple Silicon)" : "macOS (Intel)" };
  }
  if (ua.includes("win")) {
    return { os: "windows", arch: "x86_64", label: "Windows" };
  }
  if (ua.includes("linux") || ua.includes("x11")) {
    const arch = ua.includes("aarch64") || ua.includes("arm64") ? "aarch64" : "x86_64";
    return { os: "linux", arch, label: "Linux" };
  }
  return { os: "unknown", arch: "unknown", label: "your platform" };
}

/**
 * Compare two semver strings. Returns 1 if a > b, -1 if a < b, 0 if equal.
 * Pre-release tags are compared lexically after the numeric core.
 */
export function compareVersions(a: string, b: string): number {
  const norm = (v: string) => v.replace(/^v/, "");
  const [coreA, preA = ""] = norm(a).split("-");
  const [coreB, preB = ""] = norm(b).split("-");
  const partsA = coreA.split(".").map(Number);
  const partsB = coreB.split(".").map(Number);

  for (let i = 0; i < 3; i++) {
    const diff = (partsA[i] || 0) - (partsB[i] || 0);
    if (diff !== 0) return diff > 0 ? 1 : -1;
  }
  // A version with no pre-release outranks one with a pre-release tag.
  if (preA === preB) return 0;
  if (preA === "") return 1;
  if (preB === "") return -1;
  return preA > preB ? 1 : -1;
}

/** Format a byte count as a compact human-readable size. */
export function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}
