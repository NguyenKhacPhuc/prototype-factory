// Vercel Serverless Function: POST /api/estimate-complexity
// Proxies complexity estimation to Gemini, keeping API key server-side

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { prompt } = await req.json() as { prompt: string };
    if (!prompt) return Response.json({ error: 'prompt required' }, { status: 400 });

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) return Response.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: buildPrompt(prompt) }] }],
          generationConfig: { temperature: 0.3, responseMimeType: 'application/json' },
        }),
      }
    );

    const data = await resp.json();
    if (data.error) return Response.json({ error: data.error.message }, { status: 500 });

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) return Response.json({ error: 'Empty response' }, { status: 500 });

    return Response.json(JSON.parse(content), { headers: corsHeaders() });
  } catch (err: any) {
    return Response.json({ error: err.message || 'Estimation failed' }, { status: 500 });
  }
}

function buildPrompt(desc: string): string {
  return `You are an app complexity estimator. Analyze this app idea and score each dimension 1-5.

App: "${desc}"

Score: screens (1-5), auth (1-5), data_model (1-5), integrations (1-5), realtime (1-5), media (1-5), business_logic (1-5).

Return JSON: {"scores":{"screens":N,"auth":N,"data_model":N,"integrations":N,"realtime":N,"media":N,"business_logic":N},"weighted_score":N,"tier":"simple|standard|complex|advanced|enterprise","task_count":N,"estimated_screens":N,"key_integrations":["..."],"reasoning":"..."}`;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export const config = { runtime: 'edge' };
