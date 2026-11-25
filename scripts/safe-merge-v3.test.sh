#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cat >"$TMP/gh" <<'MOCK'
#!/usr/bin/env bash
set -euo pipefail
printf '%s\n' "$*" >>"$GH_LOG"
case "$1 $2" in
  'pr view')
    head=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    [[ "$SCENARIO" != moved ]] || head=bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    conclusion=SUCCESS
    status=COMPLETED
    [[ "$SCENARIO" != failing ]] || conclusion=FAILURE
    [[ "$SCENARIO" != pending ]] || { status=IN_PROGRESS; conclusion=null; }
    printf '{"headRefOid":"%s","statusCheckRollup":[{"name":"Merge Gate","status":"%s","conclusion":"%s"},{"name":"Other","status":"COMPLETED","conclusion":"FAILURE"}]}\n' "$head" "$status" "$conclusion"
    ;;
  'api graphql')
    resolved=true
    [[ "$SCENARIO" != unresolved ]] || resolved=false
    printf '{"data":{"repository":{"pullRequest":{"reviewThreads":{"nodes":[{"id":"T","isResolved":%s}],"pageInfo":{"hasNextPage":false,"endCursor":null}}}}}}\n' "$resolved"
    ;;
  'api --paginate')
    case "$SCENARIO" in
      changes) echo '[{"id":1,"state":"CHANGES_REQUESTED","commit_id":"old","submitted_at":"2026-08-14T00:00:00Z","user":{"login":"reviewer"}}]' ;;
      attested) echo '[{"id":1,"state":"COMMENTED","commit_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","body":"No blocking findings."}]' ;;
      *) echo '[]' ;;
    esac
    ;;
  'api repos/'*) ;;
  'pr merge') ;;
  *) echo "unexpected: $*" >&2; exit 99 ;;
esac
MOCK
chmod +x "$TMP/gh"
export PATH="$TMP:$PATH" GH_LOG="$TMP/log" SAFE_MERGE_REPO=owner/repo
HEAD=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
must_block() {
  local scenario="$1" message="$2"
  : >"$GH_LOG"
  if SCENARIO="$scenario" bash "$ROOT/scripts/merge-reviewed.sh" 160 "$HEAD" >"$TMP/out" 2>"$TMP/err"; then
    echo "expected block: $scenario" >&2; exit 1
  fi
  grep -q "$message" "$TMP/err"
  ! grep -q '^pr merge ' "$GH_LOG"
  ! grep -q 'event=COMMENT' "$GH_LOG"
}
must_block moved 'HEAD moved'
must_block unresolved 'unresolved review thread'
must_block changes 'CHANGES_REQUESTED'
must_block failing 'Merge Gate'
must_block pending 'Merge Gate'
: >"$GH_LOG"
SCENARIO=attested bash "$ROOT/scripts/merge-reviewed.sh" 160 "$HEAD"
! grep -q 'event=COMMENT' "$GH_LOG"
grep -q -- "--match-head-commit $HEAD" "$GH_LOG"
: >"$GH_LOG"
SCENARIO=happy bash "$ROOT/scripts/merge-reviewed.sh" 160 "$HEAD"
grep -q "commit_id=$HEAD -f event=COMMENT -f body=No blocking findings\." "$GH_LOG"
grep -q -- "--match-head-commit $HEAD" "$GH_LOG"
[[ "$(grep -c '^pr view ' "$GH_LOG")" -eq 1 ]]
[[ "$(grep -c '^api graphql ' "$GH_LOG")" -eq 1 ]]
[[ "$(grep -c '^api --paginate ' "$GH_LOG")" -eq 1 ]]
! grep -q -- '--admin' "$GH_LOG"
echo 'safe-merge-v3 tests: PASS'
