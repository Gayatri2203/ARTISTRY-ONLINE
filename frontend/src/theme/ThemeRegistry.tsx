"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

import theme from "./theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1A1A24",
              color: "#F8FAFC",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "14px",
            },
            success: { iconTheme: { primary: "#34D399", secondary: "#1A1A24" } },
            error: { iconTheme: { primary: "#F87171", secondary: "#1A1A24" } },
          }}
        />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
