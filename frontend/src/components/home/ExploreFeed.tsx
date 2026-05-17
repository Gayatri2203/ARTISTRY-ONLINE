"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { memo } from "react";

import { AnimatedInView, StaggerReveal } from "@/src/components/ui";
import { fadeInUp } from "@/src/lib/motion";

import { ExploreArtworkCard } from "./ExploreArtworkCard";
import { InfiniteScrollLoader } from "./InfiniteScrollLoader";
import { MasonryGrid } from "./MasonryGrid";
import { useInfiniteArtworks } from "./hooks/useInfiniteArtworks";
import type { ExploreArtwork } from "./types";

export type ExploreFeedProps = {
  artworks: ExploreArtwork[];
};

function ExploreFeedComponent({ artworks }: ExploreFeedProps) {
  const { visibleItems, hasMore, isLoadingMore, sentinelRef } = useInfiniteArtworks({
    items: artworks,
  });

  if (artworks.length === 0) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          borderRadius: 3,
          border: "1px dashed",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" gutterBottom>
          No artworks found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search or category filters.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <StaggerReveal>
        <MasonryGrid>
          {visibleItems.map((artwork) => (
            <ExploreArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </MasonryGrid>
      </StaggerReveal>

      <AnimatedInView variants={fadeInUp}>
        <InfiniteScrollLoader
          sentinelRef={sentinelRef}
          isLoading={isLoadingMore}
          hasMore={hasMore}
        />
      </AnimatedInView>
    </>
  );
}

export const ExploreFeed = memo(ExploreFeedComponent);
