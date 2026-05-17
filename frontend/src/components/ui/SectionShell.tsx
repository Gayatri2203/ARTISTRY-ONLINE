"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

import { sectionPy } from "@/src/theme/responsive";

export type SectionShellProps = {
  id?: string;
  children: ReactNode;
  maxWidth?: "lg" | "md" | false;
  sx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
};

export function SectionShell({
  id,
  children,
  maxWidth = "lg",
  sx,
  containerSx,
}: SectionShellProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        position: "relative",
        zIndex: 1,
        py: sectionPy,
        ...sx,
      }}
    >
      <Container maxWidth={maxWidth} sx={containerSx}>
        {children}
      </Container>
    </Box>
  );
}
