"use client";

import { useMemo, useState } from "react";

import { EXPLORE_ARTWORKS } from "../data";
import type {
  ExploreArtwork,
  ExploreFiltersState,
  ExploreSortOption,
} from "../types";

const DEFAULT_FILTERS: ExploreFiltersState = {
  query: "",
  categoryId: null,
  sort: "trending",
};

function sortArtworks(
  items: ExploreArtwork[],
  sort: ExploreSortOption,
): ExploreArtwork[] {
  const copy = [...items];
  switch (sort) {
    case "newest":
      return copy.reverse();
    case "most-liked":
      return copy.sort((a, b) => b.likes - a.likes);
    case "most-viewed":
      return copy.sort((a, b) => b.views - a.views);
    case "trending":
    default:
      return copy.sort((a, b) => b.views + b.likes - (a.views + a.likes));
  }
}

export function useExploreFilters(initial?: Partial<ExploreFiltersState>) {
  const [filters, setFilters] = useState<ExploreFiltersState>({
    ...DEFAULT_FILTERS,
    ...initial,
  });

  const filteredArtworks = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    let results = EXPLORE_ARTWORKS.filter((artwork) => {
      const matchesQuery =
        !query ||
        artwork.title.toLowerCase().includes(query) ||
        artwork.artist.name.toLowerCase().includes(query) ||
        artwork.categories.some((c) => c.includes(query));

      const matchesCategory =
        !filters.categoryId ||
        filters.categoryId === "all" ||
        artwork.categories.includes(filters.categoryId);

      return matchesQuery && matchesCategory;
    });

    return sortArtworks(results, filters.sort);
  }, [filters]);

  const setQuery = (query: string) => setFilters((prev) => ({ ...prev, query }));
  const setCategoryId = (categoryId: string | null) =>
    setFilters((prev) => ({ ...prev, categoryId }));
  const setSort = (sort: ExploreSortOption) =>
    setFilters((prev) => ({ ...prev, sort }));

  return {
    filters,
    filteredArtworks,
    setQuery,
    setCategoryId,
    setSort,
    resultCount: filteredArtworks.length,
  };
}
