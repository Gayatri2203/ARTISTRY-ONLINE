"use client";

import { useCallback, useEffect, useState } from "react";

import {
  fetchArtworkById,
  type FirestoreArtwork,
} from "@/src/lib/firestore/artworks";

export function useArtworkById(id: string | undefined) {
  const [artwork, setArtwork] = useState<FirestoreArtwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArtwork = useCallback(async () => {
    if (!id) {
      setArtwork(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchArtworkById(id);
      setArtwork(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load artwork";
      setError(message);
      setArtwork(null);
      console.error("[useArtworkById]", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadArtwork();
  }, [loadArtwork]);

  return { artwork, loading, error, refetch: loadArtwork };
}
