"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { GlassCard } from "@/src/components/ui/GlassCard";
import { fadeInUp } from "@/src/lib/motion";

interface ProfileStatsProps {
  username: string;
}

export function ProfileStats({ username }: ProfileStatsProps) {
  const stats = [
    {
      label: "Followers",
      value: "12.5K",
      icon: <PeopleOutlinedIcon />,
      color: "#667eea",
    },
    {
      label: "Following",
      value: "842",
      icon: <PersonAddOutlinedIcon />,
      color: "#764ba2",
    },
    {
      label: "Artworks",
      value: "156",
      icon: <CollectionsOutlinedIcon />,
      color: "#f093fb",
    },
    {
      label: "Likes",
      value: "45.2K",
      icon: <FavoriteBorderOutlinedIcon />,
      color: "#ff6b6b",
    },
  ];

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 3,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  textAlign: "center",
                  px: 2,
                  py: 2,
                  borderRadius: "16px",
                  transition: "background 0.3s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${stat.color}40 0%, ${stat.color}20 100%)`,
                    color: stat.color,
                    mx: "auto",
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </GlassCard>
    </motion.div>
  );
}
