"use client";

import Typography from "@mui/material/Typography";

import GlassCard from "./GlassCard";
import { MotionBox } from "./MotionBox";
import { floatTransition } from "./animations";
import type { FloatingCard } from "./types";

export default function HeroFloatingCard({
  title,
  subtitle,
  position,
  delay = 0,
}: FloatingCard) {
  return (
    <MotionBox
      animate={{ y: [0, -8, 0] }}
      transition={floatTransition(delay)}
      sx={{
        position: "absolute",
        display: { xs: "none", sm: "block" },
        zIndex: 2,
        ...position,
      }}
    >
      <GlassCard hoverable={false} sx={{ p: 1.5, minWidth: 140 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </GlassCard>
    </MotionBox>
  );
}
