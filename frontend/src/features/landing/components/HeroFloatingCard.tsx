"use client";

import Typography from "@mui/material/Typography";
import { memo } from "react";

import { GlassCard, MotionBox } from "@/src/components/ui";
import { floatTransition } from "@/src/lib/motion";

import type { FloatingCard } from "../types";

function HeroFloatingCardComponent({
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
        display: { xs: "none", md: "block" },
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

export const HeroFloatingCard = memo(HeroFloatingCardComponent);
