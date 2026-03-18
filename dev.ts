import index from "./src/index.html";

Bun.serve({
  port: 3000,
  routes: {
    "/": index,
    "/gallery": index,
    "/gallery/*": index,
    "/about": index,
    "/prototype/*": index,
  },
  static: {
    "/prototypes/*": undefined,
  },
  async fetch(req) {
    // Serve static files from prototypes/ and other static dirs
    const url = new URL(req.url);
    const filePath = `.${url.pathname}`;
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
