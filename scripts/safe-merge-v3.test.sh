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
  "pr checks")
    if [[ "${SCENARIO:-safe}" == checks_fail ]]; then
      echo "checks failed" >&2
      exit 1
    fi
    ;;
  "pr merge")
    ;;
  *)
    if [[ "$1" == api && "$2" == repos/*/branches/main/protection ]]; then
      [[ "${SCENARIO:-safe}" == unprotected ]] && exit 1
      if [[ "${SCENARIO:-safe}" == bypass ]]; then
        echo '{"required_status_checks":{"contexts":["Merge Gate"]},"required_pull_request_reviews":{"required_approving_review_count":0,"dismiss_stale_reviews":true,"bypass_pull_request_allowances":{"users":[{"login":"nurockplayer"}],"teams":[],"apps":[]}},"enforce_admins":{"enabled":true},"required_conversation_resolution":{"enabled":true}}'
      elif [[ "${SCENARIO:-safe}" == missing_prr ]]; then
        echo '{"required_status_checks":{"contexts":["Merge Gate"]},"enforce_admins":{"enabled":true},"required_conversation_resolution":{"enabled":true}}'
      elif [[ "${SCENARIO:-safe}" == missing_merge_gate ]]; then
        echo '{"required_status_checks":{"contexts":["Quality Gates"]},"required_pull_request_reviews":{"required_approving_review_count":0,"dismiss_stale_reviews":true},"enforce_admins":{"enabled":true},"required_conversation_resolution":{"enabled":true}}'
      else
        echo '{"required_status_checks":{"contexts":["Merge Gate"]},"required_pull_request_reviews":{"required_approving_review_count":0,"dismiss_stale_reviews":true},"enforce_admins":{"enabled":true},"required_conversation_resolution":{"enabled":true}}'
      fi
    elif [[ "$1" == api && "$2" == --paginate && "$3" == */reviews* ]]; then
      case "${SCENARIO:-safe}" in
        no_attestation) echo '[]' ;;
        changes_requested) echo '[{"id":1,"state":"CHANGES_REQUESTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:00:00Z","user":{"login":"reviewer"},"body":"needs work"}]' ;;
        changes_then_approve) echo '[{"id":1,"state":"CHANGES_REQUESTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:00:00Z","user":{"login":"reviewer"},"body":"needs work"},{"id":2,"state":"APPROVED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:01:00Z","user":{"login":"reviewer"},"body":"No blocking findings."}]' ;;
        # A trusted-bot COMMENTED finding whose inline thread has been reconciled
        # and resolved must not block; the exact-HEAD verdict-line COMMENTED
        # review provides the attestation; no native APPROVED exists.
        resolved_bot_comment) echo '[{"id":1,"state":"COMMENTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:00:00Z","user":{"login":"coderabbitai[bot]"},"body":"**Actionable comments posted: 1**"},{"id":2,"state":"COMMENTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:01:00Z","user":{"login":"reviewer"},"body":"No blocking findings."}]' ;;
        # No native APPROVED anywhere: a plain exact-HEAD COMMENTED verdict-line
        # review is sufficient attestation.
        verdict_comment_only) echo '[{"id":1,"state":"COMMENTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:00:00Z","user":{"login":"reviewer"},"body":"No blocking findings."}]' ;;
        *) echo '[{"id":1,"state":"APPROVED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","submitted_at":"2026-08-14T00:00:00Z","user":{"login":"reviewer"},"body":"No blocking findings."}]' ;;
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

must_merge() {
  local scenario="$1"
  : >"$GH_LOG"
  if ! SCENARIO="$scenario" bash "$ROOT/scripts/safe-merge.sh" 160 "$HEAD" >"$TMP/out" 2>"$TMP/err"; then
    echo "expected merge: $scenario" >&2
    cat "$TMP/err" >&2
    exit 1
  fi
  grep -q -- "--match-head-commit $HEAD" "$GH_LOG"
}

# Authoritative merge blockers (Issue #159 policy):
# 1. unresolved inline thread → reject
must_block unresolved "unresolved review thread"
# 2. live CHANGES_REQUESTED on the exact HEAD → reject
must_block changes_requested "CHANGES_REQUESTED"
# 3. HEAD moved after review → reject
must_block moved "HEAD moved"
# 4. required CI / Merge Gate failure or missing server protection → reject
must_block checks_fail "checks failed"
must_block unprotected "branch protection"
must_block missing_merge_gate "Merge Gate"
# Server protection must preserve the required controls and NOT require approvals.
must_block missing_prr "pull-request review protection"
must_block bypass "bypass"
# The mandated final-verdict review must exist on the exact HEAD (review-atomic).
must_block no_attestation "final verdict"

# Baseline: the reviewed, protected, resolved PR merges with an exact-head guard.
: >"$GH_LOG"
SCENARIO=safe bash "$ROOT/scripts/safe-merge.sh" 160 "$HEAD"
# Final live-state scans happen at Gate 0/4 (protection), Gate 2/4 (threads), and
# Gate 1/4 (review state), immediately before the merge command.
[[ "$(grep -c 'branches/main/protection$' "$GH_LOG")" -eq 2 ]]
[[ "$(grep -c '^api graphql ' "$GH_LOG")" -eq 2 ]]
[[ "$(grep -c 'reviews?per_page=100' "$GH_LOG")" -eq 2 ]]
grep -q '^pr checks ' "$GH_LOG"
grep -q -- "--match-head-commit $HEAD" "$GH_LOG"
! grep -q -- '--admin' "$GH_LOG"

# 5. A trusted-bot COMMENTED finding whose inline thread has been reconciled and
#    resolved does not block the merge.
must_merge resolved_bot_comment

# 6. A native APPROVED review is NOT required: a plain exact-HEAD COMMENTED
#    verdict-line review authorizes the merge.
must_merge verdict_comment_only

# A superseded CHANGES_REQUESTED (later APPROVED by the same reviewer) does not
# block — the latest decisive verdict per reviewer is binding.
must_merge changes_then_approve

echo "safe-merge-v3 tests: PASS"
