"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { PLATFORM_STATS } from "./data";
import FloatingStatCard from "./FloatingStatCard";
import { MotionBox } from "./MotionBox";
import { staggerContainer, staggerItem, viewportOnce } from "./animations";

export default function StatsSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        zIndex: 1,
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {PLATFORM_STATS.map((stat, i) => (
              <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
                <MotionBox variants={staggerItem}>
                  <FloatingStatCard {...stat} index={i} />
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}
