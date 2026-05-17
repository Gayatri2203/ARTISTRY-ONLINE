"use client";

import Box from "@mui/material/Box";

import { MotionBox } from "@/src/components/ui";

export default function AuthBackground() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        bgcolor: "background.default",
      }}
    >
      <MotionBox
        animate={{
          scale: [1, 1.12, 1],
          rotate: [0, 8, 0],
          opacity: [0.4, 0.55, 0.4],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "-25%",
          left: "20%",
          width: { xs: "90%", md: "55%" },
          height: "60%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(99, 102, 241, 0.35) 0%, transparent 68%)",
          filter: "blur(72px)",
        }}
      />
      <MotionBox
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "5%",
          right: "-10%",
          width: { xs: 280, md: 480 },
          height: { xs: 280, md: 480 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.22) 0%, transparent 70%)",
          filter: "blur(64px)",
        }}
      />
      <MotionBox
        animate={{
          x: [0, -30, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        sx={{
          position: "absolute",
          bottom: "0%",
          left: "-15%",
          width: { xs: 260, md: 420 },
          height: { xs: 260, md: 420 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91, 33, 182, 0.28) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(11,11,15,0.2) 0%, rgba(11,11,15,0.85) 50%, #0B0B0F 100%)",
        }}
      />
    </Box>
  );
}
