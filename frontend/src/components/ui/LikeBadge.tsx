"use client";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { memo } from "react";

export type LikeBadgeProps = {
  count: string | number;
  iconSize?: number;
  sx?: SxProps<Theme>;
};

function LikeBadgeComponent({ count, iconSize = 14, sx }: LikeBadgeProps) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{
        alignItems: "center",
        px: 1.25,
        py: 0.5,
        borderRadius: 2,
        bgcolor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)",
        ...sx,
      }}
    >
      <FavoriteBorderOutlinedIcon sx={{ fontSize: iconSize }} />
      <Typography variant="caption" sx={{ fontWeight: 600 }}>
        {count}
      </Typography>
    </Stack>
  );
}

export const LikeBadge = memo(LikeBadgeComponent);
