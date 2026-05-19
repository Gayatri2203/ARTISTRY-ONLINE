"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface PricingSectionProps {
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  onCheckout?: () => void;
}

export function PricingSection({
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
}: PricingSectionProps) {
  return (
    <GlassCard sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Order Total
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Subtotal
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {subtotal}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Shipping
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {shipping}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Tax
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {tax}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
            Total
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "primary.light",
            }}
          >
            {total}
          </Typography>
        </Box>
      </Box>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          variant="gradient"
          fullWidth
          size="large"
          onClick={onCheckout}
          sx={{
            borderRadius: "12px",
            fontWeight: 600,
            py: 1.5,
            mt: 3,
          }}
        >
          Proceed to Checkout
        </Button>
      </motion.div>

      <Typography
        variant="caption"
        sx={{ color: "text.secondary", textAlign: "center", display: "block", mt: 2 }}
      >
        Secure checkout powered by Stripe
      </Typography>
    </GlassCard>
  );
}
