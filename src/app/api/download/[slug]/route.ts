import { NextResponse, type NextRequest } from "next/server";
import { getLatestRelease, pickAsset, type DownloadAsset, type ReleaseManifest } from "@/lib/releases";
import { detectPlatform } from "@/lib/os";
import { githubReleasesUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/download/[slug]
 *
 * Resolves an asset for the given slug ("auto" detects the caller's OS) and
 * 302-redirects straight to the artifact on GitHub, so the browser downloads
 * it directly — this site never proxies or buffers the bytes. Falls back to
 * the GitHub releases page when nothing is available. Kept as a stable,
 * shareable endpoint; the download UI links to asset URLs directly.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/api/download/[slug]">) {
  const { slug } = await ctx.params;
  const release = await getLatestRelease();
  if (!release || release.assets.length === 0) {
    return NextResponse.redirect(githubReleasesUrl, 302);
  }

  const asset = resolveAsset(release, slug, request.headers.get("user-agent"));
  if (!asset) {
    return NextResponse.redirect(githubReleasesUrl, 302);
  }

  return NextResponse.redirect(asset.url, 302);
}

/** Picks the asset for a slug, detecting OS from the UA when slug is "auto". */
function resolveAsset(
  release: ReleaseManifest,
  slug: string,
  userAgent: string | null,
): DownloadAsset | undefined {
  if (slug !== "auto") {
    return release.assets.find((a) => a.slug === slug);
  }
  const detected = detectPlatform(userAgent);
  return pickAsset(release, detected.os, detected.arch);
}
