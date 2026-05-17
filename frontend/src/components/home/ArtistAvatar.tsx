"use client";

import Avatar from "@mui/material/Avatar";
import type { SxProps, Theme } from "@mui/material/styles";
import { memo } from "react";

import type { ArtistProfile } from "./types";
import { getArtistInitials } from "./utils";

export type ArtistAvatarProps = {
  artist: ArtistProfile;
  size?: number;
  showName?: boolean;
  sx?: SxProps<Theme>;
};

function ArtistAvatarComponent({
  artist,
  size = 36,
  sx,
}: ArtistAvatarProps) {
  return (
    <Avatar
      alt={artist.name}
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        fontWeight: 700,
        background: artist.avatarGradient,
        border: "2px solid rgba(255,255,255,0.12)",
        ...sx,
      }}
    >
      {getArtistInitials(artist.name)}
    </Avatar>
  );
}

export const ArtistAvatar = memo(ArtistAvatarComponent);
