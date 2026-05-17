import type { StatItem } from "../types";

export const PLATFORM_STATS: readonly StatItem[] = [
  { value: "12k+", label: "Original artworks" },
  { value: "3.2k", label: "Verified artists" },
  { value: "48", label: "Countries" },
  { value: "4.9★", label: "Collector rating" },
] as const;
