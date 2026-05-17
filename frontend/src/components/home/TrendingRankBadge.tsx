"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { memo } from "react";

export type TrendingRankBadgeProps = {
  rank: 1 | 2 | 3;
};

const RANK_GRADIENTS: Record<1 | 2 | 3, string> = {
  1: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
  2: "linear-gradient(135deg, #94A3B8 0%, #E2E8F0 100%)",
  3: "linear-gradient(135deg, #B45309 0%, #D97706 100%)",
};

function TrendingRankBadgeComponent({ rank }: TrendingRankBadgeProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 2,
        px: 1.25,
        py: 0.5,
        borderRadius: 2,
        background: RANK_GRADIENTS[rank],
        boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 800,
          color: rank === 1 ? "#0B0B0F" : "#0B0B0F",
          letterSpacing: "0.06em",
        }}
      >
        #{rank}
      </Typography>
    </Box>
  );
}

export const TrendingRankBadge = memo(TrendingRankBadgeComponent);
