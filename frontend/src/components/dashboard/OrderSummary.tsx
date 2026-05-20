"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface OrderSummaryProps {
  subtotal: string;
  platformFee: string;
  taxes: string;
  total: string;
  onCheckout?: () => void;
  onApplyPromo?: (code: string) => void;
}

export function OrderSummary({
  subtotal,
  platformFee,
  taxes,
  total,
  onCheckout,
  onApplyPromo,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      onApplyPromo?.(promoCode);
      setIsApplied(true);
    }
  };

  return (
    <GlassCard
      sx={{
        p: 3,
        position: "sticky",
        top: 24,
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 3,
          background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Order Summary
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Subtotal
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
            {subtotal}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Platform Fee
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
            {platformFee}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Taxes
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
            {taxes}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
            Total
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {total}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1.5,
            fontWeight: 500,
          }}
        >
          Promo Code
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={isApplied}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "text.primary",
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
                "&.Mui-focused": {
                  borderColor: "rgba(99, 102, 241, 0.5)",
                },
              },
              "& .MuiOutlinedInput-input": {
                color: "text.primary",
              },
            }}
          />
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant={isApplied ? "contained" : "outlined"}
              size="small"
              onClick={handleApplyPromo}
              disabled={isApplied || !promoCode.trim()}
              sx={{
                borderRadius: "10px",
                fontWeight: 600,
                minWidth: 80,
                borderColor: "rgba(99, 102, 241, 0.5)",
                color: isApplied ? "#fff" : "primary.light",
                background: isApplied
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "transparent",
                "&:hover": {
                  borderColor: "rgba(99, 102, 241, 0.8)",
                  background: isApplied
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "rgba(99, 102, 241, 0.1)",
                },
              }}
            >
              {isApplied ? "Applied" : "Apply"}
            </Button>
          </motion.div>
        </Box>
      </Box>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          variant="gradient"
          fullWidth
          size="large"
          onClick={onCheckout}
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderRadius: "12px",
            fontWeight: 700,
            py: 1.5,
            mt: 3,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          Proceed to Checkout
        </Button>
      </motion.div>

      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          textAlign: "center",
          display: "block",
          mt: 2,
          fontSize: "0.75rem",
        }}
      >
        Secure checkout powered by Stripe
      </Typography>
    </GlassCard>
  );
}
