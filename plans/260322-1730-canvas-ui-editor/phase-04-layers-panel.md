# Phase 4: Layers Panel

## Priority: Medium
## Status: Not started

## Overview
Left sidebar showing the design tree as a collapsible layer hierarchy (like Figma's layers panel). Clicking a layer selects the element on canvas.

## Key Insights
- design-tree.json is already a recursive tree of DesignNodes
- Each node has `name` and `type` — good enough for layer labels
- Screens are top-level entries in `tree.screens[]`

## Requirements

### Functional
- Collapsible tree showing all nodes
- Icons per node type (frame, text, svg, image)
- Click layer -> select on canvas + show in inspector
- Selected layer highlighted in panel
- Hover layer -> hover highlight on canvas
- Collapse/expand with arrow toggle
- Screen-level grouping (each screen is a top-level group)

### Non-functional
- Panel width ~240px, resizable
- Collapsible panel (toggle visibility)
- Virtualized rendering for large trees (optional, optimize later)

## Related Code Files
- New: `src/components/canvas-layers-panel.tsx`
- `src/pages/canvas.tsx` — modify to add left panel

## Implementation Steps
1. Create `src/components/canvas-layers-panel.tsx` (~130 lines)
   - Recursive tree renderer
   - Indent levels, expand/collapse toggles
   - Node type icons
   - Click/hover handlers
2. Integrate with selection state from Phase 3
3. Add panel toggle button in top bar

## Todo
- [ ] Build layers panel with recursive tree
- [ ] Wire to selection state
- [ ] Add panel toggle
- [ ] Test with deep nested trees

## Success Criteria
- Layer tree reflects design-tree structure
- Clicking a layer selects the element
- Hovering a layer highlights the element on canvas
