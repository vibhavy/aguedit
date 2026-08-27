import { Container, SectionHeading } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms",
  path: "/terms",
  description: `Terms of use for ${siteConfig.name}.`,
});

export default function TermsPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <SectionHeading as="h1" align="left" title="Terms of Use" />
        <p className="text-sm text-muted">
          Last updated: {new Date().getFullYear()}
        </p>
        <div className="flex flex-col gap-4 text-sm text-muted">
          <p>
            {siteConfig.name} is provided free of charge, &ldquo;as is&rdquo;
            and without warranty of any kind. By downloading or using the
            application you agree to use it at your own risk.
          </p>
          <p>
            You are responsible for your use of any third-party coding-agent
            CLIs you connect and for complying with their respective terms and
            any applicable API or subscription agreements.
          </p>
          <p>
            To the maximum extent permitted by law, {siteConfig.name} and its
            authors are not liable for any damages arising from the use of the
            software. These terms may be updated from time to time; continued
            use constitutes acceptance of the current version.
          </p>
        </div>
      </div>
    </Container>
  );
}
