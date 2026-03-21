#!/bin/bash
# Generate assets (fonts, icons) for a prototype folder
# Usage: ./scripts/generate-assets.sh <prototype-folder-path>

set -euo pipefail

TARGET_DIR="${1:?Usage: generate-assets.sh <prototype-folder-path>}"
SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -f "$TARGET_DIR/App.tsx" ]; then
  echo "Error: No App.tsx found in $TARGET_DIR" >&2
  exit 1
fi

ASSETS_DIR="$TARGET_DIR/assets"
FONTS_DIR="$ASSETS_DIR/fonts"
ICONS_DIR="$ASSETS_DIR/icons"
mkdir -p "$FONTS_DIR" "$ICONS_DIR"

# --- Extract design info ---
FONT_FAMILY="Sans"
PRIMARY_COLOR="#6366f1"
SECONDARY_COLOR="#ec4899"
BG_COLOR="#ffffff"
ACCENT_COLOR="#10b981"

if [ -f "$TARGET_DIR/design-spec.json" ]; then
  FONT_FAMILY=$(python3 -c "import json; d=json.load(open('$TARGET_DIR/design-spec.json')); print(d.get('designSystem',{}).get('fontFamily','Inter'))" 2>/dev/null || echo "Inter")
  PRIMARY_COLOR=$(python3 -c "import json; d=json.load(open('$TARGET_DIR/design-spec.json')); print(d.get('designSystem',{}).get('primaryColor','#6366f1'))" 2>/dev/null || echo "#6366f1")
  SECONDARY_COLOR=$(python3 -c "import json; d=json.load(open('$TARGET_DIR/design-spec.json')); print(d.get('designSystem',{}).get('secondaryColor','#ec4899'))" 2>/dev/null || echo "#ec4899")
  BG_COLOR=$(python3 -c "import json; d=json.load(open('$TARGET_DIR/design-spec.json')); print(d.get('designSystem',{}).get('backgroundColor','#ffffff'))" 2>/dev/null || echo "#ffffff")
  ACCENT_COLOR=$(python3 -c "import json; d=json.load(open('$TARGET_DIR/design-spec.json')); print(d.get('designSystem',{}).get('accentColor','#10b981'))" 2>/dev/null || echo "#10b981")
fi

APP_NAME="Prototype"
TAGLINE=""
if [ -f "$TARGET_DIR/design-spec.json" ]; then
  APP_NAME=$(python3 -c "import json; print(json.load(open('$TARGET_DIR/design-spec.json')).get('appName','Prototype'))" 2>/dev/null || echo "Prototype")
  TAGLINE=$(python3 -c "import json; print(json.load(open('$TARGET_DIR/design-spec.json')).get('tagline',''))" 2>/dev/null || echo "")
fi

echo "  Generating assets for: $APP_NAME"
echo "  Font: $FONT_FAMILY | Colors: $PRIMARY_COLOR $SECONDARY_COLOR $ACCENT_COLOR"

# --- Download Google Font ---
echo "  Downloading font: $FONT_FAMILY..."
FONT_SLUG=$(echo "$FONT_FAMILY" | tr ' ' '+')

# Download font CSS from Google Fonts API (woff2 format)
FONT_CSS_URL="https://fonts.googleapis.com/css2?family=${FONT_SLUG}:wght@300;400;500;600;700&display=swap"
FONT_CSS=$(curl -sL -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" "$FONT_CSS_URL" 2>/dev/null || echo "")

if [ -n "$FONT_CSS" ]; then
  # Save the CSS
  echo "$FONT_CSS" > "$FONTS_DIR/font.css"

  # Extract font file URLs (woff2 or ttf) and download them
  FONT_URLS=$(echo "$FONT_CSS" | grep -o 'https://[^)]*\.\(woff2\|ttf\)' || true)
  FONT_COUNT=0
  while IFS= read -r url; do
    if [ -n "$url" ]; then
      FONT_COUNT=$((FONT_COUNT + 1))
      FILENAME=$(basename "$url")
      curl -sL "$url" -o "$FONTS_DIR/$FILENAME" 2>/dev/null || true
    fi
  done <<< "$FONT_URLS"
  echo "  Downloaded $FONT_COUNT font files"

  # Rewrite CSS: replace full Google Fonts URLs with local ./filename
  python3 -c "
import re
with open('$FONTS_DIR/font.css') as f:
    css = f.read()
def rewrite(m):
    url = m.group(1)
    filename = url.rsplit('/', 1)[-1]
    return 'url(./' + filename + ')'
css = re.sub(r'url\((https://fonts\.gstatic\.com/[^)]+)\)', rewrite, css)
with open('$FONTS_DIR/font.css', 'w') as f:
    f.write(css)
"
else
  echo "  Warning: Could not download font '$FONT_FAMILY', using fallback"
  echo "/* Font '$FONT_FAMILY' not available - using system fallback */" > "$FONTS_DIR/font.css"
fi

# --- Extract and download Lucide icons as SVGs ---
echo "  Extracting icons from App.tsx..."
ICON_NAMES=$(grep -o 'window\.lucide\.\w\+' "$TARGET_DIR/App.tsx" 2>/dev/null | sed 's/window\.lucide\.//' | sort -u || true)

ICON_COUNT=0
for ICON in $ICON_NAMES; do
  # Convert PascalCase to kebab-case using python (macOS sed lacks \L)
  KEBAB=$(python3 -c "import re; print(re.sub(r'(?<!^)(?=[A-Z])', '-', '$ICON').lower())")
  SVG_URL="https://unpkg.com/lucide-static@latest/icons/${KEBAB}.svg"
  SVG_FILE="$ICONS_DIR/${KEBAB}.svg"

  if curl -sL --fail "$SVG_URL" -o "$SVG_FILE" 2>/dev/null; then
    ICON_COUNT=$((ICON_COUNT + 1))
  else
    rm -f "$SVG_FILE"
  fi
done
echo "  Downloaded $ICON_COUNT icon SVGs"

# --- Generate assets.json manifest ---
python3 -c "
import json, os

icons_dir = '$ICONS_DIR'
fonts_dir = '$FONTS_DIR'

icons = sorted([f.replace('.svg','') for f in os.listdir(icons_dir) if f.endswith('.svg')])
fonts = sorted([f for f in os.listdir(fonts_dir) if f.endswith('.woff2')])

manifest = {
    'appName': '$APP_NAME',
    'fontFamily': '$FONT_FAMILY',
    'colors': {
        'primary': '$PRIMARY_COLOR',
        'secondary': '$SECONDARY_COLOR',
        'background': '$BG_COLOR',
        'accent': '$ACCENT_COLOR'
    },
    'icons': icons,
    'fonts': fonts,
    'iconCount': len(icons),
    'fontFileCount': len(fonts)
}
print(json.dumps(manifest, indent=2))
" > "$ASSETS_DIR/assets.json"

# --- Generate assets preview page ---
cat > "$TARGET_DIR/assets.html" <<'ASSETS_HTML'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Assets — APP_NAME_PLACEHOLDER</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e5e5e5; }
    .container { max-width: 1200px; margin: 0 auto; padding: 40px; }
    header { margin-bottom: 48px; }
    header h1 { font-size: 32px; font-weight: 700; letter-spacing: -0.5px; }
    header .tagline { color: #888; margin-top: 4px; font-size: 15px; }
    .back-link { color: #888; text-decoration: none; font-size: 14px; display: inline-block; margin-bottom: 16px; }
    .back-link:hover { color: #ccc; }

    /* Sections */
    section { margin-bottom: 56px; }
    section h2 { font-size: 20px; font-weight: 600; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid #222; }
    .count { color: #666; font-weight: 400; font-size: 14px; margin-left: 8px; }

    /* Colors */
    .color-grid { display: flex; gap: 16px; flex-wrap: wrap; }
    .color-card {
      width: 180px; border-radius: 12px; overflow: hidden;
      background: #161616; border: 1px solid #222;
    }
    .color-swatch { height: 100px; }
    .color-info { padding: 12px 16px; }
    .color-info .label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
    .color-info .hex { font-size: 16px; font-weight: 600; margin-top: 4px; font-family: 'SF Mono', monospace; }

    /* Typography */
    .font-preview {
      background: #161616; border: 1px solid #222; border-radius: 12px;
      padding: 32px; margin-bottom: 16px;
    }
    .font-name { font-size: 14px; color: #888; margin-bottom: 16px; }
    .font-sample { margin-bottom: 20px; }
    .font-sample .size-label { font-size: 11px; color: #555; margin-bottom: 4px; font-family: monospace; }
    .font-weights { display: flex; gap: 24px; flex-wrap: wrap; margin-top: 24px; padding-top: 20px; border-top: 1px solid #222; }
    .weight-item { }
    .weight-item .weight-label { font-size: 11px; color: #555; margin-bottom: 4px; }
    .weight-item .weight-text { font-size: 24px; }
    .font-files { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
    .font-file {
      font-size: 11px; padding: 4px 10px; border-radius: 6px;
      background: #1a1a1a; border: 1px solid #333; color: #888;
      font-family: monospace;
    }

    /* Icons */
    .icon-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 12px;
    }
    .icon-card {
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      padding: 20px 12px; border-radius: 12px;
      background: #161616; border: 1px solid #222;
      transition: border-color 0.15s, background 0.15s;
    }
    .icon-card:hover { border-color: #444; background: #1a1a1a; }
    .icon-card img { width: 28px; height: 28px; filter: brightness(0.85) invert(1); }
    .icon-card .icon-name {
      font-size: 10px; color: #666; text-align: center;
      word-break: break-all; line-height: 1.3;
    }

    /* Summary bar */
    .summary {
      display: flex; gap: 32px; padding: 20px 24px;
      background: #161616; border: 1px solid #222; border-radius: 12px;
      margin-bottom: 48px;
    }
    .summary-item .summary-value { font-size: 24px; font-weight: 700; }
    .summary-item .summary-label { font-size: 12px; color: #666; margin-top: 2px; }
  </style>
</head>
<body>
<div class="container">
  <a class="back-link" href="preview.html">&larr; Back to prototype</a>
  <header>
    <h1 id="app-name">Assets</h1>
    <div class="tagline" id="tagline"></div>
  </header>

  <div class="summary" id="summary"></div>

  <section id="colors-section">
    <h2>Color Palette</h2>
    <div class="color-grid" id="color-grid"></div>
  </section>

  <section id="typography-section">
    <h2>Typography</h2>
    <div id="typography"></div>
  </section>

  <section id="icons-section">
    <h2>Icons <span class="count" id="icon-count"></span></h2>
    <div class="icon-grid" id="icon-grid"></div>
  </section>
</div>

<script>
async function init() {
  const res = await fetch('assets/assets.json');
  const data = await res.json();

  document.title = `Assets — ${data.appName}`;
  document.getElementById('app-name').textContent = `${data.appName} — Assets`;

  // Load custom font
  if (data.fontFamily) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = `assets/fonts/font.css`;
    document.head.appendChild(fontLink);
  }

  // Summary
  const summary = document.getElementById('summary');
  summary.innerHTML = `
    <div class="summary-item"><div class="summary-value">${Object.keys(data.colors).length}</div><div class="summary-label">Colors</div></div>
    <div class="summary-item"><div class="summary-value">1</div><div class="summary-label">Font Family</div></div>
    <div class="summary-item"><div class="summary-value">${data.fontFileCount}</div><div class="summary-label">Font Files</div></div>
    <div class="summary-item"><div class="summary-value">${data.iconCount}</div><div class="summary-label">Icons</div></div>
  `;

  // Colors
  const colorGrid = document.getElementById('color-grid');
  for (const [label, hex] of Object.entries(data.colors)) {
    colorGrid.innerHTML += `
      <div class="color-card">
        <div class="color-swatch" style="background:${hex}"></div>
        <div class="color-info">
          <div class="label">${label}</div>
          <div class="hex">${hex}</div>
        </div>
      </div>
    `;
  }

  // Typography
  const typo = document.getElementById('typography');
  const ff = `'${data.fontFamily}', sans-serif`;
  typo.innerHTML = `
    <div class="font-preview">
      <div class="font-name">${data.fontFamily}</div>
      <div class="font-sample">
        <div class="size-label">48px — Display</div>
        <div style="font-family:${ff};font-size:48px;font-weight:700;line-height:1.1;color:${data.colors.primary}">${data.appName}</div>
      </div>
      <div class="font-sample">
        <div class="size-label">24px — Heading</div>
        <div style="font-family:${ff};font-size:24px;font-weight:600;line-height:1.3">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="font-sample">
        <div class="size-label">16px — Body</div>
        <div style="font-family:${ff};font-size:16px;font-weight:400;line-height:1.5;color:#aaa">Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!</div>
      </div>
      <div class="font-sample">
        <div class="size-label">12px — Caption</div>
        <div style="font-family:${ff};font-size:12px;font-weight:400;line-height:1.4;color:#666">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 !@#$%^&*()</div>
      </div>
      <div class="font-weights">
        <div class="weight-item"><div class="weight-label">Light 300</div><div class="weight-text" style="font-family:${ff};font-weight:300">Aa</div></div>
        <div class="weight-item"><div class="weight-label">Regular 400</div><div class="weight-text" style="font-family:${ff};font-weight:400">Aa</div></div>
        <div class="weight-item"><div class="weight-label">Medium 500</div><div class="weight-text" style="font-family:${ff};font-weight:500">Aa</div></div>
        <div class="weight-item"><div class="weight-label">Semibold 600</div><div class="weight-text" style="font-family:${ff};font-weight:600">Aa</div></div>
        <div class="weight-item"><div class="weight-label">Bold 700</div><div class="weight-text" style="font-family:${ff};font-weight:700">Aa</div></div>
      </div>
      <div class="font-files" id="font-files"></div>
    </div>
  `;
  const fontFiles = document.getElementById('font-files');
  data.fonts.forEach(f => {
    fontFiles.innerHTML += `<span class="font-file">${f}</span>`;
  });

  // Icons
  document.getElementById('icon-count').textContent = `(${data.iconCount})`;
  const iconGrid = document.getElementById('icon-grid');
  for (const icon of data.icons) {
    iconGrid.innerHTML += `
      <div class="icon-card">
        <img src="assets/icons/${icon}.svg" alt="${icon}" />
        <div class="icon-name">${icon}</div>
      </div>
    `;
  }
}
init();
</script>
</body>
</html>
ASSETS_HTML

echo "  Assets generated: $ASSETS_DIR/"
echo "  Preview: $TARGET_DIR/assets.html"
