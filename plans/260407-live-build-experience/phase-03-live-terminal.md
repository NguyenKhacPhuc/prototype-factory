# Phase 3: Live Terminal Streaming During Build

**Status:** Planned
**Dependencies:** Phase 1, Phase 2

## Overview

Show users a real-time terminal view of what the LLM is doing — code being written, files created, commands run. Makes the 15-30 min build feel engaging instead of waiting on a progress bar.

## What Users See

```
┌─────────────────────────────────────────────────┐
│  Building SimpleNotes...    $0.28 | 12min       │
│                                                  │
│  ┌─ Live Output ───────────────────────────────┐ │
│  │                                              │ │
│  │ 📝 Writing src/screens/HomeScreen.tsx...     │ │
│  │                                              │ │
│  │ import { useState, useCallback } from 'react'│ │
│  │ import { View, FlatList, Pressable } from    │ │
│  │   'react-native';                            │ │
│  │ import { useTheme } from '../theme';         │ │
│  │ import { NoteCard } from '../components';    │ │
│  │                                              │ │
│  │ export function HomeScreen({ navigation }) { │ │
│  │   const { colors, spacing } = useTheme();    │ │
│  │   const [notes, setNotes] = useState([]);    │ │
│  │   █                                          │ │
│  │                                              │ │
│  └──────────────────────────────────────────────┘ │
│                                                  │
│  ┌─ Files ─────────────────────────────────────┐ │
│  │ ✅ specs/constitution.md           1.2KB     │ │
│  │ ✅ specs/design-tokens.json        3.4KB     │ │
│  │ ✅ package.json                    0.8KB     │ │
│  │ ✅ src/theme/tokens.ts             2.1KB     │ │
│  │ 🔄 src/screens/HomeScreen.tsx    writing...  │ │
│  │ ⏳ src/screens/NoteEditor.tsx      pending   │ │
│  │ ⏳ src/screens/Settings.tsx        pending   │ │
│  └──────────────────────────────────────────────┘ │
│                                                  │
│  Stage 3: Implementing  ████████░░░░ 6/10       │
└─────────────────────────────────────────────────┘
```

## Implementation

### Database Changes

```sql
alter table generation_jobs add column live_output text default '';
alter table generation_jobs add column files_created jsonb default '[]';
alter table generation_jobs add column current_file text default '';
```

### Worker Updates

After each tool use:
```typescript
// On file write
await supabase.from('generation_jobs').update({
  current_file: filePath,
  files_created: [...existing, { path: filePath, status: 'done', size: content.length }],
}).eq('id', jobId);

// On LLM text output (last 2KB to avoid bloating the row)
await supabase.from('generation_jobs').update({
  live_output: textChunk.slice(-2000),
}).eq('id', jobId);
```

### Frontend: Build Page (/build/:jobId)

```typescript
// Subscribe to live updates
supabase.channel(`build-${jobId}`)
  .on('postgres_changes', {
    event: 'UPDATE',
    table: 'generation_jobs',
    filter: `id=eq.${jobId}`,
  }, (payload) => {
    setLiveOutput(payload.new.live_output);
    setFiles(payload.new.files_created);
    setCurrentFile(payload.new.current_file);
    setProgress(payload.new.progress);
    setCost(payload.new.estimated_cost_cents);
  })
  .subscribe();
```

### Streaming vs Polling

Two options:
1. **Supabase Realtime** (current approach) — update row, frontend subscribes. ~500ms latency. Simple.
2. **True streaming** — WebSocket from worker to frontend. Sub-100ms latency. Complex.

Start with Supabase Realtime (option 1). Upgrade to streaming later if users want faster.

## Tasks

- [ ] Add live_output, files_created, current_file columns to generation_jobs
- [ ] Worker: update files_created after each write_file tool
- [ ] Worker: update live_output with latest LLM text
- [ ] Worker: update current_file when starting a new file
- [ ] Create /build/:jobId page with live terminal component
- [ ] Live terminal: auto-scroll, syntax highlighting (optional)
- [ ] File tree component: shows status per file
- [ ] Cost + time display
- [ ] Route: after design approval → /build/:jobId
- [ ] Handle build completion: show "Test on Device" + download
