import { useState, useEffect } from "react";
import type { Prototype } from "../types";

let cachedPrototypes: Prototype[] | null = null;

export function usePrototypes() {
  const [prototypes, setPrototypes] = useState<Prototype[]>(cachedPrototypes || []);
  const [loading, setLoading] = useState(!cachedPrototypes);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedPrototypes) return;
    fetch("/prototypes/manifest.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load prototypes");
        return res.json();
      })
      .then((data: Prototype[]) => {
        cachedPrototypes = data;
        setPrototypes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { prototypes, loading, error };
}

export function getCategories(prototypes: Prototype[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of prototypes) {
    if (p.category) {
      counts.set(p.category, (counts.get(p.category) || 0) + 1);
    }
  }
  return Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}

export function searchPrototypes(
  prototypes: Prototype[],
  query: string,
  category: string | null,
  sortBy: "date" | "name"
): Prototype[] {
  let filtered = prototypes;

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.appName.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.features.some((f) => (typeof f === 'string' ? f : (f as any).title + ' ' + (f as any).detail).toLowerCase().includes(q))
    );
  }

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (sortBy === "name") {
    filtered = [...filtered].sort((a, b) => a.appName.localeCompare(b.appName));
  }
  // "date" sort preserves manifest order (already sorted newest-first by build-manifest.sh)

  return filtered;
}
