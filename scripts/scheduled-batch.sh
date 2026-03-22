#!/bin/bash
# Scheduled wrapper: waits until target time, notifies, then runs batch
REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

osascript -e 'display notification "Batch run starting now!" with title "Prototype Factory" sound name "Glass"'
say "Batch run starting now"

bash "$REPO_DIR/scripts/run-batch.sh"
