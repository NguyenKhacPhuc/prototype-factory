/**
 * App Builder V2 — Template + Gemini Design + Single-Shot Implement + Compile Fix
 *
 * Strategy:
 * 1. Template: pre-built Expo 54 scaffold (free, instant)
 * 2. Design: Gemini generates design tokens + screen list (free, ~3s)
 * 3. Implement: One big API call returns ALL screen code (no tool loops)
 * 4. Compile + Fix: tsc --noEmit, feed errors back (1-2 calls if needed)
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { config } from './config';
import { PipelineLogger } from './pipeline-logger';
import { createClient } from '@supabase/supabase-js';

// ─── EXPO 54 TEMPLATE ───────────────────────────────────────────────

const TEMPLATE_PACKAGE_JSON = {
  name: "app",
  version: "1.0.0",
  main: "expo-router/entry",
  scripts: {
    start: "expo start",
    android: "expo start --android",
    ios: "expo start --ios",
  },
  dependencies: {
    "expo": "~54.0.0",
    "expo-router": "~5.0.0",
    "expo-status-bar": "~2.2.0",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-native": "0.79.2",
    "react-native-gesture-handler": "~2.24.0",
    "react-native-safe-area-context": "~5.4.0",
    "react-native-screens": "~4.10.0",
    "@react-native-async-storage/async-storage": "2.1.2",
    "@expo/vector-icons": "^14.0.0",
  },
  devDependencies: {
    "@types/react": "~18.3.0",
    "typescript": "~5.8.0",
  },
};

const TEMPLATE_APP_JSON = {
  expo: {
    name: "App",
    slug: "app",
    version: "1.0.0",
    scheme: "myapp",
    platforms: ["ios", "android"],
    icon: "./assets/icon.png",
    splash: { image: "./assets/splash-icon.png", resizeMode: "contain", backgroundColor: "#ffffff" },
    ios: { supportsTablet: true },
    android: { adaptiveIcon: { foregroundImage: "./assets/adaptive-icon.png", backgroundColor: "#ffffff" } },
    web: { favicon: "./assets/favicon.png" },
    plugins: ["expo-router"],
  },
};

const TEMPLATE_TSCONFIG = {
  extends: "expo/tsconfig.base",
  compilerOptions: {
    strict: true,
    paths: { "@/*": ["./src/*"] },
  },
  include: ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"],
};

const TEMPLATE_BABEL = `export default function (api) {
  api.cache(true);
  return { presets: ['babel-preset-expo'] };
};`;

const TEMPLATE_LAYOUT = `import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}`;

// ─── DESIGN PHASE ONLY (for pending_design_review) ───────────────────

export async function runDesignPhase(jobId: string, input: { prompt: string; prototype_folder?: string }) {
  const logger = new PipelineLogger(jobId);
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);
  const workDir = `/tmp/builds/${jobId}`;

  try {
    await logger.markStarted();
    mkdirSync(join(workDir, 'specs'), { recursive: true });

    // Run design via Gemini (free, fast)
    await logger.updateProgress(1, 2, 'Designing your app...');
    const design = await designWithGemini(input.prompt, input.prototype_folder, logger);
    writeFileSync(join(workDir, 'specs/design.json'), JSON.stringify(design, null, 2));

    // Save design data and pause — wait for user approval
    await supabase.from('generation_jobs').update({
      status: 'pending_design_review',
      design_data: design,
      progress: { step: 2, total: 2, message: 'Design ready — waiting for approval' },
    }).eq('id', jobId);

    logger.log({ stage: 1, step: 'design', event: 'complete', detail: 'Paused for review' });

  } catch (err: any) {
    await logger.markFailed(err.message || 'Design phase failed');
  }
}

// ─── MAIN BUILDER (runs after design approval) ──────────────────────

export async function buildAppV2(jobId: string, input: { prompt: string; prototype_folder?: string }) {
  const logger = new PipelineLogger(jobId);
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);
  const workDir = `/tmp/builds/${jobId}`;

  // Helper to push activity log entries visible on the frontend
  const buildLog: { message: string; files?: string[]; type: 'info' | 'action' | 'success' | 'error' }[] = [];
  async function pushLog(message: string, files?: string[], type: 'info' | 'action' | 'success' | 'error' = 'info') {
    buildLog.push({ message, files, type });
    await supabase.from('generation_jobs').update({ live_output: JSON.stringify(buildLog) }).eq('id', jobId);
  }

  try {
    await logger.markStarted();

    // ── Step 1: Template ──
    await logger.updateProgress(1, 5, 'Setting up project template...');
    await pushLog(`Building ${input.prompt.slice(0, 50)}. Setting up the Expo project...`, undefined, 'info');
    const appSlug = input.prompt.split(' ').slice(0, 3).join('-').toLowerCase().replace(/[^a-z0-9-]/g, '');
    scaffoldTemplate(workDir, appSlug);
    await pushLog('Project scaffold created.', ['package.json', 'app.json', 'tsconfig.json', 'babel.config.js', 'app/_layout.tsx'], 'action');

    // ── Step 2: Design (reuse from design review if available) ──
    await logger.updateProgress(2, 5, 'Designing your app...');
    const { data: existingJob } = await supabase.from('generation_jobs').select('design_data').eq('id', jobId).single();
    let design: any;
    if (existingJob?.design_data) {
      design = existingJob.design_data;
      await pushLog('Using approved design.', ['specs/design.json'], 'success');
    } else {
      await pushLog('Designing the app — choosing colors, screens, and features...', undefined, 'info');
      design = await designWithGemini(input.prompt, input.prototype_folder, logger);
      await supabase.from('generation_jobs').update({ design_data: design }).eq('id', jobId);
    }
    writeFileSync(join(workDir, 'specs/design.json'), JSON.stringify(design, null, 2));
    const screenNames = (design.screens || []).map((s: any) => typeof s === 'string' ? s : s.name);
    await pushLog(`Design: ${screenNames.length} screens.`, ['specs/design.json'], 'success');

    // ── Step 3: Implement ──
    await logger.updateProgress(3, 5, 'Building all screens...');
    await pushLog('Now writing all files in a single batch:', undefined, 'info');
    const code = await implementAllScreens(input.prompt, design, logger);
    writeCodeFiles(workDir, code);
    const codeFiles = Object.keys(code);
    const filesList = codeFiles.map(path => ({ path, status: 'done', size: code[path].length }));
    await supabase.from('generation_jobs').update({ files_created: filesList }).eq('id', jobId);
    await pushLog(`${codeFiles.length} files written.`, codeFiles, 'action');

    // ── Step 3.5: Wiring check ──
    const missing = wiringCheck(workDir);
    if (missing.length > 0) {
      await pushLog(`Found ${missing.length} missing imports. Creating stubs...`, missing, 'error');
      for (const m of missing) {
        const stubPath = join(workDir, m);
        mkdirSync(join(stubPath, '..'), { recursive: true });
        writeFileSync(stubPath, `// TODO: implement\nexport default function() { return null; }\n`);
      }
      await pushLog('Stubs created for missing files.', undefined, 'action');
    } else {
      await pushLog('All imports verified — no missing files.', undefined, 'success');
    }

    // ── Step 4: Install + fix ──
    await logger.updateProgress(4, 5, 'Installing packages and checking for errors...');
    await pushLog('Installing packages and fixing dependency versions...', undefined, 'info');
    await installAndFix(workDir, input.prompt, design, logger);
    await pushLog('Packages installed. Compile check done.', undefined, 'success');

    // ── Step 5: Package ──
    await logger.updateProgress(5, 5, 'Packaging...');
    await pushLog('Packaging your app for download...', undefined, 'info');
    const zipPath = `/tmp/builds/${jobId}.zip`;
    execSync(`cd "${workDir}" && zip -r "${zipPath}" . -x "node_modules/*" ".git/*"`, { timeout: 30000, maxBuffer: 10 * 1024 * 1024, stdio: 'pipe' });

    // Upload (verify success)
    const zipBuffer = readFileSync(zipPath);
    const { error: uploadErr } = await supabase.storage.from('builds').upload(`${jobId}.zip`, zipBuffer, { upsert: true, contentType: 'application/zip' });
    if (uploadErr) {
      await pushLog(`Upload warning: ${uploadErr.message}. Trying to create bucket...`, undefined, 'error');
      // Auto-create bucket if missing
      await supabase.storage.createBucket('builds', { public: true });
      const { error: retryErr } = await supabase.storage.from('builds').upload(`${jobId}.zip`, zipBuffer, { upsert: true, contentType: 'application/zip' });
      if (retryErr) await pushLog(`Upload failed: ${retryErr.message}`, undefined, 'error');
    }
    const { data: urlData } = supabase.storage.from('builds').getPublicUrl(`${jobId}.zip`);

    await pushLog('App is ready! Download source or scan QR to test on your phone.', undefined, 'success');

    await logger.markCompleted({
      download_url: urlData.publicUrl,
      files: Object.keys(code).length,
      framework: 'react-native',
    });
    await logger.persist();

  } catch (err: any) {
    await pushLog(`Build failed: ${err.message?.slice(0, 100)}`, undefined, 'error');
    await logger.markFailed(err.message || 'Unknown error');
    await logger.persist();
    throw err;
  }
}

// ─── STEP 1: SCAFFOLD TEMPLATE ──────────────────────────────────────

function scaffoldTemplate(workDir: string, slug: string) {
  mkdirSync(join(workDir, 'app'), { recursive: true });
  mkdirSync(join(workDir, 'src'), { recursive: true });
  mkdirSync(join(workDir, 'assets'), { recursive: true });
  mkdirSync(join(workDir, 'specs'), { recursive: true });

  const pkg = { ...TEMPLATE_PACKAGE_JSON, name: slug };
  const appJson = JSON.parse(JSON.stringify(TEMPLATE_APP_JSON));
  appJson.expo.name = slug;
  appJson.expo.slug = slug;
  appJson.expo.scheme = slug;

  writeFileSync(join(workDir, 'package.json'), JSON.stringify(pkg, null, 2));
  writeFileSync(join(workDir, 'app.json'), JSON.stringify(appJson, null, 2));
  writeFileSync(join(workDir, 'tsconfig.json'), JSON.stringify(TEMPLATE_TSCONFIG, null, 2));
  writeFileSync(join(workDir, 'babel.config.js'), TEMPLATE_BABEL);
  writeFileSync(join(workDir, 'app/_layout.tsx'), TEMPLATE_LAYOUT);

  // Placeholder assets (1x1 transparent PNG)
  const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  for (const name of ['icon.png', 'adaptive-icon.png', 'splash-icon.png', 'favicon.png']) {
    writeFileSync(join(workDir, 'assets', name), PNG);
  }
}

// ─── STEP 2: DESIGN WITH GEMINI ─────────────────────────────────────

async function designWithGemini(prompt: string, protoFolder: string | undefined, logger: PipelineLogger) {
  // Reuse prototype data if available
  if (protoFolder) {
    const ideaPath = join(config.repoDir, 'prototypes', protoFolder, 'idea.json');
    const specPath = join(config.repoDir, 'prototypes', protoFolder, 'design-spec.json');
    if (existsSync(ideaPath) && existsSync(specPath)) {
      const idea = JSON.parse(readFileSync(ideaPath, 'utf-8'));
      const spec = JSON.parse(readFileSync(specPath, 'utf-8'));
      logger.log({ stage: 1, step: 'design', event: 'complete', detail: 'Reused from prototype' });
      const ds = spec.designSystem || {};
      return {
        appName: idea.name,
        description: idea.description,
        features: idea.features,
        screens: spec.screens || ['home', 'detail', 'settings'],
        colors: {
          primary: ds.primaryColor || '#2979FF',
          secondary: ds.secondaryColor || '#FF5252',
          background: ds.backgroundColor || '#FAFAFA',
          surface: '#FFFFFF',
          text: '#111111',
          textSecondary: '#666666',
        },
        style: ds.style || '',
        fontFamily: ds.fontFamily || "-apple-system, sans-serif",
      };
    }
  }

  // Generate with Gemini (free)
  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${config.geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Design a mobile app based on this idea: "${prompt}"

Return JSON only:
{
  "appName": "short name",
  "description": "1-2 sentences",
  "features": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5"],
  "screens": [
    {"name": "Home", "route": "index", "description": "what this screen shows"},
    {"name": "Detail", "route": "detail", "description": "..."},
    {"name": "Settings", "route": "settings", "description": "..."}
  ],
  "colors": {
    "primary": "#hex",
    "secondary": "#hex",
    "background": "#hex",
    "surface": "#hex",
    "text": "#hex",
    "textSecondary": "#hex"
  }
}

Keep it to 4-6 screens max. Be specific about what each screen shows.` }] }],
        generationConfig: { temperature: 0.7, responseMimeType: 'application/json' },
      }),
    }
  );

  const data = await resp.json();
  if (data.error) throw new Error(`Gemini: ${data.error.message}`);
  return JSON.parse(data.candidates[0].content.parts[0].text);
}

// ─── STEP 3: IMPLEMENT ALL SCREENS (SINGLE CALL) ────────────────────

async function implementAllScreens(prompt: string, design: any, logger: PipelineLogger) {
  const screenList = (design.screens || []).map((s: any) =>
    typeof s === 'string' ? s : `${s.name} (${s.route}): ${s.description}`
  ).join('\n');

  const colors = design.colors || {};

  const implementPrompt = `You are building a React Native (Expo Router) app.

App: ${design.appName || prompt}
Description: ${design.description || prompt}

Screens:
${screenList}

Design Style: ${design.style || 'modern minimal'}
Font: ${design.fontFamily || '-apple-system, sans-serif'}

Colors (USE THESE EXACT COLORS — they match the prototype the user approved):
  primary=${colors.primary || '#2979FF'}
  secondary=${colors.secondary || '#FF5252'}
  background=${colors.background || '#FAFAFA'}
  surface=${colors.surface || '#FFF'}
  text=${colors.text || '#111'}
  textSecondary=${colors.textSecondary || '#666'}

Create a theme/colors.ts file with these exact hex values. Use them consistently across ALL screens.

Features: ${(design.features || []).map((f: any) => typeof f === 'string' ? f : `${f.title}: ${f.detail}`).join(', ')}

RULES:
- Expo Router file-based routing: screens go in app/ directory
- app/_layout.tsx already exists with Stack navigator — do NOT include it
- MUST include app/index.tsx as the home screen (Expo Router requires this)
- Use useLocalSearchParams() NOT useSearchParams() (deprecated)
- Use @react-native-async-storage/async-storage for local data
- Use @expo/vector-icons for icons (Ionicons, MaterialIcons)
- Use StyleSheet.create for styles
- TypeScript, functional components, hooks
- Every component you import MUST be defined in your output
- Do NOT import from files you don't create
- Do NOT use react-native-reanimated or react-native-worklets

Return a JSON object where keys are file paths and values are file contents.
Include ALL files needed. Example format:

{
  "app/index.tsx": "import React from 'react';\\nimport { View, Text } from 'react-native';\\n...",
  "app/settings.tsx": "...",
  "src/hooks/useNotes.ts": "...",
  "src/components/NoteCard.tsx": "...",
  "src/theme/colors.ts": "export const colors = { primary: '${colors.primary || '#2979FF'}', ... };"
}

Create 4-6 screen files + shared components + hooks. Make it functional with real UI, not placeholder text.`;

  const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.openrouterApiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://appdex-ai.vercel.app',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-opus-4-6',
      max_tokens: 32000,
      messages: [
        { role: 'system', content: 'You are a senior React Native (Expo Router) expert. Return ONLY a valid JSON object mapping file paths to complete file contents. No markdown fences, no explanation.' },
        { role: 'user', content: implementPrompt },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  const data = await resp.json();
  if (data.error) throw new Error(`OpenRouter: ${data.error.message}`);

  let content = data.choices[0].message.content;

  // Strip markdown fences if present (Opus sometimes wraps in ```json)
  content = content.replace(/^```(?:json)?\s*\n?/m, '').replace(/\n?```\s*$/m, '').trim();

  const files = JSON.parse(content);

  // Track cost
  const usage = data.usage || {};
  logger.log({
    stage: 2, step: 'implement', event: 'api_call',
    model: 'claude-opus-4-6',
    input_tokens: usage.prompt_tokens || 0,
    output_tokens: usage.completion_tokens || 0,
    cached_tokens: 0,
    duration_ms: 0,
  });
  await logger.trackTokens(usage.prompt_tokens || 0, usage.completion_tokens || 0, 0);

  return files;
}

// ─── WIRING CHECK ────────────────────────────────────────────────────

function wiringCheck(workDir: string): string[] {
  const missing: string[] = [];

  // Find all relative imports in .ts/.tsx files
  const findImports = (dir: string) => {
    if (!existsSync(dir)) return;
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
        findImports(fullPath);
      } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
        const content = readFileSync(fullPath, 'utf-8');
        const importMatches = content.matchAll(/from\s+['"](\.[^'"]+)['"]/g);
        for (const match of importMatches) {
          const importPath = match[1];
          const resolved = resolveImport(join(dir), importPath);
          if (!resolved) {
            // Convert to relative path from workDir
            const rel = join(dir, importPath).replace(workDir + '/', '');
            if (!missing.includes(rel + '.tsx')) missing.push(rel + '.tsx');
          }
        }
      }
    }
  };

  findImports(join(workDir, 'app'));
  findImports(join(workDir, 'src'));
  return missing;
}

function resolveImport(fromDir: string, importPath: string): boolean {
  const base = join(fromDir, importPath);
  for (const ext of ['.ts', '.tsx', '.js', '.jsx', '']) {
    if (existsSync(base + ext)) return true;
  }
  if (existsSync(join(base, 'index.ts')) || existsSync(join(base, 'index.tsx'))) return true;
  return false;
}

// ─── WRITE CODE FILES ────────────────────────────────────────────────

function writeCodeFiles(workDir: string, files: Record<string, string>) {
  for (const [path, content] of Object.entries(files)) {
    // Skip app/_layout.tsx — we already have the template one
    if (path === 'app/_layout.tsx') continue;

    const fullPath = join(workDir, path);
    mkdirSync(join(fullPath, '..'), { recursive: true });
    writeFileSync(fullPath, content);
  }
}

// ─── STEP 4: INSTALL + COMPILE CHECK + FIX ──────────────────────────

async function installAndFix(workDir: string, prompt: string, design: any, logger: PipelineLogger) {
  // Install deps + fix versions to match SDK
  try {
    execSync('bun install 2>&1', { cwd: workDir, timeout: 120000, stdio: 'pipe' });
    execSync('npx expo install --fix 2>&1 || true', { cwd: workDir, timeout: 60000, stdio: 'pipe' });
    logger.log({ stage: 3, step: 'install', event: 'complete', detail: 'install + fix done' });
  } catch (err: any) {
    logger.log({ stage: 3, step: 'install', event: 'error', detail: err.message?.slice(0, 200) });
  }

  // TypeScript check
  try {
    execSync('npx tsc --noEmit 2>&1', { cwd: workDir, timeout: 60000, stdio: 'pipe' });
    logger.log({ stage: 3, step: 'compile', event: 'complete', detail: 'No errors' });
    return;
  } catch (err: any) {
    const errors = err.stdout?.toString()?.slice(0, 3000) || err.message?.slice(0, 3000) || '';
    logger.log({ stage: 3, step: 'compile', event: 'error', detail: `${errors.split('\n').length} errors` });

    // Feed errors back to fix
    await fixCompileErrors(workDir, errors, prompt, design, logger);
  }
}

async function fixCompileErrors(workDir: string, errors: string, prompt: string, design: any, logger: PipelineLogger) {
  const fixPrompt = `The following TypeScript errors occurred in a React Native (Expo Router) app.

Fix ALL errors. Return a JSON object mapping file paths to their COMPLETE corrected file contents.
Only include files that need changes.

Errors:
${errors.slice(0, 2000)}

Rules:
- Do NOT import modules that don't exist
- Every component imported must be defined
- Use @expo/vector-icons for icons
- Use @react-native-async-storage/async-storage for storage`;

  const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.openrouterApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4.1-mini',
      max_tokens: 16000,
      messages: [
        { role: 'system', content: 'You are fixing TypeScript compile errors. Return ONLY a JSON object mapping file paths to corrected file contents.' },
        { role: 'user', content: fixPrompt },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  const data = await resp.json();
  if (data.error) {
    logger.log({ stage: 3, step: 'fix', event: 'error', detail: data.error.message });
    return;
  }

  let fixContent = data.choices[0].message.content;
  fixContent = fixContent.replace(/^```(?:json)?\s*\n?/m, '').replace(/\n?```\s*$/m, '').trim();
  try {
    const fixes = JSON.parse(fixContent);
    writeCodeFiles(workDir, fixes);
    logger.log({ stage: 3, step: 'fix', event: 'complete', detail: `Fixed ${Object.keys(fixes).length} files` });

    // Track cost
    const usage = data.usage || {};
    await logger.trackTokens(usage.prompt_tokens || 0, usage.completion_tokens || 0, 0);
  } catch {
    logger.log({ stage: 3, step: 'fix', event: 'error', detail: 'Failed to parse fix response' });
  }
}
