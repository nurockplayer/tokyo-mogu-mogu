#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

cat >"$TMP/gh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
printf '%s\n' "$*" >>"$GH_LOG"

case "$1 $2" in
  "repo view")
    echo "nurockplayer/tokyo-mogu-mogu"
    ;;
  "pr view")
    if [[ "$*" == *"baseRefName"* ]]; then
      echo main
    elif [[ "${SCENARIO:-safe}" == moved ]]; then
      echo bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    else
      echo aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    fi
    ;;
  "api graphql")
    if [[ "${SCENARIO:-safe}" == unresolved ]]; then
      echo '{"data":{"repository":{"pullRequest":{"reviewThreads":{"nodes":[{"id":"T","isResolved":false,"comments":{"nodes":[{"url":"u","body":"f"}]}}],"pageInfo":{"hasNextPage":false,"endCursor":null}}}}}}'
    else
      echo '{"data":{"repository":{"pullRequest":{"reviewThreads":{"nodes":[],"pageInfo":{"hasNextPage":false,"endCursor":null}}}}}}'
    fi
    ;;
  "pr checks"|"pr merge")
    ;;
  *)
    if [[ "$1" == api && "$2" == repos/*/branches/main/protection ]]; then
      [[ "${SCENARIO:-safe}" == unprotected ]] && exit 1
      if [[ "${SCENARIO:-safe}" == bypass ]]; then
        echo '{"required_status_checks":{"contexts":["Merge Gate"]},"required_pull_request_reviews":{"required_approving_review_count":1,"bypass_pull_request_allowances":{"users":[{"login":"nurockplayer"}],"teams":[],"apps":[]}},"enforce_admins":{"enabled":true},"required_conversation_resolution":{"enabled":true}}'
      elif [[ "${SCENARIO:-safe}" == count0 ]]; then
        echo '{"required_status_checks":{"contexts":["Merge Gate"]},"required_pull_request_reviews":{"required_approving_review_count":0},"enforce_admins":{"enabled":true},"required_conversation_resolution":{"enabled":true}}'
      else
        echo '{"required_status_checks":{"contexts":["Merge Gate"]},"required_pull_request_reviews":{"required_approving_review_count":1},"enforce_admins":{"enabled":true},"required_conversation_resolution":{"enabled":true}}'
      fi
    elif [[ "$1" == api && "$2" == --paginate && "$3" == */reviews* ]]; then
      case "${SCENARIO:-safe}" in
        no_review) echo '[]' ;;
        approved_then_commented) echo '[{"id":1,"state":"APPROVED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:00:00Z","user":{"login":"reviewer"}},{"id":2,"state":"COMMENTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:01:00Z","user":{"login":"reviewer"},"body":"non-decisive comment"}]' ;;
        bot_blocking_after_approval) echo '[{"id":1,"state":"APPROVED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:00:00Z","user":{"login":"reviewer"}},{"id":2,"state":"COMMENTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:01:00Z","user":{"login":"coderabbitai[bot]"},"body":"**Actionable comments posted: 2**"}]' ;;
        *) echo '[{"id":1,"state":"APPROVED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:00:00Z","user":{"login":"reviewer"}}]' ;;
      esac
    elif [[ "$1" == api && "$2" == --paginate && "$3" == */comments* ]]; then
      echo '[]'
    else
      echo "unexpected: $*" >&2
      exit 99
    fi
    ;;
esac
EOF
chmod +x "$TMP/gh"

export PATH="$TMP:$PATH"
export GH_LOG="$TMP/log"
export SAFE_MERGE_REPO=nurockplayer/tokyo-mogu-mogu
HEAD=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

must_block() {
  local scenario="$1" text="$2"
  : >"$GH_LOG"
  if SCENARIO="$scenario" bash "$ROOT/scripts/safe-merge.sh" 160 "$HEAD" >"$TMP/out" 2>"$TMP/err"; then
    echo "expected block: $scenario" >&2
    exit 1
  fi
  grep -q "$text" "$TMP/err"
  ! grep -q '^pr merge ' "$GH_LOG"
}

must_block unprotected "branch protection"
must_block bypass "bypass allowances"
must_block count0 "approving review"
must_block moved "HEAD moved"
must_block unresolved "unresolved review thread"
must_block no_review "no accepted"
must_block bot_blocking_after_approval "blocking latest review"

: >"$GH_LOG"
SCENARIO=safe bash "$ROOT/scripts/safe-merge.sh" 160 "$HEAD"
[[ "$(grep -c 'branches/main/protection$' "$GH_LOG")" -eq 2 ]]
[[ "$(grep -c '^api graphql ' "$GH_LOG")" -eq 2 ]]
grep -q '^pr checks ' "$GH_LOG"
grep -q -- "--match-head-commit $HEAD" "$GH_LOG"
! grep -q -- '--admin' "$GH_LOG"

# P2: a later non-decisive COMMENTED review must not displace an earlier
# APPROVED from the same reviewer — the merge stays authorized.
: >"$GH_LOG"
SCENARIO=approved_then_commented bash "$ROOT/scripts/safe-merge.sh" 160 "$HEAD"
grep -q -- "--match-head-commit $HEAD" "$GH_LOG" || { echo "later non-decisive comment displaced APPROVED" >&2; exit 1; }

echo "safe-merge-v3 tests: PASS"
