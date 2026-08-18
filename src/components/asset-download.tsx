"use client";

import { Download } from "lucide-react";
import type { DownloadAsset } from "@/lib/releases";
import { formatBytes } from "@/lib/os";
import { trackEvent } from "@/lib/analytics";

/**
 * A single release build. Links straight to the artifact's URL so the browser
 * downloads it directly from GitHub — our site never proxies the bytes.
 */
export function AssetDownload({ asset }: { asset: DownloadAsset }) {
  function onClick() {
    trackEvent("file_download", {
      download_label: asset.label,
      download_slug: asset.slug,
      download_surface: "release_asset",
      file_extension: asset.ext || "unknown",
      page_path: window.location.pathname,
    });
  }

  return (
    <a
      href={asset.url}
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 rounded-lg border border-line px-3 py-2.5 text-left text-sm transition-colors hover:border-brand/50 hover:bg-surface-2"
    >
      <span className="text-foreground">{asset.label}</span>
      <span className="flex items-center gap-2 text-xs text-muted">
        {`${asset.ext ? `.${asset.ext}` : ""} ${formatBytes(asset.size)}`.trim()}
        <Download size={14} />
      </span>
    </a>
  );
}
