#!/usr/bin/env bash
# Integration test for the create-then-update flow.
#
# Builds a faux git repo + branch, shadows `gh` with a stub that simulates a
# PR with one pre-existing issue comment, runs the hook with the same payload,
# and asserts:
#   * run 1 created a new comment (id != 100, exactly 2 comment records)
#   * run 2 PATCHed the SAME id (no third comment; no marker duplication)
#   * update went through the issue-comment endpoint
#     (issues/comments/<id>, never pulls/<pr>/comments/<id>)
#   * run 3 sends a payload whose summary contains the literal marker
#     `<!-- agent-handoff:v1 -->` plus multiline Markdown: the hook must still
#     PATCH the same id, keep exactly one literal marker in the stored body,
#     and keep the summary with the marker sanitized to `agent-handoff:v1`.
#   * gh flags the production code must NOT use (--arg, -o, -w) are rejected
#     by the stub — a regression that reintroduces them fails this test.
#
# Prints PASS/FAIL lines. Exit 0 on success, 1 on failure.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOOK="$SCRIPT_DIR/../agent-handoff.sh"
STUB="$SCRIPT_DIR/gh-stub.sh"
EMIT="$SCRIPT_DIR/emit-payload.sh"
MAKE="$SCRIPT_DIR/make-faux-repo.sh"
mkdir -p "$SCRIPT_DIR/.tmp"
BASE="$(mktemp -d "$SCRIPT_DIR/.tmp/stub.XXXXXX")"
FAUX="$("$MAKE" "$BASE/repo")"

cleanup() {
  rm -rf "$BASE"
}
trap cleanup EXIT

# The stub must be reachable as `gh` (no extension) to shadow the real binary.
mkdir -p "$BASE/bin"
ln -sf "$STUB" "$BASE/bin/gh"
export PATH="$BASE/bin:$PATH"
export GH_STUB_STATE="$BASE/comments.txt"
export GH_STUB_BRANCH='stub/pr'
hash -r  # drop the shell's cached gh path so the stub wins
: >"$GH_STUB_STATE.log"
jq -n --arg body 'pre-existing issue comment' '{id: 100, body: $body}' >"$GH_STUB_STATE"

cd "$FAUX"

count_records() { jq -s 'length' "$GH_STUB_STATE"; }
count_markers() { grep -c 'agent-handoff:v1' "$GH_STUB_STATE" || true; }

echo "== run 1 (create expected) =="
OUT1="$("$EMIT" | "$HOOK" 2>&1)"
echo "$OUT1"
[[ "$OUT1" == *"created handoff comment: id="* ]] || { echo "FAIL: run1 did not create"; exit 1; }

ID1="$(grep -o 'id=[0-9]*' <<<"$OUT1" | head -1 | cut -d= -f2)"
echo "ID1=$ID1"
[[ -n "$ID1" && "$ID1" != "100" ]] || { echo "FAIL: run1 id invalid"; exit 1; }
[[ "$(count_records)" -eq 2 ]] || { echo "FAIL: expected 2 comment records after run1, got $(count_records)"; exit 1; }
[[ "$(count_markers)" -eq 1 ]] || { echo "FAIL: expected exactly 1 marker after run1, got $(count_markers)"; exit 1; }

echo "== run 2 (update same id expected) =="
OUT2="$("$EMIT" | "$HOOK" 2>&1)"
echo "$OUT2"
[[ "$OUT2" == *"updated handoff comment: id=${ID1}"* ]] || { echo "FAIL: run2 did not update id ${ID1}"; exit 1; }
[[ "$(count_records)" -eq 2 ]] || { echo "FAIL: run2 created a new comment (records=$(count_records))"; exit 1; }
[[ "$(count_markers)" -eq 1 ]] || { echo "FAIL: marker duplicated after run2 (count=$(count_markers))"; exit 1; }

echo "== endpoint contract check (stub log) =="
cat "$GH_STUB_STATE.log"
grep -q "update comment id=${ID1} url=repos/stub/repo/issues/comments/${ID1}" "$GH_STUB_STATE.log" \
  || { echo "FAIL: update did not use the issue-comment endpoint"; exit 1; }
grep -q "repos/stub/repo/pulls/123/comments/" "$GH_STUB_STATE.log" \
  && { echo "FAIL: review-comment endpoint was used"; exit 1; }
echo "endpoint contract OK"

echo "== comment state after run 2 =="
jq -s -c '.[] | {id: .id, body_head: (.body[0:40])}' "$GH_STUB_STATE"

echo "== run 3 (summary contains literal marker + multiline; update same id expected) =="
PAYLOAD3="$(jq -nc --arg msg "Turn 3 summary mentioning the marker
<!-- agent-handoff:v1 -->
and a second line." '{hook_event_name: "Stop", last_assistant_message: $msg}')"
OUT3="$(printf '%s' "$PAYLOAD3" | "$HOOK" 2>&1)"
echo "$OUT3"
[[ "$OUT3" == *"updated handoff comment: id=${ID1}"* ]] || { echo "FAIL: run3 did not update id ${ID1}"; exit 1; }
[[ "$(count_records)" -eq 2 ]] || { echo "FAIL: run3 created a new comment (records=$(count_records))"; exit 1; }
[[ "$(count_markers)" -eq 1 ]] || { echo "FAIL: marker count != 1 after run3 (count=$(count_markers))"; exit 1; }

# The stored body must contain the summary's multiline text with the marker
# sanitized to the plain text form, and the canonical marker must appear
# exactly once (top of body).
BODY3="$(jq -s --argjson id "$ID1" '.[] | select(.id == $id) | .body' "$GH_STUB_STATE" | jq -r .)"
printf '%s\n' "$BODY3" | grep -q 'Turn 3 summary mentioning the marker' \
  || { echo "FAIL: run3 summary text missing from stored body"; exit 1; }
printf '%s\n' "$BODY3" | grep -q 'and a second line.' \
  || { echo "FAIL: run3 multiline content not preserved"; exit 1; }
printf '%s\n' "$BODY3" | grep -q '^<!-- agent-handoff:v1 -->' \
  || { echo "FAIL: canonical marker missing at top of stored body"; exit 1; }
if [[ "$(printf '%s' "$BODY3" | grep -Fc '<!-- agent-handoff:v1 -->')" -ne 1 ]]; then
  echo "FAIL: literal marker appears more than once in stored body"
  exit 1
fi
# The sanitized form must still be present so the summary content survives.
printf '%s\n' "$BODY3" | grep -q 'agent-handoff:v1' \
  || { echo "FAIL: sanitized marker text not present in stored body"; exit 1; }
echo "marker sanitization + multiline preservation OK"

echo "== gh flags that must NOT reach gh api (regression guard) =="
for bad_flag in --arg -o -w; do
  if "$STUB" api "repos/stub/repo/issues/123/comments" "$bad_flag" x >/dev/null 2>&1; then
    echo "FAIL: stub accepted unsupported flag '$bad_flag' (should exit non-zero)"
    exit 1
  fi
  echo "rejected '$bad_flag': OK"
done
# Real gh api forbids combining --silent with --jq; the stub must too.
if "$STUB" api "repos/stub/repo/issues/123/comments" --jq '.id' --silent >/dev/null 2>&1; then
  echo "FAIL: stub accepted --jq + --silent (gh api forbids this)"
  exit 1
fi
echo "rejected '--jq + --silent': OK"

echo "RESULT: PASS"
