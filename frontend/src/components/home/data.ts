import type { ExploreArtwork, ExploreCategoryFilter, TrendingArtwork } from "./types";

export const EXPLORE_CATEGORIES: readonly ExploreCategoryFilter[] = [
  { id: "all", label: "All" },
  { id: "painting", label: "Painting" },
  { id: "digital", label: "Digital" },
  { id: "photography", label: "Photography" },
  { id: "sculpture", label: "Sculpture" },
  { id: "abstract", label: "Abstract" },
  { id: "portrait", label: "Portrait" },
] as const;

const artists = {
  maya: {
    id: "a1",
    name: "Maya Chen",
    avatarGradient: "linear-gradient(135deg, #6366F1, #22D3EE)",
  },
  james: {
    id: "a2",
    name: "James Okonkwo",
    avatarGradient: "linear-gradient(135deg, #7C3AED, #EC4899)",
  },
  elena: {
    id: "a3",
    name: "Elena Vasquez",
    avatarGradient: "linear-gradient(135deg, #0E7490, #67E8F9)",
  },
  noah: {
    id: "a4",
    name: "Noah Kim",
    avatarGradient: "linear-gradient(135deg, #0D9488, #5EEAD4)",
  },
  sofia: {
    id: "a5",
    name: "Sofia Laurent",
    avatarGradient: "linear-gradient(135deg, #BE123C, #FB7185)",
  },
  alex: {
    id: "a6",
    name: "Alex Rivera",
    avatarGradient: "linear-gradient(135deg, #57534E, #F59E0B)",
  },
  amara: {
    id: "a7",
    name: "Amara Okoye",
    avatarGradient: "linear-gradient(135deg, #312E81, #818CF8)",
  },
  liam: {
    id: "a8",
    name: "Liam Hart",
    avatarGradient: "linear-gradient(135deg, #1E3A5F, #3B82F6)",
  },
  yuki: {
    id: "a9",
    name: "Yuki Tanaka",
    avatarGradient: "linear-gradient(135deg, #831843, #F472B6)",
  },
  priya: {
    id: "a10",
    name: "Priya Sharma",
    avatarGradient: "linear-gradient(135deg, #854D0E, #FCD34D)",
  },
} as const;

export const TRENDING_ARTWORKS: readonly TrendingArtwork[] = [
  {
    id: "t1",
    rank: 1,
    title: "Nebula in Violet",
    artist: artists.amara,
    price: "$3,750",
    categories: ["digital", "abstract"],
    gradient:
      "linear-gradient(160deg, #312E81 0%, #6366F1 40%, #22D3EE 100%)",
    likes: 4820,
    views: 28400,
    masonrySize: "tall",
    featuredTag: "Curator's pick",
  },
  {
    id: "t2",
    rank: 2,
    title: "Chromatic Pulse",
    artist: artists.sofia,
    price: "$4,100",
    categories: ["painting", "abstract"],
    gradient:
      "linear-gradient(160deg, #4C0519 0%, #BE123C 45%, #FB7185 100%)",
    likes: 3670,
    views: 19200,
    masonrySize: "standard",
    featuredTag: "Trending",
  },
  {
    id: "t3",
    rank: 3,
    title: "Silent Geometry",
    artist: artists.elena,
    price: "$3,200",
    categories: ["digital", "sculpture"],
    gradient:
      "linear-gradient(160deg, #0F172A 0%, #334155 40%, #06B6D4 100%)",
    likes: 2910,
    views: 15800,
    masonrySize: "standard",
    featuredTag: "Rising",
  },
] as const;

export const EXPLORE_ARTWORKS: readonly ExploreArtwork[] = [
  {
    id: "e1",
    title: "Ethereal Horizons",
    artist: artists.maya,
    price: "$2,400",
    categories: ["digital", "abstract"],
    gradient:
      "linear-gradient(160deg, #312E81 0%, #6366F1 45%, #22D3EE 100%)",
    likes: 284,
    views: 4200,
    masonrySize: "tall",
    featuredTag: "Featured",
  },
  {
    id: "e2",
    title: "Midnight Bloom",
    artist: artists.james,
    price: "$1,850",
    categories: ["painting", "portrait"],
    gradient:
      "linear-gradient(160deg, #1E1B4B 0%, #7C3AED 50%, #EC4899 100%)",
    likes: 156,
    views: 3100,
    masonrySize: "standard",
    featuredTag: "New",
  },
  {
    id: "e3",
    title: "Aurora Drift",
    artist: artists.noah,
    price: "$980",
    categories: ["photography", "abstract"],
    gradient:
      "linear-gradient(160deg, #134E4A 0%, #0D9488 50%, #5EEAD4 100%)",
    likes: 98,
    views: 2800,
    masonrySize: "wide",
  },
  {
    id: "e4",
    title: "Urban Reverie",
    artist: artists.alex,
    price: "$1,620",
    categories: ["photography", "digital"],
    gradient:
      "linear-gradient(160deg, #1C1917 0%, #57534E 40%, #F59E0B 100%)",
    likes: 203,
    views: 3900,
    masonrySize: "standard",
  },
  {
    id: "e5",
    title: "Cerulean Dream",
    artist: artists.liam,
    price: "$2,890",
    categories: ["painting", "abstract"],
    gradient:
      "linear-gradient(160deg, #1E3A8A 0%, #3B82F6 50%, #93C5FD 100%)",
    likes: 445,
    views: 5100,
    masonrySize: "tall",
  },
  {
    id: "e6",
    title: "Sakura Fragment",
    artist: artists.yuki,
    price: "$1,240",
    categories: ["digital", "portrait"],
    gradient:
      "linear-gradient(160deg, #831843 0%, #DB2777 45%, #FBCFE8 100%)",
    likes: 312,
    views: 4600,
    masonrySize: "wide",
  },
  {
    id: "e7",
    title: "Golden Hour Study",
    artist: artists.priya,
    price: "$1,950",
    categories: ["photography", "portrait"],
    gradient:
      "linear-gradient(160deg, #78350F 0%, #D97706 50%, #FDE68A 100%)",
    likes: 178,
    views: 2400,
    masonrySize: "standard",
  },
  {
    id: "e8",
    title: "Monolith Series IV",
    artist: artists.elena,
    price: "$5,200",
    categories: ["sculpture", "abstract"],
    gradient:
      "linear-gradient(160deg, #18181B 0%, #3F3F46 50%, #A1A1AA 100%)",
    likes: 521,
    views: 6200,
    masonrySize: "tall",
  },
  {
    id: "e9",
    title: "Liquid Memory",
    artist: artists.maya,
    price: "$3,100",
    categories: ["digital", "painting"],
    gradient:
      "linear-gradient(160deg, #164E63 0%, #0891B2 50%, #A5F3FC 100%)",
    likes: 267,
    views: 3700,
    masonrySize: "standard",
  },
  {
    id: "e10",
    title: "Crimson Veil",
    artist: artists.sofia,
    price: "$2,650",
    categories: ["painting", "portrait"],
    gradient:
      "linear-gradient(160deg, #450A0A 0%, #991B1B 50%, #FCA5A5 100%)",
    likes: 389,
    views: 4800,
    masonrySize: "wide",
  },
  {
    id: "e11",
    title: "Threshold Light",
    artist: artists.james,
    price: "$1,480",
    categories: ["photography", "abstract"],
    gradient:
      "linear-gradient(160deg, #292524 0%, #78716C 50%, #E7E5E4 100%)",
    likes: 142,
    views: 2100,
    masonrySize: "standard",
  },
  {
    id: "e12",
    title: "Prism Garden",
    artist: artists.noah,
    price: "$2,100",
    categories: ["digital", "abstract"],
    gradient:
      "linear-gradient(160deg, #365314 0%, #65A30D 50%, #BEF264 100%)",
    likes: 298,
    views: 3500,
    masonrySize: "tall",
  },
  {
    id: "e13",
    title: "Obsidian Flow",
    artist: artists.amara,
    price: "$4,400",
    categories: ["sculpture", "digital"],
    gradient:
      "linear-gradient(160deg, #0C0A09 0%, #44403C 40%, #6366F1 100%)",
    likes: 612,
    views: 7100,
    masonrySize: "standard",
  },
  {
    id: "e14",
    title: "Velvet Nocturne",
    artist: artists.yuki,
    price: "$1,720",
    categories: ["painting", "abstract"],
    gradient:
      "linear-gradient(160deg, #2E1065 0%, #6B21A8 50%, #C4B5FD 100%)",
    likes: 224,
    views: 2900,
    masonrySize: "wide",
  },
  {
    id: "e15",
    title: "Coastal Silence",
    artist: artists.liam,
    price: "$1,390",
    categories: ["photography", "digital"],
    gradient:
      "linear-gradient(160deg, #0C4A6E 0%, #0284C7 50%, #BAE6FD 100%)",
    likes: 186,
    views: 2600,
    masonrySize: "standard",
  },
] as const;

export const EXPLORE_PAGE_SIZE = 6;
