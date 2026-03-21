#!/bin/bash
# Runs generate-prototype.sh up to 10 times in sequence, then stops.
# Commits all new prototypes in a single commit, pushes, and deploys.

set -uo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT="$REPO_DIR/scripts/generate-prototype.sh"
BATCH_SIZE=10
SUCCESS=0
FAILURES=0
GENERATED=()

for i in $(seq 1 "$BATCH_SIZE"); do
  echo "=== Run $i/$BATCH_SIZE ==="
  if "$SCRIPT"; then
    SUCCESS=$((SUCCESS + 1))
    # Capture the latest prototype folder
    LATEST=$(ls -td "$REPO_DIR/prototypes"/2* 2>/dev/null | head -1)
    [ -n "$LATEST" ] && GENERATED+=("$(basename "$LATEST")")
  else
    EXIT_CODE=$?
    FAILURES=$((FAILURES + 1))
    if [ "$EXIT_CODE" -eq 2 ]; then
      echo "Daily limit reached. Stopping batch."
      break
    fi
    echo "Run $i failed (exit $EXIT_CODE). Continuing..."
  fi
  sleep 10
done

echo "Batch complete: $SUCCESS succeeded, $FAILURES failed."

# Commit, push, and deploy if any prototypes were generated
if [ "$SUCCESS" -gt 0 ]; then
  echo "=== Committing $SUCCESS prototypes ==="
  cd "$REPO_DIR"

  # Rebuild manifest
  "$REPO_DIR/scripts/build-manifest.sh"

  # Stage all new prototypes + manifest
  git add prototypes/

  # Build commit message listing all generated apps
  NAMES=$(printf '%s\n' "${GENERATED[@]}" | sed 's/^[0-9-]*//' | sed 's/^-//' | tr '-' ' ')
  git commit -m "$(cat <<EOF
feat(prototypes): add $SUCCESS new prototypes

$(printf '%s\n' "${GENERATED[@]}")
EOF
)"

  git push origin main 2>/dev/null || echo "Warning: push failed"

  echo "=== Deploying to Vercel ==="
  vercel --prod --yes 2>&1 || echo "Warning: Vercel deploy failed"
fi
