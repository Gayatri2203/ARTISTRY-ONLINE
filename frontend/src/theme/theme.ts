import {
  createTheme,
  responsiveFontSizes,
  type Theme,
  type ThemeOptions,
} from "@mui/material/styles";

import { glass, gradients, palette, radius, shadows } from "./colors";
import { typography } from "./typography";

declare module "@mui/material/styles" {
  interface Palette {
    gradients: typeof gradients;
    glass: typeof glass;
    artistry: {
      radius: typeof radius;
      shadows: typeof shadows;
    };
  }
  interface PaletteOptions {
    gradients?: typeof gradients;
    glass?: typeof glass;
    artistry?: {
      radius?: typeof radius;
      shadows?: typeof shadows;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true;
    glass: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    glass: true;
  }
}

const baseThemeOptions: ThemeOptions = {
  cssVariables: true,
  palette: {
    mode: "dark",
    primary: palette.primary,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    info: palette.info,
    background: palette.background,
    text: palette.text,
    divider: palette.divider,
    action: palette.action,
    gradients,
    glass,
    artistry: { radius, shadows },
  },

  typography,

  shape: {
    borderRadius: radius.md,
  },

  spacing: 8,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          backgroundColor: palette.background.default,
          backgroundImage: gradients.mesh,
          backgroundAttachment: "fixed",
          color: palette.text.primary,
          minHeight: "100%",
        },
        "::selection": {
          backgroundColor: "rgba(99, 102, 241, 0.35)",
          color: palette.text.primary,
        },
        a: {
          color: palette.secondary.main,
          textDecoration: "none",
          transition: "color 0.2s ease",
          "&:hover": {
            color: palette.secondary.light,
          },
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
          "@media (min-width:600px)": {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: radius.lg,
          padding: "10px 22px",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          "&.MuiButton-contained.MuiButton-colorPrimary": {
            backgroundImage: gradients.primary,
            boxShadow: `${shadows.md}, ${shadows.glow}`,
            "&:hover": {
              backgroundImage: gradients.primaryHover,
              boxShadow: `${shadows.lg}, ${shadows.glow}`,
              transform: "translateY(-1px)",
            },
          },
          "&.MuiButton-contained.MuiButton-colorSecondary": {
            backgroundImage: gradients.secondary,
            color: palette.background.default,
            "&:hover": {
              filter: "brightness(1.08)",
              transform: "translateY(-1px)",
            },
          },
        },
        sizeLarge: {
          padding: "14px 28px",
          fontSize: "1rem",
          borderRadius: radius.xl,
        },
        sizeSmall: {
          padding: "6px 16px",
          borderRadius: radius.md,
        },
        outlined: {
          borderColor: glass.borderStrong,
          color: palette.text.primary,
          backdropFilter: glass.blur,
          "&:hover": {
            borderColor: "rgba(255,255,255,0.2)",
            backgroundColor: glass.backgroundHover,
          },
        },
        text: {
          color: palette.text.secondary,
          "&:hover": {
            backgroundColor: palette.action.hover,
            color: palette.text.primary,
          },
        },
      },
      variants: [
        {
          props: { variant: "gradient" },
          style: {
            backgroundImage: gradients.primary,
            color: "#fff",
            boxShadow: `${shadows.md}, ${shadows.glow}`,
            "&:hover": {
              backgroundImage: gradients.primaryHover,
              boxShadow: `${shadows.lg}, ${shadows.glow}`,
              transform: "translateY(-1px)",
            },
          },
        },
        {
          props: { variant: "glass" },
          style: {
            background: glass.background,
            backdropFilter: glass.blur,
            border: `1px solid ${glass.border}`,
            color: palette.text.primary,
            "&:hover": {
              background: glass.backgroundHover,
              borderColor: glass.borderStrong,
            },
          },
        },
      ],
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          background: glass.background,
          backdropFilter: glass.blur,
          WebkitBackdropFilter: glass.blur,
          border: `1px solid ${glass.border}`,
          borderRadius: radius.xl,
          boxShadow: shadows.md,
          transition:
            "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
          "&:hover": {
            borderColor: glass.borderStrong,
            boxShadow: shadows.lg,
          },
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: palette.background.paper,
          borderRadius: radius.lg,
        },
      },
      variants: [
        {
          props: { variant: "glass" },
          style: {
            background: glass.background,
            backdropFilter: glass.blur,
            WebkitBackdropFilter: glass.blur,
            border: `1px solid ${glass.border}`,
            boxShadow: shadows.md,
          },
        },
      ],
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(11, 11, 15, 0.72)",
          backdropFilter: glass.blurStrong,
          WebkitBackdropFilter: glass.blurStrong,
          borderBottom: `1px solid ${glass.border}`,
          boxShadow: "none",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: radius.md,
            backgroundColor: glass.background,
            backdropFilter: glass.blur,
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            "& fieldset": {
              borderColor: glass.border,
            },
            "&:hover fieldset": {
              borderColor: glass.borderStrong,
            },
            "&.Mui-focused fieldset": {
              borderColor: palette.primary.main,
              boxShadow: `0 0 0 3px ${palette.action.focus}`,
            },
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: radius.pill,
          fontWeight: 600,
          backdropFilter: glass.blur,
        },
        filled: {
          backgroundColor: "rgba(99, 102, 241, 0.2)",
          color: palette.primary.light,
        },
        outlined: {
          borderColor: glass.border,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: palette.divider,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          background: palette.background.elevated,
          backdropFilter: glass.blurStrong,
          border: `1px solid ${glass.border}`,
          borderRadius: radius["2xl"],
          boxShadow: shadows.lg,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: palette.background.elevated,
          border: `1px solid ${glass.border}`,
          borderRadius: radius.sm,
          fontSize: "0.8125rem",
          boxShadow: shadows.md,
        },
      },
    },
  },
};

function createArtistryTheme(): Theme {
  const theme = createTheme(baseThemeOptions);
  return responsiveFontSizes(theme, {
    breakpoints: ["sm", "md", "lg"],
    factor: 2,
  });
}

export const theme = createArtistryTheme();
export default theme;
