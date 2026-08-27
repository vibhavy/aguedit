import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AtSign,
  ArrowLeftRight,
  BellRing,
  Blocks,
  Bot,
  BrainCircuit,
  FileCode2,
  FileClock,
  FolderGit2,
  FolderTree,
  Gauge,
  GitBranch,
  Globe,
  History,
  Layers3,
  ListChecks,
  LockKeyhole,
  MessageSquareText,
  Route,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  SquareKanban,
  TerminalSquare,
  TimerOff,
  Workflow,
} from "lucide-react";

/**
 * Product pillars — the top-level capabilities surfaced in the header Features
 * menu and on the homepage. This is the single list to extend when a new
 * feature ships in the desktop app; every navigation surface reads from it.
 * `href` points at the matching anchor on the /features page.
 */
export interface Pillar {
  id: string;
  label: string;
  summary: string;
  icon: LucideIcon;
  /** Per-feature accent (never purple); each feature page owns this hue. */
  accent: string;
  href: string;
}

export const pillars: Pillar[] = [
  {
    id: "ai-coding",
    label: "AI-based coding",
    summary: "Four coding-agent CLIs and custom models in one thread.",
    icon: Bot,
    accent: "#2563eb",
    href: "/features/ai-coding",
  },
  {
    id: "manual-coding",
    label: "Manual coding",
    summary: "A real Monaco editor with full diffs and language grammars.",
    icon: FileCode2,
    accent: "#0d9488",
    href: "/features/manual-coding",
  },
  {
    id: "git",
    label: "Git",
    summary: "Stage, commit, branch, and push across every repository.",
    icon: FolderGit2,
    accent: "#ea580c",
    href: "/features/git",
  },
  {
    id: "planning",
    label: "Planning",
    summary: "Turn a request into tasks you can assign and track.",
    icon: SquareKanban,
    accent: "#059669",
    href: "/features/planning",
  },
  {
    id: "terminal",
    label: "Terminal",
    summary: "Persistent PTY tabs that survive a restart.",
    icon: TerminalSquare,
    accent: "#0ea5e9",
    href: "/features/terminal",
  },
  {
    id: "browser",
    label: "Browser",
    summary: "A built-in browser for docs, previews, and agent logins.",
    icon: Globe,
    accent: "#0891b2",
    href: "/features/browser",
  },
];

/**
 * Per-feature page content. Each pillar has one dedicated page at
 * /features/<slug>; the layout for each is hand-built and deliberately
 * distinct, but the copy lives here so a new feature is one entry to add.
 */
export interface FeatureCapability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeaturePage {
  slug: string;
  /** Short mono kicker, e.g. "AI-BASED CODING". */
  kicker: string;
  headline: string;
  lede: string;
  /** Non-purple accent hex; drives the page's --fp-accent. */
  accent: string;
  capabilities: FeatureCapability[];
  /** Small labelled facts rendered in the page's own signature block. */
  spec: { label: string; value: string }[];
}

export const featurePages: FeaturePage[] = [
  {
    slug: "ai-coding",
    kicker: "AI-based coding",
    headline: "Every coding agent, one conversation.",
    lede: "Move between Claude Code, Codex, Antigravity, and Cursor message by message, or connect a custom Responses-compatible model. Each native tool keeps its own session while the project keeps one shared memory.",
    accent: "#2563eb",
    capabilities: [
      {
        icon: ArrowLeftRight,
        title: "Switch agents mid-thread",
        description:
          "Hand a task to another connected agent without pasting summaries. The next agent resumes with the same decisions, todos, and file notes.",
      },
      {
        icon: Route,
        title: "Manual or AUTO routing",
        description:
          "Pin a tool and model, override a single message, or let local heuristics pick from the agents that are ready to run.",
      },
      {
        icon: Activity,
        title: "Live, stoppable runs",
        description:
          "Reasoning, commands, file changes, and token use stream as they happen. No guessed timeout — Stop stays yours.",
      },
      {
        icon: SlidersHorizontal,
        title: "Model, effort, and access per message",
        description:
          "Choose the model, effort level, and read-only, workspace-edit, or full access for each turn.",
      },
    ],
    spec: [
      { label: "Agents", value: "Claude · Codex · Antigravity · Cursor" },
      { label: "Routing", value: "Manual / AUTO" },
      { label: "Timeout", value: "None" },
    ],
  },
  {
    slug: "manual-coding",
    kicker: "Manual coding",
    headline: "A real editor, not a chat box.",
    lede: "Monaco with bundled language grammars, find, folding, and full diffs sits in the same window as the agents — so you can take the keyboard back any time.",
    accent: "#0d9488",
    capabilities: [
      {
        icon: FileCode2,
        title: "Monaco editing",
        description:
          "Syntax highlighting, folding, multi-cursor, find and replace, and context menus across the languages you already work in.",
      },
      {
        icon: Layers3,
        title: "Complete diffs",
        description:
          "Review staged and unstaged changes side by side, then edit either side in place before you commit.",
      },
      {
        icon: FileClock,
        title: "Your edits become context",
        description:
          "Saving writes an atomic file note immediately, so the next agent sees exactly what you changed by hand.",
      },
      {
        icon: FolderTree,
        title: "A working project tree",
        description:
          "Create, rename, move, copy, reveal, and delete files through the same guarded project boundary used for reads.",
      },
    ],
    spec: [
      { label: "Editor", value: "Monaco" },
      { label: "Diffs", value: "Staged + unstaged" },
      { label: "Notes", value: "Atomic, on save" },
    ],
  },
  {
    slug: "git",
    kicker: "Git",
    headline: "Source control for every repository.",
    lede: "Stage, commit, branch, fetch, pull, push, sync, and manage stashes independently across every Git repository in a project — without leaving the editor.",
    accent: "#ea580c",
    capabilities: [
      {
        icon: FolderGit2,
        title: "Multi-repository aware",
        description:
          "A project can hold many repositories. Each keeps its own branch, staging area, and history side by side.",
      },
      {
        icon: GitBranch,
        title: "The full everyday flow",
        description:
          "Stage, discard, commit, branch, fetch, pull, push, sync, and stash — the operations you reach for every day.",
      },
      {
        icon: Layers3,
        title: "Review before you commit",
        description:
          "Inspect diffs hunk by hunk in the same view you edit in, so a commit is never a guess.",
      },
      {
        icon: TimerOff,
        title: "No operation deadline",
        description:
          "Long fetches and pushes run for as long as the network needs. You decide when to stop, not a timer.",
      },
    ],
    spec: [
      { label: "Repos", value: "Many per project" },
      { label: "Ops", value: "Stage → push → stash" },
      { label: "Review", value: "Hunk-level" },
    ],
  },
  {
    slug: "planning",
    kicker: "Planning",
    headline: "Turn a request into work you can track.",
    lede: "Break a change into tasks, assign each to a tool, model, and effort, discuss it in its own thread, and approve runs from the board or the notification bell.",
    accent: "#059669",
    capabilities: [
      {
        icon: SquareKanban,
        title: "Plans with real agent work",
        description:
          "Each task carries a tool, model, and effort. Approve it and the agent runs against it — the plan is not just a checklist.",
      },
      {
        icon: ListChecks,
        title: "One shared task vocabulary",
        description:
          "Task lists published by either agent become canonical todos. Matching stops repeated plans from filling memory with copies.",
      },
      {
        icon: MessageSquareText,
        title: "A thread per task",
        description:
          "Discuss and refine any task in its own conversation, with the project's shared context already loaded.",
      },
      {
        icon: BellRing,
        title: "Approve from anywhere",
        description:
          "Runs belong to the app, not a pane. Approve, watch, or stop from the board or the bell while you work elsewhere.",
      },
    ],
    spec: [
      { label: "Unit", value: "Assignable task" },
      { label: "Carries", value: "Tool · model · effort" },
      { label: "Control", value: "Board or bell" },
    ],
  },
  {
    slug: "terminal",
    kicker: "Terminal",
    headline: "Persistent shells that survive a restart.",
    lede: "Interactive PTY tabs keep running while you navigate. After a restart they restore their names, folders, and scrollback into clearly marked new shells.",
    accent: "#0ea5e9",
    capabilities: [
      {
        icon: TerminalSquare,
        title: "Real PTY tabs",
        description:
          "Full interactive shells — not a command runner. Run watchers, REPLs, and long processes the way you do in any terminal.",
      },
      {
        icon: History,
        title: "Restored after restart",
        description:
          "Tabs come back with their names, working directories, and scrollback, opened into clearly marked fresh shells.",
      },
      {
        icon: FolderTree,
        title: "Live working directory",
        description:
          "Each tab tracks its current directory as you move, so switching back always lands where you expect.",
      },
      {
        icon: Workflow,
        title: "Alongside everything else",
        description:
          "The terminal shares the tabbed centre with conversations, files, diffs, and plans — one window, no context switch.",
      },
    ],
    spec: [
      { label: "Type", value: "Interactive PTY" },
      { label: "Restart", value: "Names + cwd + scrollback" },
      { label: "Prompt", value: "Powerline, bundled" },
    ],
  },
  {
    slug: "browser",
    kicker: "Browser",
    headline: "A browser that stays in the window.",
    lede: "Open docs, preview a running app, or sign in to an agent in a built-in browser with its own tabs. Logins run in the site's own view — never through AguEdit.",
    accent: "#0891b2",
    capabilities: [
      {
        icon: Globe,
        title: "Its own tabs",
        description:
          "A real in-app browser with tabs, favicons, per-tab mute, and picture-in-picture — kept beside your code and terminals.",
      },
      {
        icon: MessageSquareText,
        title: "Preview and iterate",
        description:
          "Point a tab at your running dev server and watch it update as agents and your own edits change the code.",
      },
      {
        icon: LockKeyhole,
        title: "Sign in safely",
        description:
          "Agent logins happen in the site's own view. AguEdit never handles those credentials or sees the session.",
      },
      {
        icon: Route,
        title: "Links open here",
        description:
          "HTTP(S) links across AguEdit — and Cmd/Ctrl-clicked terminal links — open in a new in-app browser tab.",
      },
    ],
    spec: [
      { label: "Engine", value: "Built-in Chromium" },
      { label: "Tabs", value: "Favicons · mute · PiP" },
      { label: "Logins", value: "In the site's view" },
    ],
  },
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureGroup {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: Feature[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: "orchestration",
    eyebrow: "Agent orchestration",
    title: "Choose the right agent for every turn",
    description:
      "Claude Code, Codex, Antigravity, and Cursor keep their own strengths and native sessions. Custom Responses-compatible models can join the same workspace.",
    features: [
      {
        icon: ArrowLeftRight,
        title: "Switch agents inside a thread",
        description:
          "Move between connected agents message by message. Each native tool keeps its own resume session while sharing the project's durable context.",
      },
      {
        icon: Route,
        title: "Manual or AUTO routing",
        description:
          "Pin a tool and model, override a single message, or let local task heuristics choose from the agents that are ready to run.",
      },
      {
        icon: Activity,
        title: "Live, stoppable runs",
        description:
          "Responses, reasoning, commands, file changes, and token use stream as they happen. Runs have no guessed timeout; Stop remains yours.",
      },
      {
        icon: SlidersHorizontal,
        title: "Models, effort, and access",
        description:
          "Tool-owned model catalogues, supported effort levels, and read-only, workspace-editing, or full access are selectable per message.",
      },
    ],
  },
  {
    id: "continuity",
    eyebrow: "Project continuity",
    title: "The project remembers, even when the agent changes",
    description:
      "Project notes live with the repository in a local store you can inspect. Each agent can read the same decisions, tasks, and file notes.",
    features: [
      {
        icon: BrainCircuit,
        title: "Canonical project memory",
        description:
          "Decisions, context summaries, todos, and file notes live in one append-only project history that every adapter receives.",
      },
      {
        icon: History,
        title: "Existing history, discovered live",
        description:
          "Browse Claude Code and Codex projects and conversations from their local session stores without importing or duplicating them.",
      },
      {
        icon: ListChecks,
        title: "One shared task vocabulary",
        description:
          "Task lists published by either tool become canonical todos. Matching prevents repeated agent plans from filling memory with copies.",
      },
      {
        icon: SquareKanban,
        title: "Plans with real agent work",
        description:
          "Create project plans, assign each task to a tool, model, and effort, discuss it in its own thread, and approve runs from the board or bell.",
      },
      {
        icon: FileClock,
        title: "Your edits become context",
        description:
          "Saving through the embedded editor writes an atomic file note immediately, so the next agent sees what you changed by hand.",
      },
    ],
  },
  {
    id: "workspace",
    eyebrow: "Developer workspace",
    title: "Keep the work in one window",
    description:
      "Conversations are only one part of software work. Files, diffs, terminals, repositories, search, and plans share the same tabbed centre.",
    features: [
      {
        icon: Layers3,
        title: "Tabs across projects",
        description:
          "Keep conversations, files, diffs, terminals, and plan boards open across project switches. Every tab retains its project identity.",
      },
      {
        icon: FileCode2,
        title: "Monaco editing and complete diffs",
        description:
          "Edit with Monaco's bundled language grammars, find, folding, and context menus, or review staged and unstaged changes against the right side.",
      },
      {
        icon: TerminalSquare,
        title: "Real persistent terminal tabs",
        description:
          "Interactive PTY shells keep running while you navigate. After restart, tabs restore their names, folders, and scrollback into clearly marked new shells.",
      },
      {
        icon: FolderGit2,
        title: "Source control for every repository",
        description:
          "Stage, discard, commit, branch, fetch, pull, push, sync, and manage stashes independently across every Git repository in a project.",
      },
      {
        icon: FolderTree,
        title: "A working project directory",
        description:
          "Create, rename, move, copy, paste, reveal, and delete files and folders through the same guarded project boundary used for reads.",
      },
      {
        icon: Search,
        title: "Two kinds of search",
        description:
          "Find half-remembered filenames with a fast tree filter, or search file contents and conversation transcripts together and jump to the line.",
      },
      {
        icon: Globe,
        title: "A browser that stays in the window",
        description:
          "Open docs, preview a running app, or sign in to an agent in a built-in browser with its own tabs. Logins run in the site's own view, never through AguEdit.",
      },
    ],
  },
  {
    id: "extensions",
    eyebrow: "Extensions",
    title: "Bring plugins and skills into the conversation",
    description:
      "Discover agent-owned plugins, manage portable skills, and choose the capabilities a message should carry from one Extensions workspace.",
    features: [
      {
        icon: Blocks,
        title: "Plugin marketplace",
        description:
          "Browse, search, install, inspect, and remove plugins from supported agent catalogues without copying package identities or credentials into AguEdit.",
      },
      {
        icon: AtSign,
        title: "Plugins in the composer",
        description:
          "Choose an installed plugin with the same @ picker used for project files. AguEdit routes the message to the plugin's owning agent and validates it again before the run.",
      },
      {
        icon: Sparkles,
        title: "Personal and project skills",
        description:
          "Import portable Markdown skills for your machine or one project, alongside AguEdit's read-only starter skills.",
      },
      {
        icon: ShieldCheck,
        title: "Skills selected per message",
        description:
          "Attach up to three skills to a turn. AguEdit checks their revisions before execution and keeps the instruction bodies out of transcripts.",
      },
    ],
  },
  {
    id: "control",
    eyebrow: "Visibility and control",
    title: "Know what is running, spending, and changing",
    description:
      "Long agent sessions stay observable without forcing you to stare at one pane until they finish.",
    features: [
      {
        icon: BellRing,
        title: "Background runs and notifications",
        description:
          "Move to another thread, file, or project while work continues. The bell and desktop notifications take you back when a run finishes.",
      },
      {
        icon: Gauge,
        title: "Token and context visibility",
        description:
          "See conversation input and output totals, the active context share, and each tool's own published usage windows while work streams.",
      },
      {
        icon: LockKeyhole,
        title: "Per-message permission boundaries",
        description:
          "AguEdit translates one neutral access choice into the connected CLI's supported permission flags for that message.",
      },
      {
        icon: TimerOff,
        title: "No arbitrary work deadline",
        description:
          "Agent turns and Git operations run for as long as the work needs. You decide when to stop a run rather than losing it to a timer.",
      },
      {
        icon: ShieldCheck,
        title: "Local, guarded project state",
        description:
          "AguEdit has no account or hosted project database. Atomic writes and strict path checks keep its local state inside the project boundary.",
      },
    ],
  },
];

export const features = featureGroups.flatMap((group) => group.features);

export interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    icon: GitBranch,
    title: "Open or discover a project",
    description:
      "Pick any folder, or read existing Claude Code and Codex history directly from the tools' local session stores. Browsing writes nothing.",
  },
  {
    icon: Workflow,
    title: "Choose the agent and boundary",
    description:
      "Select the tool, model, effort, and access for this message, or leave routing on AUTO and watch the run stream in real time.",
  },
  {
    icon: MessageSquareText,
    title: "Continue with the whole story",
    description:
      "The next agent receives the shared decisions, todos, summaries, and file notes while its own native session resumes independently.",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "Which coding agents does AguEdit support?",
    answer:
      "Claude Code, Codex, Antigravity, and Cursor are registered today. You can also add a custom provider, model, and OpenAI Responses-compatible endpoint through Codex.",
  },
  {
    question: "Does AguEdit upload my projects?",
    answer:
      "AguEdit has no account, hosted project database, or telemetry pipeline for your work. Its project memory and conversations stay on disk. A coding agent or custom endpoint you connect may send prompts and selected code to its provider under that provider's terms.",
  },
  {
    question: "How does context survive an agent switch?",
    answer:
      "Each project has one local, append-only memory store for decisions, todos, summaries, and file notes. That same context is rendered for whichever adapter handles the next message, while each tool also retains its own resume session.",
  },
  {
    question: "Do I need an AguEdit account?",
    answer:
      "No AguEdit account is required. You sign in to each coding agent through its own CLI or browser flow, and AguEdit never handles those credentials.",
  },
  {
    question: "Can work continue when I switch projects?",
    answer:
      "Yes. Runs belong to the application rather than the pane that started them. You can move between conversations, files, terminals, plans, and projects, then return from the notification bell when work finishes.",
  },
  {
    question: "Which operating systems are supported?",
    answer:
      "AguEdit ships for macOS today, with Windows and Linux planned. It is built on a Tauri desktop shell, so those platforms follow as packaging is verified.",
  },
  {
    question: "How much does it cost?",
    answer:
      "AguEdit is free to download and use. You bring your own subscriptions or API access for the coding agents and custom providers you connect.",
  },
];

export interface DifferenceRow {
  capability: string;
  aguedit: boolean;
  singleCli: boolean;
  icon: LucideIcon;
}

export const differences: DifferenceRow[] = [
  {
    capability: "Use multiple coding agents in one workspace",
    aguedit: true,
    singleCli: false,
    icon: ArrowLeftRight,
  },
  {
    capability: "Keep context when switching tools or models",
    aguedit: true,
    singleCli: false,
    icon: BrainCircuit,
  },
  {
    capability: "Work across files, terminals, plans, and Git",
    aguedit: true,
    singleCli: false,
    icon: Layers3,
  },
  {
    capability: "See shared todos, decisions, and file notes",
    aguedit: true,
    singleCli: false,
    icon: ListChecks,
  },
  {
    capability: "Choose access per message",
    aguedit: true,
    singleCli: false,
    icon: LockKeyhole,
  },
  {
    capability: "Keep project state local and inspectable",
    aguedit: true,
    singleCli: true,
    icon: ShieldCheck,
  },
];
