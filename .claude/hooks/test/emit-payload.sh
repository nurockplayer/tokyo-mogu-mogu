#!/usr/bin/env bash
# Emits a minimal Claude Code Stop-hook JSON payload on stdout.
set -euo pipefail
cat <<'JSON'
{
  "hook_event_name": "Stop",
  "last_assistant_message": "Implemented the agent-handoff hook and validated create-then-update against a stubbed PR."
}
JSON
