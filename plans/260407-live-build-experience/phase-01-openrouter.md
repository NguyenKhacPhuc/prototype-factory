# Phase 1: OpenRouter Integration + Model Routing

**Status:** Planned
**Dependencies:** None

## Overview

Replace direct Anthropic API with OpenRouter as unified gateway. Route different models per build stage for optimal cost/quality.

## Model Routing Table

| Stage | Task type | Model | Why | Cost/M in→out |
|-------|-----------|-------|-----|---------------|
| 0 Ideation | Creative writing | anthropic/claude-sonnet-4.6 | Best at creative spec writing | $3/$15 |
| 1 Design | Design system | anthropic/claude-sonnet-4.6 | Understands design tokens | $3/$15 |
| 2 Scaffold | Boilerplate code | openai/gpt-4.1-mini | Good at configs, cheap | $0.40/$1.60 |
| 3 Implement | Bulk code writing | qwen/qwen3-coder | Purpose-built for code | $0.22/$1.00 |
| 4 Ship | Templates/listings | openai/gpt-4.1-mini | Simple text generation | $0.40/$1.60 |

## Implementation

```typescript
// worker/openrouter-client.ts

const OPENROUTER_URL = 'https://openrouter.ai/api/v1';

// Same shape as Anthropic API — OpenRouter supports it
const client = new Anthropic({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: OPENROUTER_URL,
});

// Model router
function getModel(stage: number, step: string): string {
  switch (stage) {
    case 0: case 1: return 'anthropic/claude-sonnet-4.6';
    case 2: case 4: return 'openai/gpt-4.1-mini';
    case 3: return 'qwen/qwen3-coder';
    default: return 'openai/gpt-4.1-mini';
  }
}
```

## OpenRouter API Compatibility

OpenRouter supports the Anthropic messages format:
- Same `/v1/messages` endpoint shape
- Same tool_use/tool_result protocol
- Same streaming format
- Just change `baseURL` and `apiKey`

Need to verify: tool use works reliably with Qwen3 Coder and GPT-4.1-mini via OpenRouter.

## Tasks

- [ ] Create OpenRouter account + API key
- [ ] Update worker config: OPENROUTER_API_KEY
- [ ] Create openrouter-client.ts with model routing
- [ ] Update SkillRouter.getModel() to return OpenRouter model IDs
- [ ] Test tool use with GPT-4.1-mini (scaffold stage)
- [ ] Test tool use with Qwen3 Coder (implement stage)
- [ ] Fallback: if model fails tool use, retry with Sonnet
- [ ] Cost comparison test: same app, OpenRouter vs direct Anthropic

## Risks

- Qwen3 Coder tool use may be unreliable → fallback to GPT-4.1-mini
- OpenRouter adds ~100ms latency per call (proxy overhead)
- Different models may produce incompatible code styles across stages
