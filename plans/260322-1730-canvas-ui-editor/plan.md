# Canvas UI Editor

## Vision
Transform `/canvas` into a UI editor where AI-generated prototypes render as live HTML on a pannable canvas. Users can interact with, inspect, and export designs to Figma.

## Core Approach
**HTML is the source of truth.** Prototypes render as real HTML in iframes — no SVG rendering mode needed. The existing `design-tree.json` (already extracted from each prototype's HTML) powers Figma export via the existing pipeline.

```
Prototype HTML (iframe on canvas)  -->  User sees real interactive app
design-tree.json (pre-extracted)   -->  Figma export pipeline (existing)
```

## Current State
- `/create`: prompt input -> navigates to `/canvas`
- `/canvas`: placeholder editor shell with Coming Soon modal
- `design-tree-to-svg.ts`: converts design-tree -> SVG
- `design-tree-to-figma-clipboard.ts`: copies SVG as Figma-pasteable clipboard
- Each prototype: `App.tsx`, `preview.html`, `design-tree.json`, `screenshot.png`

## Phases

| # | Phase | Priority | Status |
|---|-------|----------|--------|
| 1 | [Canvas Viewport](phase-01-canvas-viewport.md) | High | Not started |
| 2 | [Prototype Renderer (HTML iframe)](phase-02-prototype-renderer.md) | High | Not started |
| 3 | [Selection & Inspector (DOM inspect via postMessage)](phase-03-selection-and-inspector.md) | Medium | Not started |
| 4 | [Layers Panel](phase-04-layers-panel.md) | Medium | Not started |
| 5 | [Figma Export (design-tree -> clipboard)](phase-05-figma-export.md) | High | Not started |
| 6 | [AI Prompt Integration](phase-06-ai-prompt-integration.md) | Low | Blocked |

## Recommended Build Order
1. **Phase 1 + 2** together — get HTML prototypes rendering on a pannable canvas
2. **Phase 5** — wire Figma export (mostly done, just UI)
3. **Phase 4** — layers panel for navigation
4. **Phase 3** — inspector for power users
5. **Phase 6** — when AI backend is ready

## Key Dependencies
- Existing `design-tree.json` per prototype
- Existing `copyFigmaClipboard()` utility
- Prototype `preview.html` files served by dev server
