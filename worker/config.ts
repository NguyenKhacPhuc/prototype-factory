export const config = {
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY!,
  anthropicApiKey: process.env.WORKER_ANTHROPIC_KEY || process.env.ANTHROPIC_API_KEY || '',
  geminiApiKey: process.env.GEMINI_API_KEY!,
  mockMode: process.env.MOCK_MODE === 'true',
  pollIntervalMs: 3000,
  maxCostCentsPerJob: 10000,       // $100 max per job
  maxActiveJobsPerUser: 3,
  maxRetriesPerTask: 3,
  repoDir: process.env.REPO_DIR || '/Users/steve/Documents/prototype-factory',
  skillsDir: process.env.SKILLS_DIR || '/Users/steve/Documents/mobile-app-agent-system/skills',
  uiuxScript: process.env.UIUX_SCRIPT || `${process.env.HOME}/.claude/commands/skills/ui-ux-pro-max/scripts/search.py`,
};
