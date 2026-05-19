"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function ArtworkPreview() {
  return (
    <GlassCard sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Preview
      </Typography>

      <Box
        sx={{
          aspectRatio: 1,
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
          border: "2px dashed rgba(255, 255, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Artwork preview will appear here
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", mb: 0.5, display: "block" }}
          >
            Title
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.primary", fontWeight: 500 }}
          >
            Your Artwork Title
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", mb: 0.5, display: "block" }}
          >
            Category
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            Digital Art
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", mb: 0.5, display: "block" }}
          >
            Price
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "primary.light",
              fontWeight: 700,
            }}
          >
            $0.00
          </Typography>
        </Box>
      </Box>
    </GlassCard>
  );
}
