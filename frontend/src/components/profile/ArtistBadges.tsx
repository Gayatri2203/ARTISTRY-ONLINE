"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface ArtistBadgesProps {
  username: string;
}

export function ArtistBadges({ username }: ArtistBadgesProps) {
  const badges = [
    {
      icon: <VerifiedIcon sx={{ fontSize: 16 }} />,
      label: "Verified Artist",
      color: "#667eea",
    },
    {
      icon: <StarIcon sx={{ fontSize: 16 }} />,
      label: "Top Creator",
      color: "#f093fb",
    },
    {
      icon: <WorkspacePremiumIcon sx={{ fontSize: 16 }} />,
      label: "Premium Member",
      color: "#ffd700",
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 16 }} />,
      label: "Trending",
      color: "#ff6b6b",
    },
  ];

  const tags = [
    "Digital Art",
    "Abstract",
    "Contemporary",
    "Color Theory",
    "Mixed Media",
  ];

  return (
    <GlassCard sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}
      >
        Badges & Tags
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Chip
                icon={badge.icon}
                label={badge.label}
                sx={{
                  background: `linear-gradient(135deg, ${badge.color}20 0%, ${badge.color}10 100%)`,
                  border: `1px solid ${badge.color}40`,
                  color: badge.color,
                  fontWeight: 600,
                  borderRadius: "8px",
                  px: 1,
                  "& .MuiChip-icon": {
                    color: badge.color,
                  },
                }}
              />
            </motion.div>
          ))}
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
            >
              <Chip
                label={tag}
                variant="outlined"
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  color: "text.secondary",
                  fontWeight: 500,
                  borderRadius: "8px",
                  px: 1,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(99, 102, 241, 0.1)",
                    borderColor: "rgba(99, 102, 241, 0.3)",
                    color: "primary.light",
                  },
                }}
              />
            </motion.div>
          ))}
        </Box>
      </Box>
    </GlassCard>
  );
}
