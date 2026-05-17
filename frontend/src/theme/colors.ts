/**
 * Artistry Online — design tokens
 * Dark-first luxury palette with gradients, glass, and soft shadows.
 */

export const palette = {
  primary: {
    main: "#6366F1",
    light: "#818CF8",
    dark: "#4F46E5",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#22D3EE",
    light: "#67E8F9",
    dark: "#06B6D4",
    contrastText: "#0B0B0F",
  },

  success: { main: "#34D399", light: "#6EE7B7", dark: "#10B981" },
  warning: { main: "#FBBF24", light: "#FCD34D", dark: "#F59E0B" },
  error: { main: "#F87171", light: "#FCA5A5", dark: "#EF4444" },
  info: { main: "#60A5FA", light: "#93C5FD", dark: "#3B82F6" },

  background: {
    default: "#0B0B0F",
    paper: "#12121A",
    elevated: "#1A1A24",
  },

  text: {
    primary: "#F8FAFC",
    secondary: "#94A3B8",
    disabled: "#64748B",
  },

  divider: "rgba(248, 250, 252, 0.08)",

  action: {
    active: "#F8FAFC",
    hover: "rgba(248, 250, 252, 0.06)",
    selected: "rgba(99, 102, 241, 0.16)",
    disabled: "rgba(248, 250, 252, 0.26)",
    disabledBackground: "rgba(248, 250, 252, 0.08)",
    focus: "rgba(99, 102, 241, 0.24)",
  },
} as const;

export const gradients = {
  primary: "linear-gradient(135deg, #5B21B6 0%, #4F46E5 50%, #6366F1 100%)",
  primaryHover:
    "linear-gradient(135deg, #6D28D9 0%, #6366F1 50%, #818CF8 100%)",
  secondary: "linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)",
  hero: "linear-gradient(180deg, rgba(11, 11, 15, 0) 0%, #0B0B0F 100%)",
  mesh:
    "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(34, 211, 238, 0.12), transparent)",
  shimmer:
    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
} as const;

export const glass = {
  background: "rgba(255, 255, 255, 0.04)",
  backgroundHover: "rgba(255, 255, 255, 0.06)",
  border: "rgba(255, 255, 255, 0.08)",
  borderStrong: "rgba(255, 255, 255, 0.12)",
  blur: "blur(20px)",
  blurStrong: "blur(32px)",
} as const;

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  "2xl": 32,
  pill: 9999,
} as const;

export const shadows = {
  xs: "0 1px 2px rgba(0, 0, 0, 0.24)",
  sm: "0 2px 8px rgba(0, 0, 0, 0.28)",
  md: "0 8px 24px rgba(0, 0, 0, 0.32)",
  lg: "0 16px 48px rgba(0, 0, 0, 0.4)",
  glow: "0 0 40px rgba(99, 102, 241, 0.2)",
  glowCyan: "0 0 32px rgba(34, 211, 238, 0.15)",
  inner: "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
} as const;

export const cssVars = {
  "--ao-bg": palette.background.default,
  "--ao-bg-paper": palette.background.paper,
  "--ao-bg-elevated": palette.background.elevated,
  "--ao-text": palette.text.primary,
  "--ao-text-muted": palette.text.secondary,
  "--ao-primary": palette.primary.main,
  "--ao-secondary": palette.secondary.main,
  "--ao-gradient-primary": gradients.primary,
  "--ao-glass-bg": glass.background,
  "--ao-radius-md": `${radius.md}px`,
  "--ao-shadow-md": shadows.md,
} as const;
