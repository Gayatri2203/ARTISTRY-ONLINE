"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import { DashboardSidebar } from "@/src/components/dashboard/DashboardSidebar";
import {
  DashboardCartItemCard,
  type DashboardCartItem,
} from "@/src/components/dashboard/DashboardCartItemCard";
import { DashboardCartOrderSummary } from "@/src/components/dashboard/DashboardCartOrderSummary";
import { DashboardCartEmptyState } from "@/src/components/dashboard/DashboardCartEmptyState";
import { GlassCard } from "@/src/components/ui/GlassCard";

const initialItems: DashboardCartItem[] = [
  {
    id: "art-emerald",
    title: "Emerald Horizon",
    artistName: "Elena Voss",
    category: "Digital Painting",
    price: 1250,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-orchid",
    title: "Orchid Nebula",
    artistName: "Riku Matsuda",
    category: "3D Illustration",
    price: 980,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "art-obsidian",
    title: "Obsidian Drift",
    artistName: "Maya Chen",
    category: "Abstract Motion",
    price: 760,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
  },
];

export default function DashboardCartSection() {
  const [items, setItems] = useState<DashboardCartItem[]>(initialItems);
  const [promoCode, setPromoCode] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const platformFee = useMemo(() => Math.round(subtotal * 0.045), [subtotal]);
  const taxes = useMemo(() => Math.round((subtotal + platformFee) * 0.08), [subtotal, platformFee]);
  const total = subtotal + platformFee + taxes;

  const mutateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100%",
        background:
          "radial-gradient(circle at 8% 0%, rgba(99,102,241,0.18), transparent 36%), radial-gradient(circle at 92% 0%, rgba(34,211,238,0.12), transparent 33%)",
      }}
    >
      <DashboardSidebar />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg,#fff,rgba(255,255,255,0.68))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Cart
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
            Curate your premium collection before checkout.
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0,1fr) 360px" },
            gap: 3,
          }}
        >
          <GlassCard
            hoverable={false}
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              maxHeight: { lg: "calc(100vh - 170px)" },
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.24) transparent",
              "&::-webkit-scrollbar": { width: 8 },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: 8,
                backgroundColor: "rgba(255,255,255,0.22)",
              },
            }}
          >
            {items.length === 0 ? (
              <DashboardCartEmptyState />
            ) : (
              <AnimatePresence>
                <Box sx={{ display: "grid", gap: 2 }}>
                  {items.map((item) => (
                    <DashboardCartItemCard
                      key={item.id}
                      item={item}
                      onIncrease={(id) => mutateQty(id, 1)}
                      onDecrease={(id) => mutateQty(id, -1)}
                      onRemove={removeItem}
                      onSaveForLater={(id) => {
                        removeItem(id);
                        toast.success("Saved for later");
                      }}
                    />
                  ))}
                </Box>
              </AnimatePresence>
            )}
          </GlassCard>

          <DashboardCartOrderSummary
            subtotal={subtotal}
            platformFee={platformFee}
            taxes={taxes}
            total={total}
            promoCode={promoCode}
            onPromoCodeChange={setPromoCode}
            onCheckout={() => toast.success("Checkout flow initialized")}
          />
        </Box>
      </Container>
    </Box>
  );
}
