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

# Generate a unique visual direction — use deterministic rotation to guarantee variety
APP_CATEGORY=$(echo "$IDEA_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('category','general'))")

# Pre-defined palettes, styles, fonts — rotated per batch index to guarantee NO repeats
VISUAL_DIRECTION=$(python3 -c "
import json, os, random

idx = int(os.environ.get('BATCH_CATEGORY_INDEX', random.randint(0, 99)))

palettes = [
    'electric coral #FF6B6B + midnight navy #1A1A40 on crisp white #FAFAFA',
    'hot magenta #E91E63 + charcoal #2C2C2C on pale blush #FFF0F0',
    'sunflower yellow #FFD600 + deep purple #4A148C on warm ivory #FFFDE7',
    'ocean teal #00838F + burnt sienna #BF360C on sand #FFF8E1',
    'electric blue #2979FF + coral red #FF5252 on cool gray #F5F5F5',
    'lime green #76FF03 + dark slate #263238 on off-white #FAFAFA',
    'tangerine #FF6D00 + indigo #283593 on cream #FFF3E0',
    'lavender #B388FF + forest #1B5E20 on pearl #F3E5F5',
    'ruby red #D32F2F + gold #FFD54F on charcoal #212121',
    'sky blue #4FC3F7 + terracotta #D84315 on warm white #FFFDE7',
    'mint #00E676 + deep rose #AD1457 on light gray #ECEFF1',
    'peach #FFAB91 + slate blue #37474F on snow #FAFAFA',
]

styles = [
    'neo-brutalist', 'editorial magazine', 'retro-analog', 'playful illustrated',
    'luxury minimal', 'bold geometric', 'soft pastel dreamy', 'data-dense dashboard',
    'skeuomorphic tactile', 'duotone graphic', 'collage punk', 'industrial tech',
]

fonts = [
    'Playfair Display', 'Archivo Black', 'Fraunces', 'Bebas Neue',
    'Orbitron', 'Fredoka', 'Crimson Pro', 'Barlow Condensed',
    'Righteous', 'Caveat', 'Red Hat Display', 'Chakra Petch',
]

moods = [
    'confident and rebellious', 'cozy sunday afternoon', 'clinical precision',
    'playful chaos energy', 'serene and elevated', 'raw underground zine',
    'warm nostalgic glow', 'futuristic and sharp', 'dreamy watercolor calm',
    'bold street poster', 'quiet luxury whisper', 'maximalist celebration',
]

layout_twists = [
    'overlapping cards at angles', 'full-bleed photo headers with text overlay',
    'bento grid dashboard', 'horizontal scroll sections stacked vertically',
    'asymmetric split-screen layout', 'floating action island at bottom',
    'timeline with branching paths', 'masonry grid with varied card sizes',
    'tab content slides horizontally', 'bottom sheet reveals for detail views',
    'sticky header that transforms on scroll', 'staggered fade-in card waterfall',
]

nav_patterns = [
    'bottom tabs', 'top tabs', 'side drawer', 'floating action menu',
    'hub-and-spoke cards', 'scrolling sections', 'bottom tabs',
    'top tabs with icons', 'gesture-based swipe', 'sidebar with icons',
    'floating pill navigation', 'segmented control at top',
]

d = {
    'palette': palettes[idx % len(palettes)],
    'style': styles[idx % len(styles)],
    'font': fonts[idx % len(fonts)],
    'mood': moods[idx % len(moods)],
    'layout_twist': layout_twists[idx % len(layout_twists)],
    'nav_pattern': nav_patterns[idx % len(nav_patterns)],
}
print(json.dumps(d))
")

# Extract individual fields
COLOR_HINT=$(echo "$VISUAL_DIRECTION" | python3 -c "import sys,json; print(json.load(sys.stdin)['palette'])")
DESIGN_STYLE=$(echo "$VISUAL_DIRECTION" | python3 -c "import sys,json; print(json.load(sys.stdin)['style'])")
DESIGN_FONT=$(echo "$VISUAL_DIRECTION" | python3 -c "import sys,json; print(json.load(sys.stdin)['font'])")
DESIGN_MOOD=$(echo "$VISUAL_DIRECTION" | python3 -c "import sys,json; print(json.load(sys.stdin)['mood'])")
LAYOUT_TWIST=$(echo "$VISUAL_DIRECTION" | python3 -c "import sys,json; print(json.load(sys.stdin)['layout_twist'])")
NAV_PATTERN=$(echo "$VISUAL_DIRECTION" | python3 -c "import sys,json; print(json.load(sys.stdin).get('nav_pattern','bottom tabs'))")

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

**Visual Direction (FOLLOW THIS CLOSELY — this is what makes each prototype unique):**
- **Design style:** ${DESIGN_STYLE}
- **Color palette:** ${COLOR_HINT}
- **Mood/feeling:** ${DESIGN_MOOD}
- **Typography:** Use Google Font "${DESIGN_FONT}" — load it via a style tag. Use it consistently with proper weight hierarchy (bold for headings, regular for body). This font IS the personality.
- **Layout twist:** ${LAYOUT_TWIST} — incorporate this into at least 2 screens to make the layout feel distinctive.

**ANTI-SAMENESS RULES (read carefully):**
- Do NOT default to glassmorphism, card grids, or gradient glow effects unless the style above specifically calls for it.
- Do NOT use purple (#8B5CF6, #A855F7, #9B6DFF) as primary color unless the palette above says purple.
- Do NOT make everything dark-mode-first with neon accents — follow the palette direction above.
- Each screen should feel like it belongs to THIS app, not a generic template. Use the design style to inform spacing, borders, shadows, and element shapes.
- Vary card shapes, section layouts, and information density based on the style. A neo-brutalist app should feel chunky and raw. An editorial app should feel typographic and spacious. A retro app should feel textured and nostalgic.

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
  --model sonnet \
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
