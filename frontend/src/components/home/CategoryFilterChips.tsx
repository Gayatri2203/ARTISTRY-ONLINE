"use client";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { memo } from "react";

import type { ExploreCategoryFilter } from "./types";

export type CategoryFilterChipsProps = {
  categories: readonly ExploreCategoryFilter[];
  activeId: string | null;
  onChange: (categoryId: string | null) => void;
};

function CategoryFilterChipsComponent({
  categories,
  activeId,
  onChange,
}: CategoryFilterChipsProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        overflowX: "auto",
        pb: 0.5,
        mx: { xs: -0.5, sm: 0 },
        px: { xs: 0.5, sm: 0 },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {categories.map((category) => {
        const isActive =
          activeId === category.id ||
          (category.id === "all" && (!activeId || activeId === "all"));

        return (
          <Chip
            key={category.id}
            label={category.label}
            onClick={() =>
              onChange(category.id === "all" ? null : category.id)
            }
            sx={{
              flexShrink: 0,
              fontWeight: 600,
              fontSize: "0.8125rem",
              height: 36,
              px: 0.5,
              transition: "all 0.25s ease",
              bgcolor: isActive ? "rgba(99, 102, 241, 0.22)" : "rgba(255,255,255,0.04)",
              color: isActive ? "primary.light" : "text.secondary",
              border: "1px solid",
              borderColor: isActive
                ? "rgba(99, 102, 241, 0.45)"
                : "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              "&:hover": {
                bgcolor: isActive
                  ? "rgba(99, 102, 241, 0.28)"
                  : "rgba(255,255,255,0.07)",
              },
            }}
          />
        );
      })}
    </Stack>
  );
}

export const CategoryFilterChips = memo(CategoryFilterChipsComponent);
