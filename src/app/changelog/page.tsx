import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getLatestRelease } from "@/lib/releases";
import { githubReleasesUrl, siteConfig } from "@/lib/site";

// Release metadata is resolved at request time from the durable snapshot.
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Releases & Changelog",
  path: "/changelog",
  description: `See the latest ${siteConfig.name} releases, editor features, and fixes.`,
  keywords: [
    "AguEdit releases",
    "AguEdit changelog",
    "Claude Code GUI updates",
    "Codex CLI GUI updates",
  ],
});

export default async function ChangelogPage() {
  const release = await getLatestRelease();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Releases & Changelog", path: "/changelog" },
        ])}
      />
      <Container className="py-16 sm:py-24">
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="Changelog"
          title="What's new in AguEdit"
          subtitle="The latest release is shown here. Full release history lives on GitHub."
        />

        <div className="mt-12 flex flex-col gap-10">
          {release ? (
            <article className="grid gap-6 border-l-2 border-brand/40 pl-6 sm:grid-cols-[160px_1fr] sm:border-l-0 sm:pl-0">
              <div className="flex flex-col gap-1">
                <span className="w-fit rounded-full bg-brand/12 px-3 py-1 text-sm font-semibold text-brand">
                  v{release.version}
                </span>
                <time className="text-sm text-muted" dateTime={release.pubDate}>
                  {new Date(release.pubDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="prose-invert max-w-none">
                <p className="whitespace-pre-line text-foreground">
                  {release.notes ||
                    "This release ships across macOS, Windows, and Linux."}
                </p>
                <Link
                  href="/download"
                  data-analytics-location="changelog_release"
                  className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
                >
                  Download v{release.version} →
                </Link>
              </div>
            </article>
          ) : (
            <p className="text-muted">
              No releases published yet. Follow along on{" "}
              <Link
                href={githubReleasesUrl}
                className="text-brand hover:underline"
              >
                GitHub
              </Link>
              .
            </p>
          )}

          <Link
            href={githubReleasesUrl}
            className="text-sm text-muted hover:text-foreground"
          >
            View full release history on GitHub →
          </Link>
        </div>
      </Container>
    </>
  );
}
