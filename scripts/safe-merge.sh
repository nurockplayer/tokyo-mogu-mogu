#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: scripts/safe-merge.sh <pr-number> <reviewed-head-sha>

Review-atomic merge gate for tokyo-mogu-mogu.

The caller must pass the exact PR HEAD SHA that received the final reviewer
verdict. This command refuses to merge when:
- the PR HEAD moved after review,
- the exact HEAD lacks the mandated final-verdict review (`No blocking findings.`),
- a live CHANGES_REQUESTED review exists on that exact HEAD,
- any inline review thread is unresolved,
- PR checks are pending/failing,
- the base branch does not enforce the required server-side protections,
- or the HEAD/review state changes during the final gate.

A COMMENTED review (bot or human) is advisory, not merge-authoritative: its
actionable findings must materialize as an unresolved inline review thread, a
CHANGES_REQUESTED, or a required-status failure to block a merge. A native
GitHub APPROVED review is NOT required.

Server-side protection is mandatory because client-side reads cannot make
review/thread state atomic with the merge request. The target branch must have:
- required conversation resolution,
- pull-request review protection (no approving-review count required),
- required status check `Merge Gate`, and
- administrator enforcement / no bypass for repository admins.

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

base_branch() {
  gh pr view "$pr" --repo "$repo" --json baseRefName --jq .baseRefName
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

# Machine-verifiable review evidence on the exact reviewed HEAD. This is the
# only review-state gate: a mandated final-verdict review must exist on the exact
# HEAD, and a live CHANGES_REQUESTED must not. COMMENTED reviews (bot or human)
# are advisory and never block a SHA whose actionable inline findings have been
# reconciled/resolved.
assert_review_state() {
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

assert_server_protection() {
  local base protection
  base="$(base_branch)"
  if ! protection="$(gh api "repos/$owner/$name/branches/$base/protection" 2>/dev/null)"; then
    echo "safe-merge: target branch '$base' has no readable branch protection; merge blocked" >&2
    exit 6
  fi

  if ! jq -e '
    (.required_conversation_resolution.enabled == true)
    # Require the pull-request workflow itself (PR-only merging; no direct
    # pushes to main). No approving-review count is required: the owner/agent
    # workflow cannot reliably produce a native APPROVED (the PR author cannot
    # approve their own PR), so a server count >= 1 would deadlock every merge.
    # The server is configured with required_approving_review_count 0; the
    # mandated final-verdict attestation is enforced client-side by
    # check-review-evidence.sh.
    and (.required_pull_request_reviews != null)
    and (.enforce_admins.enabled == true)
    and (
      ((.required_status_checks.contexts // []) | index("Merge Gate")) != null
      or ((.required_status_checks.checks // []) | map(.context) | index("Merge Gate")) != null
    )
    # No-bypass guarantee: pull-request review bypass allowances would let the
    # caller skip the review/conversation backstop without --admin. Require any
    # configured bypass user/team/app lists to be empty.
    and (
      (.required_pull_request_reviews.bypass_pull_request_allowances // null) as $b
      | $b == null
        or (
          (($b.users // []) | length) == 0
          and (($b.teams // []) | length) == 0
          and (($b.apps // []) | length) == 0
        )
    )
  ' >/dev/null <<<"$protection"; then
    echo "safe-merge: target branch '$base' lacks required atomic merge protection" >&2
    echo "  required: pull-request review protection (PR workflow), conversation resolution, Merge Gate status, admin enforcement, no PR-review bypass allowances" >&2
    exit 6
  fi
}

# Gate 0: server-side protection must exist before any client-side review state
# can authorize a merge. This closes the race between the final live scan and
# GitHub accepting the merge request.
assert_server_protection

# Gate 1: the SHA that was reviewed must still be the live PR head, and the
# review evidence must be attached to that exact SHA.
assert_reviewed_head
assert_review_state

# Gate 2: reconcile GitHub live state, not an earlier handoff snapshot.
assert_no_unresolved_threads

# Gate 3: all current PR checks must be complete and successful. `gh pr checks`
# exits non-zero for failed or pending checks, so a late CI state cannot be
# silently ignored by the merge helper.
gh pr checks "$pr" --repo "$repo" >/dev/null

# Gate 4: re-read all mutable authorization state after checks. A push, review,
# dismissal, review comment, or protection change may have arrived while the
# previous commands were running.
assert_server_protection
assert_reviewed_head
assert_review_state
assert_no_unresolved_threads

# Final server-side HEAD compare-and-swap. Review/thread atomicity is provided by
# the verified branch protection above; --match-head-commit additionally rejects
# a late push. Never use --admin here.
gh pr merge "$pr" \
  --repo "$repo" \
  --squash \
  --match-head-commit "$reviewed_head"
