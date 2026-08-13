#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cat >"$TMP/gh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
printf '%s\n' "$*" >>"$GH_LOG"

if [[ "$1 $2" == "repo view" ]]; then
  echo "nurockplayer/tokyo-mogu-mogu"
  exit 0
fi

if [[ "$1 $2" == "pr view" ]]; then
  if [[ "${SCENARIO:-safe}" == "moved" ]]; then
    echo "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
  else
    echo "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  fi
  exit 0
fi

if [[ "$1 $2" == "api graphql" ]]; then
  if [[ "${SCENARIO:-safe}" == "unresolved" ]]; then
    cat <<'JSON'
{"data":{"repository":{"pullRequest":{"reviewThreads":{"nodes":[{"id":"THREAD_1","isResolved":false,"comments":{"nodes":[{"url":"https://example.invalid/thread/1","body":"P1 unresolved finding"}]} }],"pageInfo":{"hasNextPage":false,"endCursor":null}}}}}}
JSON
  else
    cat <<'JSON'
{"data":{"repository":{"pullRequest":{"reviewThreads":{"nodes":[],"pageInfo":{"hasNextPage":false,"endCursor":null}}}}}}
JSON
  fi
  exit 0
fi

if [[ "$1 $2" == "pr checks" ]]; then
  exit 0
fi

if [[ "$1 $2" == "pr merge" ]]; then
  exit 0
fi

echo "unexpected gh invocation: $*" >&2
exit 99
EOF
chmod +x "$TMP/gh"

export PATH="$TMP:$PATH"
export GH_LOG="$TMP/gh.log"
export SAFE_MERGE_REPO="nurockplayer/tokyo-mogu-mogu"
EXPECTED="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

# 1. An unresolved live review thread blocks merge.
: >"$GH_LOG"
if SCENARIO=unresolved bash "$ROOT/scripts/safe-merge.sh" 150 "$EXPECTED" >"$TMP/out" 2>"$TMP/err"; then
  fail "unresolved review thread should block merge"
fi
grep -q "unresolved review thread" "$TMP/err" || fail "missing unresolved-thread diagnostic"
if grep -q '^pr merge ' "$GH_LOG"; then
  fail "merge was attempted with unresolved thread"
fi

# 2. A moved HEAD invalidates the earlier reviewer verdict.
: >"$GH_LOG"
if SCENARIO=moved bash "$ROOT/scripts/safe-merge.sh" 150 "$EXPECTED" >"$TMP/out" 2>"$TMP/err"; then
  fail "moved HEAD should block merge"
fi
grep -q "HEAD moved after review" "$TMP/err" || fail "missing moved-HEAD diagnostic"
if grep -q '^pr merge ' "$GH_LOG"; then
  fail "merge was attempted after HEAD moved"
fi

# 3. A safe merge scans review threads twice and uses an exact-head guard.
: >"$GH_LOG"
SCENARIO=safe bash "$ROOT/scripts/safe-merge.sh" 150 "$EXPECTED" >"$TMP/out" 2>"$TMP/err"
[[ "$(grep -c '^api graphql ' "$GH_LOG")" -eq 2 ]] || fail "live review threads were not checked twice"
grep -q "^pr checks 150 --repo nurockplayer/tokyo-mogu-mogu$" "$GH_LOG" || fail "PR checks were not gated"
grep -q "^pr merge 150 --repo nurockplayer/tokyo-mogu-mogu --squash --match-head-commit $EXPECTED$" "$GH_LOG" || fail "merge did not use exact reviewed HEAD"
if grep -q -- '--admin' "$GH_LOG"; then
  fail "safe merge must never use --admin"
fi

echo "safe-merge tests: PASS"
