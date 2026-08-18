import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowLeftRight,
  BellRing,
  BrainCircuit,
  FileCode2,
  FileClock,
  FolderGit2,
  FolderTree,
  Gauge,
  GitBranch,
  History,
  Layers3,
  ListChecks,
  LockKeyhole,
  MessageSquareText,
  Route,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  SquareKanban,
  TerminalSquare,
  TimerOff,
  Workflow,
} from "lucide-react";

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
      "Claude Code and Codex keep their own strengths and native sessions. AguEdit gives them one consistent place to work.",
    features: [
      {
        icon: ArrowLeftRight,
        title: "Switch agents inside a thread",
        description:
          "Move between Claude Code and Codex message by message. Each tool keeps its own resume session while sharing the project's durable context.",
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
          "AguEdit translates one neutral access choice into the correct Claude Code or Codex sandbox flags for that message.",
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
      "Claude Code and Codex today. Tool identifiers are registry-driven and adapters share one interface, so adding another agent does not require rewriting routing, persistence, or the workspace.",
  },
  {
    question: "Does AguEdit upload my projects?",
    answer:
      "AguEdit has no account, hosted project database, or telemetry pipeline for your work. Its project memory and conversations stay on disk. The Claude Code or Codex CLI you run may send prompts and selected code to its own provider under that provider's terms.",
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
      "AguEdit is free to download and use. You bring your own subscriptions or access for the underlying Claude Code and Codex CLIs.",
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
