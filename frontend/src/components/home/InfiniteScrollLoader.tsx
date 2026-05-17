"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { memo } from "react";

export type InfiniteScrollLoaderProps = {
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
  hasMore: boolean;
};

function InfiniteScrollLoaderComponent({
  sentinelRef,
  isLoading,
  hasMore,
}: InfiniteScrollLoaderProps) {
  if (!hasMore && !isLoading) {
    return (
      <Typography
        variant="body2"
        color="text.disabled"
        align="center"
        sx={{ py: 4 }}
      >
        You&apos;ve reached the end of the gallery
      </Typography>
    );
  }

  return (
    <Box
      ref={sentinelRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        py: 5,
        minHeight: 80,
      }}
    >
      {isLoading && (
        <>
          <CircularProgress size={28} thickness={4} />
          <Typography variant="caption" color="text.secondary">
            Loading more artworks…
          </Typography>
        </>
      )}
    </Box>
  );
}

export const InfiniteScrollLoader = memo(InfiniteScrollLoaderComponent);
