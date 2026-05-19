"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";
import { AppShell } from "@/src/components/layout/AppShell";
import { DashboardSidebar } from "@/src/components/dashboard/DashboardSidebar";
import { StatsCards } from "@/src/components/dashboard/StatsCards";
import { RecentActivity } from "@/src/components/dashboard/RecentActivity";
import { RecentSales } from "@/src/components/dashboard/RecentSales";
import { SavedArtworks } from "@/src/components/dashboard/SavedArtworks";
import { Notifications } from "@/src/components/dashboard/Notifications";
import { ChartPlaceholder } from "@/src/components/dashboard/ChartPlaceholder";

import { fadeInUp, staggerContainer } from "@/src/lib/motion";

function DashboardPageContent() {
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
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
              Welcome back! Here's your overview
            </Typography>
          </motion.div>

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
