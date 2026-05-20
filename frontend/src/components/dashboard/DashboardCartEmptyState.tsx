"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { motion } from "framer-motion";
import Link from "next/link";

import { GlassCard } from "@/src/components/ui/GlassCard";

export function DashboardCartEmptyState() {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <GlassCard
        hoverable={false}
        sx={{
          p: { xs: 4, md: 6 },
          textAlign: "center",
          border: "1px solid",
          borderColor: "divider",
          background:
            "radial-gradient(circle at top, rgba(99,102,241,0.16), transparent 58%), rgba(255,255,255,0.03)",
        }}
      >
        <Stack spacing={2.5} sx={{ alignItems: "center" }}>
          <ShoppingCartOutlinedIcon sx={{ fontSize: 42, color: "text.secondary" }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Your cart is empty
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 460 }}>
            Curate a premium collection by exploring trending works from top artists.
          </Typography>
          <Button component={Link} href="/explore" variant="gradient">
            Explore Artworks
          </Button>
        </Stack>
      </GlassCard>
    </motion.div>
  );
}
