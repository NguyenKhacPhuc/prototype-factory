# Phase 3: Wire Up Create Page

**Priority:** High
**Status:** Planned
**Dependencies:** Phase 1, Phase 2

## Overview

Replace the "Coming Soon" modal with real generation. User types an idea, sees live progress, gets a working prototype.

## Changes

### Remove
- `src/pages/create-coming-soon-modal.tsx` — delete entirely

### Modify
- `src/pages/create.tsx` — replace `ComingSoonModal` with job creation + progress

### Add
- `src/pages/generation-progress.tsx` — live progress bar component

## User Flow

```
1. User types prompt
2. Clicks "Generate Prototype"
3. If not logged in → redirect to auth
4. INSERT into generation_jobs
5. Show GenerationProgress component
6. Subscribe to Supabase Realtime for this job
7. Progress bar updates: 1/6 → 2/6 → ... → 6/6
8. On completion → navigate to /prototype/{folder}
9. On error → show error + retry button
```

## GenerationProgress Component

```typescript
interface Props {
  jobId: string;
  onComplete: (folder: string) => void;
}

function GenerationProgress({ jobId, onComplete }: Props) {
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Subscribe to realtime updates
    const channel = supabase
      .channel(`job-${jobId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'generation_jobs',
        filter: `id=eq.${jobId}`
      }, (payload) => {
        setJob(payload.new);
        if (payload.new.status === 'completed') {
          onComplete(payload.new.result.folder);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [jobId]);

  // Render progress bar + step messages
}
```

## Progress Messages

```
Step 1/6: Scouting trends and market context...
Step 2/6: Generating your app concept...
Step 3/6: Designing the visual system...
Step 4/6: Building your interactive prototype...
Step 5/6: Validating and testing...
Step 6/6: Deploying to preview...
```

## Success Criteria

- [ ] "Coming Soon" modal removed
- [ ] Clicking "Generate" creates a real job
- [ ] Auth required before generation
- [ ] Live progress bar works
- [ ] Navigates to prototype on completion
- [ ] Error handling with retry
- [ ] Rate limiting (max 3 active jobs per user)
