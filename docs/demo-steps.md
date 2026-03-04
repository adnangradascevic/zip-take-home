# Demo Steps (for Loom)

1) `npm install`, `npm run dev`, show the page (tiny purchase widget).
2) Show `.github/workflows/ci.yml` triggers (PR + master push) and checks (lint + unit tests).
3) Create a branch `demo/fail-lint`.
4) Intentionally break lint:
   - Add `const unused = 123;` in `src/App.jsx` and do not use it.
5) Open PR to `master` and show:
   - CI fails
   - Merge is blocked (after branch protections are enabled)
6) Fix lint, push, show CI passes.
7) Get 1 approval.
8) Merge using squash or rebase; show merge commits are disabled and linear history is required.
9) Show CI runs on `master` after merge.
