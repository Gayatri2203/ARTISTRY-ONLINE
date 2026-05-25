"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import { ArtworksLoadState } from "@/src/components/home/ArtworksLoadState";
import {
  CategoryFilterChips,
  EXPLORE_CATEGORIES,
  ExploreFeed,
  ExploreToolbar,
  TrendingArtworksRow,
  useExploreFilters,
} from "@/src/components/home";
import { SectionShell } from "@/src/components/ui";
import { useFirestoreArtworks } from "@/src/hooks/useFirestoreArtworks";

import { SectionHeading } from "./SectionHeading";

export default function TrendingExploreSection() {
  const { exploreArtworks, trendingArtworks, loading, error } =
    useFirestoreArtworks();

  const {
    filters,
    filteredArtworks,
    setQuery,
    setCategoryId,
    setSort,
    resultCount,
  } = useExploreFilters(exploreArtworks);

  const hasArtworks = exploreArtworks.length > 0;

  return (
    <SectionShell id="explore" sx={{ pt: { xs: 4, sm: 6, md: 8 } }}>
      <SectionHeading
        overline="Discover & collect"
        title="Trending & Explore"
        description="Curated trending picks from top artists, plus an endless gallery feed to discover your next masterpiece."
      />

      <Box component="div" sx={{ mb: { xs: 5, md: 7 } }}>
        <SectionHeading
          overline="This week"
          title="Trending artworks"
          description="The three most viewed and loved pieces on Artistry Online right now."
        />
        <ArtworksLoadState
          loading={loading}
          error={error}
          isEmpty={!loading && !error && trendingArtworks.length === 0}
          emptyMessage="No trending artworks yet. Be the first to upload."
        />
        {!loading && !error && trendingArtworks.length > 0 && (
          <TrendingArtworksRow artworks={trendingArtworks} />
        )}
      </Box>

      <Divider
        sx={{
          mb: { xs: 4, md: 6 },
          borderColor: "rgba(255,255,255,0.06)",
          "&::before, &::after": { borderColor: "rgba(255,255,255,0.06)" },
        }}
      />

      <Stack spacing={3}>
        <SectionHeading
          overline="Full gallery"
          title="Explore artworks"
          description="Browse our Behance-inspired discovery feed — filter by medium, search artists, and scroll to load more."
        />

        {loading && (
          <ArtworksLoadState loading error={null} isEmpty={false} />
        )}

        {!loading && error && (
          <ArtworksLoadState loading={false} error={error} isEmpty={false} />
        )}

        {!loading && !error && !hasArtworks && (
          <ArtworksLoadState
            loading={false}
            error={null}
            isEmpty
            emptyMessage="No artworks in the gallery yet. Upload from your dashboard to get started."
          />
        )}

        {!loading && !error && hasArtworks && (
          <>
            <ExploreToolbar
              query={filters.query}
              sort={filters.sort}
              resultCount={resultCount}
              onQueryChange={setQuery}
              onSortChange={setSort}
            />

            <CategoryFilterChips
              categories={EXPLORE_CATEGORIES}
              activeId={filters.categoryId}
              onChange={setCategoryId}
            />

            <ExploreFeed artworks={filteredArtworks} />
          </>
        )}
      </Stack>
    </SectionShell>
  );
}
