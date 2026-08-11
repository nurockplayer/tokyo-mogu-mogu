#!/usr/bin/env bash
# Agent handoff hook: publishes a compact cross-agent execution state as a
# single top-level PR comment, identified by the marker below. Runs as a Claude
# Code Stop hook at the end of every main-agent turn.
#
# Marker (also referenced from CLAUDE.md):
#   <!-- agent-handoff:v1 -->
#
# Behaviour:
#   * Reads Claude Code Stop-hook JSON from stdin; takes the summary text from
#     `last_assistant_message`.
#   * Never creates a second handoff comment: if a comment carrying the marker
#     already exists on the PR, it is located and PATCHed through `gh api`.
#   * Detects repo, current PR, branch, HEAD and git status.
#   * If the current branch has no PR, exits 0 without creating anything.
#   * Never persists or prints a GitHub token; auth is delegated to `gh`'s
#     existing credentials. A GH_TOKEN/GITHUB_TOKEN present in the environment
#     is read by `gh` only at call time and is never written to disk.

set -euo pipefail

MARKER='<!-- agent-handoff:v1 -->'
HOOK_NAME='agent-handoff'

# --- read Stop-hook payload (best effort) ------------------------------------
payload=''
if [[ ! -t 0 ]]; then
  payload="$(cat 2>/dev/null || true)"
fi

summary=''
if [[ -n "$payload" ]]; then
  json_file="$(mktemp -t "${HOOK_NAME}.XXXXXX")"
  # shellcheck disable=SC2064
  trap 'rm -f "$json_file"' EXIT
  printf '%s\n' "$payload" >"$json_file"

  summary="$(jq -r '.last_assistant_message // empty' "$json_file" 2>/dev/null || true)"
  hook_name="$(jq -r '.hook_event_name // empty' "$json_file" 2>/dev/null || true)"
  if [[ -n "$hook_name" ]]; then
    echo "[${HOOK_NAME}] stop-hook event: ${hook_name}"
  fi
fi

if [[ -z "$summary" ]]; then
  echo "[${HOOK_NAME}] no last_assistant_message in Stop payload; nothing to hand off"
  exit 0
fi
# Collapse the summary to a single line so it survives JSON/body encoding.
summary="$(printf '%s' "$summary" | tr '\n' ' ')"

# --- locate repository (best effort) ------------------------------------------
repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$repo_root" ]]; then
  echo "[${HOOK_NAME}] not a git repository; skipping handoff"
  exit 0
fi
cd "$repo_root"

# --- current PR, branch, HEAD, git status -------------------------------------
branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
head_sha="$(git rev-parse HEAD 2>/dev/null || true)"

if [[ -z "$(git status --porcelain 2>/dev/null || true)" ]]; then
  status_short='clean'
else
  status_short='dirty'
fi

pr="$(gh pr view --json number,url --jq '{number: .number, url: .url}' 2>/dev/null || true)"
if [[ -z "$pr" ]]; then
  echo "[${HOOK_NAME}] no PR for branch '${branch}'; skipping handoff (exit 0)"
  exit 0
fi

pr_number="$(printf '%s' "$pr" | jq -r '.number')"
pr_url="$(printf '%s' "$pr" | jq -r '.url')"

# repo full name: prefer gh (honours remotes even when origin is missing).
repo_full_name="$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || true)"
if [[ -z "$repo_full_name" ]]; then
  repo_full_name="$(git remote get-url origin 2>/dev/null || true | sed -E 's#.*[:/]([^/]+/[^/]+)\.git$#\1#; s#.*[:/]([^/]+/[^/]+)$#\1#')"
fi
if [[ -z "$repo_full_name" ]]; then
  echo "[${HOOK_NAME}] could not determine repo full name; skipping handoff"
  exit 0
fi

# --- build the handoff body ----------------------------------------------------
handoff="$MARKER

## Objective

See the linked Issue / PR description for the goal in effect.

## Completed

Completed work for this turn is summarized in the Stop payload summary (see Latest Claude Result).

## Execution

Execution detail lives in the branch commits and the PR diff.

## Validation

Validation results for this turn are recorded in the Stop payload summary (see Latest Claude Result).

## Current State

Branch: \`${branch}\`
HEAD: \`${head_sha}\`
Git status: \`${status_short}\`

## Decisions or Risks

None. This comment is the single source of cross-agent execution state (see CLAUDE.md).

## Next

Next agent: read this comment, then the linked Issue / PR description, then resume from the current state above.

## Latest Claude Result

${summary}"

# The marker must appear exactly once, at the top of the body. If the payload
# summary ever corrupted it, fail safe rather than publish a broken marker.
marker_count="$(printf '%s' "$handoff" | grep -Fc "$MARKER")"
if [[ "$marker_count" -ne 1 ]]; then
  echo "[${HOOK_NAME}] marker validation failed (count=${marker_count}); skipping handoff"
  exit 0
fi

# --- locate existing handoff comment (by marker) or create ---------------------
existing_id="$(gh api "repos/$repo_full_name/issues/$pr_number/comments?per_page=100" \
  --jq '[.[] | select(.body | contains($m)) | .id] | last // empty' \
  --arg m "$MARKER" 2>/dev/null || true)"

if [[ -z "$existing_id" ]]; then
  new_id="$(gh api "repos/$repo_full_name/issues/$pr_number/comments" \
    --method POST \
    -f body="$handoff" \
    --jq '.id' 2>/dev/null || true)"
  if [[ -z "$new_id" ]]; then
    echo "[${HOOK_NAME}] failed to create handoff comment"
    exit 0
  fi
  echo "[${HOOK_NAME}] created handoff comment: id=${new_id} pr=${pr_number} url=${pr_url}"
else
  # gh form-encodes the raw multi-line body; GitHub stores it verbatim, so the
  # marker survives the update byte-for-byte.
  update_status="$(gh api "repos/$repo_full_name/pulls/$pr_number/comments/$existing_id" \
    --method PATCH \
    -f body="$handoff" \
    -o /dev/null -w '%{http_code}' 2>/dev/null || true)"
  if [[ "$update_status" == "200" || "$update_status" == "201" ]]; then
    echo "[${HOOK_NAME}] updated handoff comment: id=${existing_id} pr=${pr_number} url=${pr_url}"
  else
    echo "[${HOOK_NAME}] failed to update handoff comment id=${existing_id} (http ${update_status:-unknown})"
  fi
fi

exit 0
