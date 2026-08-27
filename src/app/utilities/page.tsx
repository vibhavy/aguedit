import Link from "next/link";
import {
  ArrowDown,
  Braces,
  Check,
  ChevronDown,
  Copy,
  Download,
  GitCompareArrows,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink, Container } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import styles from "./utilities.module.css";

export const metadata = buildMetadata({
  title: "JSON Formatter and Diff Checker",
  path: "/utilities",
  description:
    "Format and validate JSON or compare original and changed text side by side with AguEdit's built-in utilities.",
  keywords: [
    "JSON formatter for developers",
    "JSON tree viewer",
    "side-by-side diff checker",
    "developer utilities",
  ],
});

const jsonPoints = [
  "Immediate syntax validation",
  "Collapsible object and array tree",
  "Copy formatted JSON",
];

const diffPoints = [
  "Editable original and changed panes",
  "Side-by-side change highlighting",
  "Built on AguEdit's editor diff surface",
];

export default function UtilitiesPage() {
  return (
    <div className={styles.page}>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Utilities", path: "/utilities" }])}
      />
      <UtilityHero />
      <JsonFormatterSection />
      <DiffCheckerSection />
      <UtilityClosing />
    </div>
  );
}

function UtilityHero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.heroGrid}>
          <div>
            <h1>Quick checks belong beside the work.</h1>
          </div>
          <div className={styles.heroAside}>
            <p>
              Format JSON or compare a change without moving project data into
              another browser tab.
            </p>
            <nav aria-label="Utility tools">
              <Link href="#json-formatter">
                JSON Formatter <ArrowDown size={14} />
              </Link>
              <Link href="#diff-checker">
                Diff Checker <ArrowDown size={14} />
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </section>
  );
}

function JsonFormatterSection() {
  return (
    <section id="json-formatter" className={styles.jsonSection}>
      <Container>
        <UtilityHeading
          title="JSON Formatter"
          description="See the structure, not the noise. Paste JSON to validate it and reveal its nested structure, then expand, inspect, and copy the formatted result."
        />
        <div className={styles.workbench}>
          <ToolRail active="json" />
          <JsonPreview />
        </div>
        <PointList points={jsonPoints} />
      </Container>
    </section>
  );
}

function DiffCheckerSection() {
  return (
    <section id="diff-checker" className={styles.diffSection}>
      <Container>
        <UtilityHeading
          title="Diff Checker"
          description="Read the change from both sides. Edit the original and changed versions directly in AguEdit, with additions and removals aligned as you type."
        />
        <DiffPreview />
        <PointList points={diffPoints} />
      </Container>
    </section>
  );
}

function UtilityHeading(props: { title: string; description: string }) {
  return (
    <div className={styles.utilityHeading}>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}

function ToolRail({ active }: { active: "json" | "diff" }) {
  return (
    <aside className={styles.toolRail} aria-label="AguEdit utilities preview">
      <p>Utilities</p>
      <div className={active === "json" ? styles.activeTool : undefined}>
        <Braces size={15} />
        <span>JSON Formatter</span>
      </div>
      <div className={active === "diff" ? styles.activeTool : undefined}>
        <GitCompareArrows size={15} />
        <span>Diff Checker</span>
      </div>
      <small>Local utility surface</small>
    </aside>
  );
}

function PointList({ points }: { points: readonly string[] }) {
  return (
    <ul className={styles.pointList}>
      {points.map((point) => (
        <li key={point}>
          <Check size={14} /> {point}
        </li>
      ))}
    </ul>
  );
}

function JsonPreview() {
  return (
    <figure className={styles.jsonPreview}>
      <figcaption>
        <span>project-context.json</span>
        <span className={styles.validState}>
          <i /> Valid JSON
        </span>
        <span>
          <Copy size={13} /> Copy
        </span>
      </figcaption>
      <div className={styles.jsonTree} aria-label="Example formatted JSON tree">
        <code>
          <span>
            <ChevronDown size={13} />
            &#123;
          </span>
          <span className={styles.indent}>
            <ChevronDown size={13} /> <b>&quot;project&quot;</b>: &#123;
          </span>
          <span className={styles.indent2}>
            <i /> <b>&quot;name&quot;</b>: <em>&quot;AguEdit&quot;</em>,
          </span>
          <span className={styles.indent2}>
            <i /> <b>&quot;local&quot;</b>: <mark>true</mark>,
          </span>
          <span className={styles.indent2}>
            <ChevronDown size={13} /> <b>&quot;agents&quot;</b>: [
          </span>
          <span className={styles.indent3}>
            <i /> <em>&quot;Claude Code&quot;</em>,
          </span>
          <span className={styles.indent3}>
            <i /> <em>&quot;Codex&quot;</em>,
          </span>
          <span className={styles.indent3}>
            <i /> <em>&quot;Cursor&quot;</em>
          </span>
          <span className={styles.indent2}>
            <i /> ]
          </span>
          <span className={styles.indent}>
            <i /> &#125;
          </span>
          <span>
            <i />
            &#125;
          </span>
        </code>
      </div>
      <div className={styles.previewStatus}>
        <span>Ln 1, Col 1</span>
        <span>UTF-8</span>
        <span>JSON</span>
      </div>
    </figure>
  );
}

function DiffPreview() {
  return (
    <figure className={styles.diffPreview}>
      <figcaption>
        <span>
          <GitCompareArrows size={14} /> Context handoff
        </span>
        <span>1 change</span>
      </figcaption>
      <div className={styles.diffHeaders}>
        <span>Original</span>
        <span>Changed</span>
      </div>
      <div className={styles.diffPanes} aria-label="Example side-by-side diff">
        <pre>
          <code>
            <span>
              <i>1</i>const agent = &quot;Codex&quot;;
            </span>
            <del>
              <i>2</i>const context = null;
            </del>
            <span>
              <i>3</i>run(agent, context);
            </span>
          </code>
        </pre>
        <pre>
          <code>
            <span>
              <i>1</i>const agent = &quot;Codex&quot;;
            </span>
            <ins>
              <i>2</i>const context = sharedMemory;
            </ins>
            <span>
              <i>3</i>run(agent, context);
            </span>
          </code>
        </pre>
      </div>
      <div className={styles.previewStatus}>
        <span>Side-by-side</span>
        <span>TypeScript</span>
        <span>1 addition · 1 removal</span>
      </div>
    </figure>
  );
}

function UtilityClosing() {
  return (
    <section className={styles.closing}>
      <Container className={styles.closingInner}>
        <div>
          <h2>Keep the small checks in the same workspace.</h2>
        </div>
        <ButtonLink
          href="/download"
          data-analytics-location="utilities_closing"
        >
          <Download size={16} /> Download Free
        </ButtonLink>
      </Container>
    </section>
  );
}
