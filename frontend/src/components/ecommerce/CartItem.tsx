"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
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
    >
      <GlassCard sx={{ p: 2, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "rgba(255, 255, 255, 0.3)",
                fontWeight: 700,
              }}
            >
              {id}
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "text.primary", mb: 0.5 }}
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "primary.light",
                mb: 1,
              }}
            >
              {price}
            </Typography>

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
                    width: 32,
                    height: 32,
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    color: "text.secondary",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:disabled": {
                      opacity: 0.3,
                    },
                  }}
                >
                  <RemoveIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </motion.div>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  minWidth: 30,
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
                    width: 32,
                    height: 32,
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    color: "text.secondary",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <AddIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </motion.div>
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
