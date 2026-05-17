import type { MasonrySize } from "./types";

/** Minimum artwork media height by masonry variant (px). */
export const MASONRY_HEIGHTS: Record<MasonrySize, number> = {
  tall: 320,
  standard: 260,
  wide: 220,
};

export function formatCount(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return String(value);
}

export function getArtistInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function categoryLabel(categoryId: string): string {
  return categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
}
