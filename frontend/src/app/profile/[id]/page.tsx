"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { AppShell } from "@/src/components/layout/AppShell";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { ArtworkCard } from "@/src/features/landing/components/ArtworkCard";
import type { ArtworkItem } from "@/src/features/landing/types";
import { useAuth } from "@/src/context/AuthContext";
import { db } from "@/src/lib/firebase";
import { fadeInUp, staggerContainer } from "@/src/lib/motion";
import { formatArtworkPrice } from "@/src/lib/firestore/artworks";

type ArtistArtwork = {
  id: string;
  title: string;
  category: string;
  price: number | null;
  imageUrl: string;
  createdAt: number | null;
};

function parseCreatedAt(value: unknown): number | null {
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

function getArtistName(profileId: string, currentUserName?: string | null): string {
  if (currentUserName && currentUserName.trim()) {
    return currentUserName;
  }
  return `Artist ${profileId.slice(0, 6)}`;
}

function getAvatarLabel(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ArtistProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: profileId } = use(params);
  const { user } = useAuth();

  const [artworks, setArtworks] = useState<ArtistArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadArtistArtworks() {
      if (!profileId) {
        setLoading(false);
        setArtworks([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const artworksQuery = query(
          collection(db, "artworks"),
          where("artistId", "==", profileId),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(artworksQuery);
        if (cancelled) return;

        const items = snapshot.docs
          .map((docSnap) => {
            const data = docSnap.data();
            if (
              typeof data.title !== "string" ||
              typeof data.imageUrl !== "string"
            ) {
              return null;
            }
            return {
              id: docSnap.id,
              title: data.title,
              category: typeof data.category === "string" ? data.category : "Artwork",
              price: typeof data.price === "number" ? data.price : null,
              imageUrl: data.imageUrl,
              createdAt: parseCreatedAt(data.createdAt),
            } satisfies ArtistArtwork;
          })
          .filter((item): item is ArtistArtwork => item !== null);

        setArtworks(items);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load artist profile");
        setArtworks([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadArtistArtworks();
    return () => {
      cancelled = true;
    };
  }, [profileId]);

  const artistName = getArtistName(
    profileId,
    user?.uid === profileId ? user.displayName : null
  );
  const artistEmail =
    user?.uid === profileId && user.email ? user.email : "Email not available";
  const avatarSrc = user?.uid === profileId ? user.photoURL : null;
  const totalUploads = artworks.length;

  const cardItems: ArtworkItem[] = artworks.map((artwork) => ({
    id: artwork.id,
    title: artwork.title,
    artist: artistName,
    price: formatArtworkPrice(artwork.price),
    tag: artwork.category,
    imageUrl: artwork.imageUrl,
    gradient: "linear-gradient(160deg, #312E81 0%, #6366F1 45%, #22D3EE 100%)",
    likes: 0,
  }));

  return (
    <AppShell>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <GlassCard sx={{ p: { xs: 2.5, md: 3 }, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "center", sm: "flex-start" },
                  gap: 2.5,
                }}
              >
                <Avatar
                  src={avatarSrc ?? undefined}
                  sx={{
                    width: 84,
                    height: 84,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    fontSize: 30,
                    fontWeight: 700,
                    border: "2px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {!avatarSrc ? getAvatarLabel(artistName) : null}
                </Avatar>

                <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.82) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {artistName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                    {artistEmail}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mt: 1.5 }}>
                    Total uploads: {totalUploads}
                  </Typography>
                </Box>
              </Box>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <GlassCard sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2.5 }}>
                Uploaded Artworks
              </Typography>

              {loading && (
                <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={34} />
                </Box>
              )}

              {!loading && error && (
                <Box
                  sx={{
                    py: 4,
                    px: 2,
                    textAlign: "center",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "error.main",
                  }}
                >
                  <Typography color="error.main">{error}</Typography>
                </Box>
              )}

              {!loading && !error && cardItems.length === 0 && (
                <Box
                  sx={{
                    py: 7,
                    textAlign: "center",
                    borderRadius: 2,
                    border: "1px dashed",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    This artist has not uploaded any artworks yet.
                  </Typography>
                </Box>
              )}

              {!loading && !error && cardItems.length > 0 && (
                <Grid container spacing={2}>
                  {cardItems.map((artwork) => (
                    <Grid key={artwork.id} size={{ xs: 12, sm: 6, md: 4 }}>
                      <ArtworkCard {...artwork} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </GlassCard>
          </motion.div>
        </motion.div>
      </Container>
    </AppShell>
  );
}
