"use client";

import Box from "@mui/material/Box";

import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";

import BackgroundEffects from "./BackgroundEffects";
import CategoriesSection from "./CategoriesSection";
import CTASection from "./CTASection";
import FeaturedArtworks from "./FeaturedArtworks";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundEffects />
      <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <StatsSection />
          <CategoriesSection />
          <FeaturedArtworks />
          <CTASection />
        </main>
        <Footer />
      </Box>
    </Box>
  );
}
