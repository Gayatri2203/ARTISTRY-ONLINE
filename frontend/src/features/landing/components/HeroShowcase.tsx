"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { memo } from "react";

import { LikeBadge } from "@/src/components/ui";

import type { FloatingCard, HeroShowcase as HeroShowcaseData } from "../types";
import { HeroFloatingCard } from "./HeroFloatingCard";

export type HeroShowcaseCardProps = {
  showcase: HeroShowcaseData;
  floatingCards: readonly FloatingCard[];
};

function HeroShowcaseCardComponent({ showcase, floatingCards }: HeroShowcaseCardProps) {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          borderRadius: { xs: 3, sm: 4 },
          overflow: "hidden",
          aspectRatio: "4 / 5",
          background: showcase.gradient,
          boxShadow: (theme) =>
            `${theme.palette.artistry.shadows.lg}, ${theme.palette.artistry.shadows.glow}`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 35%, rgba(11,11,15,0.9) 100%)",
          }}
        />
        <LikeBadge
          count={showcase.likes ?? "1.2k"}
          iconSize={16}
          sx={{
            position: "absolute",
            top: { xs: 12, sm: 16 },
            right: { xs: 12, sm: 16 },
            zIndex: 1,
            border: "1px solid rgba(255,255,255,0.1)",
            bgcolor: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
            borderRadius: 3,
            px: 1.5,
            py: 0.75,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 20, sm: 28 },
            left: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
          }}
        >
          <Typography variant="overline" color="secondary.light">
            {showcase.label}
          </Typography>
          <Typography
            variant="h5"
            sx={{ mt: 0.5, fontSize: { xs: "1.125rem", sm: "1.25rem" } }}
          >
            {showcase.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.8125rem", sm: "0.875rem" } }}
          >
            by {showcase.artist} · {showcase.price}
          </Typography>
        </Box>
      </Box>

      {floatingCards.map((card) => (
        <HeroFloatingCard key={card.title} {...card} />
      ))}
    </>
  );
}

export const HeroShowcaseCard = memo(HeroShowcaseCardComponent);
