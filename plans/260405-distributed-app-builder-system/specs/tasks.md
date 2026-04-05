# Tasks Breakdown

## Legend
- `[ ]` Pending
- `[~]` In Progress
- `[x]` Complete
- `[!]` Blocked
- **Deps:** tasks that must complete first
- **Est:** estimated effort (S=small <1hr, M=medium 1-3hr, L=large 3-8hr, XL=8hr+)

---

## Phase 1: Supabase Job Queue

### P1.1 — Create generation_jobs table
- [ ] Write SQL migration for generation_jobs table with all fields
- [ ] Add `source` field ('user' | 'batch') per Gap G-03
- [ ] Create index on (status, created_at) for worker polling
- [ ] Enable RLS: users see own jobs only
- [ ] Run migration on Supabase
- **Deps:** none
- **Est:** S

### P1.2 — Create cost_reconciliation table
- [ ] Write SQL migration
- [ ] Run migration
- **Deps:** P1.1
- **Est:** S

### P1.3 — Create increment_job_tokens RPC function
- [ ] Write PL/pgSQL function for atomic token updates
- [ ] Test with sample data
- **Deps:** P1.1
- **Est:** S

### P1.4 — Enable Realtime on generation_jobs
- [ ] Add table to supabase_realtime publication
- [ ] Test: insert a row, subscribe from browser, see update
- **Deps:** P1.1
- **Est:** S

### P1.5 — Create Supabase Storage bucket for pipeline logs
- [ ] Create `pipeline-logs` bucket
- [ ] Create `builds` bucket (for mobile app source zips)
- [ ] Set RLS: users can read own logs, workers can write
- **Deps:** none
- **Est:** S

**Phase 1 total: ~3 hours**

---

## Phase 2: Prototype Worker

### P2.1 — Worker project setup
- [ ] Create `worker/` directory with package.json, tsconfig
- [ ] Add dependencies: @anthropic-ai/claude-agent-sdk, @supabase/supabase-js, puppeteer
- [ ] Create entry point worker/index.ts
- **Deps:** none
- **Est:** S

### P2.2 — Claude client wrapper with mock mode
- [ ] Create worker/claude-client.ts
- [ ] Implement real mode: Agent SDK call with Write tool
- [ ] Implement mock mode: return canned App.tsx from template
- [ ] Unit tests for both modes
- **Deps:** P2.1
- **Est:** M

### P2.3 — Job poller
- [ ] Create worker/job-poller.ts
- [ ] Subscribe to generation_jobs where status='pending' AND type='prototype'
- [ ] Pick up job, set status='running', set started_at
- [ ] On completion, set status='completed', result, completed_at, duration_ms
- [ ] On error, set status='failed', error message
- [ ] Handle concurrent polling (optimistic lock: UPDATE ... WHERE status='pending' RETURNING *)
- **Deps:** P1.1, P2.1
- **Est:** M

### P2.4 — Prototype generation pipeline
- [ ] Port scout-trends.sh logic to TypeScript (Gemini API call)
- [ ] Port openai-idea.sh logic to TypeScript (Gemini API call)
- [ ] Port UI/UX Pro Max call (spawn python3 subprocess)
- [ ] Claude Agent SDK call with prototype prompt
- [ ] Parse output: extract App.tsx, design-spec.json
- [ ] Update progress at each step (1/6 → 6/6)
- **Deps:** P2.2, P2.3
- **Est:** L

### P2.5 — Validation & screenshot
- [ ] Port validate-prototype.sh logic (Puppeteer headless check)
- [ ] Port capture-screenshot.sh logic
- [ ] Handle validation failure: mark job as failed with error details
- **Deps:** P2.4
- **Est:** M

### P2.6 — Git push & deploy
- [ ] Write prototype files to prototypes/{folder}/
- [ ] Git add, commit, push (needs GITHUB_TOKEN env var — Gap G-01)
- [ ] Rebuild manifest
- [ ] Trigger Vercel redeploy (or rely on git push hook)
- **Deps:** P2.5
- **Est:** M

### P2.7 — Pipeline logger
- [ ] Create worker/pipeline-logger.ts
- [ ] Log every API call: model, tokens, cached, duration
- [ ] Log every tool use: file writes, commands
- [ ] Save to Supabase Storage on job completion
- [ ] Calculate and update estimated_cost_cents on job
- **Deps:** P1.3, P1.5, P2.4
- **Est:** M

### P2.8 — Integration test
- [ ] End-to-end test: create job → worker picks up → prototype generated → job completed
- [ ] Test with mock mode ($0 cost)
- [ ] Test with real Claude API (~$0.66)
- [ ] Verify Realtime progress updates
- **Deps:** P2.4, P2.5, P2.6, P2.7
- **Est:** M

**Phase 2 total: ~15-20 hours**

---

## Phase 3: Create Page

### P3.1 — Remove Coming Soon modal
- [ ] Delete src/pages/create-coming-soon-modal.tsx
- [ ] Remove import and usage from create.tsx
- **Deps:** none
- **Est:** S

### P3.2 — Auth gate on generate
- [ ] Check if user is logged in before creating job
- [ ] If not → redirect to /auth with return URL
- [ ] After auth → return to /create with prompt preserved
- **Deps:** none
- **Est:** S

### P3.3 — Job creation from Create page
- [ ] On "Generate" click → POST to Supabase (insert generation_jobs)
- [ ] Pass prompt, type='prototype', user_id from auth
- [ ] Handle errors (rate limit, auth, network)
- **Deps:** P1.1, P3.1, P3.2
- **Est:** S

### P3.4 — Generation progress component
- [ ] Create src/pages/generation-progress.tsx
- [ ] Subscribe to Supabase Realtime for job updates
- [ ] Show: step number, progress bar, step message, elapsed time
- [ ] On completed → navigate to /prototype/{folder}
- [ ] On failed → show error + retry button
- [ ] On close/navigate away → job continues in background
- **Deps:** P1.4, P3.3
- **Est:** M

### P3.5 — Rate limiting
- [ ] Check active jobs count before creating new job
- [ ] Limit: 3 active jobs per user (Gap G-07)
- [ ] Show "You have X active jobs" message if limit hit
- **Deps:** P3.3
- **Est:** S

### P3.6 — Frontend integration test
- [ ] Test: type prompt → click generate → see progress → see prototype
- [ ] Test: not logged in → redirects to auth
- [ ] Test: rate limit → shows message
- [ ] Test: generation fails → shows error + retry
- **Deps:** P3.4, P3.5, P2.8
- **Est:** M

**Phase 3 total: ~6-8 hours**

---

## Phase 4: Skill Router + Session Manager

### P4.1 — Skill registry
- [ ] Create worker/skill-router.ts
- [ ] Load all 11 SKILL.md files from mobile-app-agent-system
- [ ] Store as Map<name, {content, tokens, tags}>
- [ ] Unit test: verify all skills loaded, token counts correct
- **Deps:** none
- **Est:** S

### P4.2 — Routing rules
- [ ] Implement resolve(stage, step, taskReqs) → minimal skill set
- [ ] Stage 0: [mobile-app]
- [ ] Stage 1: [mobile-app-design-pro, app-design-preview]
- [ ] Stage 2: [mobile-init, {framework}]
- [ ] Stage 3: [{framework}] + task-specific skills
- [ ] Stage 4: [mobile-build, mobile-web]
- [ ] Unit tests for every stage/step combination
- **Deps:** P4.1
- **Est:** M

### P4.3 — Prompt cache integration
- [ ] buildSystemMessage() wraps skill text with cache_control: {type: "ephemeral"}
- [ ] Verify cache hits via response.usage.cache_read_input_tokens
- [ ] Log cache hit/miss ratio per job
- **Deps:** P4.2
- **Est:** S

### P4.4 — Model router
- [ ] Implement isCreativeTask(stage, step) → 'opus' | 'sonnet'
- [ ] Opus: stages 0, 1, stage 3 implement step
- [ ] Sonnet: stage 2, stage 3 test/review, stage 4
- [ ] Unit tests
- **Deps:** none
- **Est:** S

### P4.5 — Session manager
- [ ] Create worker/session-manager.ts
- [ ] Maintain message history across calls within a stage
- [ ] Reset history between stages (to avoid context overflow)
- [ ] Handle tool calls (Write, Read, Edit, Bash)
- [ ] Implement tool execution: file operations on worker filesystem
- [ ] Handle tool call loops (Claude requests tool → we execute → send result → Claude continues)
- **Deps:** P4.2, P4.3, P4.4
- **Est:** L

### P4.6 — Integration test
- [ ] Run Stage 0 (ideation) with real API: verify correct skills loaded, cache works
- [ ] Run Stage 1 (design) with real API: verify different skills, new cache
- [ ] Verify cost: should be ~60-70% cheaper than loading all skills
- **Deps:** P4.5
- **Est:** M

**Phase 4 total: ~12-15 hours**

---

## Phase 5: Mobile App Worker

### P5.1 — Mobile app pipeline orchestrator
- [ ] Create worker/mobile-app-worker.ts
- [ ] Implement 4-stage pipeline using Session Manager + Skill Router
- [ ] Stage transitions: clear message history, switch skills
- [ ] Progress reporting per stage and per task
- **Deps:** P4.5
- **Est:** L

### P5.2 — Checkpoint & resume
- [ ] Save checkpoint to Supabase Storage after each stage
- [ ] Save: stage, step, completed tasks, message snapshot
- [ ] On worker restart: check for existing checkpoint, resume
- [ ] Test: simulate crash mid-Stage 3, verify resume works
- **Deps:** P5.1, P1.5
- **Est:** L

### P5.3 — Output packaging
- [ ] Zip completed source code
- [ ] Upload to Supabase Storage (builds/{job-id}.zip)
- [ ] Generate download URL in job result
- [ ] Gap G-08: provide download link on frontend
- **Deps:** P5.1
- **Est:** M

### P5.4 — Railway deployment config
- [ ] Create Dockerfile for worker
- [ ] Include: bun, puppeteer, python3, git
- [ ] Environment variables: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY, GITHUB_TOKEN
- [ ] Health check endpoint on :8080
- [ ] Railway.toml with scaling config
- **Deps:** P5.1
- **Est:** M

### P5.5 — End-to-end test
- [ ] Create mobile-app job → worker picks up → all 4 stages → output zip
- [ ] Test with simple app (10 tasks, ~$12)
- [ ] Verify checkpoint/resume
- [ ] Verify cost tracking accuracy
- **Deps:** P5.1, P5.2, P5.3, P5.4
- **Est:** L

**Phase 5 total: ~20-25 hours**

---

## Phase 6: Complexity & Pricing

### P6.1 — Gemini complexity estimator
- [ ] Create worker/complexity-estimator.ts
- [ ] Score 7 dimensions via Gemini API
- [ ] Return: tier, weighted_score, task_count, integrations
- [ ] Test with 10 different app ideas, verify reasonable scores
- **Deps:** none
- **Est:** M

### P6.2 — Pricing engine
- [ ] Create worker/pricing-engine.ts
- [ ] Map tier → price (static table)
- [ ] Return: price_cents, tier, breakdown
- **Deps:** P6.1
- **Est:** S

### P6.3 — API endpoint: estimate-complexity
- [ ] Create Supabase Edge Function or add to worker API
- [ ] POST /api/estimate-complexity → returns tier + price
- [ ] <3 second response time
- **Deps:** P6.1, P6.2
- **Est:** S

### P6.4 — Frontend: price confirmation UI
- [ ] Show complexity breakdown + price before "Build App" starts
- [ ] User must click "Confirm $XX" to create the job
- [ ] Show: tier, estimated screens, task count, integrations detected
- **Deps:** P6.3
- **Est:** M

### P6.5 — Payment integration (Stripe)
- [ ] Create Stripe checkout session for mobile app builds
- [ ] Webhook: on payment success → create generation_job
- [ ] Prototypes are free (or $5 for priority)
- [ ] Gap G-04 resolved
- **Deps:** P6.4
- **Est:** L

### P6.6 — Post-build cost reconciliation
- [ ] After job completes: compare actual cost vs quoted price
- [ ] Insert into cost_reconciliation table
- [ ] Alert if margin < 0 (we're losing money)
- **Deps:** P1.2, P5.1
- **Est:** S

**Phase 6 total: ~10-12 hours**

---

## Phase 7: Observability

### P7.1 — Pipeline logger finalization
- [ ] Ensure all API calls logged with tokens, model, cache status
- [ ] JSONL format, uploaded to Supabase Storage
- **Deps:** P2.7
- **Est:** S

### P7.2 — Daily cost summary view
- [ ] Create SQL view: daily_costs (jobs, total_cost, avg_cost, by type)
- **Deps:** P1.1
- **Est:** S

### P7.3 — Admin dashboard page
- [ ] Create /admin/jobs page (protected: admin users only)
- [ ] Show: today's stats, active jobs, recent jobs table
- [ ] Click job → full detail with pipeline log + cost breakdown
- **Deps:** P7.1, P7.2
- **Est:** L

### P7.4 — Worker health endpoint
- [ ] GET /health → uptime, active jobs, queue depth, memory
- [ ] Railway monitoring integration
- **Deps:** P2.1
- **Est:** S

### P7.5 — Budget alerts
- [ ] Check daily spend after each job completes
- [ ] If daily spend > threshold → pause workers, notify admin
- [ ] Configurable thresholds via env vars
- **Deps:** P7.2
- **Est:** M

**Phase 7 total: ~8-10 hours**

---

## Dependency Graph

```
P1.1 ──┬── P1.2
       ├── P1.3
       ├── P1.4
       ├── P2.3 ── P2.4 ── P2.5 ── P2.6 ── P2.8
       │          P2.7 ──────────────────────┘
       └── P3.3 ── P3.4 ── P3.5 ── P3.6

P2.1 ── P2.2 ── P2.4

P4.1 ── P4.2 ── P4.3 ── P4.5 ── P4.6
P4.4 ──────────────────┘

P4.5 ── P5.1 ──┬── P5.2 ── P5.5
               ├── P5.3 ──┘
               └── P5.4 ──┘

P6.1 ── P6.2 ── P6.3 ── P6.4 ── P6.5
P5.1 ── P6.6

P2.7 ── P7.1
P1.1 ── P7.2 ── P7.3
P2.1 ── P7.4
P7.2 ── P7.5
```

## Critical Path

```
P1.1 → P2.3 → P2.4 → P2.5 → P2.6 → P2.8 → P3.3 → P3.4 → P3.6
                                                              │
Minimum to launch "Create" page: ────────────────────────────┘

Total critical path: ~30-35 hours of work
```

## Parallel Tracks (after P1.1)

```
Track A: P2.1 → P2.2 → P2.4 (prototype worker core)
Track B: P3.1 → P3.2 (frontend cleanup)
Track C: P4.1 → P4.2 (skill router — can start early)
Track D: P6.1 (complexity estimator — independent)
Track E: P1.5, P7.4 (storage + health — independent)
```

## Estimated Total Effort

| Phase | Hours | Priority |
|-------|-------|----------|
| Phase 1: Job Queue | 3 | High |
| Phase 2: Prototype Worker | 15-20 | High |
| Phase 3: Create Page | 6-8 | High |
| Phase 4: Skill Router | 12-15 | Medium |
| Phase 5: Mobile App Worker | 20-25 | Medium |
| Phase 6: Pricing | 10-12 | Medium |
| Phase 7: Observability | 8-10 | Low |
| **Total** | **~75-95 hours** | |

MVP (Phases 1-3, prototype generation only): **~25-30 hours**
Full system (all phases): **~75-95 hours**
