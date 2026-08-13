#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 3 ]]; then
  echo "Usage: scripts/check-review-evidence.sh <repo> <pr-number> <head-sha>" >&2
  exit 64
fi

repo="$1"
pr="$2"
head="$3"
owner="${repo%%/*}"
name="${repo#*/}"
trusted_reviewers="${SAFE_MERGE_REVIEWERS:-chatgpt-codex-connector[bot],coderabbitai[bot]}"

# Review evidence is evaluated per reviewer on the exact HEAD. An older clean
# verdict must never override that same reviewer's later blocking verdict.
# Native APPROVED reviews count as clean. Trusted automated reviewers use
# COMMENTED reviews, so their latest exact-HEAD review counts as clean only when
# its body explicitly records a no-findings verdict. CHANGES_REQUESTED and a
# trusted bot's latest COMMENTED review without a clean verdict are blocking.
review_state="$({
  gh api --paginate "repos/$owner/$name/pulls/$pr/reviews?per_page=100"
} | jq -s \
  --arg head "$head" \
  --arg trusted "$trusted_reviewers" '
    [ .[][]
      | select(.commit_id == $head)
      | select(.state != "PENDING" and .state != "DISMISSED")
      | . + { _order: (.submitted_at // .id // "") }
    ]
    | sort_by(._order)
    | group_by(.user.login)
    | map(last)
    | map(
        . as $review
        | (($trusted | split(",") | index($review.user.login)) != null) as $is_trusted_bot
        | if $review.state == "CHANGES_REQUESTED" then
            { reviewer: $review.user.login, result: "blocking" }
          elif $review.state == "APPROVED" then
            { reviewer: $review.user.login, result: "clean" }
          elif ($review.state == "COMMENTED" and $is_trusted_bot) then
            if (
              (($review.body // "") | contains("No blocking findings."))
              or (($review.body // "") | contains("**Actionable comments posted: 0**"))
            ) then
              { reviewer: $review.user.login, result: "clean" }
            else
              { reviewer: $review.user.login, result: "blocking" }
            end
          else
            { reviewer: $review.user.login, result: "ignored" }
          end
      )
  ')"

blocking_count="$(jq '[.[] | select(.result == "blocking")] | length' <<<"$review_state")"
clean_count="$(jq '[.[] | select(.result == "clean")] | length' <<<"$review_state")"

if [[ "$blocking_count" -ne 0 ]]; then
  echo "safe-merge: PR #$pr has a blocking latest review on exact HEAD $head" >&2
  jq -r '.[] | select(.result == "blocking") | "  blocking reviewer: " + .reviewer' <<<"$review_state" >&2
  exit 5
fi

if [[ "$clean_count" -eq 0 ]]; then
  echo "safe-merge: PR #$pr has no accepted non-blocking review for exact HEAD $head" >&2
  echo "  accepted: exact-HEAD GitHub APPROVED, or trusted bot latest review explicitly reporting no blocking/actionable findings" >&2
  exit 5
fi
