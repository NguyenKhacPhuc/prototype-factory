# Phase 2: Prototype Worker

**Priority:** High
**Status:** Planned
**Dependencies:** Phase 1

## Overview

Replace `claude -p` CLI with Claude Agent SDK for prototype generation. Runs as a worker polling the Supabase job queue.

## Architecture

```
Worker Process (Railway or local)
    │
    ├── Poll generation_jobs where type='prototype' and status='pending'
    │
    ├── For each job:
    │   ├── Step 1: Scout trends (Gemini, cached daily)
    │   ├── Step 2: Generate idea (Gemini)
    │   ├── Step 3: Design system (UI/UX Pro Max Python script)
    │   ├── Step 4: Generate App.tsx (Claude Agent SDK, Opus)
    │   ├── Step 5: Validate (Puppeteer)
    │   ├── Step 6: Git push + deploy
    │   └── Update job status at each step
    │
    └── Report completion/failure
```

## Claude Agent SDK Usage

```typescript
import { ClaudeAgent } from '@anthropic-ai/claude-agent-sdk';

const agent = new ClaudeAgent({
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-opus-4-6',
  permissionMode: 'acceptEdits',
  tools: ['Write', 'Read'],
});

const result = await agent.run({
  prompt: claudePrompt,  // same prompt as generate-prototype.sh
  workingDirectory: targetDir,
});
```

## No Skills Needed

The prototype pipeline uses NO skills inside Claude:
- UI/UX Pro Max → Python script, runs before Claude
- Gemini → API calls, runs before Claude
- Claude just receives a plain text prompt and writes files

## Mock Mode

```typescript
// For testing without API costs
if (process.env.MOCK_MODE === 'true') {
  // Copy a template App.tsx instead of calling Claude
  // Simulate 30s delay
  // Return success
}
```

## File Structure

```
worker/
├── index.ts              # Entry point, job poller
├── prototype-worker.ts   # Prototype generation pipeline
├── claude-client.ts      # Agent SDK wrapper with mock mode
├── pipeline-logger.ts    # Logging
├── tests/
│   ├── prototype-worker.test.ts
│   └── mock-responses/
└── package.json
```

## Success Criteria

- [ ] Worker polls and picks up prototype jobs
- [ ] Claude Agent SDK generates App.tsx equivalent to CLI output
- [ ] Progress updates visible via Supabase Realtime
- [ ] Mock mode works for free testing
- [ ] Validate + screenshot still work
- [ ] Cost per prototype: ~$0.66 (Opus)
