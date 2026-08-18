import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONSENT_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
]);

type CloudflareRequest = NextRequest & {
  cf?: { country?: string | null };
};

export function GET(request: NextRequest) {
  const country = countryCode(request as CloudflareRequest);
  return NextResponse.json(
    { requiresConsent: !country || CONSENT_COUNTRIES.has(country) },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

function countryCode(request: CloudflareRequest): string | null {
  const value =
    request.cf?.country ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-vercel-ip-country");
  if (!value || value === "XX" || value === "T1") return null;
  return /^[A-Z]{2}$/i.test(value) ? value.toUpperCase() : null;
}
