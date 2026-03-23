import { $ } from "bun";

// Clean dist
await $`rm -rf dist`;

// Build the React app
const result = await Bun.build({
  entrypoints: ["./src/index.html"],
  outdir: "./dist",
  minify: true,
  sourcemap: "none",
  naming: {
    chunk: "[name]-[hash].[ext]",
    entry: "[name]-[hash].[ext]",
    asset: "[name]-[hash].[ext]",
  },
});

if (!result.success) {
  console.error("Build failed:");
  for (const log of result.logs) {
    console.error(log);
  }
  process.exit(1);
}

console.log(`Build succeeded: ${result.outputs.length} files`);

// Rename the HTML output to index.html
const htmlFile = result.outputs.find((o) => o.path.endsWith(".html"));
if (htmlFile) {
  await $`mv ${htmlFile.path} dist/index.html`;
}

// Copy prototypes/ to dist/prototypes/
await $`cp -r prototypes dist/prototypes`;

// Copy public/ assets to dist/ root
await $`cp -r public/. dist/`;

console.log("Build complete! Output in ./dist/");
