"use client";

import Typography from "@mui/material/Typography";

import GlassCard from "./GlassCard";
import { MotionBox } from "./MotionBox";
import { floatTransition } from "./animations";
import type { StatItem } from "./types";

type FloatingStatCardProps = StatItem & {
  index?: number;
  compact?: boolean;
};

export default function FloatingStatCard({
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
          p: compact ? 2 : 2.5,
          minWidth: compact ? 120 : 140,
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
