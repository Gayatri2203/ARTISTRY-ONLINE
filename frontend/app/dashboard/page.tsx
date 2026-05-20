"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";
import { AppShell } from "@/src/components/layout/AppShell";
import { DashboardSidebar } from "@/src/components/dashboard/DashboardSidebar";
import { StatsCards } from "@/src/components/dashboard/StatsCards";
import { RecentActivity } from "@/src/components/dashboard/RecentActivity";
import { RecentSales } from "@/src/components/dashboard/RecentSales";
import { SavedArtworks } from "@/src/components/dashboard/SavedArtworks";
import { Notifications } from "@/src/components/dashboard/Notifications";
import { ChartPlaceholder } from "@/src/components/dashboard/ChartPlaceholder";
import { CartDashboard } from "@/src/components/dashboard/CartDashboard";

import { GlassCard } from "@/src/components/ui/GlassCard";
import { fadeInUp, staggerContainer } from "@/src/lib/motion";

function DashboardPageContent() {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0: // Overview
        return (
          <>
            <motion.div variants={fadeInUp}>
              <StatsCards />
            </motion.div>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: 3,
                mt: 3,
              }}
            >
              <Box sx={{ flex: { xs: 1, lg: 2 } }}>
                <motion.div variants={fadeInUp}>
                  <ChartPlaceholder />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <RecentSales />
                </motion.div>
              </Box>

              <Box sx={{ flex: { xs: 1, lg: 1 } }}>
                <motion.div variants={fadeInUp}>
                  <RecentActivity />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Notifications />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <SavedArtworks />
                </motion.div>
              </Box>
            </Box>
          </>
        );
      case 1: // Cart
        return <CartDashboard />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100%" }}>
      <DashboardSidebar />

      <Box sx={{ flex: 1, p: 3 }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
              Welcome back! Here's your overview
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <GlassCard sx={{ mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={(_e, newValue) => setActiveTab(newValue)}
                sx={{
                  minHeight: 56,
                  "& .MuiTabs-indicator": {
                    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    height: 3,
                    borderRadius: "3px 3px 0 0",
                  },
                  "& .MuiTab-root": {
                    minHeight: 56,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: "text.secondary",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "text.primary",
                    },
                    "&.Mui-selected": {
                      color: "text.primary",
                    },
                  },
                }}
              >
                <Tab label="Overview" />
                <Tab label="My Cart" />
              </Tabs>
            </GlassCard>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Box>
    </Box>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <DashboardPageContent />
      </AppShell>
    </ProtectedRoute>
  );
}
