# Phase 3: Selection & Inspector

## Priority: Medium
## Status: Not started

## Overview
Allow users to inspect elements in the live HTML prototype. Inject a small script into the iframe that communicates element info back to the parent canvas via `postMessage`.

## Key Insights
- Since we render real HTML in an iframe, we can inject an inspector script
- Inspector script listens for hover/click, reads `getBoundingClientRect()` + `getComputedStyle()`, sends data to parent
- Parent draws selection overlays on top of the iframe
- No need for SVG mode — we inspect the real DOM directly
- This is how browser DevTools work, but simplified for design properties

## Data Flow
```
User hovers/clicks element in iframe
  -> injected script captures element info
  -> postMessage to parent: { type, tagName, rect, computedStyles }
  -> parent draws overlay + populates inspector panel
```

## Requirements

### Functional
- Hover highlight: blue outline on hovered element (drawn by parent overlay)
- Click select: show properties in right inspector panel
- Inspector shows: position, size, colors, typography, spacing, border
- "Inspect mode" toggle (so normal clicks still work for app interaction)

### Non-functional
- Inspector script < 3KB injected into iframe
- No interference with prototype's own JS when inspect mode is off

## Related Code Files
- New: `src/components/canvas-inspector.tsx` (right panel)
- New: `src/components/canvas-selection-overlay.tsx` (overlay on top of iframe)
- New: `src/lib/iframe-inspector-script.ts` (script injected into iframe)
- `src/pages/canvas.tsx` — modify to add panels

## Implementation Steps
1. Create `src/lib/iframe-inspector-script.ts` (~80 lines)
   - Inject into iframe via `srcdoc` wrapper or `contentWindow.eval`
   - Listen for mousemove/click, extract element info
   - postMessage to parent with element rect + computed styles
2. Create `src/components/canvas-selection-overlay.tsx` (~60 lines)
   - Absolute-positioned div over iframe
   - Draws highlight rectangles based on postMessage data
   - Accounts for canvas zoom/pan transform
3. Create `src/components/canvas-inspector.tsx` (~150 lines)
   - Property groups: Layout, Fill, Border, Typography, Spacing
   - Read-only for now (display computed styles)
4. Add "Inspect" toggle button in toolbar

## Todo
- [ ] Build iframe inspector injection script
- [ ] Build selection overlay component
- [ ] Build inspector panel
- [ ] Add inspect mode toggle
- [ ] Test with various prototypes

## Success Criteria
- In inspect mode, hovering shows element boundaries
- Clicking shows computed properties in inspector panel
- Works correctly with canvas zoom/pan
- Does not break prototype interaction when inspect mode is off
