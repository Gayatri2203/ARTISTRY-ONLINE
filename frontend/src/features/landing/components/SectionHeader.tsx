"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { AnimatedInView } from "@/src/components/ui";
import { fadeInUp } from "@/src/lib/motion";

export type SectionHeaderProps = {
  overline: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  overline,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <AnimatedInView variants={fadeInUp}>
      <Stack
        spacing={1}
        sx={{
          textAlign: align,
          alignItems: align === "center" ? "center" : "flex-start",
          mb: { xs: 3, sm: 4, md: 5 },
        }}
      >
        <Typography
          variant="overline"
          color="secondary"
          sx={{ fontSize: { xs: "0.625rem", sm: "0.6875rem" } }}
        >
          {overline}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: {
              xs: "clamp(1.5rem, 5vw, 1.875rem)",
              sm: "clamp(1.625rem, 3.5vw, 2rem)",
            },
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 560,
              mt: 0.5,
              fontSize: { xs: "0.9375rem", sm: "1rem" },
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>
    </AnimatedInView>
  );
}
