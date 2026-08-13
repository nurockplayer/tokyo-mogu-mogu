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

accepted="$({
  gh api --paginate "repos/$owner/$name/pulls/$pr/reviews?per_page=100"
} | jq -s \
  --arg head "$head" \
  --arg trusted "$trusted_reviewers" '
    [ .[][]
      | select(.commit_id == $head)
      | . as $review
      | select(
          .state == "APPROVED"
          or (
            .state == "COMMENTED"
            and (($trusted | split(",") | index($review.user.login)) != null)
          )
        )
    ]')"

if [[ "$(jq 'length' <<<"$accepted")" -eq 0 ]]; then
  echo "safe-merge: PR #$pr has no accepted independent review for exact HEAD $head" >&2
  echo "  accepted: GitHub APPROVED review, or COMMENTED review from: $trusted_reviewers" >&2
  exit 5
fi
