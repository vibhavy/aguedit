import { NextResponse } from "next/server";
import { getLatestRelease, ReleaseUnavailableError } from "@/lib/releases";

export const runtime = "nodejs";
// Cache in step with the upstream GitHub read; the desktop app polls this.
export const revalidate = 600;

const CORS = { "Access-Control-Allow-Origin": "*" };

/**
 * GET /api/releases/latest
 *
 * Public JSON describing the current release. Consumed by the desktop app's
 * update check (splash screen + background poll) and by download/changelog UI.
 * The app compares its own version against `version` to decide whether to
 * prompt for an update.
 */
export async function GET() {
  try {
    const release = await getLatestRelease();
    if (!release) return noReleaseResponse();
    return NextResponse.json(release, {
      headers: { ...CORS, "Cache-Control": "public, max-age=300, s-maxage=600" },
    });
  } catch (error) {
    if (!(error instanceof ReleaseUnavailableError)) throw error;
    return NextResponse.json(
      { error: "Release information is temporarily unavailable." },
      { status: 503, headers: { ...CORS, "Retry-After": "60" } },
    );
  }
}

function noReleaseResponse(): NextResponse {
  return NextResponse.json(
    { error: "No release published yet." },
    { status: 404, headers: CORS },
  );
}
