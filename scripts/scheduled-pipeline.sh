#!/bin/bash
# Full pipeline: generate prototypes → extract design trees → commit → deploy
set -uo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
EXTRACTOR_DIR="/Users/steve/Documents/proto-to-figma"
LOG_FILE="$REPO_DIR/logs/cron.log"

# Load environment
source "$REPO_DIR/.env"
export PATH="/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin:/Users/steve/.bun/bin:$PATH"

exec >> "$LOG_FILE" 2>&1

echo ""
echo "=========================================="
echo "Pipeline started: $(date)"
echo "=========================================="

# Step 1: Generate prototypes
echo "[Step 1] Generating prototypes..."
"$REPO_DIR/scripts/run-batch.sh"

# Step 2: Extract design trees for any missing
echo "[Step 2] Extracting design trees..."
cd "$EXTRACTOR_DIR"
for dir in "$REPO_DIR/prototypes"/*/; do
  if [ ! -f "$dir/design-tree.json" ] && [ -f "$dir/preview.html" ]; then
    echo "  Extracting: $(basename "$dir")"
    bun run extract "$dir" 2>&1 || echo "  FAILED: $(basename "$dir")"
  fi
done

# Step 3: Rebuild manifest, commit, push, deploy
echo "[Step 3] Committing and deploying..."
cd "$REPO_DIR"
"$REPO_DIR/scripts/build-manifest.sh"
git add prototypes/
if ! git diff --cached --quiet; then
  git commit -m "feat(prototypes): add new prototypes with design trees"
  git push origin main 2>/dev/null || echo "Warning: push failed"
  echo "Deploying to Vercel..."
  vercel --prod --yes 2>&1 || echo "Warning: Vercel deploy failed"
else
  echo "No new changes to commit."
fi

echo "Pipeline finished: $(date)"
echo "=========================================="
