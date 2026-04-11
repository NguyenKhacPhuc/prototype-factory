// Vercel Edge Function: POST /api/paypal-capture-order
// Captures payment after user approves

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders() });
  if (req.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405 });

  const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
  const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
  const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';
  const BASE_URL = PAYPAL_MODE === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    return Response.json({ error: 'PayPal not configured' }, { status: 500 });
  }

  try {
    const { orderID } = await req.json() as { orderID: string };

    // Get access token
    const tokenResp = await fetch(`${BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    const { access_token } = await tokenResp.json();

    // Capture order
    const captureResp = await fetch(`${BASE_URL}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    const captureData = await captureResp.json();
    return Response.json(captureData, { headers: corsHeaders() });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

function corsHeaders() {
  return { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
}

export const config = { runtime: 'edge' };
