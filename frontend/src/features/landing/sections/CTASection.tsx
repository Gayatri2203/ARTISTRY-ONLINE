"use client";

import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { AnimatedInView, GlassCard, MotionBox, SectionShell } from "@/src/components/ui";
import { fadeInUp, scaleIn } from "@/src/lib/motion";

export default function CTASection() {
  return (
    <SectionShell maxWidth="md">
      <AnimatedInView variants={scaleIn}>
        <GlassCard
          hoverable={false}
          sx={{
            textAlign: "center",
            p: { xs: 3, sm: 4, md: 7 },
            background: (theme) =>
              `linear-gradient(135deg, rgba(99,102,241,0.14) 0%, ${theme.palette.background.paper} 45%, rgba(34,211,238,0.1) 100%)`,
            border: (theme) => `1px solid ${theme.palette.glass.borderStrong}`,
            boxShadow: (theme) =>
              `${theme.palette.artistry.shadows.lg}, ${theme.palette.artistry.shadows.glow}`,
          }}
        >
          <MotionBox variants={fadeInUp}>
            <PaletteOutlinedIcon
              sx={{
                fontSize: { xs: 40, sm: 48, md: 52 },
                color: "primary.light",
                mb: { xs: 1.5, sm: 2 },
              }}
            />
            <Typography
              variant="h4"
              sx={{
                mb: { xs: 1.5, sm: 2 },
                fontSize: {
                  xs: "clamp(1.25rem, 4vw, 1.5rem)",
                  sm: "1.375rem",
                },
                px: { xs: 0.5, sm: 0 },
              }}
            >
              Ready to share your vision?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: { xs: 3, sm: 4 },
                maxWidth: 480,
                mx: "auto",
                fontSize: { xs: "0.9375rem", sm: "1rem" },
                px: { xs: 0.5, sm: 0 },
              }}
            >
              Join thousands of artists selling originals, prints, and
              commissions on a platform built for creative professionals.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                justifyContent: "center",
                maxWidth: { xs: 400, sm: "none" },
                mx: "auto",
              }}
            >
              <Button
                variant="gradient"
                size="large"
                fullWidth
                component={Link}
                href="/sell"
              >
                Sell artwork
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                component={Link}
                href="/signup"
              >
                Create account
              </Button>
            </Stack>
          </MotionBox>
        </GlassCard>
      </AnimatedInView>
    </SectionShell>
  );
}
