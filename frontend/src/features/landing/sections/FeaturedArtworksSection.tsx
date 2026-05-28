"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Link from "next/link";
import { useMemo, useState } from "react";

import { ArtworksLoadState } from "@/src/components/home/ArtworksLoadState";
import { CategoryFilterChips, EXPLORE_CATEGORIES } from "@/src/components/home";
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

function normalizeCategory(value: string): string {
  const lower = value.trim().toLowerCase();
  if (lower.includes("digital")) return "digital";
  if (lower.includes("paint")) return "painting";
  if (lower.includes("photo")) return "photography";
  if (lower.includes("sculpt")) return "sculpture";
  if (lower.includes("portrait") || lower.includes("illustr")) return "portrait";
  if (lower.includes("abstract") || lower.includes("mixed") || lower.includes("nft")) {
    return "abstract";
  }
  return lower.replace(/\s+/g, "-");
}

export default function FeaturedArtworksSection() {
  const { featuredArtworks, loading, error } = useFirestoreArtworks();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredArtworks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return featuredArtworks.filter((artwork) => {
      const matchesQuery =
        !q || artwork.title.toLowerCase().includes(q);
      const normalizedCategory = normalizeCategory(artwork.tag);
      const matchesCategory =
        !activeCategory ||
        activeCategory === "all" ||
        normalizedCategory === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [activeCategory, featuredArtworks, query]);

  const loadState = (
    <ArtworksLoadState
      loading={false}
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

      {loading && (
        <Grid container spacing={sectionGridSpacing}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack spacing={1.25}>
                <Skeleton variant="rounded" height={220} />
                <Skeleton variant="text" height={28} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </Stack>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && !error && featuredArtworks.length > 0 && (
        <>
          <Stack spacing={2.5} sx={{ mb: 2.5 }}>
            <TextField
              fullWidth
              placeholder="Search artworks by title…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon sx={{ color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <CategoryFilterChips
              categories={EXPLORE_CATEGORIES}
              activeId={activeCategory}
              onChange={setActiveCategory}
            />
          </Stack>

          {filteredArtworks.length === 0 ? (
            <ArtworksLoadState
              loading={false}
              error={null}
              isEmpty
              emptyMessage="No artworks match your search and category filters."
            />
          ) : (
            <>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                {filteredArtworks.length} result{filteredArtworks.length === 1 ? "" : "s"}
              </Typography>
              <StaggerReveal>
                <Grid container spacing={sectionGridSpacing}>
                  {filteredArtworks.map((artwork) => (
                    <Grid key={artwork.id} size={{ xs: 12, sm: 6, md: 4 }}>
                      <StaggerRevealItem sx={{ height: "100%" }}>
                        <ArtworkCard {...artwork} />
                      </StaggerRevealItem>
                    </Grid>
                  ))}
                </Grid>
              </StaggerReveal>
            </>
          )}
        </>
      )}
    </SectionShell>
  );
}
