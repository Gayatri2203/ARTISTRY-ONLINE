"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import {
  CategoryFilterChips,
  EXPLORE_CATEGORIES,
  ExploreFeed,
  ExploreToolbar,
  TRENDING_ARTWORKS,
  TrendingArtworksRow,
  useExploreFilters,
} from "@/src/components/home";
import { SectionShell } from "@/src/components/ui";

import { SectionHeading } from "./SectionHeading";

export default function TrendingExploreSection() {
  const {
    filters,
    filteredArtworks,
    setQuery,
    setCategoryId,
    setSort,
    resultCount,
  } = useExploreFilters();

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
        <TrendingArtworksRow artworks={TRENDING_ARTWORKS} />
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
      </Stack>
    </SectionShell>
  );
}
