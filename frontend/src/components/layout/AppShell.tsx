"use client";

import Box from "@mui/material/Box";
import { Footer, Navbar } from "@/src/components/layout";

/** Wraps pages that need global navbar + footer (dashboard, upload, profile, etc.) */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: "100%",
        width: "100%",
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
