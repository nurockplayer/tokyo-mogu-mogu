#!/usr/bin/env bash
# In-memory-ish fixture: creates a throwaway git repo + branch under a temp
# dir and prints that dir. Cleaned up by test-run.sh.
set -euo pipefail

BASE="${1:?usage: make-faux-repo.sh <base-dir>}"
mkdir -p "$BASE"
cd "$BASE"
git init -q -b stub/pr
git config user.email stub@example.com
git config user.name "Stub"
printf 'fixture\n' > README.md
git add README.md
git commit -qm 'stub base commit'
git remote add origin git@github.com:stub/repo.git
echo "$BASE"
