"use client";

import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

import { MotionBox } from "@/src/components/ui";
import { scaleIn } from "@/src/lib/motion";

export type AuthGlassCardProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export default function AuthGlassCard({ children, sx }: AuthGlassCardProps) {
  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      sx={{ width: "100%", maxWidth: 440, ...sx }}
    >
      <Box
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          boxShadow: (theme) =>
            `${theme.palette.artistry.shadows.lg}, 0 0 80px rgba(99, 102, 241, 0.12)`,
        }}
      >
        {children}
      </Box>
    </MotionBox>
  );
}
