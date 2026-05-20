"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function RelatedArtworks() {
  const artworks = [
    { id: 1, title: "Cosmic Journey", price: "$950", likes: 189, color: "#764ba2" },
    { id: 2, title: "Neon Sunset", price: "$1,100", likes: 312, color: "#f093fb" },
    { id: 3, title: "Digital Horizon", price: "$875", likes: 156, color: "#ff6b6b" },
    { id: 4, title: "Abstract Flow", price: "$1,350", likes: 278, color: "#4ecdc4" },
  ];

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Related Artworks
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {artworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
          >
            <Card
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: 1,
                  background: `linear-gradient(135deg, ${artwork.color} 0%, ${artwork.color}80 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "rgba(255, 255, 255, 0.3)",
                    fontWeight: 700,
                    fontSize: 32,
                  }}
                >
                  {artwork.id}
                </Typography>
              </Box>

              <Box sx={{ p: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    mb: 0.5,
                    fontSize: "0.875rem",
                  }}
                >
                  {artwork.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
                >
                  {artwork.price}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FavoriteBorderIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {artwork.likes}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </motion.div>
        ))}
      </Box>
    </GlassCard>
  );
}
