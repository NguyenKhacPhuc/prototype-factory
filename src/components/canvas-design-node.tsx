// Design tree hit-testing utilities (Figma-style)
// No DOM rendering — just math against the tree structure.

export interface DesignNode {
  type: string;
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

export interface HitResult {
  node: DesignNode;
  path: string;
  absX: number;
  absY: number;
}

/**
 * Walk the design tree and find the deepest node containing (px, py).
 * Coordinates are relative to the root node's origin.
 */
export function hitTest(
  node: DesignNode,
  px: number,
  py: number,
  path = "root",
  offsetX = 0,
  offsetY = 0
): HitResult | null {
  const ax = offsetX + node.x;
  const ay = offsetY + node.y;

  // Check if point is inside this node
  if (px < ax || py < ay || px > ax + node.width || py > ay + node.height) {
    return null;
  }

  // Check children in reverse order (last child is visually on top)
  if (node.children) {
    for (let i = node.children.length - 1; i >= 0; i--) {
      const child = node.children[i];
      const result = hitTest(child, px, py, `${path}.${i}`, ax, ay);
      if (result) return result;
    }
  }

  return { node, path, absX: ax, absY: ay };
}

/**
 * Find a node by its path string (e.g. "root.0.2.1")
 */
export function getNodeByPath(root: DesignNode, path: string): { node: DesignNode; absX: number; absY: number } | null {
  const parts = path.split(".");
  let current = root;
  let ax = root.x;
  let ay = root.y;

  for (let i = 1; i < parts.length; i++) {
    const idx = parseInt(parts[i]);
    if (!current.children || !current.children[idx]) return null;
    const parent = current;
    current = current.children[idx];
    ax += current.x;
    ay += current.y;
  }

  return { node: current, absX: ax, absY: ay };
}
