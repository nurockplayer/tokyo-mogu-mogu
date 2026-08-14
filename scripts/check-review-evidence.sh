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

reviews_json="$(
  gh api --paginate "repos/$owner/$name/pulls/$pr/reviews?per_page=100" \
    | jq -s 'add // []'
)"
review_comments_json="$(
  gh api --paginate "repos/$owner/$name/pulls/$pr/comments?per_page=100" \
    | jq -s 'add // []'
)"

# Review evidence is evaluated per reviewer on the exact HEAD. An older clean
# verdict must never override that same reviewer's later blocking verdict.
#
# Clean evidence can be one of:
# - a native GitHub APPROVED review on the exact HEAD;
# - a trusted bot review whose body explicitly records a clean verdict;
# - Codex's standard exact-HEAD COMMENTED review with zero inline review
#   comments in that submitted review. Codex emits actionable findings as
#   review comments, so a zero-comment submitted review is its machine-readable
#   no-findings case even though its boilerplate review body is not a verdict.
#
# CHANGES_REQUESTED, a trusted bot review with an explicit non-clean body, or a
# Codex review that contains inline findings is blocking. The separate
# safe-merge live-thread scan still requires every thread to be resolved.
review_state="$({
  jq -n \
    --arg head "$head" \
    --arg trusted "$trusted_reviewers" \
    --argjson reviews "$reviews_json" \
    --argjson comments "$review_comments_json" '
      # A body verdict must be matched exactly, not by substring: a blocking
      # review that merely mentions the success text ("I cannot return `No
      # blocking findings.` because ...") must not count as clean. Normalize
      # each body line (strip markdown emphasis/backticks and whitespace) and
      # require a line equal to the accepted text.
      def norm: gsub("\r"; "") | gsub("\\*\\*"; "") | gsub("`"; "") | gsub("^[[:space:]]+|[[:space:]]+$"; "");
      def body_has_clean_verdict:
        (((.body // "") | split("\n") | map(norm) | index("No blocking findings.")) != null)
        or (((.body // "") | split("\n") | map(norm) | index("Actionable comments posted: 0")) != null);
      # A trusted-bot COMMENTED review is decisive only when its body actually
      # carries a machine-recognizable verdict: a CodeRabbit actionable-count
      # report, an explicit clean-verdict line, or the Codex standard review
      # heading. An empty or non-verdict acknowledgement (e.g. a bot reply after
      # a resolution) is NON-decisive and must not supersede a real verdict.
      def is_decisive_verdict($r):
        (($r.body // "") | contains("Actionable comments posted:"))
        or (($r.body // "") | contains("No blocking findings."))
        or (
          $r.user.login == "chatgpt-codex-connector[bot]"
          and (($r.body // "") | contains("### 💡 Codex Review"))
        );

      # For each reviewer we consider only "decisive" reviews on the exact
      # HEAD: native APPROVED / CHANGES_REQUESTED states plus trusted-bot
      # COMMENTED reviews that carry a real verdict. A later untrusted human
      # COMMENTED review, or an empty/non-verdict trusted-bot acknowledgement,
      # is non-decisive and must NOT displace an earlier still-valid verdict.
      [ $reviews[]
        | select(.commit_id == $head)
        | select(.state != "PENDING" and .state != "DISMISSED")
        | . as $r
        | select(
            $r.state == "APPROVED"
            or $r.state == "CHANGES_REQUESTED"
            or (
              $r.state == "COMMENTED"
              and (($trusted | split(",") | index($r.user.login)) != null)
              and is_decisive_verdict($r)
            )
          )
        | . + { _order: (.submitted_at // ((.id // 0) | tostring)) }
      ]
      | sort_by(._order)
      | group_by(.user.login)
      | map(last)
      | map(
          . as $review
          | (($trusted | split(",") | index($review.user.login)) != null) as $is_trusted_bot
          | ([ $comments[] | select(.pull_request_review_id == $review.id) ] | length) as $inline_count
          | if $review.state == "CHANGES_REQUESTED" then
              { reviewer: $review.user.login, result: "blocking" }
            elif $review.state == "APPROVED" then
              { reviewer: $review.user.login, result: "clean" }
            elif ($review.state == "COMMENTED" and $is_trusted_bot) then
              if (
                ($review | body_has_clean_verdict)
                or (
                  $review.user.login == "chatgpt-codex-connector[bot]"
                  and (($review.body // "") | contains("### 💡 Codex Review"))
                  and $inline_count == 0
                )
              ) then
                { reviewer: $review.user.login, result: "clean" }
              else
                { reviewer: $review.user.login, result: "blocking" }
              end
            else
              { reviewer: $review.user.login, result: "ignored" }
            end
        )
    '
} )"

blocking_count="$(jq '[.[] | select(.result == "blocking")] | length' <<<"$review_state")"
clean_count="$(jq '[.[] | select(.result == "clean")] | length' <<<"$review_state")"

if [[ "$blocking_count" -ne 0 ]]; then
  echo "safe-merge: PR #$pr has a blocking latest review on exact HEAD $head" >&2
  jq -r '.[] | select(.result == "blocking") | "  blocking reviewer: " + .reviewer' <<<"$review_state" >&2
  exit 5
fi

if [[ "$clean_count" -eq 0 ]]; then
  echo "safe-merge: PR #$pr has no accepted non-blocking review for exact HEAD $head" >&2
  echo "  accepted: exact-HEAD APPROVED, trusted bot explicit clean verdict, or zero-finding exact-HEAD Codex review" >&2
  exit 5
fi
