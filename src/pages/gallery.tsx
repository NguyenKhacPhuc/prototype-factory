import React, { useState, useMemo } from "react";
import type { Prototype } from "../types";
import { PrototypeCard } from "../components/prototype-card";
import { SearchBar } from "../components/search-bar";
import { getCategories, searchPrototypes } from "../hooks/use-prototypes";

interface Props {
  prototypes: Prototype[];
  navigate: (to: string) => void;
  initialCategory?: string | null;
}

export function Gallery({ prototypes, navigate, initialCategory }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(initialCategory || null);
  const [sortBy, setSortBy] = useState<"date" | "name">("date");

  const categories = useMemo(() => getCategories(prototypes), [prototypes]);
  const filtered = useMemo(() => searchPrototypes(prototypes, query, category, sortBy), [prototypes, query, category, sortBy]);

  return (
    <div className="gallery-page">
      <div className="gallery-top">
        <div className="gallery-header">
          <h1>Explore</h1>
          <p className="gallery-subtitle">{prototypes.length} AI-generated prototypes</p>
        </div>
        <div className="gallery-search">
          <SearchBar value={query} onChange={setQuery} count={prototypes.length} />
        </div>
      </div>

      <div className="gallery-filters">
        <button
          className={`gallery-pill ${!category ? "active" : ""}`}
          onClick={() => setCategory(null)}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.name}
            className={`gallery-pill ${category === c.name ? "active" : ""}`}
            onClick={() => setCategory(category === c.name ? null : c.name)}
          >
            {c.name}
          </button>
        ))}
        <div className="gallery-sort">
          <button className={`gallery-pill-sm ${sortBy === "date" ? "active" : ""}`} onClick={() => setSortBy("date")}>
            Newest
          </button>
          <button className={`gallery-pill-sm ${sortBy === "name" ? "active" : ""}`} onClick={() => setSortBy("name")}>
            A-Z
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No prototypes match your search.</p>
          <button className="btn-ghost" onClick={() => { setQuery(""); setCategory(null); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="shots-grid">
          {filtered.map((p) => (
            <PrototypeCard key={p.folder} prototype={p} navigate={navigate} />
          ))}
        </div>
      )}
    </div>
  );
}
