#!/bin/bash
# Builds prototypes/manifest.json from all prototype folders
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROTOTYPES_DIR="$REPO_DIR/prototypes"
MANIFEST="$PROTOTYPES_DIR/manifest.json"

python3 -c "
import json, os, glob

prototypes_dir = '$PROTOTYPES_DIR'
entries = []

for folder in sorted(os.listdir(prototypes_dir), reverse=True):
    spec_path = os.path.join(prototypes_dir, folder, 'design-spec.json')
    idea_path = os.path.join(prototypes_dir, folder, 'idea.json')
    preview_path = os.path.join(prototypes_dir, folder, 'preview.html')

    if not os.path.isfile(preview_path):
        continue

    screenshot_path = os.path.join(prototypes_dir, folder, 'screenshot.png')
    entry = {'folder': folder}

    if os.path.isfile(spec_path):
        with open(spec_path) as f:
            spec = json.load(f)
        entry.update(spec)

    entry['hasScreenshot'] = os.path.isfile(screenshot_path)

    if os.path.isfile(idea_path):
        with open(idea_path) as f:
            idea = json.load(f)
        entry.setdefault('appName', idea.get('name', ''))
        entry.setdefault('tagline', idea.get('tagline', ''))
        entry.setdefault('description', idea.get('description', ''))
        entry.setdefault('features', idea.get('features', []))
        entry.setdefault('audience', idea.get('audience', ''))
        entry.setdefault('category', idea.get('category', ''))
        entry.setdefault('useCases', idea.get('useCases', []))

    entries.append(entry)

print(json.dumps(entries, indent=2))
" > "$MANIFEST"

echo "Manifest built: $(python3 -c "import json; print(len(json.load(open('$MANIFEST'))))" ) prototypes"
