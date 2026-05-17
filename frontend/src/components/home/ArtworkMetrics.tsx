"use client";

import type { ReactNode } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { memo } from "react";

import { formatCount } from "./utils";

export type ArtworkMetricsProps = {
  likes: number;
  views: number;
  compact?: boolean;
  sx?: SxProps<Theme>;
};

function MetricItem({
  icon,
  value,
  compact,
}: {
  icon: ReactNode;
  value: string;
  compact?: boolean;
}) {
  return (
    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
      {icon}
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, fontSize: compact ? "0.6875rem" : "0.75rem" }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

function ArtworkMetricsComponent({
  likes,
  views,
  compact = false,
  sx,
}: ArtworkMetricsProps) {
  const iconSx = { fontSize: compact ? 14 : 16, opacity: 0.9 };

  return (
    <Stack
      direction="row"
      spacing={compact ? 1.25 : 1.75}
      sx={{ alignItems: "center", ...sx }}
    >
      <MetricItem
        compact={compact}
        value={formatCount(likes)}
        icon={<FavoriteBorderOutlinedIcon sx={iconSx} />}
      />
      <MetricItem
        compact={compact}
        value={formatCount(views)}
        icon={<VisibilityOutlinedIcon sx={iconSx} />}
      />
    </Stack>
  );
}

export const ArtworkMetrics = memo(ArtworkMetricsComponent);
