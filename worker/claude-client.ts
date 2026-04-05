import Anthropic from '@anthropic-ai/sdk';
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
  private client: Anthropic | null;
  private logger: PipelineLogger;

  constructor(logger: PipelineLogger) {
    this.logger = logger;
    this.client = config.mockMode ? null : new Anthropic({ apiKey: config.anthropicApiKey });
  }

  async generate(systemPrompt: string, userPrompt: string, model: string = 'claude-opus-4-6'): Promise<GenerateResult> {
    if (config.mockMode) {
      await new Promise(r => setTimeout(r, 2000));
      this.logger.log({ stage: 0, step: 'mock', event: 'api_call', model: 'mock', input_tokens: 0, output_tokens: 0, cached_tokens: 0, duration_ms: 2000 });
      return { content: MOCK_APP_TSX, inputTokens: 0, outputTokens: 0, cachedTokens: 0 };
    }

    const start = Date.now();
    const response = await this.client!.messages.create({
      model,
      max_tokens: 16000,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' },
        }
      ],
      messages: [{ role: 'user', content: userPrompt }],
    });

    const duration = Date.now() - start;
    const usage = response.usage;
    const inputTokens = usage.input_tokens;
    const outputTokens = usage.output_tokens;
    const cachedTokens = (usage as any).cache_read_input_tokens ?? 0;

    this.logger.log({
      stage: 0, step: 'generate', event: 'api_call',
      model, input_tokens: inputTokens, output_tokens: outputTokens,
      cached_tokens: cachedTokens, duration_ms: duration,
    });

    await this.logger.trackTokens(inputTokens, outputTokens, cachedTokens);

    const content = response.content
      .filter(b => b.type === 'text')
      .map(b => (b as any).text)
      .join('');

    return { content, inputTokens, outputTokens, cachedTokens };
  }
}
