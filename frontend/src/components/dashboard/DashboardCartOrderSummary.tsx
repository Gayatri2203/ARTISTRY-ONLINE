"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { motion } from "framer-motion";

import { GlassCard } from "@/src/components/ui/GlassCard";

type DashboardCartOrderSummaryProps = {
  subtotal: number;
  platformFee: number;
  taxes: number;
  total: number;
  promoCode: string;
  onPromoCodeChange: (value: string) => void;
  onCheckout: () => void;
};

export function DashboardCartOrderSummary({
  subtotal,
  platformFee,
  taxes,
  total,
  promoCode,
  onPromoCodeChange,
  onCheckout,
}: DashboardCartOrderSummaryProps) {
  return (
    <GlassCard
      hoverable={false}
      sx={{
        p: 3,
        position: "sticky",
        top: 92,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        backdropFilter: "blur(26px)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Order Summary
      </Typography>

      <Stack spacing={1.5}>
        <SummaryRow label="Subtotal" value={`$${subtotal.toLocaleString()}`} />
        <SummaryRow label="Platform Fee" value={`$${platformFee.toLocaleString()}`} />
        <SummaryRow label="Taxes" value={`$${taxes.toLocaleString()}`} />
      </Stack>

      <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.12)" }} />

      <SummaryRow
        label="Total"
        value={`$${total.toLocaleString()}`}
        emphasized
      />

      <TextField
        fullWidth
        size="small"
        placeholder="Add promo code"
        value={promoCode}
        onChange={(e) => onPromoCodeChange(e.target.value)}
        sx={{ mt: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <LocalOfferOutlinedIcon
                sx={{ fontSize: 18, mr: 1, color: "text.secondary" }}
              />
            ),
          },
        }}
      />

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button
          variant="gradient"
          fullWidth
          onClick={onCheckout}
          sx={{ mt: 2, py: 1.25, fontWeight: 700 }}
        >
          Checkout Securely
        </Button>
      </motion.div>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.75,
          mt: 1.5,
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary">
          End-to-end encrypted checkout
        </Typography>
      </Box>
    </GlassCard>
  );
}

function SummaryRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography color={emphasized ? "text.primary" : "text.secondary"}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontWeight: emphasized ? 800 : 600,
          color: emphasized ? "secondary.light" : "text.primary",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
