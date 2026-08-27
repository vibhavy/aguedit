import { Container, SectionHeading } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy",
  path: "/privacy",
  description: `How ${siteConfig.name} handles data: local project storage, no AguEdit account or hosted project database, and provider-owned coding CLI connections.`,
});

export default function PrivacyPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <SectionHeading as="h1" align="left" title="Privacy Policy" />
        <p className="text-sm text-muted">
          Last updated: {new Date().getFullYear()}
        </p>
        <div className="flex flex-col gap-4 text-sm text-muted">
          <p>
            <strong className="text-foreground">The short version:</strong>{" "}
            {siteConfig.name} is a local-first desktop application. It has no
            account system and no backend server. Your projects, conversations,
            and settings are stored on your own device and are never transmitted
            to us.
          </p>
          <p>
            <strong className="text-foreground">The desktop app.</strong>{" "}
            AguEdit does not collect, transmit, or sell your data. Coding-agent
            CLIs you connect (such as Claude Code or Codex) communicate with
            their own providers under their own terms; AguEdit never handles or
            stores your credentials.
          </p>
          <p>
            <strong className="text-foreground">This website.</strong>{" "}
            {siteConfig.url} uses Google Analytics to measure page views,
            navigation, CTA views and clicks, download interest, download
            starts, FAQ opens, and outbound-link clicks. We do not send form
            contents, prompts, project paths, credentials, or URL query strings.
            Google processes analytics data under its own privacy terms.
            Download links may redirect through GitHub, which has its own
            privacy policy.
          </p>
          <p>
            <strong className="text-foreground">Your analytics choice.</strong>{" "}
            Analytics is enabled automatically outside the EEA, United Kingdom,
            and Switzerland. Visitors in those regions are asked first. When
            location cannot be determined, analytics remains off until accepted.
            Your choice is stored in this browser, and you can change it at any
            time through “Analytics settings” in the footer. We do not sell
            personal data.
          </p>
          <p>
            Questions? Reach out via our{" "}
            <a
              href={siteConfig.socials.github}
              data-analytics-cta="view_github_repository"
              data-analytics-location="privacy_content"
              className="text-brand hover:underline"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>
      </div>
    </Container>
  );
}
