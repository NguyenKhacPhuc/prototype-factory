#!/bin/bash
# Prototype Factory - generates an app prototype from an AI-generated idea
# Usage: ./scripts/generate-prototype.sh [--dry-run]

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPTS_DIR="$REPO_DIR/scripts"
PROTOTYPES_DIR="$REPO_DIR/prototypes"
LOGS_DIR="$REPO_DIR/logs"

# Load environment variables
set -a
source "$REPO_DIR/.env"
set +a
LOG_FILE="$LOGS_DIR/runs.log"
DRY_RUN="${1:-}"
TODAY=$(date +%Y-%m-%d)

mkdir -p "$LOGS_DIR"

log() {
  local status="$1" app_name="$2"
  echo "$TODAY $(date +%H:%M:%S) | $status | $app_name" >> "$LOG_FILE"
}

# --- Step 1: Generate app idea ---
echo "[1/6] Generating app idea..."
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
APP_FEATURES=$(echo "$IDEA_JSON" | python3 -c "
import sys,json
features = json.load(sys.stdin)['features']
if features and isinstance(features[0], dict):
    print(', '.join(f['title'] + ': ' + f['detail'] for f in features))
else:
    print(', '.join(features))
")

# Create slug from app name
# Randomly pick default theme for variety (roughly 50/50 light vs dark)
if (( RANDOM % 2 == 0 )); then
  DEFAULT_THEME="light"
  ALT_THEME="dark"
else
  DEFAULT_THEME="dark"
  ALT_THEME="light"
fi

# Generate design system using UI/UX Pro Max skill
APP_CATEGORY=$(echo "$IDEA_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('category','general'))")
UIUX_SCRIPT="$HOME/.claude/commands/skills/ui-ux-pro-max/scripts/search.py"

echo "  Generating design system with UI/UX Pro Max..."
APP_KEYWORDS=$(echo "$IDEA_JSON" | python3 -c "
import sys,json
d=json.load(sys.stdin)
# Combine category + name + engagement loop keywords for richer matching
parts = [d.get('category',''), d.get('name',''), d.get('engagementLoop','')[:60]]
print(' '.join(parts))
" 2>/dev/null) || APP_KEYWORDS="$APP_CATEGORY $APP_NAME"
DESIGN_SYSTEM_RAW=$(python3 "$UIUX_SCRIPT" "$APP_KEYWORDS" --design-system -p "$APP_NAME" -f markdown 2>/dev/null) || DESIGN_SYSTEM_RAW=""

# Save raw output to temp file for reliable parsing (avoids shell quoting issues)
DESIGN_SYSTEM_TMP=$(mktemp)
echo "$DESIGN_SYSTEM_RAW" > "$DESIGN_SYSTEM_TMP"

DESIGN_SYSTEM_PARSED=$(python3 -c "
import re, json, sys

with open('$DESIGN_SYSTEM_TMP') as f:
    raw = f.read()

# Markdown format: ### Style, ### Colors table, ### Typography
style_match = re.search(r'\*\*Name:\*\*\s*(.+)', raw)
style = style_match.group(1).strip() if style_match else 'bold geometric'

# Colors from markdown table
primary = re.search(r'Primary\s*\|\s*(#[0-9A-Fa-f]{6})', raw)
secondary = re.search(r'Secondary\s*\|\s*(#[0-9A-Fa-f]{6})', raw)
cta = re.search(r'CTA\s*\|\s*(#[0-9A-Fa-f]{6})', raw)
bg = re.search(r'Background\s*\|\s*(#[0-9A-Fa-f]{6})', raw)
text_color = re.search(r'Text\s*\|\s*(#[0-9A-Fa-f]{6})', raw)

# Typography
heading = re.search(r'\*\*Heading:\*\*\s*(.+)', raw)
body = re.search(r'\*\*Body:\*\*\s*(.+)', raw)
mood = re.search(r'\*\*Mood:\*\*\s*(.+)', raw)

# Effects from Keywords line
keywords = re.search(r'\*\*Keywords:\*\*\s*(.+)', raw)
effects = keywords.group(1).strip() if keywords else ''

# Anti-patterns
avoid_match = re.search(r'Anti-patterns.*?\n-\s*(.+)', raw)
avoid = avoid_match.group(1).strip() if avoid_match else ''

# CSS import
css_import = re.search(r\"@import url\('([^']+)'\)\", raw)

heading_font = heading.group(1).strip() if heading else 'Fredoka'
body_font = body.group(1).strip() if body else 'Nunito'

print(json.dumps({
    'style': style,
    'primary': primary.group(1) if primary else '#2979FF',
    'secondary': secondary.group(1) if secondary else '#FF5252',
    'cta': cta.group(1) if cta else '#EC4899',
    'bg': bg.group(1) if bg else '#FAFAFA',
    'text': text_color.group(1) if text_color else '#09090B',
    'heading_font': heading_font,
    'body_font': body_font,
    'mood': mood.group(1).strip() if mood else 'modern and clean',
    'effects': effects,
    'avoid': avoid,
    'css_import': css_import.group(1) if css_import else '',
}))
" 2>/dev/null) || DESIGN_SYSTEM_PARSED='{"style":"bold geometric","primary":"#2979FF","secondary":"#FF5252","cta":"#EC4899","bg":"#FAFAFA","text":"#09090B","heading_font":"Fredoka","body_font":"Nunito","mood":"modern and clean","effects":"","avoid":"","css_import":""}'

rm -f "$DESIGN_SYSTEM_TMP"

# Extract individual fields
COLOR_HINT=$(echo "$DESIGN_SYSTEM_PARSED" | python3 -c "import sys,json; d=json.load(sys.stdin); print(f\"Primary {d['primary']} + Secondary {d['secondary']} + CTA {d['cta']} on Background {d['bg']}\")")
DESIGN_STYLE=$(echo "$DESIGN_SYSTEM_PARSED" | python3 -c "import sys,json; print(json.load(sys.stdin)['style'])")
DESIGN_FONT=$(echo "$DESIGN_SYSTEM_PARSED" | python3 -c "import sys,json; print(json.load(sys.stdin)['heading_font'])")
DESIGN_FONT_BODY=$(echo "$DESIGN_SYSTEM_PARSED" | python3 -c "import sys,json; print(json.load(sys.stdin)['body_font'])")
DESIGN_EFFECTS=$(echo "$DESIGN_SYSTEM_PARSED" | python3 -c "import sys,json; print(json.load(sys.stdin)['effects'])")
DESIGN_AVOID=$(echo "$DESIGN_SYSTEM_PARSED" | python3 -c "import sys,json; print(json.load(sys.stdin)['avoid'])")
DESIGN_MOOD=$(echo "$DESIGN_SYSTEM_PARSED" | python3 -c "import sys,json; print(json.load(sys.stdin)['mood'])")
NAV_PATTERN="bottom tabs"

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
echo "[2/6] Generating prototype with Claude..."

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

**Design System (from UI/UX Pro Max — follow precisely):**
- **Style:** ${DESIGN_STYLE}
- **Colors:** ${COLOR_HINT}
- **Heading font:** "${DESIGN_FONT}" (Google Font — load via style tag, use for all headings, bold weights)
- **Body font:** "${DESIGN_FONT_BODY}" (Google Font — load via style tag, use for body text, regular weights)
- **Key effects:** ${DESIGN_EFFECTS}
- **AVOID:** ${DESIGN_AVOID}

**DESIGN QUALITY RULES:**
- Use the EXACT hex colors above — do not substitute with similar colors.
- Each screen must feel crafted and unique to THIS app, not a generic template.
- Add a CSS style tag with @keyframes animations (at least 2: e.g. fadeIn, slideUp, pulse, shimmer).
- Use box-shadow, border-radius variety, and spacing rhythm to create visual hierarchy.
- Cards and sections should have hover/active states with smooth transitions (150-300ms).
- No emojis as icons — use Lucide icons via window.lucide exclusively.
- Minimum 44x44px touch targets for all interactive elements.
- Text contrast must be 4.5:1 minimum against backgrounds.

**Layout & Structure:**
- Phone frame container (375x812px) with rounded corners, centered on page
- **MANDATORY**: The outermost wrapper div (the one with minHeight: '100vh') MUST always use background: '#f0f0f0'. NEVER use a dark color here.
- **Navigation pattern:** ${NAV_PATTERN} — design the navigation to match this pattern. Do NOT default to bottom tabs unless that's what's specified above.
- At least 4 distinct screens with real, detailed content
- **SCREEN SWITCHING (required for tooling):**
  \`\`\`
  const [activeScreen, setActiveScreen] = useState('home');
  const screens = { home: HomeScreen, explore: ExploreScreen, ... };
  React.createElement(screens[activeScreen])
  \`\`\`
  Each navigation trigger (tab, menu item, card, button) MUST call setActiveScreen('screenId') and contain a span with the screen label text and an SVG icon nearby.
- Realistic placeholder content (not lorem ipsum)
- Micro-interactions (button press effects, toggle animations, hover states)
- IMPORTANT: Design BOTH a light and dark theme. The DEFAULT theme MUST be **${DEFAULT_THEME}** mode. Store colors in a themes object. Add a theme toggle somewhere accessible.
- Do NOT include a fake status bar or Dynamic Island — keep the focus on the app content itself.

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
  --model opus \
  --output-format text \
  --add-dir "$TARGET_DIR" \
  > "$TARGET_DIR/claude-output.log" 2>&1 || {
    log "FAIL:claude" "$APP_NAME"
    echo "Claude generation failed. See $TARGET_DIR/claude-output.log" >&2
    exit 1
  }

# --- Step 3: Verify and assemble output ---
echo "[3/6] Verifying and assembling output..."

if [ ! -f "$TARGET_DIR/App.tsx" ]; then
  log "FAIL:missing" "$APP_NAME (App.tsx)"
  echo "App.tsx not generated" >&2
  exit 1
fi

# Copy and customize preview.html template
TEMPLATE="$HOME/.claude/skills/app-design-preview/templates/preview.html"
if [ -f "$TEMPLATE" ]; then
  python3 -c "
with open('$TEMPLATE') as f:
    html = f.read()
shim = '<script>window.react = window.React;</script>\n<script src=\"https://unpkg.com/lucide-react@0.469.0/dist/umd/lucide-react.min.js\"></script>\n<script>window.lucide = window.LucideReact || {};</script>\n</head>'
html = html.replace('</head>', shim)
with open('$TARGET_DIR/preview.html', 'w') as f:
    f.write(html)
"
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
  <script>window.react = window.React;</script>
  <script src="https://unpkg.com/lucide-react@0.469.0/dist/umd/lucide-react.min.js"></script>
  <script>window.lucide = window.LucideReact || {};</script>
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

# --- Step 4: Validate prototype renders ---
echo "[4/6] Validating prototype..."
if ! "$SCRIPTS_DIR/validate-prototype.sh" "$TARGET_DIR"; then
  log "FAIL:validate" "$APP_NAME"
  echo "Prototype validation failed. Removing broken prototype." >&2
  rm -rf "$TARGET_DIR"
  exit 1
fi

# --- Step 4.5: Capture screenshot ---
echo "[4.5/6] Capturing screenshot..."
"$SCRIPTS_DIR/capture-screenshot.sh" "$TARGET_DIR" || echo "Warning: screenshot capture failed"

# --- Step 5: Generate assets ---
echo "[5/6] Generating assets..."
"$SCRIPTS_DIR/generate-assets.sh" "$TARGET_DIR" || echo "Warning: asset generation failed"

# Clean up claude output log on success
rm -f "$TARGET_DIR/claude-output.log"

# --- Step 6: Git commit and push ---
echo "[6/6] Committing and pushing..."

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
