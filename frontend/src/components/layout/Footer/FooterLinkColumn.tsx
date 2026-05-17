"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { memo } from "react";

import { footerLinkSx } from "@/src/components/ui";
import type { FooterLinkGroup } from "@/src/features/landing/types";

export type FooterLinkColumnProps = {
  group: FooterLinkGroup;
};

function FooterLinkColumnComponent({ group }: FooterLinkColumnProps) {
  return (
    <>
      <Typography variant="overline" gutterBottom>
        {group.title}
      </Typography>
      <Stack spacing={1.25}>
        {group.links.map((link) => (
          <Typography
            key={link.label}
            component={Link}
            href={link.href}
            variant="body2"
            color="text.secondary"
            sx={footerLinkSx}
          >
            {link.label}
          </Typography>
        ))}
      </Stack>
    </>
  );
}

export const FooterLinkColumn = memo(FooterLinkColumnComponent);
