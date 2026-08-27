import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Download,
  RefreshCw,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink, Container } from "@/components/ui";
import { featureGroups, pillars, type FeatureGroup } from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import styles from "./features.module.css";

export const metadata = buildMetadata({
  title: "Multiple Coding Agents, One Conversation",
  path: "/features",
  description:
    "Use Claude Code, Codex, Antigravity, Cursor, custom models, plugins, and portable skills in one AguEdit workspace without losing project context.",
  keywords: [
    "multiple coding agents one conversation",
    "coding agent context handoff",
    "Claude Code Codex Antigravity Cursor",
    "custom AI model endpoint code editor",
    "coding agent plugins and skills",
  ],
});

const agents = ["Claude Code", "Codex", "Antigravity", "Cursor"] as const;
const orderedGroups = [
  "orchestration",
  "continuity",
  "workspace",
  "extensions",
  "control",
]
  .map((id) => featureGroups.find((group) => group.id === id))
  .filter((group): group is FeatureGroup => Boolean(group));

const continuityPoints = [
  ["Conversation", "The thread remains one continuous record."],
  ["Agent session", "Each native tool resumes its own session."],
  ["Project memory", "Decisions, todos, summaries, and file notes travel."],
] as const;

export default function FeaturesPage() {
  return (
    <div className={styles.page}>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Features", path: "/features" }])}
      />
      <FeatureHero />
      <Continuity />
      <Workspace />
      <CapabilityIndex />
      <Closing />
    </div>
  );
}

function FeatureHero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.heroGrid}>
          <div className={styles.heroTitle}>
            <h1>Change the agent. Keep the work.</h1>
          </div>
          <div className={styles.heroCopy}>
            <p>
              Use Claude Code, Codex, Antigravity, Cursor, or a custom
              Responses-compatible model inside one continuous conversation.
            </p>
            <div className={styles.heroActions}>
              <ButtonLink
                href="/download"
                data-analytics-cta="download_free"
                data-analytics-location="features_hero"
              >
                <Download size={16} /> Download Free
              </ButtonLink>
              <Link
                href="#continuity"
                data-analytics-cta="explore_handoff"
                data-analytics-location="features_hero"
              >
                Follow the handoff <ArrowDown size={15} />
              </Link>
            </div>
          </div>
        </div>
        <HandoffDiagram />
      </Container>
    </section>
  );
}

function HandoffDiagram() {
  return (
    <figure className={styles.handoff}>
      <figcaption>
        <span>One AguEdit conversation</span>
        <span>
          <i /> Context synchronized
        </span>
      </figcaption>
      <div className={styles.agentRoute}>
        {agents.map((agent, index) => (
          <div className={styles.agentStop} key={agent}>
            <strong>{agent}</strong>
            <small>{index === 1 ? "Answering now" : "Ready"}</small>
          </div>
        ))}
      </div>
      <div className={styles.memoryRail}>
        <RefreshCw size={15} aria-hidden="true" />
        <strong>Shared project context</strong>
        <span>Decisions</span>
        <span>Todos</span>
        <span>Summaries</span>
        <span>File notes</span>
      </div>
    </figure>
  );
}

function Continuity() {
  return (
    <section id="continuity" className={styles.continuity}>
      <Container className={styles.continuityGrid}>
        <div className={styles.sectionHeading}>
          <h2>A handoff without the restart.</h2>
          <p>
            AguEdit separates the project conversation from the tool handling
            the next message. You choose who works next; the context stays put.
          </p>
        </div>
        <ol className={styles.continuityList}>
          {continuityPoints.map(([title, description]) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{description}</p>
              <Check size={15} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Workspace() {
  return (
    <section className={styles.workspace}>
      <Container>
        <div className={styles.workspaceHeading}>
          <h2>More than the conversation.</h2>
          <p>
            Code, Git, plans, terminals, and the browser remain alongside the
            thread, so every agent works against the same visible project.
          </p>
        </div>
        <div className={styles.workspaceList}>
          {pillars.map((pillar) => (
            <Link
              href={pillar.href}
              key={pillar.id}
              data-analytics-cta={`explore_${pillar.id}`}
              data-analytics-location="features_workspace"
            >
              <pillar.icon size={18} aria-hidden="true" />
              <strong>{pillar.label}</strong>
              <p>{pillar.summary}</p>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CapabilityIndex() {
  return (
    <section className={styles.ledger}>
      <Container>
        <div className={styles.ledgerHeading}>
          <h2>The system behind the handoff.</h2>
          <p>
            Five layers connect agent choice, project history, workspace tools,
            extensions, and run control.
          </p>
        </div>
        <div className={styles.groups}>
          {orderedGroups.map((group) => (
            <FeatureGroupRow key={group.id} group={group} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeatureGroupRow({ group }: { group: FeatureGroup }) {
  return (
    <article className={styles.group} id={group.id}>
      <div className={styles.groupIntro}>
        <h3>{group.title}</h3>
        <small>{group.description}</small>
      </div>
      <ul>
        {group.features.map((feature) => (
          <li key={feature.title}>
            <feature.icon size={16} aria-hidden="true" />
            <div>
              <strong>{feature.title}</strong>
              <span>{feature.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Closing() {
  return (
    <section className={styles.closing}>
      <Container className={styles.closingInner}>
        <div>
          <h2>Pick up the same work with the agent you choose.</h2>
        </div>
        <ButtonLink
          href="/download"
          data-analytics-cta="download_free"
          data-analytics-location="features_closing"
        >
          <Download size={16} /> Download Free
        </ButtonLink>
      </Container>
    </section>
  );
}
