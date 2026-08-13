#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: scripts/finalize-reviewed-merge.sh <pr-number> <reviewed-head-sha>" >&2
  exit 64
fi

pr="$1"
reviewed_head="$2"
repo="${SAFE_MERGE_REPO:-$(gh repo view --json nameWithOwner --jq .nameWithOwner)}"
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# This is the only supported final merge entrypoint. First prove an independent
# review submission exists for the exact reviewed HEAD, then delegate the live
# thread/check/HEAD compare-and-swap work to safe-merge.sh.
bash "$script_dir/check-review-evidence.sh" "$repo" "$pr" "$reviewed_head"
bash "$script_dir/safe-merge.sh" "$pr" "$reviewed_head"
