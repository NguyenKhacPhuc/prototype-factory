#!/bin/bash
# Captures a screenshot of a prototype at phone dimensions (375x812)
# Usage: ./scripts/capture-screenshot.sh <prototype-folder-path>
# Saves screenshot.png in the prototype folder

set -euo pipefail

TARGET_DIR="${1:?Usage: capture-screenshot.sh <prototype-folder-path>}"
SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$SCRIPTS_DIR/.."

if [ ! -f "$TARGET_DIR/preview.html" ]; then
  echo "  SKIP: No preview.html in $TARGET_DIR" >&2
  exit 1
fi

# Start a temp HTTP server
PORT=$(python3 -c "import random; print(random.randint(9100, 9900))")
python3 -m http.server "$PORT" --directory "$TARGET_DIR" &>/dev/null &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null; wait $SERVER_PID 2>/dev/null" EXIT
sleep 1

# Puppeteer screenshot script
SCREENSHOT_SCRIPT=$(mktemp /tmp/screenshot-XXXXXX.mjs)
cat > "$SCREENSHOT_SCRIPT" <<SCRIPT_EOF
import puppeteer from 'puppeteer';

const url = 'http://localhost:${PORT}/preview.html';
const output = '${TARGET_DIR}/screenshot.png';

try {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 30000,
  });

  const page = await browser.newPage();
  // Use a large viewport so the phone frame (375x812) is fully visible and centered
  await page.setViewport({ width: 800, height: 900, deviceScaleFactor: 2 });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait for React to render
  await page.waitForFunction(() => {
    const root = document.getElementById('root');
    return root && root.children.length > 0;
  }, { timeout: 15000 }).catch(() => {});

  // Extra settle time for fonts and animations
  await new Promise(r => setTimeout(r, 2000));

  // Find the phone frame element (div with ~375x812 dimensions) and screenshot it
  const phoneFrame = await page.evaluateHandle(() => {
    const allDivs = document.querySelectorAll('#root div');
    for (const div of allDivs) {
      const style = div.style;
      const w = parseInt(style.width);
      const h = parseInt(style.height);
      if (w === 375 && (h >= 800 && h <= 850)) return div;
    }
    // Fallback: find by computed size
    for (const div of allDivs) {
      const rect = div.getBoundingClientRect();
      if (rect.width >= 370 && rect.width <= 380 && rect.height >= 800 && rect.height <= 850) return div;
    }
    return null;
  });

  if (phoneFrame.asElement()) {
    await phoneFrame.asElement().screenshot({ path: output, type: 'png' });
  } else {
    // Fallback: full page screenshot if phone frame not found
    await page.screenshot({ path: output, type: 'png' });
  }
  await browser.close();

  console.log(JSON.stringify({ success: true, path: output }));
  process.exit(0);
} catch (err) {
  console.log(JSON.stringify({ success: false, error: err.message }));
  process.exit(1);
}
SCRIPT_EOF

# Run from repo dir so bun can find puppeteer
cd "$REPO_DIR" && bun "$SCREENSHOT_SCRIPT" > /dev/null 2>&1 || {
  echo "  FAIL: Screenshot capture failed for $TARGET_DIR" >&2
  rm -f "$SCREENSHOT_SCRIPT"
  exit 1
}

rm -f "$SCREENSHOT_SCRIPT"

# Kill the temp server
kill "$SERVER_PID" 2>/dev/null || true
wait "$SERVER_PID" 2>/dev/null || true
trap - EXIT

if [ -f "$TARGET_DIR/screenshot.png" ]; then
  echo "  OK: Screenshot saved to $TARGET_DIR/screenshot.png"
  exit 0
else
  echo "  FAIL: Screenshot file not created" >&2
  exit 1
fi
