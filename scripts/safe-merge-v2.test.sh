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
  [[ "${SCENARIO:-safe}" == "moved" ]] && echo "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" || echo "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  exit 0
fi
if [[ "$1 $2" == "api graphql" ]]; then
  if [[ "${SCENARIO:-safe}" == "unresolved" ]]; then
    echo '{"data":{"repository":{"pullRequest":{"reviewThreads":{"nodes":[{"id":"T1","isResolved":false,"comments":{"nodes":[{"url":"https://example.invalid/t1","body":"finding"}]}}],"pageInfo":{"hasNextPage":false,"endCursor":null}}}}}}'
  else
    echo '{"data":{"repository":{"pullRequest":{"reviewThreads":{"nodes":[],"pageInfo":{"hasNextPage":false,"endCursor":null}}}}}}'
  fi
  exit 0
fi
if [[ "$1" == "api" && "$2" == "--paginate" && "$3" == repos/*/pulls/*/comments* ]]; then
  [[ "${SCENARIO:-safe}" == "codex_inline" ]] && echo '[{"id":90,"pull_request_review_id":7,"body":"P1"}]' || echo '[]'
  exit 0
fi
if [[ "$1" == "api" && "$2" == "--paginate" && "$3" == repos/*/pulls/*/reviews* ]]; then
  case "${SCENARIO:-safe}" in
    no_review) echo '[]' ;;
    stale_review) echo '[{"id":1,"submitted_at":"2026-08-13T00:00:00Z","state":"COMMENTED","commit_id":"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","body":"**Actionable comments posted: 0**","user":{"login":"coderabbitai[bot]"}}]' ;;
    clean_then_blocking) echo '[{"id":1,"submitted_at":"2026-08-13T00:00:00Z","state":"COMMENTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","body":"**Actionable comments posted: 0**","user":{"login":"coderabbitai[bot]"}},{"id":2,"submitted_at":"2026-08-13T00:01:00Z","state":"COMMENTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","body":"**Actionable comments posted: 1**","user":{"login":"coderabbitai[bot]"}}]' ;;
    codex_clean|codex_inline) echo '[{"id":7,"submitted_at":"2026-08-13T00:00:00Z","state":"COMMENTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","body":"### 💡 Codex Review","user":{"login":"chatgpt-codex-connector[bot]"}}]' ;;
    *) echo '[{"id":1,"submitted_at":"2026-08-13T00:00:00Z","state":"COMMENTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","body":"**Actionable comments posted: 0**","user":{"login":"coderabbitai[bot]"}}]' ;;
  esac
  exit 0
fi
if [[ "$1 $2" == "pr checks" || "$1 $2" == "pr merge" ]]; then exit 0; fi
echo "unexpected gh invocation: $*" >&2
exit 99
EOF
chmod +x "$TMP/gh"

export PATH="$TMP:$PATH"
export GH_LOG="$TMP/gh.log"
export SAFE_MERGE_REPO="nurockplayer/tokyo-mogu-mogu"
EXPECTED="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

fail() { echo "FAIL: $*" >&2; exit 1; }
assert_blocked() {
  local scenario="$1" pattern="$2"
  : >"$GH_LOG"
  if SCENARIO="$scenario" bash "$ROOT/scripts/safe-merge.sh" 150 "$EXPECTED" >"$TMP/out" 2>"$TMP/err"; then
    fail "$scenario should block merge"
  fi
  grep -q "$pattern" "$TMP/err" || fail "$scenario missing diagnostic: $pattern"
  ! grep -q '^pr merge ' "$GH_LOG" || fail "$scenario attempted merge"
}

assert_blocked moved "HEAD moved after review"
assert_blocked unresolved "unresolved review thread"
assert_blocked no_review "no accepted non-blocking review"
assert_blocked stale_review "no accepted non-blocking review"
assert_blocked clean_then_blocking "blocking latest review"
assert_blocked codex_inline "blocking latest review"

: >"$GH_LOG"
SCENARIO=codex_clean bash "$ROOT/scripts/safe-merge.sh" 150 "$EXPECTED"
grep -q "^pr merge 150 .*--match-head-commit $EXPECTED$" "$GH_LOG" || fail "clean Codex review did not authorize exact-head merge"

: >"$GH_LOG"
SCENARIO=safe bash "$ROOT/scripts/safe-merge.sh" 150 "$EXPECTED"
[[ "$(grep -c '^api graphql ' "$GH_LOG")" -eq 2 ]] || fail "threads not rechecked"
[[ "$(grep -c '/reviews?per_page=100$' "$GH_LOG")" -eq 2 ]] || fail "reviews not rechecked"
[[ "$(grep -c '/comments?per_page=100$' "$GH_LOG")" -eq 2 ]] || fail "review comments not rechecked"
grep -q "^pr checks 150 --repo nurockplayer/tokyo-mogu-mogu$" "$GH_LOG" || fail "checks not gated"
grep -q "^pr merge 150 --repo nurockplayer/tokyo-mogu-mogu --squash --match-head-commit $EXPECTED$" "$GH_LOG" || fail "missing exact-head merge guard"
! grep -q -- '--admin' "$GH_LOG" || fail "admin bypass used"

echo "safe-merge-v2 tests: PASS"
