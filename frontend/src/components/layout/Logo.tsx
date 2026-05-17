"use client";

import Typography from "@mui/material/Typography";
import Link from "next/link";

type LogoProps = {
  size?: "small" | "medium";
};

export default function Logo({ size = "medium" }: LogoProps) {
  return (
    <Typography
      component={Link}
      href="/"
      variant={size === "small" ? "subtitle1" : "h6"}
      sx={{
        fontWeight: 700,
        letterSpacing: "-0.02em",
        background: (t) => t.palette.gradients.primary,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      Artistry Online
    </Typography>
  );
}
