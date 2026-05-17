"use client";

import Grid from "@mui/material/Grid";
import { memo } from "react";

import { StaggerReveal, StaggerRevealItem } from "@/src/components/ui";

import { TrendingArtworkCard } from "./TrendingArtworkCard";
import type { TrendingArtwork } from "./types";

export type TrendingArtworksRowProps = {
  artworks: readonly TrendingArtwork[];
};

function TrendingArtworksRowComponent({ artworks }: TrendingArtworksRowProps) {
  const [featured, ...rest] = artworks;

  return (
    <StaggerReveal>
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {featured && (
          <Grid size={{ xs: 12, lg: 7 }}>
            <StaggerRevealItem sx={{ height: "100%" }}>
              <TrendingArtworkCard artwork={featured} featured />
            </StaggerRevealItem>
          </Grid>
        )}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ height: "100%" }}>
            {rest.map((artwork) => (
              <Grid key={artwork.id} size={{ xs: 12, sm: 6, lg: 12 }}>
                <StaggerRevealItem sx={{ height: "100%" }}>
                  <TrendingArtworkCard artwork={artwork} />
                </StaggerRevealItem>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </StaggerReveal>
  );
}

export const TrendingArtworksRow = memo(TrendingArtworksRowComponent);
