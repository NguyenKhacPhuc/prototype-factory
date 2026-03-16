# Prototype Factory

Automated app prototype generator. Every day, OpenAI generates creative app ideas and Claude builds interactive React prototypes.

## How it works

1. **OpenAI** (gpt-4o-mini) generates a unique app idea with name, features, and audience
2. **Claude** (sonnet) creates an interactive React prototype with phone frame, navigation, and micro-interactions
3. **Git** auto-commits and pushes each prototype

## Browse prototypes

Each folder in `prototypes/` contains:
- `idea.json` - The original app idea
- `preview.html` - Open in browser to see the interactive prototype
- `App.tsx` - React source code
- `design-spec.json` - Design system and screen list

To view a prototype: `cd prototypes/<name> && npx serve .` then open `http://localhost:3000/preview.html`

## Manual run

```bash
./scripts/generate-prototype.sh          # Generate one prototype
./scripts/generate-prototype.sh --dry-run # Preview the idea without generating
```

## Setup

1. Copy `.env.example` to `.env` and add your `OPENAI_API_KEY`
2. Run `launchctl load ~/Library/LaunchAgents/com.steve.prototype-factory.plist` to enable auto-scheduling (6x/day)
3. To disable: `launchctl unload ~/Library/LaunchAgents/com.steve.prototype-factory.plist`
