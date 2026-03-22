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
