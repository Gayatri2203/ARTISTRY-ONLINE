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
import { useArtworkLikes } from "@/src/hooks/useArtworkLikes";
import { scaleIn } from "@/src/lib/motion";
import { tapLinkStyle } from "@/src/components/ui/styles";

import { ArtistMeta } from "./ArtistMeta";
import { ArtworkCategoryTags } from "./ArtworkCategoryTags";
import { ArtworkHoverOverlay } from "./ArtworkHoverOverlay";
import { ArtworkMetrics } from "./ArtworkMetrics";
import { TrendingRankBadge } from "./TrendingRankBadge";
import { getArtworkMediaSx } from "./artworkMedia";
import type { TrendingArtwork } from "./types";

export type TrendingArtworkCardProps = {
  artwork: TrendingArtwork;
  featured?: boolean;
};

function TrendingArtworkCardComponent({
  artwork,
  featured = false,
}: TrendingArtworkCardProps) {
  const mediaHeight = featured
    ? { xs: 280, sm: 360, md: 420 }
    : { xs: 200, sm: 220, md: 240 };
  const { likesCount, isLiked, toggling, canLike, toggleLike } = useArtworkLikes(
    artwork.id
  );

  return (
    <MotionBox
      variants={scaleIn}
      sx={{ height: "100%" }}
    >
      <Link href={`/artwork/${artwork.id}`} style={tapLinkStyle}>
        <Box
          className="artwork-card-root"
          sx={{
            position: "relative",
            height: "100%",
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "rgba(255,255,255,0.08)",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
            "@media (hover: hover)": {
              "&:hover": {
                borderColor: "rgba(255,255,255,0.16)",
                boxShadow: (theme) =>
                  `${theme.palette.artistry.shadows.lg}, ${theme.palette.artistry.shadows.glow}`,
                transform: "translateY(-4px)",
              },
            },
          }}
        >
          <Box
            sx={getArtworkMediaSx(artwork, {
              position: "relative",
              height: mediaHeight,
              overflow: "hidden",
            })}
          >
            <TrendingRankBadge rank={artwork.rank} />
            {artwork.featuredTag && (
              <Chip
                label={artwork.featuredTag}
                size="small"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 2,
                  fontWeight: 600,
                  bgcolor: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
            )}
            <ArtworkHoverOverlay title={artwork.title} price={artwork.price} />
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
                bgcolor: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(10px)",
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
          </Box>

          <Stack spacing={1.5} sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Typography
              variant={featured ? "h5" : "h6"}
              sx={{ fontWeight: 700, lineHeight: 1.2 }}
              noWrap
            >
              {artwork.title}
            </Typography>
            <ArtistMeta
              artist={artwork.artist}
              avatarSize={featured ? 40 : 32}
              nameVariant={featured ? "subtitle1" : "subtitle2"}
            />
            <ArtworkCategoryTags categories={artwork.categories} />
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <ArtworkMetrics likes={likesCount} views={artwork.views} />
              <Typography
                variant="subtitle1"
                color="secondary.main"
                sx={{ fontWeight: 700 }}
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

export const TrendingArtworkCard = memo(TrendingArtworkCardComponent);
