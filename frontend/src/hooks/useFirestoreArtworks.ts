"use client";

import { useCallback, useEffect, useState } from "react";

import type { ArtworkItem } from "@/src/features/landing/types/artwork";
import type { ExploreArtwork, TrendingArtwork } from "@/src/components/home/types";
import {
  fetchArtworksFromFirestore,
  mapToArtworkItem,
  mapToExploreArtwork,
  mapToTrendingArtworks,
  type FirestoreArtwork,
} from "@/src/lib/firestore/artworks";

type UseFirestoreArtworksResult = {
  rawArtworks: FirestoreArtwork[];
  exploreArtworks: ExploreArtwork[];
  featuredArtworks: ArtworkItem[];
  trendingArtworks: TrendingArtwork[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useFirestoreArtworks(): UseFirestoreArtworksResult {
  const [rawArtworks, setRawArtworks] = useState<FirestoreArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArtworks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const artworks = await fetchArtworksFromFirestore();
      setRawArtworks(artworks);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load artworks";
      setError(message);
      setRawArtworks([]);
      console.error("[useFirestoreArtworks]", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadArtworks();
  }, [loadArtworks]);

  const exploreArtworks = rawArtworks.map(mapToExploreArtwork);
  const featuredArtworks = rawArtworks.slice(0, 6).map(mapToArtworkItem);
  const trendingArtworks = mapToTrendingArtworks(rawArtworks);

  return {
    rawArtworks,
    exploreArtworks,
    featuredArtworks,
    trendingArtworks,
    loading,
    error,
    refetch: loadArtworks,
  };
}
