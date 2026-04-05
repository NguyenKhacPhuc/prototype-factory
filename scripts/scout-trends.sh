#!/bin/bash
# Scout trending apps, design patterns, behavioral hooks, niche audiences, and color palettes
# All sourced from real web data via Gemini Google Search grounding
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

echo "Scouting trends from the web..." >&2

export GEMINI_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}"

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
    resp = json.loads(urllib.request.urlopen(req, timeout=90).read())
    if 'error' in resp:
        raise Exception(json.dumps(resp['error']))
    return resp['candidates'][0]['content']['parts'][0]['text']

# === 1. Trending niche apps ===
print("  [1/6] Trending niche apps (ProductHunt, App Store)...", file=sys.stderr)
apps_raw = gemini_search(
    "Search ProductHunt, App Store charts, and tech blogs for the newest, most interesting mobile apps "
    "launched or trending in the past 30 days. Focus on LESSER-KNOWN indie apps and niche tools — "
    "NOT big names like TikTok, Instagram, ChatGPT, Duolingo, Spotify. "
    "Cover: AI tools, health, finance, social, productivity, creative, developer tools, music, photo/video. "
    "For each: exact name, category, what makes it unique, and notable design choices. List 10+ apps."
)

# === 2. Design trends + trending color palettes ===
print("  [2/6] Design trends & color palettes (Dribbble, Behance, Coolors)...", file=sys.stderr)
design_raw = gemini_search(
    "Search Dribbble, Behance, Mobbin, UX Collective, and Coolors for the latest mobile app design trends in 2026. "
    "I need TWO things:\n"
    "A) 8-10 SPECIFIC design patterns (not generic). Examples: 'bento grid dashboards', 'AI chat as primary nav', "
    "'spatial depth with parallax cards', 'liquid glass transparency', 'conversational UI replacing forms'.\n"
    "B) 5-8 TRENDING COLOR PALETTES with exact hex codes. Search Coolors trending, Dribbble popular shots, "
    "and Adobe Color trends. For each palette: name, 4-5 hex codes, and what mood/industry it fits."
)

# === 3. Behavioral psychology hooks ===
print("  [3/6] Behavioral psychology & addictive app mechanics...", file=sys.stderr)
psychology_raw = gemini_search(
    "Search for the most effective behavioral psychology techniques used in successful mobile apps in 2025-2026. "
    "Look at: Nir Eyal's Hook Model applications, gamification research, BJ Fogg's behavior model, "
    "habit loop design, dopamine-driven design patterns. "
    "Find SPECIFIC mechanics from real apps: Duolingo's streak anxiety, BeReal's random timing, "
    "Wordle's one-per-day scarcity, TikTok's variable reward scroll, Temu's gamified shopping. "
    "List 10 specific behavioral hooks with the psychology behind why they work and which apps use them."
)

# === 4. Niche audiences & underserved groups ===
print("  [4/6] Niche audiences & underserved groups...", file=sys.stderr)
audiences_raw = gemini_search(
    "Search Reddit (r/AppIdeas, r/startups, r/SideProject), Twitter/X, and forums for specific groups of people "
    "who are underserved by current mobile apps. I need REAL complaints and frustrations, not generic categories.\n"
    "Find 10+ specific audiences like:\n"
    "- Night shift workers who can't find services open at 3am\n"
    "- New parents overwhelmed by conflicting baby advice\n"
    "- Freelancers with feast-or-famine income patterns\n"
    "- People who just moved to a new city alone\n"
    "- Neurodivergent adults who need different task management\n"
    "- Elderly people confused by modern app complexity\n"
    "For each: who they are, their specific frustration, and what kind of app would help."
)

# === 5. Cross-industry inspiration ===
print("  [5/6] Cross-industry & unconventional app ideas...", file=sys.stderr)
crossover_raw = gemini_search(
    "Search for the most creative and unconventional mobile app concepts from 2025-2026. "
    "Find apps that combine unexpected domains or apply proven mechanics from one industry to another:\n"
    "- 'Tinder but for...' concepts that actually worked\n"
    "- Gamification applied to boring tasks (taxes, cleaning, saving)\n"
    "- Social mechanics applied to solo activities\n"
    "- AI applied to physical world problems\n"
    "- Apps that went viral because of one simple, weird mechanic\n"
    "Search ProductHunt, TechCrunch, Indie Hackers, and Hacker News for examples. List 8+ concepts."
)

# === 6. Synthesize everything ===
print("  [6/6] Synthesizing all research...", file=sys.stderr)
synthesis_body = json.dumps({
    'contents': [{'parts': [{'text': f"""Synthesize these 5 research sources into one structured JSON.

SOURCE 1 — Trending Niche Apps:
{apps_raw[:2500]}

SOURCE 2 — Design Trends & Color Palettes:
{design_raw[:2500]}

SOURCE 3 — Behavioral Psychology Hooks:
{psychology_raw[:2500]}

SOURCE 4 — Niche Audiences & Underserved Groups:
{audiences_raw[:2500]}

SOURCE 5 — Cross-Industry Inspiration:
{crossover_raw[:2500]}

Return JSON only (no markdown fences):
{{
  "trending_apps": [
    {{"name": "app name", "category": "category", "what_makes_it_hot": "1-2 sentences", "design_note": "design choice"}}
  ],
  "design_trends": ["specific pattern with example"],
  "color_palettes": [
    {{"name": "palette name", "colors": ["#hex1", "#hex2", "#hex3", "#hex4"], "mood": "mood description", "best_for": "industry/app type"}}
  ],
  "behavioral_hooks": [
    {{"name": "hook name", "psychology": "why it works", "example_app": "real app using it", "mechanic": "specific implementation"}}
  ],
  "niche_audiences": [
    {{"who": "specific group", "frustration": "their real pain point", "app_opportunity": "what would help them"}}
  ],
  "crossover_ideas": [
    {{"concept": "the mashup idea", "formula": "X mechanic + Y domain", "why_it_works": "why this combination is compelling"}}
  ],
  "idea_seeds": [
    {{"concept": "specific app concept", "why_now": "timing reason", "target_behavior": "the human behavior", "hook": "the addictive mechanic"}}
  ]
}}

Rules:
- 10+ trending apps (niche only, no big names)
- 8+ design trends with specifics
- 5+ color palettes with exact hex codes
- 8+ behavioral hooks with real psychology
- 8+ niche audiences with real frustrations
- 6+ crossover ideas
- 8+ idea seeds that combine audiences + hooks + trends"""}]}],
    'generationConfig': {
        'temperature': 0.5,
        'responseMimeType': 'application/json'
    }
}).encode()

req = urllib.request.Request(GEMINI_URL, data=synthesis_body, headers={'Content-Type': 'application/json'})
resp = json.loads(urllib.request.urlopen(req, timeout=120).read())

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
