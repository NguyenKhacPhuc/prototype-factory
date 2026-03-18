import React from "react";

interface Props {
  categories: { name: string; count: number }[];
  selected: string | null;
  onSelect: (category: string | null) => void;
  sortBy: "date" | "name";
  onSort: (sort: "date" | "name") => void;
}

export function FilterBar({ categories, selected, onSelect, sortBy, onSort }: Props) {
  return (
    <div className="filter-bar">
      <div className="filter-tags">
        <button className={`filter-tag ${!selected ? "active" : ""}`} onClick={() => onSelect(null)}>
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.name}
            className={`filter-tag ${selected === c.name ? "active" : ""}`}
            onClick={() => onSelect(selected === c.name ? null : c.name)}
          >
            {c.name}
            <span className="filter-count">{c.count}</span>
          </button>
        ))}
      </div>
      <div className="sort-controls">
        <button className={`sort-btn ${sortBy === "date" ? "active" : ""}`} onClick={() => onSort("date")}>
          Newest
        </button>
        <button className={`sort-btn ${sortBy === "name" ? "active" : ""}`} onClick={() => onSort("name")}>
          A-Z
        </button>
      </div>
    </div>
  );
}
