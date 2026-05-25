"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

type ArtworksLoadStateProps = {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyMessage?: string;
};

export function ArtworksLoadState({
  loading,
  error,
  isEmpty,
  emptyMessage = "No artworks yet. Upload your first piece to see it here.",
}: ArtworksLoadStateProps) {
  if (loading) {
    return (
      <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          py: 4,
          px: 2,
          textAlign: "center",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "error.main",
        }}
      >
        <Typography variant="body2" color="error.main">
          {error}
        </Typography>
      </Box>
    );
  }

  if (isEmpty) {
    return (
      <Box
        sx={{
          py: 6,
          textAlign: "center",
          borderRadius: 3,
          border: "1px dashed",
          borderColor: "divider",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return null;
}
