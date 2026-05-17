"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type AuthFormHeaderProps = {
  title: string;
  subtitle: string;
};

export default function AuthFormHeader({ title, subtitle }: AuthFormHeaderProps) {
  return (
    <Stack spacing={1} sx={{ mb: 3, textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.5rem", sm: "1.75rem" },
          letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
        {subtitle}
      </Typography>
    </Stack>
  );
}
