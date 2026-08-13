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

# Native APPROVED reviews are accepted directly. Trusted automated reviewers
# use COMMENTED reviews on GitHub, so those count only when their submitted
# review body explicitly records a clean verdict. This prevents a COMMENTED
# review that itself contains blocking findings from becoming merge authority.
accepted="$({
  gh api --paginate "repos/$owner/$name/pulls/$pr/reviews?per_page=100"
} | jq -s \
  --arg head "$head" \
  --arg trusted "$trusted_reviewers" '
    [ .[][]
      | select(.commit_id == $head)
      | . as $review
      | select(
          $review.state == "APPROVED"
          or (
            $review.state == "COMMENTED"
            and (($trusted | split(",") | index($review.user.login)) != null)
            and (
              (($review.body // "") | contains("No blocking findings."))
              or (($review.body // "") | contains("**Actionable comments posted: 0**"))
            )
          )
        )
    ]')"

if [[ "$(jq 'length' <<<"$accepted")" -eq 0 ]]; then
  echo "safe-merge: PR #$pr has no accepted non-blocking review for exact HEAD $head" >&2
  echo "  accepted: exact-HEAD GitHub APPROVED, or trusted bot review explicitly reporting no blocking/actionable findings" >&2
  exit 5
fi
