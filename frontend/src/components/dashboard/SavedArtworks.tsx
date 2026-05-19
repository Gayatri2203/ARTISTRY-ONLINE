"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function SavedArtworks() {
  const artworks = [
    { id: 1, title: "Abstract Flow", price: "$1,350", color: "#4ecdc4" },
    { id: 2, title: "Quantum Leap", price: "$875", color: "#45b7d1" },
    { id: 3, title: "Digital Dreams", price: "$1,100", color: "#96ceb4" },
  ];

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Saved Artworks
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {artworks.map((artwork, index) => (
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
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "10px",
                  background: `linear-gradient(135deg, ${artwork.color} 0%, ${artwork.color}80 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255, 255, 255, 0.3)",
                    fontWeight: 700,
                  }}
                >
                  {artwork.id}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {artwork.title}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {artwork.price}
                </Typography>
              </Box>

              <FavoriteIcon sx={{ fontSize: 20, color: "#f43f5e" }} />
            </Card>
          </motion.div>
        ))}
      </Box>
    </GlassCard>
  );
}
