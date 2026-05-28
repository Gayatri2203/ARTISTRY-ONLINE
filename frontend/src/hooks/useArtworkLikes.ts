"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  getDocs,
} from "firebase/firestore";

import { useAuth } from "@/src/context/AuthContext";
import { createNotification } from "@/src/lib/firestore/notifications";
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLikesCount(0);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLiked(false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

      const artworkDoc = await getDoc(doc(db, "artworks", artworkId));
      if (artworkDoc.exists()) {
        const artworkData = artworkDoc.data();
        const recipientUserId =
          typeof artworkData.artistId === "string" ? artworkData.artistId : "";
        const artworkTitle =
          typeof artworkData.title === "string" ? artworkData.title : "your artwork";

        await createNotification({
          recipientUserId,
          senderUserId: user.uid,
          senderName: user.displayName ?? user.email?.split("@")[0] ?? "Someone",
          senderAvatar: user.photoURL ?? "",
          type: "like",
          artworkId,
          artworkTitle,
        });
      }
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
