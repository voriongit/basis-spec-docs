# basis-spec-docs

BASIS — Baseline Authority for Safe & Interoperable Systems. The open standard for AI agent governance.

This repo is the Docusaurus site for the BASIS specification, served at https://basis.vorion.org.

## Provenance

Extracted from the `voriongit/vorion` monorepo on 2026-04-22.

- **Source path**: `docs/basis-docs/`
- **Source commit**: `3d7ed92d6dba5705bcdd3f951dbd8929eb2f9a3a`
- **Method**: clean-snapshot extraction (no history carved). The original commit history remains accessible in the monorepo at `voriongit/vorion`.

This repo is now the canonical home for the BASIS spec site.

## What's inside

- 21 markdown files in `docs/` covering the six BASIS layers (CAR, INTENT, ENFORCE, TRUST, PROOF, CHAIN), the spec sections (capabilities, risk classification, trust scoring, policies, audit logging, regulatory compliance), implementation guides, compliance hub, and product overviews.
- 1 blog post (`blog/`)
- Custom homepage components (`src/components/`)
- Static assets (`static/img/`)
- Vercel config (`vercel.json`) — `git.deploymentEnabled: false` (CLI-only deploys)

An `/implementations` section absorbing `voriongit/basis-directory` is planned in a follow-up — see the merger strategy in `voriongit-ops/_design/`.

## Stack

- Docusaurus 3.9.2
- React 19
- `@easyops-cn/docusaurus-search-local` for offline search
- Node 20+

## Dev

```bash
npm install --legacy-peer-deps
npm start
```

## Build

```bash
npm run build
```

Output is written to `build/`.

## Deploy (Vercel, CLI-only)

```bash
npm run build
vercel --prod
```

Per `voriongit-ops/_design/feedback_vercel_deploy.md`, deploys are CLI-only — Vercel's git integration is disabled in `vercel.json`.

## CI

See `.github/workflows/ci.yml` — runs build verification on push and PR to `main`.

## License

Apache-2.0 — see [LICENSE](./LICENSE).

---

_Part of the [voriongit](https://github.com/voriongit) polyrepo ecosystem. See [voriongit/vorion-core](https://github.com/voriongit/vorion-core) for shared packages._

## Deploying

This repo is CLI-deployed to the Vercel project **basis-docs** (no git-auto):

```bash
npx vercel deploy --prod --yes
# then re-point the domain — the basis.vorion.org alias is deployment-pinned:
npx vercel alias set <new-deployment-url> basis.vorion.org --scope vorionsys
```

Skip the alias step and basis.vorion.org keeps serving the previous deployment.
(Permanent fix: move the domain to the basis-docs project in the Vercel dashboard,
then aliases follow production automatically.)
