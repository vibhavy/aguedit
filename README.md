# AguEdit

**Code with Claude Code, Codex, Antigravity, and Cursor in one editor.**

AguEdit is a local-first desktop code editor built around coding agents. Run
Claude Code, Codex, Antigravity, and Cursor side by side, switch between them
without rebuilding project context, and keep files, diffs, Git, terminals, and
plans in the same window. No account, no hosted project database — your project
state stays on your disk.

**[Download for macOS →](https://aguedit.com/download)** ·
[aguedit.com](https://aguedit.com)

> This repository holds the **marketing website**. If you're here to work on the
> site, see **[how_to_setup.md](./how_to_setup.md)**.

---

## What AguEdit does

### Agent orchestration — choose the right agent for every turn

Claude Code, Codex, Antigravity, and Cursor keep their own strengths and native
sessions. AguEdit gives them one consistent place to work — with more agents in
the pipeline.

- **Switch agents inside a thread** — move between Claude Code, Codex,
  Antigravity, and Cursor message by message. Each tool keeps its own resume
  session while sharing the project's durable context.
- **Manual or AUTO routing** — pin a tool and model, override a single message,
  or let local task heuristics choose from the agents that are ready to run.
- **Live, stoppable runs** — responses, reasoning, commands, file changes, and
  token use stream as they happen. Runs have no guessed timeout; Stop stays
  yours.
- **Models, effort, and access** — tool-owned model catalogues, supported effort
  levels, and read-only, workspace-editing, or full access, selectable per
  message.

### Project continuity — the project remembers, even when the agent changes

Project notes live with the repository in a local store you can inspect. Every
agent can read the same decisions, tasks, and file notes.

- **Canonical project memory** — decisions, context summaries, todos, and file
  notes in one append-only project history that every adapter receives.
- **Existing history, discovered live** — browse Claude Code and Codex projects
  and conversations from their local session stores without importing or
  duplicating them.
- **One shared task vocabulary** — task lists published by either tool become
  canonical todos, with matching that stops repeated plans from filling memory
  with copies.
- **Plans with real agent work** — create project plans, assign each task to a
  tool, model, and effort, discuss it in its own thread, and approve runs from
  the board or the bell.
- **Your edits become context** — saving through the embedded editor writes an
  atomic file note immediately, so the next agent sees what you changed by hand.

### Developer workspace — keep the work in one window

Conversations are only one part of software work. Files, diffs, terminals,
repositories, search, and plans share the same tabbed centre.

- **Tabs across projects** — keep conversations, files, diffs, terminals, and
  plan boards open across project switches; every tab retains its project
  identity.
- **Monaco editing and complete diffs** — edit with Monaco's bundled language
  grammars, find, folding, and context menus, or review staged and unstaged
  changes side by side.
- **Real persistent terminal tabs** — interactive PTY shells keep running while
  you navigate. After restart, tabs restore their names, folders, and scrollback
  into clearly marked new shells.
- **Source control for every repository** — stage, discard, commit, branch,
  fetch, pull, push, sync, and manage stashes independently across every Git
  repository in a project.
- **A working project directory** — create, rename, move, copy, paste, reveal,
  and delete files and folders through the same guarded project boundary used
  for reads.
- **Two kinds of search** — filter half-remembered filenames with a fast tree
  filter, or search file contents and conversation transcripts together and jump
  to the line.

### Visibility and control — know what is running, spending, and changing

Long agent sessions stay observable without forcing you to stare at one pane
until they finish.

- **Background runs and notifications** — move to another thread, file, or
  project while work continues; the bell and desktop notifications take you back
  when a run finishes.
- **Token and context visibility** — see conversation input and output totals,
  the active context share, and each tool's own published usage windows while
  work streams.
- **Per-message permission boundaries** — one neutral access choice is
  translated into the correct sandbox flags for whichever agent handles that
  message.
- **No arbitrary work deadline** — agent turns and Git operations run for as long
  as the work needs. You decide when to stop a run rather than losing it to a
  timer.
- **Local, guarded project state** — no account or hosted project database.
  Atomic writes and strict path checks keep project state inside the project
  boundary.

## How it works

1. **Open or discover a project** — pick any folder, or read existing Claude Code
   and Codex history directly from the tools' local session stores. Browsing
   writes nothing.
2. **Choose the agent and boundary** — select the tool, model, effort, and
   access for this message, or leave routing on AUTO and watch the run stream in
   real time.
3. **Continue with the whole story** — the next agent receives the shared
   decisions, todos, summaries, and file notes while its own native session
   resumes independently.

## Privacy

AguEdit has no account, hosted project database, or telemetry pipeline for your
work. Project memory and conversations stay on disk. The agent CLI you run —
Claude Code, Codex, Antigravity, or Cursor — may send prompts and selected code
to its own provider under that provider's terms.

## Availability

macOS for Apple Silicon today. The current unsigned release requires one manual
approval in macOS Privacy & Security on first launch. Free to download.
**[Download →](https://aguedit.com/download)**

## Links

- Website — [aguedit.com](https://aguedit.com)
- Releases — [GitHub releases](https://github.com/vibhavy/aguedit/releases)
- Working on this site? — **[how_to_setup.md](./how_to_setup.md)**
