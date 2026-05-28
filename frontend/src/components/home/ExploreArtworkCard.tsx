"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { memo } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { MotionBox } from "@/src/components/ui";
import { tapLinkStyle } from "@/src/components/ui/styles";
import { useArtworkLikes } from "@/src/hooks/useArtworkLikes";
import { staggerItem } from "@/src/lib/motion";

import { ArtistMeta } from "./ArtistMeta";
import { ArtworkCategoryTags } from "./ArtworkCategoryTags";
import { ArtworkHoverOverlay } from "./ArtworkHoverOverlay";
import { ArtworkMetrics } from "./ArtworkMetrics";
import type { ExploreArtwork } from "./types";
import { getArtworkMediaSx } from "./artworkMedia";
import { MASONRY_HEIGHTS } from "./utils";

export type ExploreArtworkCardProps = {
  artwork: ExploreArtwork;
};

function ExploreArtworkCardComponent({ artwork }: ExploreArtworkCardProps) {
  const mediaHeight = MASONRY_HEIGHTS[artwork.masonrySize];
  const { likesCount, isLiked, toggling, canLike, toggleLike } = useArtworkLikes(
    artwork.id
  );

  return (
    <MotionBox variants={staggerItem} sx={{ breakInside: "avoid", mb: 2.5 }}>
      <Link href={`/artwork/${artwork.id}`} style={tapLinkStyle}>
        <Box
          className="artwork-card-root"
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "rgba(255,255,255,0.08)",
            transition:
              "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
            "@media (hover: hover)": {
              "&:hover": {
                borderColor: "rgba(255,255,255,0.14)",
                boxShadow: (theme) => theme.palette.artistry.shadows.lg,
                transform: "translateY(-3px)",
              },
            },
          }}
        >
          <Box
            sx={getArtworkMediaSx(artwork, {
              position: "relative",
              height: {
                xs: mediaHeight * 0.85,
                sm: mediaHeight,
              },
            })}
          >
            {artwork.featuredTag && (
              <Chip
                label={artwork.featuredTag}
                size="small"
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  zIndex: 2,
                  fontWeight: 600,
                  fontSize: "0.6875rem",
                }}
              />
            )}
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 2,
                px: 1,
                py: 0.5,
                borderRadius: 2,
                bgcolor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              <ArtworkMetrics
                likes={likesCount}
                views={artwork.views}
                compact
              />
            </Box>
            <IconButton
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void toggleLike();
              }}
              disabled={!canLike || toggling}
              size="small"
              sx={{
                position: "absolute",
                bottom: 12,
                right: 12,
                zIndex: 2,
                bgcolor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
                color: isLiked ? "#f43f5e" : "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
              }}
            >
              {toggling ? (
                <CircularProgress size={16} color="inherit" />
              ) : isLiked ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
            <ArtworkHoverOverlay title={artwork.title} price={artwork.price} />
          </Box>

          <Stack spacing={1.25} sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>
              {artwork.title}
            </Typography>
            <ArtistMeta artist={artwork.artist} avatarSize={28} nameVariant="body2" />
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <ArtworkCategoryTags categories={artwork.categories} max={2} />
              <Typography
                variant="body2"
                color="secondary.main"
                sx={{ fontWeight: 700, flexShrink: 0 }}
              >
                {artwork.price}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Link>
    </MotionBox>
  );
}

export const ExploreArtworkCard = memo(ExploreArtworkCardComponent);
