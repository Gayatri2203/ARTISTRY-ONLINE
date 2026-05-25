import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  type DocumentData,
  Timestamp,
} from "firebase/firestore";

import { ARTWORKS_COLLECTION } from "@/src/features/upload/saveArtworkToFirestore";
import type { ArtworkItem } from "@/src/features/landing/types/artwork";
import type { ExploreArtwork, MasonrySize, TrendingArtwork } from "@/src/components/home/types";
import { db } from "@/src/lib/firebase";

const PLACEHOLDER_GRADIENT =
  "linear-gradient(160deg, #312E81 0%, #6366F1 45%, #22D3EE 100%)";

const MASONRY_CYCLE: MasonrySize[] = ["tall", "standard", "wide", "standard"];

export type FirestoreArtwork = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number | null;
  imageUrl: string;
  artistId?: string;
  createdAt: number | null;
};

function parseCreatedAt(value: unknown): number | null {
  if (value instanceof Timestamp) {
    return value.toMillis();
  }
  if (
    value &&
    typeof value === "object" &&
    "seconds" in value &&
    typeof (value as { seconds: number }).seconds === "number"
  ) {
    return (value as { seconds: number }).seconds * 1000;
  }
  return null;
}

function parseFirestoreDoc(
  id: string,
  data: DocumentData
): FirestoreArtwork | null {
  const title = typeof data.title === "string" ? data.title : "";
  const imageUrl = typeof data.imageUrl === "string" ? data.imageUrl : "";

  if (!title || !imageUrl) {
    return null;
  }

  const price =
    typeof data.price === "number"
      ? data.price
      : data.price === null
        ? null
        : null;

  return {
    id,
    title,
    description:
      typeof data.description === "string" ? data.description : "",
    category: typeof data.category === "string" ? data.category : "",
    price,
    imageUrl,
    artistId:
      typeof data.artistId === "string" ? data.artistId : undefined,
    createdAt: parseCreatedAt(data.createdAt),
  };
}

export function formatArtworkPrice(price: number | null): string {
  if (price == null || Number.isNaN(price)) {
    return "—";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function artistDisplayName(artistId?: string): string {
  if (!artistId) return "Unknown Artist";
  return `Artist ${artistId.slice(0, 6)}`;
}

/** Stable date label (fixed en-US locale — safe after client fetch). */
export function formatArtworkCreatedDate(createdAtMs: number | null): string {
  if (!createdAtMs) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(createdAtMs));
}

/** Maps upload form category labels to explore filter ids. */
function normalizeCategoryId(category: string): string {
  const lower = category.trim().toLowerCase();
  if (lower.includes("digital")) return "digital";
  if (lower.includes("paint")) return "painting";
  if (lower.includes("photo")) return "photography";
  if (lower.includes("sculpt")) return "sculpture";
  if (lower.includes("portrait") || lower.includes("illustr")) return "portrait";
  if (lower.includes("abstract") || lower.includes("mixed") || lower.includes("nft"))
    return "abstract";
  return lower.replace(/\s+/g, "-");
}

export function mapToExploreArtwork(
  artwork: FirestoreArtwork,
  index: number
): ExploreArtwork {
  const categoryId = normalizeCategoryId(artwork.category);

  return {
    id: artwork.id,
    title: artwork.title,
    artist: {
      id: artwork.artistId ?? "unknown",
      name: artistDisplayName(artwork.artistId),
      avatarGradient: PLACEHOLDER_GRADIENT,
    },
    price: formatArtworkPrice(artwork.price),
    categories: categoryId ? [categoryId] : [],
    imageUrl: artwork.imageUrl,
    gradient: PLACEHOLDER_GRADIENT,
    likes: 0,
    views: 0,
    masonrySize: MASONRY_CYCLE[index % MASONRY_CYCLE.length],
    featuredTag: index === 0 ? "New" : undefined,
    createdAt: artwork.createdAt ?? 0,
  };
}

export function mapToArtworkItem(artwork: FirestoreArtwork): ArtworkItem {
  return {
    id: artwork.id,
    title: artwork.title,
    artist: artistDisplayName(artwork.artistId),
    price: formatArtworkPrice(artwork.price),
    tag: artwork.category || "New",
    imageUrl: artwork.imageUrl,
    gradient: PLACEHOLDER_GRADIENT,
    likes: 0,
  };
}

export function mapToTrendingArtworks(
  artworks: FirestoreArtwork[]
): TrendingArtwork[] {
  const tags = ["Curator's pick", "Trending", "Rising"] as const;

  return artworks.slice(0, 3).map((artwork, index) => ({
    ...mapToExploreArtwork(artwork, index),
    rank: (index + 1) as 1 | 2 | 3,
    featuredTag: tags[index] ?? "Trending",
  }));
}

/** Fetches a single artwork by document id. */
export async function fetchArtworkById(
  id: string
): Promise<FirestoreArtwork | null> {
  const snapshot = await getDoc(doc(db, ARTWORKS_COLLECTION, id));

  if (!snapshot.exists()) {
    return null;
  }

  return parseFirestoreDoc(snapshot.id, snapshot.data());
}

/** Fetches all artworks from Firestore, newest first. */
export async function fetchArtworksFromFirestore(): Promise<FirestoreArtwork[]> {
  const artworksQuery = query(
    collection(db, ARTWORKS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(artworksQuery);

  return snapshot.docs
    .map((docSnap) => parseFirestoreDoc(docSnap.id, docSnap.data()))
    .filter((item): item is FirestoreArtwork => item !== null);
}
