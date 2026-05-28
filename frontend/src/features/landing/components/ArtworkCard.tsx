"use client";

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { memo } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { GlassCard, LikeBadge, tapLinkStyle } from "@/src/components/ui";
import { useArtworkLikes } from "@/src/hooks/useArtworkLikes";

import { getArtworkMediaSx } from "@/src/components/home/artworkMedia";

import type { ArtworkItem } from "../types";

function ArtworkCardComponent({
  id,
  title,
  artist,
  price,
  tag,
  gradient,
  imageUrl,
  likes = 0,
}: ArtworkItem) {
  const { likesCount, isLiked, toggling, canLike, toggleLike } = useArtworkLikes(id);

  return (
    <Link href={id ? `/artwork/${id}` : "/explore"} style={tapLinkStyle}>
      <GlassCard sx={{ overflow: "hidden", height: "100%" }}>
        <Box
          sx={getArtworkMediaSx(
            { imageUrl, gradient },
            {
            height: { xs: 200, sm: 220, md: 240 },
            position: "relative",
            overflow: "hidden",
            "@media (hover: hover)": {
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(11,11,15,0.5) 100%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
              },
              ".MuiCard-root:hover &::after": { opacity: 1 },
            },
            }
          )}
        >
          <Chip
            label={tag}
            size="small"
            sx={{
              position: "absolute",
              top: { xs: 12, sm: 16 },
              left: { xs: 12, sm: 16 },
              zIndex: 1,
            }}
          />
          <LikeBadge
            count={likesCount || likes}
            sx={{
              position: "absolute",
              bottom: { xs: 12, sm: 16 },
              right: { xs: 12, sm: 16 },
              zIndex: 1,
            }}
          />
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
              top: { xs: 12, sm: 16 },
              right: { xs: 12, sm: 16 },
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
        </Box>
        <CardContent sx={{ p: { xs: 2, sm: 2.25, md: 2.5 } }}>
          <Typography
            variant="h6"
            noWrap
            sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {artist}
          </Typography>
          <Typography
            variant="subtitle1"
            color="secondary.main"
            sx={{
              mt: 1,
              fontWeight: 600,
              fontSize: { xs: "0.9375rem", sm: "1rem" },
            }}
          >
            {price}
          </Typography>
        </CardContent>
      </GlassCard>
    </Link>
  );
}

export const ArtworkCard = memo(ArtworkCardComponent);
