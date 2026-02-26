# Deployment & Release

This document describes how to deploy the demo app and publish releases.

## Demo app (Vercel)

The demo at [nextjs-slides.vercel.app](https://nextjs-slides.vercel.app) is deployed from `examples/demo`.

### Vercel settings

| Setting | Value |
|---------|-------|
| **Root directory** | `examples/demo` (type manually; the picker may not show it) |
| **Output directory** | `.next` (default) |
| **Build command** | Uses the demo's `build` script |

The demo's `build` script builds the library first (`cd ../.. && npm install --include=dev && npm run build`), then runs `next build`. This is required because `dist/` is gitignored.

### Local run

```bash
npm run build && cd examples/demo && npm install && npm run dev
```

Open http://localhost:3000 and click "Open slides".

---

## Package releases

Releases are automated via [semantic-release](https://github.com/semantic-release/semantic-release). The package is published to **npm** (as `nextjs-slides`).

### Conventional commits

Use [Conventional Commits](https://www.conventionalcommits.org/) so semantic-release can determine the version bump:

| Commit type | Version bump |
|-------------|--------------|
| `fix: ...` | Patch (0.1.4 → 0.1.5) |
| `feat: ...` | Minor (0.1.4 → 0.2.0) |
| `feat!: ...` or `BREAKING CHANGE:` in footer | Major (0.1.4 → 1.0.0) |
| `chore:`, `docs:`, `ci:`, etc. | No release |

### Release flow

**Push to main** (with conventional commits) → Release workflow runs:
   - Analyzes commits since last release
   - Bumps version in `package.json`
   - Updates `CHANGELOG.md`
   - Publishes to npm
   - Creates Git tag and GitHub release
   - Pushes commit back to repo

### Manual release

To trigger a release without pushing:

1. Go to **Actions** → **Release**
2. Click **Run workflow** → **Run workflow**

### Required setup

Add **`NPM_TOKEN`** as a repository secret:

- **Settings** → **Secrets and variables** → **Actions**
- **New repository secret**
- Name: `NPM_TOKEN`
- Value: npm Automation or Granular token with "Bypass 2FA" from [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)

### Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **Release** | Push to main, or manual | semantic-release: version bump, npm publish, GitHub release |
| **CI** | Push/PR to main | Lint, commitlint (PRs), tests |
