#!/usr/bin/env bash
# classify-changes.sh — repository-owned risk classifier for CI (Issue #137).
#
# Reads one changed path per line on stdin and prints a single risk tier:
#
#   docs    — documentation / policy-only change: git diff --check + focused
#             review are sufficient; no dependency install, unit tests, build,
#             or Playwright.
#   data    — data and evidence changes: focused unit and browser checks.
#   normal  — runtime-adjacent change: run typecheck / lint / test / build.
#   core    — core runtime change or mixed data and normal changes:
#             normal runtime gates plus both browser checks.
#
# Unknown paths are treated as "normal" so new runtime files are never skipped.
#
# The classifier deliberately stays dependency-free (POSIX-ish bash) and
# prefers simple prefix matching over a third-party path-filter action.

set -u
IFS=$'\n\t'

files=()
while IFS= read -r line; do
  [ -z "$line" ] && continue
  files+=("$line")
done

# Empty input (no changed files) is trivially docs-only. Guard the empty-array
# expansion explicitly: under `set -u`, bash < 4.4 rejects "${files[@]}" when
# the array is empty.
if [ "${#files[@]}" -eq 0 ]; then
  echo "docs"
  exit 0
fi

risk="docs"
has_data=false

for path in "${files[@]}"; do
  case "$path" in
    e2e/* | playwright*.config.ts)
      risk="core"
      break
      ;;
    *.test.* | *.spec.*) risk="normal"; continue ;;
    src/data/journey-records/* | docs/data-evidence/* | docs/research/* | research/*)
      has_data=true
      continue
      ;;
  esac
  # normal runtime: deliberately narrow allowlist of isolated presentation
  # surfaces that the deterministic core journey never enters. Adding a new
  # path here requires classifier regression coverage; all other src/** paths
  # stay core by conservative fallback below.
  case "$path" in
    src/pages/BadgesPage.* | src/pages/PokedexPage.* | src/pages/UiShowcasePage.*)
      risk="normal"
      continue
      ;;
  esac

  # core-risk: every other application source path, the E2E contract itself,
  # and the build/tooling configuration that shapes the shipped bundle. This
  # keeps journey, routing, persistence, shared-interaction, i18n, and demo data
  # changes core even when a new file has not yet been named explicitly.
  if [[ "$path" == src/* ]]; then
    risk="core"
    break
  fi
  case "$path" in
    vite.config.ts | tsconfig.json | tsconfig.app.json \
      | tsconfig.node.json | package.json | pnpm-lock.yaml \
      | pnpm-workspace.yaml | eslint.config.js | index.html)
      risk="core"
      break
      ;;
    .github/workflows/ci.yml)
      # Changes to the release gate must exercise the gate itself. Treating
      # this workflow as docs-only would skip the E2E job being changed.
      risk="core"
      break
      ;;
  esac
  # docs / policy-only: documentation, issue/PR templates, non-release-gate
  # workflows, and agent guidance. scripts/ is not policy: data-ingest logic
  # is covered by vitest and falls through to "normal".
  if [[ "$path" == docs/* || "$path" == .github/* || "$path" == .claude/* \
    || "$path" == .omc/* || "$path" == *.md ]]; then
    continue
  fi
  # Unknown paths are conservatively runtime-related.
  risk="normal"
done

if [ "$has_data" = true ]; then
  case "$risk" in
    docs) risk="data" ;;
    normal) risk="core" ;;
  esac
fi

echo "$risk"
