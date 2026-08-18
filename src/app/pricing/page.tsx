import { Check, Download } from "lucide-react";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Free AI-Native Code Editor",
  path: "/pricing",
  description: `${siteConfig.name} is a free desktop code editor for Claude Code and Codex. Download for macOS and use the agent access you already have.`,
  keywords: [
    "free Claude Code GUI",
    "free Codex CLI GUI",
    "free AI coding agent orchestrator",
    "Claude Code desktop app pricing",
  ],
});

const included = [
  "Unlimited projects and threads",
  "Claude Code + Codex orchestration",
  "Shared local project memory",
  "Manual routing, AUTO routing, models, and effort",
  "Monaco editing, persistent terminals, and multi-repository Git",
  "Plans, project search, background runs, and notifications",
  "Per-message access and live token visibility",
  "Built-in auto-updates",
  "macOS today; Windows & Linux planned",
  "No AguEdit account or hosted project database",
];

const pricingFaqs = [
  {
    question: "Is AguEdit really free?",
    answer:
      "Yes. The desktop app is free to download and use. You bring your own subscriptions or API access for the underlying coding agents like Claude Code and Codex.",
  },
  {
    question: "Are there paid plans?",
    answer:
      "Not today. AguEdit is local-first with no backend to run, so there's nothing to meter. If team features arrive later, the core local app stays free.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaqs)} />
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Pricing", path: "/pricing" }])}
      />
      <section className="relative overflow-hidden">
        <div className="glow pointer-events-none absolute inset-0 -z-10" />
        <Container className="flex flex-col items-center gap-8 py-16 text-center sm:py-24">
          <SectionHeading
            as="h1"
            eyebrow="Pricing"
            title="The editor is free"
            subtitle="No AguEdit cloud means nothing to meter. Bring the coding-agent access you already use."
          />
        </Container>
      </section>

      <Container className="pb-20">
        <div className="mx-auto flex max-w-lg flex-col gap-6 rounded-2xl border border-brand/40 bg-surface p-8 shadow-2xl shadow-brand/10">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand">
              Free forever
            </span>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold">$0</span>
              <span className="pb-1.5 text-muted">/ always</span>
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <Check size={18} className="mt-0.5 shrink-0 text-success" />{" "}
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink
            href="/download"
            data-analytics-location="pricing_card"
            className="w-full"
          >
            <Download size={16} /> Download free
          </ButtonLink>
          <p className="text-center text-xs text-muted">
            Bring your own Claude Code / Codex access · no AguEdit account
          </p>
        </div>
      </Container>

      <Container className="pb-24">
        <div className="mx-auto grid max-w-3xl gap-3">
          {pricingFaqs.map((f) => (
            <div
              key={f.question}
              className="rounded-xl border border-line bg-surface p-5"
            >
              <h3 className="font-medium text-foreground">{f.question}</h3>
              <p className="mt-2 text-sm text-muted">{f.answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
