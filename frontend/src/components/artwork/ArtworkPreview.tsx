"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

import { GlassCard } from "@/src/components/ui/GlassCard";

interface ArtworkPreviewProps {
  artworkId: string;
}

export function ArtworkPreview({ artworkId }: ArtworkPreviewProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images = [
    { id: 1, color: "#667eea" },
    { id: 2, color: "#764ba2" },
    { id: 3, color: "#f093fb" },
    { id: 4, color: "#ff6b6b" },
  ];

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Box
        sx={{
          position: "relative",
          aspectRatio: 4 / 3,
          borderRadius: "16px",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${images[currentImage].color} 0%, ${images[currentImage].color}80 100%)`,
          cursor: isZoomed ? "zoom-out" : "zoom-in",
          transition: "transform 0.3s ease",
          transform: isZoomed ? "scale(1.5)" : "scale(1)",
        }}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255, 255, 255, 0.2)",
            fontWeight: 700,
            fontSize: 120,
            pointerEvents: "none",
          }}
        >
          {images[currentImage].id}
        </Typography>

        {/* Navigation Buttons */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            width: 48,
            height: 48,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            borderRadius: "50%",
            color: "white",
            "&:hover": {
              background: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            width: 48,
            height: 48,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            borderRadius: "50%",
            color: "white",
            "&:hover": {
              background: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Zoom Controls */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            display: "flex",
            gap: 1,
          }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
            sx={{
              width: 40,
              height: 40,
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
              borderRadius: "50%",
              color: "white",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            {isZoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(!isFullscreen);
            }}
            sx={{
              width: 40,
              height: 40,
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
              borderRadius: "50%",
              color: "white",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <ZoomInIcon />
          </IconButton>
        </Box>

        {/* Image Counter */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            px: 2,
            py: 1,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            borderRadius: "8px",
            color: "white",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          {currentImage + 1} / {images.length}
        </Box>
      </Box>

      {/* Thumbnail Gallery */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 3,
          overflowX: "auto",
          pb: 1,
        }}
      >
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentImage(index)}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${image.color} 0%, ${image.color}80 100%)`,
                cursor: "pointer",
                border: currentImage === index ? "3px solid" : "2px solid",
                borderColor: currentImage === index ? "primary.main" : "rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255, 255, 255, 0.3)",
                  fontWeight: 700,
                  fontSize: 24,
                }}
              >
                {image.id}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </GlassCard>
  );
}
