"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface OrderSummaryProps {
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  items: Array<{
    title: string;
    price: string;
    quantity: number;
  }>;
}

export function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
  items,
}: OrderSummaryProps) {
  return (
    <GlassCard sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 3, color: "text.primary" }}
      >
        Order Summary
      </Typography>

      <List sx={{ mb: 3 }}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              px: 0,
              py: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 500 }}>
                {item.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Qty: {item.quantity}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
              {item.price}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 2 }} />

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
          <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
            Total
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "primary.light",
            }}
          >
            {total}
          </Typography>
        </Box>
      </Box>
    </GlassCard>
  );
}
