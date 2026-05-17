import type {
  ArtworkItem,
  CategoryItem,
  FloatingCard,
  HeroShowcase,
  NavLink,
  StatItem,
} from "./types";

export const NAV_LINKS: NavLink[] = [
  { label: "Explore", href: "#explore" },
  { label: "Categories", href: "#categories" },
  { label: "Sell Artwork", href: "/sell" },
];

export const HERO_SHOWCASE: HeroShowcase = {
  title: "Nebula in Violet",
  artist: "Amara Okoye",
  price: "$3,750",
  label: "Curator's pick",
  gradient:
    "linear-gradient(160deg, #312E81 0%, #6366F1 40%, #22D3EE 100%)",
};

export const HERO_FLOATING_CARDS: FloatingCard[] = [
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
];

export const PLATFORM_STATS: StatItem[] = [
  { value: "12k+", label: "Original artworks" },
  { value: "3.2k", label: "Verified artists" },
  { value: "48", label: "Countries" },
  { value: "4.9★", label: "Collector rating" },
];

export const CATEGORIES: CategoryItem[] = [
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
];

export const FEATURED_ARTWORKS: ArtworkItem[] = [
  {
    id: "1",
    title: "Ethereal Horizons",
    artist: "Maya Chen",
    price: "$2,400",
    tag: "Featured",
    gradient:
      "linear-gradient(160deg, #312E81 0%, #6366F1 45%, #22D3EE 100%)",
    likes: 284,
  },
  {
    id: "2",
    title: "Midnight Bloom",
    artist: "James Okonkwo",
    price: "$1,850",
    tag: "New",
    gradient:
      "linear-gradient(160deg, #1E1B4B 0%, #7C3AED 50%, #EC4899 100%)",
    likes: 156,
  },
  {
    id: "3",
    title: "Silent Geometry",
    artist: "Elena Vasquez",
    price: "$3,200",
    tag: "Curated",
    gradient:
      "linear-gradient(160deg, #0F172A 0%, #334155 40%, #06B6D4 100%)",
    likes: 412,
  },
  {
    id: "4",
    title: "Aurora Drift",
    artist: "Noah Kim",
    price: "$980",
    tag: "Trending",
    gradient:
      "linear-gradient(160deg, #134E4A 0%, #0D9488 50%, #5EEAD4 100%)",
    likes: 98,
  },
  {
    id: "5",
    title: "Chromatic Pulse",
    artist: "Sofia Laurent",
    price: "$4,100",
    tag: "Featured",
    gradient:
      "linear-gradient(160deg, #4C0519 0%, #BE123C 45%, #FB7185 100%)",
    likes: 367,
  },
  {
    id: "6",
    title: "Urban Reverie",
    artist: "Alex Rivera",
    price: "$1,620",
    tag: "Popular",
    gradient:
      "linear-gradient(160deg, #1C1917 0%, #57534E 40%, #F59E0B 100%)",
    likes: 203,
  },
];
