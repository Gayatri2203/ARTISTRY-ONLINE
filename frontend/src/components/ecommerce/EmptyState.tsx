"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InventoryIcon from "@mui/icons-material/Inventory";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface EmptyStateProps {
  type: "cart" | "wishlist" | "orders";
  onAction?: () => void;
  actionLabel?: string;
}

export function EmptyState({ type, onAction, actionLabel }: EmptyStateProps) {
  const config = {
    cart: {
      icon: <ShoppingBagIcon sx={{ fontSize: 64 }} />,
      title: "Your cart is empty",
      description: "Looks like you haven't added any artworks yet. Start exploring our collection!",
      defaultActionLabel: "Browse Artworks",
    },
    wishlist: {
      icon: <FavoriteBorderIcon sx={{ fontSize: 64 }} />,
      title: "Your wishlist is empty",
      description: "Save your favorite artworks to view them later. Start adding pieces you love!",
      defaultActionLabel: "Explore Artworks",
    },
    orders: {
      icon: <InventoryIcon sx={{ fontSize: 64 }} />,
      title: "No orders yet",
      description: "You haven't made any purchases yet. Find your perfect artwork today!",
      defaultActionLabel: "Start Shopping",
    },
  };

  const { icon, title, description, defaultActionLabel } = config[type];

  return (
    <GlassCard sx={{ p: 6, textAlign: "center" }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
            color: "text.secondary",
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 4,
            maxWidth: 400,
            mx: "auto",
          }}
        >
          {description}
        </Typography>

        {onAction && (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="gradient"
              size="large"
              onClick={onAction}
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
              }}
            >
              {actionLabel || defaultActionLabel}
            </Button>
          </motion.div>
        )}
      </motion.div>
    </GlassCard>
  );
}
