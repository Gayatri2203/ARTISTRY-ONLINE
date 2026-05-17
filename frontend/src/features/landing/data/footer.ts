import type { FooterLinkGroup } from "../types";

export const FOOTER_LINK_GROUPS: readonly FooterLinkGroup[] = [
  {
    title: "Marketplace",
    links: [
      { label: "Explore", href: "/explore" },
      { label: "Categories", href: "/explore" },
      { label: "Sell Artwork", href: "/explore" },
      { label: "Pricing", href: "/explore" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Press", href: "/about" },
      { label: "Contact", href: "/about" },
    ],
  },
] as const;

export const FOOTER_TAGLINE =
  "A premium marketplace connecting collectors with exceptional contemporary art from around the world.";
