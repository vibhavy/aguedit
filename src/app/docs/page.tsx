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
        eyebrow="Docs"
        title="Documentation is on the way"
        subtitle="Guides for installation, connecting Claude Code and Codex, routing, access levels, and shared project memory are being written. In the meantime:"
      />
      <ul className="mt-8 flex flex-col gap-3 text-sm">
        <li>
          <Link
            href="/download"
            data-analytics-location="docs_content"
            className="text-brand hover:underline"
          >
            Download and install AguEdit →
          </Link>
        </li>
        <li>
          <Link href="/security" className="text-brand hover:underline">
            Read the local-first security model →
          </Link>
        </li>
        <li>
          <Link href={githubReleasesUrl} className="text-brand hover:underline">
            Browse releases on GitHub →
          </Link>
        </li>
      </ul>
    </Container>
  );
}
