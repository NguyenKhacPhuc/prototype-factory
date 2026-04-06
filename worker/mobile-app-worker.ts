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
      `Read specs/spec.md and create a task breakdown. List each task with dependencies. Write to specs/tasks.md.`
    );

    // Parse tasks and implement each one
    const tasksContent = existsSync(join(workDir, 'specs/tasks.md'))
      ? readFileSync(join(workDir, 'specs/tasks.md'), 'utf-8')
      : '';

    const taskCount = (tasksContent.match(/- \[/g) || []).length || 10;
    let completedTasks = 0;

    // Implement tasks (simplified — real implementation would parse tasks.md)
    for (let i = 0; i < Math.min(taskCount, 30); i++) {
      completedTasks++;
      const taskProgress = 6 + Math.floor((completedTasks / taskCount) * 4);
      await logger.updateProgress(taskProgress, 12, `Stage 3: Implementing task ${completedTasks}/${taskCount}...`);

      // Determine task requirements for skill routing
      const taskReqs = detectTaskRequirements(tasksContent, i);

      const implResult = await session.runStep(3, 'implement',
        `Implement task ${completedTasks} from specs/tasks.md. Write the code, ensure it compiles, and mark the task as done.`,
        taskReqs
      );

      // Every 5 tasks, clear history to prevent context overflow
      if (completedTasks % 5 === 0) {
        session.clearHistory();
      }
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
    execSync(`cd "${workDir}" && zip -r "${zipPath}" . -x "node_modules/*" ".git/*"`, { timeout: 30000 });

    // Upload to Supabase Storage
    const zipBuffer = readFileSync(zipPath);
    await supabase.storage
      .from('builds')
      .upload(`${jobId}.zip`, zipBuffer, { upsert: true });

    const { data: urlData } = supabase.storage
      .from('builds')
      .getPublicUrl(`${jobId}.zip`);

    await logger.markCompleted({
      framework,
      task_count: completedTasks,
      download_url: urlData.publicUrl,
      work_dir: workDir,
    });

    await logger.persist();

  } catch (err: any) {
    await logger.markFailed(err.message || 'Unknown error');
    await logger.persist();
    throw err;
  }
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
