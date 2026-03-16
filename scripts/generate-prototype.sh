#!/bin/bash
# Prototype Factory - generates an app prototype from an AI-generated idea
# Usage: ./scripts/generate-prototype.sh [--dry-run]

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPTS_DIR="$REPO_DIR/scripts"
PROTOTYPES_DIR="$REPO_DIR/prototypes"
LOGS_DIR="$REPO_DIR/logs"
LOG_FILE="$LOGS_DIR/runs.log"
DRY_RUN="${1:-}"
MAX_DAILY_RUNS=10
TODAY=$(date +%Y-%m-%d)

mkdir -p "$LOGS_DIR"

# --- Guards ---

# Check daily run count
if [ -f "$LOG_FILE" ]; then
  TODAY_RUNS=$(grep -c "^$TODAY" "$LOG_FILE" 2>/dev/null || echo 0)
  if [ "$TODAY_RUNS" -ge "$MAX_DAILY_RUNS" ]; then
    echo "Daily limit reached ($MAX_DAILY_RUNS). Skipping."
    exit 0
  fi
fi

log() {
  local status="$1" app_name="$2"
  echo "$TODAY $(date +%H:%M:%S) | $status | $app_name" >> "$LOG_FILE"
}

# --- Step 1: Generate app idea ---
echo "[1/4] Generating app idea..."
RANDOM_OFFSET=$RANDOM
export RANDOM_OFFSET

IDEA_JSON=$("$SCRIPTS_DIR/openai-idea.sh") || {
  log "FAIL:idea" "openai-error"
  echo "Failed to generate idea" >&2
  exit 1
}

APP_NAME=$(echo "$IDEA_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['name'])")
APP_TAGLINE=$(echo "$IDEA_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['tagline'])")
APP_DESC=$(echo "$IDEA_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['description'])")
APP_FEATURES=$(echo "$IDEA_JSON" | python3 -c "import sys,json; print(', '.join(json.load(sys.stdin)['features']))")

# Create slug from app name
SLUG=$(echo "$APP_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd 'a-z0-9-')
FOLDER_NAME="${TODAY}-${SLUG}"
TARGET_DIR="$PROTOTYPES_DIR/$FOLDER_NAME"

if [ -d "$TARGET_DIR" ]; then
  echo "Prototype $FOLDER_NAME already exists. Skipping."
  exit 0
fi

echo "  App: $APP_NAME - $APP_TAGLINE"

if [ "$DRY_RUN" = "--dry-run" ]; then
  echo "[DRY RUN] Would generate prototype for: $APP_NAME"
  echo "$IDEA_JSON"
  exit 0
fi

mkdir -p "$TARGET_DIR"
echo "$IDEA_JSON" > "$TARGET_DIR/idea.json"

# --- Step 2: Generate prototype with Claude ---
echo "[2/4] Generating prototype with Claude..."

# Write prompt to temp file to avoid shell quoting issues
PROMPT_FILE=$(mktemp)
trap "rm -f $PROMPT_FILE" EXIT

cat > "$PROMPT_FILE" <<PROMPT_EOF
Generate an interactive mobile app prototype for the following app idea.

**App Name:** ${APP_NAME}
**Tagline:** ${APP_TAGLINE}
**Description:** ${APP_DESC}
**Key Features:** ${APP_FEATURES}

## Instructions

Create a single-file React prototype (App.tsx) that runs with Babel standalone.

**CRITICAL RULES for App.tsx:**
1. NO import/export statements. Use: const { useState, useEffect, useRef } = React;
2. Function must be: function App() (no export default)
3. All styles must be inline JavaScript objects
4. Use Lucide icons from CDN - access icons via window.lucide object (e.g. window.lucide.Heart, window.lucide.Home)
5. Load Google Fonts via a style tag in the component

**Design Requirements:**
- Phone frame container (375x812px) with rounded corners, centered on page
- Dark background behind the phone frame
- Dynamic Island notch at top
- Bottom navigation bar with 3-5 tabs (working navigation between screens)
- At least 4 screens/tabs with real, detailed content
- Realistic placeholder content (not lorem ipsum)
- Smooth transitions between screens
- Micro-interactions (button press effects, toggle animations)
- A cohesive color palette that matches the app purpose
- Professional typography with proper hierarchy
- Status bar with time, wifi, battery icons

**Output:**
Write ONLY the App.tsx file content to: ${TARGET_DIR}/App.tsx

After writing App.tsx, also write a design-spec.json to ${TARGET_DIR}/design-spec.json with:
{"appName":"${APP_NAME}","tagline":"${APP_TAGLINE}","designSystem":{"primaryColor":"#hex","secondaryColor":"#hex","backgroundColor":"#hex","fontFamily":"font name","style":"design style description"},"screens":["screen1","screen2"]}

Do NOT write preview.html - the script handles that separately.
PROMPT_EOF

CLAUDE_PROMPT=$(cat "$PROMPT_FILE")

# Run Claude in print mode with permissions bypassed
# Unset CLAUDECODE to allow running from within a Claude session
unset CLAUDECODE
claude -p "$CLAUDE_PROMPT" \
  --dangerously-skip-permissions \
  --max-budget-usd 1.00 \
  --model sonnet \
  --output-format text \
  --add-dir "$TARGET_DIR" \
  > "$TARGET_DIR/claude-output.log" 2>&1 || {
    log "FAIL:claude" "$APP_NAME"
    echo "Claude generation failed. See $TARGET_DIR/claude-output.log" >&2
    exit 1
  }

# --- Step 3: Verify and assemble output ---
echo "[3/4] Verifying and assembling output..."

if [ ! -f "$TARGET_DIR/App.tsx" ]; then
  log "FAIL:missing" "$APP_NAME (App.tsx)"
  echo "App.tsx not generated" >&2
  exit 1
fi

# Copy and customize preview.html template
TEMPLATE="$HOME/.claude/skills/app-design-preview/templates/preview.html"
if [ -f "$TEMPLATE" ]; then
  sed 's|</head>|<script src="https://unpkg.com/lucide-react@latest/dist/umd/lucide-react.min.js"></script>\n</head>|' \
    "$TEMPLATE" > "$TARGET_DIR/preview.html"
else
  # Fallback: create minimal preview.html
  cat > "$TARGET_DIR/preview.html" <<'HTML_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Prototype Preview</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://unpkg.com/lucide-react@latest/dist/umd/lucide-react.min.js"></script>
</head>
<body>
<div id="root"></div>
<script>
  Babel.registerPreset('tsx', {
    presets: [
      [Babel.availablePresets['typescript'], { isTSX: true, allExtensions: true }],
      [Babel.availablePresets['react']]
    ]
  });
</script>
<script type="text/babel" data-presets="tsx" src="App.tsx"></script>
<script type="text/babel" data-presets="tsx">
  ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
</script>
</body>
</html>
HTML_EOF
fi

# Generate design-spec.json if Claude didn't
if [ ! -f "$TARGET_DIR/design-spec.json" ]; then
  echo "$IDEA_JSON" | python3 -c "
import sys, json
idea = json.load(sys.stdin)
spec = {
  'appName': idea['name'],
  'tagline': idea['tagline'],
  'description': idea['description'],
  'features': idea['features'],
  'audience': idea.get('audience', ''),
  'category': idea.get('category', '')
}
print(json.dumps(spec, indent=2))
" > "$TARGET_DIR/design-spec.json"
fi

# Clean up claude output log on success
rm -f "$TARGET_DIR/claude-output.log"

# --- Step 4: Git commit and push ---
echo "[4/4] Committing and pushing..."

cd "$REPO_DIR"
git add "prototypes/$FOLDER_NAME/"
git commit -m "$(cat <<EOF
feat(prototype): add $APP_NAME

$APP_TAGLINE
Category: $(echo "$IDEA_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('category','unknown'))")
EOF
)"

git push origin main 2>/dev/null || echo "Warning: push failed (remote may not be set up yet)"

log "OK" "$APP_NAME"
echo "Done! Prototype: prototypes/$FOLDER_NAME/"
