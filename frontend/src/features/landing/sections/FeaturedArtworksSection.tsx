"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "next/link";

import { ArtworksLoadState } from "@/src/components/home/ArtworksLoadState";
import {
  AnimatedInView,
  SectionShell,
  StaggerReveal,
  StaggerRevealItem,
} from "@/src/components/ui";
import { useFirestoreArtworks } from "@/src/hooks/useFirestoreArtworks";
import { fadeInUp } from "@/src/lib/motion";
import { sectionGridSpacing } from "@/src/theme/responsive";

import { ArtworkCard, SectionHeader } from "../components";

export default function FeaturedArtworksSection() {
  const { featuredArtworks, loading, error } = useFirestoreArtworks();

  const loadState = (
    <ArtworksLoadState
      loading={loading}
      error={error}
      isEmpty={!loading && !error && featuredArtworks.length === 0}
    />
  );

  return (
    <SectionShell id="explore">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 2 }}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "flex-end" },
        }}
      >
        <SectionHeader
          overline="Handpicked for you"
          title="Featured artworks"
          description="Curated selections from our top artists — updated weekly."
        />
        <AnimatedInView
          variants={fadeInUp}
          sx={{
            flexShrink: 0,
            mb: { xs: 0, sm: 0, md: 5 },
            mt: { xs: -2, sm: 0 },
          }}
        >
          <Button
            variant="glass"
            fullWidth
            component={Link}
            href="/explore"
            sx={{ display: { xs: "flex", sm: "inline-flex" }, maxWidth: { sm: "none" } }}
          >
            View all
          </Button>
        </AnimatedInView>
      </Stack>

      {loadState}

      {!loading && !error && featuredArtworks.length > 0 && (
        <StaggerReveal>
          <Grid container spacing={sectionGridSpacing}>
            {featuredArtworks.map((artwork) => (
              <Grid key={artwork.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <StaggerRevealItem sx={{ height: "100%" }}>
                  <ArtworkCard {...artwork} />
                </StaggerRevealItem>
              </Grid>
            ))}
          </Grid>
        </StaggerReveal>
      )}
    </SectionShell>
  );
}
