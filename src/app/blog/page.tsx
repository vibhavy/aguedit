import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "AguEdit Blog",
  path: "/blog",
  description: `Writing on coding-agent workflows, local-first tools, project memory, and building with ${siteConfig.name}.`,
  noIndex: true,
});

export default function BlogPage() {
  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading
        as="h1"
        align="left"
        title="Nothing published yet"
        subtitle="Deep dives on multi-agent workflows, local-first tooling, and shared project memory are coming soon."
      />
      <p className="mt-8 text-sm text-muted">
        Want the first post in your feed?{" "}
        <Link
          href={siteConfig.socials.github}
          data-analytics-cta="follow_github_project"
          data-analytics-location="blog_empty_state"
          className="text-brand hover:underline"
        >
          Follow the project on GitHub
        </Link>
        .
      </p>
    </Container>
  );
}
