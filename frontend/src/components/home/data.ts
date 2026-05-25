import type { ExploreCategoryFilter } from "./types";

export const EXPLORE_CATEGORIES: readonly ExploreCategoryFilter[] = [
  { id: "all", label: "All" },
  { id: "painting", label: "Painting" },
  { id: "digital", label: "Digital" },
  { id: "photography", label: "Photography" },
  { id: "sculpture", label: "Sculpture" },
  { id: "abstract", label: "Abstract" },
  { id: "portrait", label: "Portrait" },
] as const;

export const EXPLORE_PAGE_SIZE = 6;
