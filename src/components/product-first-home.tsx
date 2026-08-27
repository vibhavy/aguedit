import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  Code2,
  Download,
  FileCode2,
  FolderGit2,
  GitBranch,
  ListChecks,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import { LogoMark } from "@/components/logo";
import styles from "./product-first-home.module.css";

const chapters = [
  {
    label: "Agent handoff",
    title: "Move work from one coding agent to another.",
    text: "Start in Claude Code and continue in Codex, Antigravity, or Cursor. AguEdit carries the decisions, plan, todos, and file notes with the task.",
    icon: ArrowRight,
    visual: "handoff",
  },
  {
    label: "Editor",
    title: "See the code. Review every change.",
    text: "Work in a familiar editor with the project tree, open files, diffs, and agent conversation visible together.",
    icon: FileCode2,
    visual: "editor",
  },
  {
    label: "Agents",
    title: "Use the right agent for the task.",
    text: "Choose Claude Code, Codex, Antigravity, or Cursor for each task. More coding agents are in the pipeline.",
    icon: Bot,
    visual: "agents",
  },
  {
    label: "Git",
    title: "Finish the Git work in the editor.",
    text: "Review the diff, stage the right files, commit, pull, and push from the same workspace.",
    icon: FolderGit2,
    visual: "git",
  },
  {
    label: "Plans",
    title: "Turn a request into work you can follow.",
    text: "Break the change into tasks, assign an agent, approve the run, and see what is still left.",
    icon: ListChecks,
    visual: "plan",
  },
  {
    label: "Terminal",
    title: "Run the real commands without leaving.",
    text: "Keep tests, development servers, and interactive commands running in persistent terminal tabs.",
    icon: TerminalSquare,
    visual: "terminal",
  },
] as const;

export function ProductFirstHome({
  showNotice = false,
}: ProductFirstHomeProps) {
  return (
    <div className={styles.page}>
      {showNotice ? <WireframeNotice /> : null}
      <WireframeHero />
      <CapabilityStrip />
      <ChapterList />
      <WorkflowSection />
      <TrustSection />
      <FinalCallToAction />
    </div>
  );
}

type ProductFirstHomeProps = { showNotice?: boolean };

function WireframeNotice() {
  return (
    <div className={styles.notice}>
      <span>Homepage wireframe · Product-first direction</span>
      <span>Structure and copy hierarchy only</span>
    </div>
  );
}

function WireframeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <h1>The editor for coding with agents.</h1>
        <p className={styles.lede}>
          Edit code, work with multiple agents, hand tasks between them, review
          Git changes, plan the work, and run commands from one desktop app.
        </p>
        <HeroActions />
      </div>
      <HeroProduct />
    </section>
  );
}

function HeroActions() {
  return (
    <div className={styles.heroActions}>
      <Link
        href="/download"
        data-analytics-cta="download_free"
        data-analytics-location="wireframe_hero"
        className={styles.primaryAction}
      >
        <Download size={16} /> Download Free
      </Link>
      <a
        href="#features"
        data-analytics-cta="explore_features"
        data-analytics-location="wireframe_hero"
        className={styles.secondaryAction}
      >
        See how it works <ArrowRight size={15} />
      </a>
      <small>Free to download · Your project stays local</small>
    </div>
  );
}

function HeroProduct() {
  return (
    <div className={styles.heroProduct} aria-label="AguEdit product placement">
      <div className={styles.productBar}>
        <i />
        <i />
        <i />
        <span>
          <LogoMark size={18} /> checkout-service
        </span>
        <small>
          <GitBranch size={12} /> feature/session-guard
        </small>
      </div>
      <div className={styles.productBody}>
        <HeroSidebar />
        <HeroCode />
        <HeroAgent />
      </div>
      <div className={styles.productTerminal}>
        <b>TERMINAL</b>
        <span>$ npm test -- session</span>
        <em>12 tests passed</em>
      </div>
    </div>
  );
}

function HeroSidebar() {
  return (
    <aside className={styles.productSidebar}>
      <b>EXPLORER</b>
      <span>▾ src</span>
      <span>　▾ auth</span>
      <span className={styles.activeFile}>　　session.ts</span>
      <span>　　middleware.ts</span>
      <span>▸ tests</span>
      <span>Architecture.md</span>
    </aside>
  );
}

function HeroCode() {
  return (
    <div className={styles.productCode}>
      <header>
        session.ts <small>Modified</small>
      </header>
      <pre>{`24  const session = await store.get(token);
25
26  if (!session) return invalidSession();
27  await enforceBoundary(session.userId);
28
29  return session;`}</pre>
    </div>
  );
}

function HeroAgent() {
  return (
    <aside className={styles.productAgent}>
      <header>
        <Bot size={14} /> Codex <i>Working</i>
      </header>
      <p>Move validation behind the auth boundary and update the tests.</p>
      <div>
        <span>
          <Check size={12} /> Guard updated
        </span>
        <span>
          <Check size={12} /> Tests running
        </span>
      </div>
    </aside>
  );
}

function CapabilityStrip() {
  return (
    <div className={styles.capabilityStrip}>
      <span>
        <ArrowRight size={15} /> Agent handoff
      </span>
      <span>
        <Code2 size={15} /> Code editor
      </span>
      <span>
        <Bot size={15} /> Multiple agents
      </span>
      <span>
        <FolderGit2 size={15} /> Git workflow
      </span>
      <span>
        <ListChecks size={15} /> Plans
      </span>
      <span>
        <TerminalSquare size={15} /> Terminal
      </span>
    </div>
  );
}

function ChapterList() {
  return (
    <div id="features">
      {chapters.map((chapter, position) => (
        <FeatureChapter
          key={chapter.title}
          chapter={chapter}
          reverse={position % 2 === 1}
        />
      ))}
    </div>
  );
}

function FeatureChapter({ chapter, reverse }: ChapterProps) {
  const Icon = chapter.icon;
  return (
    <section className={`${styles.chapter} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.chapterCopy}>
        <h2>{chapter.title}</h2>
        <p>{chapter.text}</p>
        {chapter.visual === "handoff" ? <AgentRoster /> : null}
        <Link
          href="/features"
          data-analytics-cta={`explore_${chapter.label.toLowerCase().replaceAll(" ", "_")}`}
          data-analytics-location="wireframe_feature_chapter"
        >
          Explore {chapter.label.toLowerCase()} <ArrowRight size={14} />
        </Link>
      </div>
      <FeaturePlaceholder type={chapter.visual} icon={<Icon size={18} />} />
    </section>
  );
}

function AgentRoster() {
  return (
    <div className={styles.agentRoster} aria-label="Available coding agents">
      <small>Available now</small>
      <span>Claude Code</span>
      <span>Codex</span>
      <span>Antigravity</span>
      <span>Cursor</span>
      <em>More in the pipeline</em>
    </div>
  );
}

type ChapterProps = {
  chapter: (typeof chapters)[number];
  reverse: boolean;
};

function FeaturePlaceholder({
  type,
  icon,
}: {
  type: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={styles.featurePlaceholder}>
      <header>
        {icon}
        <span>Product UI · {type}</span>
      </header>
      {type === "handoff" ? <HandoffDiagram /> : <PlaceholderCanvas />}
      <footer>AguEdit workspace · {type}</footer>
    </div>
  );
}

function PlaceholderCanvas() {
  return (
    <div className={styles.placeholderBody}>
      <span className={styles.placeholderRail} />
      <div>
        <i />
        <i />
        <i />
        <i />
      </div>
      <aside>
        <i />
        <i />
        <i />
      </aside>
    </div>
  );
}

function HandoffDiagram() {
  return (
    <div className={styles.handoffDiagram}>
      <AgentStep name="Claude Code" state="Task reviewed" />
      <div className={styles.handoffRoute}>
        <span>Decisions, tasks, and file notes</span>
        <ArrowRight size={18} />
      </div>
      <AgentStep name="Codex" state="Continuing work" active />
      <p>
        <Check size={13} /> Context retained · no pasted summary
      </p>
    </div>
  );
}

function AgentStep({ name, state, active = false }: AgentStepProps) {
  return (
    <div
      className={`${styles.agentStep} ${active ? styles.activeAgentStep : ""}`}
    >
      <Bot size={18} />
      <span>
        <small>{state}</small>
        <strong>{name}</strong>
      </span>
      <i>{active ? "Active" : "Complete"}</i>
    </div>
  );
}

type AgentStepProps = { name: string; state: string; active?: boolean };

function WorkflowSection() {
  return (
    <section className={styles.workflow}>
      <h2>From request to tested change.</h2>
      <div className={styles.workflowSteps}>
        {[
          "Describe the change",
          "Choose an agent",
          "Review the plan",
          "Inspect the diff",
          "Run tests",
          "Commit",
        ].map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className={styles.trust}>
      <div>
        <h2>Your code stays on your machine.</h2>
        <p>
          AguEdit works with the tools and repositories already on your
          computer.
        </p>
      </div>
      <div className={styles.trustPoints}>
        <span>
          <ShieldCheck size={18} /> Local project memory
        </span>
        <span>
          <ShieldCheck size={18} /> Inspectable agent actions
        </span>
        <span>
          <ShieldCheck size={18} /> Explicit command approvals
        </span>
      </div>
    </section>
  );
}

function FinalCallToAction() {
  return (
    <section className={styles.finalCta}>
      <h2>Bring your agents into the editor.</h2>
      <p>Files, agents, Git, plans, and terminals in one project workspace.</p>
      <Link
        href="/download"
        data-analytics-cta="download_free"
        data-analytics-location="wireframe_closing"
        className={styles.primaryAction}
      >
        <Download size={16} /> Download Free
      </Link>
    </section>
  );
}
