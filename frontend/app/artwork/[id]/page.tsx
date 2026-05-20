"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { use } from "react";
import { motion } from "framer-motion";

import { AppShell } from "@/src/components/layout/AppShell";
import { ArtworkPreview } from "@/src/components/artwork/ArtworkPreview";
import { ArtistInfo } from "@/src/components/artwork/ArtistInfo";
import { ArtworkDetails } from "@/src/components/artwork/ArtworkDetails";
import { ActionButtons } from "@/src/components/artwork/ActionButtons";
import { FloatingActionSidebar } from "@/src/components/artwork/FloatingActionSidebar";
import { RelatedArtworks } from "@/src/components/artwork/RelatedArtworks";
import { CommentsSection } from "@/src/components/artwork/CommentsSection";

import { fadeInUp, staggerContainer } from "@/src/lib/motion";

export default function ArtworkDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  if (!id) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Artwork not found
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <AppShell>
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
            Artwork Details
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Explore this masterpiece in detail
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 3,
          }}
        >
          <Box sx={{ flex: { xs: 1, lg: 1.5 } }}>
            <motion.div variants={fadeInUp}>
              <ArtworkPreview artworkId={id} />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ArtistInfo artistUsername="johndoe" artistName="John Doe" />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ArtworkDetails />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ActionButtons />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <RelatedArtworks />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <CommentsSection />
            </motion.div>
          </Box>

          <Box sx={{ flex: { xs: 1, lg: 1 } }}>
            <motion.div variants={fadeInUp}>
              <FloatingActionSidebar />
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Container>
    </AppShell>
  );
}
