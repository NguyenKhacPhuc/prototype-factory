/**
 * Experimental: Convert design-tree.json to Figma clipboard HTML using fig-kiwi.
 *
 * fig-kiwi's writeHTMLMessage requires a valid Kiwi schema, which is internal
 * to Figma and not publicly documented. Instead, we generate a minimal SVG and
 * wrap it in Figma's clipboard HTML format so Figma interprets it as a pasted
 * SVG (which Figma natively vectorizes on paste).
 */

import { designTreeToSvg } from "./design-tree-to-svg";

interface DesignTree {
  appName: string;
  viewport: { width: number; height: number };
  fonts?: string[];
  root: unknown;
  screens?: { name: string; root: unknown }[];
}

/**
 * Build clipboard HTML that Figma will accept as an SVG paste.
 * Figma recognizes `<svg>` in `text/html` clipboard data and auto-converts
 * it to editable vector nodes.
 */
export function designTreeToFigmaClipboardHtml(tree: DesignTree): string {
  const svg = designTreeToSvg(tree as Parameters<typeof designTreeToSvg>[0]);
  // Figma clipboard expects SVG wrapped in an HTML body
  return `<html><body>${svg}</body></html>`;
}

/**
 * Copy the Figma clipboard HTML to the clipboard.
 * Uses ClipboardItem with text/html MIME type.
 */
export async function copyFigmaClipboard(tree: DesignTree): Promise<void> {
  const html = designTreeToFigmaClipboardHtml(tree);
  const blob = new Blob([html], { type: "text/html" });
  await navigator.clipboard.write([
    new ClipboardItem({ "text/html": blob }),
  ]);
}
