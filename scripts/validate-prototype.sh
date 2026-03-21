#!/bin/bash
# Validates a prototype renders without errors using headless Chrome
# Usage: ./scripts/validate-prototype.sh <prototype-folder-path>
# Exit 0 = valid, Exit 1 = broken

set -euo pipefail

TARGET_DIR="${1:?Usage: validate-prototype.sh <prototype-folder-path>}"
SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -f "$TARGET_DIR/preview.html" ] || [ ! -f "$TARGET_DIR/App.tsx" ]; then
  echo "  FAIL: Missing preview.html or App.tsx" >&2
  exit 1
fi

# --- Static checks first (fast, no browser needed) ---

# 1. Check App.tsx has the required function App() declaration
if ! grep -q 'function App()' "$TARGET_DIR/App.tsx"; then
  echo "  FAIL: App.tsx missing 'function App()' declaration" >&2
  exit 1
fi

# 2. Check for forbidden import/export statements that break Babel standalone
if grep -qE '^\s*(import |export )' "$TARGET_DIR/App.tsx"; then
  echo "  FAIL: App.tsx contains import/export statements (breaks Babel standalone)" >&2
  exit 1
fi

# 3. Check file isn't suspiciously small (likely incomplete generation)
APP_LINES=$(wc -l < "$TARGET_DIR/App.tsx" | tr -d ' ')
if [ "$APP_LINES" -lt 50 ]; then
  echo "  FAIL: App.tsx too small ($APP_LINES lines) — likely incomplete generation" >&2
  exit 1
fi

# 4. Check for common syntax issues that Babel will choke on
# Unclosed JSX tags, mismatched braces, etc. — use a simple brace/paren balance check
OPEN_BRACES=$(grep -o '{' "$TARGET_DIR/App.tsx" | wc -l | tr -d ' ')
CLOSE_BRACES=$(grep -o '}' "$TARGET_DIR/App.tsx" | wc -l | tr -d ' ')
BRACE_DIFF=$((OPEN_BRACES - CLOSE_BRACES))
if [ "$BRACE_DIFF" -gt 2 ] || [ "$BRACE_DIFF" -lt -2 ]; then
  echo "  FAIL: Brace mismatch (open=$OPEN_BRACES close=$CLOSE_BRACES diff=$BRACE_DIFF)" >&2
  exit 1
fi

OPEN_PARENS=$(grep -o '(' "$TARGET_DIR/App.tsx" | wc -l | tr -d ' ')
CLOSE_PARENS=$(grep -o ')' "$TARGET_DIR/App.tsx" | wc -l | tr -d ' ')
PAREN_DIFF=$((OPEN_PARENS - CLOSE_PARENS))
if [ "$PAREN_DIFF" -gt 2 ] || [ "$PAREN_DIFF" -lt -2 ]; then
  echo "  FAIL: Parenthesis mismatch (open=$OPEN_PARENS close=$CLOSE_PARENS diff=$PAREN_DIFF)" >&2
  exit 1
fi

# --- Browser validation (headless Chrome via Puppeteer) ---

# Start a temp HTTP server for this prototype
PORT=$(python3 -c "import random; print(random.randint(9100, 9900))")
python3 -m http.server "$PORT" --directory "$TARGET_DIR" &>/dev/null &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null; wait $SERVER_PID 2>/dev/null" EXIT
sleep 1

# Run headless validation
VALIDATE_SCRIPT=$(mktemp /tmp/validate-XXXXXX.mjs)
cat > "$VALIDATE_SCRIPT" <<SCRIPT_EOF
import puppeteer from 'puppeteer';

const url = 'http://localhost:${PORT}/preview.html';
const errors = [];
const logs = [];
let appRendered = false;

try {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 30000,
  });

  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
    logs.push(\`[\${msg.type()}] \${msg.text()}\`);
  });

  page.on('pageerror', err => {
    errors.push(err.message);
  });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait a bit for Babel to transpile and React to render
  await page.waitForFunction(() => {
    const root = document.getElementById('root');
    return root && root.children.length > 0;
  }, { timeout: 15000 }).then(() => {
    appRendered = true;
  }).catch(() => {
    appRendered = false;
  });

  // Check if there's actual content rendered
  const rootHTML = await page.evaluate(() => {
    const root = document.getElementById('root');
    return root ? root.innerHTML.length : 0;
  });

  await browser.close();

  // Filter out non-critical errors (network 404s for fonts, etc.)
  const criticalErrors = errors.filter(e =>
    !e.includes('net::ERR_') &&
    !e.includes('favicon.ico') &&
    !e.includes('Failed to load resource')
  );

  const result = {
    valid: appRendered && criticalErrors.length === 0 && rootHTML > 100,
    appRendered,
    rootHTMLLength: rootHTML,
    criticalErrors,
    allErrors: errors,
    logCount: logs.length,
  };

  console.log(JSON.stringify(result));
  process.exit(result.valid ? 0 : 1);

} catch (err) {
  console.log(JSON.stringify({ valid: false, error: err.message }));
  process.exit(1);
}
SCRIPT_EOF

# Check if puppeteer is installed, install if needed
REPO_DIR="$SCRIPTS_DIR/.."
if ! cd "$REPO_DIR" && bun -e "require.resolve('puppeteer')" &>/dev/null; then
  echo "  Installing puppeteer..."
  cd "$REPO_DIR" && bun add puppeteer &>/dev/null
fi

# Run from repo dir so bun can find node_modules/puppeteer
RESULT_FILE=$(mktemp /tmp/validate-result-XXXXXX.json)
cd "$REPO_DIR" && bun "$VALIDATE_SCRIPT" > "$RESULT_FILE" 2>/dev/null || true
RESULT=$(cat "$RESULT_FILE" 2>/dev/null || echo '{"valid":false,"error":"puppeteer failed"}')
rm -f "$RESULT_FILE"

# If result is empty or not JSON, mark as failed
if [ -z "$RESULT" ] || ! echo "$RESULT" | python3 -c "import sys,json; json.load(sys.stdin)" 2>/dev/null; then
  RESULT='{"valid":false,"error":"puppeteer produced no valid output"}'
fi
rm -f "$VALIDATE_SCRIPT"

VALID=$(echo "$RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('valid', False))")
RENDERED=$(echo "$RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('appRendered', False))" 2>/dev/null || echo "unknown")
HTML_LEN=$(echo "$RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('rootHTMLLength', 0))" 2>/dev/null || echo "0")
ERRORS=$(echo "$RESULT" | python3 -c "import sys,json; errs=json.load(sys.stdin).get('criticalErrors',[]); print(len(errs))" 2>/dev/null || echo "?")

# Kill the temp server before exiting
kill "$SERVER_PID" 2>/dev/null || true
wait "$SERVER_PID" 2>/dev/null || true
trap - EXIT

if [ "$VALID" = "True" ]; then
  echo "  PASS: Prototype renders (rendered=$RENDERED, html=${HTML_LEN}chars, errors=$ERRORS)"
  exit 0
else
  echo "  FAIL: Prototype broken (rendered=$RENDERED, html=${HTML_LEN}chars, errors=$ERRORS)" >&2
  echo "$RESULT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for e in data.get('criticalErrors', [])[:5]:
    print(f'    > {e}', file=sys.stderr)
if 'error' in data:
    print(f'    > {data[\"error\"]}', file=sys.stderr)
" 2>&1 || true
  exit 1
fi
