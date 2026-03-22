# Phase 1: Canvas Viewport

## Priority: High
## Status: Not started

## Overview
Replace the static template cards with a real pannable, zoomable canvas that can host rendered content. This is the foundation everything else builds on.

## Key Insights
- The canvas needs to handle pan (drag) and zoom (scroll wheel / pinch) like Figma
- Content renders inside the canvas coordinate space
- The dotted grid should move with pan/zoom to maintain spatial context
- Need a transform state: `{ x, y, scale }` applied via CSS transform

## Requirements

### Functional
- Pan canvas by dragging with middle mouse / space+drag / two-finger trackpad
- Zoom in/out with scroll wheel or pinch, centered on cursor
- Zoom controls in bottom-right (zoom %, fit to screen, +/-)
- Reset view button (zoom to fit all content)
- Grid background moves with transform

### Non-functional
- Smooth 60fps panning and zooming
- No external dependencies (pure React + CSS transforms)

## Related Code Files
- `src/pages/canvas.tsx` — modify (replace template cards with viewport)

## Implementation Steps
1. Create `src/components/canvas-viewport.tsx` (~150 lines)
   - State: `{ panX, panY, scale }`
   - Mouse/wheel event handlers for pan and zoom
   - Render children inside a `transform: translate(x,y) scale(s)` wrapper
   - Dotted grid as CSS background that scales with transform
2. Create `src/components/canvas-zoom-controls.tsx` (~60 lines)
   - Zoom percentage display
   - +/- buttons, fit-to-screen button
3. Update `canvas.tsx` to use `<CanvasViewport>` instead of static cards

## Todo
- [ ] Build CanvasViewport component with pan/zoom
- [ ] Build ZoomControls component
- [ ] Integrate into canvas.tsx
- [ ] Test pan/zoom on trackpad and mouse

## Success Criteria
- Canvas pans smoothly with drag
- Canvas zooms centered on cursor
- Grid stays aligned during transforms
- Zoom controls work correctly
