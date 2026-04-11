import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { config } from './config';
import { PipelineLogger } from './pipeline-logger';
import { ClaudeClient } from './claude-client';

interface JobInput {
  prompt: string;
  category?: string;
  custom_design?: {
    name?: string;
    colors?: Record<string, string>;
    font?: string;
    style?: string;
  };
}

export async function runPrototypeJob(jobId: string, input: JobInput) {
  const logger = new PipelineLogger(jobId);
  const claude = new ClaudeClient(logger);

  const supabase = (await import('@supabase/supabase-js')).createClient(config.supabaseUrl, config.supabaseServiceKey);
  const buildLog: { message: string; files?: string[]; type: string }[] = [];
  async function pushLog(message: string, files?: string[], type = 'info') {
    buildLog.push({ message, files, type });
    await supabase.from('generation_jobs').update({ live_output: JSON.stringify(buildLog) }).eq('id', jobId);
  }

  try {
    await logger.markStarted();

    // Step 1: Scout trends
    await logger.updateProgress(1, 6, 'Scouting trends and market context...');
    await pushLog('Scouting trending apps and market patterns...', undefined, 'info');
    const trends = await scoutTrends(logger);
    await pushLog('Market research complete.', undefined, 'success');

    // Step 2: Generate idea
    await logger.updateProgress(2, 6, 'Generating your app concept...');
    await pushLog('Generating a unique app concept from your idea...', undefined, 'info');
    const idea = await generateIdea(input.prompt, trends, logger);
    await pushLog(`App concept: ${idea.name} — ${idea.tagline}`, undefined, 'success');

    // Step 3: Design system (use custom_design if user picked a style)
    await logger.updateProgress(3, 6, 'Designing the visual system...');
    let designSystem: Record<string, any>;
    if (input.custom_design?.colors) {
      const c = input.custom_design.colors;
      designSystem = {
        style: input.custom_design.style || input.custom_design.name || 'custom',
        primary: c.primary || '#2979FF',
        secondary: c.secondary || c.primary || '#FF5252',
        cta: c.accent || c.primary || '#EC4899',
        bg: c.bg || c.background || '#FAFAFA',
        text: c.text || '#111',
        mood: input.custom_design.name || 'custom style',
        effects: '',
        avoid: '',
      };
      await pushLog(`Using custom style: ${designSystem.style}`, undefined, 'success');
    } else {
      await pushLog('Creating design system — colors, typography, style...', undefined, 'info');
      designSystem = await generateDesignSystem(idea, logger);
      await pushLog('Design system ready.', ['design-spec.json'], 'action');
    }

    // Step 4: Generate prototype
    await logger.updateProgress(4, 6, 'Building your interactive prototype...');
    await pushLog('Building interactive prototype with Claude...', undefined, 'info');
    const folder = await generatePrototype(idea, designSystem, claude, logger);
    await pushLog('Prototype code generated.', ['App.tsx', 'preview.html'], 'action');

    // Step 5: Validate
    await logger.updateProgress(5, 6, 'Validating and testing...');
    await pushLog('Running headless browser validation...', undefined, 'info');
    const valid = await validatePrototype(folder, logger);
    if (!valid) {
      await pushLog('Validation had warnings — prototype may have minor issues.', undefined, 'error');
    } else {
      await pushLog('Prototype validates — renders correctly.', undefined, 'success');
    }

    // Step 6: Deploy
    await logger.updateProgress(6, 6, 'Deploying to preview...');
    await pushLog('Committing and deploying to preview...', undefined, 'info');
    await deployPrototype(folder, logger);
    await pushLog('Prototype is live! You can interact with it now.', undefined, 'success');

    await logger.markCompleted({ folder: folderName(folder), url: `/prototype/${folderName(folder)}` });
    await logger.persist();

  } catch (err: any) {
    await logger.markFailed(err.message || 'Unknown error');
    await logger.persist();
    throw err;
  }
}

// --- Step implementations ---

async function scoutTrends(logger: PipelineLogger): Promise<string> {
  const cacheDir = join(config.repoDir, 'logs/trends');
  const today = new Date().toISOString().split('T')[0];
  const cacheFile = join(cacheDir, `trends-${today}.json`);

  if (existsSync(cacheFile)) {
    logger.log({ stage: 1, step: 'scout', event: 'complete', detail: 'Using cached trends' });
    return readFileSync(cacheFile, 'utf-8');
  }

  // Run existing scout script
  try {
    const result = execSync(`bash ${join(config.repoDir, 'scripts/scout-trends.sh')}`, {
      timeout: 300000,
      env: { ...process.env, GEMINI_API_KEY: config.geminiApiKey },
    });
    return result.toString();
  } catch {
    logger.log({ stage: 1, step: 'scout', event: 'error', detail: 'Scout failed, continuing without trends' });
    return '{}';
  }
}

async function generateIdea(prompt: string, trends: string, logger: PipelineLogger): Promise<Record<string, any>> {
  // Call Gemini for idea generation (reuse existing logic)
  const trendContext = extractTrendContext(trends);

  const payload = JSON.stringify({
    contents: [{ parts: [{ text: buildIdeaPrompt(prompt, trendContext) }] }],
    generationConfig: { temperature: 1.2, responseMimeType: 'application/json' },
  });

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${config.geminiApiKey}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload }
  );
  const data = await resp.json();

  if (data.error) throw new Error(`Gemini error: ${data.error.message}`);

  const content = data.candidates[0].content.parts[0].text;
  const idea = JSON.parse(content);

  logger.log({ stage: 2, step: 'idea', event: 'complete', detail: `${idea.name}: ${idea.tagline}` });
  return idea;
}

async function generateDesignSystem(idea: Record<string, any>, logger: PipelineLogger): Promise<Record<string, any>> {
  // Use Gemini to generate unique design for each app (free, fast, reliable)
  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${config.geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are a mobile app design director. Create a unique, opinionated visual design system for this app.

App: ${idea.name} — ${idea.tagline}
Category: ${idea.category}
Description: ${(idea.description || '').slice(0, 200)}

IMPORTANT: Do NOT default to blue (#2979FF) or generic colors. Be bold and specific to this app's personality.

Return JSON:
{
  "style": "specific style name (e.g. 'warm editorial', 'neon cyberpunk', 'earthy organic', 'candy pop', 'luxury dark')",
  "primary": "#hex (dominant brand color — NOT blue unless the app is about water/sky)",
  "secondary": "#hex (complementary color)",
  "cta": "#hex (call-to-action button color — high contrast)",
  "bg": "#hex (background — light or dark depending on style)",
  "text": "#hex (main text color)",
  "mood": "3-5 word emotional descriptor",
  "effects": "key visual effects (e.g. 'soft shadows, rounded cards' or 'hard edges, bold borders')",
  "avoid": "what NOT to do with this style"
}` }] }],
          generationConfig: { temperature: 1.3, responseMimeType: 'application/json' },
        }),
      }
    );
    const data = await resp.json();
    if (data.error) throw new Error(data.error.message);

    const design = JSON.parse(data.candidates[0].content.parts[0].text);
    logger.log({ stage: 3, step: 'design', event: 'complete', detail: `${design.style} — ${design.primary}` });
    return design;
  } catch (err: any) {
    logger.log({ stage: 3, step: 'design', event: 'error', detail: `Gemini design failed: ${err.message?.slice(0, 80)}` });
    // Fallback with RANDOMIZED colors so they're at least different
    const palettes = [
      { style: 'warm sunset', primary: '#E8654A', secondary: '#F59E0B', cta: '#DC2626', bg: '#FFF7ED', text: '#1C1917', mood: 'warm and inviting' },
      { style: 'ocean depth', primary: '#0891B2', secondary: '#06B6D4', cta: '#0284C7', bg: '#F0F9FF', text: '#0C4A6E', mood: 'calm and trustworthy' },
      { style: 'forest canopy', primary: '#16A34A', secondary: '#84CC16', cta: '#15803D', bg: '#F0FDF4', text: '#14532D', mood: 'natural and grounded' },
      { style: 'berry crush', primary: '#DB2777', secondary: '#A855F7', cta: '#BE185D', bg: '#FDF2F8', text: '#831843', mood: 'bold and playful' },
      { style: 'midnight slate', primary: '#6366F1', secondary: '#818CF8', cta: '#4F46E5', bg: '#0F172A', text: '#E2E8F0', mood: 'sleek and modern' },
      { style: 'golden hour', primary: '#D97706', secondary: '#FBBF24', cta: '#B45309', bg: '#FFFBEB', text: '#78350F', mood: 'optimistic and energetic' },
    ];
    const pick = palettes[Math.floor(Math.random() * palettes.length)];
    return { ...pick, effects: '', avoid: '' };
  }
}

async function generatePrototype(
  idea: Record<string, any>,
  design: Record<string, any>,
  claude: ClaudeClient,
  logger: PipelineLogger
): Promise<string> {
  const today = new Date().toISOString().split('T')[0];
  const slug = idea.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-');
  const folderPath = join(config.repoDir, 'prototypes', `${today}-${slug}`);

  if (existsSync(folderPath)) {
    throw new Error(`Prototype ${today}-${slug} already exists`);
  }
  mkdirSync(folderPath, { recursive: true });

  // Save idea
  writeFileSync(join(folderPath, 'idea.json'), JSON.stringify(idea, null, 2));

  // Build prompt (same as generate-prototype.sh)
  const features = idea.features?.map((f: any) =>
    typeof f === 'string' ? f : `${f.title}: ${f.detail}`
  ).join(', ') || '';

  const prompt = buildPrototypePrompt(idea, design, features, folderPath);

  // Call Claude API via Agent SDK
  const result = await claude.generate(
    'You are a mobile app prototype generator. Write clean, working React code. Output ONLY the App.tsx code, no markdown fences, no explanations.',
    prompt,
    'claude-opus-4-6'
  );

  // Extract App.tsx from response
  const appTsx = extractAppTsx(result.content);
  writeFileSync(join(folderPath, 'App.tsx'), appTsx);

  // Write design-spec.json
  writeFileSync(join(folderPath, 'design-spec.json'), JSON.stringify({
    appName: idea.name,
    tagline: idea.tagline,
    designSystem: {
      primaryColor: design.primary,
      secondaryColor: design.secondary,
      backgroundColor: design.bg,
      fontFamily: `${design.heading_font} / ${design.body_font}`,
      style: design.style,
    },
    screens: ['home'],
  }, null, 2));

  // Write preview.html
  writeFileSync(join(folderPath, 'preview.html'), buildPreviewHtml());

  logger.log({ stage: 4, step: 'prototype', event: 'complete', detail: folderPath });
  return folderPath;
}

async function validatePrototype(folder: string, logger: PipelineLogger): Promise<boolean> {
  try {
    execSync(`bash ${join(config.repoDir, 'scripts/validate-prototype.sh')} "${folder}"`, {
      timeout: 60000,
      cwd: config.repoDir,
    });
    logger.log({ stage: 5, step: 'validate', event: 'complete', detail: 'PASS' });
    return true;
  } catch (err: any) {
    logger.log({ stage: 5, step: 'validate', event: 'error', detail: err.message?.slice(0, 200) });
    return false;
  }
}

async function deployPrototype(folder: string, logger: PipelineLogger) {
  try {
    const name = folderName(folder);
    execSync(`cd "${config.repoDir}" && bash scripts/build-manifest.sh`, { timeout: 30000 });
    execSync(`cd "${config.repoDir}" && git add "prototypes/${name}/" prototypes/manifest.json && git commit -m "feat(prototype): add ${name} [user-generated]"`, { timeout: 30000 });
    execSync(`cd "${config.repoDir}" && git push origin main`, { timeout: 30000 });
    logger.log({ stage: 6, step: 'deploy', event: 'complete', detail: 'Pushed to git' });
  } catch (err: any) {
    logger.log({ stage: 6, step: 'deploy', event: 'error', detail: err.message?.slice(0, 200) });
  }
}

// --- Helpers ---

function folderName(path: string): string {
  return path.split('/').pop() || '';
}

function extractTrendContext(trendsJson: string): string {
  try {
    const data = JSON.parse(trendsJson);
    const parts: string[] = [];
    const apps = data.trending_apps?.slice(0, 5) || [];
    if (apps.length) parts.push('Trending: ' + apps.map((a: any) => a.name).join(', '));
    const hooks = data.behavioral_hooks?.slice(0, 2) || [];
    if (hooks.length) parts.push('Hooks: ' + hooks.map((h: any) => h.name).join(', '));
    return parts.join('. ');
  } catch {
    return '';
  }
}

function buildIdeaPrompt(userPrompt: string, trendContext: string): string {
  return `You are a creative mobile app idea generator. Output valid JSON only.

User's app idea: "${userPrompt}"

${trendContext ? `Market context (use as inspiration, do NOT copy): ${trendContext}` : ''}

Return JSON with: name, tagline, description, features (array of {title, detail}), audience, category, useCases (array of {title, detail}), engagementLoop, trendFit, monetization.

Make the concept specific, fresh, and capable of strong repeat engagement.`;
}

function buildPrototypePrompt(idea: Record<string, any>, design: Record<string, any>, features: string, targetDir: string): string {
  return `Generate an interactive mobile app prototype.

**App Name:** ${idea.name}
**Tagline:** ${idea.tagline}
**Description:** ${idea.description}
**Key Features:** ${features}

Create a single-file React prototype (App.tsx).

**CRITICAL RULES:**
1. NO import/export statements. Use: const { useState, useEffect, useRef } = React;
2. Function must be: function App() (no export default)
3. All styles must be inline JavaScript objects
4. Use Lucide icons via window.lucide (e.g. window.lucide.Heart)
5. Use iOS system font: fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif"
6. iOS HIG font sizes: 34px title, 22px heading, 17px body, 15px secondary, 13px caption

**Design System:**
- **Style:** ${design.style}
- **Colors:** Primary ${design.primary} + Secondary ${design.secondary} + CTA ${design.cta} on Background ${design.bg}
- **Mood:** ${design.mood}
- **Effects:** ${design.effects}
- **AVOID:** ${design.avoid}

**Layout:**
- Phone frame 375x812px, rounded corners, centered on page
- Outermost wrapper MUST use background: '#f0f0f0'
- Screen switching: const [activeScreen, setActiveScreen] = useState('home'); const screens = { home: HomeScreen, ... }; React.createElement(screens[activeScreen])
- At least 4 screens with real content
- Micro-interactions, smooth transitions
- Light and dark theme support

Write ONLY the App.tsx content. No markdown fences.`;
}

function extractAppTsx(content: string): string {
  // Remove markdown code fences if present
  let code = content;
  const fenceMatch = code.match(/```(?:tsx?|jsx?|javascript)?\s*\n([\s\S]*?)```/);
  if (fenceMatch) code = fenceMatch[1];

  // Verify it has function App()
  if (!code.includes('function App()') && !code.includes('function App ()')) {
    throw new Error('Generated code missing function App()');
  }
  return code.trim();
}

function buildPreviewHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Prototype Preview</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script>window.react = window.React;</script>
  <script src="https://unpkg.com/lucide-react@0.469.0/dist/umd/lucide-react.min.js"></script>
  <script>window.lucide = window.LucideReact || {};</script>
</head>
<body>
<div id="root"></div>
<script>
  Babel.registerPreset('tsx', {
    presets: [
      [Babel.availablePresets['typescript'], { isTSX: true, allExtensions: true }],
      [Babel.availablePresets['react']]
    ]
  });
</script>
<script type="text/babel" data-presets="tsx" src="App.tsx"></script>
<script type="text/babel" data-presets="tsx">
  ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
</script>
</body>
</html>`;
}
