import { config } from './config';

interface ComplexityScore {
  screens: number;
  auth: number;
  data_model: number;
  integrations: number;
  realtime: number;
  media: number;
  business_logic: number;
}

export interface ComplexityEstimate {
  scores: ComplexityScore;
  weighted_score: number;
  tier: 'simple' | 'standard' | 'complex' | 'advanced' | 'enterprise';
  task_count: number;
  estimated_screens: number;
  key_integrations: string[];
  reasoning: string;
}

const WEIGHTS = {
  screens: 0.15,
  auth: 0.15,
  data_model: 0.15,
  integrations: 0.15,
  realtime: 0.10,
  media: 0.10,
  business_logic: 0.20,
};

export const PRICING: Record<string, { min_score: number; max_score: number; price_cents: number; label: string }> = {
  simple:     { min_score: 1.0, max_score: 1.8, price_cents: 2900,  label: '$29' },
  standard:   { min_score: 1.9, max_score: 2.5, price_cents: 5900,  label: '$59' },
  complex:    { min_score: 2.6, max_score: 3.5, price_cents: 9900,  label: '$99' },
  advanced:   { min_score: 3.6, max_score: 4.2, price_cents: 14900, label: '$149' },
  enterprise: { min_score: 4.3, max_score: 5.0, price_cents: 24900, label: '$249' },
};

function scoreToPriceTier(score: number): string {
  if (score <= 1.8) return 'simple';
  if (score <= 2.5) return 'standard';
  if (score <= 3.5) return 'complex';
  if (score <= 4.2) return 'advanced';
  return 'enterprise';
}

export async function estimateComplexity(prompt: string): Promise<ComplexityEstimate> {
  const payload = JSON.stringify({
    contents: [{ parts: [{ text: buildEstimatorPrompt(prompt) }] }],
    generationConfig: {
      temperature: 0.3,
      responseMimeType: 'application/json',
    },
  });

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${config.geminiApiKey}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload }
  );
  const data = await resp.json();

  if (data.error) throw new Error(`Gemini error: ${data.error.message}`);

  const content = data.candidates[0].content.parts[0].text;
  const result = JSON.parse(content) as ComplexityEstimate;

  // Validate and compute weighted score
  const scores = result.scores;
  let weighted = 0;
  for (const [key, weight] of Object.entries(WEIGHTS)) {
    const val = Math.max(1, Math.min(5, scores[key as keyof ComplexityScore] || 1));
    weighted += val * weight;
  }

  result.weighted_score = Math.round(weighted * 10) / 10;
  result.tier = scoreToPriceTier(result.weighted_score) as ComplexityEstimate['tier'];

  return result;
}

export function getPrice(tier: string): { price_cents: number; label: string } {
  return PRICING[tier] || PRICING.complex;
}

function buildEstimatorPrompt(prompt: string): string {
  return `You are an app complexity estimator. Analyze this app idea and score each dimension 1-5.

App idea: "${prompt}"

Score these dimensions (1=simple, 3=medium, 5=complex):
1. screens: how many distinct screens needed? (1=3-5, 2=5-7, 3=7-10, 4=10-15, 5=15+)
2. auth: no auth (1), basic login (2), social login (3), roles/permissions (4), teams+admin (5)
3. data_model: how many database tables and relationships? (1=1-3, 2=3-5, 3=5-8, 4=8-12, 5=12+)
4. integrations: how many third-party APIs? (1=0, 2=1, 3=2, 4=3-4, 5=5+)
5. realtime: none (1), polling (2), live updates (3), chat/collab (4), multiplayer/live-streaming (5)
6. media: text only (1), display images (2), image upload (3), video/audio (4), camera/AR (5)
7. business_logic: basic CRUD (1), forms+validation (2), workflows+rules (3), algorithms+matching (4), ML/AI (5)

Also estimate:
- task_count: how many implementation tasks (5-50)
- estimated_screens: exact number of screens
- key_integrations: list of third-party services needed (e.g. "stripe", "google-maps", "push-notifications")
- reasoning: 1-2 sentences explaining the score

Return JSON:
{
  "scores": { "screens": N, "auth": N, "data_model": N, "integrations": N, "realtime": N, "media": N, "business_logic": N },
  "weighted_score": 0,
  "tier": "simple",
  "task_count": N,
  "estimated_screens": N,
  "key_integrations": ["..."],
  "reasoning": "..."
}`;
}
