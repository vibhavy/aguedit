# How to set up — AguEdit Marketing Website

Developer guide for the public marketing site at
[aguedit.com](https://aguedit.com).

Built with **Next.js 16** (App Router, Turbopack), **React 19**, **Tailwind CSS
v4**, and TypeScript. SEO-first, static-generated marketing pages plus a small
set of API routes that power downloads and release management.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000
```

Build & serve production:

```bash
npm run build             # plain Next.js production build
npm run start             # serve the Next output locally
npm run build:cloudflare  # Next.js + OpenNext Workers bundle
```

OpenNext invokes `npm run build` while producing its Workers bundle, so the
ordinary build script must remain the plain Next.js build. Point Cloudflare's
build setting at `npm run build:cloudflare` explicitly.

## Environment

See [`.env.example`](./.env.example). Summary:

| Variable               | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO, sitemap, robots, OG images.            |
| `GITHUB_TOKEN`         | Optional read-only token for the fallback GitHub API request. |

No database or secrets are required — the site reads releases straight from the
public GitHub releases repo.

## SEO

- Per-page metadata, canonical URLs, Open Graph + Twitter cards via `lib/seo.ts`.
- Structured data (JSON-LD): `SoftwareApplication`, `Organization`, `FAQPage`.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.
- A bespoke 1200×630 social card at `public/og-aguedit.png`.

## Release management

**Pull model.** The app's code lives in a private repo; built releases are
published to a separate **public** repo
(`vibhavy/aguedit`). Release automation writes a
small `latest.json` snapshot there after publishing the artifacts. The site
checks GitHub for a newer release and falls back to that durable snapshot when
the API is unavailable or rate-limited.
macOS releases support Apple Silicon. The current public command uses explicit
ad-hoc signing for CEF entitlements and documents the required one-time
Gatekeeper approval; Developer ID signing remains available for a future paid
certificate.

```
Local release-app on Apple Silicon
  → validates, ad-hoc signs, and uploads a draft .dmg
  → verifies the draft, pushes main, and publishes it as latest
  → writes and verifies latest.json in the PUBLIC releases repo
        │
   latest.json snapshot ◀── site pulls durable release metadata
        ├→ /download             download page (OS auto-detect + install help)
        ├→ /api/download/[slug]  302 → artifact  (slug "auto" = detect OS)
        └→ /api/releases/latest  public JSON — also polled by the desktop app
```

The snapshot prevents temporary GitHub API failures or rate limits from making
an existing release disappear. Upstream failures return `503`; only an
authoritative GitHub `404` is presented as “no release.”

### API routes

| Route                  | Method | Purpose                                                                    |
| ---------------------- | ------ | -------------------------------------------------------------------------- |
| `/api/releases/latest` | GET    | Public JSON of the current release (CORS-enabled).                         |
| `/api/download/[slug]` | GET    | 302 to an artifact (`auto` = detect OS); `?mode=stream` proxies the bytes. |

The download button streams `?mode=stream` same-origin and shows progress —
the web analogue of the desktop app's download flow — then saves the file.

The desktop app polls `/api/releases/latest` (splash-screen check + a background
poll every ~15 min) and compares its own version against `version` to decide
whether to prompt for an update.

### Release publisher

The private desktop repository publishes the current build with
`npm run release:unsigned`. That command validates the uploaded Apple Silicon
DMG and checksum, publishes the draft through the authenticated GitHub CLI
session, and updates `latest.json`. No Actions workflow or callback to the site
is needed—the site pulls release metadata.

## Project structure

```
src/
  app/                     # routes (marketing pages + api/* + sitemap/robots/og)
  components/              # header, footer, logo, UI primitives, app mock
  lib/
    site.ts                # name, URLs, nav, socials, releases repo
    content.ts             # features, steps, FAQ, comparison copy
    seo.ts                 # metadata builder + JSON-LD
    releases.ts            # release types + pull from the GitHub releases repo
    os.ts                  # OS detection, semver compare, byte formatting
examples/                  # public releases-repository bootstrap files
```

## Deploy

The production target is Cloudflare Workers through the OpenNext adapter. Set
`NEXT_PUBLIC_SITE_URL` (and optionally `GITHUB_TOKEN`) in Cloudflare, then run:

```bash
npm run preview  # build and test with the Workers runtime locally
npm run deploy   # build and deploy the aguedit Worker
```

For a Git-connected Cloudflare build, configure the commands explicitly:

| Setting        | Command                     |
| -------------- | --------------------------- |
| Build command  | `npm run build:cloudflare`  |
| Deploy command | `npm run deploy:cloudflare` |

Do not point `npm run build` back at OpenNext. OpenNext calls that script to
build Next.js, so doing so recursively launches OpenNext, npm, Node, and esbuild
until the machine runs out of processes and memory.

The committed `wrangler.jsonc` deliberately gives both the Worker and its
`WORKER_SELF_REFERENCE` service binding the name `aguedit`; these values must
remain identical. Point the `aguedit.com` custom domain at that Worker after the
first successful deployment. No database or external services are required.
