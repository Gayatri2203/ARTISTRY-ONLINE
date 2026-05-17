"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { memo } from "react";

import { navLinkSx } from "@/src/components/ui";
import type { NavLink } from "@/src/features/landing/types";

export type DesktopNavLinksProps = {
  links: readonly NavLink[];
};

function DesktopNavLinksComponent({ links }: DesktopNavLinksProps) {
  return (
    <Stack
      direction="row"
      spacing={{ sm: 2, md: 3 }}
      sx={{ display: { xs: "none", md: "flex" }, flex: 1, ml: 4 }}
    >
      {links.map((link) => (
        <Typography
          key={link.label}
          component={Link}
          href={link.href}
          variant="body2"
          sx={navLinkSx}
        >
          {link.label}
        </Typography>
      ))}
    </Stack>
  );
}

export const DesktopNavLinks = memo(DesktopNavLinksComponent);
