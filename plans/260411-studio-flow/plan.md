# Studio Flow — Customize Design Before Building

**Created:** 2026-04-11
**Status:** Planning
**Goal:** Let users customize the app's visual design (colors, font, style) before building, using the existing /styles page as the foundation.

## Current State

- `/styles` page exists with 17+ design styles (Minimalism, Glassmorphism, Brutalism, etc.)
- Each style has: name, accent color, bg, card, text, radius, font, layout
- But it's disconnected — just a gallery, doesn't feed into the build pipeline

## Proposed Flow

```
/prototype/:slug → "Build Real App" → BuildAppModal
    ↓
Choose style:
  [Use Prototype Design]  ← default, uses prototype's colors/font
  [Customize in Studio →] ← opens style picker
    ↓
/studio/:protoFolder (new page, or modal)
  ├── Left: Style picker (from /styles data)
  │   - Grid of style cards
  │   - Click to preview
  │   - Custom color inputs
  │   - Font selector
  │   - Dark/light toggle
  │
  ├── Right: Live prototype preview with selected style applied
  │   - iframe with CSS variable injection
  │   - Updates in real-time as user picks colors
  │
  └── Bottom: [Back] [Build with This Style]
    ↓
Build with customized design → /design/:jobId
```

## Implementation

### Phase 1: Connect styles to build
- Add "Build with this style" button on /styles page
- Pass selected StyleDef to BuildAppModal
- BuildAppModal sends style data in job input

### Phase 2: Studio page
- New /studio/:protoFolder page
- Left: style picker grid + custom color inputs
- Right: prototype iframe with live CSS variable override
- Save: creates job with custom design data

### Phase 3: Live preview
- Inject CSS variables into prototype iframe:
  ```js
  iframe.contentWindow.postMessage({
    type: 'theme-override',
    colors: { primary: '#FF3333', bg: '#000' }
  }, '*')
  ```
- Prototype App.tsx reads CSS variables for theming
- Preview updates instantly as user picks colors

## Data Flow

```
StyleDef (from /styles) or custom colors
    ↓
job.input.custom_design = {
  style: "Brutalism",
  colors: { primary: "#FF3333", bg: "#ffffff", ... },
  font: "Menlo",
  radius: 0,
}
    ↓
V2 builder reads job.input.custom_design
    ↓
Passes to implement prompt instead of prototype's design
```

## Tasks

- [ ] Add custom_design field to job input type
- [ ] V2 builder: use custom_design over prototype design when present
- [ ] BuildAppModal: add "Customize Style" option
- [ ] /styles page: add "Build with this style" per card
- [ ] /studio page: style picker + live preview + build button
- [ ] Live CSS injection in prototype iframe
