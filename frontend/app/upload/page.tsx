"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

import { DragDropUpload } from "@/src/components/upload/DragDropUpload";
import { ArtworkForm } from "@/src/components/upload/ArtworkForm";
import { ArtworkPreview } from "@/src/components/upload/ArtworkPreview";

import { fadeInUp, staggerContainer } from "@/src/lib/motion";

export default function UploadPage() {
  return (
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
            Upload Artwork
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Share your creative masterpiece with the world
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
              <DragDropUpload />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ArtworkForm />
            </motion.div>
          </Box>

          <Box sx={{ flex: { xs: 1, lg: 1 } }}>
            <motion.div variants={fadeInUp}>
              <ArtworkPreview />
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
}
