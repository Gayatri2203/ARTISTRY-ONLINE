import type { ArtworkItem } from "../types";

export const FEATURED_ARTWORKS: readonly ArtworkItem[] = [
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
] as const;
