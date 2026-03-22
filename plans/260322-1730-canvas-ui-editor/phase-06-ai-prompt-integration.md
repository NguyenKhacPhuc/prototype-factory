# Phase 6: AI Prompt Integration

## Priority: Low (blocked until AI generation is live)
## Status: Not started

## Overview
The bottom prompt bar will eventually send prompts to an AI backend that generates or modifies prototypes. Until then, it shows the Coming Soon modal.

## Key Insights
- The prompt bar is already built in canvas.tsx
- Future flow: user types "change the header color to blue" -> AI modifies design-tree -> canvas re-renders
- Two modes of AI interaction:
  1. **Generate**: Create a new prototype from a text description (from /create page)
  2. **Modify**: Change existing prototype based on instruction (from canvas prompt bar)
- Generated output = design-tree.json + App.tsx

## Future Architecture
```
User prompt
  -> API call to AI backend
  -> Returns modified design-tree.json
  -> Canvas re-renders with new tree
  -> Diff shown (before/after toggle)
```

## Requirements (future)

### Functional
- Send prompt + current design tree to AI backend
- Receive modified design tree
- Apply changes with undo support
- Show what changed (highlight modified nodes)
- Chat history in left panel (below layers)

### Non-functional
- Streaming response for progress indication
- Undo/redo stack for AI modifications

## Current State
- Prompt bar triggers Coming Soon modal
- No backend API exists yet

## Todo
- [ ] Design API contract for AI generation endpoint
- [ ] Design API contract for AI modification endpoint
- [ ] Build undo/redo state management
- [ ] Implement prompt -> API -> re-render flow
- [ ] Add change highlighting

## Success Criteria
- User can describe changes in natural language
- AI modifies the design tree correctly
- Changes are visible immediately on canvas
- User can undo AI changes
