import type { CategoryItem } from "../types";

export const CATEGORIES: readonly CategoryItem[] = [
  {
    id: "painting",
    label: "Painting",
    count: "2.4k works",
    gradient: "linear-gradient(135deg, #5B21B6, #818CF8)",
    iconName: "brush",
  },
  {
    id: "digital",
    label: "Digital Art",
    count: "5.1k works",
    gradient: "linear-gradient(135deg, #4F46E5, #22D3EE)",
    iconName: "digital",
  },
  {
    id: "photography",
    label: "Photography",
    count: "1.8k works",
    gradient: "linear-gradient(135deg, #0E7490, #67E8F9)",
    iconName: "photo",
  },
  {
    id: "sculpture",
    label: "Sculpture",
    count: "920 works",
    gradient: "linear-gradient(135deg, #6D28D9, #A78BFA)",
    iconName: "sculpture",
  },
] as const;
