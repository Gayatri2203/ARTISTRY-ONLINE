import type { FloatingCard, HeroShowcase } from "../types";

export const HERO_SHOWCASE: HeroShowcase = {
  title: "Nebula in Violet",
  artist: "Amara Okoye",
  price: "$3,750",
  label: "Curator's pick",
  gradient:
    "linear-gradient(160deg, #312E81 0%, #6366F1 40%, #22D3EE 100%)",
  likes: "1.2k",
};

export const HERO_FLOATING_CARDS: readonly FloatingCard[] = [
  {
    title: "Live auction",
    subtitle: "12 active bids",
    position: { top: "8%", right: "-4%" },
    delay: 0.2,
  },
  {
    title: "Verified artist",
    subtitle: "Top seller 2026",
    position: { bottom: "18%", left: "-8%" },
    delay: 0.4,
  },
  {
    title: "New collection",
    subtitle: "48 pieces added",
    position: { bottom: "6%", right: "4%" },
    delay: 0.6,
  },
] as const;
