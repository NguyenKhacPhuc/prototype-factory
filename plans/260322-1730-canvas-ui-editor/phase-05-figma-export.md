# Phase 5: Figma Export

## Priority: High
## Status: Not started

## Overview
Wire the "Export" button to copy the prototype to Figma clipboard format. Uses the existing `design-tree.json` (already extracted from HTML) and the existing `copyFigmaClipboard()` utility. Mostly UI wiring.

## Key Insights
- `design-tree.json` is already generated for every prototype alongside the HTML
- `copyFigmaClipboard(tree)` already converts design-tree -> SVG -> HTML clipboard
- Figma accepts pasted SVG and converts it to editable vector nodes
- Pipeline is: `design-tree.json` -> `designTreeToSvg()` -> clipboard HTML -> paste in Figma
- This is 90% done — just needs a button and a toast

## Data Flow
```
User clicks "Export to Figma"
  -> fetch design-tree.json (already loaded for the prototype)
  -> copyFigmaClipboard(designTree)
  -> clipboard now has Figma-compatible HTML
  -> user pastes in Figma (Cmd+V)
  -> Figma creates editable vector frames
```

## Requirements

### Functional
- Export dropdown in top bar with options:
  - **Copy to Figma** — copies to clipboard, shows "Copied! Paste in Figma" toast
  - **Download SVG** — saves SVG file
  - **Download PNG** — renders to canvas, saves as PNG
- Export all screens or individual screen

### Non-functional
- Clipboard API needs user gesture (satisfied by button click)
- PNG export via offscreen canvas rendering

## Related Code Files
- `src/lib/design-tree-to-figma-clipboard.ts` — reuse as-is
- `src/lib/design-tree-to-svg.ts` — reuse as-is
- `src/pages/canvas.tsx` — modify export button
- New: `src/components/canvas-export-menu.tsx`

## Implementation Steps
1. Create `src/components/canvas-export-menu.tsx` (~80 lines)
   - Dropdown menu anchored to "Export" button
   - Three options: Copy to Figma, Download SVG, Download PNG
   - Toast notification component (auto-dismiss after 3s)
2. Wire design-tree state from canvas.tsx to export menu
3. Implement SVG download: `designTreeToSvg()` -> Blob -> download link
4. Implement PNG download: render SVG to Image -> canvas -> toBlob -> download

## Todo
- [ ] Build export dropdown menu
- [ ] Wire Copy to Figma (existing `copyFigmaClipboard`)
- [ ] Add SVG download
- [ ] Add PNG download
- [ ] Add toast notification
- [ ] Test Figma paste with multiple prototypes

## Success Criteria
- Copy to Figma works — paste creates editable nodes in Figma
- SVG download is valid and matches the prototype layout
- PNG download is clean raster at correct resolution
- Toast confirms action to user
