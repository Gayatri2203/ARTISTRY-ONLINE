"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { StaggerReveal, StaggerRevealItem } from "@/src/components/ui";
import { sectionGridSpacing } from "@/src/theme/responsive";

import { FloatingStatCard } from "../components";
import { PLATFORM_STATS } from "../data";

export default function StatsSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        zIndex: 1,
        py: { xs: 1, sm: 2, md: 4 },
        display: { xs: "block", lg: "none" },
      }}
    >
      <Container maxWidth="lg">
        <StaggerReveal>
          <Grid container spacing={sectionGridSpacing} sx={{ justifyContent: "center" }}>
            {PLATFORM_STATS.map((stat, index) => (
              <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
                <StaggerRevealItem sx={{ height: "100%" }}>
                  <FloatingStatCard {...stat} index={index} compact />
                </StaggerRevealItem>
              </Grid>
            ))}
          </Grid>
        </StaggerReveal>
      </Container>
    </Box>
  );
}
