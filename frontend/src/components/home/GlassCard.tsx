"use client";

import Card, { type CardProps } from "@mui/material/Card";

import { MotionBox } from "./MotionBox";
import { hoverLift } from "./animations";

type GlassCardProps = CardProps & {
  hoverable?: boolean;
};

export default function GlassCard({
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
