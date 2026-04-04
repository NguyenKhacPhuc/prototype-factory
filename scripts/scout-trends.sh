#!/bin/bash
# Scout trending apps and design patterns using Gemini with Google Search grounding
# Output: JSON with trending_apps, design_trends, idea_seeds
# Cached per day to avoid redundant API calls

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$SCRIPT_DIR/.."
set -a
source "$REPO_DIR/.env"
set +a

if [ -z "${GEMINI_API_KEY:-}" ]; then
  echo "Error: Set GEMINI_API_KEY in .env" >&2
  exit 1
fi

CACHE_DIR="$REPO_DIR/logs/trends"
mkdir -p "$CACHE_DIR"
TODAY=$(date +%Y-%m-%d)
CACHE_FILE="$CACHE_DIR/trends-${TODAY}.json"

# Return cached if already scouted today
if [ -f "$CACHE_FILE" ]; then
  cat "$CACHE_FILE"
  exit 0
fi

echo "Scouting trending apps and design patterns..." >&2

RESULT=$(python3 -c "
import json, urllib.request, os

prompt = '''Research current trending mobile apps and design patterns. I need real, specific information about what's popular RIGHT NOW.

Find:
1. 8-10 currently trending or recently viral mobile apps across different categories (health, finance, social, productivity, entertainment, food, travel, sustainability, education, creative tools). For each, explain in 1 sentence what makes it special or why it's trending.
2. 5-7 current mobile UI/UX design trends (be specific — not generic like 'minimalism', but specific patterns like 'bento grid dashboards', 'AI chat as primary navigation', 'social proof walls', 'ambient status screens').
3. 5 idea seeds — specific unmet needs or emerging behaviors that could become an app. Each should describe a real human behavior and a gap no current app fills well.

Return JSON only:
{
  \"trending_apps\": [{\"name\": \"...\", \"category\": \"...\", \"what_makes_it_hot\": \"...\"}],
  \"design_trends\": [\"specific trend description\", ...],
  \"idea_seeds\": [{\"concept\": \"...\", \"why_now\": \"...\", \"target_behavior\": \"...\"}]
}'''

body = json.dumps({
    'contents': [{'parts': [{'text': prompt}]}],
    'tools': [{'google_search_retrieval': {'dynamic_retrieval_config': {'mode': 'MODE_DYNAMIC', 'dynamic_threshold': 0.3}}}],
    'generationConfig': {
        'temperature': 0.7,
        'responseMimeType': 'application/json'
    }
}).encode()

req = urllib.request.Request(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + os.environ['GEMINI_API_KEY'],
    data=body,
    headers={'Content-Type': 'application/json'}
)
resp = json.loads(urllib.request.urlopen(req).read())

if 'error' in resp:
    raise Exception(json.dumps(resp['error']))

content = resp['candidates'][0]['content']['parts'][0]['text']
parsed = json.loads(content)
print(json.dumps(parsed, indent=2))
" 2>/dev/null) || {
  # Fallback: non-grounded call
  echo "Search grounding failed, falling back to non-grounded call..." >&2
  RESULT=$(python3 -c "
import json, urllib.request, os

prompt = '''You are a mobile app market analyst. Based on your knowledge of current trends, generate:

1. 8 trending mobile apps across categories with what makes each special
2. 5 specific mobile UI/UX design trends (not generic — specific patterns)
3. 5 idea seeds for unmet needs

Return JSON:
{
  \"trending_apps\": [{\"name\": \"...\", \"category\": \"...\", \"what_makes_it_hot\": \"...\"}],
  \"design_trends\": [\"...\"],
  \"idea_seeds\": [{\"concept\": \"...\", \"why_now\": \"...\", \"target_behavior\": \"...\"}]
}'''

body = json.dumps({
    'contents': [{'parts': [{'text': prompt}]}],
    'generationConfig': {'temperature': 0.9, 'responseMimeType': 'application/json'}
}).encode()
req = urllib.request.Request(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + os.environ['GEMINI_API_KEY'],
    data=body,
    headers={'Content-Type': 'application/json'}
)
resp = json.loads(urllib.request.urlopen(req).read())
content = resp['candidates'][0]['content']['parts'][0]['text']
parsed = json.loads(content)
print(json.dumps(parsed, indent=2))
")
}

# Cache and output
echo "$RESULT" > "$CACHE_FILE"
echo "$RESULT"
