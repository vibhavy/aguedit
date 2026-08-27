import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { githubReleasesUrl, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "AguEdit Docs",
  path: "/docs",
  description: `Documentation for ${siteConfig.name} — installation, coding agents, project memory, access controls, and workspace features.`,
  noIndex: true,
});

export default function DocsPage() {
  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading
        as="h1"
        align="left"
        title="Documentation is on the way"
        subtitle="Guides for installation, connecting coding agents and custom providers, routing, access levels, and shared project memory are being written. In the meantime:"
      />
      <ul className="mt-8 flex flex-col gap-3 text-sm">
        <li>
          <Link
            href="/download"
            data-analytics-cta="download_free"
            data-analytics-location="docs_content"
            className="text-brand hover:underline"
          >
            Download Free →
          </Link>
        </li>
        <li>
          <Link
            href="/security"
            data-analytics-cta="explore_security"
            data-analytics-location="docs_content"
            className="text-brand hover:underline"
          >
            Read the local-first security model →
          </Link>
        </li>
        <li>
          <Link
            href={githubReleasesUrl}
            data-analytics-cta="view_github_releases"
            data-analytics-location="docs_content"
            className="text-brand hover:underline"
          >
            Browse releases on GitHub →
          </Link>
        </li>
      </ul>
    </Container>
  );
}
