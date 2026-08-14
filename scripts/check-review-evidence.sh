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

reviews_json="$(
  gh api --paginate "repos/$owner/$name/pulls/$pr/reviews?per_page=100" \
    | jq -s 'add // []'
)"

# Merge-authoritative review evidence on the exact reviewed HEAD (Issue #159).
#
# Only two review states are authoritative here:
#
#   attestation — a non-dismissed review on the exact HEAD whose body carries the
#     mandated final-verdict line exactly (`No blocking findings.`). This binds
#     the final independent reviewer's verdict to the reviewed SHA without
#     requiring a native APPROVED review.
#
#   changes_requested — a non-dismissed CHANGES_REQUESTED on the exact HEAD that
#     was not superseded by the same reviewer's later APPROVED. COMMENTED never
#     clears it, mirroring GitHub's native review state.
#
# A COMMENTED review (bot or human) is advisory, not merge-authoritative: its
# actionable findings must materialize as an unresolved inline review thread
# (enforced by safe-merge.sh's live scan), a CHANGES_REQUESTED (checked here), or
# a required-status failure to block a merge. A reconciled/resolved COMMENTED
# finding never permanently blocks a SHA.
review_state="$(
  jq -n \
    --arg head "$head" \
    --argjson reviews "$reviews_json" '
      def norm: gsub("\r"; "") | gsub("\\*\\*"; "") | gsub("`"; "") | gsub("^[[:space:]]+|[[:space:]]+$"; "");
      def has_verdict_line: ((.body // "") | split("\n") | map(norm) | index("No blocking findings.")) != null;

      [ $reviews[]
        | select(.commit_id == $head)
        | select(.state != "PENDING" and .state != "DISMISSED")
        | . + { _order: (.submitted_at // ((.id // 0) | tostring)) }
      ] as $exact

      | {
          attestation: ([ $exact[] | select(has_verdict_line) ] | length > 0),
          changes_requested: (
            [ $exact[]
              | select(.state == "APPROVED" or .state == "CHANGES_REQUESTED")
            ]
            | sort_by(._order)
            | group_by(.user.login)
            | map(last)
            | [ .[] | select(.state == "CHANGES_REQUESTED") ] | length > 0
          )
        }
    '
)"

attestation="$(jq -r '.attestation' <<<"$review_state")"
changes_requested="$(jq -r '.changes_requested' <<<"$review_state")"

if [[ "$changes_requested" == "true" ]]; then
  echo "safe-merge: PR #$pr has a live CHANGES_REQUESTED review on exact HEAD $head" >&2
  exit 5
fi

if [[ "$attestation" != "true" ]]; then
  echo "safe-merge: PR #$pr lacks the mandated final verdict on exact HEAD $head" >&2
  echo "  required: a non-dismissed exact-HEAD review whose body is exactly \`No blocking findings.\`" >&2
  exit 5
fi
