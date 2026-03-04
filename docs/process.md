# CI + PR Governance Documentation (Zip QA Take-Home)

## 1. Overview
This repository demonstrates an automation-first quality gate for a small frontend app:
- Linting with **ESLint**
- Unit testing with **Vitest + Testing Library** (validating UI behavior)
- CI executed via **GitHub Actions** on every PR to `master` and on pushes to `master`

The goal is to prevent regressions by enforcing automated checks and PR governance prior to merge.

## 2. Pipeline behavior
Workflow file: `.github/workflows/ci.yml`

Triggers:
- `pull_request` (targeting `master`)
- `push` (to `master`)

Jobs:
- **Lint + Unit Tests**
  - `npm ci`
  - `npm run lint`
  - `npm test`

## 3. Merge controls (governance)
Configure in GitHub settings:

Branch protection (`master`):
- Require PR before merging
- Require **1 approval**
- Require CI checks to pass before merging
- (Recommended) require branch up-to-date
- Require linear history

Repo merge methods:
- Enable **squash merging**
- Enable **rebase merging**
- Disable **merge commits**

## 4. Ways the process can fail (real-world failure modes)
CI failures:
- Dependency install fails (lockfile drift, registry outage)
- Node version mismatch (local vs CI) causing test differences
- Overly strict lint rules blocking harmless changes
- Flaky tests (timing, async UI, shared state)
- CI resource limits/timeouts as suites grow

Governance failures:
- Required status check renamed/removed, breaking branch protection matching
- Admin bypass if "include administrators" not enabled
- PR approvals not meaningful without CODEOWNERS or clear ownership rules

Security/operations failures:
- Workflow permissions too broad (write access when read-only is enough)
- Third-party action supply-chain risk (pin versions, prefer reputable actions)

Scaling failures:
- Pipeline slows down (needs caching, parallelism, test sharding)
- Monorepo/path-based triggering not configured (runs too often or not enough)

## 5. Notifications: what gets sent and where
Default GitHub behavior:
- Status checks show pass/fail on the PR
- Contributors/watchers receive GitHub notifications for failed checks (and emails depending on GitHub notification settings)

Common evolutions:
- Slack notifications (GitHub → Slack app) for failed builds on `master`
- On-call escalation (PagerDuty) for production deploy failures only (not for unit/lint)

## 6. Stakeholders to involve as this evolves
- Engineering Managers: merge policies, release discipline, code ownership
- Infra/DevOps: CI performance, environments, secrets, deployment automation
- Security/Compliance: permissions, audit trails, supply chain controls
- Product/Support: release cadence, customer impact, incident response
- QA team: automation strategy, coverage, flake management, RCA loop

## 7. Next-step improvements (optional extensions)
- Add coverage thresholds and publish coverage reports
- Upload test reports/artifacts for visibility
- Separate jobs (lint/test/build) with concurrency
- Add CODEOWNERS + require code owner reviews for critical areas
- Add build validation (npm run build) as an additional required check
- Add release pipeline stages (build → test → deploy) with environment approvals
