"use client";

import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

export type MasonryGridProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function MasonryGrid({ children, sx }: MasonryGridProps) {
  return (
    <Box
      sx={{
        columnCount: { xs: 1, sm: 2, lg: 3 },
        columnGap: { xs: 2, sm: 2.5, md: 3 },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
