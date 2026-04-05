# Phase 6: Complexity Estimator + Pricing Engine

**Priority:** Medium
**Status:** Planned
**Dependencies:** Phase 1

## Overview

Before building a mobile app, estimate complexity using Gemini (free), show the user a price quote, and get confirmation before spending Claude tokens.

## Complexity Scoring (7 Dimensions)

| Dimension | Weight | 1 (Simple) | 3 (Medium) | 5 (Complex) |
|-----------|--------|-----------|-----------|-------------|
| Screens | 15% | 3-5 | 6-10 | 11+ |
| Auth & Users | 15% | No auth | Social login | Roles, teams |
| Data Model | 15% | 1-3 tables | 4-8 tables | 9+ tables |
| Third-party APIs | 15% | None | 1-2 | 3+ |
| Realtime | 10% | None | Live updates | Chat, collab |
| Media | 10% | Text only | Images | Video, camera |
| Business Logic | 20% | CRUD | Workflows | Algorithms, ML |

## Pricing Tiers

| Tier | Score | Tasks | Our Cost | User Price |
|------|-------|-------|----------|------------|
| Simple | 1.0-1.8 | 5-10 | $5-12 | $29 |
| Standard | 1.9-2.5 | 11-20 | $12-25 | $59 |
| Complex | 2.6-3.5 | 21-35 | $25-40 | $99 |
| Advanced | 3.6-4.2 | 36-50 | $40-65 | $149 |
| Enterprise | 4.3-5.0 | 50+ | $65-100 | $249+ |

Prototype only: FREE (or $5 for priority queue)

## Gemini Estimator

```typescript
async function estimateComplexity(prompt: string) {
  // Call Gemini (free) to analyze the app idea
  // Returns: scores per dimension, tier, task count, integrations list
  // Takes ~2 seconds
}
```

## User Flow

```
User: "Build an Uber-like app for dog walkers"
  → Gemini scores: screens=4, auth=4, data=4, integrations=5, realtime=4...
  → Weighted score: 3.9 → Tier: Advanced
  → Show: "~38 tasks, ~12 screens, $149"
  → User confirms → job created with complexity metadata
```

## Post-Build Reconciliation

Track actual cost vs quoted price per job:

```sql
select tier,
  count(*) as jobs,
  avg(actual_cost_cents) as avg_cost,
  avg(quoted_price_cents) as avg_price,
  avg(margin_pct) as avg_margin
from cost_reconciliation
group by tier;
```

Tune pricing tiers based on real data.

## Cost Guardrails

| Guard | Limit | Action |
|-------|-------|--------|
| Max cost per job | $100 | Kill job, notify user |
| Max tokens per call | 16K output | Truncate |
| Max retries per task | 3 | Skip task, log |
| Max calls per job | 200 | Kill job |
| Daily budget per user | $50 | Block new jobs |
| Daily budget global | $500 | Pause all workers |

## Success Criteria

- [ ] Gemini estimates complexity in <3 seconds
- [ ] Pricing shown to user before build starts
- [ ] User must confirm price before job is created
- [ ] Actual costs tracked and reconciled
- [ ] Guardrails prevent runaway costs
- [ ] Pricing tiers reviewed monthly based on data
