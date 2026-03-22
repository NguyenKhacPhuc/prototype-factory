# Phase 2: Prototype Renderer

## Priority: High
## Status: Not started

## Overview
Render AI-generated prototypes as live HTML on the canvas using iframes. Each prototype's screens display as iframe frames on the pannable canvas. The existing `design-tree.json` (already extracted from the HTML) is used solely for Figma export — not for rendering.

## Key Insights
- Each prototype already has `preview.html` (bundled interactive app) and per-screen HTML
- Rendering via iframe = what you see IS the real app, zero fidelity loss
- No need for SVG rendering mode — HTML is the source of truth
- `design-tree.json` already exists for each prototype, extracted from the same HTML
- Export pipeline: `design-tree.json` -> `designTreeToSvg()` -> `copyFigmaClipboard()` (already built)
- For future live DOM inspection, we can use `postMessage` to communicate with iframe

## Data Flow
```
Prototype folder
  |
  +-- preview.html -----> iframe on canvas (what user sees)
  +-- design-tree.json -> Figma export pipeline (existing code)
  +-- App.tsx ----------> source code (future: editable)
```

## Requirements

### Functional
- Load a prototype by folder name (e.g. `2026-03-22-moodforge`)
- Render prototype in iframe at 375x812 (mobile viewport)
- Frame chrome: app name label above, device frame outline
- Navigation between prototype screens within the iframe (already works — it's the real app)
- Multiple prototypes can be placed on canvas side-by-side

### Non-functional
- iframe sandboxed (`allow-scripts allow-same-origin`)
- Lazy load iframe content when scrolled into canvas view

## Related Code Files
- `src/pages/canvas.tsx` — modify
- `src/components/canvas-viewport.tsx` — from Phase 1
- New: `src/components/canvas-frame.tsx`
- Server: `dev.ts` — may need to serve prototype files

## Implementation Steps
1. Create `src/components/canvas-frame.tsx` (~100 lines)
   - Props: `folder: string`, `appName: string`
   - Renders iframe pointing to `/prototypes/{folder}/preview.html`
   - Device frame wrapper (375x812 with phone-like border radius)
   - Label showing app name above frame
   - Loading state while iframe loads
2. Update `canvas.tsx`:
   - Accept prototype folder via URL param (`/canvas?proto=moodforge`)
   - Fetch prototype metadata (appName, folder)
   - Render `<CanvasFrame>` inside `<CanvasViewport>`
3. Update `/create` page to pass prototype folder when navigating:
   - `navigate("/canvas?proto=moodforge")`
   - Or for "Coming Soon" mode: navigate to `/canvas` with no param (shows empty canvas + modal)

## Todo
- [ ] Build CanvasFrame component (iframe + device frame chrome)
- [ ] Add prototype metadata fetching
- [ ] Wire prototype loading from URL param
- [ ] Test iframe rendering with existing prototypes

## Success Criteria
- Prototype renders as interactive HTML inside iframe on canvas
- User can interact with the app (tap buttons, navigate screens)
- Frame has clean device outline and app name label
- Canvas pan/zoom works correctly around the iframe
