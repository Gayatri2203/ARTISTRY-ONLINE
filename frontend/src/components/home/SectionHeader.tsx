"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { MotionBox } from "./MotionBox";
import { fadeInUp, viewportOnce } from "./animations";

type SectionHeaderProps = {
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
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeInUp}
    >
      <Stack
        spacing={1}
        sx={{
          textAlign: align,
          alignItems: align === "center" ? "center" : "flex-start",
          mb: { xs: 4, md: 5 },
        }}
      >
        <Typography variant="overline" color="secondary">
          {overline}
        </Typography>
        <Typography variant="h3">{title}</Typography>
        {description && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 560, mt: 0.5 }}
          >
            {description}
          </Typography>
        )}
      </Stack>
    </MotionBox>
  );
}
