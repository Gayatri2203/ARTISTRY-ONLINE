"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { ArtworksLoadState } from "@/src/components/home/ArtworksLoadState";
import { GlassCard } from "@/src/components/ui/GlassCard";
import { useFirestoreArtworks } from "@/src/hooks/useFirestoreArtworks";
import { formatArtworkPrice } from "@/src/lib/firestore/artworks";

export function SavedArtworks() {
  const { rawArtworks, loading, error } = useFirestoreArtworks();
  const recentArtworks = rawArtworks.slice(0, 3);

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Recent Artworks
      </Typography>

      <ArtworksLoadState
        loading={loading}
        error={error}
        isEmpty={!loading && !error && recentArtworks.length === 0}
        emptyMessage="No artworks uploaded yet."
      />

      {!loading && !error && recentArtworks.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {recentArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ x: 4 }}
            >
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    background: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "10px",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: "text.primary" }}
                  >
                    {artwork.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {formatArtworkPrice(artwork.price)}
                  </Typography>
                </Box>

                <FavoriteIcon sx={{ fontSize: 20, color: "#f43f5e" }} />
              </Card>
            </motion.div>
          ))}
        </Box>
      )}
    </GlassCard>
  );
}
