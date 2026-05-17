"use client";

import Card, { type CardProps } from "@mui/material/Card";
import { memo } from "react";

import { hoverLift } from "@/src/lib/motion";

import { MotionBox } from "./MotionBox";

export type GlassCardProps = CardProps & {
  hoverable?: boolean;
};

function GlassCardComponent({
  hoverable = true,
  children,
  sx,
  ...props
}: GlassCardProps) {
  const card = (
    <Card
      elevation={0}
      sx={{
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );

  if (!hoverable) return card;

  return (
    <MotionBox whileHover={hoverLift} sx={{ height: "100%" }}>
      {card}
    </MotionBox>
  );
}

export const GlassCard = memo(GlassCardComponent);
