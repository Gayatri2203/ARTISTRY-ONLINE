"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { memo } from "react";

import { ArtistAvatar } from "./ArtistAvatar";
import type { ArtistProfile } from "./types";

export type ArtistMetaProps = {
  artist: ArtistProfile;
  avatarSize?: number;
  nameVariant?: "body2" | "subtitle2" | "subtitle1";
  sx?: SxProps<Theme>;
};

function ArtistMetaComponent({
  artist,
  avatarSize = 36,
  nameVariant = "subtitle2",
  sx,
}: ArtistMetaProps) {
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", ...sx }}>
      <ArtistAvatar artist={artist} size={avatarSize} />
      <Typography
        variant={nameVariant}
        sx={{ fontWeight: 600, lineHeight: 1.3 }}
        noWrap
      >
        {artist.name}
      </Typography>
    </Stack>
  );
}

export const ArtistMeta = memo(ArtistMetaComponent);
