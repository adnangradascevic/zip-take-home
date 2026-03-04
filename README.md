# Zip QA CI Take-Home (Frontend Sample)

This repo is a minimal **frontend app** (Vite + React) that demonstrates:
- **1 linter**: ESLint
- **1 set of unit tests**: Vitest + Testing Library
- A **CI pipeline** that runs on every PR to `master` and on pushes to `master` (GitHub Actions)

## Local setup

```bash
npm install
npm run lint
npm test
npm run dev
```

Open: http://localhost:5173

## CI pipeline

Workflow: `.github/workflows/ci.yml`

Triggers:
- `pull_request` targeting `master`
- `push` to `master`

Checks:
- `npm ci`
- `npm run lint`
- `npm test`

## Required repository settings (GitHub UI)

### 1) Require checks + 1 approval to merge PRs

Go to:
**Settings → Branches → Add branch protection rule**  
Branch: `master`

Enable:
- **Require a pull request before merging**
- **Require approvals** → set to **1**
- **Require status checks to pass before merging**
  - Select the CI check **“Lint + Unit Tests”**
- (Recommended) **Dismiss stale approvals when new commits are pushed**
- (Recommended) **Require branches to be up to date before merging**
- (Recommended) **Include administrators** (prevents admin bypass)
- ✅ **Require linear history**

### 2) Require squash + rebase for PR merging

Go to:
**Settings → General → Pull Requests**

Set merge methods:
- ✅ Allow **Squash merging**
- ✅ Allow **Rebase merging**
- ❌ Disable **Merge commits**

## Deliverables checklist

- [ ] Push this repo to GitHub
- [ ] Verify CI runs on PRs + on `master`
- [ ] Configure branch protection + merge method settings (above)
- [ ] Create a PR that fails (lint/test), show it blocks merge
- [ ] Fix it, get 1 approval, merge via squash/rebase
- [ ] Record a Loom walkthrough
- [ ] Export `docs/process.md` to PDF
 
