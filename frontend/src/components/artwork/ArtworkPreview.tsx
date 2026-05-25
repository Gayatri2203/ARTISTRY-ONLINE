"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

import { GlassCard } from "@/src/components/ui/GlassCard";

export type ArtworkPreviewProps = {
  imageUrl: string;
  title: string;
};

export function ArtworkPreview({ imageUrl, title }: ArtworkPreviewProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <GlassCard sx={{ p: 3, mb: 3 }}>
      <Box
        sx={{
          position: "relative",
          aspectRatio: 4 / 3,
          borderRadius: "16px",
          overflow: "hidden",
          bgcolor: "rgba(0,0,0,0.3)",
          cursor: isZoomed ? "zoom-out" : "zoom-in",
          transition: "transform 0.3s ease",
          transform: isZoomed ? "scale(1.5)" : "scale(1)",
        }}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            pointerEvents: "none",
          }}
        />

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
        </Box>
      </Box>
    </GlassCard>
  );
}
