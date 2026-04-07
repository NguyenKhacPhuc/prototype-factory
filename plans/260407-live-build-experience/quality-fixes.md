# Quality Fixes Needed (from testing 2026-04-07)

**Status:** Planned
**Priority:** High — pipeline works but generated apps don't run

## Problems Found

### 1. Missing Files — imports reference files that were never created
- `src/components/FolderRow` imported but never written
- Caused by: batching 5 tasks per call, tool loop cap of 8
- Claude writes the main screen code with imports, but doesn't have enough iterations to create all referenced components

### 2. Dependency Mismatches
- Generated `package.json` targets Expo SDK 51 but user has Expo Go 54
- `react-native-reanimated` v4 requires `react-native-worklets/plugin` not installed
- `expo-linking` missing from deps
- No `babel.config.js` generated
- No `app.json` generated (only `app.config.ts`)

### 3. No Compile Check
- Errors only discovered when user tries to run the app
- Should catch at build time: `npx tsc --noEmit` or `npx expo export --dump-sourcemap`

### 4. Entry Point Mismatch
- `package.json` has `"main": "node_modules/expo/AppEntry.js"` (expects `App.tsx`)
- But app uses expo-router (`app/_layout.tsx`) which needs `"main": "expo-router/entry"`

## Fixes

### Fix 1: Wiring Check (from mobile-app-agent-system)
After Stage 3, grep all imports and verify every referenced file exists:
```bash
# Find all imports
grep -rh "from '\." src/ app/ | sed "s/.*from '//;s/'.*//" | sort -u > /tmp/imports.txt

# Check each exists
while read imp; do
  # resolve to file path, check exists
done < /tmp/imports.txt
```
If missing files found → re-run implement for those specific files.

### Fix 2: Compile Check
After Stage 3, run:
```bash
npx tsc --noEmit 2>&1
```
If errors → feed errors back to Claude → fix → repeat (max 3 retries).

### Fix 3: Pin Expo SDK Version
In the scaffold prompt, explicitly specify:
```
Use Expo SDK 54. Pin these exact versions:
- expo@^54.0.0
- expo-router@~4.0.0
- react-native@0.76.x
- "main": "expo-router/entry" in package.json
- Must include babel.config.js with babel-preset-expo
- Must include app.json with scheme
```

### Fix 4: Template-Based Scaffold
Instead of letting Claude generate package.json from scratch, provide a **template** with correct versions and let Claude fill in the app-specific parts:
```json
{
  "name": "{{APP_SLUG}}",
  "main": "expo-router/entry",
  "type": "module",
  "dependencies": {
    "expo": "^54.0.0",
    "expo-router": "~4.0.0",
    "react": "19.0.0",
    "react-native": "0.76.6",
    ...pinned versions
  }
}
```

### Fix 5: Increase Tool Loops for Implement Stage
Currently 8 max. For implement tasks that create multiple files, increase to 15.
Or: after each batch, check which files are imported but missing, and create them in the next batch.

## Priority Order
1. Fix 3 (pin Expo SDK) — prevents most dep issues, quick win
2. Fix 4 (template scaffold) — ensures correct project structure
3. Fix 2 (compile check) — catches errors before user sees them
4. Fix 1 (wiring check) — catches missing files
5. Fix 5 (more tool loops) — lets Claude finish writing all files
