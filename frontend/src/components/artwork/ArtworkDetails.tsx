"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function ArtworkDetails() {
  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 2,
          background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Ethereal Dreams
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
        >
          Description
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.7,
          }}
        >
          A mesmerizing exploration of color and form, this piece captures the essence of dreams 
          through vibrant gradients and abstract compositions. Created using digital techniques 
          that blend traditional artistry with modern technology.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
        >
          Details
        </Typography>
        <Stack spacing={1}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Category
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
              Digital Art
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Created
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
              January 2024
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Dimensions
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
              4000 x 3000 px
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              License
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
              Commercial Use
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
        >
          Tags
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {["Abstract", "Digital", "Colorful", "Modern", "Gradient"].map((tag) => (
            <motion.div
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Chip
                label={tag}
                size="small"
                sx={{
                  background: "rgba(99, 102, 241, 0.15)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  color: "primary.light",
                  fontWeight: 500,
                  borderRadius: "6px",
                }}
              />
            </motion.div>
          ))}
        </Box>
      </Box>
    </GlassCard>
  );
}
