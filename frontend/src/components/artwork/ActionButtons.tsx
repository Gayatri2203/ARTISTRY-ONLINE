"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function ActionButtons() {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(234);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Price & Actions
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5, display: "block" }}>
          Price
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          $1,250.00
        </Typography>
      </Box>

      <Stack spacing={2}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="gradient"
            fullWidth
            size="large"
            startIcon={<ShoppingCartIcon />}
            sx={{
              borderRadius: "12px",
              fontWeight: 600,
              py: 1.5,
            }}
          >
            Add to Cart
          </Button>
        </motion.div>

        <Stack direction="row" spacing={2}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flex: 1 }}>
            <Button
              variant={isLiked ? "gradient" : "glass"}
              fullWidth
              size="large"
              onClick={handleLike}
              startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                py: 1.5,
              }}
            >
              {likes}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ flex: 1 }}>
            <Button
              variant={isSaved ? "gradient" : "glass"}
              fullWidth
              size="large"
              onClick={() => setIsSaved(!isSaved)}
              startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                py: 1.5,
              }}
            >
              Save
            </Button>
          </motion.div>
        </Stack>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="glass"
            fullWidth
            size="large"
            startIcon={<ShareIcon />}
            sx={{
              borderRadius: "12px",
              fontWeight: 600,
              py: 1.5,
            }}
          >
            Share Artwork
          </Button>
        </motion.div>
      </Stack>
    </GlassCard>
  );
}
