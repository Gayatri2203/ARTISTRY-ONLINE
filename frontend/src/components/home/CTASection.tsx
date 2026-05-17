"use client";

import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import GlassCard from "./GlassCard";
import { MotionBox } from "./MotionBox";
import { fadeInUp, scaleIn, viewportOnce } from "./animations";

export default function CTASection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        zIndex: 1,
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="md">
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scaleIn}
        >
          <GlassCard
            hoverable={false}
            sx={{
              textAlign: "center",
              p: { xs: 4, md: 7 },
              background: (t) =>
                `linear-gradient(135deg, rgba(99,102,241,0.14) 0%, ${t.palette.background.paper} 45%, rgba(34,211,238,0.1) 100%)`,
              border: (t) => `1px solid ${t.palette.glass.borderStrong}`,
              boxShadow: (t) =>
                `${t.palette.artistry.shadows.lg}, ${t.palette.artistry.shadows.glow}`,
            }}
          >
            <MotionBox variants={fadeInUp}>
              <PaletteOutlinedIcon
                sx={{ fontSize: 52, color: "primary.light", mb: 2 }}
              />
              <Typography variant="h4" sx={{ mb: 2 }}>
                Ready to share your vision?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 480, mx: "auto" }}
              >
                Join thousands of artists selling originals, prints, and
                commissions on a platform built for creative professionals.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ justifyContent: "center" }}
              >
                <Button
                  variant="gradient"
                  size="large"
                  component={Link}
                  href="/sell"
                >
                  Sell artwork
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/signup"
                >
                  Create account
                </Button>
              </Stack>
            </MotionBox>
          </GlassCard>
        </MotionBox>
      </Container>
    </Box>
  );
}
