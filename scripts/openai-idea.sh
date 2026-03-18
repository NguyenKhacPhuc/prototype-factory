#!/bin/bash
# Generate a creative app idea using OpenAI API (gpt-4o-mini)
# Output: JSON with name, tagline, description, features, audience, category

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/../.env"

if [ -z "${OPENAI_API_KEY:-}" ] || [ "$OPENAI_API_KEY" = "your-openai-api-key-here" ]; then
  echo "Error: Set OPENAI_API_KEY in .env" >&2
  exit 1
fi

# Rotate categories based on day-of-year to ensure variety
CATEGORIES=("health & fitness" "personal finance" "social & community" "productivity" "education" "entertainment" "travel" "food & cooking" "sustainability" "creative tools")
DAY_OF_YEAR=$(date +%-j)
CATEGORY_INDEX=$(( (DAY_OF_YEAR + ${RANDOM_OFFSET:-0}) % ${#CATEGORIES[@]} ))
CATEGORY="${CATEGORIES[$CATEGORY_INDEX]}"

RESPONSE=$(curl -s https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d "$(cat <<PAYLOAD
{
  "model": "gpt-5.4-mini",
  "temperature": 1.2,
  "response_format": { "type": "json_object" },
  "messages": [
    {
      "role": "system",
      "content": "You are a creative app idea generator. Output valid JSON only."
    },
    {
      "role": "user",
      "content": "Generate a unique, innovative mobile app idea in the category: ${CATEGORY}. Be creative and specific - avoid generic ideas. The app should solve a real problem in an interesting way.\n\nReturn JSON with these fields:\n- name: catchy app name (2-3 words max)\n- tagline: one-line pitch (under 10 words)\n- description: A rich, detailed paragraph (5-8 sentences) explaining: what the app does, the problem it solves, how it helps users in their daily life, key use cases with concrete examples, and what makes it unique compared to existing solutions.\n- features: array of exactly 5 key features. Each feature should be a full sentence explaining what it does and why it matters (not just a short phrase).\n- audience: target audience with demographics and context (1-2 sentences)\n- category: \"${CATEGORY}\"\n- useCases: array of 3 specific real-world scenarios where someone would open and use this app (each 1-2 sentences, written as mini user stories like 'Sarah just finished a stressful meeting and wants to...')"
    }
  ]
}
PAYLOAD
)")

# Extract the content from OpenAI response
echo "$RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if 'error' in data:
    print(json.dumps(data), file=sys.stderr)
    sys.exit(1)
content = data['choices'][0]['message']['content']
# Validate it's valid JSON
parsed = json.loads(content)
print(json.dumps(parsed, indent=2))
"
