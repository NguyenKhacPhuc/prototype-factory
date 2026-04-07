import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { config } from './config';
import { SkillRouter } from './skill-router';
import { SessionManager } from './session-manager';
import { PipelineLogger } from './pipeline-logger';
import { estimateComplexity, getPrice } from './complexity-estimator';
import { createClient } from '@supabase/supabase-js';

import { config as appConfig } from './config';
const SKILLS_DIR = appConfig.skillsDir;

interface MobileAppInput {
  prompt: string;
  framework?: 'flutter' | 'react-native' | 'kmp';
  prototype_folder?: string; // if building from existing prototype
}

export async function runMobileAppJob(jobId: string, input: MobileAppInput) {
  const logger = new PipelineLogger(jobId);
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

  const router = new SkillRouter(SKILLS_DIR);
  const framework = input.framework || 'flutter';
  router.setFramework(framework);

  const workDir = `/tmp/builds/${jobId}`;
  mkdirSync(workDir, { recursive: true });
  mkdirSync(join(workDir, 'specs'), { recursive: true });

  const session = new SessionManager(router, logger, workDir);

  try {
    await logger.markStarted();

    // Load existing idea if building from prototype
    let ideaContext = '';
    if (input.prototype_folder) {
      const ideaPath = join(config.repoDir, 'prototypes', input.prototype_folder, 'idea.json');
      if (existsSync(ideaPath)) {
        ideaContext = `\n\nExisting app concept:\n${readFileSync(ideaPath, 'utf-8')}`;
      }
    }

    // === STAGE 0: IDEATION ===
    await logger.updateProgress(1, 12, 'Stage 0: Generating app specification...');

    const constitutionResult = await session.runStep(0, 'constitution',
      `Create a constitution (core principles and values) for this app idea:\n\n"${input.prompt}"${ideaContext}\n\nWrite the constitution to specs/constitution.md.`
    );

    await logger.updateProgress(2, 12, 'Stage 0: Researching and specifying features...');

    const specResult = await session.runStep(0, 'specify',
      `Based on the constitution in specs/constitution.md, create a detailed specification for this app. Include: MVP features, user stories, framework recommendation (${framework}). Write to specs/spec.md.`
    );

    session.clearHistory();

    // === STAGE 1: DESIGN ===
    await logger.updateProgress(3, 12, 'Stage 1: Generating design system...');

    const designResult = await session.runStep(1, 'design',
      `Read specs/spec.md and create a professional design system. Generate design tokens (colors, fonts, spacing) and write to specs/design-tokens.json. Also describe the visual direction in specs/design-spec.json.`
    );

    await logger.updateProgress(4, 12, 'Stage 1: Creating wireframes and mockups...');

    const mockupResult = await session.runStep(1, 'mockup',
      `Based on the design tokens in specs/design-tokens.json, create wireframe descriptions for each screen. Write screen inventory to specs/screens.md.`
    );

    session.clearHistory();

    // === STAGE 2: SCAFFOLD ===
    await logger.updateProgress(5, 12, 'Stage 2: Scaffolding project structure...');

    const scaffoldResult = await session.runStep(2, 'scaffold',
      `Initialize a ${framework} project based on specs/spec.md and specs/design-tokens.json. Set up the project structure, dependencies, and configuration. Framework: ${framework}.`
    );

    session.clearHistory();

    // === STAGE 3: IMPLEMENT ===
    await logger.updateProgress(6, 12, 'Stage 3: Breaking down tasks...');

    const tasksResult = await session.runStep(3, 'plan',
      `Read specs/spec.md and create a task breakdown. IMPORTANT: Keep it to 8-12 tasks maximum. Group related work into single tasks (e.g. "Implement all screens" not one task per screen). Write to specs/tasks.md.`
    );

    // Parse tasks and implement each one
    const tasksContent = existsSync(join(workDir, 'specs/tasks.md'))
      ? readFileSync(join(workDir, 'specs/tasks.md'), 'utf-8')
      : '';

    // Cap tasks to 15 max — Claude tends to over-decompose
    const rawTaskCount = (tasksContent.match(/- \[/g) || []).length || 10;
    const taskCount = Math.min(rawTaskCount, 15);
    let completedTasks = 0;

    if (rawTaskCount > 15) {
      logger.log({ stage: 3, step: 'plan', event: 'complete', detail: `Capped tasks from ${rawTaskCount} to ${taskCount}` });
    }

    // Batch tasks (5 at a time) to reduce API calls and cost
    const BATCH_SIZE = 5;
    const totalBatches = Math.ceil(taskCount / BATCH_SIZE);

    for (let batch = 0; batch < totalBatches; batch++) {
      const batchStart = batch * BATCH_SIZE + 1;
      const batchEnd = Math.min(batchStart + BATCH_SIZE - 1, taskCount);
      completedTasks = batchEnd;

      const taskProgress = 6 + Math.floor((completedTasks / taskCount) * 4);
      await logger.updateProgress(taskProgress, 12, `Stage 3: Implementing tasks ${batchStart}-${batchEnd}/${taskCount}...`);

      const taskReqs = detectTaskRequirements(tasksContent, batch);

      const implResult = await session.runStep(3, 'implement',
        `Implement tasks ${batchStart} through ${batchEnd} from specs/tasks.md. For each task: read the requirement, write the code files, ensure they integrate with existing code. Mark each task done when complete.`,
        taskReqs
      );

      // Clear history after every batch to prevent tool_use/tool_result desync
      session.clearHistory();
    }

    session.clearHistory();

    // === STAGE 4: SHIP ===
    await logger.updateProgress(11, 12, 'Stage 4: Building release...');

    const buildResult = await session.runStep(4, 'build',
      `Prepare the app for release. Create build configurations, generate store listing metadata, and write release notes to specs/release-notes.md.`
    );

    await logger.updateProgress(12, 12, 'Packaging output...');

    // Zip the output
    const { execSync } = await import('child_process');
    const zipPath = `/tmp/builds/${jobId}.zip`;
    execSync(`cd "${workDir}" && zip -r "${zipPath}" . -x "node_modules/*" ".git/*"`, { timeout: 30000, maxBuffer: 10 * 1024 * 1024, stdio: 'pipe' });

    // Upload to Supabase Storage
    const zipBuffer = readFileSync(zipPath);
    await supabase.storage
      .from('builds')
      .upload(`${jobId}.zip`, zipBuffer, { upsert: true });

    const { data: urlData } = supabase.storage
      .from('builds')
      .getPublicUrl(`${jobId}.zip`);

    // Generate Expo preview URL for instant device testing
    let expoUrl = '';
    if (framework === 'react-native') {
      try {
        await logger.updateProgress(12, 13, 'Setting up Expo preview...');
        expoUrl = await setupExpoPreview(workDir, logger);
      } catch (err: any) {
        logger.log({ stage: 4, step: 'expo', event: 'error', detail: err.message?.slice(0, 200) });
      }
    }

    await logger.markCompleted({
      framework,
      task_count: completedTasks,
      download_url: urlData.publicUrl,
      expo_url: expoUrl,
      work_dir: workDir,
    });

    await logger.persist();

  } catch (err: any) {
    await logger.markFailed(err.message || 'Unknown error');
    await logger.persist();
    throw err;
  }
}

async function setupExpoPreview(workDir: string, logger: PipelineLogger): Promise<string> {
  const { execSync } = await import('child_process');

  // Check if this is an Expo project
  const packageJson = join(workDir, 'package.json');
  if (!existsSync(packageJson)) return '';

  const pkg = JSON.parse(readFileSync(packageJson, 'utf-8'));
  if (!pkg.dependencies?.expo) return '';

  // Install dependencies
  logger.log({ stage: 4, step: 'expo', event: 'start', detail: 'Installing Expo dependencies...' });
  execSync('npm install', { cwd: workDir, timeout: 120000, stdio: 'pipe' });

  // Publish to EAS Update for shareable preview URL
  // This creates a URL like: exp://u.expo.dev/update/xxxx
  try {
    // Use expo-cli to publish an update
    const result = execSync('npx eas-cli@latest update --branch preview --message "AI-generated build" --non-interactive 2>&1 || true', {
      cwd: workDir,
      timeout: 180000,
      stdio: 'pipe',
      env: { ...process.env, EXPO_TOKEN: process.env.EXPO_TOKEN || '' },
    }).toString();

    // Extract the URL from output
    const urlMatch = result.match(/https:\/\/expo\.dev\/.*?(?=\s|$)/);
    if (urlMatch) {
      logger.log({ stage: 4, step: 'expo', event: 'complete', detail: urlMatch[0] });
      return urlMatch[0];
    }
  } catch {
    // EAS not configured — fall back to local tunnel instructions
  }

  // Fallback: generate a QR code data URL for expo start --tunnel
  // The user would need to run this locally after downloading
  const expoStartCmd = `cd "${workDir}" && npx expo start --tunnel`;
  logger.log({ stage: 4, step: 'expo', event: 'complete', detail: 'Local: ' + expoStartCmd });

  return `local://${workDir}`;
}

function detectTaskRequirements(tasksContent: string, taskIndex: number): string[] {
  const reqs: string[] = [];
  const lower = tasksContent.toLowerCase();

  // Simple keyword detection
  if (lower.includes('payment') || lower.includes('purchase') || lower.includes('subscription')) reqs.push('iap');
  if (lower.includes('admob') || lower.includes('advertisement')) reqs.push('ads');
  if (lower.includes('icon') || lower.includes('font') || lower.includes('asset')) reqs.push('assets');
  if (lower.includes('theme') || lower.includes('design') || lower.includes('ui component')) reqs.push('ui');

  return reqs;
}
