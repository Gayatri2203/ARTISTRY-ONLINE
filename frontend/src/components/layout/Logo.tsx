"use client";

import Typography from "@mui/material/Typography";
import Link from "next/link";

export type LogoSize = "small" | "medium";

export type LogoProps = {
  size?: LogoSize;
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
        fontSize: size === "small" ? undefined : { xs: "0.9375rem", sm: "1rem" },
        background: (theme) => theme.palette.gradients.primary,
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
