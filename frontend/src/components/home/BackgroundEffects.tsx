"use client";

import Box from "@mui/material/Box";

import { MotionBox } from "./MotionBox";

export default function BackgroundEffects() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <MotionBox
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: "120%", md: "70%" },
          height: "50%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(99, 102, 241, 0.28) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <MotionBox
        animate={{
          x: [0, 30, 0],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <MotionBox
        animate={{
          x: [0, -20, 0],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "-8%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91, 33, 182, 0.22) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />
      <Box
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#0B0B0F_85%)]"
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(11, 11, 15, 0.4) 60%, #0B0B0F 100%)",
        }}
      />
    </Box>
  );
}
