import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  GitBranch,
  Lock,
} from "lucide-react";
import {
  aiCodingQuestions,
  aiCodingTopics,
  type FeatureCapability,
  type FeaturePage,
} from "@/lib/content";
import { Container } from "@/components/ui";

/* ------------------------------------------------------------------ *
 * Shared pieces. Each feature page below composes these into its own
 * deliberately different layout, tinted by --fp-accent (set on the route).
 * ------------------------------------------------------------------ */

function FpBack() {
  return (
    <Link href="/features" className="fp-back">
      <ArrowLeft size={15} aria-hidden="true" /> All features
    </Link>
  );
}

function FpActions({ location }: { location: string }) {
  return (
    <div className="fp-actions">
      <Link
        href="/download"
        data-analytics-location={location}
        className="fp-btn"
      >
        <Download size={17} aria-hidden="true" /> Download Free
      </Link>
      <Link href="/features" className="fp-btn--ghost">
        All features <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </div>
  );
}

function FpSpec({ spec }: { spec: FeaturePage["spec"] }) {
  return (
    <dl className="fp-spec">
      {spec.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function FpCaps({
  caps,
  cols = 2,
}: {
  caps: FeatureCapability[];
  cols?: 2 | 4;
}) {
  return (
    <div className={`fp-caps fp-caps--${cols}`}>
      {caps.map((cap) => (
        <article key={cap.title} className="fp-cap">
          <span className="fp-cap__icon">
            <cap.icon size={19} aria-hidden="true" />
          </span>
          <h3>{cap.title}</h3>
          <p>{cap.description}</p>
        </article>
      ))}
    </div>
  );
}

function FpCapsSection({
  title,
  caps,
  cols,
}: {
  title: string;
  caps: FeatureCapability[];
  cols?: 2 | 4;
}) {
  return (
    <Container className="fp-section">
      <div className="fp-section-head">
        <h2>{title}</h2>
      </div>
      <div className="mt-10">
        <FpCaps caps={caps} cols={cols} />
      </div>
    </Container>
  );
}

function FpCta({ headline }: { headline: string }) {
  return (
    <Container className="fp-section">
      <div className="fp-cta">
        <h2>{headline}</h2>
        <Link
          href="/download"
          data-analytics-location="feature_cta"
          className="fp-btn"
        >
          <Download size={17} aria-hidden="true" /> Download Free
        </Link>
      </div>
    </Container>
  );
}

function AiCodingSearchGuide() {
  return (
    <section className="fp-tool-guide">
      <Container>
        <div className="fp-tool-guide__head">
          <h2>How AguEdit fits with today&apos;s AI coding tools</h2>
          <p>
            A Claude Code GUI, a Codex desktop workspace, and an editor like VS
            Code or Zed solve different problems. AguEdit is built for the
            handoff between coding agents while the project context stays one.
          </p>
        </div>
        <dl className="fp-tool-guide__topics">
          {aiCodingTopics.map((topic) => (
            <div key={topic.name}>
              <dt>{topic.name}</dt>
              <dd>{topic.description}</dd>
            </div>
          ))}
        </dl>
        <div className="fp-tool-guide__questions">
          <h2>Questions developers ask before switching</h2>
          <div>
            {aiCodingQuestions.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Signature visuals — one per feature.
 * ------------------------------------------------------------------ */

function ThreadMock() {
  return (
    <div className="fp-thread" aria-hidden="true">
      <div className="fp-thread__bar">
        <i />
        <i />
        <i />
        <span>checkout-service · release-the-updater</span>
      </div>
      <div className="fp-thread__body">
        <div className="fp-msg fp-msg--user">
          Let Codex finish the updater. Keep the decisions Claude already made.
        </div>
        <div className="fp-handoff">
          <span className="fp-chip">Claude Code</span>
          <i />
          <span className="fp-chip is-on">Codex</span>
        </div>
        <p className="fp-thread__ctx">
          <Check size={12} /> Context carried over · 24 decisions · 9 tasks
        </p>
        <div className="fp-msg fp-msg--agent">
          Picked up the release plan and the Gatekeeper decision. Wiring the
          download progress into the update service now.
        </div>
        <div className="fp-thread__composer">
          Ask AguEdit anything…
          <span className="fp-chip">Codex</span>
          <span className="fp-chip">High</span>
        </div>
      </div>
    </div>
  );
}

function EditorMock() {
  return (
    <div className="fp-editor" aria-hidden="true">
      <div className="fp-editor__tabs">
        <span className="is-on">update-service.ts</span>
        <span>UpdatePopup.tsx</span>
      </div>
      <div className="fp-editor__code">
        <span>
          <em>39</em>
          <code>
            <b>export function</b> <i>checkForUpdate</i>() {"{"}
          </code>
        </span>
        <span className="del">
          <em>40</em>
          <code>{"  return fetch(oldEndpoint);"}</code>
        </span>
        <span className="add">
          <em>40</em>
          <code>{'  return fetch(releaseFeed, { cache: "no-store" });'}</code>
        </span>
        <span>
          <em>41</em>
          <code>{"}"}</code>
        </span>
      </div>
      <div className="fp-editor__status">
        <span>TypeScript</span>
        <span>UTF-8</span>
        <span>Ln 40, Col 18</span>
        <span>1 change</span>
      </div>
    </div>
  );
}

function DiffMock() {
  return (
    <div className="fp-diff" aria-hidden="true">
      <div className="fp-diff__bar">
        <GitBranch size={15} /> main <span>3 staged</span>
      </div>
      <ul>
        <li>
          <b className="m">M</b> src/updater/update-service.ts <em>+42</em>
        </li>
        <li>
          <b className="a">A</b> src/updater/release-feed.ts <em>+120</em>
        </li>
        <li>
          <b className="d">D</b> src/updater/legacy-check.ts{" "}
          <em className="minus">−64</em>
        </li>
      </ul>
      <div className="fp-diff__commit">Commit 3 files to main</div>
    </div>
  );
}

function BoardMock() {
  const columns = [
    {
      name: "Todo",
      cards: [{ title: "Add a rollback path", chips: ["Codex", "Medium"] }],
    },
    {
      name: "In progress",
      cards: [
        { title: "Wire download progress", chips: ["Codex", "High"], on: true },
      ],
    },
    {
      name: "Done",
      cards: [{ title: "Gatekeeper decision", chips: ["Claude Code", "—"] }],
    },
  ];
  return (
    <div className="fp-board" aria-hidden="true">
      {columns.map((column) => (
        <div key={column.name} className="fp-board__col">
          <p>
            {column.name} <span>{column.cards.length}</span>
          </p>
          {column.cards.map((card) => (
            <div
              key={card.title}
              className={`fp-board__card${"on" in card && card.on ? " is-on" : ""}`}
            >
              <strong>{card.title}</strong>
              <div>
                <span className="tool">{card.chips[0]}</span>
                <span>{card.chips[1]}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function TermMock() {
  return (
    <div className="fp-term" aria-hidden="true">
      <div className="fp-term__bar">
        <i />
        <i />
        <i />
        <span>zsh — checkout-service</span>
      </div>
      <pre>
        <span>
          <u>~/checkout-service</u> <b>❯</b> pnpm dev{"\n"}
        </span>
        <span>
          <i>ready</i> — server on http://localhost:3000{"\n"}
        </span>
        <span>
          <u>~/checkout-service</u> <b>❯</b> git status{"\n"}
        </span>
        <span>
          On branch <i>main</i> · 3 files staged{"\n"}
        </span>
        <span>
          <u>~/checkout-service</u> <b>❯</b>{" "}
          <span className="fp-term__cursor" />
        </span>
      </pre>
    </div>
  );
}

function BrowserMock() {
  return (
    <div className="fp-browser" aria-hidden="true">
      <div className="fp-browser__tabs">
        <span className="fp-browser__tab is-on">
          <i /> localhost:3000
        </span>
        <span className="fp-browser__tab">
          <i /> React docs
        </span>
        <span className="fp-browser__tab">
          <i /> Claude sign-in
        </span>
      </div>
      <div className="fp-browser__bar">
        <div className="fp-browser__url">
          <Lock size={12} /> localhost:3000
        </div>
      </div>
      <div className="fp-browser__view">
        <h4>Your app, live</h4>
        <p>
          Preview the running dev server beside your code and terminals — it
          updates as agents and your own edits change the code.
        </p>
        <i />
        <i />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Per-feature pages. Distinct layouts, one per feature.
 * ------------------------------------------------------------------ */

function AiCodingPage({ page }: { page: FeaturePage }) {
  return (
    <>
      <section className="fp-hero fp-section">
        <Container>
          <div className="fp-hero--split">
            <div className="fp-hero__copy">
              <FpBack />
              <h1 className="fp-title">{page.headline}</h1>
              <p className="fp-lede">{page.lede}</p>
              <FpActions location="feature_ai_coding" />
              <FpSpec spec={page.spec} />
            </div>
            <ThreadMock />
          </div>
        </Container>
      </section>
      <FpCapsSection title="One thread, many agents" caps={page.capabilities} />
      <AiCodingSearchGuide />
      <FpCta headline="Bring your own agents. Keep one memory." />
    </>
  );
}

function ManualCodingPage({ page }: { page: FeaturePage }) {
  return (
    <>
      <section className="fp-hero fp-hero--center fp-section">
        <Container>
          <div className="fp-hero__copy">
            <FpBack />
            <h1 className="fp-title">{page.headline}</h1>
            <p className="fp-lede">{page.lede}</p>
            <FpActions location="feature_manual_coding" />
          </div>
        </Container>
        <Container className="mt-14">
          <EditorMock />
        </Container>
      </section>
      <FpCapsSection
        title="Everything a real editor gives you"
        caps={page.capabilities}
        cols={4}
      />
      <FpCta headline="Take the keyboard back any time." />
    </>
  );
}

function GitPage({ page }: { page: FeaturePage }) {
  return (
    <>
      <section className="fp-hero fp-section">
        <Container>
          <div className="fp-hero--split">
            <DiffMock />
            <div className="fp-hero__copy">
              <FpBack />
              <h1 className="fp-title">{page.headline}</h1>
              <p className="fp-lede">{page.lede}</p>
              <FpActions location="feature_git" />
              <FpSpec spec={page.spec} />
            </div>
          </div>
        </Container>
      </section>
      <FpCapsSection
        title="Every repository, no context switch"
        caps={page.capabilities}
      />
      <FpCta headline="Review, commit, and push where you code." />
    </>
  );
}

function PlanningPage({ page }: { page: FeaturePage }) {
  return (
    <>
      <section className="fp-hero fp-hero--center fp-section">
        <Container>
          <div className="fp-hero__copy">
            <FpBack />
            <h1 className="fp-title">{page.headline}</h1>
            <p className="fp-lede">{page.lede}</p>
            <FpActions location="feature_planning" />
          </div>
        </Container>
        <Container className="mt-14">
          <BoardMock />
        </Container>
      </section>
      <FpCapsSection
        title="A plan that actually runs"
        caps={page.capabilities}
      />
      <FpCta headline="From a request to work you can track." />
    </>
  );
}

function TerminalPage({ page }: { page: FeaturePage }) {
  return (
    <>
      <Container className="fp-section">
        <div className="fp-hero--dark">
          <div className="fp-hero--split">
            <div className="fp-hero__copy">
              <FpBack />
              <h1 className="fp-title">{page.headline}</h1>
              <p className="fp-lede">{page.lede}</p>
              <FpActions location="feature_terminal" />
            </div>
            <TermMock />
          </div>
        </div>
      </Container>
      <FpCapsSection
        title="Shells that stay with the project"
        caps={page.capabilities}
      />
      <FpCta headline="Keep your processes running while you work." />
    </>
  );
}

function BrowserPage({ page }: { page: FeaturePage }) {
  return (
    <>
      <section className="fp-hero fp-hero--center fp-section">
        <Container>
          <div className="fp-hero__copy">
            <FpBack />
            <h1 className="fp-title">{page.headline}</h1>
            <p className="fp-lede">{page.lede}</p>
            <FpActions location="feature_browser" />
          </div>
        </Container>
        <Container className="mt-14">
          <BrowserMock />
        </Container>
      </section>
      <FpCapsSection
        title="Docs, previews, and logins in one place"
        caps={page.capabilities}
        cols={4}
      />
      <FpCta headline="Keep the web where you keep your code." />
    </>
  );
}

const registry: Record<
  string,
  (props: { page: FeaturePage }) => React.ReactElement
> = {
  "ai-coding": AiCodingPage,
  "manual-coding": ManualCodingPage,
  git: GitPage,
  planning: PlanningPage,
  terminal: TerminalPage,
  browser: BrowserPage,
};

export function FeaturePageBody({ page }: { page: FeaturePage }) {
  const Body = registry[page.slug] ?? AiCodingPage;
  return <Body page={page} />;
}
