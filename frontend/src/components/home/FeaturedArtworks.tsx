"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "next/link";

import { FEATURED_ARTWORKS } from "./data";
import ArtworkCard from "./ArtworkCard";
import SectionHeader from "./SectionHeader";
import { MotionBox } from "./MotionBox";
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from "./animations";

export default function FeaturedArtworks() {
  return (
    <Box
      id="explore"
      component="section"
      sx={{ position: "relative", zIndex: 1, py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "flex-end" },
            mb: { xs: 0, sm: -2 },
          }}
        >
          <SectionHeader
            overline="Handpicked for you"
            title="Featured artworks"
            description="Curated selections from our top artists — updated weekly."
          />
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            sx={{ flexShrink: 0, mb: { xs: 0, md: 5 } }}
          >
            <Button variant="glass" component={Link} href="/explore">
              View all
            </Button>
          </MotionBox>
        </Stack>

        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <Grid container spacing={3}>
            {FEATURED_ARTWORKS.map((art) => (
              <Grid key={art.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <MotionBox variants={staggerItem} sx={{ height: "100%" }}>
                  <ArtworkCard {...art} />
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
}
