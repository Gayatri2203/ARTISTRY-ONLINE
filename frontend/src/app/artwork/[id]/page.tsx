"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { use } from "react";
import { motion } from "framer-motion";

import { AppShell } from "@/src/components/layout/AppShell";
import { ArtworkPreview } from "@/src/components/artwork/ArtworkPreview";
import { ArtistInfo } from "@/src/components/artwork/ArtistInfo";
import { ArtworkDetails } from "@/src/components/artwork/ArtworkDetails";
import { ActionButtons } from "@/src/components/artwork/ActionButtons";
import { FloatingActionSidebar } from "@/src/components/artwork/FloatingActionSidebar";
import { RelatedArtworks } from "@/src/components/artwork/RelatedArtworks";
import { CommentsSection } from "@/src/components/artwork/CommentsSection";
import { useArtworkById } from "@/src/hooks/useArtworkById";
import {
  artistDisplayName,
  formatArtworkCreatedDate,
  formatArtworkPrice,
} from "@/src/lib/firestore/artworks";
import { fadeInUp, staggerContainer } from "@/src/lib/motion";

function ArtworkLoadingState() {
  return (
    <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
      <CircularProgress size={40} />
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 2 }}>
        Loading artwork…
      </Typography>
    </Container>
  );
}

function ArtworkNotFoundState({ message }: { message?: string }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" sx={{ color: "text.secondary", mb: 1 }}>
          Artwork not found
        </Typography>
        {message && (
          <Typography variant="body2" color="error.main">
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default function ArtworkDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { artwork, loading, error, refetch } = useArtworkById(id);

  if (!id) {
    return (
      <AppShell>
        <ArtworkNotFoundState />
      </AppShell>
    );
  }

  if (loading) {
    return (
      <AppShell>
        <ArtworkLoadingState />
      </AppShell>
    );
  }

  if (error || !artwork) {
    return (
      <AppShell>
        <ArtworkNotFoundState message={error ?? undefined} />
      </AppShell>
    );
  }

  const priceLabel = formatArtworkPrice(artwork.price);
  const createdAtLabel = formatArtworkCreatedDate(artwork.createdAt);
  const artistName = artistDisplayName(artwork.artistId);
  const artistUsername = artwork.artistId ?? "unknown";

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
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
                background:
                  "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {artwork.title}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
              {artwork.category}
              {priceLabel !== "—" ? ` · ${priceLabel}` : ""}
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 3,
            }}
          >
            <Box sx={{ flex: { xs: 1, lg: 1.5 } }}>
              <motion.div variants={fadeInUp}>
                <ArtworkPreview
                  imageUrl={artwork.imageUrl}
                  title={artwork.title}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <ArtistInfo
                  artistUsername={artistUsername}
                  artistName={artistName}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <ArtworkDetails
                  title={artwork.title}
                  description={artwork.description}
                  category={artwork.category}
                  createdAtLabel={createdAtLabel}
                  priceLabel={priceLabel}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <ActionButtons
                  priceLabel={priceLabel}
                  artworkId={artwork.id}
                  artworkOwnerId={artwork.artistId}
                  initialValues={{
                    title: artwork.title,
                    description: artwork.description,
                    category: artwork.category,
                    price: artwork.price,
                  }}
                  onUpdated={refetch}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <RelatedArtworks />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <CommentsSection artworkId={artwork.id} />
              </motion.div>
            </Box>

            <Box sx={{ flex: { xs: 1, lg: 1 } }}>
              <motion.div variants={fadeInUp}>
                <FloatingActionSidebar />
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </AppShell>
  );
}
