import type { TypographyVariantsOptions } from "@mui/material/styles";

export const fontFamily = {
  display:
    'var(--font-geist-sans), "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  body: 'var(--font-geist-sans), Inter, ui-sans-serif, system-ui, sans-serif',
  mono: 'var(--font-geist-mono), ui-monospace, monospace',
} as const;

const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const typography: TypographyVariantsOptions = {
  fontFamily: fontFamily.body,
  fontWeightRegular: fontWeight.regular,
  fontWeightMedium: fontWeight.medium,
  fontWeightBold: fontWeight.bold,

  h1: {
    fontFamily: fontFamily.display,
    fontWeight: fontWeight.bold,
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
    lineHeight: 1.08,
    letterSpacing: "-0.03em",
  },
  h2: {
    fontFamily: fontFamily.display,
    fontWeight: fontWeight.bold,
    fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
    lineHeight: 1.12,
    letterSpacing: "-0.025em",
  },
  h3: {
    fontFamily: fontFamily.display,
    fontWeight: fontWeight.semibold,
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  h4: {
    fontFamily: fontFamily.display,
    fontWeight: fontWeight.semibold,
    fontSize: "1.375rem",
    lineHeight: 1.25,
    letterSpacing: "-0.015em",
  },
  h5: {
    fontWeight: fontWeight.semibold,
    fontSize: "1.125rem",
    lineHeight: 1.35,
  },
  h6: {
    fontWeight: fontWeight.semibold,
    fontSize: "1rem",
    lineHeight: 1.4,
    letterSpacing: "0.01em",
    textTransform: "uppercase",
  },

  subtitle1: {
    fontSize: "1.0625rem",
    lineHeight: 1.5,
    fontWeight: fontWeight.medium,
  },
  subtitle2: {
    fontSize: "0.9375rem",
    lineHeight: 1.45,
    fontWeight: fontWeight.medium,
    letterSpacing: "0.01em",
  },

  body1: {
    fontSize: "1rem",
    lineHeight: 1.65,
    fontWeight: fontWeight.regular,
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.6,
    fontWeight: fontWeight.regular,
  },

  button: {
    fontFamily: fontFamily.display,
    fontWeight: fontWeight.semibold,
    fontSize: "0.9375rem",
    lineHeight: 1.5,
    letterSpacing: "0.02em",
    textTransform: "none",
  },

  caption: {
    fontSize: "0.75rem",
    lineHeight: 1.5,
    letterSpacing: "0.04em",
  },

  overline: {
    fontFamily: fontFamily.display,
    fontSize: "0.6875rem",
    fontWeight: fontWeight.semibold,
    lineHeight: 1.6,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
};

export const textStyles = {
  hero: {
    fontFamily: fontFamily.display,
    fontWeight: fontWeight.bold,
    fontSize: "clamp(2.5rem, 6vw, 4rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
    background: "linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  label: {
    fontSize: "0.75rem",
    fontWeight: fontWeight.semibold,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  },
} as const;
