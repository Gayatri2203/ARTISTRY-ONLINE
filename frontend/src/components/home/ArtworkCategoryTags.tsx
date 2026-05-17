"use client";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";
import { memo } from "react";

import { categoryLabel } from "./utils";

export type ArtworkCategoryTagsProps = {
  categories: string[];
  max?: number;
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
};

function ArtworkCategoryTagsComponent({
  categories,
  max = 2,
  size = "small",
  sx,
}: ArtworkCategoryTagsProps) {
  const visible = categories.slice(0, max);

  return (
    <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: "wrap", ...sx }}>
      {visible.map((category) => (
        <Chip
          key={category}
          label={categoryLabel(category)}
          size={size}
          sx={{
            height: size === "small" ? 24 : 28,
            fontSize: "0.6875rem",
            fontWeight: 600,
            bgcolor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            color: "text.secondary",
            "& .MuiChip-label": { px: 1 },
          }}
        />
      ))}
    </Stack>
  );
}

export const ArtworkCategoryTags = memo(ArtworkCategoryTagsComponent);
