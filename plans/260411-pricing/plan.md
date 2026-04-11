# Pricing Plan

**Created:** 2026-04-11
**Status:** Planning

## Cost Basis

| Item | Our Cost |
|------|----------|
| Prototype generation | $0.00 (Gemini free + CLI subscription) |
| App build (Opus via OpenRouter) | $0.50 - $2.00 |
| Infrastructure (Supabase, Vercel) | ~$0/month (free tiers) |

## Pricing Tiers

### Free Tier
- Unlimited prototype previews (interactive browser preview)
- 1 app build per account (try it once)
- Download source code
- Purpose: user acquisition, let people see the magic

### Pay Per App — $9.99
- Single app build
- Full source code (iOS + Android)
- Design system + assets
- Store listing + screenshots
- Test with Expo Go
- Margin: 80-95%

### Monthly Pro — $29/month
- Unlimited app builds
- Priority queue (builds start first)
- All Pay Per App features
- Access to Style Studio customization
- Margin: 65%+ (break even at ~15 apps/month)

### Team — $99/month (future)
- Everything in Pro
- 5 team members
- Shared project library
- Custom branding
- API access

## Competitor Pricing

| Competitor | Price | What You Get |
|-----------|-------|-------------|
| Bolt.new | $20-50/month | Web app generation, limited builds |
| Lovable | $20-50/month | Web app generation |
| Cursor | $20/month | AI code editor (not app builder) |
| Custom dev agency | $5,000-50,000 | One app, weeks-months delivery |
| **Appdex** | **$9.99/app or $29/mo** | **Full mobile app in 3 min** |

## Revenue Projections

| Users | Mix | Monthly Revenue | Monthly Cost | Margin |
|-------|-----|----------------|-------------|--------|
| 100 | 50 free, 30 pay-per, 20 pro | $880 | ~$100 | 89% |
| 500 | 200 free, 200 pay-per, 100 pro | $4,900 | ~$600 | 88% |
| 1000 | 400 free, 400 pay-per, 200 pro | $9,800 | ~$1,200 | 88% |

## Implementation

### Phase 1: Free + Pay Per App
- Stripe Checkout for $9.99 one-time payment
- Webhook: on payment success → create generation_job
- Free tier: check build count per user (max 1)

### Phase 2: Subscriptions
- Stripe subscription for $29/month
- Check subscription status before build
- Priority queue for subscribers

### Phase 3: Team Plans
- Stripe team billing
- Org-level settings
- Shared project library
