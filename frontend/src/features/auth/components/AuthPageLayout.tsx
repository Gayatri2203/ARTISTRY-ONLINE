"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

import Logo from "@/src/components/layout/Logo";
import { MotionBox } from "@/src/components/ui";
import { fadeInUp } from "@/src/lib/motion";

import AuthBackground from "./AuthBackground";

export type AuthPageLayoutProps = {
  children: ReactNode;
};

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <AuthBackground />

      <Box
        component="header"
        sx={{
          position: "relative",
          zIndex: 2,
          py: 2,
          px: { xs: 2, sm: 3 },
          pt: "calc(16px + var(--safe-top))",
        }}
      >
        <Logo />
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          alignItems: "center",
          py: { xs: 3, sm: 5 },
          pb: { xs: "calc(24px + var(--safe-bottom))", sm: 5 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          sx={{ width: "100%", alignItems: "center" }}
        >
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              pr: 4,
              maxWidth: 480,
            }}
          >
            <Typography
              variant="overline"
              color="secondary"
              sx={{ mb: 2, letterSpacing: "0.14em" }}
            >
              Artistry Online
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.03em",
                mb: 2,
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              }}
            >
              Where exceptional art meets collectors
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Join a curated marketplace for original works, commissions, and
              gallery-grade discovery — crafted for artists and discerning
              collectors alike.
            </Typography>
          </MotionBox>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            {children}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
