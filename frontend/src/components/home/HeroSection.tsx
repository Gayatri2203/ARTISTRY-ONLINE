"use client";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { textStyles } from "@/src/theme/typography";

import {
  HERO_FLOATING_CARDS,
  HERO_SHOWCASE,
  PLATFORM_STATS,
} from "./data";
import HeroFloatingCard from "./HeroFloatingCard";
import FloatingStatCard from "./FloatingStatCard";
import { MotionBox } from "./MotionBox";
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  staggerItem,
} from "./animations";

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        zIndex: 1,
        pt: { xs: 4, md: 8 },
        pb: { xs: 10, md: 14 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 4 }} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6, lg: 7 }}>
            <MotionBox
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <MotionBox variants={staggerItem}>
                <Chip
                  label="Premium art marketplace"
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
              </MotionBox>

              <MotionBox variants={staggerItem}>
                <Typography component="h1" sx={textStyles.hero} gutterBottom>
                  Where exceptional art finds its audience
                </Typography>
              </MotionBox>

              <MotionBox variants={staggerItem}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ maxWidth: 520, mb: 4, fontSize: { xs: "1rem", md: "1.125rem" } }}
                >
                  Discover curated originals from world-class artists. Collect,
                  commission, and connect in a gallery experience crafted for
                  discerning collectors.
                </Typography>
              </MotionBox>

              <MotionBox variants={staggerItem}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="gradient"
                    size="large"
                    component={Link}
                    href="/explore"
                    startIcon={<SearchOutlinedIcon />}
                  >
                    Explore Gallery
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    href="/signup"
                  >
                    Start Collecting
                  </Button>
                </Stack>
              </MotionBox>

              <MotionBox variants={staggerItem}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    mt: 5,
                    flexWrap: "wrap",
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  {PLATFORM_STATS.map((stat, i) => (
                    <FloatingStatCard key={stat.label} {...stat} index={i} compact />
                  ))}
                </Stack>
              </MotionBox>
            </MotionBox>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <MotionBox
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              sx={{ position: "relative", maxWidth: 420, mx: "auto" }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  aspectRatio: "4 / 5",
                  background: HERO_SHOWCASE.gradient,
                  boxShadow: (t) =>
                    `${t.palette.artistry.shadows.lg}, ${t.palette.artistry.shadows.glow}`,
                }}
              >
                <Box
                  className="absolute inset-0"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 35%, rgba(11,11,15,0.9) 100%)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 3,
                    bgcolor: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <FavoriteBorderOutlinedIcon sx={{ fontSize: 16 }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    1.2k
                  </Typography>
                </Box>
                <Box sx={{ position: "absolute", bottom: 28, left: 24, right: 24 }}>
                  <Typography variant="overline" color="secondary.light">
                    {HERO_SHOWCASE.label}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 0.5 }}>
                    {HERO_SHOWCASE.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    by {HERO_SHOWCASE.artist} · {HERO_SHOWCASE.price}
                  </Typography>
                </Box>
              </Box>

              {HERO_FLOATING_CARDS.map((card) => (
                <HeroFloatingCard key={card.title} {...card} />
              ))}
            </MotionBox>
          </Grid>
        </Grid>

        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          sx={{
            display: { xs: "grid", sm: "none" },
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            mt: 6,
          }}
        >
          {PLATFORM_STATS.map((stat, i) => (
            <FloatingStatCard key={stat.label} {...stat} index={i} compact />
          ))}
        </MotionBox>
      </Container>
    </Box>
  );
}
