"use client";

import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { ArtworksLoadState } from "@/src/components/home/ArtworksLoadState";
import { ArtworkCard } from "@/src/features/landing/components/ArtworkCard";
import type { ArtworkItem } from "@/src/features/landing/types";
import { useAuth } from "@/src/context/AuthContext";
import {
  artistDisplayName,
  formatArtworkPrice,
} from "@/src/lib/firestore/artworks";
import { db } from "@/src/lib/firebase";

import { fadeInUp, staggerContainer } from "@/src/lib/motion";

export default function WishlistPage() {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState<ArtworkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.uid) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setArtworks([]);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const likesQuery = query(
      collection(db, "likes"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      likesQuery,
      async (likesSnapshot) => {
        try {
          const artworkIds = likesSnapshot.docs
            .map((docSnap) => docSnap.data().artworkId)
            .filter((id): id is string => typeof id === "string");

          if (artworkIds.length === 0) {
            setArtworks([]);
            setLoading(false);
            return;
          }

          const artworkDocs = await Promise.all(
            artworkIds.map((artworkId) => getDoc(doc(db, "artworks", artworkId)))
          );

          const items = artworkDocs
            .filter((artworkDoc) => artworkDoc.exists())
            .map((artworkDoc) => {
              const data = artworkDoc.data();
              const title =
                typeof data.title === "string" && data.title.trim()
                  ? data.title
                  : "Untitled artwork";
              const category =
                typeof data.category === "string" && data.category.trim()
                  ? data.category
                  : "Artwork";
              const artistId =
                typeof data.artistId === "string" ? data.artistId : undefined;
              const imageUrl =
                typeof data.imageUrl === "string" ? data.imageUrl : undefined;
              const price =
                typeof data.price === "number" ? data.price : null;

              return {
                id: artworkDoc.id,
                title,
                artist: artistDisplayName(artistId),
                price: formatArtworkPrice(price),
                tag: category,
                imageUrl,
                gradient:
                  "linear-gradient(160deg, #312E81 0%, #6366F1 45%, #22D3EE 100%)",
                likes: 0,
              } satisfies ArtworkItem;
            });

          setArtworks(items);
          setLoading(false);
        } catch (snapshotError) {
          setError(
            snapshotError instanceof Error
              ? snapshotError.message
              : "Failed to load saved artworks"
          );
          setArtworks([]);
          setLoading(false);
        }
      },
      (snapshotError) => {
        setError(
          snapshotError instanceof Error
            ? snapshotError.message
            : "Failed to load saved artworks"
        );
        setArtworks([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  const savedCount = useMemo(() => artworks.length, [artworks.length]);

  return (
    <ProtectedRoute>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeInUp}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Wishlist
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Your saved artworks ({savedCount})
          </Typography>
        </motion.div>

        <ArtworksLoadState
          loading={loading}
          error={error}
          isEmpty={!loading && !error && artworks.length === 0}
          emptyMessage="You have no saved artworks yet. Like artworks to build your favorites."
        />

        {!loading && !error && artworks.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            {artworks.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <ArtworkCard {...item} />
              </motion.div>
            ))}
          </Box>
        )}
      </motion.div>
    </Container>
    </ProtectedRoute>
  );
}
