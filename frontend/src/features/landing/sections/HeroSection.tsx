"use client";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { MotionBox } from "@/src/components/ui";
import { scaleIn, staggerContainer, staggerItem } from "@/src/lib/motion";
import { textStyles } from "@/src/theme/typography";

import { HeroShowcaseCard, FloatingStatCard } from "../components";
import {
  HERO_FLOATING_CARDS,
  HERO_SHOWCASE,
  PLATFORM_STATS,
} from "../data";

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        zIndex: 1,
        pt: { xs: 2, sm: 4, md: 8 },
        pb: { xs: 6, sm: 8, md: 14 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 4, sm: 5, md: 4 }}
          sx={{ alignItems: "center" }}
        >
          <Grid size={{ xs: 12, md: 6, lg: 7 }}>
            <MotionBox
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              sx={{
                textAlign: { xs: "center", md: "left" },
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <MotionBox variants={staggerItem}>
                <Chip
                  label="Premium art marketplace"
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mb: { xs: 2, sm: 3 } }}
                />
              </MotionBox>

              <MotionBox variants={staggerItem} sx={{ width: "100%" }}>
                <Typography component="h1" sx={textStyles.hero} gutterBottom>
                  Where exceptional art finds its audience
                </Typography>
              </MotionBox>

              <MotionBox variants={staggerItem} sx={{ width: "100%" }}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    maxWidth: 520,
                    mb: { xs: 3, sm: 4 },
                    mx: { xs: "auto", md: 0 },
                    fontSize: { xs: "0.9375rem", sm: "1rem", md: "1.125rem" },
                    lineHeight: 1.6,
                    px: { xs: 0.5, sm: 0 },
                  }}
                >
                  Discover curated originals from world-class artists. Collect,
                  commission, and connect in a gallery experience crafted for
                  discerning collectors.
                </Typography>
              </MotionBox>

              <MotionBox variants={staggerItem} sx={{ width: "100%" }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  sx={{
                    width: "100%",
                    maxWidth: { xs: 400, sm: "none" },
                    mx: { xs: "auto", md: 0 },
                    justifyContent: { xs: "stretch", sm: "flex-start" },
                  }}
                >
                  <Button
                    variant="gradient"
                    size="large"
                    fullWidth
                    component={Link}
                    href="/explore"
                    startIcon={<SearchOutlinedIcon />}
                    sx={{ flex: { sm: "0 1 auto" } }}
                  >
                    Explore Gallery
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    component={Link}
                    href="/signup"
                    sx={{ flex: { sm: "0 1 auto" } }}
                  >
                    Start Collecting
                  </Button>
                </Stack>
              </MotionBox>

              <MotionBox variants={staggerItem}>
                <Stack
                  direction="row"
                  spacing={{ xs: 1.5, sm: 2 }}
                  sx={{
                    mt: { xs: 4, sm: 5 },
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", md: "flex-start" },
                    display: { xs: "none", lg: "flex" },
                    width: "100%",
                  }}
                >
                  {PLATFORM_STATS.map((stat, index) => (
                    <FloatingStatCard
                      key={stat.label}
                      {...stat}
                      index={index}
                      compact
                    />
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
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: 360, sm: 400, md: 420 },
                mx: "auto",
                px: { xs: 0, sm: 1, md: 0 },
              }}
            >
              <HeroShowcaseCard
                showcase={HERO_SHOWCASE}
                floatingCards={HERO_FLOATING_CARDS}
              />
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
