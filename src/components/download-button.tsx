"use client";

import { Download } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * Links straight to the release artifact's URL. GitHub serves release assets
 * with `Content-Disposition: attachment`, so the browser downloads the file
 * directly from GitHub — our site never proxies or buffers the bytes.
 */
export function DownloadButton({
  href,
  label,
  slug,
  className = "",
}: {
  href: string;
  label: string;
  /** Asset slug, for analytics only. */
  slug?: string;
  className?: string;
}) {
  function onClick() {
    trackEvent("file_download", {
      download_label: label,
      download_slug: slug ?? "auto",
      download_surface: "recommended",
      page_path: window.location.pathname,
    });
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      <Download size={16} />
      {label}
    </a>
  );
}
