#!/usr/bin/env bash
# Test stub for `gh`, exercising the create-then-update flow of the handoff
# hook without touching the GitHub API. Placed first in PATH for tests.
#
# Simulated state:
#   * Branch "stub/pr" owns PR #123 (url https://github.com/stub/repo/pull/123).
#   * The PR has one pre-existing non-handoff issue comment (id 100).
#   * Comments persist in a JSONL state file shared across invocations, so a
#     second run must PATCH the same handoff comment id created by the first.
#
# The stub models the real GitHub API contract for top-level PR comments,
# which are issue comments:
#   * create  -> POST   repos/<repo>/issues/<pr>/comments
#   * list    -> GET    repos/<repo>/issues/<pr>/comments
#   * update  -> PATCH  repos/<repo>/issues/comments/<comment_id>
# (The pull-request review-comment endpoint, pulls/<pr>/comments/<id>, is NOT
# used for top-level comments and is not simulated.)
#
# The stub mirrors the flags `gh api` actually documents (see `gh api --help`):
#   * -q/--jq, -X/--method, -f/--raw-field, -F/--field, --silent
# Flags gh does NOT support (--arg, -o, -w) are rejected with exit 1, so a
# regression that re-introduces them fails the integration test instead of
# silently passing.

set -euo pipefail

STATE="${GH_STUB_STATE:?GH_STUB_STATE is required}"
PR_NUMBER=123
PR_URL="https://github.com/stub/repo/pull/${PR_NUMBER}"
REPO="stub/repo"

mkdir -p "$(dirname "$STATE")"

log() { printf 'ghstub %s\n' "$*" >>"${STATE}.log"; }

fail() { printf 'ghstub: %s\n' "$*" >&2; exit 1; }

pr_cmd() {
  # Bare "no PR" is exercised separately against the real gh, not via stub.
  if [[ "${GH_STUB_NO_PR:-}" == "1" ]]; then
    echo 'no pull requests found' >&2
    return 1
  fi
  printf '{"number":%s,"url":"%s"}\n' "${PR_NUMBER}" "${PR_URL}"
}

repo_cmd() {
  echo "${REPO}"
}

# repos/<repo>/pulls/<n> — PR metadata
api_pulls() {
  printf '{"base":{"ref":"main"},"head":{"ref":"%s"},"title":"stub"}\n' "${GH_STUB_BRANCH:-stub/pr}"
}

# issues/<n>/comments?per_page=100 — list comments as a JSON array
api_list_comments() {
  jq -s . "$STATE"
}

# issues/<n>/comments — create
api_create_comment() {
  local id
  id="$(( $(jq -s 'if length == 0 then 0 else (map(.id) | max) end' "$STATE") + 1 ))"
  jq -n --argjson id "$id" --arg body "$body_value" '{id: $id, body: $body}' >>"$STATE"
  log "create comment id=${id} url=${url}"
  printf '{"id":%s}\n' "$id"
}

# issues/comments/<id> — update (PATCH)
api_update_comment() {
  local id="${1}" tmp
  tmp="$(mktemp)"
  # Slurp the stream, update the record, then flatten back to JSONL so the
  # state file stays one JSON object per line.
  jq -s --argjson id "$id" --arg body "$body_value" \
    'map(if .id == $id then (.body = $body) else . end) | .[]' "$STATE" >"$tmp"
  mv "$tmp" "$STATE"
  log "update comment id=${id} url=${url}"
  printf '{"id":%s}\n' "$id"
}

# --- main -------------------------------------------------------------------
if [[ "$1" == "pr" ]]; then
  pr_cmd
  exit 0
fi
if [[ "$1" == "repo" ]]; then
  repo_cmd
  exit 0
fi
[[ "$1" == "api" ]] || fail "unknown gh subcommand: $1"

url="$2"
shift 2

jq_filter=''
body_value=''
silent=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --jq|-q)
      jq_filter="$2"; shift 2 ;;
    --method|-X)
      shift 2 ;;
    -f|--raw-field|-F|--field)
      if [[ "$2" == body=* ]]; then body_value="${2#body=}"; fi
      shift 2 ;;
    --silent)
      silent=true; shift ;;
    *)
      fail "unsupported gh api flag: $1" ;;
  esac
done

# Real `gh api` treats --template/--jq/--silent/--verbose as mutually exclusive
# ("only one of ... may be used"); model that so a regression that combines
# them fails the test.
if [[ "$silent" == true && -n "$jq_filter" ]]; then
  fail "only one of \`--template\`, \`--jq\`, \`--silent\`, or \`--verbose\` may be used"
fi

raw=''
if [[ "$url" == "repos/${REPO}/issues/${PR_NUMBER}/comments?per_page=100" ]]; then
  raw="$(api_list_comments)"
elif [[ "$url" == "repos/${REPO}/issues/${PR_NUMBER}/comments" ]]; then
  raw="$(api_create_comment)"
elif [[ "$url" == "repos/${REPO}/issues/comments/"* ]]; then
  raw="$(api_update_comment "${url##*/}")"
elif [[ "$url" == *"/pulls/"* ]]; then
  raw="$(api_pulls)"
else
  fail "unknown api url: $url"
fi

if [[ -n "$jq_filter" ]]; then
  printf '%s\n' "$raw" | jq "$jq_filter"
elif [[ "$silent" == true ]]; then
  exit 0
else
  printf '%s\n' "$raw"
fi
