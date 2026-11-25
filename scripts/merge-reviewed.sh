#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: scripts/merge-reviewed.sh <pr-number> <reviewed-head-sha>" >&2
  exit 64
fi
pr="$1"
head="$2"
repo="${SAFE_MERGE_REPO:-$(gh repo view --json nameWithOwner --jq .nameWithOwner)}"
owner="${repo%%/*}"
name="${repo#*/}"

pr_data="$(gh pr view "$pr" --repo "$repo" --json headRefOid,statusCheckRollup)"
actual="$(jq -r '.headRefOid' <<<"$pr_data")"
if [[ "$actual" != "$head" ]]; then
  echo "merge-reviewed: PR #$pr HEAD moved after review (reviewed: $head, current: $actual)" >&2
  exit 3
fi

threads="$(gh api graphql --paginate -f owner="$owner" -f name="$name" -F number="$pr" \
  -f query='query($owner:String!, $name:String!, $number:Int!, $endCursor:String) {
    repository(owner:$owner, name:$name) {
      pullRequest(number:$number) {
        reviewThreads(first:100, after:$endCursor) {
          nodes { id isResolved }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
  }' | jq -s '[.[].data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved == false)] | length')"
if [[ "$threads" -ne 0 ]]; then
  echo "merge-reviewed: PR #$pr has $threads unresolved review thread(s)" >&2
  exit 4
fi

reviews="$(gh api --paginate "repos/$owner/$name/pulls/$pr/reviews?per_page=100" | jq -s 'add // []')"
state="$(jq -n --arg head "$head" --argjson reviews "$reviews" '
  [ $reviews[] | select(.state == "APPROVED" or .state == "CHANGES_REQUESTED") ]
  | sort_by(.submitted_at, .id) | group_by(.user.login) | map(last)
  | any(.state == "CHANGES_REQUESTED") as $changes
  | { changes_requested: $changes,
      attestation: ([ $reviews[] | select(.commit_id == $head and .state == "COMMENTED" and .body == "No blocking findings.") ] | length > 0) }
')"
if [[ "$(jq -r '.changes_requested' <<<"$state")" == true ]]; then
  echo "merge-reviewed: PR #$pr has a live CHANGES_REQUESTED review" >&2
  exit 5
fi

if ! jq -e '[.statusCheckRollup[] | select((.name // .context) == "Merge Gate")] | length > 0 and all(.[]; (if has("conclusion") then .status == "COMPLETED" and .conclusion == "SUCCESS" else .state == "SUCCESS" end))' >/dev/null <<<"$pr_data"; then
  echo "merge-reviewed: Merge Gate is missing, pending, or failing" >&2
  exit 6
fi

if [[ "$(jq -r '.attestation' <<<"$state")" != true ]]; then
  gh api "repos/$owner/$name/pulls/$pr/reviews" -f commit_id="$head" -f event=COMMENT -f 'body=No blocking findings.' >/dev/null
fi

gh pr merge "$pr" --repo "$repo" --squash --match-head-commit "$head"
