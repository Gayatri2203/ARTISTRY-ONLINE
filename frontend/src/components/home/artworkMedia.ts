import type { SxProps, Theme } from "@mui/material/styles";

const PLACEHOLDER_GRADIENT =
  "linear-gradient(160deg, #312E81 0%, #6366F1 45%, #22D3EE 100%)";

type ArtworkMediaSource = {
  imageUrl?: string;
  gradient?: string;
};

/** Shared card media styles: Cloudinary image or gradient fallback. */
export function getArtworkMediaSx(
  artwork: ArtworkMediaSource,
  extra?: SxProps<Theme>
): SxProps<Theme> {
  return [
    artwork.imageUrl
      ? {
          backgroundImage: `url(${artwork.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : { background: artwork.gradient ?? PLACEHOLDER_GRADIENT },
    ...(Array.isArray(extra) ? extra : extra ? [extra] : []),
  ];
}
