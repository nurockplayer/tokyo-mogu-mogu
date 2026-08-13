#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: scripts/safe-merge.sh <pr-number> <reviewed-head-sha>

Review-atomic merge gate for tokyo-mogu-mogu.

The caller must pass the exact PR HEAD SHA that received the final reviewer
verdict. This command refuses to merge when:
- the PR HEAD moved after review,
- no accepted independent review exists for that exact HEAD,
- any inline review thread is unresolved,
- PR checks are pending/failing,
- or the HEAD changes during the final gate.

Requires: gh, jq
EOF
}

if [[ $# -ne 2 ]]; then
  usage >&2
  exit 64
fi

pr="$1"
reviewed_head="$2"

if ! command -v gh >/dev/null 2>&1; then
  echo "safe-merge: gh is required" >&2
  exit 69
fi
if ! command -v jq >/dev/null 2>&1; then
  echo "safe-merge: jq is required" >&2
  exit 69
fi

repo="${SAFE_MERGE_REPO:-$(gh repo view --json nameWithOwner --jq .nameWithOwner)}"
owner="${repo%%/*}"
name="${repo#*/}"
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

current_head() {
  gh pr view "$pr" --repo "$repo" --json headRefOid --jq .headRefOid
}

unresolved_threads_json() {
  gh api graphql --paginate \
    -f owner="$owner" \
    -f name="$name" \
    -F number="$pr" \
    -f query='query($owner:String!, $name:String!, $number:Int!, $endCursor:String) {
      repository(owner:$owner, name:$name) {
        pullRequest(number:$number) {
          reviewThreads(first:100, after:$endCursor) {
            nodes {
              id
              isResolved
              comments(first:1) {
                nodes { url body }
              }
            }
            pageInfo { hasNextPage endCursor }
          }
        }
      }
    }' \
    | jq -s '[.[].data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved == false)]'
}

assert_reviewed_head() {
  local actual
  actual="$(current_head)"
  if [[ "$actual" != "$reviewed_head" ]]; then
    echo "safe-merge: PR #$pr HEAD moved after review" >&2
    echo "  reviewed: $reviewed_head" >&2
    echo "  current:  $actual" >&2
    exit 3
  fi
}

assert_accepted_review() {
  bash "$script_dir/check-review-evidence.sh" "$repo" "$pr" "$reviewed_head"
}

assert_no_unresolved_threads() {
  local unresolved count
  unresolved="$(unresolved_threads_json)"
  count="$(jq 'length' <<<"$unresolved")"
  if [[ "$count" -ne 0 ]]; then
    echo "safe-merge: PR #$pr has $count unresolved review thread(s); merge blocked" >&2
    jq -r '.[] | "- " + (.comments.nodes[0].url // .id) + "\n  " + ((.comments.nodes[0].body // "") | split("\n")[0])' <<<"$unresolved" >&2
    exit 4
  fi
}

# Gate 1: the SHA that was reviewed must still be the live PR head, and accepted
# independent review evidence must itself be attached to that exact SHA.
assert_reviewed_head
assert_accepted_review

# Gate 2: reconcile GitHub live state, not an earlier handoff snapshot.
assert_no_unresolved_threads

# Gate 3: all current PR checks must be complete and successful. `gh pr checks`
# exits non-zero for failed or pending checks, so a late CI state cannot be
# silently ignored by the merge helper.
gh pr checks "$pr" --repo "$repo" >/dev/null

# Gate 4: re-read all mutable authorization state after checks. A push, review,
# dismissal, or review comment may have arrived while the previous commands
# were running.
assert_reviewed_head
assert_accepted_review
assert_no_unresolved_threads

# Final server-side compare-and-swap: GitHub rejects the merge if HEAD changes
# between the last read and the merge request. Never use --admin here.
gh pr merge "$pr" \
  --repo "$repo" \
  --squash \
  --match-head-commit "$reviewed_head"
