"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { AppShell } from "@/src/components/layout/AppShell";
import { ProfileHeader } from "@/src/components/profile/ProfileHeader";
import { ProfileStats } from "@/src/components/profile/ProfileStats";
import { BioSection } from "@/src/components/profile/BioSection";
import { ArtistBadges } from "@/src/components/profile/ArtistBadges";
import { TabNavigation } from "@/src/components/profile/TabNavigation";
import { ArtworkGrid } from "@/src/components/profile/ArtworkGrid";
import { ActivitySection } from "@/src/components/profile/ActivitySection";
import { FloatingStatsCard } from "@/src/components/profile/FloatingStatsCard";

import { CartItem } from "@/src/components/ecommerce/CartItem";
import { ArtworkCard } from "@/src/components/ecommerce/ArtworkCard";
import { GlassCard } from "@/src/components/ui/GlassCard";

import { fadeInUp, staggerContainer } from "@/src/lib/motion";

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params);
  const [activeTab, setActiveTab] = useState(0);
  
  if (!username) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            User not found
          </Typography>
        </Box>
      </Container>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Collection
        return <ArtworkGrid />;
      case 1: // Saved
        return (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <ArtworkCard
                key={item}
                id={item.toString()}
                title={`Artwork ${item}`}
                price={`$${(item * 250).toLocaleString()}`}
                color={`hsl(${item * 60}, 70%, 60%)`}
                likes={item * 50}
                views={item * 100}
                isLiked={true}
              />
            ))}
          </Box>
        );
      case 2: // Cart
        return (
          <Box>
            {[
              { id: "1", title: "Ethereal Dreams", price: "$1,250", color: "#667eea", quantity: 1 },
              { id: "2", title: "Cosmic Journey", price: "$950", color: "#764ba2", quantity: 2 },
            ].map((item, index) => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                color={item.color}
                quantity={item.quantity}
              />
            ))}
          </Box>
        );
      case 3: // Orders
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { id: "ORD-001", date: "Jan 15, 2024", status: "Delivered", total: "$1,250" },
              { id: "ORD-002", date: "Jan 10, 2024", status: "Processing", total: "$2,050" },
            ].map((order) => (
              <GlassCard key={order.id} sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {order.id}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {order.date}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: "8px",
                      background: order.status === "Delivered" ? "rgba(74, 222, 128, 0.2)" : "rgba(99, 102, 241, 0.2)",
                      color: order.status === "Delivered" ? "#4ade80" : "#667eea",
                      fontWeight: 600,
                    }}
                  >
                    {order.status}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.light" }}>
                    {order.total}
                  </Typography>
                </Box>
              </GlassCard>
            ))}
          </Box>
        );
      case 4: // Activity
        return <ActivitySection />;
      default:
        return <ArtworkGrid />;
    }
  };

  return (
    <AppShell>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        <ProfileHeader username={username} />
        
        <motion.div variants={fadeInUp}>
          <ProfileStats username={username} />
        </motion.div>

        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
            }}
          >
            <Box sx={{ flex: { xs: 1, md: 2 } }}>
              <motion.div variants={fadeInUp}>
                <BioSection username={username} />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <ArtistBadges username={username} />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <TabNavigation onTabChange={setActiveTab} />
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </Box>

            <Box sx={{ flex: { xs: 1, md: 1 } }}>
              <motion.div variants={fadeInUp}>
                <ActivitySection />
              </motion.div>
            </Box>
          </Box>
        </Box>

        <FloatingStatsCard />
      </motion.div>
    </Container>
    </AppShell>
  );
}
