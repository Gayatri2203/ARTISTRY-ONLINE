"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
  type DocumentData,
} from "firebase/firestore";

import { ARTWORKS_COLLECTION } from "@/src/features/upload/saveArtworkToFirestore";
import { db } from "@/src/lib/firebase";

export type UserArtwork = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number | null;
  imageUrl: string;
  artistId: string;
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

function parseArtworkDoc(id: string, data: DocumentData): UserArtwork | null {
  if (
    typeof data.title !== "string" ||
    typeof data.imageUrl !== "string" ||
    typeof data.artistId !== "string"
  ) {
    return null;
  }

  return {
    id,
    title: data.title,
    description: typeof data.description === "string" ? data.description : "",
    category: typeof data.category === "string" ? data.category : "",
    price: typeof data.price === "number" ? data.price : null,
    imageUrl: data.imageUrl,
    artistId: data.artistId,
    createdAt: parseCreatedAt(data.createdAt),
  };
}

export function useUserArtworks(userId: string | undefined) {
  const [artworks, setArtworks] = useState<UserArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setArtworks([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const artworksQuery = query(
      collection(db, ARTWORKS_COLLECTION),
      where("artistId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      artworksQuery,
      (snapshot) => {
        const items = snapshot.docs
          .map((docSnap) => parseArtworkDoc(docSnap.id, docSnap.data()))
          .filter((item): item is UserArtwork => item !== null);

        setArtworks(items);
        setLoading(false);
      },
      (err) => {
        setArtworks([]);
        setLoading(false);
        setError(err instanceof Error ? err.message : "Failed to load artworks");
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { artworks, loading, error };
}
