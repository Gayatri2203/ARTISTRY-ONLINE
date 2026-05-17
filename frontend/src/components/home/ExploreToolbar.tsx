"use client";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { memo } from "react";

import type { ExploreSortOption } from "./types";

const SORT_OPTIONS: { value: ExploreSortOption; label: string }[] = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "most-liked", label: "Most liked" },
  { value: "most-viewed", label: "Most viewed" },
];

export type ExploreToolbarProps = {
  query: string;
  sort: ExploreSortOption;
  resultCount: number;
  onQueryChange: (query: string) => void;
  onSortChange: (sort: ExploreSortOption) => void;
};

function ExploreToolbarComponent({
  query,
  sort,
  resultCount,
  onQueryChange,
  onSortChange,
}: ExploreToolbarProps) {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ alignItems: { xs: "stretch", md: "center" } }}
      >
        <TextField
          fullWidth
          placeholder="Search artworks, artists, or styles…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon sx={{ color: "text.disabled", fontSize: 22 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ flex: 1 }}
        />

        <Stack
          direction="row"
          spacing={1.5}
          sx={{ flexShrink: 0, alignItems: "center" }}
        >
          <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
            <TuneOutlinedIcon sx={{ fontSize: 18, color: "text.disabled" }} />
            <TextField
              select
              size="small"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as ExploreSortOption)}
              sx={{ minWidth: 148 }}
            >
              {SORT_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
            {resultCount} works
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export const ExploreToolbar = memo(ExploreToolbarComponent);
