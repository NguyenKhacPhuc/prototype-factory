# Studio + Canvas Editor — Unified Design Experience

**Created:** 2026-04-12
**Status:** Planning
**Goal:** Let users visually customize their prototype's design before building, combining the Style Studio and Canvas Editor into one flow.

## Current State

**Canvas Editor (/canvas):**
- Pan/zoom viewport with screen frames
- Layers panel (hierarchical node tree)
- Inspector panel (edit node styles, colors, text, dimensions)
- Loads design-tree.json from prototypes
- Read-only for layout, editable for styles

**Style Studio (/styles):**
- 67 design styles with color palettes
- Font pairings
- Live mini-preview
- "Use This Style" button → /create

**Both exist but are disconnected from each other and from the build pipeline.**

## Unified Flow

```
/prototype/:slug → "Customize" → /canvas?proto=slug
    ↓
Canvas Editor with style panel:
  LEFT: Layers + Style picker
  CENTER: Live prototype in canvas (interactive, zoomable)
  RIGHT: Inspector (edit selected node)
  TOP BAR: [Style presets] [Colors] [Fonts] [Export] [Build App]
    ↓
User customizes → clicks "Build App" → /design/:jobId
```

## Phases

### Phase 1: Connect Canvas to Prototype Detail
- Add "Customize" button on prototype detail page
- Navigate to /canvas?proto={folder}
- Canvas loads the design-tree.json

### Phase 2: Style Panel in Canvas
- Add collapsible style panel (left sidebar)
- Show color palette editor (primary, secondary, bg, text)
- Show font selector
- Show style presets grid (from /styles data)
- Clicking a preset applies colors to the canvas

### Phase 3: Live Style Application
- When user changes a color → update all nodes in design tree that use that color
- Color mapping: find all nodes using old primary → swap to new primary
- Font changes: update all text nodes
- Preview updates instantly in canvas

### Phase 4: Export to Build
- "Build App" button in canvas top bar
- Exports current design state (custom colors, fonts) as custom_design
- Creates job with custom_design → /design/:jobId

### Phase 5: Save & Share
- Save customized design tree to Supabase
- Share link: /canvas?design=uuid
- Fork: duplicate and customize

## Architecture

```
design-tree.json (from prototype)
    ↓
Canvas loads it → renders screens
    ↓
User picks style preset OR edits colors manually
    ↓
Style changes applied to design tree nodes in real-time
    ↓
"Build App" → custom_design = { colors, fonts, style }
    ↓
V2 builder uses custom_design for the app
```

## Tasks

### Phase 1 (connect)
- [ ] Add "Customize" button on prototype detail → /canvas?proto=slug
- [ ] Verify canvas loads design-tree.json correctly
- [ ] Fix any rendering issues

### Phase 2 (style panel)
- [ ] Create CanvasStylePanel component
- [ ] Color inputs for primary, secondary, bg, text, accent
- [ ] Font dropdown (system fonts + Google Fonts subset)
- [ ] Style preset grid (reuse APP_STYLES from styles.tsx)
- [ ] Integrate into canvas left sidebar (toggle between layers/styles)

### Phase 3 (live application)
- [ ] Color mapping function: find nodes using color X → replace with Y
- [ ] Apply color changes to entire design tree
- [ ] Apply font changes to all text nodes
- [ ] Instant re-render on change

### Phase 4 (export to build)
- [ ] Add "Build App" button to canvas top bar
- [ ] Collect current design state as custom_design
- [ ] Show BuildAppModal from canvas
- [ ] Pass custom_design through to job

### Phase 5 (save/share)
- [ ] Save design state to Supabase (new table: saved_designs)
- [ ] Load from URL: /canvas?design=uuid
- [ ] Fork button: copy design, open in new canvas
