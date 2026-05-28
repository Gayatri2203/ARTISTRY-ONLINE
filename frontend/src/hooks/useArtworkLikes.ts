"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  getDocs,
} from "firebase/firestore";

import { useAuth } from "@/src/context/AuthContext";
import { db } from "@/src/lib/firebase";

const LIKES_COLLECTION = "likes" as const;

export function useArtworkLikes(artworkId: string) {
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  const canLike = Boolean(user);

  useEffect(() => {
    if (!artworkId) {
      setLikesCount(0);
      setIsLiked(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const likesQuery = query(
      collection(db, LIKES_COLLECTION),
      where("artworkId", "==", artworkId)
    );

    const unsubscribe = onSnapshot(
      likesQuery,
      (snapshot) => {
        const docs = snapshot.docs;
        setLikesCount(docs.length);
        setIsLiked(
          !!user && docs.some((docSnap) => docSnap.data().userId === user.uid)
        );
        setLoading(false);
      },
      () => {
        setLikesCount(0);
        setIsLiked(false);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [artworkId, user]);

  const toggleLike = useCallback(async () => {
    if (!user || !artworkId || toggling) return;

    setToggling(true);
    try {
      const existingLikeQuery = query(
        collection(db, LIKES_COLLECTION),
        where("artworkId", "==", artworkId),
        where("userId", "==", user.uid)
      );
      const existingLikes = await getDocs(existingLikeQuery);

      if (!existingLikes.empty) {
        await Promise.all(existingLikes.docs.map((docSnap) => deleteDoc(docSnap.ref)));
        return;
      }

      await addDoc(collection(db, LIKES_COLLECTION), {
        artworkId,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
    } finally {
      setToggling(false);
    }
  }, [artworkId, toggling, user]);

  return useMemo(
    () => ({
      likesCount,
      isLiked,
      loading,
      toggling,
      canLike,
      toggleLike,
    }),
    [canLike, isLiked, likesCount, loading, toggleLike, toggling]
  );
}
