#!/bin/bash
# Generate a creative app idea using Google Gemini API
# Output: JSON with name, tagline, description, features, audience, category, useCases, engagementLoop, trendFit, monetization

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
set -a
source "$SCRIPT_DIR/../.env"
set +a

if [ -z "${GEMINI_API_KEY:-}" ]; then
  echo "Error: Set GEMINI_API_KEY in .env" >&2
  exit 1
fi

CATEGORIES=(
  "health & fitness"
  "personal finance"
  "social & community"
  "productivity"
  "education"
  "entertainment"
  "travel"
  "food & cooking"
  "sustainability"
  "creative tools"
)

# Extra creative dimensions to increase variety without changing external behavior
ARCHETYPES=(
  "coach"
  "club"
  "ritual"
  "challenge app"
  "remix tool"
  "ambient companion"
  "collaborative game"
  "identity community"
  "real-world unlock app"
  "marketplace with a twist"
)

ENGAGEMENT_MECHANICS=(
  "streaks"
  "friendly competition"
  "social accountability"
  "collectibles"
  "user-generated content"
  "live events"
  "co-op goals"
  "adaptive personalization"
  "seasonal challenges"
  "progressive unlocks"
)

TREND_ANGLES=(
  "short-form content behavior"
  "creator economy"
  "micro-learning"
  "wellness rituals"
  "local discovery"
  "gamified self-improvement"
  "community challenges"
  "sustainability rewards"
  "asynchronous collaboration"
  "identity-based communities"
)

EMOTIONAL_HOOKS=(
  "status and self-expression"
  "calm and reassurance"
  "belonging and community"
  "play and surprise"
  "progress and achievement"
  "accountability and motivation"
  "discovery and novelty"
  "creativity and remix culture"
)

DAY_OF_YEAR=$(date +%-j)
OFFSET=${RANDOM_OFFSET:-0}

# Use batch index if provided (guarantees no duplicates in a batch), otherwise day-based rotation
if [ -n "${BATCH_CATEGORY_INDEX:-}" ]; then
  CATEGORY_INDEX=$(( BATCH_CATEGORY_INDEX % ${#CATEGORIES[@]} ))
  ARCHETYPE_INDEX=$(( BATCH_CATEGORY_INDEX % ${#ARCHETYPES[@]} ))
  ENGAGEMENT_INDEX=$(( (BATCH_CATEGORY_INDEX + 3) % ${#ENGAGEMENT_MECHANICS[@]} ))
  TREND_INDEX=$(( (BATCH_CATEGORY_INDEX + 7) % ${#TREND_ANGLES[@]} ))
  EMOTION_INDEX=$(( (BATCH_CATEGORY_INDEX + 11) % ${#EMOTIONAL_HOOKS[@]} ))
else
  CATEGORY_INDEX=$(( (DAY_OF_YEAR + OFFSET) % ${#CATEGORIES[@]} ))
  ARCHETYPE_INDEX=$(( (DAY_OF_YEAR + 3 + OFFSET) % ${#ARCHETYPES[@]} ))
  ENGAGEMENT_INDEX=$(( (DAY_OF_YEAR + 7 + OFFSET) % ${#ENGAGEMENT_MECHANICS[@]} ))
  TREND_INDEX=$(( (DAY_OF_YEAR + 11 + OFFSET) % ${#TREND_ANGLES[@]} ))
  EMOTION_INDEX=$(( (DAY_OF_YEAR + 17 + OFFSET) % ${#EMOTIONAL_HOOKS[@]} ))
fi

CATEGORY="${CATEGORIES[$CATEGORY_INDEX]}"
ARCHETYPE="${ARCHETYPES[$ARCHETYPE_INDEX]}"
ENGAGEMENT="${ENGAGEMENT_MECHANICS[$ENGAGEMENT_INDEX]}"
TREND="${TREND_ANGLES[$TREND_INDEX]}"
EMOTIONAL_HOOK="${EMOTIONAL_HOOKS[$EMOTION_INDEX]}"

# If game category, pick a random sub-genre
if [ "$CATEGORY" = "game" ]; then
  GAME_GENRES=("strategy" "action" "puzzle" "card" "casual" "family" "sports" "adventure" "world" "board" "racing" "simulation" "role-playing")
  GENRE_INDEX=$(( RANDOM % ${#GAME_GENRES[@]} ))
  CATEGORY="game: ${GAME_GENRES[$GENRE_INDEX]}"
fi

# Load trend context if available
TRENDS_FILE="$SCRIPT_DIR/../logs/trends/trends-$(date +%Y-%m-%d).json"
TREND_CONTEXT=""
if [ -f "$TRENDS_FILE" ]; then
  TREND_CONTEXT=$(python3 -c "
import json
with open('$TRENDS_FILE') as f:
    data = json.load(f)
apps = ', '.join(a['name'] + ' (' + a.get('what_makes_it_hot','')[:60] + ')' for a in data.get('trending_apps', [])[:5])
trends = ', '.join(data.get('design_trends', [])[:4])
seeds = ' | '.join(s['concept'][:80] for s in data.get('idea_seeds', [])[:3])
print(f'Currently trending: {apps}. Design trends: {trends}. Emerging needs: {seeds}.')
" 2>/dev/null) || TREND_CONTEXT=""
fi

PAYLOAD=$(python3 -c "
import json
category = '''${CATEGORY}'''
archetype = '''${ARCHETYPE}'''
engagement = '''${ENGAGEMENT}'''
trend = '''${TREND}'''
emotional_hook = '''${EMOTIONAL_HOOK}'''
trend_context = '''${TREND_CONTEXT}'''

prompt = f'''You are a creative mobile app idea generator. Prioritize originality, strong differentiation, believable consumer appeal, and engagement depth. Avoid repetitive startup clichés and generic utility app framing.

Generate a highly original mobile app idea in the category: {category}.

Creative direction:
- Product archetype: {archetype}
- Primary engagement mechanic: {engagement}
- Trend inspiration: {trend}
- Emotional hook: {emotional_hook}

{'Market context (use as inspiration, do NOT copy these apps): ' + trend_context if trend_context else ''}

Requirements:
- The idea must feel fresh, trend-aware, and capable of strong repeat engagement.
- Avoid generic ideas like a basic tracker, planner, marketplace, social feed, or a simple \"AI assistant for X\" unless there is a surprising twist.
- The concept can be practical, playful, identity-driven, emotional, community-based, or entertainment-first, as long as it has a believable use case.
- Include a clear reason users would come back multiple times per week.
- Include one distinctive product twist that helps it stand out from existing apps.
- Do not rely on vague buzzwords like \"smart\", \"seamless\", or \"AI-powered\" unless absolutely necessary.

Before writing the final answer, internally choose a distinct behavior pattern, retention loop, and product personality so the idea does not feel like a generic utility app.

Return JSON with these fields:
- name: catchy app name (2-3 words max)
- tagline: one-line pitch (under 10 words)
- description: A rich, detailed paragraph (5-8 sentences) explaining what the app does, why people care, how it fits into real behavior, concrete examples of use, what makes it habit-forming, and what makes it feel new.
- features: array of exactly 5 feature objects, each with:
  - title: short feature name
  - detail: 1-2 sentences explaining what it does and why it matters
- audience: target audience with demographics and context (1-2 sentences)
- category: \"{category}\"
- useCases: array of 3 specific real-world scenarios where someone would open and use this app (each 1-2 sentences, written as mini user stories)
- engagementLoop: 2-3 sentences explaining why users keep coming back weekly
- trendFit: 2-3 sentences explaining which current consumer/mobile behavior this app aligns with
- monetization: 1-2 sentences explaining a believable revenue model

Variation rules:
- Make the concept specific enough that it could be pitched or prototyped next week.
- Do not make it sound like a school-project app idea.
- Make the idea meaningfully different from common productivity-tool patterns.

Output valid JSON only, no markdown fences.'''

payload = {
    'contents': [{'parts': [{'text': prompt}]}],
    'generationConfig': {
        'temperature': 1.2,
        'responseMimeType': 'application/json'
    }
}
print(json.dumps(payload))
")

RESPONSE=$(curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

# Extract the content from Gemini response
echo "$RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if 'error' in data:
    print(json.dumps(data), file=sys.stderr)
    sys.exit(1)
content = data['candidates'][0]['content']['parts'][0]['text']
parsed = json.loads(content)
print(json.dumps(parsed, indent=2))
"
