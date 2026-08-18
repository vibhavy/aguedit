import { Container, SectionHeading } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About AguEdit",
  path: "/about",
  description: `Why ${siteConfig.name} gives Claude Code, Codex CLI, and future coding agents one local-first desktop workspace with shared project context.`,
  keywords: [
    "AI coding agent orchestrator",
    "Claude Code and Codex CLI",
    "shared project context",
    "local-first developer tool",
  ],
});

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="About"
          title="A code editor with agents built in"
        />
        <div className="flex flex-col gap-4 text-muted">
          <p>
            AI coding is more than a chat box. Real development still needs an
            editor, file navigation, diffs, Git, planning, and terminals. Those
            tools should live beside the agents doing the work.
          </p>
          <p>
            {siteConfig.name} brings that work into one desktop code editor.
            Claude Code and Codex are supported today, with shared
            project context that lets work move between them without starting
            the explanation again.
          </p>
          <p>
            It&apos;s local-first on purpose. No AguEdit account, hosted
            project database, or work telemetry. Your project memory stays on
            your machine in formats you can read and own; the coding CLI you
            choose still communicates with its own provider under that
            provider&apos;s terms.
          </p>
        </div>
      </div>
    </Container>
  );
}
