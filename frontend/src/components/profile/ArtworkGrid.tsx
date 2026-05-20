"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Link from "next/link";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { GlassCard } from "@/src/components/ui/GlassCard";
import { ROUTES } from "@/src/lib/constants";
import { hoverLift } from "@/src/lib/motion";

export function ArtworkGrid() {
  const artworks = [
    { id: 1, title: "Ethereal Dreams", likes: 234, views: 1205, color: "#667eea" },
    { id: 2, title: "Cosmic Journey", likes: 189, views: 987, color: "#764ba2" },
    { id: 3, title: "Neon Sunset", likes: 312, views: 1543, color: "#f093fb" },
    { id: 4, title: "Digital Horizon", likes: 156, views: 876, color: "#ff6b6b" },
    { id: 5, title: "Abstract Flow", likes: 278, views: 1342, color: "#4ecdc4" },
    { id: 6, title: "Quantum Leap", likes: 201, views: 1056, color: "#45b7d1" },
  ];

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Artwork Collection
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
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
            whileHover={hoverLift}
          >
            <Card
              component={Link}
              href={ROUTES.artwork(String(artwork.id))}
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition: "all 0.3s ease",
                textDecoration: "none",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: "1",
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
                    fontSize: 48,
                  }}
                >
                  {artwork.id}
                </Typography>
                
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                  className="hover-overlay"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption">{artwork.likes}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <VisibilityIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption">{artwork.views}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ p: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    mb: 0.5,
                  }}
                >
                  {artwork.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                >
                  Digital Art • 2024
                </Typography>
              </Box>
            </Card>
          </motion.div>
        ))}
      </Box>
    </GlassCard>
  );
}
