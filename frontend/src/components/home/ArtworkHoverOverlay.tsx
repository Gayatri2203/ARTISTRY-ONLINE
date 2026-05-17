"use client";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { memo } from "react";

export type ArtworkHoverOverlayProps = {
  title: string;
  price: string;
};

function ArtworkHoverOverlayComponent({ title, price }: ArtworkHoverOverlayProps) {
  return (
    <Box
      className="artwork-hover-overlay"
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        p: 2,
        opacity: 0,
        transition: "opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        background:
          "linear-gradient(180deg, transparent 0%, rgba(11,11,15,0.35) 40%, rgba(11,11,15,0.92) 100%)",
        "@media (hover: hover)": {
          ".artwork-card-root:hover &": { opacity: 1 },
        },
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.25 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="secondary.main" sx={{ fontWeight: 600, mb: 1.5 }}>
        {price}
      </Typography>
      <Button
        variant="gradient"
        size="small"
        endIcon={<ArrowForwardOutlinedIcon />}
        sx={{ alignSelf: "flex-start" }}
      >
        View artwork
      </Button>
    </Box>
  );
}

export const ArtworkHoverOverlay = memo(ArtworkHoverOverlayComponent);
