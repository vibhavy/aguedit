import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Blocks,
  Check,
  ChevronDown,
  Download,
  Folder,
  GitBranch,
  Globe,
  ListTodo,
  MessageSquare,
  Plus,
  Search,
  SquareTerminal,
} from "lucide-react";
import { ButtonLink, Container } from "@/components/ui";
import previewStyles from "./app-preview.module.css";
import styles from "./native-home.module.css";

const trustSignals = [
  "Shared project memory",
  "No AguEdit account",
  "Runs on your machine",
] as const;

export function NativeHome() {
  return (
    <section className={styles.home} data-native-home>
      <div className={styles.productField} aria-hidden="true" />
      <Container className={styles.layout}>
        <HeroCopy />
        <ProductStage />
      </Container>
    </section>
  );
}

function HeroCopy() {
  return (
    <div className={styles.copy}>
      <h1>
        Use multiple agents in one conversation—
        <span>without losing context.</span>
      </h1>
      <p className={styles.description}>
        Switch between Claude Code, Codex, Antigravity, and Cursor—or connect
        your own model through a Responses-compatible endpoint.
      </p>
      <HeroActions />
      <TrustSignals />
    </div>
  );
}

function HeroActions() {
  return (
    <div className={styles.actions}>
      <ButtonLink href="/download" data-analytics-location="home_hero">
        <Download size={16} /> Download Free
      </ButtonLink>
      <Link href="/features">
        Features <ArrowRight size={15} />
      </Link>
    </div>
  );
}

function TrustSignals() {
  return (
    <ul className={styles.trustSignals}>
      {trustSignals.map((signal) => (
        <li key={signal}>
          <Check size={13} /> {signal}
        </li>
      ))}
    </ul>
  );
}

function ProductStage() {
  return (
    <figure className={styles.stage}>
      <AguEditPreview />
      <figcaption>
        One conversation. Your choice of agent. Shared project context.
      </figcaption>
    </figure>
  );
}

function AguEditPreview() {
  return (
    <div
      className={previewStyles.appPreview}
      role="img"
      aria-label="The AguEdit application with its project rail, contextual sidebar, conversation workspace, composer, and status bar"
    >
      <PreviewTitlebar />
      <div className={previewStyles.appBody}>
        <PreviewRail />
        <PreviewSidebar />
        <PreviewWorkspace />
      </div>
      <PreviewStatusbar />
    </div>
  );
}

function PreviewTitlebar() {
  return (
    <div className={previewStyles.previewTitlebar}>
      <div className={previewStyles.appIdentity}>
        <Image src="/aguedit-icon.png" width={18} height={18} alt="" />
        <span>AguEdit</span>
      </div>
      <div className={previewStyles.projectSwitcher}>
        <Folder size={11} /> AguEdit <ChevronDown size={10} />
      </div>
      <Plus className={previewStyles.titlebarAdd} size={13} />
      <Bell className={previewStyles.titlebarBell} size={13} />
    </div>
  );
}

const railItems = [
  Search,
  MessageSquare,
  ListTodo,
  Folder,
  GitBranch,
  SquareTerminal,
  Globe,
  Blocks,
] as const;

function PreviewRail() {
  return (
    <div className={previewStyles.previewRail}>
      {railItems.map((Icon, index) => (
        <span
          key={index}
          className={index === 1 ? previewStyles.railActive : undefined}
        >
          <Icon size={12} />
        </span>
      ))}
    </div>
  );
}

function PreviewSidebar() {
  return (
    <div className={previewStyles.previewSidebar}>
      <div className={previewStyles.sidebarHeading}>
        <span>CONVERSATIONS</span>
        <Plus size={11} />
      </div>
      <div className={previewStyles.newConversation}>+ New conversation</div>
      <p>RECENT</p>
      <div className={previewStyles.sidebarActive}>Agent continuity</div>
      <div>Provider setup</div>
      <div>Release checklist</div>
    </div>
  );
}

function PreviewWorkspace() {
  return (
    <div className={previewStyles.previewWorkspace}>
      <div className={previewStyles.previewTabs}>
        <span className={previewStyles.projectTab}>AguEdit</span>
        <span className={previewStyles.workspaceTab}>Agent continuity</span>
        <span className={previewStyles.closeTab}>×</span>
      </div>
      <PreviewConversation />
      <PreviewComposer />
    </div>
  );
}

function PreviewConversation() {
  return (
    <div className={previewStyles.previewConversation}>
      <div className={previewStyles.userMessage}>
        Continue this project with Codex.
      </div>
      <div className={previewStyles.agentMessage}>
        <div className={previewStyles.agentBadge}>C</div>
        <div>
          <strong>Codex</strong>
          <p>Project context loaded. Continuing from the shared plan.</p>
          <div className={previewStyles.contextReceipt}>
            <Check size={10} /> Shared context attached
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewComposer() {
  return (
    <div className={previewStyles.previewComposer}>
      <span>Ask AguEdit to continue…</span>
      <div>
        <small>Trusted machine</small>
        <small>Codex</small>
        <span className={previewStyles.previewSend}>
          <ArrowRight size={10} />
        </span>
      </div>
    </div>
  );
}

function PreviewStatusbar() {
  return (
    <div className={previewStyles.previewStatusbar}>
      <span>
        <GitBranch size={9} /> main
      </span>
      <span>Shared context ready</span>
      <span>Codex · High</span>
    </div>
  );
}
