# Phase 4: Prototype Data Reuse

**Status:** Planned
**Dependencies:** Phase 2

## Overview

When user clicks "Build Real App" on an existing prototype, skip Stages 0-1 by reusing the prototype's idea.json and design-spec.json. Saves ~$0.30 and ~10 minutes.

## What We Can Reuse

| Prototype file | Replaces | Stage skipped |
|---------------|----------|---------------|
| idea.json | constitution.md + spec.md | Stage 0 |
| design-spec.json | design-tokens.json + screens.md | Stage 1 |

## Flow

```
From existing prototype:
  idea.json exists + design-spec.json exists
    → Skip Stage 0 + Stage 1
    → Convert idea.json → specs/spec.md (simple transform)
    → Convert design-spec.json → specs/design-tokens.json
    → Go straight to Stage 2 (Scaffold)

From /create (new idea, no prototype):
    → Run full pipeline (Stage 0-4)
```

## Conversion Logic

```typescript
// idea.json → spec.md
function ideaToSpec(idea: IdeaJson): string {
  return `# Specification
App: ${idea.name}
Tagline: ${idea.tagline}
Description: ${idea.description}

## Features
${idea.features.map(f => `- ${f.title}: ${f.detail}`).join('\n')}

## Audience
${idea.audience}

## Use Cases
${idea.useCases.map(uc => `- ${uc.title}: ${uc.detail}`).join('\n')}
`;
}

// design-spec.json → design-tokens.json
function specToTokens(spec: DesignSpec): DesignTokens {
  return {
    colors: {
      primary: spec.designSystem.primaryColor,
      secondary: spec.designSystem.secondaryColor,
      background: spec.designSystem.backgroundColor,
    },
    typography: {
      fontFamily: spec.designSystem.fontFamily,
    },
    screens: spec.screens,
  };
}
```

## Cost Impact

| Flow | Stages | Est. cost |
|------|--------|-----------|
| Full pipeline (from scratch) | 0→1→2→3→4 | ~$0.40 |
| With prototype reuse | 2→3→4 | ~$0.10 |
| Savings | Skip 0+1 | ~$0.30 (75%) |

## Tasks

- [ ] Detect if job input has prototype_folder
- [ ] Load idea.json + design-spec.json from prototype
- [ ] Convert to spec.md + design-tokens.json format
- [ ] Write to build workdir specs/
- [ ] Skip Stage 0 + Stage 1 in mobile-app-worker
- [ ] Update progress to start from Stage 2
