export type MasonrySize = "tall" | "standard" | "wide";

export type ArtistProfile = {
  id: string;
  name: string;
  /** CSS gradient for avatar placeholder */
  avatarGradient: string;
};

export type ExploreArtwork = {
  id: string;
  title: string;
  artist: ArtistProfile;
  price: string;
  categories: string[];
  /** Cloudinary URL from Firestore */
  imageUrl?: string;
  /** Fallback when imageUrl is missing */
  gradient?: string;
  likes: number;
  views: number;
  masonrySize: MasonrySize;
  featuredTag?: string;
  /** Milliseconds since epoch — used for newest sort */
  createdAt?: number;
};

export type TrendingArtwork = ExploreArtwork & {
  rank: 1 | 2 | 3;
};

export type ExploreCategoryFilter = {
  id: string;
  label: string;
};

export type ExploreSortOption = "trending" | "newest" | "most-liked" | "most-viewed";

export type ExploreFiltersState = {
  query: string;
  categoryId: string | null;
  sort: ExploreSortOption;
};
