import type { AnalyticsParams } from "@/lib/analytics";

export type TrackedEvent = {
  name: string;
  params: AnalyticsParams;
};

export type DownloadInteraction = {
  label: string;
  slug: string;
  surface: string;
  extension?: string;
};

export type LinkInteraction = {
  href: string;
  origin: string;
  linkText: string;
  pagePath: string;
  ctaName?: string;
  ctaLocation?: string;
  download?: DownloadInteraction;
};

export type CtaImpression = {
  name: string;
  location: string;
  linkText: string;
  pagePath: string;
};

export function ctaImpressionEvent(input: CtaImpression): TrackedEvent {
  return {
    name: "cta_impression",
    params: {
      cta_name: input.name,
      cta_location: input.location,
      link_text: input.linkText,
      page_path: input.pagePath,
    },
  };
}

export function linkInteractionEvents(input: LinkInteraction): TrackedEvent[] {
  const url = new URL(input.href, input.origin);
  const events = input.ctaName ? [ctaClick(input, url)] : [];
  events.push(primaryLinkEvent(input, url));
  return events;
}

function ctaClick(input: LinkInteraction, url: URL): TrackedEvent {
  return {
    name: "cta_click",
    params: {
      ...linkParams(input),
      ...destinationParams(url, input.origin),
      cta_name: input.ctaName,
      cta_location: input.ctaLocation ?? "content",
    },
  };
}

function primaryLinkEvent(input: LinkInteraction, url: URL): TrackedEvent {
  if (input.download) return fileDownload(input, input.download);
  if (url.origin !== input.origin) return outboundClick(input, url);
  if (url.pathname === "/download") return downloadIntent(input);
  return navigationClick(input, url);
}

function fileDownload(
  input: LinkInteraction,
  download: DownloadInteraction,
): TrackedEvent {
  return {
    name: "file_download",
    params: {
      ...linkParams(input),
      download_label: download.label,
      download_slug: download.slug,
      download_surface: download.surface,
      file_extension: download.extension,
    },
  };
}

function outboundClick(input: LinkInteraction, url: URL): TrackedEvent {
  return {
    name: "outbound_click",
    params: {
      ...linkParams(input),
      destination_host: externalDestination(url),
    },
  };
}

function downloadIntent(input: LinkInteraction): TrackedEvent {
  return {
    name: "download_intent",
    params: {
      ...linkParams(input),
      cta_name: input.ctaName ?? "download",
      cta_location: input.ctaLocation ?? "content",
    },
  };
}

function navigationClick(input: LinkInteraction, url: URL): TrackedEvent {
  return {
    name: "navigation_click",
    params: { ...linkParams(input), destination_path: url.pathname },
  };
}

function linkParams(input: LinkInteraction): AnalyticsParams {
  return { link_text: input.linkText, page_path: input.pagePath };
}

function destinationParams(url: URL, origin: string): AnalyticsParams {
  if (url.origin === origin) return { destination_path: url.pathname };
  return { destination_host: externalDestination(url) };
}

function externalDestination(url: URL): string {
  return url.hostname || url.protocol.replace(":", "");
}
