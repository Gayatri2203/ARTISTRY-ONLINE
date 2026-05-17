"use client";

import Box from "@mui/material/Box";

import { Footer, Navbar } from "@/src/components/layout";
import { BackgroundEffects } from "@/src/features/landing/sections";

import TrendingExploreSection from "./TrendingExploreSection";

export default function ExplorePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: "100%",
        position: "relative",
        overflow: { xs: "clip", md: "hidden" },
        width: "100%",
      }}
    >
      <BackgroundEffects />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Navbar />
        <main className="flex-1">
          <TrendingExploreSection />
        </main>
        <Footer />
      </Box>
    </Box>
  );
}
