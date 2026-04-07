# Phase 2: Design Review Dashboard

**Status:** Planned
**Dependencies:** Phase 1

## Overview

After prototype generation, show users a design review page where they can see and approve the design system before the full app build starts. This is Gate G1 from the mobile-app-agent-system.

## User Flow

```
/create → generate prototype → /prototype/:slug (preview)
    ↓ user clicks "Build Real App"
/design/:jobId (new page)
    ├── Color palette (swatches from design-tokens.json)
    ├── Typography (font family, sizes, weights)
    ├── Screen inventory (from design-spec.json)
    ├── Mood/style description
    ├── Estimated cost + time
    │
    ├── [Approve & Build] → starts build
    ├── [Tweak] → "make it darker", "use blue instead"
    │   → re-runs Stage 1 with feedback
    └── [Cancel]
```

## Design Review Page Components

```
┌─────────────────────────────────────────────────┐
│  Design Review — SimpleNotes                     │
│                                                  │
│  ┌── Colors ──────────┐ ┌── Typography ────────┐ │
│  │ ■ #1A1A2E Primary  │ │ Heading: SF Pro Bold │ │
│  │ ■ #E2E2E2 Surface  │ │ Body: SF Pro Regular │ │
│  │ ■ #FFD700 Accent   │ │ 34/22/17/15/13px     │ │
│  │ ■ #F5F5F5 BG       │ │                      │ │
│  └────────────────────┘ └──────────────────────┘ │
│                                                  │
│  ┌── Screens ──────────────────────────────────┐ │
│  │ 1. Home (folder list)                       │ │
│  │ 2. Folder Detail (notes list)               │ │
│  │ 3. Note Editor (title + body)               │ │
│  │ 4. Settings (dark mode toggle)              │ │
│  │ 5. Search                                   │ │
│  └──────────────────────────────────────────────┘ │
│                                                  │
│  Style: Modern minimal with dark mode support    │
│  Framework: React Native (Expo)                  │
│  Est. cost: $0.40 | Est. time: ~15 min          │
│                                                  │
│  ┌── Feedback ──────────────────────────────────┐ │
│  │ "Make the accent color warmer..."            │ │
│  └──────────────────────────────────────────────┘ │
│                                                  │
│  [← Back]  [Tweak Design]  [Approve & Build →]  │
└─────────────────────────────────────────────────┘
```

## Data Sources

- `idea.json` → app name, tagline, description, features
- `design-spec.json` → design system, screen list
- `design-tokens.json` → colors, fonts, spacing (from Stage 1)
- complexity estimate → cost, time, tier

## Gate Logic

```
Job created with type='mobile-app', status='pending_design_review'
    ↓
Design review page shows design data
    ↓
User clicks "Approve" → status='pending' (worker picks it up)
User clicks "Tweak" → re-run Stage 1 with feedback, update design data
User clicks "Cancel" → status='cancelled'
```

## Tasks

- [ ] Add `pending_design_review` status to generation_jobs
- [ ] Create /design/:jobId page
- [ ] Color palette component (render swatches from tokens)
- [ ] Typography preview component
- [ ] Screen inventory list
- [ ] Feedback input for tweaks
- [ ] "Tweak" re-runs Stage 1 with user feedback
- [ ] "Approve" transitions job to pending for worker
- [ ] Route from BuildAppModal → /design/:jobId instead of straight to build
