import {
  Bell,
  Braces,
  Check,
  ChevronDown,
  FileClock,
  FileCode2,
  Folder,
  GitBranch,
  MessageSquare,
  Search,
  Terminal,
} from "lucide-react";
import { LogoMark } from "@/components/logo";

const conversations = [
  "Release the updater",
  "Headroom benchmark",
  "Polish empty state",
];
const files = ["src", "Architecture.md", "package.json"];

export function AppMock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`product-window ${className}`}
      aria-label="AguEdit product preview"
    >
      <WindowBar />
      <div className="product-workspace">
        <ActivityRail />
        <ProjectPanel />
        <Conversation />
      </div>
    </div>
  );
}

function WindowBar() {
  return (
    <div className="product-window-bar">
      <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
        <span className="window-dot bg-[#ff5f57]" />
        <span className="window-dot bg-[#febc2e]" />
        <span className="window-dot bg-[#28c840]" />
      </div>
      <div className="flex min-w-0 items-center gap-2.5 sm:ml-3">
        <LogoMark size={20} />
        <span className="truncate font-medium text-foreground">
          checkout-service
        </span>
        <ChevronDown size={12} className="text-muted" />
      </div>
      <div className="ml-auto hidden items-center gap-3 text-[10px] text-muted md:flex">
        <span className="product-context-label">46.2k tokens</span>
        <span className="product-context-meter">
          <i><b /></i> 73% left
        </span>
        <span className="product-bell"><Bell size={13} /><i>2</i></span>
      </div>
    </div>
  );
}

function ActivityRail() {
  return (
    <aside className="product-rail" aria-hidden="true">
      <RailIcon active icon={Search} />
      <RailIcon icon={MessageSquare} />
      <RailIcon icon={Folder} />
      <RailIcon icon={GitBranch} />
      <RailIcon icon={Terminal} />
    </aside>
  );
}

function RailIcon({
  icon: Icon,
  active = false,
}: {
  icon: typeof Search;
  active?: boolean;
}) {
  return (
    <span
      className={`product-rail-icon ${active ? "product-rail-icon-active" : ""}`}
    >
      <Icon size={14} />
    </span>
  );
}

function ProjectPanel() {
  return (
    <aside className="product-panel">
      <p className="product-label">Conversations</p>
      <div className="space-y-1">
        {conversations.map((item, index) => (
          <div
            key={item}
            className={`product-panel-row ${index === 0 ? "is-active" : ""}`}
          >
            <MessageSquare size={12} />
            <span className="truncate">{item}</span>
          </div>
        ))}
      </div>
      <p className="product-label mt-5">Project</p>
      <div className="space-y-1">
        {files.map((item, index) => (
          <div key={item} className="product-panel-row">
            {index === 0 ? <Folder size={12} /> : <FileCode2 size={12} />}
            <span>{item}</span>
          </div>
        ))}
      </div>
      <MemoryStatus />
    </aside>
  );
}

function MemoryStatus() {
  return (
    <div className="product-memory-card">
      <div className="flex items-center justify-between">
        <span className="font-medium text-foreground">Shared memory</span>
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
      </div>
      <p className="mt-1 text-[10px]">
        24 decisions · 9 todos · synced locally
      </p>
    </div>
  );
}

function Conversation() {
  return (
    <section className="product-conversation">
      <div className="product-tabs">
        <span className="product-tab is-active">Release the updater</span>
        <span className="product-tab hidden md:flex">Architecture.md</span>
      </div>
      <div className="product-thread">
        <UserMessage />
        <Handoff />
        <AgentReply />
        <Composer />
      </div>
    </section>
  );
}

function UserMessage() {
  return (
    <div className="ml-auto max-w-[84%] rounded-lg bg-surface-overlay px-3 py-2.5 text-[11px] leading-relaxed text-foreground sm:max-w-[72%]">
      Let Codex finish the updater work. Keep the decisions Claude already made.
    </div>
  );
}

function Handoff() {
  return (
    <div className="product-handoff-card">
      <div className="product-handoff">
        <span className="agent-chip">Claude Code</span>
        <span className="handoff-line"><span /></span>
        <span className="agent-chip agent-chip-active">Codex</span>
      </div>
      <p>
        <FileClock size={12} /> Project context carried over
        <small>0 pasted summaries</small>
      </p>
      <div className="product-handoff-facts">
        <span><Check size={10} /> 24 decisions</span>
        <span><Check size={10} /> 9 tasks</span>
        <span><Check size={10} /> 5 file notes</span>
      </div>
    </div>
  );
}

function AgentReply() {
  return (
    <div className="flex max-w-[92%] items-start gap-2.5">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand-soft text-brand-strong">
        <Braces size={13} />
      </span>
      <div className="space-y-2 text-[11px] leading-relaxed text-secondary">
        <p>
          I’ve picked up the release plan and the Gatekeeper decision. I’m
          wiring the download progress into the existing update service now.
        </p>
        <div className="product-change-card">
          <span className="text-kind-typescript">M</span>
          <span className="text-foreground">UpdatePopup.tsx</span>
          <span className="ml-auto text-success">+42</span>
          <span className="text-danger">−8</span>
        </div>
      </div>
    </div>
  );
}

function Composer() {
  return (
    <div className="product-composer">
      <span className="text-muted">Ask AguEdit anything…</span>
      <div className="mt-3 flex items-center gap-1.5">
        <span className="composer-chip">Codex</span>
        <span className="composer-chip">High</span>
        <span className="composer-chip">Workspace edit</span>
        <span className="ml-auto grid h-6 w-6 place-items-center rounded-md bg-brand text-[#17151e]">
          ↑
        </span>
      </div>
    </div>
  );
}
