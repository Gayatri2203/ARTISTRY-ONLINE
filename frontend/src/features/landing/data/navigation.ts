import type { NavLink } from "../types";

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Explore", href: "/explore" },
  { label: "Categories", href: "#categories" },
  { label: "Sell Artwork", href: "/sell" },
] as const;
