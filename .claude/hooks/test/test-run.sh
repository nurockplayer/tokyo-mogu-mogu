#!/usr/bin/env bash
# Integration test for the create-then-update flow.
#
# Builds a faux git repo + branch, shadows `gh` with a stub that simulates a
# PR with one pre-existing review comment, runs the hook twice with the same
# payload, and asserts:
#   * run 1 created a new comment (id != 100, exactly 2 comment records)
#   * run 2 PATCHed the SAME id (no third comment; no marker duplication)
#   * both runs exited 0
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
jq -n --arg body 'pre-existing review comment' '{id: 100, body: $body}' >"$GH_STUB_STATE"

cd "$FAUX"

count_records() { jq -s 'length' "$GH_STUB_STATE"; }
count_markers() { grep -c 'agent-handoff:v1' "$GH_STUB_STATE" || true; }
comment_id() { jq -r '.[0].id' "$GH_STUB_STATE"; }

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

echo "== comment state after run 2 =="
jq -s -c '.[] | {id: .id, body_head: (.body[0:40])}' "$GH_STUB_STATE"

echo "RESULT: PASS"
