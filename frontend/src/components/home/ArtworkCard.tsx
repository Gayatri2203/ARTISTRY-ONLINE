"use client";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import GlassCard from "./GlassCard";
import type { ArtworkItem } from "./types";

type ArtworkCardProps = ArtworkItem;

export default function ArtworkCard({
  title,
  artist,
  price,
  tag,
  gradient,
  likes = 0,
}: ArtworkCardProps) {
  return (
    <Link href="/explore" style={{ textDecoration: "none", display: "block", height: "100%" }}>
    <GlassCard
      sx={{
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Box
        sx={{
          height: 240,
          background: gradient,
          position: "relative",
          overflow: "hidden",
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
        }}
      >
        <Chip label={tag} size="small" sx={{ position: "absolute", top: 16, left: 16, zIndex: 1 }} />
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems: "center",
            position: "absolute",
            bottom: 16,
            right: 16,
            zIndex: 1,
            px: 1.25,
            py: 0.5,
            borderRadius: 2,
            bgcolor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
          }}
        >
          <FavoriteBorderOutlinedIcon sx={{ fontSize: 14 }} />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {likes}
          </Typography>
        </Stack>
      </Box>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {artist}
        </Typography>
        <Typography
          variant="subtitle1"
          color="secondary.main"
          sx={{ mt: 1, fontWeight: 600 }}
        >
          {price}
        </Typography>
      </CardContent>
    </GlassCard>
    </Link>
  );
}
