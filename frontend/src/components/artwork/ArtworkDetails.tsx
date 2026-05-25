"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { GlassCard } from "@/src/components/ui/GlassCard";

export type ArtworkDetailsProps = {
  title: string;
  description: string;
  category: string;
  createdAtLabel: string;
  priceLabel: string;
};

export function ArtworkDetails({
  title,
  description,
  category,
  createdAtLabel,
  priceLabel,
}: ArtworkDetailsProps) {
  const tags = category ? [category] : [];

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
        {title}
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
          {description || "No description provided."}
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
              {category || "—"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Created
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
              {createdAtLabel}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Price
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
              {priceLabel}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {tags.length > 0 && (
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
          >
            Tags
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tags.map((tag) => (
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
      )}
    </GlassCard>
  );
}
