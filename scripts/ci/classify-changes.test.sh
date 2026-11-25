#!/usr/bin/env bash
# Table-driven regression tests for the repository-owned CI risk classifier.

set -eu

script_dir="$(cd "$(dirname "$0")" && pwd)"
classifier="$script_dir/classify-changes.sh"

assert_risk() {
  expected="$1"
  label="$2"
  paths="$3"
  actual="$(printf '%s\n' "$paths" | bash "$classifier")"
  if [ "$actual" != "$expected" ]; then
    printf 'FAIL: %s — expected %s, got %s\n' "$label" "$expected" "$actual" >&2
    exit 1
  fi
}

assert_risk docs 'docs-only' 'docs/README.md'
assert_risk docs 'empty change set' ''
assert_risk data 'data only' $'src/data/journey-records/b08.ts\nsrc/data/journey-records/publication/b08.ts\ndocs/data-evidence/b08/source.md\ndocs/research/b08.md'
assert_risk core 'data and shared code' $'src/data/journey-records/b08.ts\nsrc/lib/shared.ts'
assert_risk normal 'test only' 'src/data/journey-record.test.ts'
assert_risk normal 'data and test' $'src/data/journey-records/b08.ts\nsrc/data/journey-record.test.ts'
assert_risk normal 'test and data' $'src/data/journey-record.test.ts\nsrc/data/journey-records/b08.ts'
assert_risk normal 'isolated non-core page' 'src/pages/BadgesPage.tsx'
assert_risk normal 'paired non-core page test' 'src/pages/BadgesPage.test.tsx'
assert_risk core 'unknown source asset' 'src/assets/demo-data.json'
assert_risk core 'core journey page' 'src/pages/s0s3/ResultPage.tsx'
assert_risk core 'routing' 'src/app/AppRouter.tsx'
assert_risk core 'persistence' 'src/lib/mogu-recent.ts'
assert_risk core 'shared interaction' 'src/ui/index.tsx'
assert_risk core 'MVP smoke spec only' 'e2e/current-mvp-smoke.spec.ts'
assert_risk core 'data-tier spec only' 'e2e/data-tier.spec.ts'
assert_risk core 'data-tier Playwright config only' 'playwright.data-tier.config.ts'
assert_risk core 'CI workflow' '.github/workflows/ci.yml'
assert_risk normal 'unknown runtime path' 'tools/new-runtime-check.ts'
assert_risk core 'mixed normal and core' $'src/pages/BadgesPage.css\nsrc/pages/RoutePage.tsx'
# CI uses git diff --no-renames, so both sides are classified. A rename from an
# allowlisted page into core routing must be promoted to core.
assert_risk core 'rename old and new paths' $'src/pages/BadgesPage.tsx\nsrc/app/BadgesRoute.tsx'

printf 'classifier regression tests: pass\n'
