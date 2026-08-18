import {
  CloudOff,
  Download,
  HardDrive,
  KeyRound,
  Lock,
  UserX,
} from "lucide-react";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Local-First Security",
  path: "/security",
  description:
    "AguEdit keeps project memory local with no account, hosted project database, credential storage, or work telemetry.",
  keywords: [
    "local-first AI coding tool",
    "Claude Code privacy",
    "Codex CLI privacy",
    "local AI coding workspace",
    "secure coding agent orchestrator",
  ],
});

const pillars = [
  {
    icon: CloudOff,
    title: "No AguEdit cloud",
    description:
      "AguEdit has no hosted project database, account service, or telemetry pipeline for your work. The desktop orchestrator runs locally.",
  },
  {
    icon: UserX,
    title: "No account required",
    description:
      "There's no sign-up and no login. We don't have a user database because there are no users to store.",
  },
  {
    icon: HardDrive,
    title: "Your data stays on disk",
    description:
      "Project memory, todos, decisions, and conversation history live in a local .agenticmonkey/ folder you own and control.",
  },
  {
    icon: KeyRound,
    title: "We never see your keys",
    description:
      "You authenticate each coding agent with its own tool. AguEdit orchestrates the CLIs but never handles your credentials.",
  },
  {
    icon: Lock,
    title: "Per-message access control",
    description:
      "Grant read-only, workspace-editing, or full access per message. Nothing gets touched without you allowing it.",
  },
  {
    icon: HardDrive,
    title: "Shareable, inspectable state",
    description:
      "Project state is plain JSON and JSONL you can read, diff, and commit to git. No opaque formats, no lock-in.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Security", path: "/security" }])}
      />
      <section className="relative overflow-hidden">
        <div className="glow pointer-events-none absolute inset-0 -z-10" />
        <Container className="flex flex-col items-center gap-8 py-16 text-center sm:py-24">
          <SectionHeading
            as="h1"
            eyebrow="Security & privacy"
            title="Your project is not our product"
            subtitle={`${siteConfig.name} has no account or hosted project database. Project memory, conversations, settings, and terminal state stay in local files you control.`}
          />
          <ButtonLink href="/download" data-analytics-location="security_cta">
            <Download size={16} /> Download free
          </ButtonLink>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-success/12 text-success">
                <p.icon size={20} />
              </span>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-muted">{p.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pb-20">
        <div className="rounded-xl border border-line bg-surface/40 p-8">
          <h2 className="text-xl font-semibold">
            Where your project state lives
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Adding a project creates an{" "}
            <code className="font-mono text-accent">.agenticmonkey/</code>{" "}
            directory inside that folder. You decide what to share by committing
            it — or not — to git.
          </p>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line bg-background p-5 font-mono text-sm">
            <pre className="text-muted">{`.agenticmonkey/
├─ project.json      # shareable manifest — id, revision, routing
├─ changelog.jsonl   # append-only event log
├─ snapshot.json     # derived memory state (todos, decisions)
├─ local.json        # machine-specific, never shared
└─ .gitignore        # excludes local.json and cache/`}</pre>
          </div>
        </div>
      </Container>

      <Container className="pb-20">
        <div className="rounded-xl border border-line-strong bg-brand-soft p-6 sm:p-8">
          <p className="section-kicker">The provider boundary</p>
          <h2 className="mt-3 text-xl font-semibold">
            Your coding agent still uses its own service
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            Claude Code and Codex may send prompts, selected source code, and
            tool results to their respective providers as part of doing the
            work. AguEdit does not replace or proxy those provider
            relationships: you sign in through each CLI, and that
            provider&apos;s privacy settings and terms continue to apply.
          </p>
        </div>
      </Container>
    </>
  );
}
