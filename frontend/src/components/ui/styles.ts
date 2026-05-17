import type { SxProps, Theme } from "@mui/material/styles";
import type { CSSProperties } from "react";

/** Inline styles for full-height tappable Next.js links. */
export const tapLinkStyle: CSSProperties = {
  textDecoration: "none",
  display: "block",
  height: "100%",
  WebkitTapHighlightColor: "transparent",
};

export const footerLinkSx: SxProps<Theme> = {
  textDecoration: "none",
  transition: "color 0.2s",
  display: "inline-block",
  py: 0.25,
  minHeight: 32,
  lineHeight: 2,
  "&:hover": { color: "text.primary" },
};

export const navLinkSx: SxProps<Theme> = {
  color: "text.secondary",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: { md: "0.875rem", lg: "0.9375rem" },
  position: "relative",
  transition: "color 0.2s",
  py: 0.5,
  "&:hover": { color: "text.primary" },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -4,
    left: 0,
    width: 0,
    height: 2,
    borderRadius: 1,
    background: (theme) => theme.palette.gradients.primary,
    transition: "width 0.25s ease",
  },
  "&:hover::after": { width: "100%" },
};
