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
npm run build
npm run start
```

## Environment

See [`.env.example`](./.env.example). Summary:

| Variable               | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO, sitemap, robots, OG images.                      |
| `GITHUB_TOKEN`         | Optional read-only token for the fallback GitHub API request.           |

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
macOS only for now, unsigned (no paid Apple cert).

```
Push/merge to main (private desktop-app repo)
  → GitHub Actions builds an unsigned macOS .dmg
  → gh release create … on the PUBLIC releases repo
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

| Route                   | Method | Purpose                                                                     |
| ----------------------- | ------ | --------------------------------------------------------------------------- |
| `/api/releases/latest`  | GET    | Public JSON of the current release (CORS-enabled).                          |
| `/api/download/[slug]`  | GET    | 302 to an artifact (`auto` = detect OS); `?mode=stream` proxies the bytes.  |

The download button streams `?mode=stream` same-origin and shows progress —
the web analogue of the desktop app's download flow — then saves the file.

The desktop app polls `/api/releases/latest` (splash-screen check + a background
poll every ~15 min) and compares its own version against `version` to decide
whether to prompt for an update.

### Wiring up CI

Copy [`examples/github-actions-release.yml`](./examples/github-actions-release.yml)
into the **private desktop-app** repo. On push to `main` it builds an unsigned
universal macOS `.dmg` and creates a release on the public releases repo (using a
`RELEASES_REPO_TOKEN` PAT with `Contents: write` there), then bumps the minor
version. No callback to the site is needed — it pulls on its own.

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
examples/                  # CI workflow to copy into the private desktop repo
```

## Deploy

Designed for Vercel. Set `NEXT_PUBLIC_SITE_URL` (and optionally `GITHUB_TOKEN`)
in the project settings and point the `aguedit.com` domain at the
deployment. No database or external services required.
