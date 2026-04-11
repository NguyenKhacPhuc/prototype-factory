# Scaling Plan — 1 to 200+ Concurrent Jobs

**Created:** 2026-04-11
**Status:** Planning

## Current Architecture

```
Single worker on Mac → polls Supabase → 5 concurrent jobs max
```

## Scaling Stages

### Stage 1: Now (1-10 users)
- **Setup:** Single worker on your Mac
- **Concurrent:** 5 jobs
- **Cost:** $0 (runs locally)
- **Action:** Nothing needed

### Stage 2: Soon (10-50 users)
- **Setup:** 2-3 Railway workers polling same Supabase queue
- **Concurrent:** 15 jobs
- **Cost:** ~$15/month
- **Action:**
  - Create Dockerfile for worker
  - Deploy to Railway with env vars
  - Each worker is identical — no coordination needed
  - Atomic `UPDATE ... WHERE status='pending' LIMIT N` prevents double-pickup

### Stage 3: Scale (50-200 users)
- **Setup:** AWS Lambda + SQS queue
- **Concurrent:** 200+ auto-scaling
- **Cost:** ~$0 idle, ~$0.01/job compute + API token cost
- **Action:**
  - Supabase webhook on INSERT → triggers SQS
  - Lambda function runs buildAppV2() per job
  - Auto-scales 0→200, back to 0 when idle
  - 15 min Lambda timeout (enough for 3 min builds)

### Stage 4: Enterprise (200+ users)
- **Setup:** ECS Fargate + SQS + auto-scaling groups
- **Concurrent:** Unlimited
- **Cost:** Pay per container-second
- **Action:**
  - Container-based workers in ECS
  - Auto-scaling based on queue depth
  - Multi-region for latency

## Why It Already Works

The worker is **stateless**:
- Reads job from Supabase (shared DB)
- Calls OpenRouter API (external)
- Writes results to Supabase (shared DB)
- Writes zip to Supabase Storage (shared)

No local state, no shared memory, no file conflicts. Run 1 or 200 copies — they all work independently.

The job queue is **conflict-free**:
```sql
UPDATE generation_jobs
SET status = 'running'
WHERE status = 'pending'
ORDER BY created_at ASC
LIMIT 1
RETURNING *;
```
PostgreSQL guarantees only one worker gets each job.

## Cost Projections

| Concurrent | Setup | Monthly Cost | Per Job |
|-----------|-------|-------------|---------|
| 5 | Local Mac | $0 | $0.12 API only |
| 15 | 3× Railway | $15 | $0.12 API + $0.01 compute |
| 50 | 10× Railway | $50 | $0.12 API + $0.01 compute |
| 200 | AWS Lambda | ~$20 | $0.12 API + $0.001 compute |
| 1000 | ECS Fargate | ~$100 | $0.12 API + $0.002 compute |

API cost ($0.12/app via Opus) dominates at all scales.

## Railway Deployment (Stage 2)

```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY worker/package.json worker/bun.lock ./
RUN bun install
COPY worker/ ./
ENV OPENROUTER_API_KEY=...
ENV SUPABASE_URL=...
ENV SUPABASE_SERVICE_KEY=...
ENV GEMINI_API_KEY=...
CMD ["bun", "run", "index.ts"]
```

```yaml
# railway.toml
[deploy]
healthcheckPath = "/health"
healthcheckTimeout = 10
restartPolicyType = "always"
numReplicas = 3
```

## AWS Lambda (Stage 3)

```
Supabase webhook (on INSERT to generation_jobs)
  → API Gateway
  → SQS Queue
  → Lambda Function (15 min timeout)
    → buildAppV2(jobId, input)
    → Updates Supabase with results
```

Lambda function is the same `buildAppV2()` code wrapped in a handler:
```typescript
export async function handler(event: SQSEvent) {
  const { jobId, input } = JSON.parse(event.Records[0].body);
  await buildAppV2(jobId, input);
}
```
