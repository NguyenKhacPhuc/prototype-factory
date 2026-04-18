import { config } from './config';
import { PipelineLogger } from './pipeline-logger';

interface GenerateResult {
  content: string;
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
}

const MOCK_APP_TSX = `const { useState } = React;
function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const t = { bg: '#FAFAFA', text: '#111', primary: '#2979FF', surface: '#FFF', muted: '#888' };
  const HomeScreen = () => React.createElement('div', { style: { padding: 20 } },
    React.createElement('h1', { style: { fontSize: 34, fontWeight: 800, color: t.text } }, 'Home'),
    React.createElement('p', { style: { color: t.muted } }, 'Mock prototype generated in test mode.')
  );
  const screens = { home: HomeScreen };
  return React.createElement('div', { style: { width: 375, height: 812, background: t.bg, borderRadius: 44, overflow: 'hidden', margin: '20px auto', fontFamily: '-apple-system, sans-serif' } },
    React.createElement(screens[activeScreen])
  );
}`;

export class ClaudeClient {
  private logger: PipelineLogger;

  constructor(logger: PipelineLogger) {
    this.logger = logger;
  }

  async generate(systemPrompt: string, userPrompt: string, model: string = 'anthropic/claude-opus-4-6'): Promise<GenerateResult> {
    if (config.mockMode) {
      await new Promise(r => setTimeout(r, 2000));
      this.logger.log({ stage: 0, step: 'mock', event: 'api_call', model: 'mock', input_tokens: 0, output_tokens: 0, cached_tokens: 0, duration_ms: 2000 });
      return { content: MOCK_APP_TSX, inputTokens: 0, outputTokens: 0, cachedTokens: 0 };
    }

    const start = Date.now();

    // Use OpenRouter for parallel support + multi-model routing
    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.openrouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://appdex-ai.vercel.app',
        'X-Title': 'Appdex AI',
      },
      body: JSON.stringify({
        model,
        max_tokens: 30000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    const text = await resp.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Failed to parse OpenRouter response (status ${resp.status}): ${text.slice(0, 200)}`);
    }
    if (data.error) throw new Error(`OpenRouter: ${data.error.message || JSON.stringify(data.error).slice(0, 200)}`);

    const duration = Date.now() - start;
    const usage = data.usage || {};
    const inputTokens = usage.prompt_tokens || 0;
    const outputTokens = usage.completion_tokens || 0;

    this.logger.log({
      stage: 0, step: 'generate', event: 'api_call',
      model, input_tokens: inputTokens, output_tokens: outputTokens,
      cached_tokens: 0, duration_ms: duration,
    });

    await this.logger.trackTokens(inputTokens, outputTokens, 0);

    let content = data.choices[0].message.content;
    // Strip markdown fences if present
    content = content.replace(/^```(?:tsx?|jsx?|javascript)?\s*\n?/m, '').replace(/\n?```\s*$/m, '').trim();

    return { content, inputTokens, outputTokens, cachedTokens: 0 };
  }
}
