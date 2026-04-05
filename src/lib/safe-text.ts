/** Safely convert any value to a renderable string.
 *  Handles cases where Gemini returns objects instead of strings. */
export function safeText(val: unknown): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (Array.isArray(val)) return val.map(safeText).join(', ');
  if (typeof val === 'object') {
    // Try common field names
    const obj = val as Record<string, unknown>;
    if (obj.title && obj.detail) return `${obj.title}: ${obj.detail}`;
    if (obj.title) return String(obj.title);
    if (obj.name) return String(obj.name);
    if (obj.text) return String(obj.text);
    if (obj.demographics) return String(obj.demographics);
    if (obj.model) return String(obj.model);
    // Fallback: join all string values
    const vals = Object.values(obj).filter(v => typeof v === 'string');
    if (vals.length) return vals.join('. ');
    return JSON.stringify(val);
  }
  return String(val);
}
