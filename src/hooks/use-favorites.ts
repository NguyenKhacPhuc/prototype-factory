import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

interface Favorite {
  id: string;
  prototype_folder: string;
  created_at: string;
}

let cachedFavorites: Favorite[] = [];
let cachedUserId: string | null = null;
const listeners = new Set<(favs: Favorite[]) => void>();

function notifyAll(favs: Favorite[]) {
  cachedFavorites = favs;
  for (const fn of listeners) fn(favs);
}

export function useFavorites(userId: string | null) {
  const [favorites, setFavorites] = useState<Favorite[]>(
    userId === cachedUserId ? cachedFavorites : []
  );

  useEffect(() => {
    if (!userId) {
      cachedUserId = null;
      cachedFavorites = [];
      setFavorites([]);
      return;
    }
    const handler = (favs: Favorite[]) => setFavorites(favs);
    listeners.add(handler);

    // Fetch if user changed
    if (userId !== cachedUserId) {
      cachedUserId = userId;
      supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          if (data) notifyAll(data);
        });
    }

    return () => { listeners.delete(handler); };
  }, [userId]);

  const isFavorite = useCallback(
    (folder: string) => favorites.some((f) => f.prototype_folder === folder),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (folder: string) => {
      if (!userId) return;
      const existing = cachedFavorites.find((f) => f.prototype_folder === folder);
      if (existing) {
        await supabase.from("favorites").delete().eq("id", existing.id);
        const updated = cachedFavorites.filter((f) => f.id !== existing.id);
        notifyAll(updated);
      } else {
        const { data } = await supabase
          .from("favorites")
          .insert({ user_id: userId, prototype_folder: folder })
          .select()
          .single();
        if (data) notifyAll([data, ...cachedFavorites]);
      }
    },
    [userId]
  );

  return { favorites, isFavorite, toggleFavorite };
}
