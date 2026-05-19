"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { motion, useScroll, useTransform } from "framer-motion";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function FloatingStatsCard() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8], [0, 1, 0]);

  const stats = [
    {
      label: "Total Sales",
      value: "$12,450",
      icon: <AttachMoneyIcon sx={{ fontSize: 24 }} />,
      color: "#667eea",
      change: "+23%",
    },
    {
      label: "This Month",
      value: "$2,340",
      icon: <TrendingUpIcon sx={{ fontSize: 24 }} />,
      color: "#f093fb",
      change: "+15%",
    },
    {
      label: "Ranking",
      value: "#42",
      icon: <EmojiEventsIcon sx={{ fontSize: 24 }} />,
      color: "#ffd700",
      change: "+5",
    },
  ];

  return (
    <motion.div
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <GlassCard
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          p: 2,
          zIndex: 1000,
          minWidth: 280,
          backdropFilter: "blur(20px)",
          background: "rgba(26, 26, 36, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: "text.primary",
            textAlign: "center",
          }}
        >
          Quick Stats
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.6, duration: 0.4 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.06)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    background: `linear-gradient(135deg, ${stat.color}30 0%, ${stat.color}15 100%)`,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: "text.primary",
                      fontSize: "0.95rem",
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#4ade80",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                >
                  {stat.change}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </GlassCard>
    </motion.div>
  );
}
