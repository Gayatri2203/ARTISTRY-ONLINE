"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface ArtworkCardProps {
  id: string;
  title: string;
  price: string;
  color: string;
  likes: number;
  views: number;
  isLiked?: boolean;
  onLike?: () => void;
  onAddToCart?: () => void;
  onView?: () => void;
}

export function ArtworkCard({
  id,
  title,
  price,
  color,
  likes,
  views,
  isLiked = false,
  onLike,
  onAddToCart,
  onView,
}: ArtworkCardProps) {
  return (
    <motion.div whileHover={{ y: -8 }} whileTap={{ scale: 0.98 }}>
      <Card
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            aspectRatio: 1,
            background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={onView}
        >
          <Typography
            variant="h3"
            sx={{
              color: "rgba(255, 255, 255, 0.3)",
              fontWeight: 700,
              fontSize: 48,
            }}
          >
            {id}
          </Typography>

          {/* Hover Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              opacity: 0,
              transition: "opacity 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onLike?.();
                }}
                sx={{
                  width: 48,
                  height: 48,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "50%",
                  color: isLiked ? "#f43f5e" : "white",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.();
                }}
                sx={{
                  width: 48,
                  height: 48,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "50%",
                  color: "white",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <ShoppingCartIcon />
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onView?.();
                }}
                sx={{
                  width: 48,
                  height: 48,
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "50%",
                  color: "white",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </motion.div>
          </Box>
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              mb: 0.5,
              fontSize: "0.875rem",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
          >
            {price}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FavoriteBorderIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {likes}
            </Typography>
            <VisibilityIcon sx={{ fontSize: 14, color: "text.secondary", ml: 1 }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {views}
            </Typography>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
}
