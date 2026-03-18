import React, { useState, useMemo } from "react";
import type { Prototype } from "../types";
import { PrototypeCard } from "../components/prototype-card";
import { SearchBar } from "../components/search-bar";
import { FilterBar } from "../components/filter-bar";
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
      <div className="gallery-header">
        <h1>Prototype Gallery</h1>
        <p>{prototypes.length} AI-generated app prototypes</p>
      </div>
      <div className="gallery-controls">
        <SearchBar value={query} onChange={setQuery} count={prototypes.length} />
        <FilterBar categories={categories} selected={category} onSelect={setCategory} sortBy={sortBy} onSort={setSortBy} />
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No prototypes match your search.</p>
          <button className="btn-ghost" onClick={() => { setQuery(""); setCategory(null); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="results-count">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
          <div className="proto-grid">
            {filtered.map((p) => (
              <PrototypeCard key={p.folder} prototype={p} navigate={navigate} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
