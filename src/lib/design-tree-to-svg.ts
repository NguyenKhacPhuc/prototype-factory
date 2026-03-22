interface DesignNode {
  type: "frame" | "text" | "svg" | "image";
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  styles: Record<string, unknown>;
  children?: DesignNode[];
  textContent?: string;
  textStyles?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    color?: string;
    textAlign?: string;
    letterSpacing?: number;
    lineHeight?: number;
  };
  svgString?: string;
}

interface GradientStop {
  color: string;
  position: number;
}

interface DesignTree {
  appName: string;
  viewport: { width: number; height: number };
  fonts?: string[];
  root: DesignNode;
  screens?: { name: string; root: DesignNode }[];
}

let uid = 0;

function nextId(prefix: string): string {
  return `${prefix}${uid++}`;
}

function parseBorderRadius(val: unknown): number {
  if (typeof val === "number") return val;
  if (typeof val === "string") return parseFloat(val) || 0;
  return 0;
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function extractViewBox(svgStr: string): string {
  const match = svgStr.match(/viewBox="([^"]+)"/);
  return match ? `viewBox="${match[1]}"` : "";
}

function buildShadowFilter(id: string, shadow: string): string {
  const m = shadow.match(
    /(-?\d+)px\s+(-?\d+)px\s+(-?\d+)px\s+(-?\d+)px\s+(rgba?\([^)]+\)|#[0-9a-fA-F]+)/
  );
  const dx = m ? m[1] : "0";
  const dy = m ? m[2] : "2";
  const blur = m ? m[3] : "4";
  const color = m ? m[5] : "rgba(0,0,0,0.25)";
  return (
    `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%">` +
    `<feDropShadow dx="${dx}" dy="${dy}" stdDeviation="${Number(blur) / 2}" flood-color="${escapeAttr(color)}"/>` +
    `</filter>`
  );
}

function buildGradient(id: string, stops: GradientStop[]): string {
  const stopTags = stops
    .map((s) => `<stop offset="${s.position}" stop-color="${escapeAttr(s.color)}"/>`)
    .join("");
  return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stopTags}</linearGradient>`;
}

/** Extract the first color value from a potentially multi-value border-color string */
function parseBorderColor(val: string | undefined): string {
  if (!val) return "#000";
  // border-color can be "rgb(...) rgb(...) rgb(...) rgb(...)" — take first
  const match = val.match(/^(rgba?\([^)]+\)|#[0-9a-fA-F]+)/);
  return match ? match[1] : val;
}

interface ParentInfo {
  styles: Record<string, unknown>;
  width: number;
  height: number;
}

function renderNode(node: DesignNode, defs: string[], parent?: ParentInfo): string {
  const { type, x, y, width, height, styles } = node;
  const parts: string[] = [];

  parts.push(`<g transform="translate(${x},${y})">`);

  if (type === "svg" && node.svgString) {
    // Preserve original <svg> attributes (fill, stroke, etc.) but override position/size
    const openTag = node.svgString.match(/<svg[^>]*>/)?.[0] || "<svg>";
    const newTag = openTag
      .replace(/\bx="[^"]*"/, "")
      .replace(/\by="[^"]*"/, "")
      .replace(/\bwidth="[^"]*"/, `width="${width}"`)
      .replace(/\bheight="[^"]*"/, `height="${height}"`)
      .replace(/\bclass="[^"]*"/, "")
      .replace(/\bstyle="[^"]*"/, "")
      .replace(/\baria-hidden="[^"]*"/, "")
      .replace(/<svg/, `<svg x="0" y="0"`)
      .replace(/\s+/g, " ");
    const inner = node.svgString.replace(/<svg[^>]*>/, "").replace(/<\/svg>/, "");
    parts.push(newTag);
    parts.push(inner);
    parts.push("</svg>");
    parts.push("</g>");
    return parts.join("");
  }

  if (type === "text") {
    const ts = node.textStyles || {};
    const fontSize = ts.fontSize || 14;
    const fontWeight = ts.fontWeight || 400;
    const fontFamily = ts.fontFamily || "sans-serif";
    const fill = ts.color || "#000";
    const letterSpacing = ts.letterSpacing;

    // Render background rect if text node has backgroundColor or border
    const bg = styles.backgroundColor as string | undefined;
    const radius = parseBorderRadius(styles.borderRadius);
    const borderWidth = (styles.borderWidth as number) || 0;
    const borderColor = styles.borderColor as string | undefined;
    if (bg || borderWidth) {
      parts.push(
        `<rect x="0" y="0" width="${width}" height="${height}" ` +
        `rx="${radius}"` +
        (bg ? ` fill="${escapeAttr(bg)}"` : ' fill="none"') +
        (borderWidth ? ` stroke="${escapeAttr(parseBorderColor(borderColor))}" stroke-width="${borderWidth}"` : "") +
        `/>`
      );
    }

    // Padding-aware text positioning
    const pl = (styles.paddingLeft as number) || 0;
    const pr = (styles.paddingRight as number) || 0;
    const pt = (styles.paddingTop as number) || 0;
    const pb = (styles.paddingBottom as number) || 0;
    const hasPadding = pl > 0 || pr > 0 || pt > 0 || pb > 0;

    // Detect text alignment: explicit textAlign, or inherit from parent/own flex centering
    let textAlign = ts.textAlign || "left";
    if (textAlign === "left") {
      const jc = (styles.justifyContent || (parent && parent.styles.justifyContent)) as string;
      if (jc === "center") textAlign = "center";
    }
    // Text nodes with background (chips, badges, buttons, tags) should center text
    if (textAlign === "left" && (bg || borderWidth)) {
      textAlign = "center";
    }

    // Vertical position: center text within the box (accounting for padding)
    const ty = Math.round(height / 2);

    // Horizontal alignment
    let tx = pl;
    let anchor = "start";
    if (textAlign === "center") {
      tx = Math.round(width / 2);
      anchor = "middle";
    } else if (textAlign === "right") {
      tx = width - pr;
      anchor = "end";
    }

    parts.push(
      `<text x="${tx}" y="${ty}" ` +
      `dominant-baseline="central" ` +
      `text-anchor="${anchor}" ` +
      `font-family="${escapeAttr(fontFamily)}" ` +
      `font-size="${fontSize}" ` +
      `font-weight="${fontWeight}" ` +
      `fill="${escapeAttr(fill)}"` +
      (letterSpacing ? ` letter-spacing="${letterSpacing}"` : "") +
      `>${escapeXml(node.textContent || "")}</text>`
    );
    parts.push("</g>");
    return parts.join("");
  }

  // --- frame ---
  const bg = styles.backgroundColor as string | undefined;
  const gradient = styles.backgroundGradient as GradientStop[] | undefined;
  const radius = parseBorderRadius(styles.borderRadius);
  const borderWidth = (styles.borderWidth as number) || 0;
  const borderColor = styles.borderColor as string | undefined;
  const boxShadow = styles.boxShadow as string | undefined;

  let filterAttr = "";
  if (boxShadow) {
    const fid = nextId("sh");
    defs.push(buildShadowFilter(fid, boxShadow));
    filterAttr = ` filter="url(#${fid})"`;
  }

  // Gradient fill
  let gradFill = "";
  if (gradient && gradient.length > 0) {
    const gid = nextId("gr");
    defs.push(buildGradient(gid, gradient));
    gradFill = `url(#${gid})`;
  }

  // Clipping for overflow: hidden
  const hasClip = styles.overflow === "hidden";
  const clipId = hasClip ? nextId("cl") : "";
  if (hasClip) {
    defs.push(
      `<clipPath id="${clipId}">` +
      `<rect x="0" y="0" width="${width}" height="${height}" rx="${radius}"/>` +
      `</clipPath>`
    );
  }

  if (hasClip) {
    parts.push(`<g clip-path="url(#${clipId})">`);
  }

  // Determine fill: gradient > backgroundColor > none
  const fillValue = gradFill || (bg ? escapeAttr(bg) : "");
  const hasFill = fillValue || borderWidth;

  if (hasFill) {
    parts.push(
      `<rect x="0" y="0" width="${width}" height="${height}" ` +
      `rx="${radius}"` +
      (fillValue ? ` fill="${fillValue}"` : ' fill="none"') +
      (borderWidth ? ` stroke="${escapeAttr(parseBorderColor(borderColor))}" stroke-width="${borderWidth}"` : "") +
      filterAttr +
      `/>`
    );
  }

  // If we have both bg and gradient, draw bg first then gradient on top
  if (bg && gradFill) {
    parts.push(
      `<rect x="0" y="0" width="${width}" height="${height}" ` +
      `rx="${radius}" fill="${escapeAttr(bg)}"/>`
    );
    parts.push(
      `<rect x="0" y="0" width="${width}" height="${height}" ` +
      `rx="${radius}" fill="${gradFill}"/>`
    );
  }

  if (node.children && node.children.length > 0) {
    const parentInfo: ParentInfo = { styles, width, height };
    const isFlexRow = styles.display === "flex" && styles.flexDirection === "row";
    const jc = styles.justifyContent as string | undefined;
    const ai = styles.alignItems as string | undefined;
    const gap = (styles.gap as number) || 0;

    // Check if we need to re-layout flex-row children
    // (text nodes from the walker often have width = parent width, breaking positioning)
    const needsRelayout = isFlexRow && jc === "center" && node.children.some(
      (c) => c.type === "text" && c.width === width && node.children!.length > 1
    );

    if (needsRelayout) {
      // Estimate real widths for text nodes, keep actual widths for others
      const childWidths = node.children.map((c) => {
        if (c.type === "text") {
          const fs = c.textStyles?.fontSize || 14;
          return Math.round((c.textContent?.length || 0) * fs * 0.6);
        }
        return c.width;
      });
      const totalW = childWidths.reduce((a, b) => a + b, 0) + gap * (node.children.length - 1);
      let cx = Math.round((width - totalW) / 2);

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const cw = childWidths[i];
        // Override child position for this flex layout
        const overridden: DesignNode = {
          ...child,
          x: cx,
          y: ai === "center" ? Math.round((height - child.height) / 2) : child.y,
          width: cw,
        };
        parts.push(renderNode(overridden, defs, parentInfo));
        cx += cw + gap;
      }
    } else if (isFlexRow && ai === "center") {
      // Vertically center children in flex-row with alignItems:center
      for (const child of node.children) {
        const centered: DesignNode = {
          ...child,
          y: Math.round((height - child.height) / 2),
        };
        parts.push(renderNode(centered, defs, parentInfo));
      }
    } else if (!isFlexRow && styles.display === "flex" && ai === "center") {
      // Flex-column with alignItems:center — horizontally center children
      for (const child of node.children) {
        const centered: DesignNode = {
          ...child,
          x: Math.round((width - child.width) / 2),
        };
        parts.push(renderNode(centered, defs, parentInfo));
      }
    } else {
      for (const child of node.children) {
        parts.push(renderNode(child, defs, parentInfo));
      }
    }
  }

  if (hasClip) {
    parts.push("</g>");
  }

  parts.push("</g>");
  return parts.join("");
}

export function designTreeToSvg(tree: DesignTree): string {
  uid = 0;
  const defs: string[] = [];
  const gap = 40;
  const vp = tree.viewport;

  const screenRoots =
    tree.screens && tree.screens.length > 0
      ? tree.screens.map((s) => s.root)
      : [tree.root];

  const totalWidth = screenRoots.length * vp.width + (screenRoots.length - 1) * gap;
  const totalHeight = vp.height;

  const bodyParts: string[] = [];
  screenRoots.forEach((root, i) => {
    const offsetX = i * (vp.width + gap);
    bodyParts.push(`<g transform="translate(${offsetX},0)">`);
    bodyParts.push(renderNode(root, defs));
    bodyParts.push("</g>");
  });

  const fontImport = tree.fonts
    ? tree.fonts
        .flatMap((f) => f.split(",").map((s) => s.trim()))
        .filter(Boolean)
        .map((f) => `@import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(f)}&amp;display=swap');`)
        .join("\n    ")
    : "";

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">`,
    `  <defs>`,
    fontImport ? `    <style>${fontImport}</style>` : "",
    ...defs.map((d) => `    ${d}`),
    `  </defs>`,
    ...bodyParts,
    `</svg>`,
  ].join("\n");
}
