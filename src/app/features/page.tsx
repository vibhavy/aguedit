import { ArrowRight, Check, Download } from "lucide-react";
import { AppMock } from "@/components/app-mock";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import {
  featureGroups,
  steps,
  type Feature,
  type FeatureGroup,
} from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI-Powered Code Editor Features",
  path: "/features",
  description:
    "Explore AguEdit: seamless Claude Code and Codex handoffs, shared local project memory, Monaco editing, plans, Git, terminals, search, and reported usage.",
  keywords: [
    "AI native code editor features",
    "Claude Code GUI features",
    "Codex CLI GUI features",
    "multi-agent coding workspace",
    "AI coding task manager",
  ],
});

const facts = [
  ["2", "coding agents"],
  ["1", "integrated editor"],
  ["5", "core workflows"],
  ["0", "AguEdit accounts"],
];

const orderedFeatureGroups = ["workspace", "orchestration", "continuity", "control"]
  .map((id) => featureGroups.find((group) => group.id === id))
  .filter((group): group is FeatureGroup => Boolean(group));

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Features", path: "/features" }])}
      />
      <FeatureHero />
      <FeatureFacts />
      <FeatureCatalogue />
      <HowItWorks />
      <FeatureCta />
    </>
  );
}

function FeatureHero() {
  return (
    <section className="hero-shell relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <Container className="flex flex-col items-center gap-8 pt-16 text-center sm:pt-24">
        <SectionHeading
          as="h1"
          eyebrow="A code editor built for agents"
          title="Everything you use to finish a change"
          subtitle="Edit code, work with Claude Code or Codex, review Git changes, plan tasks, and run commands without leaving the project."
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href="/download"
            data-analytics-location="features_hero"
            className="h-12 rounded-xl px-6"
          >
            <Download size={17} /> Download free
          </ButtonLink>
          <ButtonLink
            href="#orchestration"
            variant="secondary"
            className="h-12 rounded-xl px-6"
          >
            Browse the workspace <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </Container>
      <Container className="relative mt-14 pb-10 sm:mt-18">
        <div className="product-aura" />
        <AppMock className="relative" />
      </Container>
    </section>
  );
}

function FeatureFacts() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid grid-cols-2 divide-x divide-y divide-line border-y border-line sm:grid-cols-4 sm:divide-y-0">
        {facts.map(([value, label]) => (
          <div key={label} className="px-4 py-6 text-center">
            <p className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
              {value}
            </p>
            <p className="mt-1 text-xs text-muted">{label}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

function FeatureCatalogue() {
  return (
    <div>
      {orderedFeatureGroups.map((group, index) => (
        <FeatureSection key={group.id} group={group} index={index} />
      ))}
    </div>
  );
}

function FeatureSection({
  group,
  index,
}: {
  group: FeatureGroup;
  index: number;
}) {
  const alternate = index % 2 === 1;
  return (
    <section
      id={group.id}
      className={alternate ? "section-shell py-20 sm:py-28" : "py-20 sm:py-28"}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">
              0{index + 1} · {group.eyebrow}
            </p>
            <h2 className="mt-4 max-w-md text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {group.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted">
              {group.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {group.features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="rounded-2xl border border-line bg-surface-raised p-6 transition-colors hover:border-line-strong">
      <span className="feature-icon">
        <feature.icon size={19} />
      </span>
      <h3 className="mt-8 text-lg font-semibold tracking-tight">
        {feature.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted">{feature.description}</p>
    </article>
  );
}

function HowItWorks() {
  return (
    <section className="border-y border-line bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="From first open to handoff"
          title="Continuity in three steps"
          subtitle="Browsing existing work is read-only. AguEdit creates project state only when you choose to adopt a folder or continue working in it."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  return (
    <article className="relative rounded-2xl border border-line bg-background p-6">
      <span className="font-mono text-xs text-brand-strong">0{index + 1}</span>
      <span className="feature-icon mt-8">
        <step.icon size={19} />
      </span>
      <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{step.description}</p>
    </article>
  );
}

function FeatureCta() {
  return (
    <Container className="py-20 sm:py-28">
      <div className="final-cta min-h-[26rem]">
        <p className="section-kicker">Local by architecture</p>
        <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
          Your agents can change. Your project history does not have to.
        </h2>
        <p className="mt-5 flex items-center gap-2 text-sm text-muted">
          <Check size={15} className="text-signal" /> No AguEdit account
          or hosted project database
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href="/download"
            data-analytics-location="features_final"
            className="h-12 rounded-xl px-6"
          >
            <Download size={17} /> Download free
          </ButtonLink>
          <ButtonLink
            href="/security"
            variant="secondary"
            className="h-12 rounded-xl px-6"
          >
            Read the security model <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
