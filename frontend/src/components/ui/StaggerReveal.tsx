"use client";

import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

import { staggerContainer, staggerItem, viewportOnce } from "@/src/lib/motion";

import { MotionBox } from "./MotionBox";

export type StaggerRevealProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  animateOnMount?: boolean;
};

export function StaggerReveal({
  children,
  sx,
  animateOnMount = false,
}: StaggerRevealProps) {
  return (
    <MotionBox
      initial="hidden"
      {...(animateOnMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: viewportOnce })}
      variants={staggerContainer}
      sx={sx}
    >
      {children}
    </MotionBox>
  );
}

export type StaggerRevealItemProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function StaggerRevealItem({ children, sx }: StaggerRevealItemProps) {
  return (
    <MotionBox variants={staggerItem} sx={sx}>
      {children}
    </MotionBox>
  );
}
