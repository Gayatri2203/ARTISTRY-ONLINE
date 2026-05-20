"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function FloatingActionSidebar() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8], [0, 1, 0]);

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.div
      style={{ y, opacity }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <GlassCard
        sx={{
          position: "sticky",
          top: 100,
          p: 2,
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
          Quick Actions
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Tooltip title="Like" arrow>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={() => setIsLiked(!isLiked)}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background: isLiked
                    ? "rgba(244, 63, 94, 0.2)"
                    : "rgba(255, 255, 255, 0.05)",
                  border: isLiked
                    ? "1px solid rgba(244, 63, 94, 0.5)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  color: isLiked ? "#f43f5e" : "text.secondary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: isLiked
                      ? "rgba(244, 63, 94, 0.3)"
                      : "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </motion.div>
          </Tooltip>

          <Tooltip title="Save" arrow>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={() => setIsSaved(!isSaved)}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background: isSaved
                    ? "rgba(99, 102, 241, 0.2)"
                    : "rgba(255, 255, 255, 0.05)",
                  border: isSaved
                    ? "1px solid rgba(99, 102, 241, 0.5)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  color: isSaved ? "primary.light" : "text.secondary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: isSaved
                      ? "rgba(99, 102, 241, 0.3)"
                      : "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </motion.div>
          </Tooltip>

          <Tooltip title="Share" arrow>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "text.secondary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ShareIcon />
              </IconButton>
            </motion.div>
          </Tooltip>

          <Tooltip title="Views" arrow>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "text.secondary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </motion.div>
          </Tooltip>
        </Box>

        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            1,205 views
          </Typography>
        </Box>
      </GlassCard>
    </motion.div>
  );
}
