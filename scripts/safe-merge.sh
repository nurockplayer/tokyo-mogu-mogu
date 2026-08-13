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
- the base branch does not enforce the required server-side protections,
- or the HEAD/review state changes during the final gate.

Server-side protection is mandatory because client-side reads cannot make
review/thread state atomic with the merge request. The target branch must have:
- required conversation resolution,
- required pull-request review protection,
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
trusted_reviewers="${SAFE_MERGE_REVIEWERS:-chatgpt-codex-connector[bot],coderabbitai[bot]}"
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

assert_accepted_review() {
  bash "$script_dir/check-review-evidence.sh" "$repo" "$pr" "$reviewed_head"
}

# Defense in depth for trusted COMMENTED reviews: safe-merge itself requires a
# machine-verifiable clean source that cannot be satisfied by merely mentioning
# success text inside a blocking body. Native APPROVED reviews qualify. For
# Codex, the latest exact-HEAD submitted review qualifies only when it is the
# standard Codex review and that review owns zero inline findings.
assert_strict_review_evidence() {
  local reviews comments accepted
  reviews="$(gh api --paginate "repos/$owner/$name/pulls/$pr/reviews?per_page=100" | jq -s 'add // []')"
  comments="$(gh api --paginate "repos/$owner/$name/pulls/$pr/comments?per_page=100" | jq -s 'add // []')"

  accepted="$(jq -n \
    --arg head "$reviewed_head" \
    --arg trusted "$trusted_reviewers" \
    --argjson reviews "$reviews" \
    --argjson comments "$comments" '
      def norm($s): ($s // "") | gsub("\r"; "") | gsub("\\*\\*"; "") | gsub("`"; "") | gsub("^[[:space:]]+|[[:space:]]+$"; "");
      def body_is_clean($r):
        (((($r.body // "") | split("\n") | map(norm(.))) | index("No blocking findings.")) != null)
        or (((($r.body // "") | split("\n") | map(norm(.))) | index("Actionable comments posted: 0")) != null);
      # A trusted-bot review is a clean verdict when its body explicitly records
      # one, or when it is the Codex standard boilerplate with zero inline review
      # comments (the Codex machine-readable no-findings form).
      def is_clean_verdict($r):
        body_is_clean($r)
        or (
          $r.user.login == "chatgpt-codex-connector[bot]"
          and (($r.body // "") | startswith("### 💡 Codex Review"))
          and ([ $comments[] | select(.pull_request_review_id == $r.id) ] | length) == 0
        );
      def is_trusted($r): (($trusted | split(",") | index($r.user.login)) != null);

      [ $reviews[]
        | select(.commit_id == $head)
        | select(.state != "PENDING" and .state != "DISMISSED")
        | . + { _order: (.submitted_at // ((.id // 0) | tostring)) }
      ] as $exact

      # Decisive reviews only: native APPROVED / CHANGES_REQUESTED plus
      # trusted-bot COMMENTED verdicts. Untrusted human COMMENTED reviews are
      # non-decisive and never displace the decisive state.
      | ([ $exact[]
          | . as $r
          | select($r.state == "APPROVED" or $r.state == "CHANGES_REQUESTED" or ($r.state == "COMMENTED" and is_trusted($r)))
        ]) as $decisive

      # The merge-time verdict must be enforced: the latest decisive review of
      # EVERY reviewer is binding. A blocking verdict from any reviewer (native
      # CHANGES_REQUESTED, or a trusted-bot COMMENTED that does not report a
      # clean verdict) vetoes the merge even when a human APPROVED exists,
      # because the trusted bot verdict is the accepted reviewer evidence here.
      | ([ $decisive
          | sort_by(._order)
          | group_by(.user.login)
          | map(last)
          | .[]
          | select(
              .state == "CHANGES_REQUESTED"
              or (.state == "COMMENTED" and is_trusted(.) and (is_clean_verdict(.) | not))
            )
        ] | length) as $blocking_count

      | ([ $decisive[]
          | select(.state == "APPROVED" and is_clean_verdict(.))
        ] | length) as $approvals
      | ([ $decisive[]
          | select(.user.login == "chatgpt-codex-connector[bot]")
        ] | sort_by(._order) | last) as $codex
      | ([ $comments[] | select($codex != null and .pull_request_review_id == $codex.id) ] | length) as $codex_findings

      # The accepted verdict must be exactly `No blocking findings.` (safe-merge
      # rule step 4). A native APPROVED review is accepted only when its body
      # carries that clean verdict text — an approval whose body is empty or
      # contains a caveat is not the mandated final-review verdict.
      | (($approvals > 0)
          or (
            $codex != null
            and $codex.state == "COMMENTED"
            and (($codex.body // "") | startswith("### 💡 Codex Review"))
            and $codex_findings == 0
          ))
        and $blocking_count == 0
    ')"

  if [[ "$accepted" != "true" ]]; then
    echo "safe-merge: PR #$pr lacks strict clean review evidence for exact HEAD $reviewed_head" >&2
    echo "  required: exact-HEAD APPROVED review or zero-finding exact-HEAD Codex review" >&2
    exit 5
  fi
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
    and (.required_pull_request_reviews != null)
    # A real server-side review requirement: an approving-review count of 0
    # leaves no server-enforced review gate, so a clean review could be
    # dismissed or a body-only blocking review could arrive after Gate 4
    # without creating an unresolved thread.
    and ((.required_pull_request_reviews.required_approving_review_count // 0) >= 1)
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
    echo "  required: conversation resolution, >=1 approving review, Merge Gate status, admin enforcement, no PR-review bypass allowances" >&2
    exit 6
  fi
}

# Gate 0: server-side protection must exist before any client-side review state
# can authorize a merge. This closes the race between the final live scan and
# GitHub accepting the merge request.
assert_server_protection

# Gate 1: the SHA that was reviewed must still be the live PR head, and accepted
# independent review evidence must itself be attached to that exact SHA.
assert_reviewed_head
assert_accepted_review
assert_strict_review_evidence

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
assert_accepted_review
assert_strict_review_evidence
assert_no_unresolved_threads

# Final server-side HEAD compare-and-swap. Review/thread atomicity is provided by
# the verified branch protection above; --match-head-commit additionally rejects
# a late push. Never use --admin here.
gh pr merge "$pr" \
  --repo "$repo" \
  --squash \
  --match-head-commit "$reviewed_head"
