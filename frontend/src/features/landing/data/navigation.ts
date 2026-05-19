import type { NavLink } from "../types";

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Explore", href: "/explore" },
  { label: "Trending", href: "/trending" },
  { label: "Categories", href: "/explore" },
  { label: "Dashboard", href: "/dashboard" },
] as const;
