import index from "./src/index.html";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const PROTOTYPES_DIR = "./prototypes";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

Bun.serve({
  port: 3000,
  routes: {
    "/": index,
    "/gallery": index,
    "/gallery/*": index,
    "/about": index,
    "/create": index,
    "/canvas": index,
    "/styles": index,
    "/prototype/*": index,
    "/profile": index,
    "/admin": index,
    "/auth/callback": index,
  },
  static: {
    "/prototypes/*": undefined,
  },
  async fetch(req) {
    const url = new URL(req.url);
    const { pathname } = url;

    // CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // API: list prototypes with design-tree.json
    if (pathname === "/api/prototypes" && req.method === "GET") {
      try {
        const folders = await readdir(PROTOTYPES_DIR);
        const results: { slug: string; appName: string }[] = [];
        for (const folder of folders) {
          const treePath = join(PROTOTYPES_DIR, folder, "design-tree.json");
          const treeFile = Bun.file(treePath);
          if (await treeFile.exists()) {
            try {
              const tree = await treeFile.json();
              results.push({ slug: folder, appName: tree.appName || folder });
            } catch {
              results.push({ slug: folder, appName: folder });
            }
          }
        }
        return jsonResponse(results);
      } catch {
        return jsonResponse({ error: "Failed to scan prototypes" }, 500);
      }
    }

    // API: get design-tree.json for a specific prototype
    if (pathname.startsWith("/api/design-tree/") && req.method === "GET") {
      const slug = pathname.replace("/api/design-tree/", "");
      const treePath = join(PROTOTYPES_DIR, slug, "design-tree.json");
      const treeFile = Bun.file(treePath);
      if (await treeFile.exists()) {
        const data = await treeFile.json();
        return jsonResponse(data);
      }
      return jsonResponse({ error: "Design tree not found" }, 404);
    }

    // API: save figma link for a prototype
    if (pathname === "/api/figma-link" && req.method === "POST") {
      try {
        const body = (await req.json()) as { slug: string; figmaUrl: string };
        if (!body.slug || !body.figmaUrl) {
          return jsonResponse({ error: "slug and figmaUrl required" }, 400);
        }
        const linkPath = join(PROTOTYPES_DIR, body.slug, "figma-link.json");
        await Bun.write(linkPath, JSON.stringify({ figmaUrl: body.figmaUrl }, null, 2));
        return jsonResponse({ ok: true });
      } catch {
        return jsonResponse({ error: "Failed to save figma link" }, 500);
      }
    }

    // API: estimate app complexity via Gemini (server-side, keeps API key safe)
    if (pathname === "/api/estimate-complexity" && req.method === "POST") {
      try {
        const { prompt } = (await req.json()) as { prompt: string };
        if (!prompt) return jsonResponse({ error: "prompt required" }, 400);

        const geminiKey = process.env.GEMINI_API_KEY;
        if (!geminiKey) return jsonResponse({ error: "GEMINI_API_KEY not configured" }, 500);

        const geminiResp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `You are an app complexity estimator. Analyze this app idea and score each dimension 1-5.\n\nApp: "${prompt}"\n\nScore: screens (1-5), auth (1-5), data_model (1-5), integrations (1-5), realtime (1-5), media (1-5), business_logic (1-5).\n\nReturn JSON: {"scores":{"screens":N,"auth":N,"data_model":N,"integrations":N,"realtime":N,"media":N,"business_logic":N},"weighted_score":N,"tier":"simple|standard|complex|advanced|enterprise","task_count":N,"estimated_screens":N,"key_integrations":["..."],"reasoning":"..."}` }] }],
              generationConfig: { temperature: 0.3, responseMimeType: "application/json" },
            }),
          }
        );

        const data = await geminiResp.json();
        if (data.error) return jsonResponse({ error: data.error.message }, 500);

        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!content) return jsonResponse({ error: "Empty response from Gemini" }, 500);

        return jsonResponse(JSON.parse(content));
      } catch (err: any) {
        return jsonResponse({ error: err.message || "Estimation failed" }, 500);
      }
    }

    // Serve static files from prototypes/ and other static dirs
    const filePath = `.${pathname}`;
    const file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }
    // Fallback to SPA index for unknown routes
    return new Response(Bun.file("./src/index.html"), {
      headers: { "content-type": "text/html" },
    });
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log("Dev server running at http://localhost:3000");
