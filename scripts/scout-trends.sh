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

GEMINI_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}"

RESULT=$(python3 << 'PYEOF'
import json, urllib.request, os, sys

GEMINI_URL = os.environ['GEMINI_URL']

def gemini_search(prompt):
    """Call Gemini with Google Search grounding enabled."""
    body = json.dumps({
        'contents': [{'parts': [{'text': prompt}]}],
        'tools': [{'googleSearch': {}}],
        'generationConfig': {'temperature': 0.7}
    }).encode()
    req = urllib.request.Request(GEMINI_URL, data=body, headers={'Content-Type': 'application/json'})
    resp = json.loads(urllib.request.urlopen(req, timeout=30).read())
    if 'error' in resp:
        raise Exception(json.dumps(resp['error']))
    return resp['candidates'][0]['content']['parts'][0]['text']

# Run 3 targeted searches in sequence for depth
print("  [1/3] Searching new & niche apps...", file=sys.stderr)
apps_raw = gemini_search(
    "Search for the newest, most interesting mobile apps launched or trending in the past 30 days. "
    "Focus on LESSER-KNOWN indie apps, ProductHunt launches, and niche apps — NOT big names like TikTok, Instagram, ChatGPT, Duolingo. "
    "Find apps from categories: health, finance, social, productivity, education, entertainment, travel, food, sustainability, creative tools. "
    "For each app, give: exact name, category, what makes it unique (1-2 sentences), and its design approach if notable. "
    "List at least 10 apps."
)

print("  [2/3] Searching mobile design trends...", file=sys.stderr)
design_raw = gemini_search(
    "Search for the latest mobile app UI/UX design trends in 2026. "
    "I need SPECIFIC, concrete design patterns — not generic terms. Examples of what I want: "
    "'conversational UI replacing forms', 'vertical tab bars on the left edge', 'AI-generated personalized illustrations', "
    "'ambient glanceable widgets', 'spatial depth with parallax cards'. "
    "Search design blogs like Mobbin, Dribbble, Behance, UX Collective, and app review sites. "
    "List 8-10 specific trends with real examples of apps using them."
)

print("  [3/3] Searching unmet needs & emerging behaviors...", file=sys.stderr)
seeds_raw = gemini_search(
    "Search for unmet needs and emerging consumer behaviors that could become mobile apps in 2026. "
    "Look at Reddit discussions, Twitter/X complaints, ProductHunt requests, and app store review gaps. "
    "Find 8 specific problems people are talking about that no current app solves well. "
    "For each, describe: the specific behavior/frustration, why it matters now, and what kind of app could solve it."
)

# Now synthesize all 3 into structured JSON
print("  [4/4] Synthesizing results...", file=sys.stderr)
synthesis_body = json.dumps({
    'contents': [{'parts': [{'text': f"""Based on these three research results, create a structured JSON summary.

RESEARCH 1 — New & Niche Apps:
{apps_raw[:3000]}

RESEARCH 2 — Design Trends:
{design_raw[:3000]}

RESEARCH 3 — Unmet Needs:
{seeds_raw[:3000]}

Return JSON only (no markdown fences):
{{
  "trending_apps": [
    {{"name": "exact app name", "category": "category", "what_makes_it_hot": "1-2 sentences on what makes it unique", "design_note": "notable design choice if any"}}
  ],
  "design_trends": ["specific trend with example app or pattern description"],
  "idea_seeds": [
    {{"concept": "specific app concept", "why_now": "why this matters right now", "target_behavior": "the real human behavior this addresses"}}
  ]
}}

Rules:
- Include at least 10 trending apps, prioritize lesser-known/niche ones
- Include at least 8 design trends, be SPECIFIC not generic
- Include at least 6 idea seeds based on real unmet needs
- Do NOT include obvious apps like TikTok, Instagram, ChatGPT, Duolingo, Spotify, Uber"""}]}],
    'generationConfig': {
        'temperature': 0.5,
        'responseMimeType': 'application/json'
    }
}).encode()

req = urllib.request.Request(GEMINI_URL, data=synthesis_body, headers={'Content-Type': 'application/json'})
resp = json.loads(urllib.request.urlopen(req, timeout=60).read())

if 'error' in resp:
    raise Exception(json.dumps(resp['error']))

content = resp['candidates'][0]['content']['parts'][0]['text']
parsed = json.loads(content)
print(json.dumps(parsed, indent=2))
PYEOF
) || {
  echo "Scouting failed" >&2
  exit 1
}

# Cache and output
echo "$RESULT" > "$CACHE_FILE"
echo "$RESULT"
