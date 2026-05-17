"use client";

import Typography from "@mui/material/Typography";
import Link from "next/link";

export type AuthFooterLinkProps = {
  text: string;
  linkText: string;
  href: string;
};

export default function AuthFooterLink({ text, linkText, href }: AuthFooterLinkProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 3 }}
    >
      {text}{" "}
      <Typography
        component={Link}
        href={href}
        variant="body2"
        sx={{
          color: "primary.light",
          fontWeight: 600,
          textDecoration: "none",
          "&:hover": { color: "secondary.light" },
        }}
      >
        {linkText}
      </Typography>
    </Typography>
  );
}
