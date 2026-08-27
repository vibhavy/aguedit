import { headers } from "next/headers";
import Link from "next/link";
import {
  Apple,
  Download,
  MonitorDown,
  ShieldAlert,
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
  description: `Download ${siteConfig.name} for Apple Silicon macOS and follow the one-time first-launch steps for the current unsigned release.`,
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
            title={`Download ${siteConfig.name}`}
            subtitle="Use multiple coding agents without losing context, edit code, manage Git, plan tasks, and run terminals in one local-first macOS workspace."
          />

          {release && recommended ? (
            <DownloadButton
              href={recommended.url}
              slug={recommended.slug}
              label="Download Free"
            />
          ) : (
            <ButtonLink href={githubReleasesUrl} prefetch={false}>
              <Download size={16} /> Free Download
            </ButtonLink>
          )}
          <p className="text-sm text-muted">
            {release
              ? `Version ${release.version}. Not your platform? Pick a build below.`
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
        <div className="flex flex-col gap-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <ShieldAlert size={18} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold text-foreground">
                First launch requires one macOS approval
              </h2>
              <p className="text-sm leading-6 text-muted">
                This release is ad-hoc signed to preserve AguEdit&apos;s
                embedded browser entitlements, but it does not yet have a paid
                Developer ID signature and is not notarized by Apple.
              </p>
            </div>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2">
            <InstallStep number="1" title="Install AguEdit">
              Open the DMG and drag AguEdit into Applications.
            </InstallStep>
            <InstallStep number="2" title="Try opening it">
              Open AguEdit from Applications, then dismiss the macOS warning.
            </InstallStep>
            <InstallStep number="3" title="Allow the first launch">
              Open System Settings → Privacy &amp; Security, scroll to Security,
              and click Open Anyway.
            </InstallStep>
            <InstallStep number="4" title="Confirm once">
              Authenticate if macOS asks, then click Open. Subsequent launches
              work normally.
            </InstallStep>
          </ol>

          <p className="text-xs leading-5 text-muted">
            Only approve AguEdit when the DMG came from aguedit.com or the
            official AguEdit GitHub release page.
          </p>
        </div>
      </Container>

      <Container className="py-12">
        <div className="grid gap-6 rounded-xl border border-line bg-surface/40 p-8 sm:grid-cols-3">
          <Requirement
            title="System requirements"
            lines={[
              "macOS 12 Monterey or later",
              "Apple Silicon (M1 or newer)",
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
              "In-app update checks",
              "One-time macOS approval",
              "Report issues on GitHub",
            ]}
            links={[{ label: "GitHub →", href: githubReleasesUrl }]}
          />
        </div>
      </Container>
    </>
  );
}

function InstallStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3 rounded-lg border border-line bg-background/40 p-4 text-left">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 font-mono text-xs font-semibold text-amber-400">
        {number}
      </span>
      <span className="text-sm leading-6 text-muted">
        <strong className="block font-semibold text-foreground">{title}</strong>
        {children}
      </span>
    </li>
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
