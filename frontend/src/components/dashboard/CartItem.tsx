"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface CartItemProps {
  id: string;
  title: string;
  artist: string;
  category: string;
  price: string;
  color: string;
  quantity: number;
  onRemove?: () => void;
  onSave?: () => void;
  onUpdateQuantity?: (quantity: number) => void;
}

export function CartItem({
  id,
  title,
  artist,
  category,
  price,
  color,
  quantity,
  onRemove,
  onSave,
  onUpdateQuantity,
}: CartItemProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleIncrease = () => {
    const newQuantity = currentQuantity + 1;
    setCurrentQuantity(newQuantity);
    onUpdateQuantity?.(newQuantity);
  };

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      setCurrentQuantity(newQuantity);
      onUpdateQuantity?.(newQuantity);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <GlassCard
        sx={{
          p: 3,
          mb: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: "radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  color: "rgba(255, 255, 255, 0.4)",
                  fontWeight: 700,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {id}
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 0.5,
                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
              by {artist}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "primary.light",
                fontWeight: 600,
                mb: 1.5,
                display: "inline-block",
                px: 1.5,
                py: 0.5,
                borderRadius: "8px",
                background: "rgba(99, 102, 241, 0.1)",
              }}
            >
              {category}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    size="small"
                    onClick={handleDecrease}
                    disabled={currentQuantity === 1}
                    sx={{
                      width: 36,
                      height: 36,
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "10px",
                      color: "text.secondary",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&:disabled": {
                        opacity: 0.3,
                      },
                    }}
                  >
                    <RemoveIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </motion.div>

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    minWidth: 40,
                    textAlign: "center",
                  }}
                >
                  {currentQuantity}
                </Typography>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    size="small"
                    onClick={handleIncrease}
                    sx={{
                      width: 36,
                      height: 36,
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "10px",
                      color: "text.secondary",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                  >
                    <AddIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </motion.div>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "primary.light",
                }}
              >
                {price}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                size="small"
                onClick={handleSave}
                sx={{
                  color: isSaved ? "primary.light" : "text.secondary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: isSaved ? "secondary.light" : "text.primary",
                  },
                }}
              >
                {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                size="small"
                onClick={onRemove}
                sx={{
                  color: "text.secondary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "#f43f5e",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </motion.div>
          </Box>
        </Box>
      </GlassCard>
    </motion.div>
  );
}
