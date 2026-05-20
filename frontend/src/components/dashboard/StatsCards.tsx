"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaletteIcon from "@mui/icons-material/Palette";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function StatsCards() {
  const stats = [
    {
      label: "Total Sales",
      value: "$12,450",
      change: "+23%",
      icon: <AttachMoneyIcon />,
      color: "#667eea",
    },
    {
      label: "Artworks",
      value: "156",
      change: "+12%",
      icon: <PaletteIcon />,
      color: "#764ba2",
    },
    {
      label: "Likes",
      value: "45.2K",
      change: "+18%",
      icon: <FavoriteIcon />,
      color: "#f093fb",
    },
    {
      label: "Views",
      value: "125K",
      change: "+31%",
      icon: <TrendingUpIcon />,
      color: "#4ecdc4",
    },
  ];

  return (
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
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -8 }}
        >
          <GlassCard sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background: `linear-gradient(135deg, ${stat.color}30 0%, ${stat.color}15 100%)`,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </Box>
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: "8px",
                  background: "rgba(74, 222, 128, 0.1)",
                  color: "#4ade80",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {stat.change}
              </Box>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 0.5,
                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {stat.value}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {stat.label}
            </Typography>
          </GlassCard>
        </motion.div>
      ))}
    </Box>
  );
}
