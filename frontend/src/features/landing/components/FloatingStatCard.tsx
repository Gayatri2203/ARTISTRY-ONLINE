"use client";

import Typography from "@mui/material/Typography";
import { memo } from "react";

import { GlassCard, MotionBox } from "@/src/components/ui";
import { floatTransition } from "@/src/lib/motion";

import type { StatItem } from "../types";

export type FloatingStatCardProps = StatItem & {
  index?: number;
  compact?: boolean;
};

function FloatingStatCardComponent({
  value,
  label,
  index = 0,
  compact = false,
}: FloatingStatCardProps) {
  return (
    <MotionBox
      animate={{ y: [0, compact ? -6 : -10, 0] }}
      transition={floatTransition(index * 0.5)}
      sx={{ height: "100%" }}
    >
      <GlassCard
        sx={{
          p: compact ? { xs: 1.5, sm: 2 } : { xs: 2, sm: 2.5 },
          minWidth: compact ? { xs: 0, sm: 120 } : { xs: 0, sm: 140 },
          textAlign: "center",
          height: "100%",
        }}
      >
        <Typography
          variant={compact ? "h6" : "h5"}
          color="primary.light"
          sx={{ fontWeight: 700 }}
        >
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
          {label}
        </Typography>
      </GlassCard>
    </MotionBox>
  );
}

export const FloatingStatCard = memo(FloatingStatCardComponent);
