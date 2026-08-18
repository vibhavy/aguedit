import { headers } from "next/headers";
import Link from "next/link";
import {
  Apple,
  Download,
  MonitorDown,
  ShieldQuestion,
  TerminalSquare,
} from "lucide-react";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { DownloadButton } from "@/components/download-button";
import { AssetDownload } from "@/components/asset-download";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getLatestRelease, pickAsset, type OsFamily } from "@/lib/releases";
import { detectPlatform } from "@/lib/os";
import { githubReleasesUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Download AguEdit for macOS",
  path: "/download",
  description: `Download ${siteConfig.name}, the desktop code editor for Claude Code and Codex with Git, planning, terminals, and agent handoffs. Free for macOS; Windows and Linux are planned.`,
  keywords: [
    "Claude Code desktop app download",
    "Claude Code GUI macOS",
    "Codex CLI GUI macOS",
    "AI native code editor download",
  ],
});

const osIcon: Record<OsFamily, typeof Apple> = {
  mac: Apple,
  windows: MonitorDown,
  linux: TerminalSquare,
};

const osOrder: OsFamily[] = ["mac", "windows", "linux"];

export default async function DownloadPage() {
  const release = await getLatestRelease();
  const ua = (await headers()).get("user-agent");
  const detected = detectPlatform(ua);
  const recommended = release
    ? pickAsset(release, detected.os, detected.arch)
    : undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Download", path: "/download" }])}
      />
      <section className="relative overflow-hidden">
        <div className="glow pointer-events-none absolute inset-0 -z-10" />
        <Container className="flex flex-col items-center gap-8 py-16 text-center sm:py-24">
          <SectionHeading
            as="h1"
            eyebrow={release ? `Version ${release.version}` : "Coming soon"}
            title={`Download ${siteConfig.name}`}
            subtitle="Edit code, work with Claude Code and Codex, manage Git, plan tasks, and run terminals in one local-first macOS editor."
          />

          {release && recommended ? (
            <DownloadButton
              href={recommended.url}
              slug={recommended.slug}
              label={`Download for ${detected.label}`}
            />
          ) : (
            <ButtonLink href={githubReleasesUrl} prefetch={false}>
              <Download size={16} /> Check GitHub releases
            </ButtonLink>
          )}
          <p className="text-sm text-muted">
            {release
              ? "Not your platform? Pick a build below."
              : "The first public build is on its way. Star the repo to get notified."}
          </p>
        </Container>
      </section>

      {release ? (
        <Container className="pb-8">
          <div className="grid gap-5 md:grid-cols-3">
            {osOrder.map((os) => {
              const assets = release.assets.filter((a) => a.os === os);
              if (assets.length === 0) return null;
              const Icon = osIcon[os];
              return (
                <div
                  key={os}
                  className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/12 text-brand">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-lg font-semibold capitalize">
                    {os === "mac" ? "macOS" : os}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {assets.map((asset) => (
                      <li key={asset.slug}>
                        <AssetDownload asset={asset} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      ) : null}

      <Container className="pb-4">
        <div className="flex flex-col gap-3 rounded-xl border border-accent/30 bg-accent/5 p-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ShieldQuestion size={16} className="text-accent" /> First launch on
            macOS
          </p>
          <p className="text-sm text-muted">
            {siteConfig.name} isn&apos;t notarized by Apple yet, so macOS may
            say it&apos;s from an unidentified developer. To open it the first
            time, right-click the app in Applications and choose{" "}
            <span className="font-medium text-foreground">Open</span> — or run:
          </p>
          <code className="w-fit rounded-md border border-line bg-background px-3 py-2 font-mono text-xs text-foreground">
            xattr -cr /Applications/{siteConfig.name}.app
          </code>
        </div>
      </Container>

      <Container className="py-12">
        <div className="grid gap-6 rounded-xl border border-line bg-surface/40 p-8 sm:grid-cols-3">
          <Requirement
            title="System requirements"
            lines={[
              "macOS 12 Monterey or later",
              "Apple Silicon or Intel",
              "Windows & Linux soon",
            ]}
          />
          <Requirement
            title="What you'll need"
            lines={[
              "Claude Code and/or Codex",
              "Your own agent auth",
              "No AguEdit account",
            ]}
          />
          <Requirement
            title="After installing"
            lines={[
              "Auto-updates built in",
              "See the changelog",
              "Report issues on GitHub",
            ]}
            links={[
              { label: "Changelog →", href: "/changelog" },
              { label: "GitHub →", href: githubReleasesUrl },
            ]}
          />
        </div>
      </Container>
    </>
  );
}

function Requirement({
  title,
  lines,
  links,
}: {
  title: string;
  lines: string[];
  links?: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <ul className="flex flex-col gap-1 text-sm text-muted">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {links ? (
        <div className="mt-1 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-brand hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
